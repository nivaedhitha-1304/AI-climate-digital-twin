import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { ShieldAlert } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { DistrictClimateData } from '../../mock/climateMock';
import { TimeHorizon } from './TimelineScrubber';
import { TrafficLightBadge, RiskSeverity } from '../common/TrafficLightBadge';
import { RiskCard, DriverFactor } from '../common/RiskCard';

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
  drivers: DriverFactor[];
}

const RISKS_SPEC: RiskItem[] = [
  { 
    id: 'fld', 
    name: 'Flash Flood', 
    key: 'flood', 
    expectedTime: '12 Hours', 
    action: 'Evacuate low basins and drainage channels.',
    drivers: [
      { name: 'Torrential Precipitation Rate', weight: 'High', icon: '🌧️' },
      { name: 'Catchment Soil Saturation', weight: 'High', icon: '💧' },
      { name: 'River Basin Runoff Index', weight: 'Medium', icon: '🌊' },
      { name: 'Urban Drain Blockage Code', weight: 'Low', icon: '🚧' }
    ]
  },
  { 
    id: 'cyc', 
    name: 'Cyclone Landfall', 
    key: 'cyclone', 
    expectedTime: '36 Hours', 
    action: 'Move to cyclone shelters; secure wind panes.',
    drivers: [
      { name: 'Sea Surface Warming Anomaly', weight: 'High', icon: '🌡️' },
      { name: 'Deep Atmospheric Low Pressure', weight: 'High', icon: '🌀' },
      { name: 'Tropospheric Wind Shear Velocity', weight: 'Medium', icon: '💨' }
    ]
  },
  { 
    id: 'htw', 
    name: 'Thermal Heatwave', 
    key: 'heatwave', 
    expectedTime: '24 Hours', 
    action: 'Limit outdoor labor; set up hydration nodes.',
    drivers: [
      { name: 'Extreme Solar Irradiance Peak', weight: 'High', icon: '☀️' },
      { name: 'Anticyclonic Air Mass Blockage', weight: 'Medium', icon: '🥵' },
      { name: 'Critical Canopy Evapotranspiration', weight: 'Low', icon: '🌱' }
    ]
  },
  { 
    id: 'hrn', 
    name: 'Heavy Rainfall', 
    key: 'heavyRain', 
    expectedTime: '6 Hours', 
    action: 'Alert municipal pumping units; check blockages.',
    drivers: [
      { name: 'Convective Cloud Vapor Density', weight: 'High', icon: '☁️' },
      { name: 'Monsoonal Wind Ingress Vector', weight: 'Medium', icon: '💨' }
    ]
  },
  { 
    id: 'lsl', 
    name: 'Saturated Landslide', 
    key: 'landslide', 
    expectedTime: '8 Hours', 
    action: 'Cease travel on ghat roads; secure slope barriers.',
    drivers: [
      { name: 'Ghat Terrain Soil Saturation', weight: 'High', icon: '⛰️' },
      { name: 'Slope Shear Gravitational Load', weight: 'Medium', icon: '📉' },
      { name: 'Runoff Erosion Coefficient', weight: 'Low', icon: '🌊' }
    ]
  },
  { 
    id: 'drg', 
    name: 'Agricultural Drought', 
    key: 'drought', 
    expectedTime: '15 Days', 
    action: 'Implement alternate day agricultural irrigation.',
    drivers: [
      { name: 'Extreme Soil Moisture Deficit', weight: 'High', icon: '🌾' },
      { name: 'Prolonged Rainfall Deficit Days', weight: 'High', icon: '☀️' },
      { name: 'Water Table Drawdown Depth', weight: 'Medium', icon: '🕳️' }
    ]
  },
  { 
    id: 'wfr', 
    name: 'Wildfire hazard', 
    key: 'wildfire', 
    expectedTime: '3 Days', 
    action: 'Create dry fire breaks; restrict forest access.',
    drivers: [
      { name: 'Dead Biomass Moisture Deficit', weight: 'High', icon: '🍂' },
      { name: 'Extreme Ambient Temperature Index', weight: 'High', icon: '🔥' },
      { name: 'High Atmospheric Wind Flow Velocity', weight: 'Medium', icon: '💨' }
    ]
  },
  { 
    id: 'ssg', 
    name: 'Storm Surge', 
    key: 'stormSurge', 
    expectedTime: '18 Hours', 
    action: 'Cease coastal marine activities; move craft inland.',
    drivers: [
      { name: 'Offshore Gale Wind Shear force', weight: 'High', icon: '💨' },
      { name: 'Astronomical High Tide Deviation', weight: 'Medium', icon: '📈' },
      { name: 'Coastal Contour Ingress Slope', weight: 'Low', icon: '🏝️' }
    ]
  },
  { 
    id: 'cfl', 
    name: 'Coastal Flooding', 
    key: 'coastalFlood', 
    expectedTime: '12 Hours', 
    action: 'Evacuate beach-front corridors; check harbour buffers.',
    drivers: [
      { name: 'Marine Wave Amplitude Index', weight: 'High', icon: '🌊' },
      { name: 'Sea Level Swell Period Deviation', weight: 'Medium', icon: '📈' },
      { name: 'Coastal Barrier Inundation Rate', weight: 'Medium', icon: '🏝️' }
    ]
  },
];

