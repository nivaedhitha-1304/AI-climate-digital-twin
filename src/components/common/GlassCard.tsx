import React from 'react';
import { StyleSheet, View, ViewStyle, Platform, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS, SPACING } from '../../theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 70,
  tint = 'light',
}) => {
  // On Android, BlurView can sometimes be resource-heavy depending on the version.
  // We use a high-fidelity translucent overlay as the container with BlurView overlay.
  if (Platform.OS === 'android') {
    return (
      <View style={[styles.androidContainer, style]}>
        <View style={styles.cardBorder} />
        {children}
      </View>
    );
  }

  return (
    <BlurView intensity={intensity} tint={tint} style={[styles.iosContainer, style]}>
      <View style={styles.cardBorder} />
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  iosContainer: {
    borderRadius: SPACING.borderRadiusLg,
    padding: SPACING.cardToCard,
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
  },
  androidContainer: {
    borderRadius: SPACING.borderRadiusLg,
    padding: SPACING.cardToCard,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  cardBorder: {
    ...StyleSheet.absoluteFill,
    borderRadius: SPACING.borderRadiusLg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    pointerEvents: 'none',
  },
});
