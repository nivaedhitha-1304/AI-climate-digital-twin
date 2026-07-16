import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CheckSquare, ShieldAlert, CloudRain, Sun, Wind } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from './GlassCard';

interface ChecklistCardProps {
  event: 'Heavy Rain' | 'Cyclone' | 'Heatwave' | string;
  items: string[];
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({ event, items }) => {
  const getEventIcon = () => {
    const size = 16;
    const color = COLORS.primary;
    if (event.toLowerCase().includes('rain')) {
      return <CloudRain size={size} color={color} />;
    } else if (event.toLowerCase().includes('cyclone') || event.toLowerCase().includes('wind')) {
      return <Wind size={size} color={color} />;
    } else if (event.toLowerCase().includes('heat')) {
      return <Sun size={size} color={color} />;
    }
    return <ShieldAlert size={size} color={color} />;
  };

  return (
    <GlassCard style={styles.card}>
      <View style={styles.header}>
        {getEventIcon()}
        <Text style={styles.title} numberOfLines={1}>
          {event} Readiness
        </Text>
      </View>
      <View style={styles.checklistGrid}>
        {items.map((item, index) => (
          <View key={`check-${index}`} style={styles.checkItem}>
            <CheckSquare size={13} color={COLORS.secondary} style={styles.checkIcon} />
            <Text style={styles.checkText} numberOfLines={2}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: SPACING.md,
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: SPACING.borderRadiusMd,
    marginBottom: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 6,
    marginBottom: 8,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 11,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: 0.2,
  },
  checklistGrid: {
    gap: 5,
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  checkIcon: {
    marginTop: 1,
  },
  checkText: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    lineHeight: 13,
  },
});
