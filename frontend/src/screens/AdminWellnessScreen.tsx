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

interface AdminWellnessScreenProps {
  onNavigate: (screen: string) => void;
}

export const AdminWellnessScreen: React.FC<AdminWellnessScreenProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [showAnonymousData, setShowAnonymousData] = useState(true);

  const periods = ['7d', '30d', 'Sem'];

  const students = [
    { id: '1001', stress: 3, sleep: 6.5, diet: 2, status: 'bajo', statusColor: '#4CAF50' },
    { id: '1002', stress: 5, sleep: 5.1, diet: 1, status: 'alto', statusColor: '#f44336' },
    { id: '1003', stress: 2, sleep: 7.9, diet: 3, status: 'bajo', statusColor: '#4CAF50' },
    { id: '1004', stress: 3, sleep: 7, diet: 2, status: 'bajo', statusColor: '#4CAF50' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#8B5CF6', '#EC4899']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>CampusApp • Docentes</Text>
          <Ionicons name="bar-chart-outline" size={24} color="#fff" />
        </View>
        <View style={styles.navTabs}>
          <TouchableOpacity style={styles.navTab} onPress={() => onNavigate('AdminDashboard')}>
            <Text style={styles.navTabText}>Resumen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navTab, styles.navTabActive]}>
            <Text style={[styles.navTabText, styles.navTabTextActive]}>Bienestar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab} onPress={() => onNavigate('AdminReports')}>
            <Text style={styles.navTabText}>Reportes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab} onPress={() => onNavigate('AdminMenu')}>
            <Text style={styles.navTabText}>Menú</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab} onPress={() => onNavigate('AdminStudents')}>
            <Text style={styles.navTabText}>Estudiantes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab} onPress={() => onNavigate('AdminAlerts')}>
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

        {/* Weekly Averages Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Promedios por semana</Text>
          <Text style={styles.chartSubtitle}>Estrés (0-5), Sueño (h), Alimentación (1-3)</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>📊 Gráfico de promedios semanales</Text>
          </View>
        </View>

        {/* Risk Traffic Light */}
        <View style={styles.riskCard}>
          <View style={styles.riskHeader}>
            <Text style={styles.riskTitle}>Semáforo de riesgo</Text>
            <View style={styles.orientativeTag}>
              <Text style={styles.orientativeText}>Orientativo</Text>
            </View>
          </View>
          <Text style={styles.riskSubtitle}>Reglas demo: estrés≥4 o sueño≤5.5</Text>
          
          <View style={styles.studentsList}>
            {students.map((student) => (
              <View key={student.id} style={styles.studentItem}>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentId}>ID {student.id}</Text>
                  <Text style={styles.studentData}>
                    Estrés {student.stress}/5 · Sueño {student.sleep}h · Alim {student.diet}
                  </Text>
                </View>
                <View style={[styles.statusTag, { backgroundColor: student.statusColor }]}>
                  <Text style={styles.statusText}>{student.status}</Text>
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
  riskCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  riskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  riskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orientativeTag: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  orientativeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  riskSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  studentsList: {
    gap: 12,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentInfo: {
    flex: 1,
  },
  studentId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  studentData: {
    fontSize: 12,
    color: '#666',
  },
  statusTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
});