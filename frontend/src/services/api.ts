import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest,
  CreateReporteRequest,
  UpdateReporteRequest,
  CreateBienestarRequest,
  CreateAcosoRequest,
  UpdateAcosoRequest,
  CreateMenuRequest,
  UpdateMenuRequest,
  CreateCalificacionRequest,
  CreateNotificacionRequest
} from '../types';

// Configuración dinámica de la URL base según el entorno
const getBaseURL = () => {
  // Si estamos en web (navegador), usar localhost
  if (typeof window !== 'undefined') {
    return 'http://localhost:3000/api';
  }
  // Si estamos en React Native, usar la IP local
  return 'http://10.0.2.2:3000/api'; // Para Android emulator
};

const API_BASE_URL = getBaseURL();

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor para agregar token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor para manejar errores de token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado, intentar refresh
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });
          const { accessToken } = response.data;
          await AsyncStorage.setItem('accessToken', accessToken);
          
          // Reintentar la petición original
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh falló, limpiar tokens y redirigir a login
          await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user']);
          // Aquí podrías usar un contexto de navegación para redirigir
        }
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: LoginRequest): Promise<{ data: AuthResponse }> =>
    api.post('/auth/login', credentials),
  
  register: (userData: RegisterRequest): Promise<{ data: AuthResponse }> => {
    return api.post('/auth/register', userData);
  },
  
  refresh: (refreshToken: string): Promise<{ data: AuthResponse }> =>
    api.post('/auth/refresh', { refreshToken }),
  
  logout: (): Promise<{ data: { message: string } }> =>
    api.post('/auth/logout'),
};

// Reports API
export const reportsAPI = {
  create: (reportData: CreateReporteRequest): Promise<{ data: any }> =>
    api.post('/reports', reportData),
  
  getAll: (): Promise<{ data: any[] }> =>
    api.get('/reports'),
  
  getById: (id: string): Promise<{ data: any }> =>
    api.get(`/reports/${id}`),
  
  update: (id: string, data: UpdateReporteRequest): Promise<{ data: any }> =>
    api.put(`/reports/${id}`, data),
  
  updateStatus: (id: string, status: string, observacion?: string): Promise<{ data: any }> =>
    api.put(`/reports/${id}/status`, { estado: status, observacion }),
  
  delete: (id: string): Promise<{ data: { message: string } }> =>
    api.delete(`/reports/${id}`),
  
  getInstalaciones: (): Promise<{ data: any[] }> =>
    api.get('/reports/instalaciones'),
};

// Wellness API
export const wellnessAPI = {
  createRecord: (data: CreateBienestarRequest): Promise<{ data: any }> =>
    api.post('/wellness/records', data),
  
  getRecords: (): Promise<{ data: any[] }> =>
    api.get('/wellness/records'),
  
  createEmergencyCase: (data: CreateAcosoRequest): Promise<{ data: any }> =>
    api.post('/wellness/emergency', data),
  
  getEmergencyCases: (): Promise<{ data: any[] }> =>
    api.get('/wellness/emergency'),
  
  updateEmergencyCase: (id: string, data: UpdateAcosoRequest): Promise<{ data: any }> =>
    api.put(`/wellness/emergency/${id}`, data),
};

// Menu API
export const menuAPI = {
  create: (data: CreateMenuRequest): Promise<{ data: any }> =>
    api.post('/menus', data),
  
  getAll: (): Promise<{ data: any[] }> =>
    api.get('/menus'),
  
  getById: (id: string): Promise<{ data: any }> =>
    api.get(`/menus/${id}`),
  
  update: (id: string, data: UpdateMenuRequest): Promise<{ data: any }> =>
    api.put(`/menus/${id}`, data),
  
  delete: (id: string): Promise<{ data: { message: string } }> =>
    api.delete(`/menus/${id}`),
  
  rate: (data: CreateCalificacionRequest): Promise<{ data: any }> =>
    api.post('/menus/rate', data),
  
  getRatings: (menuId: string): Promise<{ data: any[] }> =>
    api.get(`/menus/${menuId}/ratings`),
};

// Notifications API
export const notificationsAPI = {
  getAll: (): Promise<{ data: any[] }> =>
    api.get('/notifications'),
  
  markAsRead: (id: string): Promise<{ data: any }> =>
    api.put(`/notifications/${id}/read`),
  
  markAllAsRead: (): Promise<{ data: { message: string } }> =>
    api.put('/notifications/read-all'),
  
  create: (data: CreateNotificacionRequest): Promise<{ data: any }> =>
    api.post('/notifications', data),
};

export default api;
