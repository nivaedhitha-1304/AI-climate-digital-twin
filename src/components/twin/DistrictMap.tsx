import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, useWindowDimensions, TextInput, FlatList, Pressable } from 'react-native';
import Svg, { Circle, Line, Rect, G, Path, Text as SvgText } from 'react-native-svg';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, 
  runOnJS 
} from 'react-native-reanimated';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Compass, 
  Search, 
  MapPin, 
  Layers,
  Sparkles
} from 'lucide-react-native';
import { COLORS, SPACING, TYPOGRAPHY } from '../../theme';
import { GlassCard } from '../common/GlassCard';
import { IconButton } from '../common/Buttons';
import { ALL_38_DISTRICTS, DistrictClimateData } from '../../mock/climateMock';
import { TimeHorizon } from './TimelineScrubber';

interface DistrictMapProps {
  selectedDistrict: DistrictClimateData | null;
  onSelectDistrict: (district: DistrictClimateData | null) => void;
  activeLayers: string[];
  opacity: number;
  timeHorizon: TimeHorizon;
  simulationYear: 2030 | 2040 | 2050;
}

export const DistrictMap: React.FC<DistrictMapProps> = ({
  selectedDistrict,
  onSelectDistrict,
  activeLayers,
  opacity,
  timeHorizon,
  simulationYear,
}) => {
  const { width } = useWindowDimensions();
  const mapHeight = 360;
  
  // Interactive navigation states for map zoom and translate
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<DistrictClimateData[]>([]);

  // Reset zoom on unselect
  useEffect(() => {
    if (!selectedDistrict) {
      scale.value = withSpring(1);
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    }
  }, [selectedDistrict]);

  // Handle district selection and zoom coordinates
  const handleSelectDistrict = (district: DistrictClimateData) => {
    onSelectDistrict(district);
    
    // Zoom into district coordinates
    // Translate map center (x: 50%, y: 50%) to the node
    const mapCenterX = width / 2;
    const mapCenterY = mapHeight / 2;
    
    // Convert relative % to actual coordinate space (assuming width x mapHeight)
    const targetX = (district.mapCoords.x / 100) * (width - 48) + 24;
    const targetY = (district.mapCoords.y / 100) * mapHeight;
    
    scale.value = withSpring(1.8, { damping: 15 });
    translateX.value = withSpring(mapCenterX - targetX, { damping: 15 });
    translateY.value = withSpring(mapCenterY - targetY, { damping: 15 });
  };

  const handleZoomIn = () => {
    scale.value = withSpring(Math.min(scale.value + 0.3, 3.5));
  };

  const handleZoomOut = () => {
    scale.value = withSpring(Math.max(scale.value - 0.3, 0.8));
  };

  const handleReset = () => {
    onSelectDistrict(null);
    scale.value = withSpring(1);
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    setSearchQuery('');
    setSearchResults([]);
  };

  // Search filter
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setSearchResults([]);
    } else {
      const filtered = ALL_38_DISTRICTS.filter(d => 
        d.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  // Reanimated style for the map group
  const animatedMapStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ]
    };
  });

  // Calculate node color based on active layers and time horizon
  const getNodeColor = (district: DistrictClimateData) => {
    const isCoastal = district.region === 'Coastal';
    
    // Scale parameters based on timeHorizon and year
    let temp = district.temperature;
    let rain = district.rainfall;
    let humidity = district.humidity;
    let wind = district.windSpeed;
    let aqi = district.aqi;
    let riskIndex = isCoastal ? 64 : 45;
    
    if (timeHorizon === 'past24h') {
      temp -= 1.2;
      rain = Math.max(rain - 2, 0);
      humidity -= 3;
      wind = Math.max(wind - 4, 2);
      aqi = Math.max(aqi - 8, 15);
      riskIndex = Math.max(riskIndex - 4, 10);
    } else if (timeHorizon === 'next7d') {
      temp += 0.8;
      rain = rain * 1.08;
      humidity += 4;
      wind = wind * 1.1;
      aqi = aqi * 1.1;
      riskIndex = Math.min(riskIndex + 3, 100);
    } else if (timeHorizon === 'simulation') {
      const scale = simulationYear === 2030 ? 1.15 : simulationYear === 2040 ? 1.3 : 1.45;
      temp += simulationYear === 2030 ? 1.2 : simulationYear === 2040 ? 2.0 : 3.2;
      rain = rain * scale;
      humidity += simulationYear === 2030 ? 3 : simulationYear === 2040 ? 6 : 10;
      wind = wind * scale;
      aqi = aqi * scale;
      riskIndex = Math.min(riskIndex * scale, 100);
    }

    if (activeLayers.length === 0) {
      return COLORS.primary;
    }

    // Check first active layer
    const active = activeLayers[0];

    // Marine layers don't apply to inland districts (return light neutral grey)
    const isMarineLayer = ['sst', 'wave', 'oceanCurrent', 'tide', 'coastalWind', 'cycloneTrack', 'stormSurge', 'coastalFlood'].includes(active);
    if (isMarineLayer && !isCoastal) {
      return '#E2E8F0'; // Light grey for non-coastal on marine layers
    }

    switch (active) {
      case 'temp':
        if (temp > 35) return COLORS.danger;
        if (temp > 30) return COLORS.warning;
        if (temp > 25) return COLORS.secondary;
        return COLORS.accent;
        
      case 'rain':
        if (rain > 50) return '#1E3A8A';
        if (rain > 15) return COLORS.primary;
        if (rain > 2) return COLORS.secondary;
        return '#93C5FD';
        
      case 'humidity':
        if (humidity > 80) return '#1D4ED8';
        if (humidity > 60) return COLORS.primary;
        if (humidity > 40) return COLORS.secondary;
        return '#93C5FD';
        
      case 'wind':
        if (wind > 40) return COLORS.danger;
        if (wind > 25) return COLORS.warning;
        if (wind > 12) return COLORS.secondary;
        return '#CBD5E1';
        
      case 'aqi':
        if (aqi > 100) return COLORS.danger;
        if (aqi > 60) return COLORS.warning;
        return COLORS.success;

      // Marine Layers
      case 'sst':
        const sst = district.marineIntelligence?.seaSurfaceTemp || 28;
        if (sst > 31) return COLORS.danger;
        if (sst > 29) return COLORS.warning;
        return COLORS.accent;
        
      case 'wave':
        const wh = district.marineIntelligence?.waveHeight || 1.0;
        if (wh > 2.5) return COLORS.danger;
        if (wh > 1.5) return COLORS.warning;
        return COLORS.primary;
        
      case 'oceanCurrent':
        const oc = district.name.length % 3;
        if (oc === 2) return COLORS.danger;
        if (oc === 1) return COLORS.warning;
        return COLORS.success;
        
      case 'tide':
        const tl = district.marineIntelligence?.tideLevel || 0.4;
        if (tl > 0.8) return COLORS.danger;
        if (tl > 0.5) return COLORS.warning;
        return COLORS.primary;
        
      case 'coastalWind':
        const cw = district.name.length % 3;
        if (cw === 2) return COLORS.danger;
        if (cw === 1) return COLORS.warning;
        return COLORS.secondary;
        
      case 'cycloneTrack':
        return district.name === 'Nagapattinam' || district.name === 'Chennai' ? COLORS.danger : COLORS.success;
        
      case 'stormSurge':
        const ss = district.disasterRisks.stormSurge?.risk || 20;
        if (ss > 60) return COLORS.danger;
        if (ss > 35) return COLORS.warning;
        return COLORS.success;
        
      case 'coastalFlood':
        const cf = district.disasterRisks.coastalFlood?.risk || 20;
        if (cf > 60) return COLORS.danger;
        if (cf > 35) return COLORS.warning;
        return COLORS.success;

      // Hazards Layers
      case 'flood':
        const fl = district.disasterRisks.flood.risk;
        if (fl > 70) return COLORS.danger;
        if (fl > 40) return COLORS.warning;
        return COLORS.success;
        
      case 'cyclone':
        const cy = district.disasterRisks.cyclone.risk;
        if (cy > 70) return COLORS.danger;
        if (cy > 40) return COLORS.warning;
        return COLORS.success;
        
      case 'heatwave':
        const hw = district.disasterRisks.heatwave.risk;
        if (hw > 70) return COLORS.danger;
        if (hw > 40) return COLORS.warning;
        return COLORS.success;
        
      case 'drought':
        const dr = district.disasterRisks.drought.risk;
        if (dr > 70) return COLORS.danger;
        if (dr > 40) return COLORS.warning;
        return COLORS.success;
        
      case 'landslide':
        const ls = district.disasterRisks.landslide.risk;
        if (ls > 70) return COLORS.danger;
        if (ls > 40) return COLORS.warning;
        return COLORS.success;
        
      case 'multiHazard':
        if (riskIndex > 70) return COLORS.danger;
        if (riskIndex > 45) return '#EA580C';
        if (riskIndex > 25) return COLORS.warning;
        return COLORS.success;

      // Predictions Layer
      case 'futurePredict':
        if (riskIndex > 60) return COLORS.danger;
        if (riskIndex > 35) return COLORS.warning;
        return COLORS.success;

      default:
        return COLORS.primary;
    }
  };

  return (
    <View style={styles.mapContainer}>
      {/* Search Header overlay */}
      <View style={styles.searchWrapper}>
        <GlassCard style={styles.searchBar}>
          <Search size={16} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            placeholder="Search district (e.g. Chennai, Nilgiris)..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor={COLORS.textSecondary}
            style={styles.searchInput}
          />
          {searchQuery !== '' && (
            <Pressable onPress={handleReset}>
              <Text style={styles.clearText}>Clear</Text>
            </Pressable>
          )}
        </GlassCard>

        {/* Search Results Autocomplete Dropdown */}
        {searchResults.length > 0 && (
          <GlassCard style={styles.dropdown}>
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    handleSelectDistrict(item);
                    setSearchResults([]);
                    setSearchQuery(item.name);
                  }}
                  style={styles.dropdownItem}
                >
                  <MapPin size={12} color={COLORS.primary} style={styles.pinIcon} />
                  <Text style={styles.dropdownText} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.dropdownRegion} numberOfLines={1}>{item.region} TN</Text>
                </Pressable>
              )}
            />
          </GlassCard>
        )}
      </View>

      {/* Floating Map Controls */}
      <View style={styles.floatingControls}>
        <IconButton icon={<ZoomIn size={18} color={COLORS.textPrimary} />} onPress={handleZoomIn} style={styles.controlBtn} />
        <IconButton icon={<ZoomOut size={18} color={COLORS.textPrimary} />} onPress={handleZoomOut} style={styles.controlBtn} />
        <IconButton icon={<RotateCcw size={18} color={COLORS.textPrimary} />} onPress={handleReset} style={styles.controlBtn} />
      </View>

      {/* Map Active Layers Legend Overlay */}
      <View style={styles.activeLayersBadge}>
        <Layers size={14} color={COLORS.primary} />
        <Text style={styles.layersText} numberOfLines={1}>
          GIS LAYERS ACTIVE: {activeLayers.length === 0 ? 'TELEMETRY' : activeLayers.map(l => l.toUpperCase()).join(', ')}
        </Text>
      </View>

      {/* Interactive Map Area */}
      <View style={styles.svgCanvasWrapper}>
        <Animated.View style={[styles.animatedGroup, animatedMapStyle]}>
          <Svg width={width - 24} height={mapHeight}>
            {/* GIS Coordinates Grid lines */}
            {Array.from({ length: 12 }).map((_, i) => (
              <Line
                key={`grid-x-${i}`}
                x1={(i / 11) * (width - 24)}
                y1={0}
                x2={(i / 11) * (width - 24)}
                y2={mapHeight}
                stroke="rgba(37, 99, 235, 0.04)"
                strokeWidth={1}
              />
            ))}
            {Array.from({ length: 8 }).map((_, i) => (
              <Line
                key={`grid-y-${i}`}
                x1={0}
                y1={(i / 7) * mapHeight}
                x2={width - 24}
                y2={(i / 7) * mapHeight}
                stroke="rgba(37, 99, 235, 0.04)"
                strokeWidth={1}
              />
            ))}

            {/* Stylized Bay of Bengal Coastline Contour */}
            <Path
              d={`M ${(width - 24) * 0.72} ${mapHeight * 0.1} Q ${(width - 24) * 0.75} ${mapHeight * 0.4} ${(width - 24) * 0.65} ${mapHeight * 0.6} T ${(width - 24) * 0.3} ${mapHeight * 0.9}`}
              fill="none"
              stroke="#D1E8FF"
              strokeWidth={3}
              opacity={0.8}
            />

            {/* Geographical Climate Telemetry Links between neighbors */}
            {ALL_38_DISTRICTS.map((d1, i) => {
              // Draw small lines to geographically close districts to simulate telemetry network
              return ALL_38_DISTRICTS.slice(i + 1, i + 4).map((d2, j) => {
                const x1 = (d1.mapCoords.x / 100) * (width - 48) + 24;
                const y1 = (d1.mapCoords.y / 100) * mapHeight;
                const x2 = (d2.mapCoords.x / 100) * (width - 48) + 24;
                const y2 = (d2.mapCoords.y / 100) * mapHeight;
                
                return (
                  <Line
                    key={`link-${d1.id}-${d2.id}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={COLORS.border}
                    strokeWidth={0.8}
                    opacity={0.35}
                  />
                );
              });
            })}

            {/* Render click areas and nodes for all 38 districts */}
            {ALL_38_DISTRICTS.map((district) => {
              const x = (district.mapCoords.x / 100) * (width - 48) + 24;
              const y = (district.mapCoords.y / 100) * mapHeight;
              
              const isSelected = selectedDistrict?.id === district.id;
              const nodeColor = getNodeColor(district);

              return (
                <G key={`district-${district.id}`}>
                  {/* Selected Glow Ring */}
                  {isSelected && (
                    <>
                      <Circle
                        cx={x}
                        cy={y}
                        r={18}
                        fill="none"
                        stroke={nodeColor}
                        strokeWidth={1}
                        opacity={0.3}
                      />
                      <Circle
                        cx={x}
                        cy={y}
                        r={12}
                        fill="none"
                        stroke={nodeColor}
                        strokeWidth={1.5}
                        opacity={0.65}
                      />
                    </>
                  )}

                  {/* District Core Circle */}
                  <Circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 8 : 5}
                    fill={nodeColor}
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                    opacity={opacity}
                    onPress={() => handleSelectDistrict(district)}
                  />

                  {/* Transparent Click Target expansion for small nodes */}
                  <Circle
                    cx={x}
                    cy={y}
                    r={20}
                    fill="transparent"
                    onPress={() => handleSelectDistrict(district)}
                  />

                  {/* District Labels for highlighted primary nodes when selected or at low zoom */}
                  {(isSelected || scale.value > 1.4) && (
                    <SvgText
                      x={x}
                      y={y - 12}
                      fontSize={8}
                      fontWeight="bold"
                      fill={COLORS.textPrimary}
                      textAnchor="middle"
                      opacity={0.95}
                    >
                      {district.name}
                    </SvgText>
                  )}
                </G>
              );
            })}
          </Svg>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    height: 400,
    backgroundColor: '#FFFFFF',
    marginHorizontal: SPACING.horizontalPadding,
    borderRadius: SPACING.borderRadiusLg,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: SPACING.sectionToSection,
  },
  searchWrapper: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    zIndex: 99,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: SPACING.borderRadiusMd,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.medium,
    color: COLORS.textPrimary,
    padding: 0,
  },
  clearText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: SPACING.borderRadiusMd,
    marginTop: 4,
    paddingVertical: 4,
    maxHeight: 180,
    overflow: 'hidden',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
  },
  pinIcon: {
    marginRight: 8,
  },
  dropdownText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: TYPOGRAPHY.sizes.xs,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textPrimary,
    flex: 1,
  },
  dropdownRegion: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 9,
    fontWeight: TYPOGRAPHY.weights.semibold,
    color: COLORS.textSecondary,
  },
  floatingControls: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    gap: 8,
    zIndex: 98,
  },
  controlBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderColor: COLORS.border,
    borderWidth: 1,
    elevation: 2,
  },
  activeLayersBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: COLORS.border,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    zIndex: 97,
  },
  layersText: {
    fontFamily: TYPOGRAPHY.fontFamily,
    fontSize: 8,
    fontWeight: TYPOGRAPHY.weights.bold,
    color: COLORS.textSecondary,
  },
  svgCanvasWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedGroup: {
    flex: 1,
  },
});
