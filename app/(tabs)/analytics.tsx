import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, StatusBar, Pressable, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  BarChart2, 
  Map, 
  Compass, 
  Waves, 
  Sprout, 
  Anchor, 
  FileText,
  TrendingUp,
  MapPin
} from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../src/theme';
import { ChartCard } from '../../src/components/common/ChartCard';
import { ChartContainer } from '../../src/components/common/ChartContainer';
import { AnalyticsCard } from '../../src/components/common/AnalyticsCard';
import { AgricultureCard } from '../../src/components/common/AgricultureCard';
import { FisheriesCard } from '../../src/components/common/FisheriesCard';
import { ClimateReportCard } from '../../src/components/common/ClimateReportCard';
import { Legend } from '../../src/components/common/Legend';
import { GlassCard } from '../../src/components/common/GlassCard';
import { ALL_38_DISTRICTS, ANALYTICS_DATA } from '../../src/mock/climateMock';

export type ClimateRegion = 'All' | 'North' | 'South' | 'West' | 'Coastal';
type DashboardTab = 'climate' | 'marine' | 'agriculture' | 'fisheries' | 'reports';

export default function AnalyticsScreen() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('climate');

  // District Comparison selection
  const [compDistrictA, setCompDistrictA] = useState(ALL_38_DISTRICTS[0]); // Chennai
  const [compDistrictB, setCompDistrictB] = useState(ALL_38_DISTRICTS[2]); // Nilgiris
  const [showCompSelector, setShowCompSelector] = useState(false);
  const [selectingTarget, setSelectingTarget] = useState<'A' | 'B'>('A');

  const handleSelectCompare = (district: typeof ALL_38_DISTRICTS[0]) => {
    if (selectingTarget === 'A') {
      setCompDistrictA(district);
    } else {
      setCompDistrictB(district);
    }
    setShowCompSelector(false);
  };

  const openCompareSelector = (target: 'A' | 'B') => {
    setSelectingTarget(target);
    setShowCompSelector(true);
  };

  const renderTabSelector = () => {
    const tabs: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
      { id: 'climate', label: 'Climate', icon: <Compass size={13} color={activeTab === 'climate' ? '#FFFFFF' : COLORS.textSecondary} /> },
      { id: 'marine', label: 'Marine', icon: <Waves size={13} color={activeTab === 'marine' ? '#FFFFFF' : COLORS.textSecondary} /> },
      { id: 'agriculture', label: 'Agriculture', icon: <Sprout size={13} color={activeTab === 'agriculture' ? '#FFFFFF' : COLORS.textSecondary} /> },
      { id: 'fisheries', label: 'Fisheries', icon: <Anchor size={13} color={activeTab === 'fisheries' ? '#FFFFFF' : COLORS.textSecondary} /> },
      { id: 'reports', label: 'Reports', icon: <FileText size={13} color={activeTab === 'reports' ? '#FFFFFF' : COLORS.textSecondary} /> },
    ];

    return (
      <View style={styles.tabSelectorContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <Pressable
                key={tab.id}
                onPress={() => {
                  setActiveTab(tab.id);
                  setShowCompSelector(false);
                }}
                style={[styles.tabChip, isActive && styles.activeTabChip]}
              >
                {tab.icon}
                <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]} numberOfLines={1}>
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  const renderClimateTab = () => {
    return (
      <View style={styles.tabContent}>
        {/* KPI Cards */}
        <View style={styles.kpiRow}>
          <AnalyticsCard
            title="ECOLOGICAL HEALTH"
            value="74.2"
            label="State Mean Score"
            change={{ value: "+2.4%", type: 'positive' }}
            details="Reflects increased vegetation cover and water reserve levels."
          />
          <AnalyticsCard
            title="THERMAL ANOMALY"
            value="+1.2°"
            label="Baseline Deviation"
            change={{ value: "+0.3°", type: 'negative' }}
            details="Average summer temperatures rose above the 10-year mean."
          />
        </View>

        {/* Charts */}
        <ChartContainer
          title="Surface Temperature Deviation (°C)"
          subtitle="Monthly telemetry comparison against historical baselines"
          legend={
            <Legend
              title="Temperature Scale"
              colors={[COLORS.accent, COLORS.secondary, COLORS.warning, COLORS.danger]}
              labels={['<25°C', '28°C', '33°C', '40°C+']}
            />
          }
        >
          <ChartCard
            title="Statewide Thermal Profiles"
            labels={ANALYTICS_DATA.tempTrends.labels}
            data={ANALYTICS_DATA.tempTrends.currentYear}
            historicalData={ANALYTICS_DATA.tempTrends.historicalAverage}
            ySuffix="°"
            type="area"
            style={{ width: '100%', borderWidth: 0, padding: 0 }}
          />
        </ChartContainer>

        <ChartContainer
          title="Precipitation Accumulation (mm)"
          subtitle="Doppler rain volume tracking index"
        >
          <ChartCard
            title="Southwest Monsoon Ingress"
            labels={ANALYTICS_DATA.rainfallTrends.labels}
            data={ANALYTICS_DATA.rainfallTrends.data}
            ySuffix=" mm"
            type="bar"
            style={{ width: '100%', borderWidth: 0, padding: 0 }}
          />
        </ChartContainer>

        {/* District Comparison Selector */}
        <View style={styles.compareContainer}>
          <Text style={styles.sectionTitle}>District Node Telemetry Comparison</Text>
          
          <View style={styles.compareSelectorRow}>
            <Pressable onPress={() => openCompareSelector('A')} style={styles.compareSelectorBtn}>
              <MapPin size={12} color={COLORS.primary} />
              <Text style={styles.compareSelectorBtnText}>{compDistrictA.name}</Text>
            </Pressable>
            
            <Text style={styles.compareVsText}>VS</Text>
            
            <Pressable onPress={() => openCompareSelector('B')} style={styles.compareSelectorBtn}>
              <MapPin size={12} color={COLORS.primary} />
              <Text style={styles.compareSelectorBtnText}>{compDistrictB.name}</Text>
            </Pressable>
          </View>

          {/* Comparer Metric list */}
          <View style={styles.compareGrid}>
            <View style={styles.compareRow}>
              <Text style={[styles.compareValText, { textAlign: 'left' }]}>{compDistrictA.temperature}°C</Text>
              <Text style={styles.compareLabelText}>Temperature</Text>
              <Text style={[styles.compareValText, { textAlign: 'right' }]}>{compDistrictB.temperature}°C</Text>
            </View>

            <View style={styles.compareRow}>
              <Text style={[styles.compareValText, { textAlign: 'left' }]}>{compDistrictA.humidity}%</Text>
              <Text style={styles.compareLabelText}>Humidity</Text>
              <Text style={[styles.compareValText, { textAlign: 'right' }]}>{compDistrictB.humidity}%</Text>
            </View>

            <View style={styles.compareRow}>
              <Text style={[styles.compareValText, { textAlign: 'left' }]}>{compDistrictA.rainfall}mm</Text>
              <Text style={styles.compareLabelText}>Rainfall</Text>
              <Text style={[styles.compareValText, { textAlign: 'right' }]}>{compDistrictB.rainfall}mm</Text>
            </View>

            <View style={styles.compareRow}>
              <Text style={[styles.compareValText, { textAlign: 'left' }]}>{compDistrictA.aqi} AQI</Text>
              <Text style={styles.compareLabelText}>AQI Index</Text>
              <Text style={[styles.compareValText, { textAlign: 'right' }]}>{compDistrictB.aqi} AQI</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderMarineTab = () => {
    return (
      <View style={styles.tabContent}>
        {/* Marine KPIs */}
        <View style={styles.kpiRow}>
          <AnalyticsCard
            title="SEA SURFACE TEMP"
            value="29.4°"
            label="Coastal Mean"
            change={{ value: "+0.8°", type: 'negative' }}
            details="Elevated maritime heat profiles increase tropical storm potential."
          />
          <AnalyticsCard
            title="WAVE INTENSITY"
            value="1.8m"
            label="Average Swell Height"
            change={{ value: "-0.2m", type: 'positive' }}
            details="Swells are within stable bounds for coastal navigation."
          />
        </View>

        {/* Charts */}
        <ChartContainer
          title="Wave Height Anomalies (m)"
          subtitle="Weekly significant swell elevations"
        >
          <ChartCard
            title="Coastal Swell Heights"
            labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
            data={[1.2, 1.4, 2.1, 2.8, 1.8, 1.3, 1.1]}
            ySuffix=" m"
            type="area"
            style={{ width: '100%', borderWidth: 0, padding: 0 }}
          />
        </ChartContainer>

        <ChartContainer
          title="Sea Surface Temperature Trends (°C)"
          subtitle="Monthly thermal sensor measurements in Bay of Bengal"
        >
          <ChartCard
            title="SST Heat Profiles"
            labels={ANALYTICS_DATA.tempTrends.labels}
            data={[27.2, 27.8, 28.5, 29.8, 31.2, 30.5, 29.4]}
            ySuffix="°"
            type="area"
            style={{ width: '100%', borderWidth: 0, padding: 0 }}
          />
        </ChartContainer>

        {/* Cyclone Risk & Storm History */}
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Coastal Cyclone & Storm Surge Log</Text>
          <View style={styles.historyRow}>
            <View style={[styles.historyBadge, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
              <Text style={[styles.historyBadgeText, { color: '#EF4444' }]}>SEVERE</Text>
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyTitle}>Tropical Depression track (Bay of Bengal)</Text>
              <Text style={styles.historyMeta}>Landfall predicted near Nagapattinam within 36 hours.</Text>
            </View>
          </View>

          <View style={styles.historyRow}>
            <View style={[styles.historyBadge, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
              <Text style={[styles.historyBadgeText, { color: '#F59E0B' }]}>MODERATE</Text>
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyTitle}>Inshore Swell Alert (Chennai Coast)</Text>
              <Text style={styles.historyMeta}>Astronomical high tide overflow expected on beach road corridors.</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderAgricultureTab = () => {
    return (
      <View style={styles.tabContent}>
        {/* Agriculture KPIs */}
        <View style={styles.kpiRow}>
          <AnalyticsCard
            title="SOIL MOISTURE"
            value="52.4%"
            label="State Crop Mean"
            change={{ value: "+5.1%", type: 'positive' }}
            details="Monsoon precipitation has satisfied initial crop saturation needs."
          />
          <AnalyticsCard
            title="DROUGHT VULNERABILITY"
            value="LOW"
            label="Risk Coefficient"
            change={{ value: "Stable", type: 'neutral' }}
            details="Groundwater levels and reservoir loads remain at sufficient tiers."
          />
        </View>

        {/* Agriculture Cards */}
        <Text style={styles.sectionTitle}>Crop Suitability & Advisories</Text>
        <AgricultureCard
          cropName="Paddy Rice (Thanjavur Bowl)"
          suitabilityScore={88}
          season="Kharif (Monsoon Cycle)"
          irrigationIndex="Furrow Basin / Wet Inundation"
          droughtRisk="Low"
          diseaseRisk="Moderate"
          aiFarmingTips={[
            "Halt nitrogen application if rain exceeds 15mm tomorrow.",
            "Drain excess ponding water from nursery basins to prevent root mold."
          ]}
        />

        <AgricultureCard
          cropName="Sugarcane (Coimbatore Zone)"
          suitabilityScore={74}
          season="Annual Crop Cycle"
          irrigationIndex="Alternate Day Furrow Drip"
          droughtRisk="Moderate"
          diseaseRisk="Low"
          aiFarmingTips={[
            "Apply potash fertilizer to mitigate high evaporative indices next week.",
            "Check soil saturation index before scheduled irrigation loops."
          ]}
        />

        <AgricultureCard
          cropName="Upland Cotton (Vellore Belt)"
          suitabilityScore={52}
          season="Rabi (Dry Cycle)"
          irrigationIndex="Strict Drip Micro-Irrigation"
          droughtRisk="High"
          diseaseRisk="Severe"
          aiFarmingTips={[
            "Limit watering to early morning hours to combat midday leaf wilts.",
            "Install insect trapping grids to offset elevated bollworm indices."
          ]}
        />
      </View>
    );
  };

  const renderFisheriesTab = () => {
    return (
      <View style={styles.tabContent}>
        {/* Fisheries KPIs */}
        <View style={styles.kpiRow}>
          <AnalyticsCard
            title="SAILING SAFETY INDEX"
            value="82/100"
            label="State Marine Hubs"
            change={{ value: "-8pts", type: 'negative' }}
            details="Storm depression causes moderate security drops in North ports."
          />
          <AnalyticsCard
            title="FISHING SUITABILITY"
            value="GOOD"
            label="Coastal Clearance"
            change={{ value: "Operational", type: 'neutral' }}
            details="Pelagic fish migrations spotted within 12nm of southern ports."
          />
        </View>

        {/* Fisheries Cards */}
        <Text style={styles.sectionTitle}>Marine Hub Operations & Fishing Safety</Text>
        
        <FisheriesCard
          harbourName="Chennai Fishing Harbour"
          suitability="Restricted"
          safeWindow="05:00 AM - 12:00 PM"
          tripRiskScore={65}
          safetyIndex="High"
          waveStatus="Rough swell wind wave mixes"
          advisoryText="Navigation warning active. Small crafts remain inland."
          aiTips={[
            "Secure hull bumpers and storm lines at Chennai docks.",
            "Track inshore wave currents closely if sailing near breakwaters."
          ]}
        />

        <FisheriesCard
          harbourName="Nagapattinam Main Hub"
          suitability="Hazardous"
          safeWindow="Sailing Suspended"
          tripRiskScore={90}
          safetyIndex="Severe"
          waveStatus="Torrential storm surge currents"
          advisoryText="Harbour closed. Cyclone ingress pathing in effect."
          aiTips={[
            "Evacuate all fishing vessels from outer harbour basins.",
            "Relocate emergency gear to concrete shelter lockers."
          ]}
        />

        <FisheriesCard
          harbourName="Thoothukudi Port"
          suitability="Excellent"
          safeWindow="04:00 AM - 07:00 PM"
          tripRiskScore={12}
          safetyIndex="Low"
          waveStatus="Stable gentle swell flows"
          advisoryText="Open. Standard sailing clearance in active effect."
          aiTips={[
            "Tuna school corridors spotted 8nm south-southeast of port.",
            "Optimal barometric sailing indices expected over next 24 hours."
          ]}
        />
      </View>
    );
  };

  const renderReportsTab = () => {
    return (
      <View style={styles.tabContent}>
        <Text style={styles.sectionTitle}>Vulnerability Reports Catalog</Text>

        <ClimateReportCard
          title="Daily Telemetry Operation Digest"
          type="Daily"
          period="Jul 16, 2026"
          highlights={[
            "Vellore temperature peaked at 41.2°C (Extreme Heat).",
            "Nilgiris soil moisture reached critical 92% saturation index.",
            "Nagapattinam cyclone track velocity rose to 45 km/h."
          ]}
          districtScope="All 38 Districts in Tamil Nadu"
        />

        <ClimateReportCard
          title="Weekly Climate Vulnerability Index"
          type="Weekly"
          period="Jul 9 - Jul 15, 2026"
          highlights={[
            "Active southwest monsoon brought 240mm rain to Western Ghats.",
            "Groundwater depth decreased by average 0.2m due to high interior heats.",
            "State air quality mean scored 65 AQI (Good/Stable range)."
          ]}
          districtScope="Statewide - All Agro-Climate Zones"
        />

        <ClimateReportCard
          title="Southwest Monsoon Seasonal Outlook"
          type="Seasonal"
          period="Q3 Seasonal Forecast"
          highlights={[
            "Projected +14% precipitation anomaly in Western Ghats.",
            "Coastal storm surges expected to stay below 1.2m anomalies.",
            "Drought risk footprint restricted to North interior pockets only."
          ]}
          districtScope="Tamil Nadu Regional Basin Projections"
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.headerContainer}>
        <View style={styles.titleWrapper}>
          <BarChart2 size={22} color={COLORS.primary} />
          <Text style={styles.titleText} numberOfLines={0}>
            Climate Intelligence Terminal
          </Text>
        </View>
        <Text style={styles.subtitleText} numberOfLines={0}>
          Tabbed diagnostic dashboards for agriculture, marine, and regional safety
        </Text>
      </View>

      {/* Top scrollable tab bar */}
      {renderTabSelector()}

      {/* Scrollable content box */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {activeTab === 'climate' && renderClimateTab()}
        {activeTab === 'marine' && renderMarineTab()}
        {activeTab === 'agriculture' && renderAgricultureTab()}
        {activeTab === 'fisheries' && renderFisheriesTab()}
        {activeTab === 'reports' && renderReportsTab()}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* District Selector Modal for comparison (Climate Tab) */}
      <Modal
        visible={showCompSelector}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCompSelector(false)}
      >
        <View style={styles.modalOverlay}>
          <GlassCard style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Compare District Node</Text>
              <Pressable onPress={() => setShowCompSelector(false)} style={styles.modalCloseBtn}>
                <Text style={styles.modalCloseBtnText}>Close</Text>
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.modalList} showsVerticalScrollIndicator={false}>
              {ALL_38_DISTRICTS.map((d) => (
                <Pressable
                  key={d.id}
                  style={styles.modalItem}
                  onPress={() => handleSelectCompare(d)}
                >
                  <MapPin size={12} color={COLORS.primary} />
                  <Text style={styles.modalItemText}>{d.name}</Text>
                  <Text style={styles.modalItemRegion}>{d.region} TN</Text>
                </Pressable>
              ))}
            </ScrollView>
          </GlassCard>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    paddingHorizontal: SPACING.horizontalPadding,
    paddingTop: 12,
    paddingBottom: 4,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  tabSelectorContainer: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 8,
  },
  tabScroll: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  tabChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 99,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  activeTabChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  activeTabLabel: {
    color: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  tabContent: {
    marginTop: 6,
  },
  kpiRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: 0.1,
    marginBottom: SPACING.md,
    marginTop: SPACING.sm,
  },
  compareContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  compareSelectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
    backgroundColor: COLORS.background,
    padding: 6,
    borderRadius: 8,
  },
  compareSelectorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    width: '42%',
    justifyContent: 'center',
  },
  compareSelectorBtnText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  compareVsText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textSecondary,
  },
  compareGrid: {
    gap: 8,
  },
  compareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F1F5F9',
  },
  compareValText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    width: '30%',
  },
  compareLabelText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    textAlign: 'center',
    flex: 1,
  },
  historyContainer: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  historyBadge: {
    width: 65,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyBadgeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
  },
  historyInfo: {
    flex: 1,
  },
  historyTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  historyMeta: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    maxHeight: '75%',
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
    marginBottom: 8,
  },
  modalTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
  },
  modalCloseBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: COLORS.background,
    borderRadius: 6,
  },
  modalCloseBtnText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  modalList: {
    gap: 4,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F1F5F9',
    gap: 6,
  },
  modalItemText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  modalItemRegion: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  bottomSpacer: {
    height: 120,
  },
});
