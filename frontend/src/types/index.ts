// User Types
export interface User {
  id: string;
  nombre: string;
  email: string;
  role?: string;
  roles?: Array<{ id: number; nombre: string }> | string[];
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface AuthResponse {
  user: Omit<User, "passwordHash">;
  accessToken: string;
  refreshToken: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  roles: number[]; // Array de IDs de roles
}

// Report Types
export interface Instalacion {
  id: string;
  nombre: string;
  descripcion?: string;
  ubicacion?: string;
  imagen?: string;
  activo: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ReporteDanio {
  id: string;
  instalacionId: string;
  usuarioId: string;
  titulo: string;
  descripcion: string;
  urgencia: "baja" | "media" | "alta" | "critica";
  estadoActual: "pendiente" | "en_proceso" | "resuelto" | "verificado" | "escalado";
  fotos?: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateReporteRequest {
  instalacionId: string;
  titulo: string;
  descripcion: string;
  urgencia: "baja" | "media" | "alta" | "critica";
  fotos?: string[];
}

export interface UpdateReporteRequest {
  titulo?: string;
  descripcion?: string;
  urgencia?: "baja" | "media" | "alta" | "critica";
  estadoActual?: "pendiente" | "en_proceso" | "resuelto" | "verificado" | "escalado";
  fotos?: string[];
}

// Wellness Types
export interface BienestarRegistro {
  id: string;
  usuarioId: string;
  fecha: Date;
  nivelEstres: number; // 1-10
  calidadSueno: number; // 1-10
  calidadComida: number; // 1-10
  notas?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AcosoCaso {
  id: string;
  usuarioId: string;
  canal: "anonimo" | "identificado";
  tipo: "sexual" | "verbal" | "fisico" | "ciber" | "otro";
  descripcion: string;
  estado: "abierto" | "en_investigacion" | "resuelto" | "cerrado";
  confidencial: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBienestarRequest {
  nivelEstres: number;
  calidadSueno: number;
  calidadComida: number;
  notas?: string;
}

export interface CreateAcosoRequest {
  canal: "anonimo" | "identificado";
  tipo: "sexual" | "verbal" | "fisico" | "ciber" | "otro";
  descripcion: string;
}

export interface UpdateAcosoRequest {
  estado?: "abierto" | "en_investigacion" | "resuelto" | "cerrado";
}

// Menu Types
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

// Notification Types
export interface Notificacion {
  id: string;
  usuarioId: string;
  canal: "push" | "email" | "sms";
  titulo: string;
  mensaje: string;
  leida: boolean;
  estado: "pendiente" | "enviada" | "fallida";
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNotificacionRequest {
  usuarioId: string;
  canal: "push" | "email" | "sms";
  titulo: string;
  mensaje: string;
}

// Navigation Types
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
  AdminDashboard: undefined;
  AdminWellness: undefined;
  AdminSOS: undefined;
  AdminStudents: undefined;
  AdminMenu: undefined;
};

export type TabParamList = {
  Home: undefined;
  Report: undefined;
  Wellness: undefined;
  Menu: undefined;
  Notifications: undefined;
  Config: undefined;
  AdminDashboard: undefined;
  AdminWellness: undefined;
  AdminSOS: undefined;
  AdminStudents: undefined;
  AdminMenu: undefined;
};

export type AdminTabParamList = {
  AdminDashboard: undefined;
  AdminWellness: undefined;
  AdminSOS: undefined;
  AdminStudents: undefined;
  AdminMenu: undefined;
};