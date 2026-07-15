import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { Bell, MapPin } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { IconButton } from '../common/Buttons';

export const PremiumHeader: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Formatting time: HH:mm:ss
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);

      // Formatting date: Month Day, Year (e.g. July 9, 2026)
      const options: Intl.DateTimeFormatOptions = { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      };
      setCurrentDate(now.toLocaleDateString('en-US', options));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.headerContainer}>
      <View style={styles.leftColumn}>
        <Text style={styles.appName} numberOfLines={0}>
          Climate Digital Twin
        </Text>
        <Text style={styles.tagline} numberOfLines={0}>
          AI Climate Intelligence Platform
        </Text>
        
        <View style={styles.metaRow}>
          <View style={styles.locationWrapper}>
            <MapPin size={12} color={COLORS.primary} style={styles.mapIcon} />
            <Text style={styles.locationText} numberOfLines={0}>
              Tamil Nadu, IN
            </Text>
          </View>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.dateTimeText} numberOfLines={0}>
            {currentDate} • <Text style={styles.tickingClock}>{currentTime}</Text>
          </Text>
        </View>
      </View>

      <View style={styles.rightColumn}>
        <IconButton
          icon={<Bell size={20} color={COLORS.textPrimary} />}
          onPress={() => {}}
          style={styles.actionBtn}
        />
        <View style={styles.avatarWrapper}>
          <Text style={styles.avatarText}>CD</Text>
          <View style={styles.onlineIndicator} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.horizontalPadding,
    paddingTop: Platform.OS === 'ios' ? 12 : 24,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.background,
  },
  leftColumn: {
    flex: 1,
    paddingRight: SPACING.sm,
  },
  appName: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xl,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
    flexWrap: 'wrap',
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapIcon: {
    marginRight: 4,
  },
  locationText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.primary,
  },
  separator: {
    marginHorizontal: 8,
    color: COLORS.border,
    fontSize: TYPOGRAPHY.sizes.xs,
  },
  dateTimeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
  },
  tickingClock: {
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionBtn: {
    backgroundColor: '#FFFFFF',
  },
  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    position: 'relative',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
