import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { AlertTriangle, ShieldAlert, Sparkles, Navigation, Clock } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { DistrictClimateData } from '../../mock/climateMock';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { TimeHorizon } from './TimelineScrubber';

interface DisasterRiskPanelProps {
  district: DistrictClimateData;
  timeHorizon: TimeHorizon;
  simulationYear: 2030 | 2040 | 2050;
}

interface RiskItem {
  id: string;
  name: string;
  key: keyof DistrictClimateData['disasterRisks'];
  expectedTime: string;
  action: string;
}

const RISKS_SPEC: RiskItem[] = [
  { id: 'fld', name: 'Flash Flood', key: 'flood', expectedTime: '12 Hours', action: 'Evacuate low basins and drainage channels.' },
  { id: 'cyc', name: 'Cyclone Landfall', key: 'cyclone', expectedTime: '36 Hours', action: 'Move to cyclone shelters; secure wind panes.' },
  { id: 'htw', name: 'Thermal Heatwave', key: 'heatwave', expectedTime: '24 Hours', action: 'Limit outdoor labor; set up hydration nodes.' },
  { id: 'hrn', name: 'Heavy Rainfall', key: 'heavyRain', expectedTime: '6 Hours', action: 'Alert municipal pumping units; check blockages.' },
  { id: 'lsl', name: 'Saturated Landslide', key: 'landslide', expectedTime: '8 Hours', action: 'Cease travel on ghat roads; secure slope barriers.' },
  { id: 'drg', name: 'Agricultural Drought', key: 'drought', expectedTime: '15 Days', action: 'Implement alternate day agricultural irrigation.' },
  { id: 'wfr', name: 'Wildfire hazard', key: 'wildfire', expectedTime: '3 Days', action: 'Create dry fire breaks; restrict forest access.' },
  { id: 'ssg', name: 'Storm Surge', key: 'stormSurge', expectedTime: '18 Hours', action: 'Cease coastal marine activities; move craft inland.' },
  { id: 'cfl', name: 'Coastal Flooding', key: 'coastalFlood', expectedTime: '12 Hours', action: 'Evacuate beach-front corridors; check harbor buffers.' },
];

