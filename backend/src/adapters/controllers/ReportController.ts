import { Request, Response } from "express";
import { CreateReportUseCase } from "../../application/use-cases/reports/CreateReportUseCase";
import { UpdateReportStatusUseCase } from "../../application/use-cases/reports/UpdateReportStatusUseCase";
import { ReportRepository } from "../../ports/repositories/ReportRepository";
import Joi from "joi";

const createReportSchema = Joi.object({
  instalacionId: Joi.string().uuid().required(),
  descripcion: Joi.string().min(10).max(1000).required(),
  prioridadId: Joi.number().integer().positive().required(),
  foto: Joi.string().optional(),
});

const updateReportSchema = Joi.object({
  descripcion: Joi.string().min(10).max(1000).optional(),
  estadoActual: Joi.string()
    .valid("pendiente", "en_proceso", "resuelto", "verificado", "escalado")
    .optional(),
  observacion: Joi.string().max(500).optional(),
});

export class ReportController {
  constructor(
    private createReportUseCase: CreateReportUseCase,
    private updateReportStatusUseCase: UpdateReportStatusUseCase,
    private reportRepository: ReportRepository
  ) {}

  async createReport(req: Request, res: Response): Promise<void> {
    try {
      const { error, value } = createReportSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const userId = (req as any).user?.id;
      const result = await this.createReportUseCase.execute(value, userId);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async getReports(req: Request, res: Response): Promise<void> {
    try {
      const reports = await this.reportRepository.getReportes();
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getReportById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const report = await this.reportRepository.getReporteById(id);

      if (!report) {
        res.status(404).json({ error: "Reporte no encontrado" });
        return;
      }

      res.json(report);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async updateReport(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { error, value } = updateReportSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const userId = (req as any).user?.id;
      const result = await this.updateReportStatusUseCase.execute(
        id,
        value,
        userId
      );

      if (!result) {
        res.status(404).json({ error: "Reporte no encontrado" });
        return;
      }

      res.json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async updateReportStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { estado, observacion } = req.body;
      
      if (!estado) {
        res.status(400).json({ error: "El estado es requerido" });
        return;
      }

      const userId = (req as any).user?.id;
      const result = await this.updateReportStatusUseCase.execute(
        id,
        { estadoActual: estado, observacion },
        userId
      );

      if (!result) {
        res.status(404).json({ error: "Reporte no encontrado" });
        return;
      }

      res.json(result);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  async deleteReport(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const success = await this.reportRepository.deleteReporte(id);

      if (!success) {
        res.status(404).json({ error: "Reporte no encontrado" });
        return;
      }

      res.json({ message: "Reporte eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getInstalaciones(req: Request, res: Response): Promise<void> {
    try {
      const instalaciones = await this.reportRepository.getInstalaciones();
      res.json(instalaciones);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getSLAPoliticas(req: Request, res: Response): Promise<void> {
    try {
      const politicas = await this.reportRepository.getSLAPoliticas();
      res.json(politicas);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  async getReportHistory(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const history = await this.reportRepository.getEstadoHistorial(id);
      res.json(history);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}

