// ESTILOS ESPECÍFICOS SECCIÓN ADMINISTRADOR
import { StyleSheet } from 'react-native';

const adminStyles = StyleSheet.create({
  // DASHBOARD ADMINISTRATIVO
  adminContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  adminHeader: {
    backgroundColor: '#7C3AED', // Púrpura más intenso para admin
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  adminTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },

  adminSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
    marginTop: 4,
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

  // CHART SUBTITLE
  chartSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },

  // MÉTRICAS GENERALES DEL SISTEMA
  systemMetrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  systemMetricCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    marginBottom: 16,
    marginHorizontal: '1%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  systemMetricValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },

  systemMetricLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },

  systemMetricTrend: {
    fontSize: 12,
    color: '#10B981',
    marginTop: 4,
    fontWeight: '500',
  },

  // GESTIÓN DE USUARIOS
  userManagementSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  managementTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },

  // FILTROS Y BÚSQUEDA ADMIN
  adminFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },

  searchInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    flex: 1,
    marginRight: 8,
    minWidth: 200,
  },

  filterDropdown: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    minWidth: 100,
    marginHorizontal: 4,
  },

  filterText: {
    fontSize: 14,
    color: '#374151',
  },

  // TABLA DE USUARIOS
  userTable: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  tableHeader: {
    backgroundColor: '#F9FAFB',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  tableHeaderCell: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    flex: 1,
  },

  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },

  tableCell: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },

  tableCellBold: {
    fontWeight: '600',
    color: '#1F2937',
  },

  // ACCIONES EN TABLA
  tableActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 2,
  },

  editButton: {
    backgroundColor: '#EFF6FF',
  },

  deleteButton: {
    backgroundColor: '#FEE2E2',
  },

  viewButton: {
    backgroundColor: '#F0FDF4',
  },

  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
  },

  editButtonText: {
    color: '#1D4ED8',
  },

  deleteButtonText: {
    color: '#DC2626',
  },

  viewButtonText: {
    color: '#16A34A',
  },

  // GESTIÓN DE INSTALACIONES
  installationManagement: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  addButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  installationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  installationAdminCard: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    width: '48%',
    marginBottom: 16,
    padding: 16,
  },

  installationCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },

  installationStatus: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 12,
  },

  statusActive: {
    color: '#059669',
  },

  statusInactive: {
    color: '#DC2626',
  },

  installationCardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  // REPORTES Y ANALYTICS
  analyticsSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  analyticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  analyticsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },

  dateRangePicker: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  dateRangeText: {
    fontSize: 12,
    color: '#374151',
  },

  // GRÁFICOS ADMIN
  adminChartsContainer: {
    marginTop: 20,
  },

  chartRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  chartCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    width: '48%',
  },

  chartCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },

  chartPlaceholder: {
    height: 120,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chartPlaceholderText: {
    fontSize: 12,
    color: '#6B7280',
  },

  // CONFIGURACIÓN DEL SISTEMA
  systemConfigSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  configGroup: {
    marginBottom: 24,
  },

  configGroupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },

  configItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  configItemLast: {
    borderBottomWidth: 0,
  },

  configLabel: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },

  configValue: {
    fontSize: 14,
    color: '#6B7280',
  },

  configInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 14,
    color: '#374151',
    minWidth: 60,
  },

  // TOGGLE SWITCHES
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  toggle: {
    width: 44,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },

  toggleActive: {
    backgroundColor: '#059669',
    alignItems: 'flex-end',
  },

  toggleInactive: {
    backgroundColor: '#D1D5DB',
    alignItems: 'flex-start',
  },

  toggleButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  // LOGS Y ACTIVIDAD
  logsSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  logsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  clearLogsButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },

  clearLogsText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },

  logsList: {
    maxHeight: 300,
  },

  logItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 4,
    marginBottom: 4,
  },

  logTimestamp: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 2,
  },

  logMessage: {
    fontSize: 12,
    color: '#374151',
  },

  logLevel: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },

  logLevelError: {
    color: '#DC2626',
  },

  logLevelWarning: {
    color: '#D97706',
  },

  logLevelInfo: {
    color: '#059669',
  },

  // BOTONES DE ACCIÓN ADMIN
  adminActionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  primaryActionButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginRight: 12,
    flex: 1,
    alignItems: 'center',
  },

  primaryActionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryActionButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },

  secondaryActionText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },

  // MODALES Y OVERLAYS
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },

  modalBody: {
    marginBottom: 24,
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 8,
  },

  modalButtonPrimary: {
    backgroundColor: '#7C3AED',
  },

  modalButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },

  modalButtonTextPrimary: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },

  modalButtonTextSecondary: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default adminStyles;
