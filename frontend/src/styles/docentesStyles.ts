// ESTILOS ESPECÍFICOS SECCIÓN DOCENTES
import { StyleSheet } from 'react-native';

const docentesStyles = StyleSheet.create({
  // CONTAINER PRINCIPAL
  docentesContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  // HEADER ESPECÍFICO DOCENTES
  docentesHeader: {
    backgroundColor: '#8B5CF6',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  // TABS NAVEGACIÓN SUPERIOR
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 10,
    marginHorizontal: 20,
  },

  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },

  tabActive: {
    backgroundColor: '#F3F4F6',
  },

  tabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },

  tabTextActive: {
    color: '#1F2937',
    fontWeight: '600',
  },

  // FILTROS Y CONTROLES
  filtersContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dropdown: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 80,
  },

  dropdownText: {
    fontSize: 14,
    color: '#374151',
  },

  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkboxText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },

  exportButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },

  exportButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },

  // MÉTRICAS PRINCIPALES
  metricsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  metricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  metricValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },

  metricLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },

  metricSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 2,
  },

  // GRÁFICOS Y CHARTS
  chartContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },

  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },

  chartSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },

  // GRÁFICO DE LÍNEAS (TENDENCIAS)
  lineChart: {
    height: 200,
    marginVertical: 10,
  },

  // GRÁFICO CIRCULAR (DISTRIBUCIÓN)
  pieChartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },

  pieChart: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },

  // LEYENDA DEL GRÁFICO
  chartLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },

  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 4,
  },

  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },

  legendColorBlue: {
    backgroundColor: '#3B82F6',
  },

  legendColorRed: {
    backgroundColor: '#EF4444',
  },

  legendColorGreen: {
    backgroundColor: '#10B981',
  },

  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },

  // GRÁFICO DE BARRAS
  barChartContainer: {
    marginTop: 20,
  },

  barChart: {
    height: 180,
  },

  // SECCIÓN SEMÁFORO DE RIESGO
  riskSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 3,
  },

  riskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },

  riskSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },

  riskList: {
    marginTop: 16,
  },

  riskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  riskItemLeft: {
    flex: 1,
  },

  riskId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },

  riskDetails: {
    fontSize: 12,
    color: '#6B7280',
  },

  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },

  riskBadgeGreen: {
    backgroundColor: '#D1FAE5',
  },

  riskBadgeRed: {
    backgroundColor: '#FEE2E2',
  },

  riskBadgeTextGreen: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: '600',
  },

  riskBadgeTextRed: {
    color: '#991B1B',
    fontSize: 12,
    fontWeight: '600',
  },

  // REPORTES RECIENTES
  reportsSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },

  reportsList: {
    marginTop: 10,
  },

  reportItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  reportText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },

  // TICKETS/ALERTAS
  ticketsSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },

  ticketItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  ticketInfo: {
    flex: 1,
  },

  ticketTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },

  ticketSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },

  ticketStatus: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 80,
    alignItems: 'center',
  },

  statusPendiente: {
    backgroundColor: '#FEE2E2',
  },

  statusProceso: {
    backgroundColor: '#FEF3C7',
  },

  statusTextPendiente: {
    color: '#991B1B',
    fontSize: 12,
    fontWeight: '600',
  },

  statusTextProceso: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '600',
  },

  // LISTA DE ESTUDIANTES
  studentsSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },

  searchContainer: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },

  searchInput: {
    fontSize: 16,
    color: '#374151',
  },

  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  studentInfo: {
    flex: 1,
  },

  studentId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },

  studentDetails: {
    fontSize: 14,
    color: '#6B7280',
  },

  studentStatus: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 60,
    alignItems: 'center',
  },

  statusMedio: {
    backgroundColor: '#FEF3C7',
  },

  statusAlto: {
    backgroundColor: '#FEE2E2',
  },

  statusBajo: {
    backgroundColor: '#D1FAE5',
  },

  statusTextMedio: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '600',
  },

  statusTextAlto: {
    color: '#991B1B',
    fontSize: 12,
    fontWeight: '600',
  },

  statusTextBajo: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: '600',
  },

  viewButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },

  viewButtonText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '500',
  },

  // SOS Y EMERGENCIAS
  sosSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },

  sosTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },

  sosSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },

  sosItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  sosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },

  sosId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },

  sosTime: {
    fontSize: 12,
    color: '#6B7280',
  },

  sosDescription: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
  },

  sosContact: {
    fontSize: 12,
    color: '#6B7280',
  },

  sosActions: {
    flexDirection: 'row',
    marginTop: 12,
  },

  exportPdfButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 8,
  },

  exportPdfText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  markAttendedButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },

  markAttendedText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default docentesStyles;
