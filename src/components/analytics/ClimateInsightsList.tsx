import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Newspaper, Lightbulb, ArrowUpRight } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { SectionHeader } from '../common/SectionHeader';

interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  snippet: string;
}

interface AwarenessItem {
  id: string;
  title: string;
  impact: string;
  tip: string;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 'n1',
    title: 'State Approves Coastal Blue Carbon Initiative',
    source: 'TN Env Monitor',
    time: '4 Hours Ago',
    snippet: 'A new mangrove conservation plan covering 14 coastal districts is projected to sequester 1.2 million tons of carbon by 2030.',
  },
  {
    id: 'n2',
    title: 'IMD Anticipates Extended Monsoonal Ingress',
    source: 'National Weather Bureau',
    time: '1 Day Ago',
    snippet: 'Sustained Indian Ocean dipoles are likely to extend wet spells along the Western Ghats into late August.',
  },
];

const AWARENESS_DATA: AwarenessItem[] = [
  {
    id: 'a1',
    title: 'Groundwater Recharging',
    impact: 'Reduces agricultural runoff by 60%',
    tip: 'Constructing recharge shafts in sandy soils intercepts rainfall runoff and pushes water back to dry shallow aquifers.',
  },
  {
    id: 'a2',
    title: 'Low-Carbon Paddy Farming',
    impact: 'Cuts agricultural methane emissions by 35%',
    tip: 'Alternating wet and dry irrigation cycles in rice paddies decreases anaerobic soil bacteria activity without losing crop yield.',
  },
];

export const ClimateInsightsList: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* News Section */}
      <SectionHeader title="Climate Intelligence News" subtitle="Recent environmental updates in the region" />
      
      <View style={styles.list}>
        {NEWS_DATA.map((news) => (
          <GlassCard key={news.id} style={styles.newsCard}>
            <View style={styles.newsHeader}>
              <View style={styles.newsMeta}>
                <Newspaper size={14} color={COLORS.primary} />
                <Text style={styles.newsSource} numberOfLines={0}>
                  {news.source} • {news.time}
                </Text>
              </View>
              <ArrowUpRight size={14} color={COLORS.textSecondary} />
            </View>
            
            <Text style={styles.newsTitle} numberOfLines={0}>
              {news.title}
            </Text>
            
            <Text style={styles.newsSnippet} numberOfLines={0}>
              {news.snippet}
            </Text>
          </GlassCard>
        ))}
      </View>

      {/* Awareness Tips Section */}
      <SectionHeader title="Eco-Stewardship Bulletins" subtitle="Actionable science-based climate preservation guides" style={styles.sectionMargin} />
      
      <View style={styles.list}>
        {AWARENESS_DATA.map((item) => (
          <GlassCard key={item.id} style={styles.awarenessCard}>
            <View style={styles.awarenessHeader}>
              <View style={styles.bulbIconBox}>
                <Lightbulb size={16} color="#EAB308" />
              </View>
              <View style={styles.awarenessHeaderCol}>
                <Text style={styles.awarenessTitle} numberOfLines={0}>
                  {item.title}
                </Text>
                <Text style={styles.impactText} numberOfLines={0}>
                  Impact: {item.impact}
                </Text>
              </View>
            </View>

            <Text style={styles.awarenessTip} numberOfLines={0}>
              {item.tip}
            </Text>
          </GlassCard>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.xxxl,
  },
  list: {
    gap: SPACING.cardToCard,
  },
  sectionMargin: {
    marginTop: SPACING.xl,
  },
  newsCard: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  newsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  newsSource: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  newsTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  newsSnippet: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    lineHeight: 14,
  },
  awarenessCard: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.lg,
  },
  awarenessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  bulbIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(234, 179, 8, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  awarenessHeaderCol: {
    flex: 1,
  },
  awarenessTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  impactText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.success,
    marginTop: 2,
  },
  awarenessTip: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    lineHeight: 14,
  },
});
