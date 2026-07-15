// Type definitions for Climate Digital Twin Mock Data

export interface MarineData {
  seaSurfaceTemp: number;
  waveHeight: number;
  oceanCurrent: string;
  tideLevel: number;
  coastalWind: string;
  stormSurgeRisk: 'Low' | 'Moderate' | 'High' | 'Extreme';
  marineAdvisory: string;
}

export interface DistrictClimateData {
  id: string;
  name: string;
  region: 'North' | 'Central' | 'West' | 'South' | 'Coastal';
  mapCoords: { x: number; y: number }; // Relative position on screen map (0-100)
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  rainfall: number; // mm
  windSpeed: number; // km/h
  windDirection: string; // N, NE, E, SE, etc.
  pressure: number; // hPa
  visibility: number; // km
  aqi: number;
  uvIndex: number;
  soilMoisture: number; // %
  groundWaterLevel: number; // meters below ground
  ndvi: number; // Normalized Difference Vegetation Index (0.0 to 1.0)
  waterAvailability: number; // %
  environmentalHealthScore: number; // 0-100
  climateHealthRating: 'Optimal' | 'Stable' | 'Stressed' | 'Critical' | 'Severe';
  
  disasterRisks: {
    flood: { risk: number; severity: 'Low' | 'Moderate' | 'High' | 'Extreme'; confidence: number };
    cyclone: { risk: number; severity: 'Low' | 'Moderate' | 'High' | 'Extreme'; confidence: number };
    heatwave: { risk: number; severity: 'Low' | 'Moderate' | 'High' | 'Extreme'; confidence: number };
    heavyRain: { risk: number; severity: 'Low' | 'Moderate' | 'High' | 'Extreme'; confidence: number };
    storm: { risk: number; severity: 'Low' | 'Moderate' | 'High' | 'Extreme'; confidence: number };
    lightning: { risk: number; severity: 'Low' | 'Moderate' | 'High' | 'Extreme'; confidence: number };
    landslide: { risk: number; severity: 'Low' | 'Moderate' | 'High' | 'Extreme'; confidence: number };
    drought: { risk: number; severity: 'Low' | 'Moderate' | 'High' | 'Extreme'; confidence: number };
    wildfire: { risk: number; severity: 'Low' | 'Moderate' | 'High' | 'Extreme'; confidence: number };
    stormSurge?: { risk: number; severity: 'Low' | 'Moderate' | 'High' | 'Extreme'; confidence: number };
    coastalFlood?: { risk: number; severity: 'Low' | 'Moderate' | 'High' | 'Extreme'; confidence: number };
  };
  
  predictions: {
    horizon24h: { temp: number; rainfall: number; riskLevel: string };
    horizon3d: { temp: number; rainfall: number; riskLevel: string };
    horizon7d: { temp: number; rainfall: number; riskLevel: string };
    horizon30d: { temp: number; rainfall: number; riskLevel: string };
  };
  
  marineIntelligence?: MarineData;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
  rainProb: number;
  humidity: number;
  windSpeed: number;
}

export interface DailyForecast {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  rainProb: number;
  humidity: number;
  uvIndex: number;
  aqi: number;
}

export interface ClimateAlert {
  id: string;
  type: 'Heatwave' | 'Heavy Rain' | 'Cyclone' | 'Flood' | 'Thunderstorm';
  district: string;
  severity: 'Moderate' | 'Severe' | 'Extreme';
  description: string;
  timestamp: string;
  confidence: number;
}

// ----------------------------------------------------
// Mock Data Implementation
// ----------------------------------------------------

export const HOURLY_FORECAST: HourlyForecast[] = [
  { time: '06:00', temp: 26, condition: 'Sunny', rainProb: 5, humidity: 72, windSpeed: 10 },
  { time: '08:00', temp: 28, condition: 'Sunny', rainProb: 5, humidity: 65, windSpeed: 12 },
  { time: '10:00', temp: 31, condition: 'Sunny', rainProb: 10, humidity: 58, windSpeed: 15 },
  { time: '12:00', temp: 33, condition: 'Partly Cloudy', rainProb: 15, humidity: 52, windSpeed: 18 },
  { time: '14:00', temp: 34, condition: 'Partly Cloudy', rainProb: 20, humidity: 50, windSpeed: 19 },
  { time: '16:00', temp: 32, condition: 'Scattered Clouds', rainProb: 30, humidity: 55, windSpeed: 16 },
  { time: '18:00', temp: 30, condition: 'Passing Showers', rainProb: 65, humidity: 68, windSpeed: 14 },
  { time: '20:00', temp: 28, condition: 'Rain', rainProb: 80, humidity: 82, windSpeed: 12 },
  { time: '22:00', temp: 27, condition: 'Heavy Rain', rainProb: 90, humidity: 88, windSpeed: 15 },
  { time: '00:00', temp: 26, condition: 'Cloudy', rainProb: 45, humidity: 85, windSpeed: 11 },
  { time: '02:00', temp: 25, condition: 'Clear', rainProb: 10, humidity: 80, windSpeed: 9 },
  { time: '04:00', temp: 25, condition: 'Clear', rainProb: 5, humidity: 78, windSpeed: 8 },
];

