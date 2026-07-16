import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { CloudRain, Sun, Cloud, Thermometer } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from './GlassCard';

interface TimelineCardProps {
  time: string;
  temp: number;
  condition: string;
  rainProb: number;
  humidity: number;
  active?: boolean;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({
  time,
  temp,
  condition,
  rainProb,
  humidity,
  active = false,
}) => {
  const renderConditionIcon = () => {
    const size = 16;
    const color = active ? '#FFFFFF' : COLORS.primary;
    if (condition.toLowerCase().includes('rain') || condition.toLowerCase().includes('shower')) {
      return <CloudRain size={size} color={color} />;
    } else if (condition.toLowerCase().includes('cloud') || condition.toLowerCase().includes('fog')) {
      return <Cloud size={size} color={color} />;
    }
    return <Sun size={size} color={color} />;
  };

  return (
    <GlassCard
      style={[
        styles.card,
        active && styles.activeCard,
        active && { borderColor: COLORS.primary }
      ]}
    >
      <Text style={[styles.timeText, active && styles.activeText]}>{time}</Text>
      
      <View style={styles.iconContainer}>
        {renderConditionIcon()}
      </View>

      <View style={styles.tempRow}>
        <Thermometer size={10} color={active ? '#FFFFFF' : COLORS.textSecondary} />
        <Text style={[styles.tempText, active && styles.activeText]}>{temp}°</Text>
      </View>

      <Text style={[styles.metaText, active && styles.activeSubtext]} numberOfLines={1}>
        P: {rainProb}%
      </Text>
      <Text style={[styles.metaText, active && styles.activeSubtext]} numberOfLines={1}>
        H: {humidity}%
      </Text>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 65,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  activeCard: {
    backgroundColor: COLORS.primary,
  },
  timeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  iconContainer: {
    marginVertical: 4,
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    marginTop: 2,
  },
  tempText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
  },
  metaText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 7,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  activeText: {
    color: '#FFFFFF',
  },
  activeSubtext: {
    color: 'rgba(255, 255, 255, 0.75)',
  },
});
