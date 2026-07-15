import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Satellite, Server, Wifi, Activity } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';

export const AISatelliteStatus: React.FC = () => {
  const assets = [
    {
      name: 'Sentinel-5P Sentinel Sat',
      type: 'Spectral Imaging',
      status: 'Synced',
      metric: 'Coverage: 98.4%',
      icon: <Satellite size={16} color={COLORS.primary} />,
    },
    {
      name: 'INSAT-3DR Weather Link',
      type: 'Thermal Imagery',
      status: 'Live stream',
      metric: 'Latency: 1.2s',
      icon: <Satellite size={16} color={COLORS.accent} />,
    },
    {
      name: 'IMD Doppler Radar Net',
      type: 'Precipitation Scan',
      status: 'Operational',
      metric: 'Range: 450km',
      icon: <Activity size={16} color={COLORS.success} />,
    },
    {
      name: 'Ground IoT Sensor Cluster',
      type: 'Soil & Hydro Telemetry',
      status: 'Synced',
      metric: 'Nodes: 1,395 active',
      icon: <Server size={16} color={COLORS.secondary} />,
    },
  ];

  return (
    <View style={styles.container}>
      <GlassCard style={styles.card}>
        <Text style={styles.sectionTitle} numberOfLines={0}>
          Satellite & Sensor Link Matrix
        </Text>
        <Text style={styles.sectionSubtitle} numberOfLines={0}>
          Live data feed parameters and orbital status logs
        </Text>

        <View style={styles.grid}>
          {assets.map((asset, idx) => (
            <View key={`asset-${idx}`} style={styles.row}>
              <View style={styles.leftCol}>
                <View style={styles.iconBox}>
                  {asset.icon}
                </View>
                <View style={styles.textCol}>
                  <Text style={styles.assetName} numberOfLines={0}>
                    {asset.name}
                  </Text>
                  <Text style={styles.assetType} numberOfLines={0}>
                    {asset.type}
                  </Text>
                </View>
              </View>

              <View style={styles.rightCol}>
                <View style={styles.statusBadge}>
                  <Wifi size={10} color={COLORS.success} />
                  <Text style={styles.statusText} numberOfLines={0}>
                    {asset.status}
                  </Text>
                </View>
                <Text style={styles.metricText} numberOfLines={0}>
                  {asset.metric}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </GlassCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.xxxl, // Spacing to ensure it scrolls past capsule nav
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    marginTop: 2,
  },
  grid: {
    gap: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: SPACING.borderRadiusMd,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  leftCol: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: SPACING.sm,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textCol: {
    flex: 1,
  },
  assetName: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  assetType: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  rightCol: {
    alignItems: 'flex-end',
    width: 110,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 4,
  },
  statusText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.success,
  },
  metricText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
});
