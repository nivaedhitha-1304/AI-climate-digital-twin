import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';

export type BadgeType = 'live' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusBadgeProps {
  type: BadgeType;
  label: string;
  style?: ViewStyle;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ type, label, style }) => {
  const pulseAnim = useSharedValue(0.5);

  useEffect(() => {
    pulseAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.4, { duration: 1000 })
      ),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => {
    return {
      opacity: pulseAnim.value,
      transform: [{ scale: pulseAnim.value }],
    };
  });

  const getColors = () => {
    switch (type) {
      case 'live':
        return { bg: 'rgba(34, 197, 94, 0.12)', text: COLORS.success, border: 'rgba(34, 197, 94, 0.3)' };
      case 'success':
        return { bg: 'rgba(34, 197, 94, 0.1)', text: COLORS.success, border: 'rgba(34, 197, 94, 0.2)' };
      case 'warning':
        return { bg: 'rgba(245, 158, 11, 0.1)', text: COLORS.warning, border: 'rgba(245, 158, 11, 0.2)' };
      case 'danger':
        return { bg: 'rgba(239, 68, 68, 0.1)', text: COLORS.danger, border: 'rgba(239, 68, 68, 0.2)' };
      case 'info':
        return { bg: 'rgba(37, 99, 235, 0.08)', text: COLORS.primary, border: 'rgba(37, 99, 235, 0.18)' };
      case 'neutral':
      default:
        return { bg: COLORS.background, text: COLORS.textSecondary, border: COLORS.border };
    }
  };

  const currentColors = getColors();

  return (
    <View style={[
      styles.badge, 
      { backgroundColor: currentColors.bg, borderColor: currentColors.border },
      style
    ]}>
      {type === 'live' && (
        <Animated.View style={[styles.pulseDot, pulseStyle]} />
      )}
      <Text style={[styles.badgeText, { color: currentColors.text }]}>
        {label.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 99,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.success,
    marginRight: 6,
  },
  badgeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    letterSpacing: 0.8,
  },
});