export const DAILY_FORECAST: DailyForecast[] = [
  { day: 'Today', date: 'Jul 9', tempMax: 34, tempMin: 25, condition: 'Rain', rainProb: 80, humidity: 75, uvIndex: 11, aqi: 48 },
  { day: 'Friday', date: 'Jul 10', tempMax: 32, tempMin: 24, condition: 'Thunderstorm', rainProb: 90, humidity: 82, uvIndex: 8, aqi: 32 },
  { day: 'Saturday', date: 'Jul 11', tempMax: 33, tempMin: 25, condition: 'Partly Cloudy', rainProb: 40, humidity: 68, uvIndex: 12, aqi: 55 },
  { day: 'Sunday', date: 'Jul 12', tempMax: 35, tempMin: 26, condition: 'Sunny', rainProb: 10, humidity: 60, uvIndex: 13, aqi: 62 },
  { day: 'Monday', date: 'Jul 13', tempMax: 36, tempMin: 27, condition: 'Sunny', rainProb: 5, humidity: 55, uvIndex: 13, aqi: 75 },
  { day: 'Tuesday', date: 'Jul 14', tempMax: 34, tempMin: 25, condition: 'Scattered Clouds', rainProb: 25, humidity: 64, uvIndex: 10, aqi: 50 },
  { day: 'Wednesday', date: 'Jul 15', tempMax: 33, tempMin: 24, condition: 'Passing Showers', rainProb: 60, humidity: 70, uvIndex: 9, aqi: 42 },
];

export const CLIMATE_ALERTS: ClimateAlert[] = [
  {
    id: 'alt-001',
    type: 'Heavy Rain',
    district: 'Nilgiris',
    severity: 'Severe',
    description: 'Heavy precipitation event (115-200mm) triggering elevated landslide warnings along ghat roads.',
    timestamp: '10 Mins Ago',
    confidence: 94,
  },
  {
    id: 'alt-002',
    type: 'Cyclone',
    district: 'Nagapattinam',
    severity: 'Extreme',
    description: 'Deep depression in Bay of Bengal expected to make landfall near Nagapattinam within 36 hours. Wind speeds up to 110 km/h expected.',
    timestamp: '1 Hour Ago',
    confidence: 89,
  },
  {
    id: 'alt-003',
    type: 'Heatwave',
    district: 'Vellore',
    severity: 'Severe',
    description: 'Ambient temperatures projected to exceed 43°C. Avoid outdoor activity between 11:00 AM and 04:00 PM.',
    timestamp: '2 Hours Ago',
    confidence: 97,
  },
];

