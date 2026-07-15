import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, useWindowDimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring 
} from 'react-native-reanimated';
import { Clock, History, Eye, Sparkles, Calendar } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';

export type TimeHorizon = 'past24h' | 'now' | 'next7d' | 'simulation';

interface TimelineScrubberProps {
  value: TimeHorizon;
  onChange: (value: TimeHorizon) => void;
  simulationYear: 2030 | 2040 | 2050;
  onChangeSimulationYear: (year: 2030 | 2040 | 2050) => void;
}

export const TimelineScrubber: React.FC<TimelineScrubberProps> = ({
  value,
  onChange,
  simulationYear,
  onChangeSimulationYear,
}) => {
  const { width } = useWindowDimensions();
  const segmentWidth = (width - 48 - 6 - 6) / 4; // total width minus card margins and padding

  // Translate value for the slider capsule
  const translateSlider = useSharedValue(0);

  useEffect(() => {
    let index = 1; // now default
    if (value === 'past24h') index = 0;
    if (value === 'next7d') index = 2;
    if (value === 'simulation') index = 3;

    translateSlider.value = withSpring(index * segmentWidth, {
      damping: 15,
      stiffness: 120,
    });
  }, [value, segmentWidth]);

  const animatedSliderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateSlider.value }],
    };
  });

  return (
    <View style={styles.container}>
      <GlassCard style={styles.card}>
        <Text style={styles.sectionTitle} numberOfLines={0}>
          Scrub Simulation Timeline
        </Text>
        <Text style={styles.sectionSubtitle} numberOfLines={0}>
          Shift twin models across historical averages, live telemetry, and AI predictions
        </Text>

        <View style={styles.scrubberContainer}>
          {/* Animated Selection Pill overlay */}
          <Animated.View 
            style={[
              styles.sliderPill, 
              { width: segmentWidth },
              animatedSliderStyle
            ]} 
          />

          {/* Past 24h Segment */}
          <Pressable 
            onPress={() => onChange('past24h')} 
            style={styles.segment}
          >
            <History 
              size={12} 
              color={value === 'past24h' ? COLORS.primary : COLORS.textSecondary} 
            />
            <Text 
              style={[
                styles.segmentLabel, 
                value === 'past24h' && styles.activeSegmentLabel
              ]} 
              numberOfLines={0}
            >
              Past 24h
            </Text>
          </Pressable>

          {/* Now Segment */}
          <Pressable 
            onPress={() => onChange('now')} 
            style={styles.segment}
          >
            <Eye 
              size={12} 
              color={value === 'now' ? COLORS.primary : COLORS.textSecondary} 
            />
            <Text 
              style={[
                styles.segmentLabel, 
                value === 'now' && styles.activeSegmentLabel
              ]} 
              numberOfLines={0}
            >
              Now (Live)
            </Text>
          </Pressable>

          {/* Next 7 Days Segment */}
          <Pressable 
            onPress={() => onChange('next7d')} 
            style={styles.segment}
          >
            <Calendar 
              size={12} 
              color={value === 'next7d' ? COLORS.primary : COLORS.textSecondary} 
            />
            <Text 
              style={[
                styles.segmentLabel, 
                value === 'next7d' && styles.activeSegmentLabel
              ]} 
              numberOfLines={0}
            >
              Next 7d
            </Text>
          </Pressable>

          {/* Future Simulation Segment */}
          <Pressable 
            onPress={() => onChange('simulation')} 
            style={styles.segment}
          >
            <Sparkles 
              size={12} 
              color={value === 'simulation' ? COLORS.primary : COLORS.textSecondary} 
            />
            <Text 
              style={[
                styles.segmentLabel, 
                value === 'simulation' && styles.activeSegmentLabel
              ]} 
              numberOfLines={0}
            >
              Simulation
            </Text>
          </Pressable>
        </View>

        {/* Small advisory text below */}
        <Text style={styles.advisoryText} numberOfLines={0}>
          {value === 'past24h' && '⚡ Currently showing 24-hour historical baseline telemetry loops for Tamil Nadu.'}
          {value === 'now' && '🟢 Rendering active real-time IoT sensors and orbital satellite data streams.'}
          {value === 'next7d' && '📅 Rendering predictive models for local weather deviations over the next 7 days.'}
          {value === 'simulation' && '🔮 Rendering simulated long-term climate projections for Tamil Nadu.'}
        </Text>

        {/* Research Mode Selection Pill (Simulation mode only) */}
        {value === 'simulation' && (
          <View style={styles.researchModeContainer}>
            <View style={styles.researchHeader}>
              <Sparkles size={12} color={COLORS.primary} />
              <Text style={styles.researchTitle} numberOfLines={0}>
                RESEARCH SIMULATION HORIZONS
              </Text>
            </View>
            <View style={styles.yearTrack}>
              {([2030, 2040, 2050] as const).map((year) => {
                const isSelected = simulationYear === year;
                return (
                  <Pressable
                    key={year}
                    onPress={() => onChangeSimulationYear(year)}
                    style={[
                      styles.yearButton,
                      isSelected && styles.activeYearButton
                    ]}
                  >
                    <Text 
                      style={[
                        styles.yearButtonText,
                        isSelected && styles.activeYearButtonText
                      ]}
                      numberOfLines={0}
                    >
                      {year} Model
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}
      </GlassCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.sectionToSection,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.md,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionSubtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    marginTop: 2,
  },
  scrubberContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: SPACING.borderRadiusMd,
    padding: 3,
    position: 'relative',
    height: 44,
    alignItems: 'center',
  },
  sliderPill: {
    position: 'absolute',
    height: 38,
    backgroundColor: '#FFFFFF',
    borderRadius: SPACING.borderRadiusSm,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    top: 3,
    left: 3,
  },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: '100%',
    zIndex: 99,
  },
  segmentLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  activeSegmentLabel: {
    color: COLORS.primary,
  },
  advisoryText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.primary,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  researchModeContainer: {
    marginTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: SPACING.md,
  },
  researchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: SPACING.sm,
  },
  researchTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: 0.5,
  },
  yearTrack: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: SPACING.borderRadiusSm,
    padding: 3,
    gap: 4,
  },
  yearButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  activeYearButton: {
    backgroundColor: COLORS.primary,
  },
  yearButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  activeYearButtonText: {
    color: '#FFFFFF',
  },
});
