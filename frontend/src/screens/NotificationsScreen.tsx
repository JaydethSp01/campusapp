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
import { useNotifications } from '../hooks/useNotifications';
import globalStyles, { colors } from '../styles/globalStyles';

interface NotificationsScreenProps {
  onNavigate: (screen: string) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onNavigate }) => {
  const { notifications, loading, error, markAsRead, getTimeAgo } = useNotifications();

  const mockNotifications = [
    {
      id: '1',
      titulo: 'Ticket #123 actualizado a En proceso',
      mensaje: 'Tu reporte ha sido actualizado',
      leida: false,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: '2',
      titulo: 'Nuevo menú publicado',
      mensaje: 'Revisa el menú del día',
      leida: false,
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    },
  ];

  return (
    <SafeAreaView style={globalStyles.container}>
      <LinearGradient
        colors={['#8B5CF6', '#A855F7']}
        style={globalStyles.header}
      >
        <Text style={globalStyles.headerTitle}>CampusApp</Text>
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
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Notificaciones</Text>
          <Text style={styles.sectionSubtitle}>Eventos recientes</Text>

          {mockNotifications.map((notification, index) => (
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
              {index < mockNotifications.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={globalStyles.bottomNavigation}>
        <TouchableOpacity
          style={globalStyles.bottomNavItem}
          onPress={() => onNavigate('home')}
        >
          <Ionicons name="home" size={24} color="#6B7280" />
          <Text style={globalStyles.bottomNavText}>Inicio</Text>
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
});