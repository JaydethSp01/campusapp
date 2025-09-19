import { Router } from "express";
import { WellnessController } from "../controllers/WellnessController";
import { authMiddleware, optionalAuthMiddleware } from "../middleware/auth";
import { AuthService } from "../../ports/services/AuthService";

export const createWellnessRoutes = (
  wellnessController: WellnessController,
  authService: AuthService
): Router => {
  const router = Router();

  // Rutas protegidas para bienestar
  router.post("/bienestar", authMiddleware(authService), (req, res) =>
    wellnessController.createBienestarRecord(req, res)
  );
  router.post("/records", authMiddleware(authService), (req, res) =>
    wellnessController.createBienestarRecord(req, res)
  );
  router.get("/bienestar", authMiddleware(authService), (req, res) =>
    wellnessController.getBienestarRecords(req, res)
  );
  router.get("/records", authMiddleware(authService), (req, res) =>
    wellnessController.getBienestarRecords(req, res)
  );
  router.get("/bienestar/:id", authMiddleware(authService), (req, res) =>
    wellnessController.getBienestarRecordById(req, res)
  );
  router.put("/bienestar/:id", authMiddleware(authService), (req, res) =>
    wellnessController.updateBienestarRecord(req, res)
  );
  router.delete("/bienestar/:id", authMiddleware(authService), (req, res) =>
    wellnessController.deleteBienestarRecord(req, res)
  );
  router.get("/bienestar/stats", authMiddleware(authService), (req, res) =>
    wellnessController.getBienestarStats(req, res)
  );

  // Rutas para casos de emergencia (pueden ser anónimas)
  router.post("/emergencia", optionalAuthMiddleware(authService), (req, res) =>
    wellnessController.createEmergencyCase(req, res)
  );
  router.get("/emergencia", authMiddleware(authService), (req, res) =>
    wellnessController.getEmergencyCases(req, res)
  );
  router.get("/emergencia/:id", authMiddleware(authService), (req, res) =>
    wellnessController.getEmergencyCaseById(req, res)
  );
  router.put("/emergencia/:id", authMiddleware(authService), (req, res) =>
    wellnessController.updateEmergencyCase(req, res)
  );

  return router;
};

