import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ViewStyle, Dimensions, StyleProp } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Line, Circle } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from './GlassCard';

interface ChartCardProps {
  title: string;
  labels: string[];
  data: number[];
  historicalData?: number[];
  ySuffix?: string;
  type?: 'line' | 'area' | 'bar';
  style?: StyleProp<ViewStyle>;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  labels,
  data,
  historicalData,
  ySuffix = '',
  type = 'area',
  style,
}) => {
  const [width, setWidth] = useState(Dimensions.get('window').width - 2 * SPACING.horizontalPadding - 32);
  const height = 180;
  const paddingLeft = 32;
  const paddingRight = 16;
  const paddingTop = 20;
  const paddingBottom = 24;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const chartOpacity = useSharedValue(0);
  const chartScale = useSharedValue(0.95);

  useEffect(() => {
    chartOpacity.value = withTiming(1, { duration: 600 });
    chartScale.value = withTiming(1, { duration: 600 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: chartOpacity.value,
      transform: [{ scale: chartScale.value }],
    };
  });

  const onLayout = (event: any) => {
    const layoutWidth = event.nativeEvent.layout.width;
    if (layoutWidth > 0) {
      setWidth(layoutWidth);
    }
  };

  // Math conversions
  const allValues = [...data, ...(historicalData || [])];
  const maxVal = Math.max(...allValues, 10);
  const minVal = Math.min(...allValues, 0);
  const valRange = maxVal - minVal || 1;

  const getSvgCoordinates = (values: number[]) => {
    return values.map((val, index) => {
      const x = paddingLeft + (index / (values.length - 1)) * chartWidth;
      const y = paddingTop + chartHeight - ((val - minVal) / valRange) * chartHeight;
      return { x, y };
    });
  };

  const currentCoords = getSvgCoordinates(data);
  const historicalCoords = historicalData ? getSvgCoordinates(historicalData) : [];

  // Generate SVG path string
  const getLinePath = (coords: { x: number; y: number }[]) => {
    if (coords.length === 0) return '';
    return coords.reduce((acc, coord, idx) => {
      return idx === 0 ? `M ${coord.x} ${coord.y}` : `${acc} L ${coord.x} ${coord.y}`;
    }, '');
  };

  const getAreaPath = (coords: { x: number; y: number }[]) => {
    if (coords.length === 0) return '';
    const linePath = getLinePath(coords);
    const firstX = coords[0].x;
    const lastX = coords[coords.length - 1].x;
    const baseY = paddingTop + chartHeight;
    return `${linePath} L ${lastX} ${baseY} L ${firstX} ${baseY} Z`;
  };

  const dataPath = getLinePath(currentCoords);
  const dataAreaPath = getAreaPath(currentCoords);

  const histPath = getLinePath(historicalCoords);

  // Y-axis grid values
  const gridTicks = 4;
  const gridValues = Array.from({ length: gridTicks }).map((_, idx) => {
    return minVal + (idx / (gridTicks - 1)) * valRange;
  });

  return (
    <GlassCard style={[styles.card, style]}>
      <Text style={styles.title} numberOfLines={0}>
        {title}
      </Text>

      <View style={styles.chartWrapper} onLayout={onLayout}>
        <Animated.View style={animatedStyle}>
          <Svg width={width} height={height}>
            <Defs>
              <LinearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.35} />
                <Stop offset="100%" stopColor={COLORS.primary} stopOpacity={0.0} />
              </LinearGradient>
            </Defs>

            {/* Grid Lines */}
            {gridValues.map((val, idx) => {
              const y = paddingTop + chartHeight - ((val - minVal) / valRange) * chartHeight;
              return (
                <React.Fragment key={`grid-${idx}`}>
                  <Line
                    x1={paddingLeft}
                    y1={y}
                    x2={width - paddingRight}
                    y2={y}
                    stroke={COLORS.border}
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                  <Circle cx={paddingLeft} cy={y} r={1.5} fill={COLORS.textSecondary} />
                </React.Fragment>
              );
            })}

            {/* Historical Average (Dotted Grey Line) */}
            {historicalData && historicalCoords.length > 0 && (
              <Path
                d={histPath}
                fill="none"
                stroke={COLORS.textSecondary}
                strokeWidth={1.5}
                strokeDasharray="5 5"
                opacity={0.6}
              />
            )}

            {/* Area Fill */}
            {type === 'area' && dataAreaPath && (
              <Path d={dataAreaPath} fill="url(#chartGradient)" />
            )}

            {/* Data Line */}
            {dataPath && (
              <Path
                d={dataPath}
                fill="none"
                stroke={COLORS.primary}
                strokeWidth={3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}

            {/* Data Markers */}
            {currentCoords.map((coord, idx) => (
              <Circle
                key={`dot-${idx}`}
                cx={coord.x}
                cy={coord.y}
                r={4}
                fill={COLORS.primary}
                stroke="#FFFFFF"
                strokeWidth={1.5}
              />
            ))}
          </Svg>
        </Animated.View>

        {/* Labels below chart */}
        <View style={[styles.labelsContainer, { paddingLeft }]}>
          {labels.map((label, index) => {
            const labelWidth = chartWidth / (labels.length - 1);
            return (
              <Text
                key={`label-${index}`}
                style={[
                  styles.labelText,
                  {
                    width: labelWidth,
                    textAlign: index === 0 ? 'left' : index === labels.length - 1 ? 'right' : 'center',
                    marginLeft: index === 0 ? 0 : -labelWidth / 2,
                    marginRight: index === labels.length - 1 ? -labelWidth / 2 : 0,
                  },
                ]}
                numberOfLines={1}
              >
                {label}
              </Text>
            );
          })}
        </View>

        {/* Grid Y-Labels */}
        <View style={styles.yLabelsContainer}>
          {gridValues.map((val, idx) => {
            const y = paddingTop + chartHeight - ((val - minVal) / valRange) * chartHeight;
            return (
              <Text
                key={`y-label-${idx}`}
                style={[
                  styles.yLabelText,
                  {
                    top: y - 7,
                    width: paddingLeft - 4,
                  },
                ]}
                numberOfLines={1}
              >
                {Math.round(val)}
                {ySuffix}
              </Text>
            );
          })}
        </View>
      </View>

      {/* Legend */}
      {historicalData && (
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: COLORS.primary }]} />
            <Text style={styles.legendText}>Current Year</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, styles.historicalLegendLine]} />
            <Text style={styles.legendText}>Historical Avg</Text>
          </View>
        </View>
      )}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING.lg,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  chartWrapper: {
    position: 'relative',
    height: 180 + 20, // chart height + label margin
  },
  labelsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 16,
    height: 20,
    justifyContent: 'space-between',
  },
  labelText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
  yLabelsContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 24,
    width: 32,
  },
  yLabelText: {
    position: 'absolute',
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    textAlign: 'right',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: SPACING.md,
    gap: SPACING.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 3,
    borderRadius: 1.5,
    marginRight: 6,
  },
  historicalLegendLine: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    borderStyle: 'dashed',
  },
  legendText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
});
