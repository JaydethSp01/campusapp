import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Toast } from '../components/Toast';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import globalStyles from '../styles/globalStyles';

interface RegisterScreenProps {
  onBackToLogin: () => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBackToLogin }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast, showSuccess, showError, showWarning, hideToast } = useToast();

  const handleRegister = async () => {
    // Validación de campos
    if (!nombre.trim()) {
      showError('El nombre completo es requerido');
      return;
    }

    if (!email.trim()) {
      showError('El email es requerido');
      return;
    }

    if (!password) {
      showError('La contraseña es requerida');
      return;
    }

    if (!confirmPassword) {
      showError('Confirma tu contraseña');
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Por favor ingresa un email válido');
      return;
    }

    // Validación de contraseña
    if (password.length < 6) {
      showError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    // Validación de confirmación de contraseña
    if (password !== confirmPassword) {
      showError('Las contraseñas no coinciden');
      return;
    }

    if (!register) {
      showError('Función de registro no disponible');
      return;
    }

    setIsLoading(true);
    
    try {
      const userData = {
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        password,
        roles: [1], // ID del rol estudiante (según el seed.sql)
      };

      await register(userData);
      
      // Limpiar formulario
      setNombre('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      
      showSuccess('¡Usuario registrado correctamente!');
    } catch (error) {
      const errorMessage = (error as Error).message || 'Error desconocido al registrar';
      showError(`Error al registrar: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Ionicons name="document-text" size={40} color="white" />
            </View>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.welcomeTitle}>Crear cuenta</Text>
            <Text style={styles.welcomeSubtitle}>
              Completa tus datos para continuar
            </Text>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Nombre completo</Text>
              <TextInput
                style={globalStyles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Tu nombre completo"
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Correo institucional</Text>
              <TextInput
                style={globalStyles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="tu@universidad.edu"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Contraseña</Text>
              <TextInput
                style={globalStyles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Confirmar contraseña</Text>
              <TextInput
                style={globalStyles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="••••••••"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={[globalStyles.secondaryButton, isLoading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner color="#FFFFFF" message="" />
              ) : (
                <Text style={globalStyles.secondaryButtonText}>Registrarme</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={globalStyles.linkButton}
              onPress={onBackToLogin}
            >
              <Text style={globalStyles.linkButtonText}>
                ¿Ya tienes cuenta? Inicia sesión
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#A855F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
});