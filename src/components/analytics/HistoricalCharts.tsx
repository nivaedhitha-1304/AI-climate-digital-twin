import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { ChartCard } from '../common/ChartCard';
import { ANALYTICS_DATA } from '../../mock/climateMock';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { ClimateRegion } from '../../../app/(tabs)/analytics';

interface HistoricalChartsProps {
  selectedRegion: ClimateRegion;
}

export const HistoricalCharts: React.FC<HistoricalChartsProps> = ({ selectedRegion }) => {
  const [activeTab, setActiveTab] = useState<'temp' | 'rain'>('temp');

  // Mathematical modifiers per region to dynamic-scale the mock dataset
  const getModifiedData = () => {
    const baseTempCurrent = [...ANALYTICS_DATA.tempTrends.currentYear];
    const baseTempHist = [...ANALYTICS_DATA.tempTrends.historicalAverage];
    const baseRain = [...ANALYTICS_DATA.rainfallTrends.data];

    switch (selectedRegion) {
      case 'North':
        return {
          tempCurrent: baseTempCurrent.map(t => t + 2.5),
          tempHist: baseTempHist.map(t => t + 2.0),
          rain: baseRain.map(r => Math.round(r * 0.45)),
        };
      case 'South':
        return {
          tempCurrent: baseTempCurrent.map(t => t + 1.0),
          tempHist: baseTempHist.map(t => t + 0.8),
          rain: baseRain.map(r => Math.round(r * 0.85)),
        };
      case 'West':
        return {
          tempCurrent: baseTempCurrent.map(t => Math.max(16, t - 5.5)),
          tempHist: baseTempHist.map(t => Math.max(15, t - 5.0)),
          rain: baseRain.map(r => Math.round(r * 1.85)),
        };
      case 'Coastal':
        return {
          tempCurrent: baseTempCurrent.map(t => t + 0.5),
          tempHist: baseTempHist.map(t => t + 0.3),
          rain: baseRain.map(r => Math.round(r * 1.35)),
        };
      case 'All':
      default:
        return {
          tempCurrent: baseTempCurrent,
          tempHist: baseTempHist,
          rain: baseRain,
        };
    }
  };

  const { tempCurrent, tempHist, rain } = getModifiedData();

  return (
    <View style={styles.container}>
      {/* Chart Selector Tabs */}
      <GlassCard style={styles.tabCard}>
        <View style={styles.tabContainer}>
          <Pressable
            onPress={() => setActiveTab('temp')}
            style={[styles.tab, activeTab === 'temp' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'temp' && styles.activeTabText]} numberOfLines={0}>
              Temp Baseline Comparison
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveTab('rain')}
            style={[styles.tab, activeTab === 'rain' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'rain' && styles.activeTabText]} numberOfLines={0}>
              Precipitation Records
            </Text>
          </Pressable>
        </View>
      </GlassCard>

      {/* Render selected chart */}
      {activeTab === 'temp' ? (
        <ChartCard
          title={`Surface Temperature Deviation — ${selectedRegion} Region (°C)`}
          labels={ANALYTICS_DATA.tempTrends.labels}
          data={tempCurrent}
          historicalData={tempHist}
          ySuffix="°"
          type="area"
        />
      ) : (
        <ChartCard
          title={`Precipitation Accumulation — ${selectedRegion} Region (mm)`}
          labels={ANALYTICS_DATA.rainfallTrends.labels}
          data={rain}
          ySuffix=" mm"
          type="area"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.sectionToSection,
  },
  tabCard: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: 6,
    marginBottom: SPACING.md,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: SPACING.borderRadiusMd - 6,
    padding: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SPACING.borderRadiusSm - 4,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  activeTabText: {
    color: COLORS.primary,
  },
});
