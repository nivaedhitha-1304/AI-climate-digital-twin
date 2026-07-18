import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, KeyboardAvoidingView, Platform, StatusBar, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Cpu, MapPin } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../src/theme';
import { ChatBubbles, Message } from '../../src/components/assistant/ChatBubbles';
import { SuggestedQueries } from '../../src/components/assistant/SuggestedQueries';
import { ChatInput } from '../../src/components/assistant/ChatInput';
import { ALL_38_DISTRICTS, DistrictClimateData, generateDynamicAIResponse } from '../../src/mock/climateMock';
import { useApp } from '../../src/context/AppContext';

export default function AssistantScreen() {
  const { selectedDistrict, setSelectedDistrict, t } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-init',
      sender: 'ai',
      text: 'Greetings. I am the Climate Twin AI Assistant. Select a district below to activate localized context-aware telemetry, click a suggested query, or type your custom inquiry.',
      timestamp: 'Just Now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('Initializing search...');
  const flatListRef = useRef<FlatList>(null);

  // Auto scroll to bottom of chat
  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    const userMsg: Message = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setTypingText('Reading sensory nodes...');

    // Progress step animations
    const steps = [
      { text: 'Accessing regional telemetry database...', delay: 600 },
      { text: 'Synthesizing climate models...', delay: 1300 },
      { text: 'Compiling predictive directives...', delay: 2000 },
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setTypingText(step.text);
      }, step.delay);
    });

    // Mock AI analysis typing delay
    setTimeout(() => {
      const response = generateDynamicAIResponse(text, selectedDistrict);

      const aiMsg: Message = {
        id: `msg-ai-${Date.now()}`,
        sender: 'ai',
        text: response.text,
        cardData: response.cardData,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    }, 2600);
  };

  const selectDistrictContext = (district: DistrictClimateData | null) => {
    setSelectedDistrict(district);
    
    // Inject a system notice indicating the change of context
    const systemNoticeText = district 
      ? `System Context Sync: Active target set to **${district.name}**.` 
      : 'System Context Sync: Active target set to **All Tamil Nadu**.';
      
    const noticeMsg: Message = {
      id: `msg-notice-${Date.now()}`,
      sender: 'ai',
      text: systemNoticeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages((prev) => [...prev, noticeMsg]);
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Header Title */}
        <View style={styles.headerContainer}>
          <View style={styles.titleWrapper}>
            <Cpu size={22} color={COLORS.primary} />
            <Text style={styles.titleText} numberOfLines={0}>
              {t('tab.assistant')}
            </Text>
          </View>
          <Text style={styles.subtitleText} numberOfLines={0}>
            Spatially integrated LLM for district telemetry queries
          </Text>
        </View>

        {/* Dynamic District Context Selector */}
        <View style={styles.contextContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contextScroll}
          >
            {/* Global option */}
            <Pressable
              onPress={() => selectDistrictContext(null)}
              style={[
                styles.contextChip,
                selectedDistrict === null && styles.activeContextChip
              ]}
            >
              <MapPin size={12} color={selectedDistrict === null ? '#FFFFFF' : COLORS.textSecondary} />
              <Text 
                style={[
                  styles.contextChipText,
                  selectedDistrict === null && styles.activeContextChipText
                ]}
                numberOfLines={1}
              >
                All Tamil Nadu
              </Text>
            </Pressable>

            {/* List of 38 districts */}
            {ALL_38_DISTRICTS.map((d) => {
              const isSelected = selectedDistrict?.id === d.id;
              return (
                <Pressable
                  key={d.id}
                  onPress={() => selectDistrictContext(d)}
                  style={[
                    styles.contextChip,
                    isSelected && styles.activeContextChip
                  ]}
                >
                  <MapPin size={12} color={isSelected ? '#FFFFFF' : COLORS.textSecondary} />
                  <Text 
                    style={[
                      styles.contextChipText,
                      isSelected && styles.activeContextChipText
                    ]}
                    numberOfLines={1}
                  >
                    {d.name}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* FlatList combining Suggested prompts & Chat history */}
        <FlatList
          ref={flatListRef}
          data={[{ type: 'header' }, { type: 'chat' }]}
          keyExtractor={(_, index) => `item-${index}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          renderItem={({ item }) => {
            if (item.type === 'header') {
              return (
                <SuggestedQueries 
                  onSelectQuery={handleSendMessage} 
                />
              );
            }
            return (
              <ChatBubbles 
                messages={messages} 
                isTyping={isTyping}
                typingText={typingText}
              />
            );
          }}
          ListFooterComponent={<View style={styles.chatFooterSpacer} />}
        />

        {/* Floating Input Capsule */}
        <ChatInput onSendMessage={handleSendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingHorizontal: SPACING.horizontalPadding,
    paddingTop: 12,
    paddingBottom: 4,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  subtitleText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  contextContainer: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 8,
  },
  contextScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  contextChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 99,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  activeContextChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  contextChipText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  activeContextChipText: {
    color: '#FFFFFF',
  },
  chatFooterSpacer: {
    height: 160,
  },
});
