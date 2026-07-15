import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudDrizzle, 
  CloudRain, 
  CloudLightning, 
  Moon, 
  Compass,
  Droplet
} from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { SectionHeader } from '../common/SectionHeader';
import { HOURLY_FORECAST, HourlyForecast as HourlyType } from '../../mock/climateMock';

const getWeatherIcon = (condition: string, time: string) => {
  const isNight = time.startsWith('20') || time.startsWith('22') || time.startsWith('00') || time.startsWith('02') || time.startsWith('04');
  
  switch (condition) {
    case 'Sunny':
      return <Sun size={24} color="#FBBF24" />;
    case 'Partly Cloudy':
      return <CloudSun size={24} color="#60A5FA" />;
    case 'Scattered Clouds':
    case 'Cloudy':
      return <Cloud size={24} color="#94A3B8" />;
    case 'Passing Showers':
      return <CloudDrizzle size={24} color="#60A5FA" />;
    case 'Rain':
      return <CloudRain size={24} color="#2563EB" />;
    case 'Heavy Rain':
    case 'Thunderstorm':
      return <CloudLightning size={24} color="#EF4444" />;
    case 'Clear':
    default:
      return isNight ? <Moon size={24} color="#94A3B8" /> : <Sun size={24} color="#FBBF24" />;
  }
};

export const HourlyForecast: React.FC = () => {
  return (
    <View style={styles.container}>
      <SectionHeader 
        title="Hourly Projections" 
        subtitle="Real-time 24-hour climate simulations" 
        style={styles.header}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        decelerationRate="fast"
      >
        {HOURLY_FORECAST.map((hour: HourlyType, idx: number) => {
          // Highlight current/near-future hours for a premium operational feel
          const isCurrentHour = idx === 0;

          return (
            <GlassCard 
              key={`hour-${idx}`} 
              style={[
                styles.hourCard, 
                isCurrentHour && styles.activeHourCard
              ]}
            >
              <Text style={[
                styles.timeText,
                isCurrentHour && styles.activeText
              ]} numberOfLines={0}>
                {hour.time}
              </Text>
              
              <View style={styles.iconContainer}>
                {getWeatherIcon(hour.condition, hour.time)}
              </View>

              <Text style={[
                styles.tempText,
                isCurrentHour && styles.activeTempText
              ]} numberOfLines={0}>
                {hour.temp}°
              </Text>

              <Text style={styles.conditionText} numberOfLines={0}>
                {hour.condition}
              </Text>

              <View style={styles.statsRow}>
                <View style={styles.statMini}>
                  <Droplet size={10} color={COLORS.secondary} />
                  <Text style={styles.statMiniText} numberOfLines={0}>
                    {hour.rainProb}%
                  </Text>
                </View>
              </View>
            </GlassCard>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.sectionToSection,
  },
  header: {
    paddingHorizontal: SPACING.horizontalPadding,
  },
  scrollContent: {
    paddingHorizontal: SPACING.horizontalPadding,
    gap: SPACING.cardToCard,
  },
  hourCard: {
    width: 90,
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
  },
  activeHourCard: {
    borderColor: COLORS.primary,
    borderWidth: 1.5,
    backgroundColor: 'rgba(37, 99, 235, 0.03)',
  },
  timeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  activeText: {
    color: COLORS.primary,
  },
  iconContainer: {
    marginVertical: SPACING.sm,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  activeTempText: {
    fontSize: TYPOGRAPHY.sizes.lg,
    color: COLORS.primary,
  },
  conditionText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 2,
    height: 12,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: SPACING.sm,
    alignItems: 'center',
  },
  statMini: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  statMiniText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
});