export const DisasterRiskPanel: React.FC<DisasterRiskPanelProps> = ({
  district,
  timeHorizon,
  simulationYear,
}) => {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const [activeTab, setActiveTab] = useState<'profile' | 'forecast'>('profile');

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

  const getSeverity = (risk: number): RiskSeverity => {
    if (risk > 75) return 'Severe';
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
              Traffic Light Risk Profiles
            </Text>
          </Pressable>
          
          <Pressable 
            onPress={() => setActiveTab('forecast')} 
            style={[styles.tab, activeTab === 'forecast' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'forecast' && styles.activeTabText]} numberOfLines={0}>
              Explainable AI Drivers
            </Text>
          </Pressable>
        </View>

        {activeTab === 'profile' ? (
          /* Profile Mode: Replace percentages/bars with badges */
          <View style={styles.content}>
            <Text style={styles.panelTitle} numberOfLines={0}>
              Vulnerability Risk Matrices
            </Text>
            
            <View style={styles.riskList}>
              {visibleRisks.map((spec) => {
                const riskData = district.disasterRisks[spec.key];
                if (!riskData) return null;

                const riskVal = getAdjustedRiskVal(riskData.risk);
                const currentSev = getSeverity(riskVal);
                
                return (
                  <View key={spec.id} style={styles.riskRow}>
                    <View style={styles.rowLabel}>
                      <Text style={styles.riskName} numberOfLines={0}>
                        {spec.name}
                      </Text>
                      <Text style={styles.confText} numberOfLines={0}>
                        AI Model Confidence: {riskData.confidence}%
                      </Text>
                    </View>

                    <TrafficLightBadge severity={currentSev} />
                  </View>
                );
              })}
            </View>
          </View>
        ) : (
          /* Forecast/Explainable AI Mode using RiskCard */
          <View style={styles.content}>
            <Text style={styles.panelTitle} numberOfLines={0}>
              Multi-Disaster Explainable Diagnostics
            </Text>
            
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              {visibleRisks.map((spec) => {
                const riskData = district.disasterRisks[spec.key];
                if (!riskData) return null;

                const riskVal = getAdjustedRiskVal(riskData.risk);
                
                // Only show cards for non-zero risk factors
                if (riskVal < 10) return null;
                
                const currentSev = getSeverity(riskVal);

                return (
                  <RiskCard
                    key={`risk-card-${spec.id}`}
                    riskName={spec.name}
                    riskValue={riskVal}
                    severity={currentSev}
                    confidence={riskData.confidence}
                    expectedTime={spec.expectedTime}
                    drivers={spec.drivers}
                  />
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
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
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
  confText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  scrollContent: {
    gap: SPACING.cardToCard,
  },
});
