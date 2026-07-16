import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { 
  DropletOff, 
  CloudRain, 
  UserX, 
  Wind, 
  Anchor, 
  AlertCircle 
} from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from './GlassCard';

export type RecommendationPriority = 'Low' | 'Moderate' | 'High' | 'Severe';

interface RecommendationCardProps {
  title: string;
  description: string;
  type: 'irrigation' | 'rain' | 'work' | 'wind' | 'fishing' | 'general';
  priority: RecommendationPriority;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  description,
  type,
  priority,
}) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'Low':
        return '#22C55E';
      case 'Moderate':
        return '#F59E0B';
      case 'High':
        return '#EA580C';
      case 'Severe':
        return '#EF4444';
      default:
        return COLORS.primary;
    }
  };

  const renderIcon = () => {
    const color = getPriorityColor();
    const size = 18;
    switch (type) {
      case 'irrigation':
        return <DropletOff size={size} color={color} />;
      case 'rain':
        return <CloudRain size={size} color={color} />;
      case 'work':
        return <UserX size={size} color={color} />;
      case 'wind':
        return <Wind size={size} color={color} />;
      case 'fishing':
        return <Anchor size={size} color={color} />;
      default:
        return <AlertCircle size={size} color={color} />;
    }
  };

  const accentColor = getPriorityColor();

  return (
    <GlassCard style={[styles.card, { borderLeftColor: accentColor }]}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <View style={styles.textContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View style={[styles.badge, { backgroundColor: `${accentColor}15` }]}>
            <Text style={[styles.badgeText, { color: accentColor }]}>
              {priority.toUpperCase()}
            </Text>
          </View>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </GlassCard>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    borderWidth: 1,
    borderLeftWidth: 4,
    borderRadius: SPACING.borderRadiusMd,
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  title: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 12,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    flex: 1,
    marginRight: 6,
  },
  badge: {
    paddingVertical: 1,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  badgeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 7,
    fontWeight: TYPOGRAPHY.weights.heavy,
    letterSpacing: 0.2,
  },
  description: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    lineHeight: 13,
  },
});
