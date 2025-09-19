import { WellnessRepository } from "../../../ports/repositories/WellnessRepository";
import { NotificationService } from "../../../ports/services/NotificationService";
import {
  CreateBienestarRequest,
  BienestarRegistro,
} from "../../../domain/entities/Wellness";

export class CreateWellnessRecordUseCase {
  constructor(
    private wellnessRepository: WellnessRepository,
    private notificationService: NotificationService
  ) {}

  async execute(
    registroData: CreateBienestarRequest,
    usuarioId: string
  ): Promise<BienestarRegistro> {
    // Validar que no exista registro para la misma fecha
    const registrosExistentes =
      await this.wellnessRepository.getBienestarRegistrosByFecha(
        registroData.fecha
      );
    const registroExistente = registrosExistentes.find(
      (r) => r.usuarioId === usuarioId
    );

    if (registroExistente) {
      throw new Error("Ya existe un registro de bienestar para esta fecha");
    }

    const registro = await this.wellnessRepository.createBienestarRegistro(
      registroData,
      usuarioId
    );

    // Enviar alerta si hay indicadores de riesgo
    if (registroData.nivelEstres >= 4 || registroData.horasSueno <= 5.5) {
      await this.notificationService.sendWellnessAlert(
        usuarioId,
        "riesgo_alto"
      );
    }

    return registro;
  }
}

