import React, { useEffect } from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence, 
  withDelay 
} from 'react-native-reanimated';
import { 
  Sun, 
  Cloud, 
  Droplets, 
  Wind, 
  Compass, 
  Sunrise, 
  Sunset,
  AlertTriangle
} from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { StatusBadge } from '../common/StatusBadge';
import { AnimatedNumber } from '../common/AnimatedNumber';
import { useApp } from '../../context/AppContext';

// Custom Reanimated weather animation helper
const AnimatedWeatherVisual: React.FC = () => {
  const sunScale = useSharedValue(1);
  const cloudTranslateX = useSharedValue(0);
  const rainOpacity = useSharedValue(0.2);

  useEffect(() => {
    // Pulse sun
    sunScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 2000 }),
        withTiming(0.96, { duration: 2000 })
      ),
      -1,
      true
    );

    // Slide cloud back and forth
    cloudTranslateX.value = withRepeat(
      withSequence(
        withTiming(12, { duration: 4000 }),
        withTiming(-8, { duration: 4000 })
      ),
      -1,
      true
    );

    // Flash rain drops
    rainOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.2, { duration: 800 })
      ),
      -1,
      true
    );
  }, []);

  const sunStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: sunScale.value }],
    };
  });

  const cloudStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: cloudTranslateX.value }],
    };
  });

  const rainStyle = useAnimatedStyle(() => {
    return {
      opacity: rainOpacity.value,
    };
  });

  return (
    <View style={styles.animationContainer}>
      <Animated.View style={[styles.sunPosition, sunStyle]}>
        <View style={styles.sunGlow} />
        <Sun size={60} color="#FBBF24" />
      </Animated.View>
      <Animated.View style={[styles.cloudPosition, cloudStyle]}>
        <Cloud size={52} color="#E2E8F0" fill="#E2E8F0" />
      </Animated.View>
      <Animated.View style={[styles.rainPosition, rainStyle]}>
        <Droplets size={24} color="#60A5FA" />
      </Animated.View>
    </View>
  );
};

