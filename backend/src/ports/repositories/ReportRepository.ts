import {
  Instalacion,
  SLAPolitica,
  ReporteDanio,
  ReporteEstadoHistorial,
  CreateReporteRequest,
  UpdateReporteRequest,
} from "../../domain/entities/Report";

export interface ReportRepository {
  // Instalaciones
  createInstalacion(
    instalacion: Omit<Instalacion, "id" | "createdAt" | "updatedAt">
  ): Promise<Instalacion>;
  getInstalaciones(): Promise<Instalacion[]>;
  getInstalacionById(id: string): Promise<Instalacion | null>;
  updateInstalacion(
    id: string,
    data: Partial<Instalacion>
  ): Promise<Instalacion | null>;
  deleteInstalacion(id: string): Promise<boolean>;

  // SLA Políticas
  getSLAPoliticas(): Promise<SLAPolitica[]>;
  getSLAPoliticaById(id: number): Promise<SLAPolitica | null>;

  // Reportes
  createReporte(
    reporte: CreateReporteRequest,
    usuarioId?: string
  ): Promise<ReporteDanio>;
  getReportes(): Promise<ReporteDanio[]>;
  getReporteById(id: string): Promise<ReporteDanio | null>;
  updateReporte(
    id: string,
    data: UpdateReporteRequest
  ): Promise<ReporteDanio | null>;
  deleteReporte(id: string): Promise<boolean>;
  getReportesByUsuario(usuarioId: string): Promise<ReporteDanio[]>;
  getReportesByEstado(estado: string): Promise<ReporteDanio[]>;

  // Historial de Estados
  addEstadoHistorial(
    historial: Omit<ReporteEstadoHistorial, "id" | "createdAt">
  ): Promise<ReporteEstadoHistorial>;
  getEstadoHistorial(reporteId: string): Promise<ReporteEstadoHistorial[]>;
}


