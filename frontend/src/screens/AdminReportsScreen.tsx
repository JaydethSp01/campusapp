import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// @ts-ignore
import { Ionicons } from "@expo/vector-icons";

interface AdminReportsScreenProps {
  onNavigate: (screen: string) => void;
}

export const AdminReportsScreen: React.FC<AdminReportsScreenProps> = ({
  onNavigate,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("Todos");
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [showAnonymousData, setShowAnonymousData] = useState(true);

  const periods = ["7d", "30d", "Sem"];

  const recentTickets = [
    {
      location: "Aula 204 - Bloque B",
      description: "Proyector intermitente",
      status: "pendiente",
      statusColor: "#f44336",
    },
    {
      location: "Lab Redes",
      description: "Switch averiado",
      status: "en proceso",
      statusColor: "#FFC107",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#8B5CF6", "#EC4899"]} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>CampusApp • Docentes</Text>
          <Ionicons name="document-text-outline" size={24} color="#fff" />
        </View>
        <View style={styles.navTabs}>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => onNavigate("AdminDashboard")}
          >
            <Text style={styles.navTabText}>Resumen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => onNavigate("AdminWellness")}
          >
            <Text style={styles.navTabText}>Bienestar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navTab, styles.navTabActive]}>
            <Text style={[styles.navTabText, styles.navTabTextActive]}>
              Reportes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => onNavigate("AdminMenu")}
          >
            <Text style={styles.navTabText}>Menú</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => onNavigate("AdminStudents")}
          >
            <Text style={styles.navTabText}>Estudiantes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navTab}
            onPress={() => onNavigate("AdminAlerts")}
          >
            <Text style={styles.navTabText}>Alertas</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Control Panel */}
        <View style={styles.controlPanel}>
          <View style={styles.controlLeft}>
            <TouchableOpacity style={styles.dropdown}>
              <Text style={styles.dropdownText}>{selectedFilter}</Text>
              <Ionicons name="chevron-down" size={16} color="#666" />
            </TouchableOpacity>
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  showAnonymousData && styles.checkboxChecked,
                ]}
                onPress={() => setShowAnonymousData(!showAnonymousData)}
              >
                {showAnonymousData && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Ver datos anónimos</Text>
            </View>
          </View>
          <View style={styles.controlRight}>
            <View style={styles.periodSelector}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period && styles.periodButtonActive,
                  ]}
                  onPress={() => setSelectedPeriod(period)}
                >
                  <Text
                    style={[
                      styles.periodButtonText,
                      selectedPeriod === period &&
                        styles.periodButtonTextActive,
                    ]}
                  >
                    {period}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.exportButton}>
              <Text style={styles.exportButtonText}>Exportar CSV</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryCards}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Reportes abiertos</Text>
            <Text style={styles.summaryValue}>13</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>SLA en riesgo</Text>
            <Text style={styles.summaryValue}>3</Text>
            <Text style={styles.summarySubtitle}>24h</Text>
          </View>
        </View>

        {/* Facilities Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Instalaciones con más reportes</Text>
          <Text style={styles.chartSubtitle}>Top 5</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>
              📊 Gráfico de instalaciones
            </Text>
          </View>
        </View>

        {/* Recent Tickets */}
        <View style={styles.ticketsCard}>
          <Text style={styles.ticketsTitle}>Tickets recientes</Text>
          <Text style={styles.ticketsSubtitle}>Pendientes y en proceso</Text>

          <View style={styles.ticketsList}>
            {recentTickets.map((ticket, index) => (
              <View key={index} style={styles.ticketItem}>
                <View style={styles.ticketInfo}>
                  <Text style={styles.ticketLocation}>{ticket.location}</Text>
                  <Text style={styles.ticketDescription}>
                    {ticket.description}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusTag,
                    { backgroundColor: ticket.statusColor },
                  ]}
                >
                  <Text style={styles.statusText}>{ticket.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  navTabs: {
    flexDirection: "row",
    gap: 16,
  },
  navTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  navTabActive: {
    backgroundColor: "#fff",
  },
  navTabText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  navTabTextActive: {
    color: "#8B5CF6",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  controlPanel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlLeft: {
    flex: 1,
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
    marginRight: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 4,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
  controlRight: {
    alignItems: "flex-end",
  },
  periodSelector: {
    flexDirection: "row",
    marginBottom: 12,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 4,
  },
  periodButtonActive: {
    backgroundColor: "#f0f0f0",
  },
  periodButtonText: {
    fontSize: 12,
    color: "#666",
  },
  periodButtonTextActive: {
    color: "#333",
    fontWeight: "600",
  },
  exportButton: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  exportButtonText: {
    fontSize: 12,
    color: "#333",
  },
  summaryCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  summarySubtitle: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  chartPlaceholderText: {
    fontSize: 16,
    color: "#666",
  },
  ticketsCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ticketsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  ticketsSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 16,
  },
  ticketsList: {
    gap: 12,
  },
  ticketItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ticketInfo: {
    flex: 1,
  },
  ticketLocation: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  ticketDescription: {
    fontSize: 12,
    color: "#666",
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
  },
});
