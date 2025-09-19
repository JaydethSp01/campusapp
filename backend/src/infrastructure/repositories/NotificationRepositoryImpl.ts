import {
  NotificationRepository,
  AuditRepository,
} from "../../ports/repositories/NotificationRepository";
import {
  Notificacion,
  CreateNotificacionRequest,
  AuditoriaLog,
} from "../../domain/entities/Notification";
import { db } from "../database/connection";

export class NotificationRepositoryImpl
  implements NotificationRepository, AuditRepository
{
  // Notificaciones
  async createNotificacion(
    notificacion: CreateNotificacionRequest
  ): Promise<Notificacion> {
    const result = await db.query(
      `
      INSERT INTO notificaciones (usuario_id, canal, titulo, mensaje, estado)
      VALUES ($1, $2, $3, $4, 'pendiente')
      RETURNING id, usuario_id, canal, titulo, mensaje, estado, created_at, enviado_at
    `,
      [
        notificacion.usuarioId,
        notificacion.canal,
        notificacion.titulo,
        notificacion.mensaje,
      ]
    );

    return this.mapRowToNotificacion(result.rows[0]);
  }

  async getNotificacionesByUsuario(usuarioId: string): Promise<Notificacion[]> {
    const result = await db.query(
      `
      SELECT id, usuario_id, canal, titulo, mensaje, estado, created_at, enviado_at
      FROM notificaciones
      WHERE usuario_id = $1
      ORDER BY created_at DESC
    `,
      [usuarioId]
    );

    return result.rows.map((row: any) => this.mapRowToNotificacion(row));
  }

  async getNotificacionById(id: number): Promise<Notificacion | null> {
    const result = await db.query(
      `
      SELECT id, usuario_id, canal, titulo, mensaje, estado, created_at, enviado_at
      FROM notificaciones
      WHERE id = $1
    `,
      [id]
    );

    return result.rows.length > 0
      ? this.mapRowToNotificacion(result.rows[0])
      : null;
  }

  async updateNotificacion(
    id: number,
    data: Partial<Notificacion>
  ): Promise<Notificacion | null> {
    const updates: string[] = [];
    const values: unknown[] = [];
    let paramCount = 0;

    if (data.estado !== undefined) {
      paramCount++;
      updates.push(`estado = $${paramCount}`);
      values.push(data.estado);
    }
    if (data.enviadoAt !== undefined) {
      paramCount++;
      updates.push(`enviado_at = $${paramCount}`);
      values.push(data.enviadoAt);
    }

    if (updates.length === 0) {
      return this.getNotificacionById(id);
    }

    values.push(id);

    const result = await db.query(
      `
      UPDATE notificaciones
      SET ${updates.join(", ")}
      WHERE id = $${paramCount + 1}
      RETURNING id, usuario_id, canal, titulo, mensaje, estado, created_at, enviado_at
    `,
      values
    );

    return result.rows.length > 0
      ? this.mapRowToNotificacion(result.rows[0])
      : null;
  }

  async deleteNotificacion(id: number): Promise<boolean> {
    const result = await db.query(
      `
      DELETE FROM notificaciones
      WHERE id = $1
    `,
      [id]
    );

    return result.rowCount > 0;
  }

  async getNotificacionesPendientes(): Promise<Notificacion[]> {
    const result = await db.query(
      `
      SELECT id, usuario_id, canal, titulo, mensaje, estado, created_at, enviado_at
      FROM notificaciones
      WHERE estado = 'pendiente'
      ORDER BY created_at ASC
    `
    );

    return result.rows.map((row: any) => this.mapRowToNotificacion(row));
  }

  async marcarComoEnviada(id: number): Promise<boolean> {
    const result = await db.query(
      `
      UPDATE notificaciones
      SET estado = 'enviado', enviado_at = NOW()
      WHERE id = $1
    `,
      [id]
    );

    return result.rowCount > 0;
  }

  async marcarComoFallida(id: number): Promise<boolean> {
    const result = await db.query(
      `
      UPDATE notificaciones
      SET estado = 'fallido'
      WHERE id = $1
    `,
      [id]
    );

    return result.rowCount > 0;
  }

  async marcarTodasComoEnviadas(usuarioId: string): Promise<boolean> {
    const result = await db.query(
      `
      UPDATE notificaciones
      SET estado = 'enviado', enviado_at = NOW()
      WHERE usuario_id = $1 AND estado = 'pendiente'
    `,
      [usuarioId]
    );

    return result.rowCount > 0;
  }

  // Auditoría
  async createAuditLog(
    log: Omit<AuditoriaLog, "id" | "createdAt">
  ): Promise<AuditoriaLog> {
    const result = await db.query(
      `
      INSERT INTO auditoria_logs (actor_id, entidad, entidad_id, accion, before_json, after_json)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, actor_id, entidad, entidad_id, accion, before_json, after_json, created_at
    `,
      [
        log.actorId,
        log.entidad,
        log.entidadId,
        log.accion,
        log.beforeJson ? JSON.stringify(log.beforeJson) : null,
        log.afterJson ? JSON.stringify(log.afterJson) : null,
      ]
    );

    return this.mapRowToAuditoriaLog(result.rows[0]);
  }

  async getAuditLogs(
    entidad?: string,
    entidadId?: string
  ): Promise<AuditoriaLog[]> {
    let query = `
      SELECT id, actor_id, entidad, entidad_id, accion, before_json, after_json, created_at
      FROM auditoria_logs
      WHERE 1=1
    `;
    const values: unknown[] = [];
    let paramCount = 0;

    if (entidad) {
      paramCount++;
      query += ` AND entidad = $${paramCount}`;
      values.push(entidad);
    }

    if (entidadId) {
      paramCount++;
      query += ` AND entidad_id = $${paramCount}`;
      values.push(entidadId);
    }

    query += ` ORDER BY created_at DESC`;

    const result = await db.query(query, values);

    return result.rows.map((row: any) => this.mapRowToAuditoriaLog(row));
  }

  async getAuditLogsByActor(actorId: string): Promise<AuditoriaLog[]> {
    const result = await db.query(
      `
      SELECT id, actor_id, entidad, entidad_id, accion, before_json, after_json, created_at
      FROM auditoria_logs
      WHERE actor_id = $1
      ORDER BY created_at DESC
    `,
      [actorId]
    );

    return result.rows.map((row: any) => this.mapRowToAuditoriaLog(row));
  }

  private mapRowToNotificacion(row: any): Notificacion {
    return {
      id: row.id,
      usuarioId: row.usuario_id,
      canal: row.canal,
      titulo: row.titulo,
      mensaje: row.mensaje,
      estado: row.estado,
      createdAt: row.created_at,
      enviadoAt: row.enviado_at,
    };
  }

  private mapRowToAuditoriaLog(row: any): AuditoriaLog {
    return {
      id: row.id,
      actorId: row.actor_id,
      entidad: row.entidad,
      entidadId: row.entidad_id,
      accion: row.accion,
      beforeJson: row.before_json ? JSON.parse(row.before_json) : undefined,
      afterJson: row.after_json ? JSON.parse(row.after_json) : undefined,
      createdAt: row.created_at,
    };
  }
}

