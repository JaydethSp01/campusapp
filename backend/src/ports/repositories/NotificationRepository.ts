import {
  Notificacion,
  CreateNotificacionRequest,
  AuditoriaLog,
} from "../../domain/entities/Notification";

export interface NotificationRepository {
  createNotificacion(
    notificacion: CreateNotificacionRequest
  ): Promise<Notificacion>;
  getNotificacionesByUsuario(usuarioId: string): Promise<Notificacion[]>;
  getNotificacionById(id: number): Promise<Notificacion | null>;
  updateNotificacion(
    id: number,
    data: Partial<Notificacion>
  ): Promise<Notificacion | null>;
  deleteNotificacion(id: number): Promise<boolean>;
  getNotificacionesPendientes(): Promise<Notificacion[]>;
  marcarComoEnviada(id: number): Promise<boolean>;
  marcarComoFallida(id: number): Promise<boolean>;
  marcarTodasComoEnviadas(usuarioId: string): Promise<boolean>;
}

export interface AuditRepository {
  createAuditLog(
    log: Omit<AuditoriaLog, "id" | "createdAt">
  ): Promise<AuditoriaLog>;
  getAuditLogs(entidad?: string, entidadId?: string): Promise<AuditoriaLog[]>;
  getAuditLogsByActor(actorId: string): Promise<AuditoriaLog[]>;
}

