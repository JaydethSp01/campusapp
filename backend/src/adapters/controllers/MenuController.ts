import { Request, Response } from "express";
import { CreateMenuUseCase } from "../../application/use-cases/menu/CreateMenuUseCase";
import { RateMenuUseCase } from "../../application/use-cases/menu/RateMenuUseCase";
import { MenuRepository } from "../../ports/repositories/MenuRepository";
import Joi from "joi";

const createMenuSchema = Joi.object({
  fecha: Joi.date().required(),
  publicado: Joi.boolean().optional(),
  platos: Joi.array()
    .items(
      Joi.object({
        tipo: Joi.string()
          .valid("principal", "acompanamiento", "bebida", "postre")
          .required(),
        nombre: Joi.string().min(1).max(120).required(),
      })
    )
    .min(1)
    .required(),
});

const updateMenuSchema = Joi.object({
  publicado: Joi.boolean().optional(),
  platos: Joi.array()
    .items(
      Joi.object({
        tipo: Joi.string()
          .valid("principal", "acompanamiento", "bebida", "postre")
          .required(),
        nombre: Joi.string().min(1).max(120).required(),
      })
    )
    .optional(),
});

const createCalificacionSchema = Joi.object({
  menuId: Joi.string().uuid().required(),
  puntuacion: Joi.number().integer().min(1).max(5).required(),
  comentario: Joi.string().max(500).optional(),
});

export class MenuController {
  constructor(
    private createMenuUseCase: CreateMenuUseCase,
    private rateMenuUseCase: RateMenuUseCase,
    private menuRepository: MenuRepository
  ) {}

  async createMenu(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = createMenuSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const menu = await this.createMenuUseCase.execute(value);

      // Crear platos del menú
      for (const plato of value.platos) {
        await this.menuRepository.createMenuPlato({
          menuId: menu.id,
          tipo: plato.tipo,
          nombre: plato.nombre,
        });
      }

      const menuCompleto = await this.menuRepository.getMenuWithPlatos(menu.id);
      res.status(201).json(menuCompleto);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getMenus(req: Request, res: Response): Promise<void> {
    try {
      const menus = await this.menuRepository.getMenus();
      res.json(menus);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getMenuById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const menu = await this.menuRepository.getMenuWithPlatos(id);

      if (!menu) {
        res.status(404).json({ error: "Menú no encontrado" });
        return;
      }

      res.json(menu);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getMenuByFecha(req: Request, res: Response): Promise<void> {
    try {
      const { fecha } = req.params;
      const menu = await this.menuRepository.getMenuByFecha(new Date(fecha));

      if (!menu) {
        res.status(404).json({ error: "Menú no encontrado para esta fecha" });
        return;
      }

      const menuCompleto = await this.menuRepository.getMenuWithPlatos(menu.id);
      res.json(menuCompleto);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateMenu(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { error, value } = updateMenuSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const menu = await this.menuRepository.updateMenu(id, value);
      if (!menu) {
        res.status(404).json({ error: "Menú no encontrado" });
        return;
      }

      // Actualizar platos si se proporcionan
      if (value.platos) {
        // Eliminar platos existentes
        const platosExistentes = await this.menuRepository.getPlatosByMenu(id);
        for (const plato of platosExistentes) {
          await this.menuRepository.deleteMenuPlato(plato.id);
        }

        // Crear nuevos platos
        for (const plato of value.platos) {
          await this.menuRepository.createMenuPlato({
            menuId: id,
            tipo: plato.tipo,
            nombre: plato.nombre,
          });
        }
      }

      const menuCompleto = await this.menuRepository.getMenuWithPlatos(id);
      res.json(menuCompleto);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async deleteMenu(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await this.menuRepository.deleteMenu(id);

      if (!success) {
        res.status(404).json({ error: "Menú no encontrado" });
        return;
      }

      res.json({ message: "Menú eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async rateMenu(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = createCalificacionSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }

      const calificacion = await this.rateMenuUseCase.execute({
        ...value,
        usuarioId: userId,
      });

      res.status(201).json(calificacion);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getMenuRatings(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const calificaciones = await this.menuRepository.getCalificacionesByMenu(
        id
      );
      res.json(calificaciones);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getUserRatings(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }

      const calificaciones =
        await this.menuRepository.getCalificacionesByUsuario(userId);
      res.json(calificaciones);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getMenuStats(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const calificaciones = await this.menuRepository.getCalificacionesByMenu(
        id
      );
      const promedio = await this.menuRepository.getPromedioCalificacion(id);

      const stats = {
        totalCalificaciones: calificaciones.length,
        promedioCalificacion: promedio,
        distribucion: {
          1: calificaciones.filter((c) => c.puntuacion === 1).length,
          2: calificaciones.filter((c) => c.puntuacion === 2).length,
          3: calificaciones.filter((c) => c.puntuacion === 3).length,
          4: calificaciones.filter((c) => c.puntuacion === 4).length,
          5: calificaciones.filter((c) => c.puntuacion === 5).length,
        },
        calificacionesRecientes: calificaciones.slice(0, 10),
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

