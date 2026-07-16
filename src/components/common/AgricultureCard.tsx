import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Sprout, Compass, Droplet, ShieldAlert, Cpu } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from './GlassCard';
import { TrafficLightBadge, RiskSeverity } from './TrafficLightBadge';

interface AgricultureCardProps {
  cropName: string;
  suitabilityScore: number;
  irrigationIndex: string;
  season: string;
  droughtRisk: RiskSeverity;
  diseaseRisk: RiskSeverity;
  aiFarmingTips: string[];
}

export const AgricultureCard: React.FC<AgricultureCardProps> = ({
  cropName,
  suitabilityScore,
  irrigationIndex,
  season,
  droughtRisk,
  diseaseRisk,
  aiFarmingTips,
}) => {
  const getSuitabilityColor = (score: number) => {
    if (score > 80) return '#22C55E';
    if (score > 55) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <GlassCard style={styles.card}>
      {/* Title Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Sprout size={16} color={COLORS.primary} />
          <Text style={styles.cropTitle}>{cropName} Diagnostics</Text>
        </View>
        <View style={[styles.suitabilityBadge, { borderColor: getSuitabilityColor(suitabilityScore) }]}>
          <Text style={[styles.suitabilityText, { color: getSuitabilityColor(suitabilityScore) }]}>
            {suitabilityScore}% Match
          </Text>
        </View>
      </View>

      {/* Main Grid */}
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Compass size={12} color={COLORS.textSecondary} />
          <View>
            <Text style={styles.label}>Season Type</Text>
            <Text style={styles.value} numberOfLines={1}>{season}</Text>
          </View>
        </View>

        <View style={styles.gridItem}>
          <Droplet size={12} color={COLORS.secondary} />
          <View>
            <Text style={styles.label}>Irrigation Index</Text>
            <Text style={styles.value} numberOfLines={1}>{irrigationIndex}</Text>
          </View>
        </View>

        <View style={styles.gridItem}>
          <ShieldAlert size={12} color={COLORS.danger} />
          <View>
            <Text style={styles.label}>Drought Threat</Text>
            <TrafficLightBadge severity={droughtRisk} size="sm" />
          </View>
        </View>

        <View style={styles.gridItem}>
          <ShieldAlert size={12} color={COLORS.warning} />
          <View>
            <Text style={styles.label}>Disease Stress</Text>
            <TrafficLightBadge severity={diseaseRisk} size="sm" />
          </View>
        </View>
      </View>

      {/* AI Recommendations */}
      <View style={styles.aiBox}>
        <View style={styles.aiHeader}>
          <Cpu size={12} color={COLORS.primary} />
          <Text style={styles.aiTitle}>AI FARMING INTELLIGENCE DIRECTIVE</Text>
        </View>
        {aiFarmingTips.map((tip, index) => (
          <Text key={`tip-${index}`} style={styles.aiTip} numberOfLines={2}>
            • {tip}
          </Text>
        ))}
      </View>
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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 6,
    marginBottom: SPACING.md,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cropTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  suitabilityBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  suitabilityText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  gridItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.background,
    padding: 6,
    borderRadius: 8,
    borderColor: '#F1F5F9',
    borderWidth: 1,
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 7,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  value: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginTop: 1,
  },
  aiBox: {
    backgroundColor: 'rgba(37, 99, 235, 0.03)',
    borderColor: 'rgba(37, 99, 235, 0.08)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 4,
  },
  aiTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  aiTip: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    lineHeight: 12,
    marginTop: 2,
  },
});
