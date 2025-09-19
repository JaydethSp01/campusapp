import { useAuth } from './useAuth';

export interface RolePermissions {
  canViewDashboard: boolean;
  canManageUsers: boolean;
  canViewUsers: boolean;
  canViewReports: boolean;
  canManageReports: boolean;
  canViewWellness: boolean;
  canManageWellness: boolean;
  canViewMenu: boolean;
  canManageMenu: boolean;
  canViewNotifications: boolean;
  canManageNotifications: boolean;
  canViewSOS: boolean;
  canManageSOS: boolean;
  canViewAnalytics: boolean;
  canExportData: boolean;
  canManageSystem: boolean;
}

export const useRole = () => {
  const { user } = useAuth();

  const getUserRoles = (): string[] => {
    if (!user || !user.roles) return [];
    // Convertir los roles del backend (array de objetos) a array de strings
    return user.roles.map((role: any) => role.nombre || role);
  };

  const hasRole = (role: string): boolean => {
    const userRoles = getUserRoles();
    return userRoles.includes(role);
  };

  const hasAnyRole = (roles: string[]): boolean => {
    const userRoles = getUserRoles();
    return roles.some(role => userRoles.includes(role));
  };

  const hasAllRoles = (roles: string[]): boolean => {
    const userRoles = getUserRoles();
    return roles.every(role => userRoles.includes(role));
  };

  const getPermissions = (): RolePermissions => {
    const userRoles = getUserRoles();
    
    return {
      // Dashboard
      canViewDashboard: hasAnyRole(["admin", "docente", "estudiante"]),

      // Users
      canManageUsers: hasRole("admin"),
      canViewUsers: hasAnyRole(["admin", "docente"]),

      // Reports
      canViewReports: hasAnyRole(["admin", "docente", "estudiante"]),
      canManageReports: hasAnyRole(["admin", "docente"]),

      // Wellness
      canViewWellness: hasAnyRole(["admin", "docente", "estudiante"]),
      canManageWellness: hasAnyRole(["admin", "docente"]),

      // Menu
      canViewMenu: hasAnyRole(["admin", "docente", "estudiante"]),
      canManageMenu: hasAnyRole(["admin", "comedor"]),

      // Notifications
      canViewNotifications: hasAnyRole(["admin", "docente", "estudiante"]),
      canManageNotifications: hasRole("admin"),

      // SOS
      canViewSOS: hasAnyRole(["admin", "docente"]),
      canManageSOS: hasAnyRole(["admin", "docente"]),

      // Analytics
      canViewAnalytics: hasRole("admin"),
      canExportData: hasRole("admin"),

      // System
      canManageSystem: hasRole("admin"),
    };
  };

  const getRoleDisplayName = (): string => {
    const userRoles = getUserRoles();
    
    if (userRoles.includes('admin')) return 'Administrador';
    if (userRoles.includes('docente')) return 'Docente';
    if (userRoles.includes('estudiante')) return 'Estudiante';
    if (userRoles.includes('comedor')) return 'Personal de Comedor';
    if (userRoles.includes('mantenimiento')) return 'Personal de Mantenimiento';
    if (userRoles.includes('bienestar')) return 'Personal de Bienestar';
    
    return 'Usuario';
  };

  const getRoleColor = (): string => {
    const userRoles = getUserRoles();
    
    if (userRoles.includes('admin')) return '#7C3AED';
    if (userRoles.includes('docente')) return '#8B5CF6';
    if (userRoles.includes('estudiante')) return '#8B5CF6';
    if (userRoles.includes('comedor')) return '#F59E0B';
    if (userRoles.includes('mantenimiento')) return '#10B981';
    if (userRoles.includes('bienestar')) return '#EF4444';
    
    return '#6B7280';
  };

  const getAvailableScreens = (): string[] => {
    const permissions = getPermissions();
    const screens: string[] = [];

    // Screens básicas para todos
    screens.push('HomeScreen');
    screens.push('ConfigScreen');

    // Screens según permisos
    if (permissions.canViewReports) {
      screens.push('ReportScreen');
    }
    
    if (permissions.canManageReports) {
      screens.push('AdminReportsScreen');
    }

    if (permissions.canViewWellness) {
      screens.push('WellnessScreen');
    }
    
    if (permissions.canManageWellness) {
      screens.push('AdminWellnessScreen');
    }

    if (permissions.canViewMenu) {
      screens.push('MenuScreen');
    }
    
    if (permissions.canManageMenu) {
      screens.push('AdminMenuScreen');
    }

    if (permissions.canViewNotifications) {
      screens.push('NotificationsScreen');
    }

    if (permissions.canManageUsers) {
      screens.push('AdminStudentsScreen');
    }

    if (permissions.canViewSOS) {
      screens.push('AdminSOSScreen');
    }

    if (permissions.canViewAnalytics) {
      screens.push('AdminDashboardScreen');
    }

    // Pantalla específica para docentes
    if (hasRole("docente")) {
      screens.push("DocenteDashboardScreen");
    }

    return screens;
  };

  return {
    userRoles: getUserRoles(),
    hasRole,
    hasAnyRole,
    hasAllRoles,
    permissions: getPermissions(),
    roleDisplayName: getRoleDisplayName(),
    roleColor: getRoleColor(),
    availableScreens: getAvailableScreens(),
  };
};
