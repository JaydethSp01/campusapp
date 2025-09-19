import { ReportRepository } from "../../ports/repositories/ReportRepository";
import {
  Instalacion,
  SLAPolitica,
  ReporteDanio,
  ReporteEstadoHistorial,
  CreateReporteRequest,
  UpdateReporteRequest,
} from "../../domain/entities/Report";
import { db } from "../database/connection";

export class ReportRepositoryImpl implements ReportRepository {
  // Instalaciones
  async createInstalacion(
    instalacion: Omit<Instalacion, "id" | "createdAt" | "updatedAt">
  ): Promise<Instalacion> {
    const result = await db.query(
      `
      INSERT INTO instalaciones (nombre, descripcion, ubicacion_texto, activo)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, descripcion, ubicacion_texto, activo, created_at, updated_at, deleted_at
    `,
      [
        instalacion.nombre,
        instalacion.descripcion,
        instalacion.ubicacionTexto,
        instalacion.activo,
      ]
    );

    return this.mapRowToInstalacion(result.rows[0]);
  }

  async getInstalaciones(): Promise<Instalacion[]> {
    const result = await db.query(`
      SELECT id, nombre, descripcion, ubicacion_texto, activo, created_at, updated_at, deleted_at
      FROM instalaciones
      WHERE deleted_at IS NULL
      ORDER BY nombre
    `);

    return result.rows.map((row: any) => this.mapRowToInstalacion(row));
  }

  async getInstalacionById(id: string): Promise<Instalacion | null> {
    const result = await db.query(
      `
      SELECT id, nombre, descripcion, ubicacion_texto, activo, created_at, updated_at, deleted_at
      FROM instalaciones
      WHERE id = $1 AND deleted_at IS NULL
    `,
      [id]
    );

    return result.rows.length > 0
      ? this.mapRowToInstalacion(result.rows[0])
      : null;
  }

