import React from 'react';
import { ScrollView, StyleSheet, View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../src/theme';
import { ProfileHeader } from '../../src/components/profile/ProfileHeader';
import { SettingsGrid } from '../../src/components/profile/SettingsGrid';
import { useApp } from '../../src/context/AppContext';

export default function ProfileScreen() {
  const { t } = useApp();

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Scrollable Settings Panel */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Title */}
        <View style={styles.headerContainer}>
          <View style={styles.titleWrapper}>
            <Settings size={22} color={COLORS.primary} />
            <Text style={styles.titleText} numberOfLines={0}>
              {t('tab.profile')}
            </Text>
          </View>
          <Text style={styles.subtitleText} numberOfLines={0}>
            Configure warning notifications, calibrations, and access credentials
          </Text>
        </View>

        {/* 1. Specialist visual avatar header */}
        <ProfileHeader />

        {/* 2. Interactive settings selections */}
        <SettingsGrid />

        {/* Spacer buffer to offset bottom capsule navigation */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    paddingHorizontal: SPACING.horizontalPadding,
    paddingTop: 12,
    paddingBottom: SPACING.xs,
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
  bottomSpacer: {
    height: 100,
  },
});
