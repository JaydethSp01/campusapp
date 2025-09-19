import { MenuRepository } from "../../ports/repositories/MenuRepository";
import {
  Menu,
  MenuPlato,
  MenuCalificacion,
  CreateMenuRequest,
  UpdateMenuRequest,
  CreateCalificacionRequest,
  MenuWithPlatos,
} from "../../domain/entities/Menu";
import { db } from "../database/connection";

export class MenuRepositoryImpl implements MenuRepository {
  // Menús
  async createMenu(menu: CreateMenuRequest): Promise<Menu> {
    const result = await db.query(
      `
      INSERT INTO menus (fecha, publicado)
      VALUES ($1, $2)
      RETURNING id, fecha, publicado, created_at, updated_at
    `,
      [menu.fecha, menu.publicado ?? false]
    );

    return this.mapRowToMenu(result.rows[0]);
  }

  async getMenus(): Promise<Menu[]> {
    const result = await db.query(
      `
      SELECT id, fecha, publicado, created_at, updated_at
      FROM menus
      ORDER BY fecha DESC
    `
    );

    return result.rows.map((row: any) => this.mapRowToMenu(row));
  }

  async getMenusPublicados(): Promise<Menu[]> {
    const result = await db.query(
      `
      SELECT id, fecha, publicado, created_at, updated_at
      FROM menus
      WHERE publicado = true
      ORDER BY fecha DESC
    `
    );

    return result.rows.map((row: any) => this.mapRowToMenu(row));
  }

  async getMenuById(id: string): Promise<Menu | null> {
    const result = await db.query(
      `
      SELECT id, fecha, publicado, created_at, updated_at
      FROM menus
      WHERE id = $1
    `,
      [id]
    );

    return result.rows.length > 0 ? this.mapRowToMenu(result.rows[0]) : null;
  }

  async getMenuByFecha(fecha: Date): Promise<Menu | null> {
    const result = await db.query(
      `
      SELECT id, fecha, publicado, created_at, updated_at
      FROM menus
      WHERE fecha = $1
    `,
      [fecha]
    );

    return result.rows.length > 0 ? this.mapRowToMenu(result.rows[0]) : null;
  }

  async updateMenu(id: string, data: UpdateMenuRequest): Promise<Menu | null> {
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramCount = 0;

    if (data.publicado !== undefined) {
      paramCount++;
      updates.push(`publicado = $${paramCount}`);
      values.push(data.publicado);
    }

    if (updates.length === 0) {
      return this.getMenuById(id);
    }

    paramCount++;
    updates.push(`updated_at = NOW()`);
    values.push(id);

    const result = await db.query(
      `
      UPDATE menus
      SET ${updates.join(", ")}
      WHERE id = $${paramCount}
      RETURNING id, fecha, publicado, created_at, updated_at
    `,
      values
    );

    return result.rows.length > 0 ? this.mapRowToMenu(result.rows[0]) : null;
  }

  async deleteMenu(id: string): Promise<boolean> {
    const result = await db.query(
      `
      DELETE FROM menus
      WHERE id = $1
    `,
      [id]
    );

    return result.rowCount > 0;
  }

  async getMenuWithPlatos(id: string): Promise<MenuWithPlatos | null> {
    const menu = await this.getMenuById(id);
    if (!menu) return null;

    const platos = await this.getPlatosByMenu(id);
    const promedioCalificacion = await this.getPromedioCalificacion(id);

    return {
      ...menu,
      platos,
      promedioCalificacion,
    };
  }

  // Platos
  async createMenuPlato(plato: Omit<MenuPlato, "id">): Promise<MenuPlato> {
    const result = await db.query(
      `
      INSERT INTO menu_platos (menu_id, tipo, nombre)
      VALUES ($1, $2, $3)
      RETURNING id, menu_id, tipo, nombre
    `,
      [plato.menuId, plato.tipo, plato.nombre]
    );

    return this.mapRowToMenuPlato(result.rows[0]);
  }

  async getPlatosByMenu(menuId: string): Promise<MenuPlato[]> {
    const result = await db.query(
      `
      SELECT id, menu_id, tipo, nombre
      FROM menu_platos
      WHERE menu_id = $1
      ORDER BY tipo, nombre
    `,
      [menuId]
    );

    return result.rows.map((row: any) => this.mapRowToMenuPlato(row));
  }

  async updateMenuPlato(
    id: number,
    data: Partial<MenuPlato>
  ): Promise<MenuPlato | null> {
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramCount = 0;

    if (data.tipo !== undefined) {
      paramCount++;
      updates.push(`tipo = $${paramCount}`);
      values.push(data.tipo);
    }
    if (data.nombre !== undefined) {
      paramCount++;
      updates.push(`nombre = $${paramCount}`);
      values.push(data.nombre);
    }

    if (updates.length === 0) {
      return this.getMenuPlatoById(id);
    }

    values.push(id);

    const result = await db.query(
      `
      UPDATE menu_platos
      SET ${updates.join(", ")}
      WHERE id = $${paramCount + 1}
      RETURNING id, menu_id, tipo, nombre
    `,
      values
    );

    return result.rows.length > 0
      ? this.mapRowToMenuPlato(result.rows[0])
      : null;
  }