// Tamil Nadu Districts Climate Profiles (38 Districts)
// Standard coordinate boxes mapped horizontally (x: 10 to 90) and vertically (y: 10 to 90)
export const DISTRICTS_DATA: DistrictClimateData[] = [
  {
    id: 'chn',
    name: 'Chennai',
    region: 'Coastal',
    mapCoords: { x: 74, y: 18 },
    temperature: 32,
    feelsLike: 38,
    condition: 'Humid & Cloudy',
    humidity: 78,
    rainfall: 12.4,
    windSpeed: 22,
    windDirection: 'ENE',
    pressure: 1008,
    visibility: 9,
    aqi: 94,
    uvIndex: 10,
    soilMoisture: 42,
    groundWaterLevel: 8.2,
    ndvi: 0.35,
    waterAvailability: 68,
    environmentalHealthScore: 62,
    climateHealthRating: 'Stressed',
    disasterRisks: {
      flood: { risk: 75, severity: 'High', confidence: 88 },
      cyclone: { risk: 65, severity: 'High', confidence: 91 },
      heatwave: { risk: 45, severity: 'Moderate', confidence: 85 },
      heavyRain: { risk: 70, severity: 'High', confidence: 90 },
      storm: { risk: 60, severity: 'High', confidence: 82 },
      lightning: { risk: 50, severity: 'Moderate', confidence: 88 },
      landslide: { risk: 2, severity: 'Low', confidence: 99 },
      drought: { risk: 30, severity: 'Moderate', confidence: 80 },
      wildfire: { risk: 10, severity: 'Low', confidence: 95 },
    },
    predictions: {
      horizon24h: { temp: 31, rainfall: 25, riskLevel: 'Flood Warning' },
      horizon3d: { temp: 29, rainfall: 48, riskLevel: 'Flood Alert' },
      horizon7d: { temp: 32, rainfall: 5, riskLevel: 'Stable' },
      horizon30d: { temp: 33, rainfall: 65, riskLevel: 'Normal' },
    },
  },
  {
    id: 'cbe',
    name: 'Coimbatore',
    region: 'West',
    mapCoords: { x: 22, y: 55 },
    temperature: 28,
    feelsLike: 30,
    condition: 'Pleasant & Windy',
    humidity: 62,
    rainfall: 2.1,
    windSpeed: 26,
    windDirection: 'WSW',
    pressure: 1012,
    visibility: 12,
    aqi: 45,
    uvIndex: 9,
    soilMoisture: 65,
    groundWaterLevel: 14.5,
    ndvi: 0.72,
    waterAvailability: 85,
    environmentalHealthScore: 84,
    climateHealthRating: 'Optimal',
    disasterRisks: {
      flood: { risk: 15, severity: 'Low', confidence: 95 },
      cyclone: { risk: 5, severity: 'Low', confidence: 99 },
      heatwave: { risk: 20, severity: 'Low', confidence: 90 },
      heavyRain: { risk: 25, severity: 'Moderate', confidence: 92 },
      storm: { risk: 30, severity: 'Moderate', confidence: 88 },
      lightning: { risk: 40, severity: 'Moderate', confidence: 84 },
      landslide: { risk: 15, severity: 'Low', confidence: 90 },
      drought: { risk: 10, severity: 'Low', confidence: 95 },
      wildfire: { risk: 18, severity: 'Low', confidence: 92 },
    },
    predictions: {
      horizon24h: { temp: 28, rainfall: 5, riskLevel: 'Stable' },
      horizon3d: { temp: 27, rainfall: 8, riskLevel: 'Stable' },
      horizon7d: { temp: 29, rainfall: 1, riskLevel: 'Optimal' },
      horizon30d: { temp: 29, rainfall: 45, riskLevel: 'Stable' },
    },
  },
  {
    id: 'nlg',
    name: 'Nilgiris',
    region: 'West',
    mapCoords: { x: 18, y: 44 },
    temperature: 18,
    feelsLike: 18,
    condition: 'Heavy Rain & Fog',
    humidity: 95,
    rainfall: 145.2,
    windSpeed: 28,
    windDirection: 'W',
    pressure: 1014,
    visibility: 1.5,
    aqi: 22,
    uvIndex: 4,
    soilMoisture: 92,
    groundWaterLevel: 4.8,
    ndvi: 0.91,
    waterAvailability: 95,
    environmentalHealthScore: 88,
    climateHealthRating: 'Critical',
    disasterRisks: {
      flood: { risk: 80, severity: 'High', confidence: 93 },
      cyclone: { risk: 10, severity: 'Low', confidence: 98 },
      heatwave: { risk: 0, severity: 'Low', confidence: 99 },
      heavyRain: { risk: 95, severity: 'Extreme', confidence: 97 },
      storm: { risk: 65, severity: 'High', confidence: 90 },
      lightning: { risk: 75, severity: 'High', confidence: 88 },
      landslide: { risk: 90, severity: 'Extreme', confidence: 96 },
      drought: { risk: 0, severity: 'Low', confidence: 99 },
      wildfire: { risk: 2, severity: 'Low', confidence: 99 },
    },
    predictions: {
      horizon24h: { temp: 17, rainfall: 120, riskLevel: 'Landslide Warning' },
      horizon3d: { temp: 16, rainfall: 90, riskLevel: 'Heavy Rain Risk' },
      horizon7d: { temp: 18, rainfall: 22, riskLevel: 'Caution' },
      horizon30d: { temp: 19, rainfall: 150, riskLevel: 'Wet Season' },
    },
  },
  {
    id: 'mdu',
    name: 'Madurai',
    region: 'South',
    mapCoords: { x: 44, y: 68 },
    temperature: 36,
    feelsLike: 41,
    condition: 'Hot & Sunny',
    humidity: 48,
    rainfall: 0.0,
    windSpeed: 14,
    windDirection: 'SE',
    pressure: 1009,
    visibility: 10,
    aqi: 72,
    uvIndex: 12,
    soilMoisture: 25,
    groundWaterLevel: 22.4,
    ndvi: 0.45,
    waterAvailability: 45,
    environmentalHealthScore: 68,
    climateHealthRating: 'Stressed',
    disasterRisks: {
      flood: { risk: 10, severity: 'Low', confidence: 95 },
      cyclone: { risk: 12, severity: 'Low', confidence: 92 },
      heatwave: { risk: 75, severity: 'High', confidence: 93 },
      heavyRain: { risk: 15, severity: 'Low', confidence: 90 },
      storm: { risk: 20, severity: 'Low', confidence: 86 },
      lightning: { risk: 35, severity: 'Moderate', confidence: 82 },
      landslide: { risk: 0, severity: 'Low', confidence: 99 },
      drought: { risk: 65, severity: 'High', confidence: 89 },
      wildfire: { risk: 30, severity: 'Moderate', confidence: 84 },
    },
    predictions: {
      horizon24h: { temp: 37, rainfall: 0, riskLevel: 'Heat Warning' },
      horizon3d: { temp: 38, rainfall: 0, riskLevel: 'Extreme Heat' },
      horizon7d: { temp: 36, rainfall: 12, riskLevel: 'Light Shower' },
      horizon30d: { temp: 35, rainfall: 45, riskLevel: 'Normal' },
    },
  },
  {
    id: 'vel',
    name: 'Vellore',
    region: 'North',
    mapCoords: { x: 58, y: 22 },
    temperature: 39,
    feelsLike: 44,
    condition: 'Extreme Heat',
    humidity: 38,
    rainfall: 0.0,
    windSpeed: 11,
    windDirection: 'WNW',
    pressure: 1006,
    visibility: 10,
    aqi: 112,
    uvIndex: 13,
    soilMoisture: 18,
    groundWaterLevel: 28.9,
    ndvi: 0.38,
    waterAvailability: 35,
    environmentalHealthScore: 54,
    climateHealthRating: 'Severe',
    disasterRisks: {
      flood: { risk: 5, severity: 'Low', confidence: 98 },
      cyclone: { risk: 5, severity: 'Low', confidence: 99 },
      heatwave: { risk: 95, severity: 'Extreme', confidence: 98 },
      heavyRain: { risk: 10, severity: 'Low', confidence: 94 },
      storm: { risk: 25, severity: 'Moderate', confidence: 88 },
      lightning: { risk: 45, severity: 'Moderate', confidence: 85 },
      landslide: { risk: 1, severity: 'Low', confidence: 99 },
      drought: { risk: 85, severity: 'High', confidence: 91 },
      wildfire: { risk: 48, severity: 'Moderate', confidence: 90 },
    },
    predictions: {
      horizon24h: { temp: 40, rainfall: 0, riskLevel: 'Heatwave Alert' },
      horizon3d: { temp: 42, rainfall: 0, riskLevel: 'Extreme Heatwave' },
      horizon7d: { temp: 39, rainfall: 0, riskLevel: 'Drought Warning' },
      horizon30d: { temp: 38, rainfall: 15, riskLevel: 'Normal' },
    },
  },
  {
    id: 'kgi',
    name: 'Krishnagiri',
    region: 'North',
    mapCoords: { x: 42, y: 25 },
    temperature: 30,
    feelsLike: 32,
    condition: 'Partly Cloudy',
    humidity: 58,
    rainfall: 1.5,
    windSpeed: 16,
    windDirection: 'W',
    pressure: 1010,
    visibility: 10,
    aqi: 65,
    uvIndex: 10,
    soilMoisture: 45,
    groundWaterLevel: 19.8,
    ndvi: 0.58,
    waterAvailability: 62,
    environmentalHealthScore: 75,
    climateHealthRating: 'Stable',
    disasterRisks: {
      flood: { risk: 15, severity: 'Low', confidence: 94 },
      cyclone: { risk: 5, severity: 'Low', confidence: 99 },
      heatwave: { risk: 45, severity: 'Moderate', confidence: 92 },
      heavyRain: { risk: 20, severity: 'Low', confidence: 90 },
      storm: { risk: 30, severity: 'Moderate', confidence: 86 },
      lightning: { risk: 40, severity: 'Moderate', confidence: 82 },
      landslide: { risk: 5, severity: 'Low', confidence: 97 },
      drought: { risk: 40, severity: 'Moderate', confidence: 88 },
      wildfire: { risk: 22, severity: 'Low', confidence: 90 },
    },
    predictions: {
      horizon24h: { temp: 31, rainfall: 0, riskLevel: 'Stable' },
      horizon3d: { temp: 32, rainfall: 3, riskLevel: 'Stable' },
      horizon7d: { temp: 30, rainfall: 18, riskLevel: 'Thunderstorms' },
      horizon30d: { temp: 30, rainfall: 60, riskLevel: 'Wet Weather' },
    },
  },
  {
    id: 'ngt',
    name: 'Nagapattinam',
    region: 'Coastal',
    mapCoords: { x: 69, y: 58 },
    temperature: 29,
    feelsLike: 35,
    condition: 'Squally Winds & Rain',
    humidity: 88,
    rainfall: 48.6,
    windSpeed: 42,
    windDirection: 'NE',
    pressure: 998,
    visibility: 5,
    aqi: 35,
    uvIndex: 5,
    soilMoisture: 80,
    groundWaterLevel: 3.2,
    ndvi: 0.65,
    waterAvailability: 90,
    environmentalHealthScore: 70,
    climateHealthRating: 'Severe',
    disasterRisks: {
      flood: { risk: 85, severity: 'High', confidence: 92 },
      cyclone: { risk: 90, severity: 'Extreme', confidence: 95 },
      heatwave: { risk: 10, severity: 'Low', confidence: 98 },
      heavyRain: { risk: 88, severity: 'High', confidence: 94 },
      storm: { risk: 92, severity: 'Extreme', confidence: 93 },
      lightning: { risk: 65, severity: 'High', confidence: 86 },
      landslide: { risk: 0, severity: 'Low', confidence: 99 },
      drought: { risk: 5, severity: 'Low', confidence: 99 },
      wildfire: { risk: 1, severity: 'Low', confidence: 99 },
    },
    predictions: {
      horizon24h: { temp: 27, rainfall: 95, riskLevel: 'Cyclone Ingress' },
      horizon3d: { temp: 26, rainfall: 150, riskLevel: 'Cyclone Landfall' },
      horizon7d: { temp: 30, rainfall: 10, riskLevel: 'Recovery Mode' },
      horizon30d: { temp: 31, rainfall: 85, riskLevel: 'Rainy' },
    },
  },
  {
    id: 'tji',
    name: 'Thanjavur',
    region: 'Central',
    mapCoords: { x: 59, y: 55 },
    temperature: 33,
    feelsLike: 38,
    condition: 'Partly Cloudy',
    humidity: 68,
    rainfall: 4.2,
    windSpeed: 18,
    windDirection: 'E',
    pressure: 1008,
    visibility: 10,
    aqi: 60,
    uvIndex: 11,
    soilMoisture: 58,
    groundWaterLevel: 7.1,
    ndvi: 0.78,
    waterAvailability: 80,
    environmentalHealthScore: 78,
    climateHealthRating: 'Stable',
    disasterRisks: {
      flood: { risk: 45, severity: 'Moderate', confidence: 88 },
      cyclone: { risk: 38, severity: 'Moderate', confidence: 90 },
      heatwave: { risk: 50, severity: 'Moderate', confidence: 92 },
      heavyRain: { risk: 42, severity: 'Moderate', confidence: 87 },
      storm: { risk: 35, severity: 'Moderate', confidence: 84 },
      lightning: { risk: 50, severity: 'Moderate', confidence: 80 },
      landslide: { risk: 0, severity: 'Low', confidence: 99 },
      drought: { risk: 20, severity: 'Low', confidence: 92 },
      wildfire: { risk: 5, severity: 'Low', confidence: 98 },
    },
    predictions: {
      horizon24h: { temp: 33, rainfall: 12, riskLevel: 'Rain Showers' },
      horizon3d: { temp: 31, rainfall: 35, riskLevel: 'Heavy Showers' },
      horizon7d: { temp: 34, rainfall: 5, riskLevel: 'Sunny spells' },
      horizon30d: { temp: 33, rainfall: 50, riskLevel: 'Stable' },
    },
  },
  {
    id: 'slm',
    name: 'Salem',
    region: 'Central',
    mapCoords: { x: 42, y: 38 },
    temperature: 34,
    feelsLike: 38,
    condition: 'Dry & Sunny',
    humidity: 52,
    rainfall: 0.5,
    windSpeed: 14,
    windDirection: 'WSW',
    pressure: 1009,
    visibility: 10,
    aqi: 80,
    uvIndex: 11,
    soilMoisture: 32,
    groundWaterLevel: 18.2,
    ndvi: 0.50,
    waterAvailability: 54,
    environmentalHealthScore: 72,
    climateHealthRating: 'Stable',
    disasterRisks: {
      flood: { risk: 10, severity: 'Low', confidence: 96 },
      cyclone: { risk: 2, severity: 'Low', confidence: 99 },
      heatwave: { risk: 68, severity: 'High', confidence: 94 },
      heavyRain: { risk: 15, severity: 'Low', confidence: 91 },
      storm: { risk: 25, severity: 'Moderate', confidence: 86 },
      lightning: { risk: 48, severity: 'Moderate', confidence: 83 },
      landslide: { risk: 10, severity: 'Low', confidence: 95 },
      drought: { risk: 58, severity: 'Moderate', confidence: 89 },
      wildfire: { risk: 28, severity: 'Low', confidence: 91 },
    },
    predictions: {
      horizon24h: { temp: 35, rainfall: 0, riskLevel: 'Stable' },
      horizon3d: { temp: 36, rainfall: 1, riskLevel: 'Hot Weather' },
      horizon7d: { temp: 34, rainfall: 14, riskLevel: 'Thunderstorm' },
      horizon30d: { temp: 34, rainfall: 50, riskLevel: 'Normal' },
    },
  },
  {
    id: 'tcy',
    name: 'Tiruchirappalli',
    region: 'Central',
    mapCoords: { x: 50, y: 52 },
    temperature: 35,
    feelsLike: 40,
    condition: 'Sunny',
    humidity: 50,
    rainfall: 0.0,
    windSpeed: 16,
    windDirection: 'E',
    pressure: 1008,
    visibility: 10,
    aqi: 78,
    uvIndex: 12,
    soilMoisture: 30,
    groundWaterLevel: 16.8,
    ndvi: 0.52,
    waterAvailability: 60,
    environmentalHealthScore: 74,
    climateHealthRating: 'Stable',
    disasterRisks: {
      flood: { risk: 25, severity: 'Low', confidence: 92 },
      cyclone: { risk: 15, severity: 'Low', confidence: 94 },
      heatwave: { risk: 75, severity: 'High', confidence: 93 },
      heavyRain: { risk: 20, severity: 'Low', confidence: 88 },
      storm: { risk: 30, severity: 'Moderate', confidence: 85 },
      lightning: { risk: 42, severity: 'Moderate', confidence: 81 },
      landslide: { risk: 0, severity: 'Low', confidence: 99 },
      drought: { risk: 52, severity: 'Moderate', confidence: 89 },
      wildfire: { risk: 18, severity: 'Low', confidence: 92 },
    },
    predictions: {
      horizon24h: { temp: 36, rainfall: 0, riskLevel: 'Stable' },
      horizon3d: { temp: 37, rainfall: 0, riskLevel: 'Hot Weather' },
      horizon7d: { temp: 34, rainfall: 18, riskLevel: 'Thunder Showers' },
      horizon30d: { temp: 34, rainfall: 55, riskLevel: 'Normal' },
    },
  },
  {
    id: 'kky',
    name: 'Kanyakumari',
    region: 'South',
    mapCoords: { x: 30, y: 88 },
    temperature: 29,
    feelsLike: 33,
    condition: 'Windy & Showers',
    humidity: 82,
    rainfall: 8.5,
    windSpeed: 32,
    windDirection: 'WSW',
    pressure: 1011,
    visibility: 8,
    aqi: 28,
    uvIndex: 8,
    soilMoisture: 75,
    groundWaterLevel: 5.4,
    ndvi: 0.85,
    waterAvailability: 92,
    environmentalHealthScore: 86,
    climateHealthRating: 'Optimal',
    disasterRisks: {
      flood: { risk: 30, severity: 'Moderate', confidence: 94 },
      cyclone: { risk: 45, severity: 'Moderate', confidence: 92 },
      heatwave: { risk: 5, severity: 'Low', confidence: 99 },
      heavyRain: { risk: 55, severity: 'Moderate', confidence: 93 },
      storm: { risk: 60, severity: 'High', confidence: 91 },
      lightning: { risk: 55, severity: 'Moderate', confidence: 85 },
      landslide: { risk: 8, severity: 'Low', confidence: 96 },
      drought: { risk: 2, severity: 'Low', confidence: 99 },
      wildfire: { risk: 1, severity: 'Low', confidence: 99 },
    },
    predictions: {
      horizon24h: { temp: 28, rainfall: 15, riskLevel: 'Coastal Swell' },
      horizon3d: { temp: 28, rainfall: 24, riskLevel: 'High Surf Alert' },
      horizon7d: { temp: 29, rainfall: 8, riskLevel: 'Stable' },
      horizon30d: { temp: 29, rainfall: 120, riskLevel: 'Monsoon Showers' },
    },
  },
  {
    id: 'tne',
    name: 'Tirunelveli',
    region: 'South',
    mapCoords: { x: 34, y: 80 },
    temperature: 31,
    feelsLike: 35,
    condition: 'Partly Cloudy',
    humidity: 68,
    rainfall: 1.2,
    windSpeed: 24,
    windDirection: 'W',
    pressure: 1010,
    visibility: 10,
    aqi: 52,
    uvIndex: 11,
    soilMoisture: 48,
    groundWaterLevel: 12.1,
    ndvi: 0.62,
    waterAvailability: 78,
    environmentalHealthScore: 80,
    climateHealthRating: 'Optimal',
    disasterRisks: {
      flood: { risk: 20, severity: 'Low', confidence: 95 },
      cyclone: { risk: 18, severity: 'Low', confidence: 93 },
      heatwave: { risk: 48, severity: 'Moderate', confidence: 91 },
      heavyRain: { risk: 25, severity: 'Low', confidence: 92 },
      storm: { risk: 35, severity: 'Moderate', confidence: 87 },
      lightning: { risk: 45, severity: 'Moderate', confidence: 83 },
      landslide: { risk: 12, severity: 'Low', confidence: 91 },
      drought: { risk: 18, severity: 'Low', confidence: 95 },
      wildfire: { risk: 12, severity: 'Low', confidence: 93 },
    },
    predictions: {
      horizon24h: { temp: 31, rainfall: 0, riskLevel: 'Stable' },
      horizon3d: { temp: 30, rainfall: 2, riskLevel: 'Stable' },
      horizon7d: { temp: 32, rainfall: 0, riskLevel: 'Stable' },
      horizon30d: { temp: 31, rainfall: 68, riskLevel: 'Regular Rains' },
    },
  }
];

