import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { 
  Wind, 
  Droplet, 
  Sun, 
  Eye, 
  TrendingDown, 
  Activity, 
  ShieldAlert,
  Thermometer
} from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { SectionHeader } from '../common/SectionHeader';
import { AnimatedNumber } from '../common/AnimatedNumber';

interface HighlightItem {
  title: string;
  value: number;
  suffix: string;
  sublabel: string;
  icon: React.ReactNode;
  color: string;
  decimals?: number;
}

export const HighlightsGrid: React.FC = () => {
  const { width } = useWindowDimensions();
  const numColumns = width > 768 ? 4 : 2;

  const highlights: HighlightItem[] = [
    {
      title: 'Air Quality (AQI)',
      value: 94,
      suffix: '',
      sublabel: 'Moderate • PM2.5',
      icon: <Activity size={18} color={COLORS.warning} />,
      color: COLORS.warning,
    },
    {
      title: 'Wind Velocity',
      value: 22,
      suffix: ' km/h',
      sublabel: 'Vector: ENE Flow',
      icon: <Wind size={18} color={COLORS.primary} />,
      color: COLORS.primary,
    },
    {
      title: 'Soil Moisture',
      value: 42,
      suffix: '%',
      sublabel: 'Volumetric Ratio',
      icon: <Droplet size={18} color={COLORS.accent} />,
      color: COLORS.accent,
    },
    {
      title: 'UV Intensity',
      value: 10,
      suffix: '',
      sublabel: 'Index: Very High',
      icon: <Sun size={18} color={COLORS.danger} />,
      color: COLORS.danger,
    },
    {
      title: 'Visibility Index',
      value: 9.0,
      suffix: ' km',
      sublabel: 'Clear Atmosphere',
      icon: <Eye size={18} color={COLORS.success} />,
      color: COLORS.success,
      decimals: 1,
    },
    {
      title: 'Rainfall Accum',
      value: 12.4,
      suffix: ' mm',
      sublabel: 'Past 24 Hours',
      icon: <Droplet size={18} color={COLORS.primary} />,
      color: COLORS.primary,
      decimals: 1,
    },
    {
      title: 'Ground Water Depth',
      value: 8.2,
      suffix: ' m',
      sublabel: 'Level Below Ground',
      icon: <TrendingDown size={18} color={COLORS.textSecondary} />,
      color: COLORS.textSecondary,
      decimals: 1,
    },
    {
      title: 'Env Health Score',
      value: 62,
      suffix: '',
      sublabel: 'Climate Health Stressed',
      icon: <ShieldAlert size={18} color={COLORS.warning} />,
      color: COLORS.warning,
    },
  ];

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="Environmental Highlights" 
        subtitle="Critical regional telemetry readings" 
      />
      
      <View style={styles.grid}>
        {highlights.map((item, idx) => (
          <GlassCard key={`hl-${idx}`} style={[styles.gridCard, { width: `${100 / numColumns - 2}%` }]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconBox, { backgroundColor: `${item.color}15` }]}>
                {item.icon}
              </View>
            </View>
            <Text style={styles.itemTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.valueRow}>
              <AnimatedNumber 
                value={item.value} 
                style={[styles.itemValue, { color: COLORS.textPrimary }]} 
                suffix={item.suffix}
                decimals={item.decimals}
              />
            </View>
            <Text style={styles.itemSublabel} numberOfLines={1}>
              {item.sublabel}
            </Text>
          </GlassCard>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.sectionToSection,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  gridCard: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.md,
    borderRadius: SPACING.borderRadiusMd,
  },
  cardHeader: {
    marginBottom: SPACING.sm,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueRow: {
    marginVertical: 4,
  },
  itemValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  itemSublabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
});
