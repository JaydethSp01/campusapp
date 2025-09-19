import { ReportRepository } from "../../../ports/repositories/ReportRepository";
import { NotificationService } from "../../../ports/services/NotificationService";
import {
  CreateReporteRequest,
  ReporteDanio,
} from "../../../domain/entities/Report";

export class CreateReportUseCase {
  constructor(
    private reportRepository: ReportRepository,
    private notificationService: NotificationService
  ) {}

  async execute(
    reporteData: CreateReporteRequest,
    usuarioId?: string
  ): Promise<ReporteDanio> {
    const reporte = await this.reportRepository.createReporte(
      reporteData,
      usuarioId
    );

    // Notificar a administradores sobre nuevo reporte
    await this.notificationService.sendReportStatusNotification(
      reporte.id,
      "pendiente"
    );

    return reporte;
  }
}

