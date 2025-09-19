import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  withDelay,
  interpolate
} from 'react-native-reanimated';
import {
  MetricCard,
  LineChartCard,
  BarChartCard,
  PieChartCard,
  FilterBar
} from '../components/ModernCharts';

const { width: screenWidth } = Dimensions.get('window');

interface DocenteDashboardScreenProps {
  onNavigate: (screen: string) => void;
}

export const DocenteDashboardScreen: React.FC<DocenteDashboardScreenProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState("resumen");
  const [showAnonymous, setShowAnonymous] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  // Datos de ejemplo para los gráficos
  const wellnessTrendData = {
    labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"],
    datasets: [
      {
        data: [6.2, 6.8, 7.1, 6.9, 7.3],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`, // Azul para sueño
        strokeWidth: 3,
      },
      {
        data: [2.8, 3.2, 2.9, 3.1, 2.7],
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`, // Rojo para estrés
        strokeWidth: 3,
      },
      {
        data: [1.8, 2.1, 1.9, 2.2, 2.0],
        color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`, // Verde para alimentación
        strokeWidth: 3,
      },
    ],
  };

  const menuSatisfactionData = {
    labels: ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5"],
    datasets: [
      {
        data: [7.2, 7.8, 7.5, 8.1, 7.9],
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 3,
      },
      {
        data: [3.1, 3.4, 3.2, 3.6, 3.3],
        color: (opacity = 1) => `rgba(239, 68, 68, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const facilitiesData = {
    labels: ["Aula 8204", "Lab Redes", "Biblioteca", "Cafetería", "Auditorio"],
    datasets: [
      {
        data: [7, 5, 4, 3, 2],
        color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
      },
    ],
  };

  const foodDistributionData = [
    {
      name: "Buena",
      population: 45,
      color: "#EF4444",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Media",
      population: 35,
      color: "#3B82F6",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Pobre",
      population: 20,
      color: "#1E40AF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  const reportsByStatusData = {
    labels: ["Pendiente", "En Proceso", "Resuelto"],
    datasets: [
      {
        data: [8, 5, 20],
        color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
      },
    ],
  };

  const tabs = [
    { id: "resumen", label: "Dashboard", icon: "home" },
    { id: "bienestar", label: "Bienestar", icon: "heart" },
    { id: "reportes", label: "Reportes", icon: "document-text" },
    { id: "menu", label: "Menú", icon: "restaurant" },
    { id: "estudiantes", label: "Estudiantes", icon: "people" },
    { id: "alertas", label: "SOS", icon: "warning" },
  ];

  const renderTabButton = (tab: any, index: number) => {
    const isActive = activeTab === tab.id;

    return (
      <TouchableOpacity
        key={tab.id}
        style={[styles.tab, isActive && styles.activeTab]}
        onPress={() => setActiveTab(tab.id)}
      >
        <Ionicons
          name={tab.icon as any}
          size={16}
          color={isActive ? "#8B5CF6" : "#6B7280"}
        />
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
          {tab.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderResumenContent = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FilterBar
        onFilterChange={() => {}}
        onTimeRangeChange={setTimeRange}
        onExport={() => {}}
        showAnonymous={showAnonymous}
        onAnonymousToggle={setShowAnonymous}
      />

      {/* Métricas principales */}
      <View style={styles.metricsRow}>
        <MetricCard
          title="Estudiantes activos"
          value="128"
          subtitle="Últimos 30 días"
          color="#8B5CF6"
          delay={200}
        />
        <MetricCard
          title="Check-ins bienestar"
          value="412"
          subtitle="Registros totales"
          color="#10B981"
          delay={300}
        />
      </View>

      <View style={styles.metricsRow}>
        <MetricCard
          title="Reportes resueltos"
          value="21"
          subtitle="78% del total"
          color="#F59E0B"
          delay={400}
        />
        <MetricCard
          title="Satisfacción menú"
          value="4.2/5"
          subtitle="Promedio mensual"
          color="#EF4444"
          delay={500}
        />
      </View>

      {/* Gráfico de tendencias de bienestar */}
      <LineChartCard
        title="Tendencias de bienestar"
        subtitle="Estrés vs. Sueño (semanas)"
        data={wellnessTrendData}
        delay={600}
      />

      {/* Gráficos inferiores */}
      <View style={styles.bottomChartsRow}>
        <View style={styles.halfWidth}>
          <PieChartCard
            title="Distribución de alimentación"
            subtitle="1=Pobre, 3=Buena"
            data={foodDistributionData}
            delay={700}
          />
        </View>
        <View style={styles.halfWidth}>
          <BarChartCard
            title="Reportes por estado"
            subtitle="Últimos 30 días"
            data={reportsByStatusData}
            delay={800}
          />
        </View>
      </View>
    </ScrollView>
  );

  const renderBienestarContent = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FilterBar
        onFilterChange={() => {}}
        onTimeRangeChange={setTimeRange}
        onExport={() => {}}
        showAnonymous={showAnonymous}
        onAnonymousToggle={setShowAnonymous}
      />

      {/* Métricas de bienestar */}
      <View style={styles.metricsRow}>
        <MetricCard
          title="Promedio estrés"
          value="2.8/5"
          subtitle="Última semana"
          color="#EF4444"
          delay={200}
        />
        <MetricCard
          title="Horas sueño"
          value="6.8h"
          subtitle="Promedio diario"
          color="#3B82F6"
          delay={300}
        />
      </View>

      <View style={styles.metricsRow}>
        <MetricCard
          title="Alimentación"
          value="2.1/3"
          subtitle="Calidad promedio"
          color="#10B981"
          delay={400}
        />
        <MetricCard
          title="Check-ins"
          value="156"
          subtitle="Esta semana"
          color="#8B5CF6"
          delay={500}
        />
      </View>

      {/* Gráfico de promedios por semana */}
      <LineChartCard
        title="Promedios por semana"
        subtitle="Estrés (0-5), Sueño (h), Alimentación (1-3)"
        data={wellnessTrendData}
        delay={600}
      />

      {/* Semáforo de riesgo */}
      <View style={styles.riskSection}>
        <View style={styles.riskHeader}>
          <Text style={styles.riskTitle}>Semáforo de riesgo</Text>
          <View style={styles.riskTag}>
            <Text style={styles.riskTagText}>Orientativo</Text>
          </View>
        </View>
        <Text style={styles.riskSubtitle}>
          Reglas demo: estrés≥4 o sueño≤5.5
        </Text>

        <View style={styles.riskList}>
          <View style={styles.riskItem}>
            <Text style={styles.riskId}>ID 1001</Text>
            <Text style={styles.riskMetrics}>
              Estrés 3/5 · Sueño 6.5h · Alim 2
            </Text>
            <View style={[styles.riskBadge, styles.riskLow]}>
              <Text style={styles.riskBadgeText}>bajo</Text>
            </View>
          </View>

          <View style={styles.riskItem}>
            <Text style={styles.riskId}>ID 1002</Text>
            <Text style={styles.riskMetrics}>
              Estrés 5/5 · Sueño 5.1h · Alim 1
            </Text>
            <View style={[styles.riskBadge, styles.riskHigh]}>
              <Text style={styles.riskBadgeText}>alto</Text>
            </View>
          </View>

          <View style={styles.riskItem}>
            <Text style={styles.riskId}>ID 1003</Text>
            <Text style={styles.riskMetrics}>
              Estrés 2/5 · Sueño 7.9h · Alim 3
            </Text>
            <View style={[styles.riskBadge, styles.riskLow]}>
              <Text style={styles.riskBadgeText}>bajo</Text>
            </View>
          </View>

          <View style={styles.riskItem}>
            <Text style={styles.riskId}>ID 1004</Text>
            <Text style={styles.riskMetrics}>
              Estrés 3/5 · Sueño 7h · Alim 2
            </Text>
            <View style={[styles.riskBadge, styles.riskLow]}>
              <Text style={styles.riskBadgeText}>bajo</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderReportesContent = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FilterBar
        onFilterChange={() => {}}
        onTimeRangeChange={setTimeRange}
        onExport={() => {}}
        showAnonymous={showAnonymous}
        onAnonymousToggle={setShowAnonymous}
      />

      {/* Métricas de reportes */}
      <View style={styles.metricsRow}>
        <MetricCard
          title="Reportes abiertos"
          value="13"
          subtitle="Pendientes"
          color="#EF4444"
          delay={200}
        />
        <MetricCard
          title="SLA en riesgo"
          value="3"
          subtitle=">24h"
          color="#F59E0B"
          delay={300}
        />
      </View>

      {/* Gráfico de instalaciones */}
      <BarChartCard
        title="Instalaciones con más reportes"
        subtitle="Top 5"
        data={facilitiesData}
        delay={400}
      />

      {/* Tickets recientes */}
      <View style={styles.ticketsSection}>
        <Text style={styles.sectionTitle}>Tickets recientes</Text>
        <Text style={styles.sectionSubtitle}>Pendientes y en proceso</Text>

        <View style={styles.ticketList}>
          <View style={styles.ticketItem}>
            <View style={styles.ticketInfo}>
              <Text style={styles.ticketLocation}>Aula 204 - Bloque B</Text>
              <Text style={styles.ticketDescription}>
                Proyector intermitente
              </Text>
            </View>
            <View style={[styles.ticketStatus, styles.statusPending]}>
              <Text style={styles.ticketStatusText}>pendiente</Text>
            </View>
          </View>

          <View style={styles.ticketItem}>
            <View style={styles.ticketInfo}>
              <Text style={styles.ticketLocation}>Lab Redes</Text>
              <Text style={styles.ticketDescription}>Switch averiado</Text>
            </View>
            <View style={[styles.ticketStatus, styles.statusInProgress]}>
              <Text style={styles.ticketStatusText}>en proceso</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderMenuContent = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <FilterBar
        onFilterChange={() => {}}
        onTimeRangeChange={setTimeRange}
        onExport={() => {}}
        showAnonymous={showAnonymous}
        onAnonymousToggle={setShowAnonymous}
      />

      {/* Gráfico de satisfacción del menú */}
      <LineChartCard
        title="Satisfacción menú"
        subtitle="Promedio diario"
        data={menuSatisfactionData}
        delay={200}
      />

      {/* Comentarios recientes */}
      <View style={styles.commentsSection}>
        <Text style={styles.sectionTitle}>Comentarios recientes</Text>
        <Text style={styles.sectionSubtitle}>Muestra 5</Text>

        <View style={styles.commentList}>
          <Text style={styles.commentItem}>• La sopa estaba fría</Text>
          <Text style={styles.commentItem}>• Excelente sazón hoy</Text>
          <Text style={styles.commentItem}>• Poca variedad de ensaladas</Text>
          <Text style={styles.commentItem}>• Mejoró el postre</Text>
          <Text style={styles.commentItem}>• Faltó jugo natural</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "bienestar":
        return renderBienestarContent();
      case "reportes":
        return renderReportesContent();
      case "menu":
        return renderMenuContent();
      default:
        return renderResumenContent();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#7C3AED", "#A855F7"]} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => onNavigate("HomeScreen")}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
            <Text style={styles.backButtonText}>Salir</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Panel Docente</Text>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => onNavigate("ConfigScreen")}
            activeOpacity={0.7}
          >
            <Ionicons name="settings" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Botones de navegación adicionales */}
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerActionButton}
            onPress={() => onNavigate("HomeScreen")}
            activeOpacity={0.7}
          >
            <Ionicons name="home" size={20} color="white" />
            <Text style={styles.headerActionText}>Inicio</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerActionButton}
            onPress={() => onNavigate("ConfigScreen")}
            activeOpacity={0.7}
          >
            <Ionicons name="person" size={20} color="white" />
            <Text style={styles.headerActionText}>Perfil</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {tabs.map((tab, index) => renderTabButton(tab, index))}
        </ScrollView>
      </View>

      {/* Content */}
      <View style={styles.content}>{renderContent()}</View>

      {/* Floating Exit Button */}
      <TouchableOpacity
        style={styles.floatingExitButton}
        onPress={() => onNavigate("HomeScreen")}
        activeOpacity={0.8}
      >
        <Ionicons name="home" size={24} color="white" />
        <Text style={styles.floatingExitText}>Inicio</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    minWidth: 80,
    justifyContent: "center",
  },
  backButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
    flex: 1,
    textAlign: "center",
  },
  headerIcon: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  headerActions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 20,
  },
  headerActionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  headerActionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  tabContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  activeTab: {
    backgroundColor: "#8B5CF6",
  },
  tabText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  metricsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  bottomChartsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  halfWidth: {
    flex: 1,
  },
  riskSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  riskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  riskTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  riskTag: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskTagText: {
    fontSize: 12,
    color: "#D97706",
    fontWeight: "600",
  },
  riskSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  riskList: {
    gap: 12,
  },
  riskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  riskId: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    width: 60,
  },
  riskMetrics: {
    fontSize: 14,
    color: "#6B7280",
    flex: 1,
    marginLeft: 12,
  },
  riskBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskLow: {
    backgroundColor: "#D1FAE5",
  },
  riskHigh: {
    backgroundColor: "#FEE2E2",
  },
  riskBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  ticketsSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  ticketList: {
    gap: 12,
  },
  ticketItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  ticketInfo: {
    flex: 1,
  },
  ticketLocation: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  ticketDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  ticketStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPending: {
    backgroundColor: "#FEE2E2",
  },
  statusInProgress: {
    backgroundColor: "#FEF3C7",
  },
  ticketStatusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  commentsSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  commentList: {
    gap: 8,
  },
  commentItem: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  floatingExitButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#8B5CF6",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  floatingExitText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
});
