import React from 'react';
import { StyleSheet, View, Text, Pressable, useWindowDimensions } from 'react-native';
import { MessageSquare, ArrowRight } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { SUGGESTED_PROMPTS } from '../../mock/climateMock';

interface SuggestedQueriesProps {
  onSelectQuery: (query: string) => void;
}

export const SuggestedQueries: React.FC<SuggestedQueriesProps> = ({ onSelectQuery }) => {
  const { width } = useWindowDimensions();
  const numColumns = width > 768 ? 2 : 1;

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle} numberOfLines={0}>
        Suggested Inquiry Telemetries
      </Text>
      <Text style={styles.headerSubtitle} numberOfLines={0}>
        Select a query parameter below to query the AI Climate Engine
      </Text>

      <View style={[styles.grid, numColumns === 2 && styles.gridTablet]}>
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <Pressable
            key={`prompt-${idx}`}
            onPress={() => onSelectQuery(prompt)}
            style={[styles.pressable, numColumns === 2 && styles.pressableTablet]}
          >
            <GlassCard style={styles.card}>
              <View style={styles.cardHeader}>
                <MessageSquare size={14} color={COLORS.primary} />
                <ArrowRight size={12} color={COLORS.textSecondary} />
              </View>
              <Text style={styles.promptText} numberOfLines={0}>
                {prompt}
              </Text>
            </GlassCard>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.lg,
    marginTop: SPACING.md,
  },
  headerTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    marginTop: 2,
  },
  grid: {
    flexDirection: 'column',
    gap: 8,
  },
  gridTablet: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pressable: {
    width: '100%',
  },
  pressableTablet: {
    width: '49%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.md,
    borderRadius: SPACING.borderRadiusMd,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  promptText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    lineHeight: 14,
  },
});
