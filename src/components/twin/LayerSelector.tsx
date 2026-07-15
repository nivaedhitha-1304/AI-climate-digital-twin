import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { Layers, HelpCircle, Activity } from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';

interface LayerSelectorProps {
  activeLayers: string[];
  onToggleLayer: (layerId: string) => void;
  opacity: number;
  onChangeOpacity: (opacity: number) => void;
}

interface LayerItem {
  id: string;
  name: string;
  icon: string;
  desc: string;
  legend: { colors: string[]; labels: string[] };
}

interface LayerCategory {
  id: 'atmospheric' | 'marine' | 'hazards' | 'prediction';
  name: string;
  items: LayerItem[];
}

const CATEGORIZED_LAYERS: LayerCategory[] = [
  {
    id: 'atmospheric',
    name: 'Atmospheric',
    items: [
      {
        id: 'temp',
        name: 'Temperature',
        icon: '🌡️',
        desc: 'Localized surface thermal profile tracking ambient heat waves.',
        legend: {
          colors: [COLORS.accent, COLORS.secondary, COLORS.warning, COLORS.danger],
          labels: ['<25°C', '28°C', '33°C', '40°C+'],
        },
      },
      {
        id: 'rain',
        name: 'Rainfall',
        icon: '🌧️',
        desc: 'Precipitation volume maps dynamically updating based on Doppler feedback.',
        legend: {
          colors: ['#93C5FD', COLORS.secondary, COLORS.primary, '#1D4ED8'],
          labels: ['Drizzle', 'Moderate', 'Heavy', 'Torrential'],
        },
      },
      {
        id: 'humidity',
        name: 'Humidity',
        icon: '💧',
        desc: 'Atmospheric moisture saturation levels.',
        legend: {
          colors: ['#E2E8F0', '#93C5FD', COLORS.secondary, COLORS.primary],
          labels: ['Dry (<30%)', 'Comfortable', 'Humid', 'Saturated (>90%)'],
        },
      },
      {
        id: 'wind',
        name: 'Wind Flow',
        icon: '💨',
        desc: 'Vector velocities and direction vectors of wind currents.',
        legend: {
          colors: ['#F1F5F9', '#93C5FD', COLORS.secondary, '#1E3A8A'],
          labels: ['Calm', 'Breeze', 'Gale', 'Storm'],
        },
      },
      {
        id: 'aqi',
        name: 'Air Quality (AQI)',
        icon: '🌫️',
        desc: 'Concentrations of PM2.5 and primary pollutants.',
        legend: {
          colors: [COLORS.success, COLORS.warning, COLORS.danger],
          labels: ['Good (<50)', 'Moderate', 'Unhealthy (>100)'],
        },
      },
    ],
  },
  {
    id: 'marine',
    name: 'Marine Intel',
    items: [
      {
        id: 'sst',
        name: 'Sea Surface Temp',
        icon: '🌊',
        desc: 'Ocean surface thermal modeling to identify warming pockets.',
        legend: {
          colors: ['#1D4ED8', COLORS.accent, COLORS.warning, COLORS.danger],
          labels: ['24°C', '27°C', '30°C', '33°C+'],
        },
      },
      {
        id: 'wave',
        name: 'Wave Height',
        icon: '🏄‍♂️',
        desc: 'Wave amplitude estimations and ocean roughness indices.',
        legend: {
          colors: ['#93C5FD', COLORS.secondary, COLORS.primary, '#1E3A8A'],
          labels: ['Calm (<1m)', 'Moderate', 'Rough (>3m)', 'Hazardous'],
        },
      },
      {
        id: 'oceanCurrent',
        name: 'Ocean Current',
        icon: '🔄',
        desc: 'Speed and direction vectors of surface marine currents.',
        legend: {
          colors: ['#F1F5F9', '#93C5FD', COLORS.primary],
          labels: ['Slow', 'Moderate', 'Fast (>1.5m/s)'],
        },
      },
      {
        id: 'tide',
        name: 'Tide Level',
        icon: '📈',
        desc: 'Tidal deviations relative to Mean Sea Level.',
        legend: {
          colors: ['#E2E8F0', COLORS.accent, COLORS.primary],
          labels: ['Low Tide', 'Mean', 'High Tide'],
        },
      },
      {
        id: 'coastalWind',
        name: 'Coastal Wind',
        icon: '🍃',
        desc: 'Land-sea breeze telemetry specifically along shorelines.',
        legend: {
          colors: ['#F1F5F9', COLORS.secondary, COLORS.danger],
          labels: ['Calm', 'Breeze', 'Gale (>50km/h)'],
        },
      },
      {
        id: 'cycloneTrack',
        name: 'Cyclone Track',
        icon: '🌀',
        desc: 'Bay of Bengal tropical cyclone storm center tracking projection.',
        legend: {
          colors: [COLORS.success, COLORS.warning, COLORS.danger],
          labels: ['Potential', 'Active Depr', 'Landfall Path'],
        },
      },
      {
        id: 'stormSurge',
        name: 'Storm Surge Risk',
        icon: '🌪️',
        desc: 'Predicted marine volume lift above tidal baselines.',
        legend: {
          colors: [COLORS.success, COLORS.warning, '#EA580C', COLORS.danger],
          labels: ['Low (<0.5m)', 'Moderate', 'High', 'Extreme (>2.5m)'],
        },
      },
      {
        id: 'coastalFlood',
        name: 'Coastal Flood Risk',
        icon: '🏝️',
        desc: 'Susceptibility models of beach-head inundation.',
        legend: {
          colors: [COLORS.success, COLORS.warning, COLORS.danger],
          labels: ['Safe', 'Alert', 'Inundated'],
        },
      },
    ],
  },
  {
    id: 'hazards',
    name: 'Hazards',
    items: [
      {
        id: 'flood',
        name: 'Flood Risk',
        icon: '🌧️',
        desc: 'Hydrological runoff overflow risks for interior basins.',
        legend: {
          colors: [COLORS.success, COLORS.warning, COLORS.danger],
          labels: ['Optimal', 'Warning', 'Flash Flood'],
        },
      },
      {
        id: 'cyclone',
        name: 'Cyclone Risk',
        icon: '🌀',
        desc: 'Wind-shear and convective storm damage coefficients.',
        legend: {
          colors: [COLORS.success, COLORS.warning, COLORS.danger],
          labels: ['Safe', 'Warning', 'Catastrophic'],
        },
      },
      {
        id: 'heatwave',
        name: 'Heatwave Risk',
        icon: '🔥',
        desc: 'Aggregated thermal discomfort and dry exposure indicators.',
        legend: {
          colors: [COLORS.success, COLORS.warning, COLORS.danger],
          labels: ['Stable', 'Stressed', 'Extreme Risk'],
        },
      },
      {
        id: 'drought',
        name: 'Drought Risk',
        icon: '🌾',
        desc: 'Prolonged moisture deficits and evaporative stresses.',
        legend: {
          colors: [COLORS.success, COLORS.warning, COLORS.danger],
          labels: ['Normal', 'Mild Stress', 'Severe Deficit'],
        },
      },
      {
        id: 'landslide',
        name: 'Landslide Risk',
        icon: '⛰️',
        desc: 'Slope shear failure probability in ghat terrain.',
        legend: {
          colors: [COLORS.success, COLORS.warning, COLORS.danger],
          labels: ['Stable', 'Unstable Alert', 'High Failure'],
        },
      },
      {
        id: 'multiHazard',
        name: 'Multi-Hazard Risk',
        icon: '⚠️',
        desc: 'Compounded risk mapping intersecting heat, flood, and cyclones.',
        legend: {
          colors: [COLORS.success, COLORS.warning, '#EA580C', COLORS.danger],
          labels: ['Low', 'Moderate', 'High', 'Extreme'],
        },
      },
    ],
  },
  {
    id: 'prediction',
    name: 'Predictions',
    items: [
      {
        id: 'futurePredict',
        name: 'Simulation Forecast',
        icon: '🔮',
        desc: 'Simulated anomalies and multi-decadal meteorological projections.',
        legend: {
          colors: [COLORS.success, COLORS.warning, COLORS.danger],
          labels: ['No Anomaly', 'Elevated Risk', 'High Deviation'],
        },
      },
    ],
  },
];