  async updateInstalacion(
    id: string,
    data: Partial<Instalacion>
  ): Promise<Instalacion | null> {
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramCount = 1;

    if (data.nombre !== undefined) {
      updates.push(`nombre = $${paramCount++}`);
      values.push(data.nombre);
    }
    if (data.descripcion !== undefined) {
      updates.push(`descripcion = $${paramCount++}`);
      values.push(data.descripcion);
    }
    if (data.ubicacionTexto !== undefined) {
      updates.push(`ubicacion_texto = $${paramCount++}`);
      values.push(data.ubicacionTexto);
    }
    if (data.activo !== undefined) {
      updates.push(`activo = $${paramCount++}`);
      values.push(data.activo);
    }

    if (updates.length === 0) {
      return await this.getInstalacionById(id);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const result = await db.query(
      `
      UPDATE instalaciones
      SET ${updates.join(", ")}
      WHERE id = $${paramCount} AND deleted_at IS NULL
      RETURNING id, nombre, descripcion, ubicacion_texto, activo, created_at, updated_at, deleted_at
    `,
      values
    );

    return result.rows.length > 0
      ? this.mapRowToInstalacion(result.rows[0])
      : null;
  }

  async deleteInstalacion(id: string): Promise<boolean> {
    const result = await db.query(
      `
      UPDATE instalaciones
      SET deleted_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL
    `,
      [id]
    );

    return result.rowCount > 0;
  }

  // SLA Políticas
  async getSLAPoliticas(): Promise<SLAPolitica[]> {
    const result = await db.query(`
      SELECT id, nombre, tiempo_objetivo_horas
      FROM sla_politicas
      ORDER BY tiempo_objetivo_horas
    `);

    return result.rows.map((row: any) => ({
      id: row.id,
      nombre: row.nombre,
      tiempoObjetivoHoras: row.tiempo_objetivo_horas,
    }));
  }

  async getSLAPoliticaById(id: number): Promise<SLAPolitica | null> {
    const result = await db.query(
      `
      SELECT id, nombre, tiempo_objetivo_horas
      FROM sla_politicas
      WHERE id = $1
    `,
      [id]
    );

    return result.rows.length > 0
      ? {
          id: result.rows[0].id,
          nombre: result.rows[0].nombre,
          tiempoObjetivoHoras: result.rows[0].tiempo_objetivo_horas,
        }
      : null;
  }

  // Reportes
  async createReporte(
    reporte: CreateReporteRequest,
    usuarioId?: string
  ): Promise<ReporteDanio> {
    const result = await db.query(
      `
      INSERT INTO reportes_danio (instalacion_id, usuario_id, prioridad_id, descripcion, estado_actual)
      VALUES ($1, $2, $3, $4, 'pendiente')
      RETURNING id, instalacion_id, usuario_id, prioridad_id, descripcion, estado_actual, created_at, updated_at, deleted_at
    `,
      [
        reporte.instalacionId,
        usuarioId,
        reporte.prioridadId,
        reporte.descripcion,
      ]
    );

    return this.mapRowToReporte(result.rows[0]);
  }

  async getReportes(): Promise<ReporteDanio[]> {
    const result = await db.query(`
      SELECT id, instalacion_id, usuario_id, prioridad_id, descripcion, estado_actual, created_at, updated_at, deleted_at
      FROM reportes_danio
      WHERE deleted_at IS NULL
      ORDER BY created_at DESC
    `);

    return result.rows.map((row: any) => this.mapRowToReporte(row));
  }

  async getReporteById(id: string): Promise<ReporteDanio | null> {
    const result = await db.query(
      `
      SELECT id, instalacion_id, usuario_id, prioridad_id, descripcion, estado_actual, created_at, updated_at, deleted_at
      FROM reportes_danio
      WHERE id = $1 AND deleted_at IS NULL
    `,
      [id]
    );

    return result.rows.length > 0 ? this.mapRowToReporte(result.rows[0]) : null;
  }

  async updateReporte(
    id: string,
    data: UpdateReporteRequest
  ): Promise<ReporteDanio | null> {
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramCount = 1;

    if (data.descripcion !== undefined) {
      updates.push(`descripcion = $${paramCount++}`);
      values.push(data.descripcion);
    }
    if (data.estadoActual !== undefined) {
      updates.push(`estado_actual = $${paramCount++}`);
      values.push(data.estadoActual);
    }

    if (updates.length === 0) {
      return await this.getReporteById(id);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const result = await db.query(
      `
      UPDATE reportes_danio
      SET ${updates.join(", ")}
      WHERE id = $${paramCount} AND deleted_at IS NULL
      RETURNING id, instalacion_id, usuario_id, prioridad_id, descripcion, estado_actual, created_at, updated_at, deleted_at
    `,
      values
    );

    return result.rows.length > 0 ? this.mapRowToReporte(result.rows[0]) : null;
  }

  async deleteReporte(id: string): Promise<boolean> {
    const result = await db.query(
      `
      UPDATE reportes_danio
      SET deleted_at = NOW()
      WHERE id = $1 AND deleted_at IS NULL
    `,
      [id]
    );

    return result.rowCount > 0;
  }

  async getReportesByUsuario(usuarioId: string): Promise<ReporteDanio[]> {
    const result = await db.query(
      `
      SELECT id, instalacion_id, usuario_id, prioridad_id, descripcion, estado_actual, created_at, updated_at, deleted_at
      FROM reportes_danio
      WHERE usuario_id = $1 AND deleted_at IS NULL
      ORDER BY created_at DESC
    `,
      [usuarioId]
    );

    return result.rows.map((row: any) => this.mapRowToReporte(row));
  }

  async getReportesByEstado(estado: string): Promise<ReporteDanio[]> {
    const result = await db.query(
      `
      SELECT id, instalacion_id, usuario_id, prioridad_id, descripcion, estado_actual, created_at, updated_at, deleted_at
      FROM reportes_danio
      WHERE estado_actual = $1 AND deleted_at IS NULL
      ORDER BY created_at DESC
    `,
      [estado]
    );

    return result.rows.map((row: any) => this.mapRowToReporte(row));
  }

  // Historial de Estados
  async addEstadoHistorial(
    historial: Omit<ReporteEstadoHistorial, "id" | "createdAt">
  ): Promise<ReporteEstadoHistorial> {
    const result = await db.query(
      `
      INSERT INTO reporte_estado_historial (reporte_id, estado, observacion, actor_id)
      VALUES ($1, $2, $3, $4)
      RETURNING id, reporte_id, estado, observacion, actor_id, created_at
    `,
      [
        historial.reporteId,
        historial.estado,
        historial.observacion,
        historial.actorId,
      ]
    );

    return {
      id: result.rows[0].id,
      reporteId: result.rows[0].reporte_id,
      estado: result.rows[0].estado,
      observacion: result.rows[0].observacion,
      actorId: result.rows[0].actor_id,
      createdAt: result.rows[0].created_at,
    };
  }

  async getEstadoHistorial(
    reporteId: string
  ): Promise<ReporteEstadoHistorial[]> {
    const result = await db.query(
      `
      SELECT id, reporte_id, estado, observacion, actor_id, created_at
      FROM reporte_estado_historial
      WHERE reporte_id = $1
      ORDER BY created_at ASC
    `,
      [reporteId]
    );

    return result.rows.map((row: any) => ({
      id: row.id,
      reporteId: row.reporte_id,
      estado: row.estado,
      observacion: row.observacion,
      actorId: row.actor_id,
      createdAt: row.created_at,
    }));
  }

  private mapRowToInstalacion(row: any): Instalacion {
    return {
      id: row.id,
      nombre: row.nombre,
      descripcion: row.descripcion,
      ubicacionTexto: row.ubicacion_texto,
      activo: row.activo,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    };
  }

  private mapRowToReporte(row: any): ReporteDanio {
    return {
      id: row.id,
      instalacionId: row.instalacion_id,
      usuarioId: row.usuario_id,
      prioridadId: row.prioridad_id,
      descripcion: row.descripcion,
      estadoActual: row.estado_actual,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    };
  }
}

