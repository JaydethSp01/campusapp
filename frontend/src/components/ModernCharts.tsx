import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  withSequence,
  withDelay
} from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');
const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 1,
  color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#8B5CF6',
  },
  propsForBackgroundLines: {
    strokeDasharray: '',
    stroke: '#E5E7EB',
    strokeWidth: 1,
  },
};

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, delay = 0 }) => {
  const translateY = useSharedValue(50);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    translateY.value = withDelay(delay, withSpring(0, { damping: 15, stiffness: 150 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

interface LineChartCardProps {
  title: string;
  subtitle?: string;
  data: any;
  delay?: number;
}

export const LineChartCard: React.FC<LineChartCardProps> = ({ 
  title, 
  subtitle, 
  data, 
  delay = 0 
}) => {
  return (
    <AnimatedCard delay={delay}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={screenWidth - 60}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withDots={true}
          withShadow={false}
          withScrollableDot={false}
        />
      </View>
    </AnimatedCard>
  );
};

interface BarChartCardProps {
  title: string;
  subtitle?: string;
  data: any;
  delay?: number;
}

export const BarChartCard: React.FC<BarChartCardProps> = ({ 
  title, 
  subtitle, 
  data, 
  delay = 0 
}) => {
  return (
    <AnimatedCard delay={delay}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={screenWidth - 60}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          showValuesOnTopOfBars={true}
          fromZero={true}
        />
      </View>
    </AnimatedCard>
  );
};

interface PieChartCardProps {
  title: string;
  subtitle?: string;
  data: any;
  delay?: number;
}

export const PieChartCard: React.FC<PieChartCardProps> = ({ 
  title, 
  subtitle, 
  data, 
  delay = 0 
}) => {
  return (
    <AnimatedCard delay={delay}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.chartContainer}>
        <PieChart
          data={data}
          width={screenWidth - 60}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 0]}
          absolute
        />
      </View>
    </AnimatedCard>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: string;
  delay?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  subtitle, 
  color = '#8B5CF6',
  delay = 0 
}) => {
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withDelay(delay, withSpring(1, { damping: 15, stiffness: 150 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.metricCard, animatedStyle]}>
      <LinearGradient
        colors={[color, `${color}80`]}
        style={styles.metricGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricTitle}>{title}</Text>
        {subtitle && <Text style={styles.metricSubtitle}>{subtitle}</Text>}
      </LinearGradient>
    </Animated.View>
  );
};

interface FilterBarProps {
  onFilterChange: (filter: string) => void;
  onTimeRangeChange: (range: string) => void;
  onExport: () => void;
  showAnonymous?: boolean;
  onAnonymousToggle: (value: boolean) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onFilterChange,
  onTimeRangeChange,
  onExport,
  showAnonymous = false,
  onAnonymousToggle
}) => {
  return (
    <AnimatedCard delay={100}>
      <View style={styles.filterContainer}>
        <View style={styles.filterLeft}>
          <View style={styles.dropdown}>
            <Text style={styles.dropdownText}>Todos</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <View style={[styles.checkbox, showAnonymous && styles.checkboxChecked]}>
              {showAnonymous && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkboxLabel}>Ver datos anónimos</Text>
          </View>
        </View>
        
        <View style={styles.filterRight}>
          <View style={styles.timeButtons}>
            <View style={styles.timeButton}>
              <Text style={styles.timeButtonText}>7d</Text>
            </View>
            <View style={[styles.timeButton, styles.timeButtonActive]}>
              <Text style={[styles.timeButtonText, styles.timeButtonTextActive]}>30d</Text>
            </View>
            <View style={styles.timeButton}>
              <Text style={styles.timeButtonText}>Sem</Text>
            </View>
          </View>
          <View style={styles.exportButton}>
            <Text style={styles.exportButtonText}>Exportar CSV</Text>
          </View>
        </View>
      </View>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  chartContainer: {
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
  },
  metricCard: {
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  metricGradient: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  metricValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  metricSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  filterLeft: {
    flex: 1,
  },
  filterRight: {
    alignItems: 'flex-end',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  dropdownText: {
    fontSize: 14,
    color: '#374151',
    marginRight: 8,
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6B7280',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#8B5CF6',
    borderColor: '#8B5CF6',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#374151',
  },
  timeButtons: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  timeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginHorizontal: 2,
    backgroundColor: '#F3F4F6',
  },
  timeButtonActive: {
    backgroundColor: '#8B5CF6',
  },
  timeButtonText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  timeButtonTextActive: {
    color: '#FFFFFF',
  },
  exportButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  exportButtonText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
});
