import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// @ts-ignore
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";
import globalStyles, { colors } from "../styles/globalStyles";

interface ConfigScreenProps {
  onNavigate: (screen: string) => void;
}

export const ConfigScreen: React.FC<ConfigScreenProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const [name, setName] = useState(user?.nombre || "");
  const [faculty, setFaculty] = useState("");
  const [major, setMajor] = useState("");
  const [semester, setSemester] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [showNameInRatings, setShowNameInRatings] = useState(true);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <LinearGradient
        colors={["#8B5CF6", "#A855F7"]}
        style={globalStyles.header}
      >
        <Text style={globalStyles.headerTitle}>CampusApp</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={() => onNavigate("notifications")}>
            <Ionicons name="notifications" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onNavigate("config")}>
            <Ionicons name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Perfil</Text>
          <Text style={styles.sectionSubtitle}>Datos del estudiante</Text>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Nombre</Text>
            <TextInput
              style={globalStyles.input}
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre completo"
            />
          </View>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Facultad</Text>
            <TextInput
              style={globalStyles.input}
              value={faculty}
              onChangeText={setFaculty}
              placeholder="Ingeniería"
            />
          </View>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Carrera</Text>
            <TextInput
              style={globalStyles.input}
              value={major}
              onChangeText={setMajor}
              placeholder="Ingeniería de Sistemas"
            />
          </View>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Semestre</Text>
            <TextInput
              style={globalStyles.input}
              value={semester}
              onChangeText={setSemester}
              placeholder="5"
            />
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Contacto de emergencia</Text>
          <Text style={styles.sectionSubtitle}>
            Solo visible para bienestar
          </Text>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Nombre y teléfono</Text>
            <TextInput
              style={globalStyles.input}
              value={emergencyContact}
              onChangeText={setEmergencyContact}
              placeholder="Ej. Mamá - 3001234567"
            />
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={globalStyles.sectionTitle}>Preferencias</Text>
          <Text style={styles.sectionSubtitle}>
            Notificaciones y privacidad
          </Text>

          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>
              Recibir notificaciones push
            </Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: "#E5E7EB", true: "#8B5CF6" }}
              thumbColor={pushNotifications ? "#FFFFFF" : "#FFFFFF"}
            />
          </View>

          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>
              Recibir notificaciones por email
            </Text>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: "#E5E7EB", true: "#8B5CF6" }}
              thumbColor={emailNotifications ? "#FFFFFF" : "#FFFFFF"}
            />
          </View>

          <View style={styles.preferenceItem}>
            <Text style={styles.preferenceLabel}>
              Mostrar mi nombre en calificaciones
            </Text>
            <Switch
              value={showNameInRatings}
              onValueChange={setShowNameInRatings}
              trackColor={{ false: "#E5E7EB", true: "#8B5CF6" }}
              thumbColor={showNameInRatings ? "#FFFFFF" : "#FFFFFF"}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={globalStyles.bottomNavigation}>
        <TouchableOpacity
          style={globalStyles.bottomNavItem}
          onPress={() => onNavigate("home")}
        >
          <Ionicons name="home" size={24} color="#6B7280" />
          <Text style={globalStyles.bottomNavText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.bottomNavItem}
          onPress={() => onNavigate("report")}
        >
          <Ionicons name="construct" size={24} color="#6B7280" />
          <Text style={globalStyles.bottomNavText}>Reporte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.bottomNavItem}
          onPress={() => onNavigate("wellness")}
        >
          <Ionicons name="heart" size={24} color="#6B7280" />
          <Text style={globalStyles.bottomNavText}>Bienestar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.bottomNavItem}
          onPress={() => onNavigate("menu")}
        >
          <Ionicons name="restaurant" size={24} color="#6B7280" />
          <Text style={globalStyles.bottomNavText}>Menú</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.bottomNavItem}
          onPress={() => onNavigate("config")}
        >
          <Ionicons name="settings" size={24} color="#8B5CF6" />
          <Text
            style={[
              globalStyles.bottomNavText,
              globalStyles.bottomNavTextActive,
            ]}
          >
            Config
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerIcons: {
    flexDirection: "row",
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
  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  preferenceLabel: {
    fontSize: 16,
    color: colors.textPrimary,
    flex: 1,
  },
  logoutButton: {
    backgroundColor: "#EF4444",
    margin: 20,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
