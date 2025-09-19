import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { AnimatedView } from '../components/AnimatedView';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { useReports } from '../hooks/useReports';
import { useAuth } from '../hooks/useAuth';
import globalStyles, { colors } from '../styles/globalStyles';

interface ReportScreenProps {
  onNavigate: (screen: string) => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const { installations, loading, error, createReport } = useReports();
  const [selectedInstallation, setSelectedInstallation] = useState('');
  const [priority, setPriority] = useState('Media (24h)');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const priorities = [
    'Baja (72h)',
    'Media (24h)',
    'Alta (8h)',
    'Crítica (2h)',
  ];

  const handleCreateTicket = async () => {
    if (!selectedInstallation || !description) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'Usuario no autenticado');
      return;
    }

    setIsSubmitting(true);
    try {
      const priorityMap: { [key: string]: string } = {
        'Baja (72h)': 'baja',
        'Media (24h)': 'media',
        'Alta (8h)': 'alta',
        'Crítica (2h)': 'critica',
      };

      await createReport({
        instalacionId: selectedInstallation,
        titulo: `Reporte - ${installations.find(i => i.id === selectedInstallation)?.nombre || 'Instalación'}`,
        descripcion: description,
        urgencia: priorityMap[priority] as any,
      });

      Alert.alert('Éxito', 'Ticket creado correctamente');
      handleClear();
    } catch (err) {
      Alert.alert('Error', 'No se pudo crear el ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setSelectedInstallation('');
    setPriority('Media (24h)');
    setDescription('');
  };

  const handleInstallationSelect = (installationId: string) => {
    setSelectedInstallation(installationId);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

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
        <AnimatedView style={styles.installationsSection}>
          <Text style={globalStyles.sectionTitle}>Instalaciones</Text>
          <Text style={styles.sectionSubtitle}>
            Toca una imagen para usarla en el formulario
          </Text>
          
          <View style={globalStyles.installationsGrid}>
            {installations.map((installation) => (
              <TouchableOpacity
                key={installation.id}
                style={[
                  globalStyles.installationCard,
                  selectedInstallation === installation.id && styles.installationCardSelected
                ]}
                onPress={() => handleInstallationSelect(installation.id)}
              >
                <Image
                  source={{ uri: installation.imagen || 'https://via.placeholder.com/150' }}
                  style={globalStyles.cardImage}
                />
                <View style={globalStyles.cardContent}>
                  <Text style={globalStyles.cardTitle}>{installation.nombre}</Text>
                  <TouchableOpacity
                    style={styles.useInFormButton}
                    onPress={() => handleInstallationSelect(installation.id)}
                  >
                    <Text style={styles.useInFormText}>Usar en formulario</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </AnimatedView>

        <AnimatedView style={globalStyles.reportSection}>
          <Text style={globalStyles.sectionTitle}>Nuevo reporte</Text>
          <Text style={styles.sectionSubtitle}>Describe el problema</Text>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Instalación</Text>
            <TextInput
              style={globalStyles.input}
              value={installations.find(i => i.id === selectedInstallation)?.nombre || ''}
              placeholder="Selecciona una instalación"
              editable={false}
            />
          </View>

          <View style={styles.formRow}>
            <View style={styles.formColumn}>
              <Text style={globalStyles.label}>Prioridad/SLA</Text>
              <View style={globalStyles.dropdown}>
                <Text style={globalStyles.dropdownText}>{priority}</Text>
                <Ionicons name="chevron-down" size={20} color="#6B7280" />
              </View>
            </View>
            <View style={styles.formColumn}>
              <Text style={globalStyles.label}>Adjuntar foto</Text>
              <TouchableOpacity style={styles.fileButton}>
                <Text style={styles.fileButtonText}>Seleccionar archivo</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Descripción</Text>
            <TextInput
              style={globalStyles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder="Describe el daño con detalles útiles"
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={globalStyles.primaryButton}
              onPress={handleCreateTicket}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={globalStyles.primaryButtonText}>Crear ticket</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.outlineButton}
              onPress={handleClear}
            >
              <Text style={globalStyles.outlineButtonText}>Limpiar</Text>
            </TouchableOpacity>
          </View>
        </AnimatedView>
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
          <Ionicons name="construct" size={24} color="#8B5CF6" />
          <Text style={[globalStyles.bottomNavText, globalStyles.bottomNavTextActive]}>Reporte</Text>
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
  installationsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 15,
  },
  installationCardSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  useInFormButton: {
    marginTop: 8,
  },
  useInFormText: {
    color: colors.blue,
    fontSize: 14,
    fontWeight: '500',
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  formColumn: {
    flex: 1,
    marginRight: 12,
  },
  fileButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  fileButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});