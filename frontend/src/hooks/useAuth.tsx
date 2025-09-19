import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../services';
import { User, AuthResponse, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('accessToken');
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      // Error silencioso al verificar estado de autenticación
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      const { user: userData, accessToken, refreshToken } = response.data;
      
      await AsyncStorage.multiSet([
        ['user', JSON.stringify(userData)],
        ['accessToken', accessToken],
        ['refreshToken', refreshToken],
      ]);
      
      setUser(userData);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      const response = await authAPI.register(userData);
      const { user: newUser, accessToken, refreshToken } = response.data;
      
      await AsyncStorage.multiSet([
        ['user', JSON.stringify(newUser)],
        ['accessToken', accessToken],
        ['refreshToken', refreshToken],
      ]);
      
      setUser(newUser);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Limpiar estado inmediatamente
      setUser(null);
      setIsLoading(true);
      
      // Limpiar AsyncStorage
      await AsyncStorage.multiRemove(['user', 'accessToken', 'refreshToken']);
      
      // Intentar logout en el servidor
      try {
        await authAPI.logout();
      } catch (error) {
        // Error silencioso al hacer logout en servidor
        console.log('Logout en servidor falló, pero se limpió el cache local');
      }
    } catch (error) {
      console.error('Error durante logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};