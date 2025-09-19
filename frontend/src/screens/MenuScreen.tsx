import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useMenu } from '../hooks/useMenu';
import globalStyles, { colors } from '../styles/globalStyles';

interface MenuScreenProps {
  onNavigate: (screen: string) => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onNavigate }) => {
  const { menus, loading, error, rateMenu, getMenuByDate } = useMenu();
  const [selectedDate, setSelectedDate] = useState('18/09/2025');
  const [rating, setRating] = useState(2);
  const [comment, setComment] = useState('');

  const emojis = ['😡', '😞', '😐', '😊', '🤩'];

  const handleRating = async () => {
    if (!rating) {
      Alert.alert('Error', 'Por favor selecciona una calificación');
      return;
    }

    try {
      const todayMenu = getMenuByDate(selectedDate);
      if (!todayMenu) {
        Alert.alert('Error', 'No hay menú disponible para esta fecha');
        return;
      }

      await rateMenu({
        menuId: todayMenu.id,
        usuarioId: 'current-user-id', // Esto debería venir del contexto de auth
        puntuacion: rating,
        comentario: comment,
      });

      Alert.alert('Éxito', 'Calificación enviada correctamente');
      setComment('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo enviar la calificación');
    }
  };

  const todayMenu = getMenuByDate(selectedDate);

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
          <Text style={globalStyles.sectionTitle}>Menú del comedor</Text>
          <Text style={styles.sectionSubtitle}>Selecciona fecha</Text>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Fecha</Text>
            <View style={styles.dateInput}>
              <TextInput
                style={styles.dateText}
                value={selectedDate}
                onChangeText={setSelectedDate}
                placeholder="DD/MM/YYYY"
              />
              <Ionicons name="calendar" size={20} color="#6B7280" />
            </View>
          </View>

          {todayMenu && (
            <View style={styles.menuDetails}>
              <Text style={styles.menuItem}>
                <Text style={styles.menuItemLabel}>Principal: </Text>
                Arroz con pollo
              </Text>
              <Text style={styles.menuItem}>
                <Text style={styles.menuItemLabel}>Acompañamiento: </Text>
                Ensalada fresca
              </Text>
              <Text style={styles.menuItem}>
                <Text style={styles.menuItemLabel}>Bebida: </Text>
                Jugo de mango
              </Text>
              <Text style={styles.menuItem}>
                <Text style={styles.menuItemLabel}>Postre: </Text>
                Gelatina
              </Text>
            </View>
          )}
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Calificar</Text>
          <Text style={styles.sectionSubtitle}>Usa emojis (1-5)</Text>

          <View style={globalStyles.ratingContainer}>
            {emojis.map((emoji, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.ratingEmoji,
                  rating === index + 1 && globalStyles.ratingEmojiSelected
                ]}
                onPress={() => setRating(index + 1)}
              >
                <Text style={styles.emojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Comentario</Text>
            <TextInput
              style={globalStyles.textArea}
              value={comment}
              onChangeText={setComment}
              placeholder="¿Qué tal estuvo?"
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity
            style={globalStyles.secondaryButton}
            onPress={handleRating}
          >
            <Text style={globalStyles.secondaryButtonText}>Enviar calificación</Text>
          </TouchableOpacity>
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
          <Ionicons name="restaurant" size={24} color="#8B5CF6" />
          <Text style={[globalStyles.bottomNavText, globalStyles.bottomNavTextActive]}>Menú</Text>
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
    marginBottom: 15,
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  menuDetails: {
    marginTop: 20,
  },
  menuItem: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  menuItemLabel: {
    fontWeight: '600',
  },
  ratingEmoji: {
    padding: 10,
    borderRadius: 8,
  },
  emojiText: {
    fontSize: 32,
  },
});