// Fallback dummy for remaining 26 districts so list is fully complete for all 38 districts
const REMAINING_DISTRICT_NAMES = [
  { name: 'Ariyalur', region: 'Central', x: 57, y: 46 },
  { name: 'Chengalpattu', region: 'Coastal', x: 71, y: 23 },
  { name: 'Cuddalore', region: 'Coastal', x: 67, y: 38 },
  { name: 'Dharmapuri', region: 'North', x: 40, y: 30 },
  { name: 'Dindigul', region: 'South', x: 38, y: 60 },
  { name: 'Erode', region: 'West', x: 30, y: 46 },
  { name: 'Kallakurichi', region: 'Central', x: 54, y: 35 },
  { name: 'Kanchipuram', region: 'North', x: 66, y: 22 },
  { name: 'Karur', region: 'Central', x: 42, y: 53 },
  { name: 'Mayiladuthurai', region: 'Coastal', x: 68, y: 48 },
  { name: 'Namakkal', region: 'Central', x: 44, y: 47 },
  { name: 'Perambalur', region: 'Central', x: 52, y: 45 },
  { name: 'Pudukkottai', region: 'South', x: 55, y: 63 },
  { name: 'Ramanathapuram', region: 'Coastal', x: 56, y: 76 },
  { name: 'Ranipet', region: 'North', x: 62, y: 20 },
  { name: 'Sivaganga', region: 'South', x: 48, y: 66 },
  { name: 'Tenkasi', region: 'South', x: 28, y: 76 },
  { name: 'Theni', region: 'West', x: 28, y: 65 },
  { name: 'Thoothukudi', region: 'Coastal', x: 42, y: 82 },
  { name: 'Tirupathur', region: 'North', x: 50, y: 24 },
  { name: 'Tiruppur', region: 'West', x: 28, y: 54 },
  { name: 'Tiruvallur', region: 'North', x: 70, y: 14 },
  { name: 'Tiruvannamalai', region: 'North', x: 57, y: 28 },
  { name: 'Tiruvarur', region: 'Coastal', x: 64, y: 56 },
  { name: 'Viluppuram', region: 'Coastal', x: 61, y: 32 },
  { name: 'Virudhunagar', region: 'South', x: 38, y: 72 }
];

