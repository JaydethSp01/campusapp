export interface BienestarRegistro {
  id: string;
  usuarioId: string;
  fecha: Date;
  nivelEstres: number; // 0-5
  horasSueno: number;
  alimentacionCalidad: number; // 1-3 (1=pobre, 2=media, 3=buena)
  comentario?: string;
  createdAt: Date;
  deletedAt?: Date;
}

export interface AcosoCaso {
  id: string;
  usuarioId?: string; // NULL = anónimo
  canal: "ayuda_rapida" | "form_bienestar" | "otro";
  descripcion: string;
  estado: "abierto" | "en_atencion" | "cerrado";
  confidencial: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface CreateBienestarRequest {
  fecha: Date;
  nivelEstres: number;
  horasSueno: number;
  alimentacionCalidad: number;
  comentario?: string;
}

export interface CreateAcosoRequest {
  canal: "ayuda_rapida" | "form_bienestar" | "otro";
  descripcion: string;
  confidencial?: boolean;
}

export interface UpdateAcosoRequest {
  estado?: "abierto" | "en_atencion" | "cerrado";
  confidencial?: boolean;
}

