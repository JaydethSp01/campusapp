import { Request, Response } from "express";
import { NotificationService } from "../../ports/services/NotificationService";
import { NotificationRepository } from "../../ports/repositories/NotificationRepository";
import Joi from "joi";

const createNotificationSchema = Joi.object({
  usuarioId: Joi.string().uuid().required(),
  canal: Joi.string().valid("push", "email").required(),
  titulo: Joi.string().min(1).max(140).required(),
  mensaje: Joi.string().min(1).max(1000).required(),
});

export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private notificationRepository: NotificationRepository
  ) {}

  async createNotification(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = createNotificationSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const notificacion = await this.notificationRepository.createNotificacion(
        value
      );
      const success = await this.notificationService.sendNotification(value);

      if (success) {
        res.status(201).json(notificacion);
      } else {
        res.status(500).json({ error: "Error al enviar la notificación" });
      }
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getUserNotifications(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }

      const notificaciones =
        await this.notificationRepository.getNotificacionesByUsuario(userId);
      res.json(notificaciones);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getNotificationById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const notificacion =
        await this.notificationRepository.getNotificacionById(parseInt(id));

      if (!notificacion) {
        res.status(404).json({ error: "Notificación no encontrada" });
        return;
      }

      res.json(notificacion);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async markAsRead(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await this.notificationRepository.marcarComoEnviada(
        parseInt(id)
      );

      if (!success) {
        res.status(404).json({ error: "Notificación no encontrada" });
        return;
      }

      res.json({ message: "Notificación marcada como leída" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async markAllAsRead(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }

      const success = await this.notificationRepository.marcarTodasComoEnviadas(userId);
      
      if (!success) {
        res.status(500).json({ error: "Error al marcar notificaciones como leídas" });
        return;
      }

      res.json({ message: "Todas las notificaciones marcadas como leídas" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async deleteNotification(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await this.notificationRepository.deleteNotificacion(
        parseInt(id)
      );

      if (!success) {
        res.status(404).json({ error: "Notificación no encontrada" });
        return;
      }

      res.json({ message: "Notificación eliminada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getPendingNotifications(req: Request, res: Response): Promise<void> {
    try {
      const notificaciones =
        await this.notificationRepository.getNotificacionesPendientes();
      res.json(notificaciones);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async sendBulkNotifications(req: Request, res: Response): Promise<void> {
    try {
      const { notificaciones } = req.body;

      if (!Array.isArray(notificaciones)) {
        res.status(400).json({ error: "Notificaciones debe ser un array" });
        return;
      }

      const successCount = await this.notificationService.sendBulkNotifications(
        notificaciones
      );
      res.json({
        message: `${successCount} notificaciones enviadas exitosamente`,
        total: notificaciones.length,
        success: successCount,
      });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getNotificationStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }

      const notificaciones =
        await this.notificationRepository.getNotificacionesByUsuario(userId);

      const stats = {
        total: notificaciones.length,
        pendientes: notificaciones.filter((n) => n.estado === "pendiente")
          .length,
        enviadas: notificaciones.filter((n) => n.estado === "enviado").length,
        fallidas: notificaciones.filter((n) => n.estado === "fallido").length,
        porCanal: {
          push: notificaciones.filter((n) => n.canal === "push").length,
          email: notificaciones.filter((n) => n.canal === "email").length,
        },
        recientes: notificaciones.slice(0, 10),
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

