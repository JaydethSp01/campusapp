import { WellnessRepository } from "../../../ports/repositories/WellnessRepository";
import { NotificationService } from "../../../ports/services/NotificationService";
import {
  CreateAcosoRequest,
  AcosoCaso,
} from "../../../domain/entities/Wellness";

export class CreateEmergencyCaseUseCase {
  constructor(
    private wellnessRepository: WellnessRepository,
    private notificationService: NotificationService
  ) {}

  async execute(
    casoData: CreateAcosoRequest,
    usuarioId?: string
  ): Promise<AcosoCaso> {
    const caso = await this.wellnessRepository.createAcosoCaso(
      casoData,
      usuarioId
    );

    // Enviar alerta de emergencia
    if (usuarioId) {
      await this.notificationService.sendEmergencyAlert(
        usuarioId,
        casoData.descripcion
      );
    }

    return caso;
  }
}


