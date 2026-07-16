import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { HelpCircle } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from './GlassCard';

interface LegendProps {
  title: string;
  desc?: string;
  colors: string[];
  labels: string[];
}

export const Legend: React.FC<LegendProps> = ({
  title,
  desc,
  colors,
  labels,
}) => {
  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <HelpCircle size={12} color={COLORS.textSecondary} />
      </View>
      
      {desc && (
        <Text style={styles.desc} numberOfLines={2}>
          {desc}
        </Text>
      )}

      <View style={styles.colorBarContainer}>
        <View style={styles.colorBar}>
          {colors.map((color, index) => (
            <View 
              key={`col-${index}`} 
              style={[
                styles.colorBlock, 
                { backgroundColor: color }
              ]} 
            />
          ))}
        </View>
        <View style={styles.labelsContainer}>
          {labels.map((label, index) => (
            <Text key={`lbl-${index}`} style={styles.labelText} numberOfLines={1}>
              {label}
            </Text>
          ))}
        </View>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    borderWidth: 1,
    padding: SPACING.md,
    borderRadius: SPACING.borderRadiusMd,
    marginBottom: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  desc: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginBottom: 8,
    lineHeight: 11,
  },
  colorBarContainer: {
    marginTop: 2,
  },
  colorBar: {
    flexDirection: 'row',
    height: 5,
    borderRadius: 99,
    overflow: 'hidden',
    marginBottom: 5,
  },
  colorBlock: {
    flex: 1,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 7,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
});
