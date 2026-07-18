import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  ShieldAlert, 
  HelpCircle 
} from 'lucide-react-native';
import { COLORS, TYPOGRAPHY } from '../../theme';
import { useApp } from '../../context/AppContext';

export type Severity = 'Low' | 'Moderate' | 'High' | 'Severe' | 'Emergency' | 'Extreme';

interface TrafficLightBadgeProps {
  severity: Severity;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const TrafficLightBadge: React.FC<TrafficLightBadgeProps> = ({
  severity,
  size = 'md',
  label,
}) => {
  const { t } = useApp();

  const getBadgeStyle = () => {
    switch (severity) {
      case 'Low':
        return {
          bg: 'rgba(34, 197, 94, 0.08)',
          border: 'rgba(34, 197, 94, 0.2)',
          text: '#16A34A', // Vibrant Green
          icon: (size: number) => <CheckCircle size={size} color="#16A34A" />,
        };
      case 'Moderate':
        return {
          bg: 'rgba(245, 158, 11, 0.08)',
          border: 'rgba(245, 158, 11, 0.2)',
          text: '#D97706', // Ambient Yellow-Orange
          icon: (size: number) => <AlertTriangle size={size} color="#D97706" />,
        };
      case 'High':
        return {
          bg: 'rgba(234, 88, 12, 0.08)',
          border: 'rgba(234, 88, 12, 0.2)',
          text: '#EA580C', // Deep Orange
          icon: (size: number) => <AlertCircle size={size} color="#EA580C" />,
        };
      case 'Severe':
      case 'Extreme':
        return {
          bg: 'rgba(239, 68, 68, 0.08)',
          border: 'rgba(239, 68, 68, 0.2)',
          text: '#DC2626', // Bright Crimson
          icon: (size: number) => <ShieldAlert size={size} color="#DC2626" />,
        };
      case 'Emergency':
        return {
          bg: 'rgba(153, 27, 27, 0.1)',
          border: 'rgba(153, 27, 27, 0.3)',
          text: '#991B1B', // Dark Red Emergency
          icon: (size: number) => <ShieldAlert size={size} color="#991B1B" />,
        };
      default:
        return {
          bg: 'rgba(100, 116, 139, 0.08)',
          border: 'rgba(100, 116, 139, 0.2)',
          text: COLORS.textSecondary,
          icon: (size: number) => <HelpCircle size={size} color={COLORS.textSecondary} />,
        };
    }
  };

  const badgeTheme = getBadgeStyle();
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const iconSize = isSmall ? 10 : isLarge ? 14 : 12;
  const paddingV = isSmall ? 2 : isLarge ? 6 : 4;
  const paddingH = isSmall ? 6 : isLarge ? 12 : 10;
  const fontSize = isSmall ? 8 : isLarge ? 11 : 10;

  const displayLabel = label || t(`severity.${severity}`);

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: badgeTheme.bg,
          borderColor: badgeTheme.border,
          paddingVertical: paddingV,
          paddingHorizontal: paddingH,
        },
      ]}
      accessibilityLabel={`Risk level: ${displayLabel}`}
    >
      {badgeTheme.icon(iconSize)}
      <Text
        style={[
          styles.text,
          {
            color: badgeTheme.text,
            fontSize: fontSize,
          },
        ]}
        numberOfLines={1}
      >
        {displayLabel.toUpperCase()}
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
  text: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
