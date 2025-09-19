import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../ports/services/AuthService";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = (authService: AuthService) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Token de acceso requerido" });
        return;
      }

      const token = authHeader.substring(7);
      const user = await authService.validateToken(token);

      if (!user) {
        res.status(401).json({ error: "Token inválido" });
        return;
      }

      req.user = {
        id: user.id,
        email: user.email,
      };

      next();
    } catch (error) {
      res.status(401).json({ error: "Token inválido" });
    }
  };
};

export const optionalAuthMiddleware = (authService: AuthService) => {
  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        const user = await authService.validateToken(token);

        if (user) {
          req.user = {
            id: user.id,
            email: user.email,
          };
        }
      }
      next();
    } catch (error) {
      next();
    }
  };
};

