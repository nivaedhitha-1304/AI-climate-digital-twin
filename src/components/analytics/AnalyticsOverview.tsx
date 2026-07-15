import React, { useState } from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { Activity, ShieldCheck, Download, AlertTriangle, CheckCircle } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { PrimaryButton } from '../common/Buttons';
import { ClimateRegion } from '../../../app/(tabs)/analytics';

interface AnalyticsOverviewProps {
  selectedRegion: ClimateRegion;
}

interface RegionStats {
  healthScore: number;
  healthDesc: string;
  stabilityScore: number;
  stabilityDesc: string;
  trendMoM: string;
  isTrendPositive: boolean;
  alertTitle: string;
  alertDesc: string;
  alertType: 'warning' | 'danger' | 'info';
}

const REGION_STATS_MAP: Record<ClimateRegion, RegionStats> = {
  All: {
    healthScore: 78,
    healthDesc: 'Stable forest canopy & low coastal emissions.',
    stabilityScore: 82,
    stabilityDesc: 'Slightly affected by western ghat downpours.',
    trendMoM: '+2.4% MoM',
    isTrendPositive: true,
    alertTitle: 'Anomalous Rainfall Ingress',
    alertDesc: 'Rainfall intensity in the Nilgiris district is 42% above the 10-year historical baseline for July.',
    alertType: 'warning',
  },
  North: {
    healthScore: 62,
    healthDesc: 'Arid land indices indicate high interior heat stresses.',
    stabilityScore: 71,
    stabilityDesc: 'Convective draft turbulence limiting stabilization.',
    trendMoM: '-3.8% MoM',
    isTrendPositive: false,
    alertTitle: 'Dry Heatwave Expansion Alert',
    alertDesc: 'Industrial and interior corridors in Vellore and Ranipet exceed 41°C. Irrigation networks are stressed.',
    alertType: 'danger',
  },
  South: {
    healthScore: 74,
    healthDesc: 'Agricultural soils report nominal moisture reserves.',
    stabilityScore: 79,
    stabilityDesc: 'Stable barometric balance across southern basins.',
    trendMoM: '+1.8% MoM',
    isTrendPositive: true,
    alertTitle: 'Localized Storm Cloud Warning',
    alertDesc: 'Tenkasi and Tirunelveli forecast models detect high-density cumulonimbus clusters developing along mountain basins.',
    alertType: 'warning',
  },
  West: {
    healthScore: 88,
    healthDesc: 'Lush evergreen canopy density & strong canopy saturation.',
    stabilityScore: 85,
    stabilityDesc: 'Ghat runoff buffers thermal expansion factors.',
    trendMoM: '+4.2% MoM',
    isTrendPositive: true,
    alertTitle: 'Landslide Vulnerability Trigger',
    alertDesc: 'West Ghat slope saturation coefficients exceed 92% in Nilgiris. Cease non-essential high-elevation travel.',
    alertType: 'danger',
  },
  Coastal: {
    healthScore: 67,
    healthDesc: 'Moderate marine aerosol dispersals & shoreline emissions.',
    stabilityScore: 74,
    stabilityDesc: 'Elevated wave heights modifying local coastal breezes.',
    trendMoM: '-1.5% MoM',
    isTrendPositive: false,
    alertTitle: 'Significant Wave Height Inundation Alert',
    alertDesc: 'Bay of Bengal sensor floats capture 2.5m wave swell vectors moving NE off Nagapattinam and Chennai ports.',
    alertType: 'warning',
  },
};

