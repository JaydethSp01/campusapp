import { Router } from "express";
import { MenuController } from "../controllers/MenuController";
import { authMiddleware, optionalAuthMiddleware } from "../middleware/auth";
import { AuthService } from "../../ports/services/AuthService";

export const createMenuRoutes = (
  menuController: MenuController,
  authService: AuthService
): Router => {
  const router = Router();

  // Rutas públicas para consultar menús
  router.get("/menus", (req, res) => menuController.getMenus(req, res));
  router.get("/menus/fecha/:fecha", (req, res) =>
    menuController.getMenuByFecha(req, res)
  );
  router.get("/menus/:id", (req, res) => menuController.getMenuById(req, res));
  router.get("/menus/:id/ratings", (req, res) =>
    menuController.getMenuRatings(req, res)
  );
  router.get("/menus/:id/stats", (req, res) =>
    menuController.getMenuStats(req, res)
  );

  // Rutas protegidas para calificar menús
  router.post("/menus/rate", authMiddleware(authService), (req, res) =>
    menuController.rateMenu(req, res)
  );
  router.get("/menus/my-ratings", authMiddleware(authService), (req, res) =>
    menuController.getUserRatings(req, res)
  );

  // Rutas administrativas (requieren autenticación)
  router.post("/menus", authMiddleware(authService), (req, res) =>
    menuController.createMenu(req, res)
  );
  router.put("/menus/:id", authMiddleware(authService), (req, res) =>
    menuController.updateMenu(req, res)
  );
  router.delete("/menus/:id", authMiddleware(authService), (req, res) =>
    menuController.deleteMenu(req, res)
  );

  return router;
};


