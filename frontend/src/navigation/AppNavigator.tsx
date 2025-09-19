import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useRole } from '../hooks/useRole';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ReportScreen } from '../screens/ReportScreen';
import { WellnessScreen } from '../screens/WellnessScreen';
import { MenuScreen } from '../screens/MenuScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ConfigScreen } from '../screens/ConfigScreen';
import { AdminDashboardScreen } from '../screens/AdminDashboardScreen';
import { AdminWellnessScreen } from '../screens/AdminWellnessScreen';
import { AdminSOSScreen } from '../screens/AdminSOSScreen';
import { AdminStudentsScreen } from '../screens/AdminStudentsScreen';
import { AdminMenuScreen } from '../screens/AdminMenuScreen';
import { AdminReportsScreen } from '../screens/AdminReportsScreen';
import { DocenteDashboardScreen } from '../screens/DocenteDashboardScreen';

type Screen = 
  | 'login' 
  | 'register' 
  | 'home' 
  | 'report' 
  | 'wellness' 
  | 'menu' 
  | 'notifications' 
  | 'config'
  | 'admin-dashboard'
  | 'admin-wellness'
  | 'admin-sos'
  | 'admin-students'
  | 'admin-menu'
  | 'admin-reports'
  | 'docente-dashboard';

export const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { permissions, availableScreens } = useRole();
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Iniciando sesión..." />;
  }

  if (!isAuthenticated) {
    // Resetear a login cuando no está autenticado
    if (currentScreen !== 'login' && currentScreen !== 'register') {
      setCurrentScreen('login');
    }
    
    if (currentScreen === 'login') {
      return (
        <LoginScreen onRegister={() => setCurrentScreen('register')} />
      );
    }
    return (
      <RegisterScreen onBackToLogin={() => setCurrentScreen('login')} />
    );
  }

  // Check if user has admin/teacher permissions
  const isAdmin = permissions.canViewAnalytics && permissions.canManageUsers;
  const isDocente = user?.roles?.some(
    (role: any) => (typeof role === "string" ? role : role.nombre) === "docente"
  );

  const handleNavigate = (screen: string) => {
    // Mapear nombres de pantalla a screens del navegador
    const screenMap: { [key: string]: Screen } = {
      HomeScreen: "home",
      ReportScreen: "report",
      WellnessScreen: "wellness",
      MenuScreen: "menu",
      NotificationsScreen: "notifications",
      ConfigScreen: "config",
      AdminDashboardScreen: "admin-dashboard",
      AdminWellnessScreen: "admin-wellness",
      AdminSOSScreen: "admin-sos",
      AdminStudentsScreen: "admin-students",
      AdminMenuScreen: "admin-menu",
      AdminReportsScreen: "admin-reports",
      DocenteDashboardScreen: "docente-dashboard",
    };

    const targetScreen = screenMap[screen] || (screen as Screen);

    // Validar permisos según el tipo de pantalla
    let hasPermission = false;

    if (targetScreen === "home" || targetScreen === "config") {
      hasPermission = true;
    } else if (targetScreen === "report" && permissions.canViewReports) {
      hasPermission = true;
    } else if (targetScreen === "wellness" && permissions.canViewWellness) {
      hasPermission = true;
    } else if (targetScreen === "menu" && permissions.canViewMenu) {
      hasPermission = true;
    } else if (
      targetScreen === "notifications" &&
      permissions.canViewNotifications
    ) {
      hasPermission = true;
    } else if (targetScreen.startsWith("admin-") && isAdmin) {
      hasPermission = true;
    } else if (targetScreen === "docente-dashboard" && isDocente) {
      hasPermission = true;
    }

    if (hasPermission) {
      setCurrentScreen(targetScreen);
    } else {
      console.warn(`Usuario no tiene permisos para acceder a ${screen}`);
      // Redirigir al home si no tiene permisos
      setCurrentScreen("home");
    }
  };

  // Renderizar pantallas según el tipo de usuario y pantalla actual
  switch (currentScreen) {
    // Pantallas básicas para todos los usuarios
    case 'home':
      return <HomeScreen onNavigate={handleNavigate} />;
    case 'report':
      return <ReportScreen onNavigate={handleNavigate} />;
    case 'wellness':
      return <WellnessScreen onNavigate={handleNavigate} />;
    case 'menu':
      return <MenuScreen onNavigate={handleNavigate} />;
    case 'notifications':
      return <NotificationsScreen onNavigate={handleNavigate} />;
    case 'config':
      return <ConfigScreen onNavigate={handleNavigate} />;
    
    // Pantallas administrativas
    case 'admin-dashboard':
      return <AdminDashboardScreen onNavigate={handleNavigate} />;
    case 'admin-wellness':
      return <AdminWellnessScreen onNavigate={handleNavigate} />;
    case 'admin-sos':
      return <AdminSOSScreen onNavigate={handleNavigate} />;
    case 'admin-students':
      return <AdminStudentsScreen onNavigate={handleNavigate} />;
    case 'admin-menu':
      return <AdminMenuScreen onNavigate={handleNavigate} />;
    case 'admin-reports':
      return <AdminReportsScreen onNavigate={handleNavigate} />;
    case 'docente-dashboard':
      return <DocenteDashboardScreen onNavigate={handleNavigate} />;
    
    default:
      // Pantalla por defecto según el rol del usuario
      if (isDocente && !isAdmin) {
        setCurrentScreen("docente-dashboard");
        return <DocenteDashboardScreen onNavigate={handleNavigate} />;
      } else if (isAdmin) {
        setCurrentScreen("admin-dashboard");
        return <AdminDashboardScreen onNavigate={handleNavigate} />;
      } else {
        setCurrentScreen("home");
        return <HomeScreen onNavigate={handleNavigate} />;
      }
  }
};