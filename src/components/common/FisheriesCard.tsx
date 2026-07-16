import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Anchor, ShieldCheck, Waves, Clock, Cpu, AlertTriangle } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from './GlassCard';
import { TrafficLightBadge, RiskSeverity } from './TrafficLightBadge';

interface FisheriesCardProps {
  harbourName: string;
  suitability: 'Excellent' | 'Good' | 'Restricted' | 'Hazardous';
  safeWindow: string;
  tripRiskScore: number;
  safetyIndex: RiskSeverity;
  waveStatus: string;
  advisoryText: string;
  aiTips: string[];
}

export const FisheriesCard: React.FC<FisheriesCardProps> = ({
  harbourName,
  suitability,
  safeWindow,
  tripRiskScore,
  safetyIndex,
  waveStatus,
  advisoryText,
  aiTips,
}) => {
  const getSuitabilityColor = (status: string) => {
    switch (status) {
      case 'Excellent':
        return '#22C55E';
      case 'Good':
        return '#38BDF8';
      case 'Restricted':
        return '#F59E0B';
      case 'Hazardous':
      default:
        return '#EF4444';
    }
  };

  return (
    <GlassCard style={styles.card}>
      {/* Title Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Anchor size={16} color={COLORS.primary} />
          <Text style={styles.harbourTitle}>{harbourName} Marine Hub</Text>
        </View>
        <View style={[styles.suitabilityBadge, { borderColor: getSuitabilityColor(suitability) }]}>
          <Text style={[styles.suitabilityText, { color: getSuitabilityColor(suitability) }]}>
            {suitability}
          </Text>
        </View>
      </View>

      {/* Fisheries Grid */}
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Clock size={12} color={COLORS.textSecondary} />
          <View>
            <Text style={styles.label}>Safe Window</Text>
            <Text style={styles.value} numberOfLines={1}>{safeWindow}</Text>
          </View>
        </View>

        <View style={styles.gridItem}>
          <Waves size={12} color={COLORS.secondary} />
          <View>
            <Text style={styles.label}>Wave Status</Text>
            <Text style={styles.value} numberOfLines={1}>{waveStatus}</Text>
          </View>
        </View>

        <View style={styles.gridItem}>
          <ShieldCheck size={12} color={COLORS.primary} />
          <View>
            <Text style={styles.label}>Sea Safety Index</Text>
            <TrafficLightBadge severity={safetyIndex} size="sm" />
          </View>
        </View>

        <View style={styles.gridItem}>
          <AlertTriangle size={12} color={tripRiskScore > 50 ? COLORS.danger : COLORS.warning} />
          <View>
            <Text style={styles.label}>Trip Risk Index</Text>
            <Text style={styles.value}>{tripRiskScore}% Risk</Text>
          </View>
        </View>
      </View>

      {/* Harbour Advisory */}
      <View style={styles.advisoryRow}>
        <Text style={styles.advisoryLabel}>Harbour Operations: </Text>
        <Text style={styles.advisoryText} numberOfLines={1}>{advisoryText}</Text>
      </View>

      {/* AI Fisheries Suggestions */}
      <View style={styles.aiBox}>
        <View style={styles.aiHeader}>
          <Cpu size={12} color={COLORS.primary} />
          <Text style={styles.aiTitle}>AI MARITIME SAFETY SUGGESTIONS</Text>
        </View>
        {aiTips.map((tip, index) => (
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
  harbourTitle: {
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
    marginBottom: SPACING.sm,
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
  advisoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    backgroundColor: '#F8FAFC',
    padding: 6,
    borderRadius: 6,
  },
  advisoryLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
  },
  advisoryText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    flex: 1,
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
