import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, Pressable, TextInput } from 'react-native';
import { 
  Bell, 
  Map, 
  Moon, 
  Globe, 
  ShieldCheck, 
  HelpCircle, 
  LogOut, 
  MessageSquarePlus,
  Sliders,
  Eye,
  EyeOff,
  Key,
  Database,
  RefreshCw,
  Info
} from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { SectionHeader } from '../common/SectionHeader';

export const SettingsGrid: React.FC = () => {
  // Settings toggle states
  const [pushAlerts, setPushAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [metricUnits, setMetricUnits] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Secure API key states
  const [endpoint, setEndpoint] = useState('https://api.climate-twin.tn.gov/v1/sensory');
  const [apiKey, setApiKey] = useState('cl_sk_live_tn847391a92e105cf');
  const [showKey, setShowKey] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'verifying' | 'synced'>('idle');

  const savedLocations = ['Chennai (Coastal)', 'Nilgiris (West)', 'Vellore (North)'];

  // Handle unit system swap notification
  const handleUnitToggle = () => {
    const nextVal = !metricUnits;
    setMetricUnits(nextVal);
    setToastMessage(`Platform metrics recalibrated to ${nextVal ? 'METRIC (°C, km/h)' : 'IMPERIAL (°F, mph)'}.`);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Handle mock secure credentials syncing
  const handleSyncKeys = () => {
    if (endpoint.trim() === '' || apiKey.trim() === '') return;
    setSyncStatus('verifying');
    
    setTimeout(() => {
      setSyncStatus('synced');
    }, 1500);

    setTimeout(() => {
      setSyncStatus('idle');
    }, 4500);
  };

  return (
    <View style={styles.container}>
      
      {/* Dynamic Recalibration Toast Notification */}
      {toastMessage && (
        <GlassCard style={styles.toastBanner}>
          <Info size={16} color={COLORS.primary} style={styles.toastIcon} />
          <Text style={styles.toastText} numberOfLines={0}>
            {toastMessage}
          </Text>
        </GlassCard>
      )}

      {/* 1. Saved Monitored Locations */}
      <SectionHeader title="Monitored Locations" subtitle="Quick access nodes pinned to your map" />
      <GlassCard style={styles.card}>
        {savedLocations.map((loc, idx) => (
          <View key={`loc-${idx}`} style={[styles.itemRow, idx === savedLocations.length - 1 && styles.noBorder]}>
            <View style={styles.itemMeta}>
              <Map size={16} color={COLORS.primary} style={styles.itemIcon} />
              <Text style={styles.itemLabel} numberOfLines={0}>{loc}</Text>
            </View>
            <Text style={styles.badgeText} numberOfLines={0}>Telemetry Active</Text>
          </View>
        ))}
      </GlassCard>

      {/* 2. Secure API Credentials Config Drawer */}
      <SectionHeader title="Sensory API Credentials" subtitle="Lock secure endpoints for GIS and telemetry syncs" style={styles.sectionMargin} />
      <GlassCard style={styles.card}>
        <View style={styles.credentialForm}>
          {/* Endpoint URL input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel} numberOfLines={1}>Sensory API Endpoint</Text>
            <View style={styles.inputContainer}>
              <Database size={14} color={COLORS.textSecondary} style={styles.inputFieldIcon} />
              <TextInput
                value={endpoint}
                onChangeText={setEndpoint}
                style={styles.textInput}
                placeholder="https://api.climate-twin.tn.gov/v1/sensory"
                placeholderTextColor={COLORS.textSecondary}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Secure API Key input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel} numberOfLines={1}>Cryptographic API Key</Text>
            <View style={styles.inputContainer}>
              <Key size={14} color={COLORS.textSecondary} style={styles.inputFieldIcon} />
              <TextInput
                value={apiKey}
                onChangeText={setApiKey}
                style={styles.textInput}
                placeholder="Enter secret key credentials"
                placeholderTextColor={COLORS.textSecondary}
                secureTextEntry={!showKey}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Pressable onPress={() => setShowKey(!showKey)} style={styles.eyeBtn}>
                {showKey ? <EyeOff size={16} color={COLORS.textSecondary} /> : <Eye size={16} color={COLORS.textSecondary} />}
              </Pressable>
            </View>
          </View>

          {/* Sync validation button */}
          <Pressable 
            onPress={handleSyncKeys} 
            disabled={syncStatus === 'verifying' || endpoint.trim() === '' || apiKey.trim() === ''}
            style={[
              styles.syncButton,
              syncStatus === 'verifying' && styles.syncButtonVerifying,
              syncStatus === 'synced' && styles.syncButtonSynced
            ]}
          >
            {syncStatus === 'verifying' ? (
              <>
                <RefreshCw size={14} color="#FFFFFF" style={styles.syncIconAnim} />
                <Text style={styles.syncButtonText} numberOfLines={1}>Verifying credential digest...</Text>
              </>
            ) : syncStatus === 'synced' ? (
              <Text style={styles.syncButtonText} numberOfLines={1}>Sync Verified • 1,395 Nodes Linked</Text>
            ) : (
              <Text style={styles.syncButtonText} numberOfLines={1}>Lock & Synchronize Credentials</Text>
            )}
          </Pressable>
        </View>
      </GlassCard>

      {/* 3. Notification telemetry configurations */}
      <SectionHeader title="Warning System Alerts" subtitle="Configure real-time warning push protocols" style={styles.sectionMargin} />
      <GlassCard style={styles.card}>
        <View style={styles.itemRow}>
          <View style={styles.itemMeta}>
            <Bell size={16} color={COLORS.warning} style={styles.itemIcon} />
            <View style={styles.textCol}>
              <Text style={styles.itemLabel} numberOfLines={0}>Extreme Hazard Warnings</Text>
              <Text style={styles.itemDesc} numberOfLines={0}>Push alerts for cyclones, landslides, flooding</Text>
            </View>
          </View>
          <Switch
            value={pushAlerts}
            onValueChange={setPushAlerts}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.itemRowAlt}>
          <View style={styles.itemMeta}>
            <Bell size={16} color={COLORS.secondary} style={styles.itemIcon} />
            <View style={styles.textCol}>
              <Text style={styles.itemLabel} numberOfLines={0}>Weekly Climate Digest</Text>
              <Text style={styles.itemDesc} numberOfLines={0}>Precipitation & heat indexes compilation</Text>
            </View>
          </View>
          <Switch
            value={weeklyDigest}
            onValueChange={setWeeklyDigest}
            trackColor={{ false: COLORS.border, true: COLORS.primary }}
            thumbColor="#FFFFFF"
          />
        </View>
      </GlassCard>

      {/* 4. System Calibration Settings */}
      <SectionHeader title="System Calibration" subtitle="Configure interface units and localization" style={styles.sectionMargin} />
      <GlassCard style={styles.card}>
        <View style={styles.itemRow}>
          <View style={styles.itemMeta}>
            <Sliders size={16} color={COLORS.primary} style={styles.itemIcon} />
            <View style={styles.textCol}>
              <Text style={styles.itemLabel} numberOfLines={0}>Unit System</Text>
              <Text style={styles.itemDesc} numberOfLines={0}>Metric (°C, km/h) vs Imperial (°F, mph)</Text>
            </View>
          </View>
          <Pressable 
            onPress={handleUnitToggle}
            style={styles.togglePill}
          >
            <Text style={styles.togglePillText} numberOfLines={0}>
              {metricUnits ? 'METRIC' : 'IMPERIAL'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.itemRow}>
          <View style={styles.itemMeta}>
            <Globe size={16} color={COLORS.accent} style={styles.itemIcon} />
            <Text style={styles.itemLabel} numberOfLines={0}>Preferred Language</Text>
          </View>
          <Text style={styles.valueText} numberOfLines={0}>English (US)</Text>
        </View>

        <View style={styles.itemRowAlt}>
          <View style={styles.itemMeta}>
            <ShieldCheck size={16} color={COLORS.success} style={styles.itemIcon} />
            <Text style={styles.itemLabel} numberOfLines={0}>Privacy Protocols</Text>
          </View>
          <Text style={styles.valueText} numberOfLines={0}>Encrypted</Text>
        </View>
      </GlassCard>

      {/* 5. Support and Actions */}
      <SectionHeader title="Support & Development" subtitle="About this application" style={styles.sectionMargin} />
      <GlassCard style={styles.card}>
        <View style={styles.itemRow}>
          <View style={styles.itemMeta}>
            <HelpCircle size={16} color={COLORS.textSecondary} style={styles.itemIcon} />
            <Text style={styles.itemLabel} numberOfLines={0}>Technical Helpdesk</Text>
          </View>
        </View>

        <View style={styles.itemRow}>
          <View style={styles.itemMeta}>
            <MessageSquarePlus size={16} color={COLORS.textSecondary} style={styles.itemIcon} />
            <Text style={styles.itemLabel} numberOfLines={0}>Developer Feedback</Text>
          </View>
        </View>

        <Pressable onPress={() => {}} style={styles.itemRowAlt}>
          <View style={styles.itemMeta}>
            <LogOut size={16} color={COLORS.danger} style={styles.itemIcon} />
            <Text style={[styles.itemLabel, { color: COLORS.danger }]} numberOfLines={0}>
              Terminate Specialist Session
            </Text>
          </View>
        </Pressable>
      </GlassCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.xxxl,
  },
  sectionMargin: {
    marginTop: SPACING.xl,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.md,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  itemRowAlt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
  },
  noBorder: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: SPACING.sm,
  },
  itemIcon: {
    marginRight: SPACING.md,
  },
  itemLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  itemDesc: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  textCol: {
    flex: 1,
  },
  badgeText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.success,
    backgroundColor: 'rgba(34, 197, 94, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },
  valueText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  togglePill: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  togglePillText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: '#FFFFFF',
  },
  toastBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
    borderColor: 'rgba(37, 99, 235, 0.15)',
    borderWidth: 1,
    padding: SPACING.md,
    borderRadius: SPACING.borderRadiusMd,
    marginBottom: SPACING.md,
    gap: 8,
  },
  toastIcon: {
    marginTop: 1,
  },
  toastText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
    flex: 1,
  },
  credentialForm: {
    paddingVertical: 4,
    gap: SPACING.md,
  },
  inputWrapper: {
    gap: 6,
  },
  inputLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: COLORS.background,
    height: 38,
  },
  inputFieldIcon: {
    marginRight: 8,
  },
  textInput: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
    paddingVertical: 6,
  },
  eyeBtn: {
    padding: 4,
  },
  syncButton: {
    backgroundColor: COLORS.primary,
    height: 38,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  syncButtonVerifying: {
    backgroundColor: COLORS.secondary,
    opacity: 0.8,
  },
  syncButtonSynced: {
    backgroundColor: COLORS.success,
  },
  syncButtonText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: '#FFFFFF',
  },
  syncIconAnim: {
    marginRight: 4,
  },
});
