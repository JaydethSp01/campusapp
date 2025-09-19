import { MenuRepository } from "../../../ports/repositories/MenuRepository";
import { NotificationService } from "../../../ports/services/NotificationService";
import { CreateMenuRequest, Menu } from "../../../domain/entities/Menu";

export class CreateMenuUseCase {
  constructor(
    private menuRepository: MenuRepository,
    private notificationService: NotificationService
  ) {}

  async execute(menuData: CreateMenuRequest): Promise<Menu> {
    // Verificar que no exista menú para la misma fecha
    const menuExistente = await this.menuRepository.getMenuByFecha(
      menuData.fecha
    );
    if (menuExistente) {
      throw new Error("Ya existe un menú para esta fecha");
    }

    const menu = await this.menuRepository.createMenu(menuData);

    // Notificar a usuarios si el menú se publica
    if (menuData.publicado) {
      await this.notificationService.sendMenuNotification(menu.id);
    }

    return menu;
  }
}

