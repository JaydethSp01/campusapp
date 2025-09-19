import { ReportRepository } from "../../../ports/repositories/ReportRepository";
import { NotificationService } from "../../../ports/services/NotificationService";
import {
  UpdateReporteRequest,
  ReporteDanio,
} from "../../../domain/entities/Report";

export class UpdateReportStatusUseCase {
  constructor(
    private reportRepository: ReportRepository,
    private notificationService: NotificationService
  ) {}

  async execute(
    reporteId: string,
    data: UpdateReporteRequest,
    actorId?: string
  ): Promise<ReporteDanio | null> {
    const reporte = await this.reportRepository.getReporteById(reporteId);
    if (!reporte) {
      throw new Error("Reporte no encontrado");
    }

    const estadoAnterior = reporte.estadoActual;
    const reporteActualizado = await this.reportRepository.updateReporte(
      reporteId,
      data
    );

    if (
      reporteActualizado &&
      data.estadoActual &&
      data.estadoActual !== estadoAnterior
    ) {
      // Agregar al historial
      await this.reportRepository.addEstadoHistorial({
        reporteId,
        estado: data.estadoActual,
        observacion: data.observacion,
        actorId,
      });

      // Notificar cambio de estado
      await this.notificationService.sendReportStatusNotification(
        reporteId,
        data.estadoActual
      );
    }

    return reporteActualizado;
  }
}


