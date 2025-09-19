import { Request, Response } from "express";
import { CreateWellnessRecordUseCase } from "../../application/use-cases/wellness/CreateWellnessRecordUseCase";
import { CreateEmergencyCaseUseCase } from "../../application/use-cases/wellness/CreateEmergencyCaseUseCase";
import { WellnessRepository } from "../../ports/repositories/WellnessRepository";
import Joi from "joi";

const createBienestarSchema = Joi.object({
  fecha: Joi.date().required(),
  nivelEstres: Joi.number().integer().min(0).max(5).required(),
  horasSueno: Joi.number().min(0).max(24).required(),
  alimentacionCalidad: Joi.number().integer().min(1).max(3).required(),
  comentario: Joi.string().max(500).optional(),
});

const createAcosoSchema = Joi.object({
  canal: Joi.string()
    .valid("ayuda_rapida", "form_bienestar", "otro")
    .required(),
  descripcion: Joi.string().min(10).max(1000).required(),
  confidencial: Joi.boolean().optional(),
});

export class WellnessController {
  constructor(
    private createWellnessRecordUseCase: CreateWellnessRecordUseCase,
    private createEmergencyCaseUseCase: CreateEmergencyCaseUseCase,
    private wellnessRepository: WellnessRepository
  ) {}

  async createBienestarRecord(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = createBienestarSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }

      const registro = await this.createWellnessRecordUseCase.execute(
        value,
        userId
      );
      res.status(201).json(registro);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getBienestarRecords(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }

      const registros = await this.wellnessRepository.getBienestarRegistros(
        userId
      );
      res.json(registros);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getBienestarRecordById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const registro = await this.wellnessRepository.getBienestarRegistroById(
        id
      );

      if (!registro) {
        res.status(404).json({ error: "Registro no encontrado" });
        return;
      }

      res.json(registro);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateBienestarRecord(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { error, value } = createBienestarSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const registro = await this.wellnessRepository.updateBienestarRegistro(
        id,
        value
      );
      if (!registro) {
        res.status(404).json({ error: "Registro no encontrado" });
        return;
      }

      res.json(registro);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async deleteBienestarRecord(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await this.wellnessRepository.deleteBienestarRegistro(id);

      if (!success) {
        res.status(404).json({ error: "Registro no encontrado" });
        return;
      }

      res.json({ message: "Registro eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async createEmergencyCase(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = createAcosoSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const userId = (req as any).user?.id;
      const caso = await this.createEmergencyCaseUseCase.execute(value, userId);
      res.status(201).json(caso);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getEmergencyCases(req: Request, res: Response): Promise<void> {
    try {
      const casos = await this.wellnessRepository.getAcosoCasos();
      res.json(casos);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getEmergencyCaseById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const caso = await this.wellnessRepository.getAcosoCasoById(id);

      if (!caso) {
        res.status(404).json({ error: "Caso no encontrado" });
        return;
      }

      res.json(caso);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateEmergencyCase(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateSchema = Joi.object({
        estado: Joi.string()
          .valid("abierto", "en_atencion", "cerrado")
          .optional(),
        confidencial: Joi.boolean().optional(),
      });

      const { error, value } = updateSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const caso = await this.wellnessRepository.updateAcosoCaso(id, value);
      if (!caso) {
        res.status(404).json({ error: "Caso no encontrado" });
        return;
      }

      res.json(caso);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getBienestarStats(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      if (!userId) {
        res.status(401).json({ error: "No autorizado" });
        return;
      }

      const registros = await this.wellnessRepository.getBienestarRegistros(
        userId
      );

      const stats = {
        totalRegistros: registros.length,
        promedioEstres:
          registros.length > 0
            ? registros.reduce((sum, r) => sum + r.nivelEstres, 0) /
              registros.length
            : 0,
        promedioSueno:
          registros.length > 0
            ? registros.reduce((sum, r) => sum + r.horasSueno, 0) /
              registros.length
            : 0,
        promedioAlimentacion:
          registros.length > 0
            ? registros.reduce((sum, r) => sum + r.alimentacionCalidad, 0) /
              registros.length
            : 0,
        registrosRecientes: registros.slice(0, 7),
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

