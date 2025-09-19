import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

export const createAuthRoutes = (authController: AuthController): Router => {
  const router = Router();

  router.post("/register", (req, res) => authController.register(req, res));
  router.post("/login", (req, res) => authController.login(req, res));
  router.post("/refresh", (req, res) => authController.refreshToken(req, res));
  router.post("/logout", (req, res) => authController.logout(req, res));
  router.put("/change-password", (req, res) =>
    authController.changePassword(req, res)
  );

  return router;
};