export const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({ selectedRegion }) => {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  const [pdfState, setPdfState] = useState<'idle' | 'sensors' | 'svg' | 'signing' | 'saved'>('idle');

  const stats = REGION_STATS_MAP[selectedRegion] || REGION_STATS_MAP.All;

  const handleGeneratePDF = () => {
    setPdfState('sensors');
    
    setTimeout(() => {
      setPdfState('svg');
    }, 800);

    setTimeout(() => {
      setPdfState('signing');
    }, 1600);

    setTimeout(() => {
      setPdfState('saved');
    }, 2400);

    setTimeout(() => {
      setPdfState('idle');
    }, 6000);
  };

  const getButtonLabel = () => {
    switch (pdfState) {
      case 'sensors':
        return 'Querying 1,420 regional sensor nodes...';
      case 'svg':
        return 'Generating SVG vector trend metrics...';
      case 'signing':
        return 'cryptographic certification sync...';
      case 'saved':
        return 'PDF compiled: /documents/climate_report.pdf';
      case 'idle':
      default:
        return 'Generate Scientific PDF Report';
    }
  };

  const isWorking = pdfState !== 'idle' && pdfState !== 'saved';

  return (
    <View style={styles.container}>
      <View style={[styles.kpiRow, isTablet && styles.kpiRowTablet]}>
        
        {/* KPI 1: Env Health Score */}
        <GlassCard style={[styles.kpiCard, isTablet && styles.kpiCardTablet]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(34, 197, 94, 0.1)' }]}>
              <ShieldCheck size={20} color={COLORS.success} />
            </View>
            <Text 
              style={[
                styles.trendPercent, 
                !stats.isTrendPositive && { color: COLORS.danger }
              ]} 
              numberOfLines={0}
            >
              {stats.trendMoM}
            </Text>
          </View>
          <Text style={styles.kpiLabel} numberOfLines={0}>Env Health Score</Text>
          <View style={styles.valueRow}>
            <AnimatedNumber value={stats.healthScore} style={styles.kpiValue} />
            <Text style={styles.kpiMax} numberOfLines={0}>/100</Text>
          </View>
          <Text style={styles.kpiDesc} numberOfLines={0}>
            {stats.healthDesc}
          </Text>
        </GlassCard>

        {/* KPI 2: Climate Stability Index */}
        <GlassCard style={[styles.kpiCard, isTablet && styles.kpiCardTablet]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(37, 99, 235, 0.1)' }]}>
              <Activity size={20} color={COLORS.primary} />
            </View>
            <Text 
              style={[
                styles.trendPercent, 
                { color: stats.healthScore > 70 ? COLORS.success : COLORS.danger }
              ]} 
              numberOfLines={0}
            >
              {stats.healthScore > 70 ? 'STABLE' : 'STRESSED'}
            </Text>
          </View>
          <Text style={styles.kpiLabel} numberOfLines={0}>Climate Stability</Text>
          <View style={styles.valueRow}>
            <AnimatedNumber value={stats.stabilityScore} style={styles.kpiValue} />
            <Text style={styles.kpiMax} numberOfLines={0}>/100</Text>
          </View>
          <Text style={styles.kpiDesc} numberOfLines={0}>
            {stats.stabilityDesc}
          </Text>
        </GlassCard>

      </View>

      {/* Warning Alert Banner */}
      <GlassCard 
        style={[
          styles.alertBanner,
          stats.alertType === 'danger' && { backgroundColor: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.15)' }
        ]}
      >
        <AlertTriangle 
          size={18} 
          color={stats.alertType === 'danger' ? COLORS.danger : COLORS.warning} 
          style={styles.bannerIcon} 
        />
        <View style={styles.bannerTextCol}>
          <Text 
            style={[
              styles.bannerTitle,
              stats.alertType === 'danger' && { color: COLORS.danger }
            ]} 
            numberOfLines={0}
          >
            {stats.alertTitle}
          </Text>
          <Text style={styles.bannerDesc} numberOfLines={0}>
            {stats.alertDesc}
          </Text>
        </View>
      </GlassCard>

      {/* PDF Compiled Success Alert */}
      {pdfState === 'saved' && (
        <GlassCard style={styles.successBanner}>
          <CheckCircle size={18} color={COLORS.success} style={styles.bannerIcon} />
          <View style={styles.bannerTextCol}>
            <Text style={[styles.bannerTitle, { color: COLORS.success }]} numberOfLines={0}>
              Scientific Digest Ready
            </Text>
            <Text style={styles.bannerDesc} numberOfLines={0}>
              14 pages of regional meteorological telemetry and baseline comparisons successfully written to local disk.
            </Text>
          </View>
        </GlassCard>
      )}

      {/* Download Reports Button */}
      <View style={styles.actionRow}>
        <PrimaryButton
          label={getButtonLabel()}
          icon={pdfState === 'saved' ? <CheckCircle size={18} color="#FFFFFF" /> : <Download size={18} color="#FFFFFF" />}
          onPress={handleGeneratePDF}
          style={[
            styles.downloadBtn, 
            isWorking && { opacity: 0.7 }, 
            pdfState === 'saved' && { backgroundColor: COLORS.success }
          ]}
          disabled={isWorking}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.sectionToSection,
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.cardToCard,
    marginBottom: SPACING.md,
  },
  kpiRowTablet: {
    gap: SPACING.lg,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  kpiCardTablet: {
    padding: SPACING.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendPercent: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.success,
  },
  kpiLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 4,
  },
  kpiValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
  },
  kpiMax: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  kpiDesc: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    lineHeight: 12,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.05)',
    borderColor: 'rgba(245, 158, 11, 0.18)',
    borderWidth: 1,
    padding: SPACING.md,
    borderRadius: SPACING.borderRadiusMd,
    marginBottom: SPACING.lg,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    borderColor: 'rgba(34, 197, 94, 0.18)',
    borderWidth: 1,
    padding: SPACING.md,
    borderRadius: SPACING.borderRadiusMd,
    marginBottom: SPACING.lg,
  },
  bannerIcon: {
    marginRight: SPACING.md,
    marginTop: 2,
  },
  bannerTextCol: {
    flex: 1,
  },
  bannerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.warning,
  },
  bannerDesc: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    lineHeight: 13,
    marginTop: 2,
  },
  actionRow: {
    alignItems: 'center',
  },
  downloadBtn: {
    width: '100%',
  },
});