export const ALL_38_DISTRICTS: DistrictClimateData[] = ([
  ...DISTRICTS_DATA,
  ...REMAINING_DISTRICT_NAMES.map((d, index) => {
    const isCoastal = d.region === 'Coastal';
    const baseTemp = d.region === 'North' ? 36 : d.region === 'West' ? 27 : 32;
    const humidity = isCoastal ? 82 : 55;
    const aqi = d.region === 'North' ? 95 : 55;
    
    return {
      id: d.name.toLowerCase().replace(/\s+/g, '-'),
      name: d.name,
      region: d.region as any,
      mapCoords: { x: d.x, y: d.y },
      temperature: baseTemp + (index % 4),
      feelsLike: baseTemp + (index % 4) + (isCoastal ? 5 : 2),
      condition: isCoastal ? 'Partly Cloudy' : 'Sunny',
      humidity,
      rainfall: isCoastal ? 5.5 : 0.2,
      windSpeed: 12 + (index % 10),
      windDirection: 'SW',
      pressure: 1010,
      visibility: 10,
      aqi,
      uvIndex: 10,
      soilMoisture: isCoastal ? 60 : 35,
      groundWaterLevel: 12.0 + index,
      ndvi: 0.4 + (index % 5) * 0.1,
      waterAvailability: 50 + (index % 3) * 15,
      environmentalHealthScore: 60 + (index % 5) * 6,
      climateHealthRating: (index % 4 === 0 ? 'Optimal' : index % 4 === 1 ? 'Stable' : index % 4 === 2 ? 'Stressed' : 'Critical') as any,
      disasterRisks: {
        flood: { risk: isCoastal ? 45 : 15, severity: 'Moderate' as const, confidence: 85 },
        cyclone: { risk: isCoastal ? 50 : 5, severity: 'High' as const, confidence: 88 },
        heatwave: { risk: d.region === 'North' ? 70 : 30, severity: 'High' as const, confidence: 90 },
        heavyRain: { risk: isCoastal ? 40 : 15, severity: 'Moderate' as const, confidence: 84 },
        storm: { risk: isCoastal ? 45 : 15, severity: 'Moderate' as const, confidence: 80 },
        lightning: { risk: 35, severity: 'Moderate' as const, confidence: 82 },
        landslide: { risk: d.region === 'West' ? 25 : 0, severity: 'Low' as const, confidence: 95 },
        drought: { risk: d.region === 'North' ? 60 : 25, severity: 'Moderate' as const, confidence: 87 },
        wildfire: { risk: d.region === 'West' ? 15 : 5, severity: 'Low' as const, confidence: 92 },
      },
      predictions: {
        horizon24h: { temp: baseTemp + 1, rainfall: 1.0, riskLevel: 'Stable' },
        horizon3d: { temp: baseTemp + 2, rainfall: 2.0, riskLevel: 'Stable' },
        horizon7d: { temp: baseTemp, rainfall: 10.0, riskLevel: 'Thunderstorm' },
        horizon30d: { temp: baseTemp + 1, rainfall: 50.0, riskLevel: 'Stable' },
      }
    };
  })
] as DistrictClimateData[]).map((district) => {
  const isCoastal = district.region === 'Coastal';
  if (isCoastal) {
    return {
      ...district,
      disasterRisks: {
        ...district.disasterRisks,
        stormSurge: { risk: 55, severity: 'Moderate' as const, confidence: 85 },
        coastalFlood: { risk: 62, severity: 'High' as const, confidence: 88 },
      },
      marineIntelligence: {
        seaSurfaceTemp: 28.5 + (district.name.length % 4) * 0.5,
        waveHeight: 1.2 + (district.name.length % 3) * 0.4,
        oceanCurrent: `${0.6 + (district.name.length % 5) * 0.08} m/s Eastward`,
        tideLevel: 0.5 + (district.name.length % 3) * 0.15,
        coastalWind: `${16 + (district.name.length % 6) * 2.5} km/h NE`,
        stormSurgeRisk: (district.name.length % 3 === 0 ? 'Moderate' : district.name.length % 3 === 1 ? 'High' : 'Low') as any,
        marineAdvisory: `Notice for ${district.name} waters: moderate surface swell height; navigation warning in effect.`,
      }
    };
  }
  return district;
});

