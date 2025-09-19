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
import Slider from '@react-native-community/slider';
import { useWellness } from '../hooks/useWellness';
import globalStyles, { colors } from '../styles/globalStyles';

interface WellnessScreenProps {
  onNavigate: (screen: string) => void;
}

export const WellnessScreen: React.FC<WellnessScreenProps> = ({ onNavigate }) => {
  const { createRecord } = useWellness();
  const [date, setDate] = useState('18/09/2025');
  const [stressLevel, setStressLevel] = useState(3);
  const [sleepHours, setSleepHours] = useState('7.5');
  const [dietQuality, setDietQuality] = useState('2 • Media');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dietOptions = [
    '1 • Pobre',
    '2 • Media',
    '3 • Buena',
  ];

  const handleSave = async () => {
    if (!sleepHours) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    setIsSubmitting(true);
    try {
      await createRecord({
        nivelEstres: stressLevel,
        calidadSueno: parseFloat(sleepHours),
        calidadComida: parseInt(dietQuality.split(' • ')[0]),
        notas: comment,
      });

      Alert.alert('Éxito', 'Registro guardado correctamente');
      setComment('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el registro');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setStressLevel(3);
    setSleepHours('7.5');
    setDietQuality('2 • Media');
    setComment('');
  };

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
          <View style={styles.headerSection}>
            <Text style={globalStyles.sectionTitle}>Check-in de bienestar</Text>
            <View style={styles.privacyTag}>
              <Text style={styles.privacyText}>Privado</Text>
            </View>
          </View>
          <Text style={styles.odsSubtitle}>ODS 3: Salud y Bienestar</Text>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Fecha</Text>
            <View style={styles.dateInput}>
              <TextInput
                style={styles.dateText}
                value={date}
                onChangeText={setDate}
                placeholder="DD/MM/YYYY"
              />
              <Ionicons name="calendar" size={20} color="#6B7280" />
            </View>
          </View>

          <View style={globalStyles.sliderContainer}>
            <Text style={globalStyles.sliderLabel}>Nivel de estrés (0-5)</Text>
            <Text style={globalStyles.sliderValue}>{stressLevel}</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={5}
              step={1}
              value={stressLevel}
              onValueChange={setStressLevel}
              minimumTrackTintColor={colors.blueLight}
              maximumTrackTintColor={colors.border}
            />
          </View>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Horas de sueño</Text>
            <TextInput
              style={globalStyles.input}
              value={sleepHours}
              onChangeText={setSleepHours}
              placeholder="7.5"
              keyboardType="numeric"
            />
          </View>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Alimentación</Text>
            <View style={globalStyles.dropdown}>
              <Text style={globalStyles.dropdownText}>{dietQuality}</Text>
              <Ionicons name="chevron-down" size={20} color="#6B7280" />
            </View>
          </View>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Comentario</Text>
            <TextInput
              style={globalStyles.textArea}
              value={comment}
              onChangeText={setComment}
              placeholder="¿Cómo te sientes hoy?"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={globalStyles.secondaryButton}
              onPress={handleSave}
              disabled={isSubmitting}
            >
              <Text style={globalStyles.secondaryButtonText}>
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.outlineButton}
              onPress={handleClear}
            >
              <Text style={globalStyles.outlineButtonText}>Limpiar</Text>
            </TouchableOpacity>
          </View>
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
          <Ionicons name="heart" size={24} color="#8B5CF6" />
          <Text style={[globalStyles.bottomNavText, globalStyles.bottomNavTextActive]}>Bienestar</Text>
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
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  privacyTag: {
    backgroundColor: colors.blue,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  privacyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  odsSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 20,
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
  slider: {
    width: '100%',
    height: 40,
  },
  sliderThumb: {
    backgroundColor: colors.blueLight,
    width: 20,
    height: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});