export const HeroWeatherCard: React.FC = () => {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;
  const { t } = useApp();

  return (
    <View style={styles.outerContainer}>
      <GlassCard style={styles.cardContainer}>
        {/* Top Badges & Updated Status */}
        <View style={styles.metaRow}>
          <StatusBadge type="live" label={t('timeline.now')} />
          <Text style={styles.updatedText} numberOfLines={0}>
            Updated: 2 mins ago
          </Text>
        </View>

        {/* Hero Section */}
        <View style={[styles.heroSection, isTablet && styles.heroSectionTablet]}>
          <View style={styles.weatherInfo}>
            <View style={styles.tempRow}>
              <AnimatedNumber
                value={32}
                style={styles.temperature}
                suffix="°C"
              />
              <Text style={styles.conditionText} numberOfLines={0}>
                Scattered Showers
              </Text>
            </View>
            <View style={styles.feelsLikeRow}>
              <Text style={styles.feelsLikeText} numberOfLines={0}>
                {t('details.feels')} <Text style={styles.boldText}>38°C</Text>
              </Text>
              <Text style={styles.highLowText} numberOfLines={0}>
                H: 34°C • L: 25°C
              </Text>
            </View>
          </View>
          <View style={styles.visualColumn}>
            <AnimatedWeatherVisual />
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Primary Parameters Grid */}
        <View style={styles.paramGrid}>
          <View style={styles.paramItem}>
            <Droplets size={18} color={COLORS.secondary} />
            <View style={styles.paramLabelColumn}>
              <Text style={styles.paramLabel} numberOfLines={0}>{t('details.humidity')}</Text>
              <Text style={styles.paramValue} numberOfLines={0}>75%</Text>
            </View>
          </View>
          
          <View style={styles.paramItem}>
            <Wind size={18} color={COLORS.secondary} />
            <View style={styles.paramLabelColumn}>
              <Text style={styles.paramLabel} numberOfLines={0}>{t('details.wind')}</Text>
              <Text style={styles.paramValue} numberOfLines={0}>22 km/h</Text>
            </View>
          </View>

          <View style={styles.paramItem}>
            <Compass size={18} color={COLORS.secondary} />
            <View style={styles.paramLabelColumn}>
              <Text style={styles.paramLabel} numberOfLines={0}>{t('details.pressure')}</Text>
              <Text style={styles.paramValue} numberOfLines={0}>1008 hPa</Text>
            </View>
          </View>
        </View>

        {/* Secondary Parameters Row */}
        <View style={styles.secondaryRow}>
          <View style={styles.secItem}>
            <Text style={styles.secLabel} numberOfLines={0}>{t('details.aqi')}</Text>
            <View style={styles.badgeWrapper}>
              <Text style={[styles.secValue, { color: COLORS.warning }]} numberOfLines={0}>94</Text>
              <Text style={styles.secSubtext} numberOfLines={0}>Mod</Text>
            </View>
          </View>
          
          <View style={styles.secItem}>
            <Text style={styles.secLabel} numberOfLines={0}>{t('details.uv')}</Text>
            <View style={styles.badgeWrapper}>
              <Text style={[styles.secValue, { color: COLORS.danger }]} numberOfLines={0}>10</Text>
              <Text style={styles.secSubtext} numberOfLines={0}>High</Text>
            </View>
          </View>

          <View style={styles.secItem}>
            <Text style={styles.secLabel} numberOfLines={0}>{t('details.visibility')}</Text>
            <View style={styles.badgeWrapper}>
              <Text style={[styles.secValue, { color: COLORS.success }]} numberOfLines={0}>9.5</Text>
              <Text style={styles.secSubtext} numberOfLines={0}>km</Text>
            </View>
          </View>
        </View>

        {/* Sun Telemetry */}
        <View style={styles.sunTelemetryRow}>
          <View style={styles.sunTime}>
            <Sunrise size={16} color={COLORS.textSecondary} style={styles.sunIcon} />
            <Text style={styles.sunTimeText} numberOfLines={0}>
              Sunrise: 05:54 AM
            </Text>
          </View>
          <View style={styles.sunTime}>
            <Sunset size={16} color={COLORS.textSecondary} style={styles.sunIcon} />
            <Text style={styles.sunTimeText} numberOfLines={0}>
              Sunset: 06:42 PM
            </Text>
          </View>
        </View>
      </GlassCard>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.sectionToSection,
  },
  cardContainer: {
    padding: SPACING.xxl,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  updatedText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
  heroSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  heroSectionTablet: {
    justifyContent: 'space-around',
  },
  weatherInfo: {
    flex: 1,
  },
  tempRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  temperature: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.giant,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    lineHeight: TYPOGRAPHY.lineHeights.giant,
  },
  conditionText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    marginTop: SPACING.xs,
  },
  feelsLikeRow: {
    marginTop: SPACING.sm,
  },
  feelsLikeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    color: COLORS.textSecondary,
  },
  boldText: {
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  highLowText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  visualColumn: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animationContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  sunPosition: {
    position: 'absolute',
    top: 10,
    left: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sunGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
  },
  cloudPosition: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rainPosition: {
    position: 'absolute',
    bottom: 5,
    left: 20,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  paramGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  paramItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paramLabelColumn: {
    marginLeft: SPACING.sm,
  },
  paramLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
  paramValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  secondaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: SPACING.borderRadiusMd,
    padding: SPACING.md,
    marginBottom: SPACING.lg,
  },
  secItem: {
    flex: 1,
    alignItems: 'center',
  },
  secLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  badgeWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  secValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
  secSubtext: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  sunTelemetryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: SPACING.xs,
  },
  sunTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sunIcon: {
    marginRight: 6,
  },
  sunTimeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
});
