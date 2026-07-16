import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { FileText, Download, Share2 } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from './GlassCard';

interface ClimateReportCardProps {
  title: string;
  type: 'Daily' | 'Weekly' | 'Monthly' | 'Seasonal' | 'Annual';
  period: string;
  highlights: string[];
  districtScope: string;
}

export const ClimateReportCard: React.FC<ClimateReportCardProps> = ({
  title,
  type,
  period,
  highlights,
  districtScope,
}) => {
  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <FileText size={18} color={COLORS.primary} />
        </View>
        <View style={styles.headerText}>
          <View style={styles.typeRow}>
            <Text style={styles.typeText}>{type.toUpperCase()} SUMMARY</Text>
            <Text style={styles.periodText}>{period}</Text>
          </View>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Scope info */}
      <Text style={styles.scopeText}>
        Scope: <Text style={styles.scopeVal}>{districtScope}</Text>
      </Text>

      {/* Highlights checklist */}
      <View style={styles.highlightsContainer}>
        <Text style={styles.sectionTitle}>KEY METRIC FLUCTUATIONS</Text>
        {highlights.map((highlight, index) => (
          <Text key={`hl-${index}`} style={styles.highlightText} numberOfLines={2}>
            • {highlight}
          </Text>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Export Actions (UI Only) */}
      <View style={styles.actionRow}>
        <Pressable style={styles.actionBtn}>
          <Download size={12} color={COLORS.primary} />
          <Text style={styles.actionBtnText}>Export PDF</Text>
        </Pressable>
        <Pressable style={styles.actionBtn}>
          <Share2 size={12} color={COLORS.textSecondary} />
          <Text style={[styles.actionBtnText, { color: COLORS.textSecondary }]}>Share</Text>
        </Pressable>
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
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    flex: 1,
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  typeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  periodText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: SPACING.sm,
  },
  scopeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  scopeVal: {
    color: COLORS.textPrimary,
  },
  highlightsContainer: {
    gap: 3,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  highlightText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    lineHeight: 12,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  actionBtnText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
});
