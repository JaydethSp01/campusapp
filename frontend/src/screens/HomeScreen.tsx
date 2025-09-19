import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { useNotifications } from '../hooks/useNotifications';
import { useRole } from '../hooks/useRole';
import globalStyles, { colors } from '../styles/globalStyles';
import adminStyles from '../styles/adminStyles';
import docentesStyles from '../styles/docentesStyles';
import usuarioStyles from '../styles/usuarioStyles';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { getRecentNotifications, getTimeAgo } = useNotifications();
  const { permissions, roleDisplayName, roleColor } = useRole();

  const recentNotifications = getRecentNotifications(2);

  // Función para obtener estilos según el rol del usuario
  const getStylesByRole = () => {
    if (!user) return { ...usuarioStyles, adminHeader: {}, dashboardHeader: {}, adminTitle: {}, adminSubtitle: {} };
    
    const userRoles = user.roles || [];
    const hasRole = (roleName: string) => userRoles.some((role: any) => 
      (typeof role === 'string' ? role : role.nombre) === roleName
    );
    
    if (hasRole('admin')) return { ...adminStyles, adminHeader: adminStyles.adminHeader, dashboardHeader: adminStyles.adminHeader, adminTitle: adminStyles.adminTitle, adminSubtitle: adminStyles.adminSubtitle };
    if (hasRole('docente')) return { ...docentesStyles, adminHeader: docentesStyles.docentesHeader, dashboardHeader: docentesStyles.docentesHeader, adminTitle: docentesStyles.headerTitle, adminSubtitle: docentesStyles.headerTitle };
    return { ...usuarioStyles, adminHeader: {}, dashboardHeader: {}, adminTitle: {}, adminSubtitle: {} };
  };

  const roleStyles = getStylesByRole();

  // Acciones rápidas según los permisos del usuario
  const getQuickActions = (): QuickAction[] => {
    if (!user) return [];
    
    const actions: QuickAction[] = [];
    
    // Dashboard Admin
    if (permissions.canViewAnalytics) {
      actions.push({
        id: 'dashboard',
        title: 'Dashboard',
        icon: 'analytics',
        color: roleColor,
        onPress: () => onNavigate('AdminDashboardScreen'),
      });
    }
    
    // Gestión de usuarios
    if (permissions.canManageUsers) {
      actions.push({
        id: 'users',
        title: 'Gestión Usuarios',
        icon: 'people',
        color: '#10B981',
        onPress: () => onNavigate('AdminStudentsScreen'),
      });
    }
    
    // Reportes
    if (permissions.canViewReports) {
      actions.push({
        id: 'reports',
        title: permissions.canManageReports ? 'Reportes' : 'Reportar problema',
        icon: permissions.canManageReports ? 'document-text' : 'construct',
        color: '#F59E0B',
        onPress: () => onNavigate(permissions.canManageReports ? 'AdminReportsScreen' : 'report'),
      });
    }
    
    // Bienestar
    if (permissions.canViewWellness) {
      actions.push({
        id: 'wellness',
        title: permissions.canManageWellness ? 'Bienestar Estudiantil' : 'Check-in bienestar',
        icon: 'heart',
        color: '#DC2626',
        onPress: () => onNavigate(permissions.canManageWellness ? 'AdminWellnessScreen' : 'wellness'),
      });
    }
    
    // Menú
    if (permissions.canViewMenu) {
      actions.push({
        id: 'menu',
        title: permissions.canManageMenu ? 'Gestión Menú' : 'Ver menú',
        icon: 'restaurant',
        color: '#F59E0B',
        onPress: () => onNavigate(permissions.canManageMenu ? 'AdminMenuScreen' : 'menu'),
      });
    }
    
    // Notificaciones
    if (permissions.canViewNotifications) {
      actions.push({
        id: 'notifications',
        title: 'Notificaciones',
        icon: 'notifications',
        color: '#8B5CF6',
        onPress: () => onNavigate('notifications'),
      });
    }
    
    // SOS
    if (permissions.canViewSOS) {
      actions.push({
        id: 'sos',
        title: 'SOS',
        icon: 'warning',
        color: '#DC2626',
        onPress: () => onNavigate('AdminSOSScreen'),
      });
    }

    // Dashboard específico para docentes
    if (user?.roles?.some((role: any) => (typeof role === 'string' ? role : role.nombre) === 'docente')) {
      actions.push({
        id: 'docente-dashboard',
        title: 'Panel Docente',
        icon: 'school',
        color: '#8B5CF6',
        onPress: () => onNavigate('docente-dashboard'),
      });
    }
    
    return actions;
  };

  const quickActions = getQuickActions();

  return (
    <SafeAreaView style={globalStyles.container}>
      <LinearGradient
        colors={[roleColor, '#A855F7']}
        style={user?.roles?.some((role: any) => (typeof role === 'string' ? role : role.nombre) === 'admin') ? roleStyles.adminHeader : roleStyles.dashboardHeader}
      >
        <Text style={user?.roles?.some((role: any) => (typeof role === 'string' ? role : role.nombre) === 'admin') ? roleStyles.adminTitle : globalStyles.headerTitle}>
          CampusApp
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => onNavigate('notifications')}>
            <Ionicons name="notifications" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate('config')}>
            <Ionicons name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={user?.roles?.some((role: any) => (typeof role === 'string' ? role : role.nombre) === 'admin') ? roleStyles.adminHeader : styles.welcomeSection}>
          <Text style={user?.roles?.some((role: any) => (typeof role === 'string' ? role : role.nombre) === 'admin') ? roleStyles.adminSubtitle : styles.welcomeText}>
            ¡Hola, {user?.nombre || 'Usuario'}!
          </Text>
          <Text style={styles.welcomeSubtext}>
            {roleDisplayName} • ¿En qué podemos ayudarte hoy?
          </Text>
        </View>

        <View style={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <TouchableOpacity
              key={action.id}
              style={[styles.quickActionCard, { backgroundColor: action.color }]}
              onPress={action.onPress}
            >
              <Ionicons name={action.icon as any} size={32} color="white" />
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Notificaciones recientes</Text>
          <Text style={styles.sectionSubtitle}>Mantente al día</Text>

          {recentNotifications.length > 0 ? (
            recentNotifications.map((notification, index) => (
              <View key={notification.id}>
                <View style={styles.notificationItem}>
                  <View style={styles.notificationContent}>
                    <Text style={styles.notificationTitle}>{notification.titulo}</Text>
                    <Text style={styles.notificationTime}>
                      {getTimeAgo(notification.createdAt)}
                    </Text>
                  </View>
                  {!notification.leida && <View style={styles.unreadDot} />}
                </View>
                {index < recentNotifications.length - 1 && <View style={styles.separator} />}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="notifications-outline" size={48} color="#9CA3AF" />
              <Text style={styles.emptyStateText}>No hay notificaciones recientes</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={globalStyles.bottomNavigation}>
        <TouchableOpacity
          style={globalStyles.bottomNavItem}
          onPress={() => onNavigate('home')}
        >
          <Ionicons name="home" size={24} color="#8B5CF6" />
          <Text style={[globalStyles.bottomNavText, globalStyles.bottomNavTextActive]}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.bottomNavItem}
          onPress={() => onNavigate('report')}
        >
          <Ionicons name="construct" size={24} color="#6B7280" />
          <Text style={globalStyles.bottomNavText}>Reporte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.bottomNavItem}
          onPress={() => onNavigate('wellness')}
        >
          <Ionicons name="heart" size={24} color="#6B7280" />
          <Text style={globalStyles.bottomNavText}>Bienestar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.bottomNavItem}
          onPress={() => onNavigate('menu')}
        >
          <Ionicons name="restaurant" size={24} color="#6B7280" />
          <Text style={globalStyles.bottomNavText}>Menú</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.bottomNavItem}
          onPress={() => onNavigate('config')}
        >
          <Ionicons name="settings" size={24} color="#6B7280" />
          <Text style={globalStyles.bottomNavText}>Config</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
  },
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickActionCard: {
    width: '48%',
    marginBottom: 15,
    marginRight: '2%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  quickActionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginLeft: 8,
  },
  separator: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginLeft: 0,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 12,
  },
});