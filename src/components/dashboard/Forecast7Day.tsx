import React from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudDrizzle, 
  CloudRain, 
  CloudLightning,
  Droplet
} from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { SectionHeader } from '../common/SectionHeader';
import { DAILY_FORECAST, DailyForecast as DailyType } from '../../mock/climateMock';

const getWeatherIcon = (condition: string) => {
  switch (condition) {
    case 'Sunny':
      return <Sun size={20} color="#FBBF24" />;
    case 'Partly Cloudy':
      return <CloudSun size={20} color="#60A5FA" />;
    case 'Scattered Clouds':
    case 'Cloudy':
      return <Cloud size={20} color="#94A3B8" />;
    case 'Passing Showers':
      return <CloudDrizzle size={20} color="#60A5FA" />;
    case 'Rain':
      return <CloudRain size={20} color="#2563EB" />;
    case 'Thunderstorm':
    default:
      return <CloudLightning size={20} color="#EF4444" />;
  }
};

export const Forecast7Day: React.FC = () => {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  // Calculate weekly global min and max temperatures to scale the bars
  const globalMin = Math.min(...DAILY_FORECAST.map(d => d.tempMin));
  const globalMax = Math.max(...DAILY_FORECAST.map(d => d.tempMax));
  const globalRange = globalMax - globalMin;

  return (
    <View style={styles.container}>
      <SectionHeader 
        title="7-Day Synoptic Outlook" 
        subtitle="Long-range meteorological predictions" 
      />
      
      <GlassCard style={styles.cardContainer}>
        {DAILY_FORECAST.map((forecast: DailyType, idx: number) => {
          // Bar layout math
          const leftPercent = ((forecast.tempMin - globalMin) / globalRange) * 100;
          const widthPercent = ((forecast.tempMax - forecast.tempMin) / globalRange) * 100;

          return (
            <View key={`daily-${idx}`} style={styles.row}>
              {/* Day & Date */}
              <View style={styles.dayCol}>
                <Text style={styles.dayText} numberOfLines={0}>
                  {forecast.day}
                </Text>
                <Text style={styles.dateText} numberOfLines={0}>
                  {forecast.date}
                </Text>
              </View>

              {/* Rain Probability */}
              <View style={styles.rainCol}>
                {getWeatherIcon(forecast.condition)}
                <View style={styles.rainBadge}>
                  <Droplet size={10} color={COLORS.primary} />
                  <Text style={styles.rainText} numberOfLines={0}>
                    {forecast.rainProb}%
                  </Text>
                </View>
              </View>

              {/* Temperature Trend Bar Visualization */}
              <View style={styles.trendCol}>
                <Text style={styles.minTemp} numberOfLines={0}>
                  {forecast.tempMin}°
                </Text>
                
                <View style={styles.track}>
                  <View 
                    style={[
                      styles.progressSegment, 
                      { left: `${leftPercent}%`, width: `${widthPercent}%` }
                    ]} 
                  />
                </View>

                <Text style={styles.maxTemp} numberOfLines={0}>
                  {forecast.tempMax}°
                </Text>
              </View>
            </View>
          );
        })}
      </GlassCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.sectionToSection,
  },
  cardContainer: {
    paddingVertical: SPACING.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dayCol: {
    width: 70,
  },
  dayText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  dateText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  rainCol: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  rainBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  rainText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  trendCol: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: SPACING.md,
    gap: SPACING.sm,
  },
  minTemp: {
    width: 24,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    textAlign: 'right',
  },
  maxTemp: {
    width: 24,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  track: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.border,
    position: 'relative',
  },
  progressSegment: {
    position: 'absolute',
    height: '100%',
    borderRadius: 2,
    backgroundColor: COLORS.primary,
  },
});
