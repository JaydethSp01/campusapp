import React, { useState } from 'react';
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
import adminStyles from '../styles/adminStyles';

interface AdminDashboardScreenProps {
  onNavigate: (screen: string) => void;
}

export const AdminDashboardScreen: React.FC<AdminDashboardScreenProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [showAnonymousData, setShowAnonymousData] = useState(true);

  const metrics = [
    { title: 'Estudiantes activos', value: '128', subtitle: 'Últimos 30 días' },
    { title: 'Check-ins bienestar', value: '412', subtitle: 'Registros totales' },
    { title: 'Reportes resueltos', value: '21', subtitle: '78% del total' },
    { title: 'Satisfacción menú', value: '4.2/5', subtitle: 'Promedio mensual' },
  ];

  const periods = ['7d', '30d', 'Sem'];

  return (
    <SafeAreaView style={adminStyles.adminContainer}>
      <LinearGradient
        colors={['#7C3AED', '#8B5CF6']}
        style={adminStyles.adminHeader}
      >
        <View style={styles.headerContent}>
          <Text style={adminStyles.adminTitle}>CampusApp • Administración</Text>
          <Ionicons name="bar-chart-outline" size={24} color="#fff" />
        </View>
        <View style={adminStyles.tabsContainer}>
          <TouchableOpacity style={[adminStyles.tab, adminStyles.tabActive]}>
            <Text style={[adminStyles.tabText, adminStyles.tabTextActive]}>Resumen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={adminStyles.tab} onPress={() => onNavigate('AdminWellness')}>
            <Text style={adminStyles.tabText}>Bienestar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={adminStyles.tab} onPress={() => onNavigate('AdminReports')}>
            <Text style={adminStyles.tabText}>Reportes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={adminStyles.tab} onPress={() => onNavigate('AdminMenu')}>
            <Text style={adminStyles.tabText}>Menú</Text>
          </TouchableOpacity>
          <TouchableOpacity style={adminStyles.tab} onPress={() => onNavigate('AdminStudents')}>
            <Text style={adminStyles.tabText}>Estudiantes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={adminStyles.tab} onPress={() => onNavigate('AdminAlerts')}>
            <Text style={adminStyles.tabText}>Alertas</Text>
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
                style={[styles.checkbox, showAnonymousData && styles.checkboxChecked]}
                onPress={() => setShowAnonymousData(!showAnonymousData)}
              >
                {showAnonymousData && <Ionicons name="checkmark" size={16} color="#fff" />}
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
                      selectedPeriod === period && styles.periodButtonTextActive,
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

        {/* Metrics Grid */}
        <View style={adminStyles.systemMetrics}>
          {metrics.map((metric, index) => (
            <View key={index} style={adminStyles.systemMetricCard}>
              <Text style={adminStyles.systemMetricLabel}>{metric.title}</Text>
              <Text style={adminStyles.systemMetricValue}>{metric.value}</Text>
              <Text style={adminStyles.systemMetricTrend}>{metric.subtitle}</Text>
            </View>
          ))}
        </View>

        {/* Wellness Trends Chart */}
        <View style={adminStyles.analyticsSection}>
          <Text style={adminStyles.analyticsTitle}>Tendencias de bienestar</Text>
          <Text style={adminStyles.chartSubtitle}>Estrés vs. Sueño (semanas)</Text>
          <View style={adminStyles.chartPlaceholder}>
            <Text style={adminStyles.chartPlaceholderText}>📊 Gráfico de tendencias</Text>
          </View>
        </View>

        {/* Additional Cards */}
        <View style={adminStyles.adminChartsContainer}>
          <View style={adminStyles.chartRow}>
            <View style={adminStyles.chartCard}>
              <Text style={adminStyles.chartCardTitle}>Distribución de alimentación</Text>
              <View style={adminStyles.chartPlaceholder}>
                <Text style={adminStyles.chartPlaceholderText}>🥧 Gráfico circular</Text>
              </View>
            </View>
            <View style={adminStyles.chartCard}>
              <Text style={adminStyles.chartCardTitle}>Reportes por estado</Text>
              <View style={adminStyles.chartPlaceholder}>
                <Text style={adminStyles.chartPlaceholderText}>📊 Gráfico de barras</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  navTabs: {
    flexDirection: 'row',
    gap: 16,
  },
  navTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  navTabActive: {
    backgroundColor: '#fff',
  },
  navTabText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  navTabTextActive: {
    color: '#8B5CF6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  controlPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlLeft: {
    flex: 1,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  controlRight: {
    alignItems: 'flex-end',
  },
  periodSelector: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 4,
  },
  periodButtonActive: {
    backgroundColor: '#f0f0f0',
  },
  periodButtonText: {
    fontSize: 12,
    color: '#666',
  },
  periodButtonTextActive: {
    color: '#333',
    fontWeight: '600',
  },
  exportButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  exportButtonText: {
    fontSize: 12,
    color: '#333',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricTitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  metricSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chartPlaceholderText: {
    fontSize: 16,
    color: '#666',
  },
  additionalCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  additionalCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  additionalCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
});