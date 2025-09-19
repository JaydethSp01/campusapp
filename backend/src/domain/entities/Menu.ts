export interface Menu {
  id: string;
  fecha: Date;
  publicado: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuPlato {
  id: number;
  menuId: string;
  tipo: "principal" | "acompanamiento" | "bebida" | "postre";
  nombre: string;
}

export interface MenuCalificacion {
  id: number;
  menuId: string;
  usuarioId: string;
  puntuacion: number; // 1-5
  comentario?: string;
  createdAt: Date;
}

export interface CreateMenuRequest {
  fecha: Date;
  platos: {
    tipo: "principal" | "acompanamiento" | "bebida" | "postre";
    nombre: string;
  }[];
  publicado?: boolean;
}

export interface UpdateMenuRequest {
  platos?: {
    tipo: "principal" | "acompanamiento" | "bebida" | "postre";
    nombre: string;
  }[];
  publicado?: boolean;
}

export interface CreateCalificacionRequest {
  menuId: string;
  usuarioId: string;
  puntuacion: number;
  comentario?: string;
}

export interface MenuWithPlatos extends Menu {
  platos: MenuPlato[];
  calificaciones?: MenuCalificacion[];
  promedioCalificacion?: number;
}

