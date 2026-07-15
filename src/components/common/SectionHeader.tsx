import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  style?: ViewStyle;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  rightElement,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.textWrapper}>
        <Text style={styles.title} numberOfLines={0}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={0}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightElement && <View style={styles.rightWrapper}>{rightElement}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.xs,
    marginBottom: SPACING.md,
  },
  textWrapper: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.lg,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  subtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.regular,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  rightWrapper: {
    justifyContent: 'center',
  },
});
