import React from 'react';
import { StyleSheet, Text, Pressable, ViewStyle, TextStyle, View, StyleProp } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';

interface ButtonProps {
  onPress: () => void;
  label: string;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  onPress,
  label,
  style,
  labelStyle,
  icon,
  disabled = false,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (!disabled) scale.value = withSpring(0.96, { damping: 12, stiffness: 300 });
  };

  const handlePressOut = () => {
    if (!disabled) scale.value = withSpring(1, { damping: 12, stiffness: 300 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      <Animated.View style={[styles.primaryButton, animatedStyle, style]}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <Text style={[styles.primaryLabel, labelStyle]} numberOfLines={0}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  onPress,
  label,
  style,
  labelStyle,
  icon,
  disabled = false,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (!disabled) scale.value = withSpring(0.96, { damping: 12, stiffness: 300 });
  };

  const handlePressOut = () => {
    if (!disabled) scale.value = withSpring(1, { damping: 12, stiffness: 300 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      <Animated.View style={[styles.secondaryButton, animatedStyle, style]}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <Text style={[styles.secondaryLabel, labelStyle]} numberOfLines={0}>
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

interface IconButtonProps {
  onPress: () => void;
  icon: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  icon,
  style,
  disabled = false,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    if (!disabled) scale.value = withSpring(0.90, { damping: 12, stiffness: 300 });
  };

  const handlePressOut = () => {
    if (!disabled) scale.value = withSpring(1, { damping: 12, stiffness: 300 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      <Animated.View style={[styles.iconButton, animatedStyle, style]}>
        {icon}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,
    borderRadius: SPACING.borderRadiusMd,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: '#FFFFFF',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,
    borderRadius: SPACING.borderRadiusMd,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  secondaryLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  iconWrapper: {
    marginRight: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
