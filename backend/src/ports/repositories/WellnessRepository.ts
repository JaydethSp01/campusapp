import {
  BienestarRegistro,
  AcosoCaso,
  CreateBienestarRequest,
  CreateAcosoRequest,
  UpdateAcosoRequest,
} from "../../domain/entities/Wellness";

export interface WellnessRepository {
  // Bienestar Registros
  createBienestarRegistro(
    registro: CreateBienestarRequest,
    usuarioId: string
  ): Promise<BienestarRegistro>;
  getBienestarRegistros(usuarioId: string): Promise<BienestarRegistro[]>;
  getBienestarRegistroById(id: string): Promise<BienestarRegistro | null>;
  updateBienestarRegistro(
    id: string,
    data: Partial<CreateBienestarRequest>
  ): Promise<BienestarRegistro | null>;
  deleteBienestarRegistro(id: string): Promise<boolean>;
  getBienestarRegistrosByFecha(fecha: Date): Promise<BienestarRegistro[]>;
  getBienestarRegistrosByRango(
    fechaInicio: Date,
    fechaFin: Date
  ): Promise<BienestarRegistro[]>;

  // Acoso Casos
  createAcosoCaso(
    caso: CreateAcosoRequest,
    usuarioId?: string
  ): Promise<AcosoCaso>;
  getAcosoCasos(): Promise<AcosoCaso[]>;
  getAcosoCasoById(id: string): Promise<AcosoCaso | null>;
  updateAcosoCaso(
    id: string,
    data: UpdateAcosoRequest
  ): Promise<AcosoCaso | null>;
  deleteAcosoCaso(id: string): Promise<boolean>;
  getAcosoCasosByEstado(estado: string): Promise<AcosoCaso[]>;
  getAcosoCasosByUsuario(usuarioId: string): Promise<AcosoCaso[]>;
}


