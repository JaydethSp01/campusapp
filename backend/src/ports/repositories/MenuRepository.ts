import {
  Menu,
  MenuPlato,
  MenuCalificacion,
  CreateMenuRequest,
  UpdateMenuRequest,
  CreateCalificacionRequest,
  MenuWithPlatos,
} from "../../domain/entities/Menu";

export interface MenuRepository {
  // Menús
  createMenu(menu: CreateMenuRequest): Promise<Menu>;
  getMenus(): Promise<Menu[]>;
  getMenuById(id: string): Promise<Menu | null>;
  getMenuByFecha(fecha: Date): Promise<Menu | null>;
  updateMenu(id: string, data: UpdateMenuRequest): Promise<Menu | null>;
  deleteMenu(id: string): Promise<boolean>;
  getMenuWithPlatos(id: string): Promise<MenuWithPlatos | null>;
  getMenusPublicados(): Promise<Menu[]>;

  // Platos
  createMenuPlato(plato: Omit<MenuPlato, "id">): Promise<MenuPlato>;
  getPlatosByMenu(menuId: string): Promise<MenuPlato[]>;
  updateMenuPlato(
    id: number,
    data: Partial<MenuPlato>
  ): Promise<MenuPlato | null>;
  deleteMenuPlato(id: number): Promise<boolean>;

  // Calificaciones
  createCalificacion(
    calificacion: CreateCalificacionRequest
  ): Promise<MenuCalificacion>;
  getCalificacionesByMenu(menuId: string): Promise<MenuCalificacion[]>;
  getCalificacionesByUsuario(usuarioId: string): Promise<MenuCalificacion[]>;
  getCalificacionById(id: number): Promise<MenuCalificacion | null>;
  updateCalificacion(
    id: number,
    data: Partial<CreateCalificacionRequest>
  ): Promise<MenuCalificacion | null>;
  deleteCalificacion(id: number): Promise<boolean>;
  getPromedioCalificacion(menuId: string): Promise<number>;
}