export const SYSTEM_HEALTH = {
  status: 'OPTIMAL',
  healthScore: 98,
  sensorsCount: 1420,
  sensorsActive: 1395,
  satelliteStatus: 'OPERATIONAL',
  aiEngineStatus: 'SYNCED',
  weatherEngineStatus: 'LIVE',
  lastUpdated: 'Just Now',
};

// AI assistant answers dataset
export const AI_CHAT_RESPONSES: Record<string, string> = {
  'what is the current climate state of tamil nadu?': 
    'Tamil Nadu is currently experiencing active southwest monsoon conditions in the Western Ghats (specifically Nilgiris and Coimbatore), bringing heavy rainfall. Meanwhile, northern interior districts like Vellore are experiencing heat stresses, with index temperatures climbing past 41°C. Coastal regions remain humid with mild wind flows from the Bay of Bengal.',
  
  'are there any active disaster warnings?':
    'Yes, we have 2 critical warnings active:\n1. **Severe Heavy Rain Alert** in Nilgiris: Landslide risk index has reached 90% (Extreme) along major highways. Avoid travel.\n2. **Extreme Cyclone Threat** in Nagapattinam: A Bay of Bengal deep depression is expected to make landfall in 36 hours. Winds are currently clocked at 42 km/h and rising.',
  
  'tell me about soil moisture levels.':
    'Soil moisture is highest in the West region (e.g. Nilgiris at 92%, Coimbatore at 65%) due to recent rainfall. The Central agricultural belt (Thanjavur) maintains a stable 58%. The North interior (Vellore) is critically dry at 18%, causing high drought risk and agricultural water stress.',
  
  'how does the air quality look?':
    'Air quality is excellent across the Western Ghats (Nilgiris AQI 22, Coimbatore 45). The coastal belt is moderate (Chennai AQI 94). However, northern industrial pockets (Vellore AQI 112) show elevated particulate matter due to high heat and stagnant air currents.',
  
  'suggest emergency actions for nilgiris.':
    'For Nilgiris district, the AI Climate Engine advises:\n• Cease all non-essential road travel along the ghat paths immediately due to high Landslide probability (90%).\n• Evacuate low-lying river areas as soil saturation (92%) limits further absorption.\n• Activate regional relief nodes and disaster response units.'
};