export const DisasterRiskPanel: React.FC<DisasterRiskPanelProps> = ({
  district,
  timeHorizon,
  simulationYear,
}) => {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const [activeTab, setActiveTab] = useState<'profile' | 'forecast'>('profile');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Extreme':
        return COLORS.danger;
      case 'High':
        return '#EA580C'; // Dark orange
      case 'Moderate':
        return COLORS.warning;
      case 'Low':
      default:
        return COLORS.success;
    }
  };

  // Adjust risks based on time horizon & simulation years
  const getAdjustedRiskVal = (baseRisk: number) => {
    if (timeHorizon === 'past24h') return Math.max(Math.round(baseRisk * 0.7), 5);
    if (timeHorizon === 'next7d') return Math.min(Math.round(baseRisk * 1.1), 100);
    if (timeHorizon === 'simulation') {
      if (simulationYear === 2030) return Math.min(Math.round(baseRisk * 1.15), 100);
      if (simulationYear === 2040) return Math.min(Math.round(baseRisk * 1.3), 100);
      if (simulationYear === 2050) return Math.min(Math.round(baseRisk * 1.45), 100);
    }
    return baseRisk;
  };

  const getSeverity = (risk: number) => {
    if (risk > 75) return 'Extreme';
    if (risk > 45) return 'High';
    if (risk > 20) return 'Moderate';
    return 'Low';
  };

  const isCoastal = district.region === 'Coastal';

  // Filter out storm surge and coastal flood for non-coastal districts
  const visibleRisks = RISKS_SPEC.filter((spec) => {
    if (spec.key === 'stormSurge' || spec.key === 'coastalFlood') {
      return isCoastal;
    }
    return true;
  });

  return (
    <View style={styles.container}>
      <GlassCard style={styles.card}>
        {/* Tab Toggle */}
        <View style={styles.tabContainer}>
          <Pressable 
            onPress={() => setActiveTab('profile')} 
            style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]} numberOfLines={0}>
              Active Risk Indexes
            </Text>
          </Pressable>
          
          <Pressable 
            onPress={() => setActiveTab('forecast')} 
            style={[styles.tab, activeTab === 'forecast' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'forecast' && styles.activeTabText]} numberOfLines={0}>
              Multi-Hazard Predictions
            </Text>
          </Pressable>
        </View>

        {activeTab === 'profile' ? (
          /* Profile Mode */
          <View style={styles.content}>
            <Text style={styles.panelTitle} numberOfLines={0}>
              Active Hazard Probabilities
            </Text>
            
            <View style={styles.riskList}>
              {visibleRisks.map((spec) => {
                const riskData = district.disasterRisks[spec.key];
                if (!riskData) return null; // Safe fallback for missing fields

                const riskVal = getAdjustedRiskVal(riskData.risk);
                const currentSev = getSeverity(riskVal);
                const sevColor = getSeverityColor(currentSev);
                
                return (
                  <View key={spec.id} style={styles.riskRow}>
                    <View style={styles.rowLabel}>
                      <Text style={styles.riskName} numberOfLines={0}>
                        {spec.name}
                      </Text>
                      <View style={styles.badgeRow}>
                        <Text style={[styles.sevText, { color: sevColor }]} numberOfLines={0}>
                          {currentSev.toUpperCase()}
                        </Text>
                        <Text style={styles.dotSeparator}>•</Text>
                        <Text style={styles.confText} numberOfLines={0}>
                          {riskData.confidence}% Conf
                        </Text>
                      </View>
                    </View>

                    <View style={styles.barColumn}>
                      <AnimatedNumber value={riskVal} style={[styles.riskPercent, { color: sevColor }]} suffix="%" />
                      <View style={styles.track}>
                        <View style={[styles.bar, { width: `${riskVal}%`, backgroundColor: sevColor }]} />
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          /* Forecast predictions Mode */
          <View style={styles.content}>
            <Text style={styles.panelTitle} numberOfLines={0}>
              Multi-Disaster Threat Matrices
            </Text>
            
            <ScrollView 
              horizontal={isTablet} 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={isTablet ? styles.scrollContentTablet : styles.scrollContent}
            >
              {visibleRisks.map((spec) => {
                const riskData = district.disasterRisks[spec.key];
                if (!riskData) return null;

                const riskVal = getAdjustedRiskVal(riskData.risk);
                
                // Only show forecast cards for non-zero risk factors
                if (riskVal < 10) return null;
                
                const currentSev = getSeverity(riskVal);
                const sevColor = getSeverityColor(currentSev);

                return (
                  <View key={`forecast-${spec.id}`} style={[styles.forecastCard, isTablet && styles.forecastCardTablet]}>
                    <View style={styles.forecastHeader}>
                      <View style={styles.forecastTitleRow}>
                        <AlertTriangle size={16} color={sevColor} style={styles.alertIcon} />
                        <Text style={styles.forecastName} numberOfLines={0}>
                          {spec.name}
                        </Text>
                      </View>
                      <Text style={[styles.forecastSev, { color: sevColor, borderColor: sevColor }]} numberOfLines={0}>
                        {riskVal}% RISK
                      </Text>
                    </View>

                    <View style={styles.timeExpectedRow}>
                      <Clock size={12} color={COLORS.textSecondary} />
                      <Text style={styles.timeExpectedText} numberOfLines={0}>
                        Anticipated: <Text style={styles.boldText}>{spec.expectedTime}</Text>
                      </Text>
                    </View>

                    <Text style={styles.forecastActionLabel} numberOfLines={0}>AI CLIMATE ADVISORY DIRECTIVE:</Text>
                    <View style={styles.actionBody}>
                      <Navigation size={12} color={COLORS.textSecondary} style={styles.bullet} />
                      <Text style={styles.forecastActionText} numberOfLines={0}>
                        {spec.action}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        )}
      </GlassCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: SPACING.sectionToSection,
    backgroundColor: '#FFFFFF',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.md,
    borderWidth: 0,
    shadowColor: 'transparent',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: SPACING.borderRadiusMd,
    padding: 3,
    marginBottom: SPACING.md,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.primary,
  },
  content: {},
  panelTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  riskList: {
    gap: SPACING.md,
  },
  riskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowLabel: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  riskName: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  sevText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
  },
  dotSeparator: {
    marginHorizontal: 6,
    color: COLORS.border,
    fontSize: 8,
  },
  confText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  barColumn: {
    width: 120,
    alignItems: 'flex-end',
  },
  riskPercent: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    marginBottom: 4,
  },
  track: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    position: 'relative',
  },
  bar: {
    position: 'absolute',
    height: '100%',
    borderRadius: 2,
  },
  scrollContent: {
    gap: SPACING.cardToCard,
  },
  scrollContentTablet: {
    flexDirection: 'row',
    gap: SPACING.cardToCard,
  },
  forecastCard: {
    backgroundColor: COLORS.background,
    borderRadius: SPACING.borderRadiusMd,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  forecastCardTablet: {
    width: 260,
    marginBottom: 0,
  },
  forecastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  forecastTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  alertIcon: {
    marginTop: -1,
  },
  forecastName: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  forecastSev: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  timeExpectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: SPACING.sm,
  },
  timeExpectedText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
  boldText: {
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  forecastActionLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  actionBody: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  bullet: {
    marginTop: 2,
    transform: [{ rotate: '90deg' }],
  },
  forecastActionText: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    lineHeight: 12,
  },
});
