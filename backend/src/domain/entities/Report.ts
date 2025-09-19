export interface Instalacion {
  id: string;
  nombre: string;
  descripcion?: string;
  ubicacionTexto?: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface SLAPolitica {
  id: number;
  nombre: string;
  tiempoObjetivoHoras: number;
}

export interface ReporteDanio {
  id: string;
  instalacionId: string;
  usuarioId?: string;
  prioridadId: number;
  descripcion: string;
  estadoActual:
    | "pendiente"
    | "en_proceso"
    | "resuelto"
    | "verificado"
    | "escalado";
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ReporteEstadoHistorial {
  id: number;
  reporteId: string;
  estado: "pendiente" | "en_proceso" | "resuelto" | "verificado" | "escalado";
  observacion?: string;
  actorId?: string;
  createdAt: Date;
}

export interface CreateReporteRequest {
  instalacionId: string;
  descripcion: string;
  prioridadId: number;
  foto?: string;
}

export interface UpdateReporteRequest {
  descripcion?: string;
  estadoActual?:
    | "pendiente"
    | "en_proceso"
    | "resuelto"
    | "verificado"
    | "escalado";
  observacion?: string;
}


