import React, { useState } from 'react';
import { ScrollView, StyleSheet, RefreshControl, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../src/theme';
import { PremiumHeader } from '../../src/components/dashboard/PremiumHeader';
import { HeroWeatherCard } from '../../src/components/dashboard/HeroWeatherCard';
import { HourlyForecast } from '../../src/components/dashboard/HourlyForecast';
import { Forecast7Day } from '../../src/components/dashboard/Forecast7Day';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate telemetry sensor ping reloading
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Scrollable Dashboard Grid */}
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
        {/* Premium Header */}
        <PremiumHeader />

        {/* Hero Climate telemetry */}
        <HeroWeatherCard />

        {/* Hourly Forecast Timeline */}
        <HourlyForecast />

        {/* 7-Day Forecasting Grid */}
        <Forecast7Day />

        {/* Bottom spacer to offset floating nav bar capsule */}
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
  bottomSpacer: {
    height: 100, // Enough height so content doesn't get obscured by the floating capsule navigation
  },
});
