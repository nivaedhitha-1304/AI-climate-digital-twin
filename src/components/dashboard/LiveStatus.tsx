import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { Satellite, Cpu, Radio, ShieldCheck, Database } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { SectionHeader } from '../common/SectionHeader';
import { StatusBadge } from '../common/StatusBadge';
import { AnimatedNumber } from '../common/AnimatedNumber';

export const LiveStatus: React.FC = () => {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  const services = [
    {
      name: 'Weather Simulation Engine',
      status: 'Live',
      type: 'live' as const,
      icon: <Radio size={16} color={COLORS.success} />,
    },
    {
      name: 'Sentinel Satellite Link',
      status: 'Operational',
      type: 'success' as const,
      icon: <Satellite size={16} color={COLORS.primary} />,
    },
    {
      name: 'AI Analysis Core',
      status: 'Synced',
      type: 'success' as const,
      icon: <Cpu size={16} color={COLORS.accent} />,
    },
    {
      name: 'Tamil Nadu IoT Nodes',
      status: '1,395/1,420 Active',
      type: 'success' as const,
      icon: <Database size={16} color={COLORS.secondary} />,
    },
  ];

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="Twin System Telemetry" 
        subtitle="Operational status of climate intelligence services" 
      />
      
      <GlassCard style={styles.card}>
        {/* Core System Health Row */}
        <View style={styles.healthHeader}>
          <View style={styles.healthTextWrapper}>
            <Text style={styles.healthLabel} numberOfLines={0}>System Health Index</Text>
            <View style={styles.scoreRow}>
              <AnimatedNumber 
                value={98} 
                style={styles.scoreText} 
                suffix="%" 
              />
              <Text style={styles.scoreDesc} numberOfLines={0}>Optimal Range</Text>
            </View>
          </View>
          
          <View style={styles.shieldWrapper}>
            <ShieldCheck size={28} color={COLORS.success} />
          </View>
        </View>

        {/* Services List */}
        <View style={[styles.servicesGrid, isTablet && styles.servicesGridTablet]}>
          {services.map((svc, idx) => (
            <View 
              key={`svc-${idx}`} 
              style={[
                styles.serviceRow, 
                isTablet && styles.serviceRowTablet,
                idx === services.length - 1 && !isTablet && styles.noBorder
              ]}
            >
              <View style={styles.serviceMeta}>
                <View style={styles.iconBox}>
                  {svc.icon}
                </View>
                <Text style={styles.serviceName} numberOfLines={0}>
                  {svc.name}
                </Text>
              </View>
              <StatusBadge type={svc.type} label={svc.status} />
            </View>
          ))}
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
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.xl,
  },
  healthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(34, 197, 94, 0.04)',
    borderColor: 'rgba(34, 197, 94, 0.15)',
    borderWidth: 1,
    borderRadius: SPACING.borderRadiusLg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  healthTextWrapper: {
    flex: 1,
  },
  healthLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 2,
  },
  scoreText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.success,
  },
  scoreDesc: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
  shieldWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.25)',
  },
  servicesGrid: {
    flexDirection: 'column',
  },
  servicesGridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  serviceRowTablet: {
    width: '48%',
    borderBottomWidth: 0,
    backgroundColor: COLORS.background,
    borderRadius: SPACING.borderRadiusMd,
    paddingHorizontal: SPACING.md,
    marginVertical: 4,
  },
  serviceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: SPACING.sm,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  serviceName: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  noBorder: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
});
