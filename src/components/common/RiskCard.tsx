import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ChevronDown, ChevronUp, Info, HelpCircle } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from './GlassCard';
import { TrafficLightBadge, RiskSeverity } from './TrafficLightBadge';

export interface DriverFactor {
  name: string;
  weight: 'High' | 'Medium' | 'Low';
  icon: string;
}

interface RiskCardProps {
  riskName: string;
  riskValue: number; // 0 to 100
  severity: RiskSeverity;
  confidence: number;
  expectedTime: string;
  drivers: DriverFactor[];
}

export const RiskCard: React.FC<RiskCardProps> = ({
  riskName,
  riskValue,
  severity,
  confidence,
  expectedTime,
  drivers,
}) => {
  const [expanded, setExpanded] = useState(false);

  const getWeightColor = (weight: string) => {
    switch (weight) {
      case 'High':
        return '#EF4444';
      case 'Medium':
        return '#F59E0B';
      case 'Low':
      default:
        return '#38BDF8';
    }
  };

  return (
    <GlassCard style={styles.card}>
      {/* Header section with toggle */}
      <Pressable onPress={() => setExpanded(!expanded)} style={styles.header}>
        <View style={styles.titleColumn}>
          <Text style={styles.riskName} numberOfLines={1}>
            {riskName}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.expectedText} numberOfLines={1}>
              ETA: {expectedTime}
            </Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.confidenceText} numberOfLines={1}>
              {confidence}% Confidence
            </Text>
          </View>
        </View>

        <View style={styles.badgeColumn}>
          <TrafficLightBadge severity={severity} size="sm" />
          <View style={styles.toggleRow}>
            <Text style={styles.toggleText}>{expanded ? 'Hide Reason' : 'Explain'}</Text>
            {expanded ? <ChevronUp size={12} color={COLORS.primary} /> : <ChevronDown size={12} color={COLORS.primary} />}
          </View>
        </View>
      </Pressable>

      {/* Reanimated or Conditional Explainable AI Section */}
      {expanded && (
        <View style={styles.explainSection}>
          <View style={styles.explainHeader}>
            <Info size={11} color={COLORS.primary} />
            <Text style={styles.explainTitle}>Explainable AI - Vulnerability Factors</Text>
          </View>

          <View style={styles.driversList}>
            {drivers.map((driver, index) => (
              <View key={`driver-${index}`} style={styles.driverRow}>
                <View style={styles.driverLabelContainer}>
                  <Text style={styles.driverIcon}>{driver.icon}</Text>
                  <Text style={styles.driverName} numberOfLines={1}>
                    {driver.name}
                  </Text>
                </View>
                <View style={[styles.weightBadge, { backgroundColor: `${getWeightColor(driver.weight)}15` }]}>
                  <Text style={[styles.weightText, { color: getWeightColor(driver.weight) }]}>
                    {driver.weight} Influence
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: SPACING.borderRadiusMd,
    marginBottom: SPACING.sm,
    padding: SPACING.md,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleColumn: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  riskName: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  expectedText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  dot: {
    marginHorizontal: 5,
    color: COLORS.border,
    fontSize: 8,
  },
  confidenceText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  badgeColumn: {
    alignItems: 'flex-end',
    gap: 4,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  toggleText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.primary,
  },
  explainSection: {
    marginTop: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  explainHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  explainTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: 0.2,
  },
  driversList: {
    gap: 4,
  },
  driverRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  driverLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },
  driverIcon: {
    fontSize: 10,
  },
  driverName: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  weightBadge: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  weightText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 7,
    fontWeight: TYPOGRAPHY.weights.heavy,
  },
});