  async deleteMenuPlato(id: number): Promise<boolean> {
    const result = await db.query(
      `
      DELETE FROM menu_platos
      WHERE id = $1
    `,
      [id]
    );

    return result.rowCount > 0;
  }

  async getMenuPlatoById(id: number): Promise<MenuPlato | null> {
    const result = await db.query(
      `
      SELECT id, menu_id, tipo, nombre
      FROM menu_platos
      WHERE id = $1
    `,
      [id]
    );

    return result.rows.length > 0
      ? this.mapRowToMenuPlato(result.rows[0])
      : null;
  }

  // Calificaciones
  async createCalificacion(
    calificacion: CreateCalificacionRequest
  ): Promise<MenuCalificacion> {
    const result = await db.query(
      `
      INSERT INTO menu_calificaciones (menu_id, usuario_id, puntuacion, comentario)
      VALUES ($1, $2, $3, $4)
      RETURNING id, menu_id, usuario_id, puntuacion, comentario, created_at
    `,
      [
        calificacion.menuId,
        calificacion.usuarioId,
        calificacion.puntuacion,
        calificacion.comentario,
      ]
    );

    return this.mapRowToMenuCalificacion(result.rows[0]);
  }

  async getCalificacionesByMenu(menuId: string): Promise<MenuCalificacion[]> {
    const result = await db.query(
      `
      SELECT id, menu_id, usuario_id, puntuacion, comentario, created_at
      FROM menu_calificaciones
      WHERE menu_id = $1
      ORDER BY created_at DESC
    `,
      [menuId]
    );

    return result.rows.map((row: any) => this.mapRowToMenuCalificacion(row));
  }

  async getCalificacionesByUsuario(
    usuarioId: string
  ): Promise<MenuCalificacion[]> {
    const result = await db.query(
      `
      SELECT id, menu_id, usuario_id, puntuacion, comentario, created_at
      FROM menu_calificaciones
      WHERE usuario_id = $1
      ORDER BY created_at DESC
    `,
      [usuarioId]
    );

    return result.rows.map((row: any) => this.mapRowToMenuCalificacion(row));
  }

  async getCalificacionById(id: number): Promise<MenuCalificacion | null> {
    const result = await db.query(
      `
      SELECT id, menu_id, usuario_id, puntuacion, comentario, created_at
      FROM menu_calificaciones
      WHERE id = $1
    `,
      [id]
    );

    return result.rows.length > 0
      ? this.mapRowToMenuCalificacion(result.rows[0])
      : null;
  }

  async updateCalificacion(
    id: number,
    data: Partial<CreateCalificacionRequest>
  ): Promise<MenuCalificacion | null> {
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramCount = 0;

    if (data.puntuacion !== undefined) {
      paramCount++;
      updates.push(`puntuacion = $${paramCount}`);
      values.push(data.puntuacion);
    }
    if (data.comentario !== undefined) {
      paramCount++;
      updates.push(`comentario = $${paramCount}`);
      values.push(data.comentario);
    }

    if (updates.length === 0) {
      return this.getCalificacionById(id);
    }

    values.push(id);

    const result = await db.query(
      `
      UPDATE menu_calificaciones
      SET ${updates.join(", ")}
      WHERE id = $${paramCount + 1}
      RETURNING id, menu_id, usuario_id, puntuacion, comentario, created_at
    `,
      values
    );

    return result.rows.length > 0
      ? this.mapRowToMenuCalificacion(result.rows[0])
      : null;
  }

  async deleteCalificacion(id: number): Promise<boolean> {
    const result = await db.query(
      `
      DELETE FROM menu_calificaciones
      WHERE id = $1
    `,
      [id]
    );

    return result.rowCount > 0;
  }

  async getPromedioCalificacion(menuId: string): Promise<number> {
    const result = await db.query(
      `
      SELECT AVG(puntuacion) as promedio
      FROM menu_calificaciones
      WHERE menu_id = $1
    `,
      [menuId]
    );

    return result.rows[0]?.promedio ? parseFloat(result.rows[0].promedio) : 0;
  }

  private mapRowToMenu(row: any): Menu {
    return {
      id: row.id,
      fecha: row.fecha,
      publicado: row.publicado,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  private mapRowToMenuPlato(row: any): MenuPlato {
    return {
      id: row.id,
      menuId: row.menu_id,
      tipo: row.tipo,
      nombre: row.nombre,
    };
  }

  private mapRowToMenuCalificacion(row: any): MenuCalificacion {
    return {
      id: row.id,
      menuId: row.menu_id,
      usuarioId: row.usuario_id,
      puntuacion: row.puntuacion,
      comentario: row.comentario,
      createdAt: row.created_at,
    };
  }
}

