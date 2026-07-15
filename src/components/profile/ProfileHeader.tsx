import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { User, MapPin, Award, ShieldAlert, Cpu, Activity, ChevronDown, ChevronUp } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';

export const ProfileHeader: React.FC = () => {
  const [showStats, setShowStats] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setShowStats(!showStats)}>
        <GlassCard style={styles.profileCard}>
          {/* Avatar glowing circle */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarInner}>
              <User size={36} color="#FFFFFF" />
            </View>
            <View style={styles.activePulse} />
          </View>

          {/* Bio Details */}
          <Text style={styles.nameText} numberOfLines={0}>
            Dr. Anand Selvan
          </Text>
          <Text style={styles.roleText} numberOfLines={0}>
            Senior Environmental Analyst
          </Text>

          <View style={styles.badgeRow}>
            <View style={styles.metaBadge}>
              <MapPin size={10} color={COLORS.primary} style={styles.icon} />
              <Text style={styles.badgeText} numberOfLines={0}>IMD Chennai Node</Text>
            </View>
            <View style={styles.metaBadge}>
              <Award size={10} color={COLORS.primary} style={styles.icon} />
              <Text style={styles.badgeText} numberOfLines={0}>Admin Access</Text>
            </View>
          </View>

          {/* Toggle indicator */}
          <View style={styles.toggleIndicator}>
            <Text style={styles.toggleText} numberOfLines={0}>
              {showStats ? 'Hide Specialist Metrics' : 'Tap to Audit Specialist Telemetry'}
            </Text>
            {showStats ? <ChevronUp size={12} color={COLORS.textSecondary} /> : <ChevronDown size={12} color={COLORS.textSecondary} />}
          </View>

          {/* Expanded audit stats */}
          {showStats && (
            <View style={styles.statsContainer}>
              <View style={styles.divider} />
              
              <View style={styles.statRow}>
                <View style={styles.statLabelWrapper}>
                  <ShieldAlert size={12} color={COLORS.danger} style={styles.statIcon} />
                  <Text style={styles.statLabel} numberOfLines={0}>Authority level</Text>
                </View>
                <Text style={styles.statValue} numberOfLines={0}>Tier-1 Climate Specialist</Text>
              </View>

              <View style={styles.statRow}>
                <View style={styles.statLabelWrapper}>
                  <Cpu size={12} color={COLORS.primary} style={styles.statIcon} />
                  <Text style={styles.statLabel} numberOfLines={0}>Sensors Synced</Text>
                </View>
                <Text style={styles.statValue} numberOfLines={0}>1,395 / 1,420 (98.2% Uptime)</Text>
              </View>

              <View style={styles.statRow}>
                <View style={styles.statLabelWrapper}>
                  <Activity size={12} color={COLORS.success} style={styles.statIcon} />
                  <Text style={styles.statLabel} numberOfLines={0}>System Node Status</Text>
                </View>
                <Text style={[styles.statValue, { color: COLORS.success }]} numberOfLines={0}>OPERATIONAL</Text>
              </View>
            </View>
          )}
        </GlassCard>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.lg,
    marginTop: SPACING.md,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  avatarInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  activePulse: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  nameText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  roleText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: SPACING.md,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  icon: {
    marginRight: 4,
  },
  badgeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  toggleIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: SPACING.lg,
  },
  toggleText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  statsContainer: {
    width: '100%',
    marginTop: SPACING.md,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    width: '100%',
    marginBottom: SPACING.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    width: '100%',
  },
  statLabelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    marginRight: 6,
  },
  statLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  statValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
  },
});
