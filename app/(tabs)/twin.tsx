import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, StatusBar, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, HelpCircle, MapPin } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../src/theme';
import { DistrictMap } from '../../src/components/twin/DistrictMap';
import { LayerSelector } from '../../src/components/twin/LayerSelector';
import { DistrictDetailsPanel } from '../../src/components/twin/DistrictDetailsPanel';
import { DisasterRiskPanel } from '../../src/components/twin/DisasterRiskPanel';
import { TimelineScrubber, TimeHorizon } from '../../src/components/twin/TimelineScrubber';
import { AISatelliteStatus } from '../../src/components/twin/AISatelliteStatus';
import { BottomDrawer } from '../../src/components/common/BottomDrawer';
import { ALL_38_DISTRICTS, DistrictClimateData } from '../../src/mock/climateMock';

export default function TwinScreen() {
  // Initialize to Chennai district by default
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictClimateData | null>(ALL_38_DISTRICTS[0]);
  const [activeLayers, setActiveLayers] = useState<string[]>(['temp']);
  const [opacity, setOpacity] = useState<number>(0.75);
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('now');
  const [simulationYear, setSimulationYear] = useState<2030 | 2040 | 2050>(2030);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true); // Open initially to show default selection

  const handleSelectDistrict = (district: DistrictClimateData | null) => {
    setSelectedDistrict(district);
    if (district) {
      setIsDrawerOpen(true);
    } else {
      setIsDrawerOpen(false);
    }
  };

  const handleToggleLayer = (layerId: string) => {
    setActiveLayers(prev => {
      // Toggle logic: keep single active layer overlay on map at a time for optimal visual clarity
      return prev.includes(layerId) ? prev.filter(id => id !== layerId) : [layerId];
    });
  };

  return (
    <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Scrollable GIS Terminal Dashboard */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Flagship Header */}
        <View style={styles.headerContainer}>
          <View style={styles.titleWrapper}>
            <Sparkles size={20} color={COLORS.primary} />
            <Text style={styles.titleText} numberOfLines={0}>
              GIS Climate Twin
            </Text>
          </View>
          <Text style={styles.subtitleText} numberOfLines={0}>
            Interactive spatial-mesh modeling of Tamil Nadu districts
          </Text>
        </View>

        {/* 1. Clickable Vector Geographic Map with Zoom/Pan */}
        <DistrictMap
          selectedDistrict={selectedDistrict}
          onSelectDistrict={handleSelectDistrict}
          activeLayers={activeLayers}
          opacity={opacity}
          timeHorizon={timeHorizon}
          simulationYear={simulationYear}
        />

        {/* 2. Timeline Scrubbing Control */}
        <TimelineScrubber 
          value={timeHorizon} 
          onChange={setTimeHorizon} 
          simulationYear={simulationYear}
          onChangeSimulationYear={setSimulationYear}
        />

        {/* 3. GIS Layer selector controls */}
        <LayerSelector
          activeLayers={activeLayers}
          onToggleLayer={handleToggleLayer}
          opacity={opacity}
          onChangeOpacity={setOpacity}
        />

        {/* 4. Drawer trigger button if closed but district selected */}
        {selectedDistrict && !isDrawerOpen && (
          <Pressable 
            style={styles.drawerTriggerBtn} 
            onPress={() => setIsDrawerOpen(true)}
          >
            <MapPin size={16} color="#FFFFFF" />
            <Text style={styles.drawerTriggerText} numberOfLines={0}>
              Open {selectedDistrict.name} Diagnostics
            </Text>
          </Pressable>
        )}

        {/* 5. Fallback instruction message if no district is selected */}
        {!selectedDistrict && (
          <View style={styles.fallbackContainer}>
            <HelpCircle size={32} color={COLORS.textSecondary} />
            <Text style={styles.fallbackText} numberOfLines={0}>
              Select a district node on the GIS map to load detailed environmental parameters
            </Text>
          </View>
        )}

        {/* 6. Satellite Status Matrix */}
        <AISatelliteStatus />

        {/* Floating Capsule space buffer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Reusable gesture Bottom Sheet for detail panels */}
      <BottomDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={`${selectedDistrict?.name || 'District'} Diagnosis`}
      >
        {selectedDistrict && (
          <View style={styles.drawerInner}>
            <DistrictDetailsPanel 
              district={selectedDistrict} 
              timeHorizon={timeHorizon}
              simulationYear={simulationYear}
            />

            <DisasterRiskPanel 
              district={selectedDistrict} 
              timeHorizon={timeHorizon}
              simulationYear={simulationYear}
            />
          </View>
        )}
      </BottomDrawer>
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
    paddingBottom: SPACING.md,
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
  fallbackContainer: {
    marginHorizontal: SPACING.horizontalPadding,
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: SPACING.borderRadiusLg,
    padding: SPACING.xxxl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.sectionToSection,
  },
  fallbackText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  drawerTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    marginBottom: SPACING.sectionToSection,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  drawerTriggerText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.sm,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: '#FFFFFF',
  },
  drawerInner: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bottomSpacer: {
    height: 100,
  },
});
