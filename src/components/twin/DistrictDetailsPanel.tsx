import React from 'react';
import { StyleSheet, View, Text, ScrollView, useWindowDimensions } from 'react-native';
import { 
  Thermometer, 
  Droplet, 
  Wind, 
  Eye, 
  Compass, 
  Sun,
  Cpu,
  Info,
  ShieldAlert,
  Zap,
  TrendingUp
} from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { StatusBadge } from '../common/StatusBadge';
import { DistrictClimateData } from '../../mock/climateMock';
import { TimeHorizon } from './TimelineScrubber';
import { RecommendationCard, RecommendationPriority } from '../common/RecommendationCard';
import { ChecklistCard } from '../common/ChecklistCard';
import { MarineCard } from '../common/MarineCard';

interface DistrictDetailsPanelProps {
  district: DistrictClimateData;
  timeHorizon: TimeHorizon;
  simulationYear: 2030 | 2040 | 2050;
}

export const DistrictDetailsPanel: React.FC<DistrictDetailsPanelProps> = ({
  district,
  timeHorizon,
  simulationYear,
}) => {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  // 1. Calculate values based on time horizon & simulation years
  let temp = district.temperature;
  let feelsLike = district.feelsLike;
  let humidity = district.humidity;
  let rainfall = district.rainfall;
  let aqi = district.aqi;
  let uvIndex = district.uvIndex;
  let visibility = district.visibility;
  let healthScore = district.environmentalHealthScore;
  
  // Calculate dynamic Climate Risk Index
  let climateRiskIndex = district.region === 'Coastal' ? 64 : 45;
  let predictionConfidence = 96;

  // Scale variables based on selected horizon
  if (timeHorizon === 'past24h') {
    temp -= 1.2;
    feelsLike -= 1.0;
    humidity -= 3;
    rainfall = Math.max(rainfall - 2.5, 0);
    aqi = Math.max(aqi - 8, 15);
    healthScore = Math.min(healthScore + 3, 100);
    climateRiskIndex = Math.max(climateRiskIndex - 4, 10);
  } else if (timeHorizon === 'next7d') {
    temp += 0.8;
    feelsLike += 1.2;
    humidity += 4;
    rainfall = rainfall * 1.08;
    aqi = aqi * 1.1;
    healthScore = Math.max(healthScore - 2, 10);
    climateRiskIndex = Math.min(climateRiskIndex + 3, 100);
    predictionConfidence = 91;
  } else if (timeHorizon === 'simulation') {
    // Scaling based on Year
    if (simulationYear === 2030) {
      temp += 1.2;
      feelsLike += 2.0;
      humidity += 3;
      rainfall = rainfall * 1.1;
      aqi = aqi * 1.15;
      healthScore = Math.max(healthScore - 6, 10);
      climateRiskIndex = Math.min(climateRiskIndex + 12, 100);
      predictionConfidence = 92;
    } else if (simulationYear === 2040) {
      temp += 2.0;
      feelsLike += 3.5;
      humidity += 6;
      rainfall = rainfall * 1.2;
      aqi = aqi * 1.3;
      healthScore = Math.max(healthScore - 12, 10);
      climateRiskIndex = Math.min(climateRiskIndex + 22, 100);
      predictionConfidence = 85;
    } else if (simulationYear === 2050) {
      temp += 3.2;
      feelsLike += 5.2;
      humidity += 10;
      rainfall = rainfall * 1.35;
      aqi = aqi * 1.5;
      healthScore = Math.max(healthScore - 20, 10);
      climateRiskIndex = Math.min(climateRiskIndex + 35, 100);
      predictionConfidence = 78;
    }
  }

  // Adjust rating badge label based on environmental score
  const getRatingLabel = (score: number) => {
    if (score > 80) return 'Optimal';
    if (score > 65) return 'Stable';
    if (score > 45) return 'Stressed';
    return 'Critical';
  };

  const getRatingBadgeType = (rating: string) => {
    switch (rating) {
      case 'Optimal':
        return 'success';
      case 'Stable':
        return 'info';
      case 'Stressed':
        return 'warning';
      case 'Critical':
      default:
        return 'danger';
    }
  };

  const currentRating = getRatingLabel(healthScore);

  // Generate dynamic AI Insights based on year/horizon
  const getAIInsights = () => {
    if (timeHorizon === 'past24h') {
      return {
        summary: `Baseline loops indicate a normal diurnal flow in ${district.name}. Atmospheric parameters remained within safe limits.`,
        assessment: 'Minimal vulnerability detected. Telemetry matching 10-year historical means.',
        actions: 'Continue standard routine observations. No alert adjustments required.',
      };
    }
    if (timeHorizon === 'next7d') {
      return {
        summary: `Precipitation risk coefficients show a ${Math.round(rainfall > 10 ? 85 : 45)}% increase over next 7 days in ${district.name}.`,
        assessment: `Slightly elevated environmental stress. Wet canopy index climbing.`,
        actions: 'Pre-check storm drainage channels and alert local emergency coordinates.',
      };
    }
    if (timeHorizon === 'simulation') {
      return {
        summary: `By the year ${simulationYear}, global emission pathways project a +${(temp - district.temperature).toFixed(1)}°C anomaly in ${district.name}.`,
        assessment: `Severe climate strain. Evapotranspiration is projected to deplete soil moisture by ${simulationYear === 2050 ? 32 : 18}%.`,
        actions: `Reinforce sea walls (if coastal), upgrade crop irrigation efficiency, and declare dry-well mitigation reserves.`,
      };
    }
    // Now (Default)
    return {
      summary: `Real-time sensor arrays report stable operations in ${district.name}. Active air currents dispersing thermal buildup.`,
      assessment: `Environmental indices are ${currentRating.toUpperCase()}. Risk footprint remains nominal.`,
      actions: 'Ensure high-fidelity GPS node sync is maintained across telemetry links.',
    };
  };

  const aiInsights = getAIInsights();
  const isCoastal = district.region === 'Coastal';

  // Generate Smart Advisory Cards based on District telemetry
  const getSmartAdvisories = () => {
    const advisories = [];
    
    if (rainfall > 8) {
      advisories.push({
        title: 'Rain Expected',
        description: `Heavy precipitation of ${rainfall.toFixed(1)}mm expected. Secure stormwater paths.`,
        type: 'rain' as const,
        priority: 'High' as const,
      });
      advisories.push({
        title: 'Delay Irrigation',
        description: 'Sufficient moisture inflow predicted. Halt irrigation to preserve soil aeration.',
        type: 'irrigation' as const,
        priority: 'Moderate' as const,
      });
    } else if (district.soilMoisture < 35) {
      advisories.push({
        title: 'Irrigation Action Required',
        description: `Soil moisture drops to ${district.soilMoisture}%. Drip irrigation advised for local crops.`,
        type: 'irrigation' as const,
        priority: 'Moderate' as const,
      });
    }

    if (temp > 35) {
      advisories.push({
        title: 'Avoid Outdoor Work',
        description: `Extreme heat advisory (${temp.toFixed(1)}°C). Limit labor between 11:00 AM and 04:00 PM.`,
        type: 'work' as const,
        priority: 'Severe' as const,
      });
    }

    if (district.windSpeed > 22) {
      advisories.push({
        title: 'High Winds Warning',
        description: `Wind gusts up to ${district.windSpeed} km/h. Secure loose outdoor panels or antennas.`,
        type: 'wind' as const,
        priority: 'Moderate' as const,
      });
    }

    if (isCoastal) {
      const waveHt = district.marineIntelligence?.waveHeight || 1.0;
      if (waveHt > 1.8) {
        advisories.push({
          title: 'Unsuitable Fishing Window',
          description: `Dangerous ocean swell heights of ${waveHt.toFixed(1)}m. Secure vessels inland.`,
          type: 'fishing' as const,
          priority: 'Severe' as const,
        });
      } else {
        advisories.push({
          title: 'Suitable Fishing Window',
          description: 'Stable wave contours below 1.5m. Safe navigation clearance in effect.',
          type: 'fishing' as const,
          priority: 'Low' as const,
        });
      }
    }

    // Default fallback advisory if list is empty
    if (advisories.length === 0) {
      advisories.push({
        title: 'Standard Monitoring',
        description: 'Environmental parameters matching stable baselines. Maintain routine telemetry checks.',
        type: 'general' as const,
        priority: 'Low' as const,
      });
    }

    return advisories;
  };

  // Generate Climate Readiness checklists based on risks
  const getReadinessChecklists = () => {
    const checklists = [];

    const heavyRainRisk = district.disasterRisks.heavyRain.risk;
    const floodRisk = district.disasterRisks.flood.risk;
    const heatwaveRisk = district.disasterRisks.heatwave.risk;
    const cycloneRisk = district.disasterRisks.cyclone.risk;

    if (heavyRainRisk > 30 || floodRisk > 30 || rainfall > 10) {
      checklists.push({
        event: 'Heavy Rain',
        items: ['Prepare storm drainage channels', 'Avoid flooded road paths', 'Store emergency drinking water'],
      });
    }
    if (cycloneRisk > 30 || (isCoastal && district.marineIntelligence && district.marineIntelligence.waveHeight > 2.0)) {
      checklists.push({
        event: 'Cyclone',
        items: ['Assemble emergency medical kit', 'Charge backup power sources', 'Follow localized evacuation route'],
      });
    }
    if (heatwaveRisk > 30 || temp > 35) {
      checklists.push({
        event: 'Heatwave',
        items: ['Maintain continuous hydration', 'Avoid outdoor noon exposure', 'Monitor livestock heat stress'],
      });
    }

    // Ensure we show at least one checklist card
    if (checklists.length === 0) {
      checklists.push({
        event: 'General Hazard',
        items: ['Sync telemetry GPS links', 'Verify municipal response channels', 'Track Doppler satellite updates'],
      });
    }

    return checklists;
  };

  const smartAdvisories = getSmartAdvisories();
  const readinessChecklists = getReadinessChecklists();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Main Telemetry Dashboard */}
      <GlassCard style={styles.mainCard}>
        {/* Panel Header */}
        <View style={styles.header}>
          <View style={styles.titleColumn}>
            <Text style={styles.titleText} numberOfLines={0}>
              {district.name} Telemetry
            </Text>
            <Text style={styles.subtitleText} numberOfLines={0}>
              Sensory readout ({district.region} District, Tamil Nadu)
            </Text>
          </View>
          <StatusBadge 
            type={getRatingBadgeType(currentRating)} 
            label={currentRating} 
          />
        </View>

        {/* Climate Diagnostics Grid */}
        <Text style={styles.sectionTitle} numberOfLines={0}>ATMOSPHERIC DIAGNOSTICS</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.item}>
            <Thermometer size={15} color={COLORS.primary} />
            <View style={styles.textWrapper}>
              <Text style={styles.label} numberOfLines={0}>Temperature</Text>
              <View style={styles.valueRow}>
                <AnimatedNumber value={temp} style={styles.value} suffix="°C" />
                <Text style={styles.subtext} numberOfLines={0}>Feels: {feelsLike.toFixed(0)}°</Text>
              </View>
            </View>
          </View>

          <View style={styles.item}>
            <Droplet size={15} color={COLORS.secondary} />
            <View style={styles.textWrapper}>
              <Text style={styles.label} numberOfLines={0}>Humidity</Text>
              <View style={styles.valueRow}>
                <AnimatedNumber value={humidity} style={styles.value} suffix="%" />
                <Text style={styles.subtext} numberOfLines={0}>Saturated</Text>
              </View>
            </View>
          </View>

          <View style={styles.item}>
            <Droplet size={15} color={COLORS.primary} />
            <View style={styles.textWrapper}>
              <Text style={styles.label} numberOfLines={0}>Rainfall</Text>
              <View style={styles.valueRow}>
                <AnimatedNumber value={rainfall} style={styles.value} suffix=" mm" decimals={1} />
                <Text style={styles.subtext} numberOfLines={0}>Precipitation</Text>
              </View>
            </View>
          </View>

          <View style={styles.item}>
            <Wind size={15} color={COLORS.accent} />
            <View style={styles.textWrapper}>
              <Text style={styles.label} numberOfLines={0}>Wind Flow</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value} numberOfLines={0}>{district.windSpeed} km/h</Text>
                <Text style={styles.subtext} numberOfLines={0}>Vector: {district.windDirection}</Text>
              </View>
            </View>
          </View>

          <View style={styles.item}>
            <Compass size={15} color={COLORS.textSecondary} />
            <View style={styles.textWrapper}>
              <Text style={styles.label} numberOfLines={0}>Pressure</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value} numberOfLines={0}>{district.pressure} hPa</Text>
                <Text style={styles.subtext} numberOfLines={0}>Barometric</Text>
              </View>
            </View>
          </View>

          <View style={styles.item}>
            <Eye size={15} color={COLORS.success} />
            <View style={styles.textWrapper}>
              <Text style={styles.label} numberOfLines={0}>Visibility</Text>
              <View style={styles.valueRow}>
                <Text style={styles.value} numberOfLines={0}>{visibility} km</Text>
                <Text style={styles.subtext} numberOfLines={0}>Visual clearance</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Environmental Indexing */}
        <Text style={styles.sectionTitle} numberOfLines={0}>ENVIRONMENTAL HEALTH INDICES</Text>
        <View style={styles.healthRow}>
          <View style={styles.scoreGauge}>
            <Text style={styles.gaugeLabel} numberOfLines={0}>ENV HEALTH SCORE</Text>
            <View style={styles.gaugeValueRow}>
              <AnimatedNumber value={healthScore} style={styles.gaugeVal} />
              <Text style={styles.gaugeTotal} numberOfLines={0}>/100</Text>
            </View>
          </View>
          
          <View style={styles.healthIndexItems}>
            <View style={styles.miniItem}>
              <TrendingUp size={14} color={COLORS.primary} />
              <View style={styles.miniText}>
                <Text style={styles.miniLabel} numberOfLines={0}>Climate Risk Index</Text>
                <Text style={styles.miniValue} numberOfLines={0}>{climateRiskIndex}% Risk</Text>
              </View>
            </View>
            <View style={styles.miniItem}>
              <Sun size={14} color={COLORS.danger} />
              <View style={styles.miniText}>
                <Text style={styles.miniLabel} numberOfLines={0}>UV Radiation</Text>
                <Text style={styles.miniValue} numberOfLines={0}>{uvIndex} UVI</Text>
              </View>
            </View>
          </View>
        </View>
      </GlassCard>

      {/* 2. Premium Marine Intelligence (Coastal Districts Only) */}
      {isCoastal && district.marineIntelligence && (
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle} numberOfLines={0}>MARINE INTELLIGENCE</Text>
          <MarineCard 
            districtName={district.name} 
            marineData={{
              ...district.marineIntelligence,
              stormSurgeRisk: district.marineIntelligence.stormSurgeRisk as any
            }} 
          />
        </View>
      )}

      {/* 3. District Smart Advisory Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle} numberOfLines={0}>DISTRICT SMART ADVISORY</Text>
        {smartAdvisories.map((adv, idx) => (
          <RecommendationCard
            key={`adv-${idx}`}
            title={adv.title}
            description={adv.description}
            type={adv.type}
            priority={adv.priority}
          />
        ))}
      </View>

      {/* 4. Climate Readiness Checklist Cards */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle} numberOfLines={0}>CLIMATE READINESS PLAN</Text>
        {readinessChecklists.map((chk, idx) => (
          <ChecklistCard
            key={`chk-${idx}`}
            event={chk.event}
            items={chk.items}
          />
        ))}
      </View>

      {/* 5. AI Climate Insights Card */}
      <GlassCard style={styles.aiInsightsCard}>
        <View style={styles.cardHeader}>
          <Cpu size={16} color={COLORS.primary} />
          <Text style={styles.cardHeaderTitle} numberOfLines={0}>
            AI MODEL EXPLANATORY REASONINGS
          </Text>
        </View>

        <View style={styles.insightItem}>
          <View style={styles.insightLabelRow}>
            <Info size={12} color={COLORS.textSecondary} />
            <Text style={styles.insightLabel} numberOfLines={0}>SIMULATION SUMMARY</Text>
          </View>
          <Text style={styles.insightText} numberOfLines={0}>
            {aiInsights.summary}
          </Text>
        </View>

        <View style={styles.insightItem}>
          <View style={styles.insightLabelRow}>
            <ShieldAlert size={12} color={COLORS.warning} />
            <Text style={styles.insightLabel} numberOfLines={0}>RISK ASSESSMENT</Text>
          </View>
          <Text style={styles.insightText} numberOfLines={0}>
            {aiInsights.assessment}
          </Text>
        </View>

        <View style={styles.insightItem}>
          <View style={styles.insightLabelRow}>
            <Zap size={12} color={COLORS.success} />
            <Text style={styles.insightLabel} numberOfLines={0}>RECOMMENDED ACTIONS</Text>
          </View>
          <Text style={styles.insightText} numberOfLines={0}>
            {aiInsights.actions}
          </Text>
        </View>

        <View style={styles.confidenceRow}>
          <Text style={styles.confidenceLabel} numberOfLines={0}>AI Prediction Confidence:</Text>
          <Text style={styles.confidenceVal} numberOfLines={0}>{predictionConfidence}% Conf</Text>
        </View>
      </GlassCard>

      {/* Spacing for Tab Capsule scroll safety */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: 'transparent',
    borderWidth: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: SPACING.sm,
  },
  titleColumn: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  titleText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 18,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: SPACING.sm,
    marginTop: SPACING.xs,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  item: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: SPACING.borderRadiusMd,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  textWrapper: {
    flex: 1,
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  valueRow: {
    marginTop: 2,
  },
  value: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  subtext: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.03)',
    borderColor: 'rgba(37, 99, 235, 0.08)',
    borderWidth: 1,
    borderRadius: SPACING.borderRadiusMd,
    padding: SPACING.sm,
  },
  scoreGauge: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: SPACING.md,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    width: '40%',
  },
  gaugeLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  gaugeValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 2,
  },
  gaugeVal: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 20,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.primary,
  },
  gaugeTotal: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  healthIndexItems: {
    flex: 1,
    paddingLeft: SPACING.md,
    gap: 6,
  },
  miniItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  miniText: {
    flex: 1,
  },
  miniLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  miniValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  sectionContainer: {
    marginBottom: SPACING.md,
  },
  aiInsightsCard: {
    backgroundColor: 'rgba(37, 99, 235, 0.02)',
    borderColor: 'rgba(37, 99, 235, 0.08)',
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderRadius: SPACING.borderRadiusLg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  cardHeaderTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
    flex: 1,
  },
  insightItem: {
    marginBottom: SPACING.sm,
  },
  insightLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  insightLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textSecondary,
    letterSpacing: 0.5,
  },
  insightText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
    lineHeight: 14,
  },
  confidenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: SPACING.sm,
    marginTop: SPACING.xs,
  },
  confidenceLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  confidenceVal: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
});
