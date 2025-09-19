import { NotificationService } from "../../ports/services/NotificationService";
import { NotificationRepository } from "../../ports/repositories/NotificationRepository";
import { CreateNotificacionRequest } from "../../domain/entities/Notification";

export class NotificationServiceImpl implements NotificationService {
  constructor(private notificationRepository: NotificationRepository) {}

  async sendNotification(
    notificacion: CreateNotificacionRequest
  ): Promise<boolean> {
    try {
      await this.notificationRepository.createNotificacion(notificacion);

      // En una implementación real, aquí se enviaría la notificación push o email
      // Por simplicidad, marcamos como enviada inmediatamente
      const notificaciones =
        await this.notificationRepository.getNotificacionesByUsuario(
          notificacion.usuarioId
        );
      const ultimaNotificacion = notificaciones[notificaciones.length - 1];

      if (ultimaNotificacion) {
        await this.notificationRepository.marcarComoEnviada(
          ultimaNotificacion.id
        );
      }

      return true;
    } catch (error) {
      console.error("Error sending notification:", error);
      return false;
    }
  }

  async sendBulkNotifications(
    notificaciones: CreateNotificacionRequest[]
  ): Promise<number> {
    let successCount = 0;

    for (const notificacion of notificaciones) {
      const success = await this.sendNotification(notificacion);
      if (success) {
        successCount++;
      }
    }

    return successCount;
  }

  async sendReportStatusNotification(
    reporteId: string,
    nuevoEstado: string
  ): Promise<boolean> {
    // Obtener usuarios administradores y de mantenimiento
    // Por simplicidad, enviamos a un usuario de prueba
    const notificacion: CreateNotificacionRequest = {
      usuarioId: "admin-user-id", // En implementación real, obtener de la BD
      canal: "push",
      titulo: "Actualización de Reporte",
      mensaje: `El reporte ${reporteId} ha cambiado a estado: ${nuevoEstado}`,
    };

    return await this.sendNotification(notificacion);
  }

  async sendWellnessAlert(usuarioId: string, _tipo: string): Promise<boolean> {
    const notificacion: CreateNotificacionRequest = {
      usuarioId,
      canal: "push",
      titulo: "Alerta de Bienestar",
      mensaje:
        "Se ha detectado un indicador de riesgo en tu registro de bienestar. Considera contactar al equipo de bienestar.",
    };

    return await this.sendNotification(notificacion);
  }

  async sendMenuNotification(_menuId: string): Promise<boolean> {
    // Obtener todos los usuarios activos
    // Por simplicidad, enviamos a un usuario de prueba
    const notificacion: CreateNotificacionRequest = {
      usuarioId: "user-id", // En implementación real, obtener de la BD
      canal: "push",
      titulo: "Nuevo Menú Disponible",
      mensaje:
        "Se ha publicado un nuevo menú del comedor. ¡Revisa las opciones disponibles!",
    };

    return await this.sendNotification(notificacion);
  }

  async sendEmergencyAlert(
    usuarioId: string,
    mensaje: string
  ): Promise<boolean> {
    const notificacion: CreateNotificacionRequest = {
      usuarioId,
      canal: "push",
      titulo: "Alerta de Emergencia",
      mensaje: `Alerta de emergencia: ${mensaje}`,
    };

    return await this.sendNotification(notificacion);
  }
}