export const SUGGESTED_PROMPTS = [
  'What is the current climate state of Tamil Nadu?',
  'Are there any active disaster warnings?',
  'Tell me about soil moisture levels.',
  'How does the air quality look?',
  'Suggest emergency actions for Nilgiris.',
];

export const ANALYTICS_DATA = {
  tempTrends: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    currentYear: [28, 29, 32, 35, 38, 34, 32],
    historicalAverage: [26, 28, 30, 33, 36, 33, 31],
  },
  rainfallTrends: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    data: [15, 8, 22, 45, 90, 180, 240], // mm
  },
  environmentalScores: {
    labels: ['Biodiversity', 'Water Health', 'Soil Quality', 'Air Quality', 'Forest Canopy'],
    scores: [82, 65, 70, 78, 85],
  },
};

export const generateDynamicAIResponse = (
  query: string,
  district: DistrictClimateData | null
): { text: string; cardData?: any } => {
  const normalizedQuery = query.toLowerCase().trim().replace(/[?.,]/g, '');

  if (!district) {
    // General fallback matching active responses dict
    let text = 'I am scanning the district telemetry database. My spatial predictive algorithms are calculating the parameters for your query. For standard metrics, try selecting one of the preset inquiry blocks above.';
    for (const key of Object.keys(AI_CHAT_RESPONSES)) {
      const normalizedKey = key.toLowerCase().trim().replace(/[?.,]/g, '');
      if (normalizedQuery.includes(normalizedKey) || normalizedKey.includes(normalizedQuery)) {
        text = AI_CHAT_RESPONSES[key];
        break;
      }
    }
    return { text };
  }

  // District is selected: build custom answers!
  const isCoastal = district.region === 'Coastal';
  
  if (normalizedQuery.includes('climate state') || normalizedQuery.includes('current') || normalizedQuery.includes('telemetry') || normalizedQuery.includes('temperature') || normalizedQuery.includes('state of')) {
    return {
      text: `Sensory readout for **${district.name}** indicates a temperature of **${district.temperature}°C** (feels like ${district.feelsLike}°C) with ${district.condition.toLowerCase()} conditions. The Environmental Health Score is currently sitting at **${district.environmentalHealthScore}/100** (${district.climateHealthRating} level).`,
      cardData: {
        type: 'telemetry',
        title: `${district.name} Ambient Telemetry`,
        metrics: [
          { label: 'Temp', value: `${district.temperature}°C`, icon: '🌡️' },
          { label: 'Condition', value: district.condition, icon: '⛅' },
          { label: 'Humidity', value: `${district.humidity}%`, icon: '💧' },
          { label: 'Rainfall', value: `${district.rainfall} mm`, icon: '🌧️' },
        ]
      }
    };
  }

  if (normalizedQuery.includes('warning') || normalizedQuery.includes('disaster') || normalizedQuery.includes('hazard') || normalizedQuery.includes('risk')) {
    const floodRisk = district.disasterRisks.flood.risk;
    const cycloneRisk = district.disasterRisks.cyclone.risk;
    const heatRisk = district.disasterRisks.heatwave.risk;
    
    let primaryHazard = 'None';
    let maxRiskVal = 0;
    
    if (floodRisk > maxRiskVal) { primaryHazard = 'Flash Flood'; maxRiskVal = floodRisk; }
    if (cycloneRisk > maxRiskVal) { primaryHazard = 'Cyclone'; maxRiskVal = cycloneRisk; }
    if (heatRisk > maxRiskVal) { primaryHazard = 'Heatwave'; maxRiskVal = heatRisk; }
    if (isCoastal) {
      const ssRisk = district.disasterRisks.stormSurge?.risk || 0;
      if (ssRisk > maxRiskVal) { primaryHazard = 'Storm Surge'; maxRiskVal = ssRisk; }
    }
    
    const riskDesc = maxRiskVal > 70 ? 'Extreme' : maxRiskVal > 45 ? 'High' : maxRiskVal > 20 ? 'Moderate' : 'Low';
    
    return {
      text: `Compiled multi-hazard vulnerability report for **${district.name}** indicates **${riskDesc}** risk profile. The primary threat is **${primaryHazard}** standing at **${maxRiskVal}% probability** of convective damage. AI advisory alert states are active.`,
      cardData: {
        type: 'alert',
        title: `${district.name} Hazard Risk Matrices`,
        metrics: [
          { label: 'Primary Threat', value: primaryHazard, icon: '⚠️', color: maxRiskVal > 45 ? '#EF4444' : '#F59E0B' },
          { label: 'Flood Probability', value: `${floodRisk}%`, icon: '🌊' },
          { label: 'Cyclone Probability', value: `${cycloneRisk}%`, icon: '🌀' },
          ...(isCoastal ? [{ label: 'Storm Surge', value: `${district.disasterRisks.stormSurge?.risk || 0}%`, icon: '🌪️' }] : []),
        ]
      }
    };
  }

  if (normalizedQuery.includes('soil') || normalizedQuery.includes('moisture') || normalizedQuery.includes('groundwater') || normalizedQuery.includes('hydrology')) {
    return {
      text: `Sub-surface environmental metrics for **${district.name}** report a soil moisture index of **${district.soilMoisture}%** (saturated density) and deep groundwater depth level at **${district.groundWaterLevel.toFixed(1)} meters** below terrain baseline. Crop canopy vegetative index (NDVI) is at **${district.ndvi.toFixed(2)}**.`,
      cardData: {
        type: 'telemetry',
        title: `${district.name} Hydrology Feed`,
        metrics: [
          { label: 'Soil Moisture', value: `${district.soilMoisture}%`, icon: '🌾' },
          { label: 'Groundwater', value: `${district.groundWaterLevel.toFixed(1)}m`, icon: '🕳️' },
          { label: 'Vegetation NDVI', value: district.ndvi.toFixed(2), icon: '🌱' },
          { label: 'Water Reserve', value: `${district.waterAvailability}%`, icon: '⛲' },
        ]
      }
    };
  }

  if (normalizedQuery.includes('air') || normalizedQuery.includes('aqi') || normalizedQuery.includes('quality') || normalizedQuery.includes('pollution')) {
    const aqiSeverity = district.aqi > 100 ? 'Unhealthy' : district.aqi > 60 ? 'Moderate' : 'Good';
    return {
      text: `Atmospheric air quality diagnostics in **${district.name}** register **${district.aqi} AQI** (${aqiSeverity} range). The UV radiation index is **${district.uvIndex} UVI** and sensory visibility clearance stands at **${district.visibility} km**.`,
      cardData: {
        type: 'telemetry',
        title: `${district.name} Air Quality Specs`,
        metrics: [
          { label: 'AQI Score', value: `${district.aqi} AQI`, icon: '🌫️', color: district.aqi > 100 ? '#EF4444' : '#22C55E' },
          { label: 'UV Index', value: `${district.uvIndex} UVI`, icon: '☀️' },
          { label: 'Visibility', value: `${district.visibility} km`, icon: '👁️' },
        ]
      }
    };
  }

  if (normalizedQuery.includes('emergency') || normalizedQuery.includes('action') || normalizedQuery.includes('suggest') || normalizedQuery.includes('directive')) {
    const floodRisk = district.disasterRisks.flood.risk;
    const cycloneRisk = district.disasterRisks.cyclone.risk;
    
    let actionText = `For ${district.name} district, the AI Climate Engine advises standard monitoring. Maintain GPS telemetry node alignments.`;
    if (floodRisk > 40) {
      actionText = `For ${district.name} district, the AI Climate Engine advises:\n• Evacuate low agricultural basins and drainage paths.\n• Alert regional municipal pumping stations.\n• Secure local drinking water wells against runoff contamination.`;
    } else if (cycloneRisk > 40) {
      actionText = `For ${district.name} district, the AI Climate Engine advises:\n• Move ocean crafts inland and secure harbor moorings.\n• Alert public emergency structures and relocate to high-elevation masonry shields.\n• Secure loose solar and wind telemetry nodes.`;
    }
    
    return {
      text: actionText,
      cardData: {
        type: 'advisory',
        title: `${district.name} Action Directives`,
        metrics: [
          { label: 'Action Priority', value: floodRisk > 40 || cycloneRisk > 40 ? 'CRITICAL' : 'ROUTINE', icon: '⚡' },
          { label: 'Primary Agent', value: 'Municipal/Rescue', icon: '🛡️' },
        ]
      }
    };
  }

  // Specific query matching but localized to this district
  return {
    text: `I am scanning the live telemetry nodes for **${district.name}** (Region: ${district.region}). Please ask about temperature/climate, hazard warning profiles, air quality index, soil hydrology, or recommended action directives to retrieve dynamic diagnostic readouts.`,
  };
};
