import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BarChart2, Info } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from './GlassCard';

interface ChartContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  legend?: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  subtitle,
  children,
  legend,
}) => {
  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleColumn}>
          <View style={styles.titleRow}>
            <BarChart2 size={14} color={COLORS.primary} />
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </View>
          {subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        <Info size={14} color={COLORS.textSecondary} />
      </View>

      <View style={styles.chartArea}>{children}</View>

      {legend && <View style={styles.legendArea}>{legend}</View>}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING.md,
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: SPACING.borderRadiusLg,
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  titleColumn: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: 0.1,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  chartArea: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.xs,
  },
  legendArea: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: SPACING.sm,
    marginTop: SPACING.sm,
  },
});
