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

interface AdminMenuScreenProps {
  onNavigate: (screen: string) => void;
}

export const AdminMenuScreen: React.FC<AdminMenuScreenProps> = ({ onNavigate }) => {
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [showAnonymousData, setShowAnonymousData] = useState(true);

  const periods = ['7d', '30d', 'Sem'];

  const recentComments = [
    'La sopa estaba fría',
    'Excelente sazón hoy',
    'Poca variedad de ensaladas',
    'Mejoró el postre',
    'Faltó jugo natural',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#8B5CF6', '#EC4899']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>CampusApp • Docentes</Text>
          <Ionicons name="restaurant-outline" size={24} color="#fff" />
        </View>
        <View style={styles.navTabs}>
          <TouchableOpacity style={styles.navTab} onPress={() => onNavigate('AdminDashboard')}>
            <Text style={styles.navTabText}>Resumen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab} onPress={() => onNavigate('AdminWellness')}>
            <Text style={styles.navTabText}>Bienestar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navTab} onPress={() => onNavigate('AdminReports')}>
            <Text style={styles.navTabText}>Reportes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navTab, styles.navTabActive]}>
            <Text style={[styles.navTabText, styles.navTabTextActive]}>Menú</Text>
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

        {/* Rating Trend Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Tendencia de calificaciones</Text>
          <Text style={styles.chartSubtitle}>Promedio diario</Text>
          <View style={styles.chartPlaceholder}>
            <Text style={styles.chartPlaceholderText}>📊 Gráfico de tendencias de calificaciones</Text>
          </View>
        </View>

        {/* Recent Comments */}
        <View style={styles.commentsCard}>
          <Text style={styles.commentsTitle}>Comentarios recientes</Text>
          <Text style={styles.commentsSubtitle}>Muestra 5</Text>
          
          <View style={styles.commentsList}>
            {recentComments.map((comment, index) => (
              <View key={index}>
                <View style={styles.commentItem}>
                  <Text style={styles.commentText}>• {comment}</Text>
                </View>
                {index < recentComments.length - 1 && <View style={styles.separator} />}
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
  commentsCard: {
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
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  commentsSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  commentsList: {
    gap: 0,
  },
  commentItem: {
    paddingVertical: 8,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 4,
  },
});