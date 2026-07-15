import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AlertCircle, ShieldAlert, Sparkles } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { SectionHeader } from '../common/SectionHeader';
import { StatusBadge } from '../common/StatusBadge';
import { CLIMATE_ALERTS, ClimateAlert } from '../../mock/climateMock';

export const AlertsList: React.FC = () => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Extreme':
        return COLORS.danger;
      case 'Severe':
        return COLORS.warning;
      case 'Moderate':
      default:
        return COLORS.primary;
    }
  };

  const getAlertBadgeType = (severity: string) => {
    switch (severity) {
      case 'Extreme':
        return 'danger';
      case 'Severe':
        return 'warning';
      case 'Moderate':
      default:
        return 'info';
    }
  };

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="Active Hazards & Advisories" 
        subtitle="Real-time warning system updates" 
      />

      <View style={styles.alertsContainer}>
        {CLIMATE_ALERTS.map((alert: ClimateAlert) => {
          const sevColor = getSeverityColor(alert.severity);
          const badgeType = getAlertBadgeType(alert.severity);

          return (
            <GlassCard key={alert.id} style={styles.alertCard}>
              {/* Alert Header */}
              <View style={styles.alertHeader}>
                <View style={styles.titleWrapper}>
                  <View style={[styles.bullet, { backgroundColor: sevColor }]} />
                  <Text style={styles.alertTitle} numberOfLines={0}>
                    {alert.type} — {alert.district}
                  </Text>
                </View>
                <StatusBadge type={badgeType} label={alert.severity} />
              </View>

              {/* Description */}
              <Text style={styles.description} numberOfLines={0}>
                {alert.description}
              </Text>

              {/* Footer */}
              <View style={styles.footerRow}>
                <Text style={styles.timeText} numberOfLines={0}>
                  Reported: {alert.timestamp}
                </Text>
                
                <View style={styles.confidenceBadge}>
                  <Sparkles size={11} color={COLORS.secondary} />
                  <Text style={styles.confidenceText} numberOfLines={0}>
                    {alert.confidence}% Confidence
                  </Text>
                </View>
              </View>
            </GlassCard>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.xxxl, // Spacing at the bottom to offset the navigation capsule
  },
  alertsContainer: {
    gap: SPACING.cardToCard,
  },
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: SPACING.sm,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  alertTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  description: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    lineHeight: TYPOGRAPHY.lineHeights.sm,
    marginBottom: SPACING.md,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.sm,
  },
  timeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  confidenceText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
});
