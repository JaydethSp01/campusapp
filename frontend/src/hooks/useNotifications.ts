import { useState, useEffect } from 'react';
import { notificationsAPI } from '../services';
import { Notificacion } from '../types';
import { useAuth } from './useAuth';

export const useNotifications = () => {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notificacion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationsAPI.getAll();
      setNotifications(response.data);
      setUnreadCount(response.data.filter(n => !n.leida).length);
    } catch (err) {
      setError('Error al cargar notificaciones');
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      setLoading(true);
      await notificationsAPI.markAsRead(id);
      await fetchNotifications(); // Refresh the list
    } catch (err) {
      setError('Error al marcar notificación como leída');
      console.error('Error marking notification as read:', err);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      setLoading(true);
      await notificationsAPI.markAllAsRead();
      await fetchNotifications(); // Refresh the list
    } catch (err) {
      setError('Error al marcar todas las notificaciones como leídas');
      console.error('Error marking all notifications as read:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRecentNotifications = (limit: number = 5) => {
    return notifications
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'hace un momento';
    if (diffInSeconds < 3600) return `hace ${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `hace ${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 2592000) return `hace ${Math.floor(diffInSeconds / 86400)}d`;
    
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    fetchNotifications,
    getRecentNotifications,
    getTimeAgo,
  };
};
