import { useState, useEffect } from 'react';
import { menuAPI } from '../services';
import { CreateMenuRequest, MenuWithPlatos, CreateCalificacionRequest, MenuCalificacion } from '../types';

export const useMenu = () => {
  const [menus, setMenus] = useState<MenuWithPlatos[]>([]);
  const [ratings, setRatings] = useState<MenuCalificacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenus = async () => {
    try {
      setLoading(true);
      const response = await menuAPI.getAll();
      setMenus(response.data);
    } catch (err) {
      setError('Error al cargar menús');
      console.error('Error fetching menus:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRatings = async (menuId: string) => {
    try {
      setLoading(true);
      const response = await menuAPI.getRatings(menuId);
      setRatings(response.data);
    } catch (err) {
      setError('Error al cargar calificaciones');
      console.error('Error fetching ratings:', err);
    } finally {
      setLoading(false);
    }
  };

  const createMenu = async (menuData: CreateMenuRequest) => {
    try {
      setLoading(true);
      const response = await menuAPI.create(menuData);
      await fetchMenus(); // Refresh the list
      return response.data;
    } catch (err) {
      setError('Error al crear menú');
      console.error('Error creating menu:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const rateMenu = async (ratingData: CreateCalificacionRequest) => {
    try {
      setLoading(true);
      const response = await menuAPI.rate(ratingData);
      await fetchRatings(ratingData.menuId); // Refresh ratings
      return response.data;
    } catch (err) {
      setError('Error al calificar menú');
      console.error('Error rating menu:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getMenuByDate = (date: string) => {
    return menus.find(menu => {
      const menuDate = new Date(menu.fecha).toISOString().split('T')[0];
      return menuDate === date;
    });
  };

  const getAverageRating = (menuId: string) => {
    const menuRatings = ratings.filter(rating => rating.menuId === menuId);
    if (menuRatings.length === 0) return 0;
    
    const sum = menuRatings.reduce((acc, rating) => acc + rating.puntuacion, 0);
    return sum / menuRatings.length;
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  return {
    menus,
    ratings,
    loading,
    error,
    createMenu,
    rateMenu,
    fetchMenus,
    fetchRatings,
    getMenuByDate,
    getAverageRating,
  };
};
