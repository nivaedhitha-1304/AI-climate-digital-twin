import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, StatusBar, RefreshControl, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarChart2, Filter } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../src/theme';
import { AnalyticsOverview } from '../../src/components/analytics/AnalyticsOverview';
import { HistoricalCharts } from '../../src/components/analytics/HistoricalCharts';
import { ClimateInsightsList } from '../../src/components/analytics/ClimateInsightsList';

export type ClimateRegion = 'All' | 'North' | 'South' | 'West' | 'Coastal';

const REGIONS: { id: ClimateRegion; label: string }[] = [
  { id: 'All', label: 'All Regions' },
  { id: 'North', label: 'North Interior' },
  { id: 'South', label: 'South Zone' },
  { id: 'West', label: 'Western Ghats' },
  { id: 'Coastal', label: 'Coastal Belt' },
];

export default function AnalyticsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<ClimateRegion>('All');

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Scrollable Analytics Panel */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
      >
        {/* Header Title */}
        <View style={styles.headerContainer}>
          <View style={styles.titleWrapper}>
            <BarChart2 size={22} color={COLORS.primary} />
            <Text style={styles.titleText} numberOfLines={0}>
              Climate Analytics
            </Text>
          </View>
          <Text style={styles.subtitleText} numberOfLines={0}>
            Long-term trends, ecological indexings, and historical baseline deviations
          </Text>
        </View>

        {/* Regional Selector Pills */}
        <View style={styles.filterWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            <View style={styles.filterLabelContainer}>
              <Filter size={12} color={COLORS.textSecondary} />
            </View>
            
            {REGIONS.map((reg) => {
              const isSelected = selectedRegion === reg.id;
              return (
                <Pressable
                  key={reg.id}
                  onPress={() => setSelectedRegion(reg.id)}
                  style={[
                    styles.filterChip,
                    isSelected && styles.activeFilterChip
                  ]}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      isSelected && styles.activeFilterChipText
                    ]}
                    numberOfLines={1}
                  >
                    {reg.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* 1. Core overview KPI cards & PDF generator */}
        <AnalyticsOverview selectedRegion={selectedRegion} />

        {/* 2. Interactive SVG Charts */}
        <HistoricalCharts selectedRegion={selectedRegion} />

        {/* 3. News & Eco-stewardship bulletins */}
        <ClimateInsightsList />

        {/* Space buffer to offset bottom capsule navigation */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
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
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  filterWrapper: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 10,
  },
  filterScroll: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  filterLabelContainer: {
    paddingRight: 4,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 99,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeFilterChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterChipText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  activeFilterChipText: {
    color: '#FFFFFF',
  },
  bottomSpacer: {
    height: 100,
  },
});
