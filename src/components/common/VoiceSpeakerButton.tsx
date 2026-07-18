import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Volume2, VolumeX } from 'lucide-react-native';
import { COLORS } from '../../theme';
import { useApp } from '../../context/AppContext';

interface VoiceSpeakerButtonProps {
  textToRead: string;
  size?: number;
}

export const VoiceSpeakerButton: React.FC<VoiceSpeakerButtonProps> = ({ textToRead, size = 18 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { t } = useApp();

  const handlePress = () => {
    // UI-only state toggle as specified in prompt (§11.3)
    setIsPlaying(!isPlaying);
  };

  return (
    <Pressable 
      onPress={handlePress}
      style={[
        styles.container,
        isPlaying && styles.containerActive
      ]}
      accessibilityRole="button"
      accessibilityLabel={isPlaying ? "Stop reading aloud" : "Read description aloud"}
      accessibilityHint={`Reads out: ${textToRead.slice(0, 30)}...`}
    >
      {isPlaying ? (
        <VolumeX size={size} color={COLORS.primary} />
      ) : (
        <Volume2 size={size} color={COLORS.textSecondary} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(226, 232, 240, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerActive: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
  },
});
