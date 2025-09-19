import { CreateNotificacionRequest } from "../../domain/entities/Notification";

export interface NotificationService {
  sendNotification(notificacion: CreateNotificacionRequest): Promise<boolean>;
  sendBulkNotifications(
    notificaciones: CreateNotificacionRequest[]
  ): Promise<number>;
  sendReportStatusNotification(
    reporteId: string,
    nuevoEstado: string
  ): Promise<boolean>;
  sendWellnessAlert(usuarioId: string, tipo: string): Promise<boolean>;
  sendMenuNotification(menuId: string): Promise<boolean>;
  sendEmergencyAlert(usuarioId: string, mensaje: string): Promise<boolean>;
}


