import { Router } from "express";
import { NotificationController } from "../controllers/NotificationController";
import { authMiddleware } from "../middleware/auth";
import { AuthService } from "../../ports/services/AuthService";

export const createNotificationRoutes = (
  notificationController: NotificationController,
  authService: AuthService
): Router => {
  const router = Router();

  // Rutas protegidas para notificaciones
  router.post("/", authMiddleware(authService), (req, res) =>
    notificationController.createNotification(req, res)
  );
  router.get("/", authMiddleware(authService), (req, res) =>
    notificationController.getUserNotifications(req, res)
  );
  router.get("/:id", authMiddleware(authService), (req, res) =>
    notificationController.getNotificationById(req, res)
  );
  router.put(
    "/:id/read",
    authMiddleware(authService),
    (req, res) => notificationController.markAsRead(req, res)
  );
  router.put("/read-all", authMiddleware(authService), (req, res) =>
    notificationController.markAllAsRead(req, res)
  );
  router.delete("/:id", authMiddleware(authService), (req, res) =>
    notificationController.deleteNotification(req, res)
  );
  router.get("/stats", authMiddleware(authService), (req, res) =>
    notificationController.getNotificationStats(req, res)
  );

  // Rutas administrativas
  router.get(
    "/admin/notifications/pending",
    authMiddleware(authService),
    (req, res) => notificationController.getPendingNotifications(req, res)
  );
  router.post(
    "/admin/notifications/bulk",
    authMiddleware(authService),
    (req, res) => notificationController.sendBulkNotifications(req, res)
  );

  return router;
};

