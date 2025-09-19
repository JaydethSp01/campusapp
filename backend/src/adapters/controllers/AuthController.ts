import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../application/use-cases/auth/RegisterUserUseCase";
import { LoginUserUseCase } from "../../application/use-cases/auth/LoginUserUseCase";
import { AuthService } from "../../ports/services/AuthService";
import Joi from "joi";

const registerSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  email: Joi.string()
    .email()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
  roles: Joi.array().items(Joi.number().integer().positive()).min(1).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export class AuthController {
  constructor(
    private registerUserUseCase: RegisterUserUseCase,
    private loginUserUseCase: LoginUserUseCase,
    private authService: AuthService
  ) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = registerSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const result = await this.registerUserUseCase.execute(value);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = loginSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const result = await this.loginUserUseCase.execute(value);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({ error: "Refresh token requerido" });
        return;
      }

      const result = await this.authService.refreshToken(refreshToken);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: (error as Error).message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }

      await this.authService.logout(userId);
      res.json({ message: "Sesión cerrada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }

      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword) {
        res
          .status(400)
          .json({ error: "Contraseña actual y nueva contraseña requeridas" });
        return;
      }

      const success = await this.authService.changePassword(
        userId,
        currentPassword,
        newPassword
      );
      if (success) {
        res.json({ message: "Contraseña cambiada exitosamente" });
      } else {
        res.status(400).json({ error: "Error al cambiar la contraseña" });
      }
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

