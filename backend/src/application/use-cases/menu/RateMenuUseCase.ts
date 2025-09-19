import { MenuRepository } from "../../../ports/repositories/MenuRepository";
import {
  CreateCalificacionRequest,
  MenuCalificacion,
} from "../../../domain/entities/Menu";

export class RateMenuUseCase {
  constructor(private menuRepository: MenuRepository) {}

  async execute(
    calificacionData: CreateCalificacionRequest
  ): Promise<MenuCalificacion> {
    // Verificar que el menú existe
    const menu = await this.menuRepository.getMenuById(calificacionData.menuId);
    if (!menu) {
      throw new Error("Menú no encontrado");
    }

    // Verificar que el usuario no haya calificado ya este menú
    const calificacionesExistentes =
      await this.menuRepository.getCalificacionesByMenu(
        calificacionData.menuId
      );
    const calificacionExistente = calificacionesExistentes.find(
      (c) => c.usuarioId === calificacionData.usuarioId
    );

    if (calificacionExistente) {
      throw new Error("Ya has calificado este menú");
    }

    return await this.menuRepository.createCalificacion(calificacionData);
  }
}

