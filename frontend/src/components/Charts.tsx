import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Svg, Circle, Line, Rect, Text as SvgText, G, Path } from 'react-native-svg';

const { width: screenWidth } = Dimensions.get('window');

interface ChartData {
  label: string;
  value: number;
  color?: string;
}

interface LineChartProps {
  data: ChartData[];
  title: string;
  subtitle?: string;
  height?: number;
}

interface PieChartProps {
  data: ChartData[];
  title: string;
  subtitle?: string;
  size?: number;
}

interface BarChartProps {
  data: ChartData[];
  title: string;
  subtitle?: string;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  subtitle,
  height = 200,
}) => {
  const chartWidth = screenWidth - 80;
  const chartHeight = height;
  const padding = 40;
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  const getX = (index: number) => padding + (index * (chartWidth - 2 * padding)) / (data.length - 1);
  const getY = (value: number) => padding + ((maxValue - value) / range) * (chartHeight - 2 * padding);

  const pathData = data
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${getX(index)} ${getY(point.value)}`)
    .join(' ');

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      {subtitle && <Text style={styles.chartSubtitle}>{subtitle}</Text>}
      
      <View style={styles.chart}>
        <Svg width={chartWidth} height={chartHeight}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <Line
              key={index}
              x1={padding}
              y1={padding + ratio * (chartHeight - 2 * padding)}
              x2={chartWidth - padding}
              y2={padding + ratio * (chartHeight - 2 * padding)}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          ))}
          
          {/* Data line */}
          <Path
            d={pathData}
            stroke="#3B82F6"
            strokeWidth="3"
            fill="none"
          />
          
          {/* Data points */}
          {data.map((point, index) => (
            <Circle
              key={index}
              cx={getX(index)}
              cy={getY(point.value)}
              r="4"
              fill="#3B82F6"
            />
          ))}
          
          {/* Labels */}
          {data.map((point, index) => (
            <SvgText
              key={`label-${index}`}
              x={getX(index)}
              y={chartHeight - 10}
              fontSize="12"
              fill="#6B7280"
              textAnchor="middle"
            >
              {point.label}
            </SvgText>
          ))}
        </Svg>
      </View>
    </View>
  );
};

export const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  subtitle,
  size = 120,
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  const radius = size / 2 - 10;
  const centerX = size / 2;
  const centerY = size / 2;

  const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      {subtitle && <Text style={styles.chartSubtitle}>{subtitle}</Text>}
      
      <View style={styles.pieChartContainer}>
        <Svg width={size} height={size}>
          {data.map((item, index) => {
            const percentage = item.value / total;
            const angle = percentage * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            
            const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            currentAngle += angle;
            
            return (
              <G key={index}>
                <path
                  d={pathData}
                  fill={item.color || colors[index % colors.length]}
                />
              </G>
            );
          })}
        </Svg>
        
        {/* Legend */}
        <View style={styles.chartLegend}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: item.color || colors[index % colors.length] }
                ]}
              />
              <Text style={styles.legendText}>
                {item.label} ({Math.round((item.value / total) * 100)}%)
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  subtitle,
  height = 180,
}) => {
  const chartWidth = screenWidth - 80;
  const chartHeight = height;
  const padding = 40;
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = (chartWidth - 2 * padding) / data.length - 10;

  const getBarHeight = (value: number) => (value / maxValue) * (chartHeight - 2 * padding);
  const getBarX = (index: number) => padding + index * (barWidth + 10);

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      {subtitle && <Text style={styles.chartSubtitle}>{subtitle}</Text>}
      
      <View style={styles.barChartContainer}>
        <Svg width={chartWidth} height={chartHeight}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => (
            <Line
              key={index}
              x1={padding}
              y1={padding + ratio * (chartHeight - 2 * padding)}
              x2={chartWidth - padding}
              y2={padding + ratio * (chartHeight - 2 * padding)}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          ))}
          
          {/* Bars */}
          {data.map((item, index) => {
            const barHeight = getBarHeight(item.value);
            const x = getBarX(index);
            const y = padding + (chartHeight - 2 * padding) - barHeight;
            
            return (
              <G key={index}>
                <Rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={item.color || '#3B82F6'}
                  rx="4"
                />
                <SvgText
                  x={x + barWidth / 2}
                  y={y - 5}
                  fontSize="12"
                  fill="#374151"
                  textAnchor="middle"
                >
                  {item.value}
                </SvgText>
                <SvgText
                  x={x + barWidth / 2}
                  y={chartHeight - 10}
                  fontSize="12"
                  fill="#6B7280"
                  textAnchor="middle"
                >
                  {item.label}
                </SvgText>
              </G>
            );
          })}
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 8,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  chart: {
    alignItems: 'center',
  },
  pieChartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chartLegend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#6B7280',
  },
  barChartContainer: {
    marginTop: 20,
  },
});
