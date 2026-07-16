import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../theme';

export type RiskSeverity = 'Low' | 'Moderate' | 'High' | 'Severe' | 'Extreme';

interface TrafficLightBadgeProps {
  severity: RiskSeverity;
  size?: 'sm' | 'md';
}

export const TrafficLightBadge: React.FC<TrafficLightBadgeProps> = ({
  severity,
  size = 'md',
}) => {
  const getBadgeStyle = () => {
    switch (severity) {
      case 'Low':
        return {
          bg: 'rgba(34, 197, 94, 0.08)',
          border: 'rgba(34, 197, 94, 0.2)',
          text: '#16A34A', // Vibrant Green
        };
      case 'Moderate':
        return {
          bg: 'rgba(245, 158, 11, 0.08)',
          border: 'rgba(245, 158, 11, 0.2)',
          text: '#D97706', // Ambient Yellow-Orange
        };
      case 'High':
        return {
          bg: 'rgba(234, 88, 12, 0.08)',
          border: 'rgba(234, 88, 12, 0.2)',
          text: '#EA580C', // Deep Orange
        };
      case 'Severe':
      case 'Extreme':
        return {
          bg: 'rgba(239, 68, 68, 0.08)',
          border: 'rgba(239, 68, 68, 0.2)',
          text: '#DC2626', // Bright Crimson
        };
      default:
        return {
          bg: 'rgba(100, 116, 139, 0.08)',
          border: 'rgba(100, 116, 139, 0.2)',
          text: COLORS.textSecondary,
        };
    }
  };

  const badgeTheme = getBadgeStyle();
  const isSmall = size === 'sm';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: badgeTheme.bg,
          borderColor: badgeTheme.border,
          paddingVertical: isSmall ? 2 : 4,
          paddingHorizontal: isSmall ? 6 : 10,
        },
      ]}
    >
      <View style={[styles.indicator, { backgroundColor: badgeTheme.text }]} />
      <Text
        style={[
          styles.text,
          {
            color: badgeTheme.text,
            fontSize: isSmall ? 8 : 10,
          },
        ]}
        numberOfLines={1}
      >
        {severity.toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 99,
    alignSelf: 'flex-start',
    gap: 5,
  },
  indicator: {
    width: 5,
    height: 5,
    borderRadius: 99,
  },
  text: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
