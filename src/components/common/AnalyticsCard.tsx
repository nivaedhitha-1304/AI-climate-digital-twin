import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Sparkles, TrendingUp, TrendingDown } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from './GlassCard';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  label: string;
  change?: {
    value: string;
    type: 'positive' | 'negative' | 'neutral';
  };
  details: string;
}

export const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  label,
  change,
  details,
}) => {
  const getChangeIcon = () => {
    if (!change) return null;
    if (change.type === 'positive') {
      return <TrendingUp size={12} color="#22C55E" />;
    }
    if (change.type === 'negative') {
      return <TrendingDown size={12} color="#EF4444" />;
    }
    return null;
  };

  const getChangeColor = () => {
    if (!change) return COLORS.textSecondary;
    if (change.type === 'positive') return '#22C55E';
    if (change.type === 'negative') return '#EF4444';
    return COLORS.textSecondary;
  };

  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Sparkles size={12} color={COLORS.primary} />
      </View>

      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        {change && (
          <View style={[styles.changeBadge, { backgroundColor: `${getChangeColor()}10` }]}>
            {getChangeIcon()}
            <Text style={[styles.changeText, { color: getChangeColor() }]}>{change.value}</Text>
          </View>
        )}
      </View>

      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.details} numberOfLines={2}>
        {details}
      </Text>
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
    flex: 1,
    minWidth: 140,
    marginBottom: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textSecondary,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  value: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 22,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingVertical: 1,
    paddingHorizontal: 4,
    borderRadius: 4,
    marginLeft: 2,
  },
  changeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  details: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 4,
    lineHeight: 12,
  },
});
