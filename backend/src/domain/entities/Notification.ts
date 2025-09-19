export interface Notificacion {
  id: number;
  usuarioId: string;
  canal: "push" | "email";
  titulo: string;
  mensaje: string;
  estado: "pendiente" | "enviado" | "fallido";
  createdAt: Date;
  enviadoAt?: Date;
}

export interface CreateNotificacionRequest {
  usuarioId: string;
  canal: "push" | "email";
  titulo: string;
  mensaje: string;
}

export interface AuditoriaLog {
  id: number;
  actorId?: string;
  entidad: string;
  entidadId: string;
  accion: "create" | "update" | "delete" | "status_change";
  beforeJson?: Record<string, unknown>;
  afterJson?: Record<string, unknown>;
  createdAt: Date;
}