export const LayerSelector: React.FC<LayerSelectorProps> = ({
  activeLayers,
  onToggleLayer,
  opacity,
  onChangeOpacity,
}) => {
  const [activeCategory, setActiveCategory] = useState<LayerCategory['id']>('atmospheric');

  const selectedCategory = CATEGORIZED_LAYERS.find((cat) => cat.id === activeCategory) || CATEGORIZED_LAYERS[0];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle} numberOfLines={0}>
        GIS Climate Layers
      </Text>
      <Text style={styles.sectionSubtitle} numberOfLines={0}>
        Activate multiple telemetry layers to map hazard overlaps
      </Text>

      {/* Category selector tabs */}
      <View style={styles.categoryTabs}>
        {CATEGORIZED_LAYERS.map((cat) => {
          const isSelected = cat.id === activeCategory;
          return (
            <Pressable
              key={cat.id}
              onPress={() => setActiveCategory(cat.id)}
              style={[
                styles.categoryTab,
                isSelected && styles.activeCategoryTab,
              ]}
            >
              <Text
                style={[
                  styles.categoryTabText,
                  isSelected && styles.activeCategoryTabText,
                ]}
                numberOfLines={0}
              >
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Category-specific layers grid */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {selectedCategory.items.map((layer) => {
          const isActive = activeLayers.includes(layer.id);
          return (
            <Pressable
              key={layer.id}
              onPress={() => onToggleLayer(layer.id)}
              style={[
                styles.layerBtn,
                isActive && styles.activeLayerBtn,
                isActive && { borderColor: COLORS.primary }
              ]}
            >
              <Text style={styles.layerIcon} numberOfLines={0}>
                {layer.icon}
              </Text>
              <Text 
                style={[
                  styles.layerLabel,
                  isActive && styles.activeLayerLabel
                ]} 
                numberOfLines={0}
              >
                {layer.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Opacity Control slider */}
      <GlassCard style={styles.opacityCard}>
        <View style={styles.opacityHeader}>
          <Text style={styles.opacityLabel} numberOfLines={0}>
            Overlay Layer Opacity
          </Text>
          <Text style={styles.opacityValue} numberOfLines={0}>
            {Math.round(opacity * 100)}%
          </Text>
        </View>
        
        {/* Custom Touch Segmented Opacity slider */}
        <View style={styles.sliderTrack}>
          {[0.25, 0.5, 0.75, 1.0].map((val) => {
            const isCurrent = Math.abs(opacity - val) < 0.05;
            return (
              <Pressable
                key={`op-${val}`}
                onPress={() => onChangeOpacity(val)}
                style={[
                  styles.sliderSegment,
                  isCurrent && styles.activeSegment
                ]}
              >
                <Text 
                  style={[
                    styles.segmentText,
                    isCurrent && styles.activeSegmentText
                  ]} 
                  numberOfLines={0}
                >
                  {val === 1.0 ? 'MAX' : `${val * 100}%`}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </GlassCard>

      {/* Active Layer Details: Legend & Description */}
      {activeLayers.map((activeId) => {
        // Search across all categories
        let layer;
        for (const cat of CATEGORIZED_LAYERS) {
          const found = cat.items.find((l) => l.id === activeId);
          if (found) {
            layer = found;
            break;
          }
        }
        if (!layer) return null;

        return (
          <GlassCard key={`legend-${layer.id}`} style={styles.legendCard}>
            <View style={styles.legendHeader}>
              <Text style={styles.legendTitle} numberOfLines={0}>
                {layer.icon} {layer.name} telemetry spec
              </Text>
              <HelpCircle size={14} color={COLORS.textSecondary} />
            </View>
            
            <Text style={styles.layerDesc} numberOfLines={0}>
              {layer.desc}
            </Text>

            {/* Custom Color Grid Legend */}
            <View style={styles.colorBarWrapper}>
              <View style={styles.colorBar}>
                {layer.legend.colors.map((color, index) => (
                  <View 
                    key={`col-${index}`} 
                    style={[
                      styles.colorBlock, 
                      { backgroundColor: color }
                    ]} 
                  />
                ))}
              </View>
              <View style={styles.legendLabels}>
                {layer.legend.labels.map((label, index) => (
                  <Text key={`lbl-${index}`} style={styles.legendLabelText} numberOfLines={0}>
                    {label}
                  </Text>
                ))}
              </View>
            </View>
          </GlassCard>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.horizontalPadding,
    marginBottom: SPACING.sectionToSection,
  },
  sectionTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.md,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  categoryTabs: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: SPACING.borderRadiusSm,
    padding: 3,
    marginBottom: SPACING.sm,
    gap: 4,
  },
  categoryTab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  activeCategoryTab: {
    backgroundColor: '#FFFFFF',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryTabText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  activeCategoryTabText: {
    color: COLORS.primary,
  },
  scrollContainer: {
    gap: 8,
    paddingBottom: 4,
    marginBottom: SPACING.md,
  },
  layerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 99,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 6,
  },
  activeLayerBtn: {
    backgroundColor: 'rgba(37, 99, 235, 0.05)',
    borderWidth: 1.5,
  },
  layerIcon: {
    fontSize: 12,
  },
  layerLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  activeLayerLabel: {
    color: COLORS.primary,
  },
  opacityCard: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  opacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  opacityLabel: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textPrimary,
  },
  opacityValue: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.primary,
  },
  sliderTrack: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderRadius: SPACING.borderRadiusSm,
    padding: 3,
  },
  sliderSegment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  activeSegment: {
    backgroundColor: '#FFFFFF',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  activeSegmentText: {
    color: COLORS.primary,
  },
  legendCard: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  legendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  legendTitle: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
  },
  layerDesc: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
    lineHeight: 12,
  },
  colorBarWrapper: {
    marginTop: SPACING.xs,
  },
  colorBar: {
    flexDirection: 'row',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  colorBlock: {
    flex: 1,
  },
  legendLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendLabelText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
});
