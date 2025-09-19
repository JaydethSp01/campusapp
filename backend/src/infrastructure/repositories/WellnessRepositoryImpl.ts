import { WellnessRepository } from "../../ports/repositories/WellnessRepository";
import {
  BienestarRegistro,
  AcosoCaso,
  CreateBienestarRequest,
  CreateAcosoRequest,
  UpdateAcosoRequest,
} from "../../domain/entities/Wellness";
import { db } from "../database/connection";

export class WellnessRepositoryImpl implements WellnessRepository {
  // Bienestar Registros
  async createBienestarRegistro(
    registro: CreateBienestarRequest,
    usuarioId: string
  ): Promise<BienestarRegistro> {
    const result = await db.query(
      `
      INSERT INTO bienestar_registros (usuario_id, fecha, nivel_estres, horas_sueno, alimentacion_calidad, comentario)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, usuario_id, fecha, nivel_estres, horas_sueno, alimentacion_calidad, comentario, created_at, deleted_at
    `,
      [
        usuarioId,
        registro.fecha,
        registro.nivelEstres,
        registro.horasSueno,
        registro.alimentacionCalidad,
        registro.comentario,
      ]
    );

    return this.mapRowToBienestarRegistro(result.rows[0]);
  }

  async getBienestarRegistros(usuarioId: string): Promise<BienestarRegistro[]> {
    const result = await db.query(
      `
      SELECT id, usuario_id, fecha, nivel_estres, horas_sueno, alimentacion_calidad, comentario, created_at, deleted_at
      FROM bienestar_registros
      WHERE usuario_id = $1 AND deleted_at IS NULL
      ORDER BY fecha DESC
    `,
      [usuarioId]
    );

    return result.rows.map((row: any) => this.mapRowToBienestarRegistro(row));
  }

  async getBienestarRegistroById(
    id: string
  ): Promise<BienestarRegistro | null> {
    const result = await db.query(
      `
      SELECT id, usuario_id, fecha, nivel_estres, horas_sueno, alimentacion_calidad, comentario, created_at, deleted_at
      FROM bienestar_registros
      WHERE id = $1 AND deleted_at IS NULL
    `,
      [id]
    );

    return result.rows.length > 0
      ? this.mapRowToBienestarRegistro(result.rows[0])
      : null;
  }

  async updateBienestarRegistro(
    id: string,
    data: Partial<CreateBienestarRequest>
  ): Promise<BienestarRegistro | null> {
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramCount = 0;

    if (data.fecha !== undefined) {
      paramCount++;
      updates.push(`fecha = $${paramCount}`);
      values.push(data.fecha);
    }
    if (data.nivelEstres !== undefined) {
      paramCount++;
      updates.push(`nivel_estres = $${paramCount}`);
      values.push(data.nivelEstres);
    }
    if (data.horasSueno !== undefined) {
      paramCount++;
      updates.push(`horas_sueno = $${paramCount}`);
      values.push(data.horasSueno);
    }
    if (data.alimentacionCalidad !== undefined) {
      paramCount++;
      updates.push(`alimentacion_calidad = $${paramCount}`);
      values.push(data.alimentacionCalidad);
    }
    if (data.comentario !== undefined) {
      paramCount++;
      updates.push(`comentario = $${paramCount}`);
      values.push(data.comentario);
    }

    if (updates.length === 0) {
      return this.getBienestarRegistroById(id);
    }

    paramCount++;
    updates.push(`updated_at = NOW()`);
    values.push(id);

    const result = await db.query(
      `
      UPDATE bienestar_registros
      SET ${updates.join(", ")}
      WHERE id = $${paramCount} AND deleted_at IS NULL
      RETURNING id, usuario_id, fecha, nivel_estres, horas_sueno, alimentacion_calidad, comentario, created_at, deleted_at
    `,
      values
    );

    return result.rows.length > 0
      ? this.mapRowToBienestarRegistro(result.rows[0])
      : null;
  }

  async deleteBienestarRegistro(id: string): Promise<boolean> {
    const result = await db.query(
      `
      UPDATE bienestar_registros
      SET deleted_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL
    `,
      [id]
    );

    return result.rowCount > 0;
  }

  async getBienestarRegistrosByFecha(
    fecha: Date
  ): Promise<BienestarRegistro[]> {
    const result = await db.query(
      `
      SELECT id, usuario_id, fecha, nivel_estres, horas_sueno, alimentacion_calidad, comentario, created_at, deleted_at
      FROM bienestar_registros
      WHERE fecha = $1 AND deleted_at IS NULL
      ORDER BY created_at DESC
    `,
      [fecha]
    );

    return result.rows.map((row: any) => this.mapRowToBienestarRegistro(row));
  }

