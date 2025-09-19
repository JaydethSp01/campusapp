import { StyleSheet, Platform } from 'react-native';

// Colores como constantes separadas para mejor compatibilidad
export const colors = {
  // Header y navegación
  primary: '#8B5CF6', // Púrpura principal del header
  primaryDark: '#7C3AED', // Púrpura más oscuro del gradiente
  primaryLight: '#A855F7', // Púrpura más claro
  
  // Botones principales
  red: '#DC2626', // Rojo botones "Entrar", "Crear ticket"
  blue: '#2563EB', // Azul botones "Registrarme", "Enviar calificación", "Guardar"
  blueLight: '#3B82F6', // Azul claro para sliders y gráficos
  
  // Fondos
  background: '#F9FAFB', // Fondo principal gris muy claro
  white: '#FFFFFF', // Blanco puro para cards
  
  // Textos
  textPrimary: '#000000', // Negro puro para títulos
  textSecondary: '#6B7280', // Gris medio para subtítulos
  textLight: '#9CA3AF', // Gris claro para placeholders
  
  // Estados y badges
  success: '#10B981', // Verde para "bajo"
  warning: '#F59E0B', // Amarillo/naranja para "medio"
  danger: '#EF4444', // Rojo para "alto" y "pendiente"
  
  // Bordes y divisores
  border: '#E5E7EB', // Gris claro para bordes de inputs
  borderLight: '#F3F4F6', // Gris muy claro para divisores
  
  // Gráficos (colores específicos de los charts)
  chartBlue: '#3B82F6',
  chartRed: '#EF4444',
  chartGreen: '#10B981',
  
  // Sombras
  shadowColor: '#000000',
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  shadowMedium: 'rgba(0, 0, 0, 0.1)',
  
  // Colores modernos adicionales
  surface: '#FFFFFF',
  surfaceVariant: '#F3F4F6',
  outline: '#D1D5DB',
  outlineVariant: '#E5E7EB',
  shadow: 'rgba(0, 0, 0, 0.1)',
  shadowDark: 'rgba(0, 0, 0, 0.25)',
  gradient: {
    primary: ['#7C3AED', '#A855F7'],
    secondary: ['#06B6D4', '#0891B2'],
    success: ['#10B981', '#059669'],
    warning: ['#F59E0B', '#D97706'],
    error: ['#EF4444', '#DC2626'],
  },
};

