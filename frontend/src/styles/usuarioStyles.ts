// ESTILOS ESPECÍFICOS SECCIÓN USUARIO
import { StyleSheet } from 'react-native';

const usuarioStyles = StyleSheet.create({
  // PANTALLAS DE AUTENTICACIÓN
  authContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },

  // LOGO Y BRANDING
  logoSection: {
    alignItems: 'center',
    marginBottom: 50,
  },

  appIcon: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#8B5CF6',
    marginBottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },

  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },

  welcomeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },

  // FORMULARIOS DE LOGIN/REGISTRO
  formSection: {
    marginBottom: 30,
  },

  inputGroup: {
    marginBottom: 20,
  },

  inputLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    marginBottom: 8,
  },

  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
  },

  textInputFocused: {
    borderColor: '#8B5CF6',
    borderWidth: 2,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  passwordInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
    fontFamily: 'monospace', // Para ocultar caracteres
  },

  // BOTONES PRINCIPALES
  loginButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  registerButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  linkText: {
    textAlign: 'center',
    marginTop: 24,
  },

  linkButton: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },

  // DASHBOARD PRINCIPAL USUARIO
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  dashboardHeader: {
    backgroundColor: '#8B5CF6',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  headerWelcome: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },

  // SECCIÓN INSTALACIONES
  installationsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },

  installationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  installationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '48%',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  installationImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#F3F4F6',
  },

  installationContent: {
    padding: 16,
  },

  installationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },

  installationAction: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '500',
  },

  // SECCIÓN NUEVO REPORTE
  newReportSection: {
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

  reportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },

  reportSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },

  reportDropdown: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },

  dropdownText: {
    fontSize: 16,
    color: '#374151',
  },

  reportTextArea: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },

  createTicketButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },

  createTicketText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  clearButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },

  clearButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // MENÚ DEL COMEDOR
  menuContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  menuHeader: {
    backgroundColor: '#8B5CF6',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  menuTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },

  menuCard: {
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

  menuDate: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },

  dateText: {
    fontSize: 16,
    color: '#374151',
  },

  menuItems: {
    marginBottom: 20,
  },

  menuItemRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  menuLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    width: 100,
  },

  menuValue: {
    fontSize: 14,
    color: '#6B7280',
    flex: 1,
  },

  // CALIFICACIÓN CON EMOJIS
  ratingSection: {
    marginVertical: 20,
  },

  ratingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 16,
  },

  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  emoji: {
    fontSize: 40,
    padding: 12,
    borderRadius: 25,
  },

  emojiSelected: {
    backgroundColor: '#FEF3C7',
  },

  commentSection: {
    marginBottom: 20,
  },

  commentLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },

  commentInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
    height: 80,
    textAlignVertical: 'top',
  },

  submitRatingButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },

  submitRatingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  // CHECK-IN DE BIENESTAR
  wellnessContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  wellnessHeader: {
    backgroundColor: '#8B5CF6',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  wellnessTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  privateLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
  },

  wellnessCard: {
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

  wellnessDate: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
  },

  // SLIDER DE ESTRÉS
  stressSection: {
    marginBottom: 20,
  },

  stressLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },

  stressValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#3B82F6',
    textAlign: 'center',
    marginBottom: 16,
  },

  slider: {
    height: 40,
    marginBottom: 20,
  },

  // SELECCIÓN DE ALIMENTACIÓN Y SUEÑO
  selectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  selectionGroup: {
    flex: 1,
    marginRight: 10,
  },

  selectionGroupLast: {
    flex: 1,
    marginLeft: 10,
  },

  selectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },

  selectionValue: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#374151',
  },

  // COMENTARIO BIENESTAR
  wellnessCommentSection: {
    marginBottom: 20,
  },

  wellnessCommentLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },

  wellnessCommentInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
    height: 80,
    textAlignVertical: 'top',
  },

  // BOTONES DE ACCIÓN BIENESTAR
  wellnessActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  saveWellnessButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },

  saveWellnessText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  clearWellnessButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },

  clearWellnessText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },

  // NOTIFICACIONES
  notificationsContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  notificationsHeader: {
    backgroundColor: '#8B5CF6',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  notificationsTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  notificationsSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.8,
    marginTop: 4,
  },

  notificationsList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  notificationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  notificationContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  notificationText: {
    flex: 1,
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },

  notificationDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },

  notificationTime: {
    fontSize: 12,
    color: '#9CA3AF',
    marginLeft: 12,
  },

  // PERFIL DE USUARIO
  profileContainer: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  profileHeader: {
    backgroundColor: '#8B5CF6',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },

  profileTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  profileCard: {
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

  profileSection: {
    marginBottom: 24,
  },

  profileSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },

  profileField: {
    marginBottom: 16,
  },

  profileFieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },

  profileFieldInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },

  // CONTACTO DE EMERGENCIA
  emergencySection: {
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

  emergencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },

  emergencySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },

  emergencyInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#374151',
  },

  // PREFERENCIAS
  preferencesSection: {
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

  preferencesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },

  preferencesSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },

  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },

  preferenceText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#8B5CF6',
    borderRadius: 4,
  },

  checkboxChecked: {
    backgroundColor: '#8B5CF6',
  },

  // NAVEGACIÓN INFERIOR
  bottomNav: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingBottom: 34, // Safe area para iPhone
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  bottomNavItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },

  bottomNavIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },

  bottomNavText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },

  bottomNavTextActive: {
    color: '#8B5CF6',
    fontWeight: '600',
  },

  // ESTADOS VACÍOS
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  emptyStateIcon: {
    width: 64,
    height: 64,
    marginBottom: 16,
    opacity: 0.3,
  },

  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },

  emptyStateDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default usuarioStyles;

