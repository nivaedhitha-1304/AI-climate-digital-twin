import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native';
import { Send, Mic, Square } from 'lucide-react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming 
} from 'react-native-reanimated';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

const SoundwaveBar: React.FC<{ duration: number; maxVal: number }> = ({ duration, maxVal }) => {
  const heightVal = useSharedValue(6);

  useEffect(() => {
    heightVal.value = withRepeat(
      withSequence(
        withTiming(maxVal, { duration }),
        withTiming(6, { duration })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: heightVal.value,
    };
  });

  return <Animated.View style={[styles.waveBar, animatedStyle]} />;
};

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    let timeout: any;
    if (isListening) {
      // Auto-submit a voice inquiry after 3.2 seconds
      timeout = setTimeout(() => {
        setIsListening(false);
        onSendMessage('Are there any active disaster warnings?');
      }, 3200);
    }
    return () => clearTimeout(timeout);
  }, [isListening]);

  const handleSend = () => {
    if (text.trim() === '') return;
    onSendMessage(text);
    setText('');
  };

  const toggleListening = () => {
    setIsListening(prev => !prev);
  };

  return (
    <View style={styles.floatingContainer}>
      <GlassCard style={styles.inputCapsule}>
        {/* Voice Trigger */}
        <Pressable 
          onPress={toggleListening} 
          style={[
            styles.micButton,
            isListening && styles.activeMicButton
          ]}
        >
          {isListening ? (
            <Square size={14} color="#FFFFFF" fill="#FFFFFF" />
          ) : (
            <Mic size={16} color={COLORS.textSecondary} />
          )}
        </Pressable>

        {isListening ? (
          /* Voice Soundwave Animation */
          <View style={styles.voiceWrapper}>
            <Text style={styles.voiceText} numberOfLines={1}>
              Voice Engine listening...
            </Text>
            <View style={styles.waveContainer}>
              <SoundwaveBar duration={250} maxVal={24} />
              <SoundwaveBar duration={380} maxVal={20} />
              <SoundwaveBar duration={300} maxVal={28} />
              <SoundwaveBar duration={420} maxVal={16} />
              <SoundwaveBar duration={280} maxVal={22} />
            </View>
          </View>
        ) : (
          /* Text Input */
          <TextInput
            placeholder="Ask about risks, telemetry, directives..."
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleSend}
            placeholderTextColor={COLORS.textSecondary}
            style={styles.textInput}
          />
        )}

        {/* Send Button */}
        {!isListening && (
          <Pressable 
            onPress={handleSend} 
            disabled={text.trim() === ''}
            style={[
              styles.sendButton,
              text.trim() !== '' && styles.activeSendButton
            ]}
          >
            <Send size={14} color={text.trim() !== '' ? '#FFFFFF' : COLORS.textSecondary} />
          </Pressable>
        )}
      </GlassCard>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingContainer: {
    position: 'absolute',
    bottom: SPACING.tabBarHeight + SPACING.tabBarBottomOffset + 12,
    left: 20,
    right: 20,
    zIndex: 999,
  },
  inputCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: SPACING.md,
    borderRadius: 99,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    height: 48,
  },
  micButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.xs,
    backgroundColor: COLORS.background,
  },
  activeMicButton: {
    backgroundColor: COLORS.danger,
  },
  textInput: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  voiceWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  voiceText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  waveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 32,
    width: 60,
    justifyContent: 'center',
  },
  waveBar: {
    width: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 1.5,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  activeSendButton: {
    backgroundColor: COLORS.primary,
  },
});
