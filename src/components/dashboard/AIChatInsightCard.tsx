import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Sparkles, ShieldAlert, CheckCircle2, Navigation } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { StatusBadge } from '../common/StatusBadge';

export const AIChatInsightCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <GlassCard style={styles.card}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.titleGroup}>
            <Sparkles size={20} color={COLORS.primary} style={styles.sparkleIcon} />
            <Text style={styles.titleText} numberOfLines={0}>
              AI Climate Intel
            </Text>
          </View>
          <StatusBadge type="success" label="Active Model" />
        </View>

        {/* Insight Body */}
        <Text style={styles.summaryText} numberOfLines={0}>
          Monsoon currents are intensifying along the Western Ghats, causing saturated soil columns in Nilgiris and adjacent high-elevation zones. Runoff is high. Inland, a stationary high-pressure ridge is amplifying heat index stresses in Vellore and Ranipet, elevating thermal load warnings.
        </Text>

        {/* Risk & Confidence Info */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCell}>
            <Text style={styles.metricLabel} numberOfLines={0}>Systemic Risk</Text>
            <View style={styles.riskBadge}>
              <ShieldAlert size={14} color={COLORS.warning} />
              <Text style={styles.riskText} numberOfLines={0}>Elevated (Level 3)</Text>
            </View>
          </View>

          <View style={styles.metricCell}>
            <Text style={styles.metricLabel} numberOfLines={0}>Model Confidence</Text>
            <View style={styles.confidenceRow}>
              <AnimatedNumber 
                value={96} 
                style={styles.confidenceValue} 
                suffix="%" 
              />
              <Text style={styles.confidenceSub} numberOfLines={0}>accuracy</Text>
            </View>
          </View>
        </View>

        {/* Recommendations Section */}
        <View style={styles.recommendationsBlock}>
          <Text style={styles.recTitle} numberOfLines={0}>
            Actionable Directives
          </Text>
          
          <View style={styles.recItem}>
            <Navigation size={14} color={COLORS.primary} style={styles.bulletIcon} />
            <Text style={styles.recText} numberOfLines={0}>
              Restrict heavy logistical movement on steep incline roads in Nilgiris.
            </Text>
          </View>

          <View style={styles.recItem}>
            <Navigation size={14} color={COLORS.primary} style={styles.bulletIcon} />
            <Text style={styles.recText} numberOfLines={0}>
              Prepare municipal water distribution channels in Vellore for high evaporation demand.
            </Text>
          </View>

          <View style={styles.recItem}>
            <Navigation size={14} color={COLORS.primary} style={styles.bulletIcon} />
            <Text style={styles.recText} numberOfLines={0}>
              Maintain active monitoring of Bay of Bengal depression landfall timeline.
            </Text>
          </View>
        </View>
      </GlassCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.sectionToSection,
  },
  card: {
    borderWidth: 1.5,
    borderColor: 'rgba(37, 99, 235, 0.2)', // Indigo glow accent border
    backgroundColor: '#FFFFFF',
    padding: SPACING.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sparkleIcon: {
    marginRight: 6,
  },
  titleText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  summaryText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.regular,
    color: COLORS.textPrimary,
    lineHeight: TYPOGRAPHY.lineHeights.md,
    marginBottom: SPACING.lg,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: SPACING.borderRadiusMd,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  metricCell: {
    flex: 1,
  },
  metricLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  riskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  riskText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.warning,
  },
  confidenceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  confidenceValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  confidenceSub: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  recommendationsBlock: {
    paddingTop: SPACING.xs,
  },
  recTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  recItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
    paddingRight: SPACING.sm,
  },
  bulletIcon: {
    marginRight: 8,
    marginTop: 3,
    transform: [{ rotate: '90deg' }],
  },
  recText: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeights.xs,
  },
});