const globalStyles = StyleSheet.create({
  // CONTENEDORES PRINCIPALES
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // HEADER/NAVBAR
  header: {
    backgroundColor: '#A855F7',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },

  headerTabs: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 10,
  },

  headerTab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    marginHorizontal: 2,
  },

  headerTabActive: {
    backgroundColor: '#E5E7EB',
  },

  headerTabText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },

  headerTabTextActive: {
    color: '#1F2937',
    fontWeight: '600',
  },

  // PANTALLAS DE LOGIN/REGISTRO
  loginContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 30,
    justifyContent: 'center',
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
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
  },

  // FORMULARIOS
  formGroup: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    marginBottom: 8,
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
  },

  inputFocused: {
    borderColor: '#A855F7',
    borderWidth: 2,
  },

  // BOTONES
  primaryButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  secondaryButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },

  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },

  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },

  outlineButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },

  linkButton: {
    alignItems: 'center',
    marginTop: 20,
  },

  linkButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '500',
  },

  // CARDS Y CONTENIDO
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },

  installationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 8,
    padding: 0,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
    }),
  },

  cardImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  cardContent: {
    padding: 15,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },

  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },

  // INSTALACIONES GRID
  installationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },

  installationItem: {
    width: '48%',
    marginBottom: 15,
  },

  // SECCIÓN DE REPORTES
  reportSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },

  // DROPDOWN/SELECT
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 15,
  },

  dropdownText: {
    fontSize: 16,
    color: '#1F2937',
  },

  // MÉTRICAS Y ESTADÍSTICAS
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  metricBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },

  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },

  metricLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  // LISTAS Y ITEMS
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
    }),
  },

  listItemLeft: {
    flex: 1,
  },

  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },

  listItemSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },

  // STATUS BADGES
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },

  statusBadgeGreen: {
    backgroundColor: '#D1FAE5',
  },

  statusBadgeRed: {
    backgroundColor: '#FEE2E2',
  },

  statusBadgeYellow: {
    backgroundColor: '#FEF3C7',
  },

  statusBadgeTextGreen: {
    color: '#065F46',
    fontSize: 12,
    fontWeight: '500',
  },

  statusBadgeTextRed: {
    color: '#991B1B',
    fontSize: 12,
    fontWeight: '500',
  },

  statusBadgeTextYellow: {
    color: '#92400E',
    fontSize: 12,
    fontWeight: '500',
  },

  // CALIFICACIÓN CON EMOJIS
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },

  ratingEmoji: {
    fontSize: 32,
    padding: 10,
  },

  ratingEmojiSelected: {
    backgroundColor: '#FEF3C7',
    borderRadius: 50,
  },

  // TEXTAREA
  textArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1F2937',
    height: 100,
    textAlignVertical: 'top',
  },

  // SLIDER
  sliderContainer: {
    marginVertical: 20,
  },

  sliderLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    marginBottom: 10,
  },

  sliderValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },

  // BOTTOM NAVIGATION
  bottomNavigation: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingBottom: 30,
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

  // NOTIFICACIONES
  notificationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      },
    }),
  },

  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },

  notificationTime: {
    fontSize: 12,
    color: '#6B7280',
  },

  // UTILIDADES DE TEXTO
  textPrimary: {
    color: '#1F2937',
  },

  textSecondary: {
    color: '#6B7280',
  },

  textSuccess: {
    color: '#10B981',
  },

  textWarning: {
    color: '#F59E0B',
  },

  textDanger: {
    color: '#EF4444',
  },

  textCenter: {
    textAlign: 'center',
  },

  textBold: {
    fontWeight: '700',
  },

  textSemiBold: {
    fontWeight: '600',
  },

  textMedium: {
    fontWeight: '500',
  },

  // ESPACIADO
  mb5: { marginBottom: 5 },
  mb10: { marginBottom: 10 },
  mb15: { marginBottom: 15 },
  mb20: { marginBottom: 20 },
  
  mt5: { marginTop: 5 },
  mt10: { marginTop: 10 },
  mt15: { marginTop: 15 },
  mt20: { marginTop: 20 },
  
  p10: { padding: 10 },
  p15: { padding: 15 },
  p20: { padding: 20 },
  
  ph10: { paddingHorizontal: 10 },
  ph15: { paddingHorizontal: 15 },
  ph20: { paddingHorizontal: 20 },
  
  pv10: { paddingVertical: 10 },
  pv15: { paddingVertical: 15 },
  pv20: { paddingVertical: 20 },

  // ESTILOS MODERNOS
  modernCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  
  modernButton: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  modernInput: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.outline,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textPrimary,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  
  modernTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: colors.surfaceVariant,
  },
  
  modernTabActive: {
    backgroundColor: colors.primary,
  },
  
  modernTabText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginLeft: 6,
    fontWeight: '500',
  },
  
  modernTabTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  
  modernMetricCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 8,
    marginVertical: 8,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  
  modernHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  
  modernHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  modernHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  
  modernFilterBar: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  
  modernDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceVariant,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  
  modernCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.outline,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  modernCheckboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  
  modernTimeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginHorizontal: 2,
    backgroundColor: colors.surfaceVariant,
  },
  
  modernTimeButtonActive: {
    backgroundColor: colors.primary,
  },
  
  modernExportButton: {
    backgroundColor: colors.surfaceVariant,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
});

export default globalStyles;