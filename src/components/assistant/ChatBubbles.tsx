import React, { useEffect } from 'react';
import { StyleSheet, View, Text, useWindowDimensions } from 'react-native';
import Animated, { 
  SharedValue,
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming 
} from 'react-native-reanimated';
import { Sparkles, User } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';

export interface CardMetric {
  label: string;
  value: string;
  icon?: string;
  color?: string;
}

export interface MessageCardData {
  type: 'telemetry' | 'alert' | 'advisory';
  title: string;
  metrics: CardMetric[];
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  cardData?: MessageCardData;
}

interface ChatBubblesProps {
  messages: Message[];
  isTyping: boolean;
  typingText?: string;
}

// Bouncing Dots Typing Animation
const TypingIndicator: React.FC = () => {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    const startAnim = (val: SharedValue<number>, delay: number) => {
      val.value = withRepeat(
        withSequence(
          withTiming(-6, { duration: 400 }),
          withTiming(0, { duration: 400 })
        ),
        -1,
        true
      );
    };

    setTimeout(() => startAnim(dot1, 0), 0);
    setTimeout(() => startAnim(dot2, 200), 200);
    setTimeout(() => startAnim(dot3, 400), 400);
  }, []);

  const style1 = useAnimatedStyle(() => ({ transform: [{ translateY: dot1.value }] }));
  const style2 = useAnimatedStyle(() => ({ transform: [{ translateY: dot2.value }] }));
  const style3 = useAnimatedStyle(() => ({ transform: [{ translateY: dot3.value }] }));

  return (
    <View style={styles.typingContainer}>
      <Animated.View style={[styles.typingDot, style1]} />
      <Animated.View style={[styles.typingDot, style2]} />
      <Animated.View style={[styles.typingDot, style3]} />
    </View>
  );
};

export const ChatBubbles: React.FC<ChatBubblesProps> = ({ messages, isTyping, typingText }) => {
  const { width } = useWindowDimensions();
  const maxBubbleWidth = width * 0.82;

  return (
    <View style={styles.container}>
      {messages.map((msg) => {
        const isAI = msg.sender === 'ai';
        return (
          <View 
            key={msg.id} 
            style={[
              styles.messageRow, 
              isAI ? styles.rowAI : styles.rowUser
            ]}
          >
            {/* Avatar Column */}
            {isAI && (
              <View style={[styles.avatarBox, styles.avatarAI]}>
                <Sparkles size={12} color="#FFFFFF" />
              </View>
            )}

            {/* Bubble Message */}
            <View style={{ maxWidth: maxBubbleWidth }}>
              <GlassCard 
                style={[
                  styles.bubble,
                  isAI ? styles.bubbleAI : styles.bubbleUser
                ]}
              >
                <Text 
                  style={[
                    styles.messageText,
                    isAI ? styles.textAI : styles.textUser
                  ]}
                  numberOfLines={0}
                >
                  {msg.text}
                </Text>

                {/* Optional nested telemetry/hazard card */}
                {isAI && msg.cardData && (
                  <View style={styles.cardContainer}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle} numberOfLines={1}>
                        {msg.cardData.title}
                      </Text>
                    </View>
                    <View style={styles.metricsGrid}>
                      {msg.cardData.metrics.map((metric, mIdx) => (
                        <View key={`metric-${mIdx}`} style={styles.metricItem}>
                          <Text style={styles.metricIcon}>{metric.icon || '📊'}</Text>
                          <View style={styles.metricTexts}>
                            <Text style={styles.metricLabel} numberOfLines={1}>{metric.label}</Text>
                            <Text 
                              style={[
                                styles.metricValue,
                                metric.color ? { color: metric.color } : null
                              ]}
                              numberOfLines={1}
                            >
                              {metric.value}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                )}
              </GlassCard>
              <Text 
                style={[
                  styles.timestampText,
                  isAI ? styles.timeAI : styles.timeUser
                ]}
                numberOfLines={0}
              >
                {msg.timestamp}
              </Text>
            </View>

            {/* User Avatar */}
            {!isAI && (
              <View style={[styles.avatarBox, styles.avatarUser]}>
                <User size={12} color="#FFFFFF" />
              </View>
            )}
          </View>
        );
      })}

      {/* Typing State bubble */}
      {isTyping && (
        <View style={[styles.messageRow, styles.rowAI]}>
          <View style={[styles.avatarBox, styles.avatarAI]}>
            <Sparkles size={12} color="#FFFFFF" />
          </View>
          <GlassCard style={[styles.bubble, styles.bubbleAI]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <TypingIndicator />
              {typingText && (
                <Text style={{ fontFamily: TYPOGRAPHY.fontFamily, fontSize: 8, color: COLORS.textSecondary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.2 }}>
                  {typingText}
                </Text>
              )}
            </View>
          </GlassCard>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.horizontalPadding,
    gap: SPACING.md,
    paddingVertical: SPACING.md,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 4,
    gap: 8,
  },
  rowAI: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  rowUser: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  avatarBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarAI: {
    backgroundColor: COLORS.primary,
  },
  avatarUser: {
    backgroundColor: COLORS.secondary,
  },
  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: SPACING.borderRadiusMd,
  },
  bubbleAI: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    borderWidth: 1,
    borderBottomLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 4,
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  messageText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    lineHeight: 16,
  },
  textAI: {
    color: COLORS.textPrimary,
  },
  textUser: {
    color: '#FFFFFF',
  },
  timestampText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  timeAI: {
    alignSelf: 'flex-start',
    marginLeft: 4,
  },
  timeUser: {
    alignSelf: 'flex-end',
    marginRight: 4,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 40,
    height: 12,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textSecondary,
  },
  cardContainer: {
    marginTop: 10,
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    width: '100%',
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 6,
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: '700',
    color: '#1E293B',
    textTransform: 'uppercase',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  metricItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  metricIcon: {
    fontSize: 12,
  },
  metricTexts: {
    flex: 1,
  },
  metricLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 7,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  metricValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginTop: 1,
  },
});
