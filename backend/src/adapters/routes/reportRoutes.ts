import { Router } from "express";
import { ReportController } from "../controllers/ReportController";
import { authMiddleware, optionalAuthMiddleware } from "../middleware/auth";
import { AuthService } from "../../ports/services/AuthService";

export const createReportRoutes = (
  reportController: ReportController,
  authService: AuthService
): Router => {
  const router = Router();

  // Rutas públicas
  router.get("/instalaciones", (req, res) =>
    reportController.getInstalaciones(req, res)
  );
  router.get("/sla-politicas", (req, res) =>
    reportController.getSLAPoliticas(req, res)
  );

  // Rutas protegidas
  router.post("/reports", authMiddleware(authService), (req, res) =>
    reportController.createReport(req, res)
  );
  router.get("/reports", authMiddleware(authService), (req, res) =>
    reportController.getReports(req, res)
  );
  router.get("/reports/:id", authMiddleware(authService), (req, res) =>
    reportController.getReportById(req, res)
  );
  router.put("/reports/:id", authMiddleware(authService), (req, res) =>
    reportController.updateReport(req, res)
  );
  router.put("/reports/:id/status", authMiddleware(authService), (req, res) =>
    reportController.updateReportStatus(req, res)
  );
  router.delete("/reports/:id", authMiddleware(authService), (req, res) =>
    reportController.deleteReport(req, res)
  );
  router.get("/reports/:id/history", authMiddleware(authService), (req, res) =>
    reportController.getReportHistory(req, res)
  );

  return router;
};

