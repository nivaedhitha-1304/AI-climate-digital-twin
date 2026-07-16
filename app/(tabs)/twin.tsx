import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, StatusBar, Pressable, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Sparkles, HelpCircle, MapPin, MessageSquarePlus, X, Check } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../src/theme';
import { DistrictMap } from '../../src/components/twin/DistrictMap';
import { LayerSelector } from '../../src/components/twin/LayerSelector';
import { DistrictDetailsPanel } from '../../src/components/twin/DistrictDetailsPanel';
import { DisasterRiskPanel } from '../../src/components/twin/DisasterRiskPanel';
import { TimelineScrubber, TimeHorizon } from '../../src/components/twin/TimelineScrubber';
import { AISatelliteStatus } from '../../src/components/twin/AISatelliteStatus';
import { BottomDrawer } from '../../src/components/common/BottomDrawer';
import { ALL_38_DISTRICTS, DistrictClimateData } from '../../src/mock/climateMock';
import { GlassCard } from '../../src/components/common/GlassCard';

interface ReportTypeOption {
  id: string;
  name: string;
  icon: string;
}

const REPORT_TYPES: ReportTypeOption[] = [
  { id: 'fld', name: 'Flood Inundation', icon: '🌊' },
  { id: 'hrn', name: 'Heavy Rain', icon: '🌧️' },
  { id: 'trf', name: 'Tree Fall Blockage', icon: '🌳' },
  { id: 'wtl', name: 'Waterlogging', icon: '💧' },
  { id: 'cyd', name: 'Cyclone Damage', icon: '🌀' },
  { id: 'coe', name: 'Coastal Erosion', icon: '🏖️' },
  { id: 'ddf', name: 'Dead Fish Anomaly', icon: '🐟' },
];

export default function TwinScreen() {
  // Initialize to Chennai district by default
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictClimateData | null>(ALL_38_DISTRICTS[0]);
  const [activeLayers, setActiveLayers] = useState<string[]>(['temp']);
  const [opacity, setOpacity] = useState<number>(0.75);
  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('now');
  const [simulationYear, setSimulationYear] = useState<2030 | 2040 | 2050>(2030);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true); // Open initially to show default selection

  // Citizen reporting modal state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportingDistrict, setReportingDistrict] = useState<DistrictClimateData | null>(null);
  const [selectedReportType, setSelectedReportType] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

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

  const handleOpenReportModal = () => {
    setReportingDistrict(selectedDistrict || ALL_38_DISTRICTS[0]);
    setSelectedReportType(null);
    setIsReportModalOpen(true);
  };

  const handleSubmitReport = () => {
    if (!selectedReportType) return;
    setIsReportModalOpen(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
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

      {/* Floating Action Button (FAB) for Citizen Reporting */}
      <Pressable 
        style={styles.fabBtn} 
        onPress={handleOpenReportModal}
      >
        <MessageSquarePlus size={20} color="#FFFFFF" />
        <Text style={styles.fabText} numberOfLines={1}>Report Incident</Text>
      </Pressable>

      {/* Citizen Reporting Modal */}
      <Modal
        visible={isReportModalOpen}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsReportModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <GlassCard style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleRow}>
                <MessageSquarePlus size={18} color={COLORS.primary} />
                <Text style={styles.modalTitle}>Citizen Environmental Report</Text>
              </View>
              <Pressable onPress={() => setIsReportModalOpen(false)} style={styles.modalCloseBtn}>
                <X size={16} color={COLORS.textSecondary} />
              </Pressable>
            </View>

            <Text style={styles.modalSubtitle}>
              Target Node: <Text style={styles.modalScopeBold}>{reportingDistrict?.name || 'All Districts'}</Text>
            </Text>

            <Text style={styles.modalSectionLabel}>SELECT ANOMALY INCIDENT TYPE</Text>
            
            <FlatList
              data={REPORT_TYPES}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => {
                const isSelected = selectedReportType === item.id;
                return (
                  <Pressable
                    style={[
                      styles.reportTypeBtn,
                      isSelected && styles.reportTypeBtnActive
                    ]}
                    onPress={() => setSelectedReportType(item.id)}
                  >
                    <Text style={styles.reportTypeIcon}>{item.icon}</Text>
                    <Text style={[styles.reportTypeName, isSelected && styles.reportTypeNameActive]}>
                      {item.name}
                    </Text>
                    {isSelected && (
                      <View style={styles.selectedCircle}>
                        <Check size={10} color="#FFFFFF" />
                      </View>
                    )}
                  </Pressable>
                );
              }}
            />

            <Pressable
              style={[
                styles.submitBtn,
                !selectedReportType && styles.submitBtnDisabled
              ]}
              onPress={handleSubmitReport}
              disabled={!selectedReportType}
            >
              <Text style={styles.submitBtnText}>Submit Ground Truth Report</Text>
            </Pressable>
          </GlassCard>
        </View>
      </Modal>

      {/* Success Toast */}
      {showSuccessToast && (
        <View style={styles.toastContainer}>
          <Check size={14} color="#FFFFFF" />
          <Text style={styles.toastText} numberOfLines={1}>
            Incident successfully reported. Spatial mesh sync active.
          </Text>
        </View>
      )}

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
    height: 140,
  },
  fabBtn: {
    position: 'absolute',
    bottom: 110,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 99,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    gap: 6,
    zIndex: 999,
  },
  fabText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.4)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderColor: COLORS.border,
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  modalTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 13,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.textPrimary,
  },
  modalCloseBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  modalScopeBold: {
    color: COLORS.primary,
    fontWeight: TYPOGRAPHY.weights.heavy,
  },
  modalSectionLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.heavy,
    color: COLORS.primary,
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  reportTypeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 6,
    gap: 10,
  },
  reportTypeBtnActive: {
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
    borderColor: COLORS.primary,
  },
  reportTypeIcon: {
    fontSize: 14,
  },
  reportTypeName: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
    flex: 1,
  },
  reportTypeNameActive: {
    color: COLORS.primary,
  },
  selectedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  submitBtnDisabled: {
    backgroundColor: COLORS.border,
  },
  submitBtnText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 10,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: '#FFFFFF',
  },
  toastContainer: {
    position: 'absolute',
    bottom: 160,
    left: 24,
    right: 24,
    backgroundColor: '#1E293B',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    zIndex: 9999,
  },
  toastText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: '#FFFFFF',
  },
});