  async getBienestarRegistrosByRango(
    fechaInicio: Date,
    fechaFin: Date
  ): Promise<BienestarRegistro[]> {
    const result = await db.query(
      `
      SELECT id, usuario_id, fecha, nivel_estres, horas_sueno, alimentacion_calidad, comentario, created_at, deleted_at
      FROM bienestar_registros
      WHERE fecha BETWEEN $1 AND $2 AND deleted_at IS NULL
      ORDER BY fecha DESC
    `,
      [fechaInicio, fechaFin]
    );

    return result.rows.map((row: any) => this.mapRowToBienestarRegistro(row));
  }

  // Acoso Casos
  async createAcosoCaso(
    caso: CreateAcosoRequest,
    usuarioId?: string
  ): Promise<AcosoCaso> {
    const result = await db.query(
      `
      INSERT INTO acoso_casos (usuario_id, canal, descripcion, estado, confidencial)
      VALUES ($1, $2, $3, 'abierto', $4)
      RETURNING id, usuario_id, canal, descripcion, estado, confidencial, created_at, updated_at, deleted_at
    `,
      [usuarioId, caso.canal, caso.descripcion, caso.confidencial ?? true]
    );

    return this.mapRowToAcosoCaso(result.rows[0]);
  }

  async getAcosoCasos(): Promise<AcosoCaso[]> {
    const result = await db.query(
      `
      SELECT id, usuario_id, canal, descripcion, estado, confidencial, created_at, updated_at, deleted_at
      FROM acoso_casos
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
    `
    );

    return result.rows.map((row: any) => this.mapRowToAcosoCaso(row));
  }

  async getAcosoCasoById(id: string): Promise<AcosoCaso | null> {
    const result = await db.query(
      `
      SELECT id, usuario_id, canal, descripcion, estado, confidencial, created_at, updated_at, deleted_at
      FROM acoso_casos
      WHERE id = $1 AND deleted_at IS NULL
    `,
      [id]
    );

    return result.rows.length > 0
      ? this.mapRowToAcosoCaso(result.rows[0])
      : null;
  }

  async updateAcosoCaso(
    id: string,
    data: UpdateAcosoRequest
  ): Promise<AcosoCaso | null> {
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramCount = 0;

    if (data.estado !== undefined) {
      paramCount++;
      updates.push(`estado = $${paramCount}`);
      values.push(data.estado);
    }
    if (data.confidencial !== undefined) {
      paramCount++;
      updates.push(`confidencial = $${paramCount}`);
      values.push(data.confidencial);
    }

    if (updates.length === 0) {
      return this.getAcosoCasoById(id);
    }

    paramCount++;
    updates.push(`updated_at = NOW()`);
    values.push(id);

    const result = await db.query(
      `
      UPDATE acoso_casos
      SET ${updates.join(", ")}
      WHERE id = $${paramCount} AND deleted_at IS NULL
      RETURNING id, usuario_id, canal, descripcion, estado, confidencial, created_at, updated_at, deleted_at
    `,
      values
    );

    return result.rows.length > 0
      ? this.mapRowToAcosoCaso(result.rows[0])
      : null;
  }

  async deleteAcosoCaso(id: string): Promise<boolean> {
    const result = await db.query(
      `
      UPDATE acoso_casos
      SET deleted_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL
    `,
      [id]
    );

    return result.rowCount > 0;
  }

  async getAcosoCasosByEstado(estado: string): Promise<AcosoCaso[]> {
    const result = await db.query(
      `
      SELECT id, usuario_id, canal, descripcion, estado, confidencial, created_at, updated_at, deleted_at
      FROM acoso_casos
      WHERE estado = $1 AND deleted_at IS NULL
      ORDER BY created_at DESC
    `,
      [estado]
    );

    return result.rows.map((row: any) => this.mapRowToAcosoCaso(row));
  }

  async getAcosoCasosByUsuario(usuarioId: string): Promise<AcosoCaso[]> {
    const result = await db.query(
      `
      SELECT id, usuario_id, canal, descripcion, estado, confidencial, created_at, updated_at, deleted_at
      FROM acoso_casos
      WHERE usuario_id = $1 AND deleted_at IS NULL
      ORDER BY created_at DESC
    `,
      [usuarioId]
    );

    return result.rows.map((row: any) => this.mapRowToAcosoCaso(row));
  }

  private mapRowToBienestarRegistro(row: any): BienestarRegistro {
    return {
      id: row.id,
      usuarioId: row.usuario_id,
      fecha: row.fecha,
      nivelEstres: row.nivel_estres,
      horasSueno: row.horas_sueno,
      alimentacionCalidad: row.alimentacion_calidad,
      comentario: row.comentario,
      createdAt: row.created_at,
      deletedAt: row.deleted_at,
    };
  }

  private mapRowToAcosoCaso(row: any): AcosoCaso {
    return {
      id: row.id,
      usuarioId: row.usuario_id,
      canal: row.canal,
      descripcion: row.descripcion,
      estado: row.estado,
      confidencial: row.confidencial,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    };
  }
}

