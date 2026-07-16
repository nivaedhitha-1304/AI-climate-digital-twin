import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../../theme';

interface LayerControlProps {
  name: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}

export const LayerControl: React.FC<LayerControlProps> = ({
  name,
  icon,
  active,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.btn,
        active && styles.activeBtn,
        active && { borderColor: COLORS.primary }
      ]}
    >
      <Text style={styles.icon} numberOfLines={1}>
        {icon}
      </Text>
      <Text style={[styles.label, active && styles.activeLabel]} numberOfLines={1}>
        {name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 99,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  activeBtn: {
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
    borderWidth: 1.5,
  },
  icon: {
    fontSize: 10,
  },
  label: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  activeLabel: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.bold,
  },
});
