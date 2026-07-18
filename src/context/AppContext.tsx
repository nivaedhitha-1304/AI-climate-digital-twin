import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DistrictClimateData } from '../mock/climateMock';

export type UserRole = 'Citizen' | 'Farmer' | 'Fisher' | 'Researcher' | 'Government';
export type TimeHorizon = 'past24h' | 'now' | 'next7d' | 'futureSimulation';

interface AppContextType {
  language: 'en' | 'ta';
  setLanguage: (lang: 'en' | 'ta') => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  timelineTab: TimeHorizon;
  setTimelineTab: (tab: TimeHorizon) => void;
  researchMode: boolean;
  setResearchMode: (mode: boolean) => void;
  selectedDistrict: DistrictClimateData | null;
  setSelectedDistrict: (district: DistrictClimateData | null) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'tab.twin': 'Climate Twin',
    'tab.weather': 'Weather',
    'tab.analytics': 'Analytics',
    'tab.assistant': 'AI Assistant',
    'tab.profile': 'Profile',
    'twin.title': 'Climate Digital Twin',
    'twin.subtitle': 'AI Climate Intelligence Platform',
    'details.temp': 'Temperature',
    'details.feels': 'Feels Like',
    'details.humidity': 'Humidity',
    'details.rainfall': 'Rainfall',
    'details.wind': 'Wind Flow',
    'details.pressure': 'Pressure',
    'details.visibility': 'Visibility',
    'details.health_score': 'ENV HEALTH SCORE',
    'details.risk_score': 'Climate Risk Index',
    'details.uv': 'UV Radiation',
    'details.coastal_warning': 'MARINE INTELLIGENCE',
    'details.open_diagnostics': 'Open Diagnostics for',
    'details.select_prompt': 'Select a district node on the vector map to analyze telemetry readings.',
    'details.title': 'Vulnerability & Telemetry',
    'role.farmer': 'Farmer Perspective',
    'role.fisher': 'Fisher Perspective',
    'profile.role': 'User Role Configuration',
    'report.fab': 'Report Incident',
    'report.title': 'Citizen Telemetry Reporting',
    'report.target': 'Reporting area targeting:',
    'report.select_type': 'SELECT INCIDENT TYPE',
    'report.submit': 'SUBMIT SIGNAL TELEMETRY',
    'report.success': 'Citizen report signal successfully synced with telemetry grid!',
    'mhews.no_warnings': '🟢 No Active Warnings',
    'severity.Emergency': 'Emergency',
    'severity.Severe': 'Severe',
    'severity.Moderate': 'Moderate',
    'advisory.delay_irrigation': 'Delay Irrigation',
    'advisory.detail.delay_irrigation': 'Sufficient rainfall predicted. Pause micro-irrigation systems to prevent soil saturation.',
    'advisory.rain_tomorrow': 'Rain Expected',
    'advisory.detail.rain_tomorrow': 'Rain expected tomorrow. Protect harvested crops.',
    'advisory.avoid_outdoor': 'Avoid Outdoor Work',
    'advisory.detail.avoid_outdoor': 'Dangerous heat values detected. Limit physical exposure between 11:00 AM and 04:00 PM.',
    'advisory.strong_winds': 'Strong Winds Warning',
    'advisory.detail.strong_winds': 'Gale-force winds predicted near the coast. Secure open structures.',
    'advisory.suitable_fishing': 'Suitable Fishing Window',
    'advisory.detail.suitable_fishing': 'Wave swell heights under 1.5m. Safe sea traversal permitted.',
    'incident.Flood': 'Flood Inundation',
    'incident.HeavyRain': 'Heavy Rain Anomaly',
    'incident.TreeFall': 'Tree Fall Blockage',
    'incident.Waterlogging': 'Urban Waterlogging',
    'incident.CycloneDamage': 'Cyclone Damage',
    'incident.CoastalErosion': 'Coastal Erosion',
    'incident.DeadFish': 'Dead Fish Anomaly',
    'incident.RoadDamage': 'Road Damage Anomaly',
    'ai.insights.title': 'AI MODEL EXPLANATORY REASONINGS',
    'ai.reason.flood': 'Heavy rainfall · High humidity · Low pressure · River overflow potential',
    'ai.reason.cyclone': 'High sea surface warming · Heavy coastal rain · Gale force winds',
    'ai.reason.heatwave': 'Prolonged dry soil index · High solar radiation · Anomaly temp readings',
    'analytics.tab.climate': 'Climate',
    'analytics.tab.marine': 'Marine',
    'analytics.tab.agriculture': 'Agriculture',
    'analytics.tab.fisheries': 'Fisheries',
    'analytics.tab.reports': 'Reports',
  },
  ta: {
    'tab.twin': 'காலநிலை இரட்டை',
    'tab.weather': 'வானிலை',
    'tab.analytics': 'பகுப்பாய்வு',
    'tab.assistant': 'AI உதவியாளர்',
    'tab.profile': 'சுயவிவரம்',
    'twin.title': 'காலநிலை டிஜிட்டல் இரட்டை',
    'twin.subtitle': 'AI காலநிலை நுண்ணறிவு தளம்',
    'details.temp': 'வெப்பநிலை',
    'details.feels': 'உணர்வு நிலை',
    'details.humidity': 'ஈரப்பதம்',
    'details.rainfall': 'மழைப்பொழிவு',
    'details.wind': 'காற்று வேகம்',
    'details.pressure': 'அழுத்தம்',
    'details.visibility': 'பார்வை தெளிவு',
    'details.health_score': 'சுற்றுச்சூழல் சுகாதார குறியீடு',
    'details.risk_score': 'காலநிலை ஆபத்து குறியீடு',
    'details.uv': 'புற ஊதா கதிர்வீச்சு',
    'details.coastal_warning': 'கடல்சார் நுண்ணறிவு',
    'details.open_diagnostics': 'பகுப்பாய்வை திறக்கவும்',
    'details.select_prompt': 'காலநிலை அளவீடுகளை பகுப்பாய்வு செய்ய வரைபடத்தில் ஒரு மாவட்டத்தை தேர்ந்தெடுக்கவும்.',
    'details.title': 'பாதிப்பு மற்றும் டெலிமெட்ரி',
    'role.farmer': 'விவசாயி நுண்ணறிவு',
    'role.fisher': 'மீனவர் நுண்ணறிவு',
    'profile.role': 'பயனர் பங்கு கட்டமைப்பு',
    'report.fab': 'சம்பவத்தை புகாரளிக்கவும்',
    'report.title': 'குடிமக்கள் டெலிமெட்ரி புகாரளிப்பு',
    'report.target': 'புகாரளிக்கும் பகுதி:',
    'report.select_type': 'சம்பவத்தின் வகையைத் தேர்ந்தெடுக்கவும்',
    'report.submit': 'புகாரை சமர்ப்பிக்கவும்',
    'report.success': 'புகார் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!',
    'mhews.no_warnings': '🟢 செயலில் எச்சரிக்கைகள் இல்லை',
    'severity.Emergency': 'அவசரகாலம்',
    'severity.Severe': 'தீவிரமானது',
    'severity.Moderate': 'மிதமானது',
    'advisory.delay_irrigation': 'நீர்ப்பாசனத்தை தாமதப்படுத்துங்கள்',
    'advisory.detail.delay_irrigation': 'அதிக மழை எதிர்பார்க்கப்படுகிறது. மண் செறிவூட்டலைத் தடுக்க நீர்ப்பாசனத்தை நிறுத்தவும்.',
    'advisory.rain_tomorrow': 'நாளை மழை எதிர்பார்க்கப்படுகிறது',
    'advisory.detail.rain_tomorrow': 'மழை எதிர்பார்க்கப்படுகிறது. அறுவடை செய்த பயிர்களைப் பாதுகாக்கவும்.',
    'advisory.avoid_outdoor': 'வெளியில் வேலை செய்வதைத் தவிர்க்கவும்',
    'advisory.detail.avoid_outdoor': 'அபாயகரமான வெப்ப நிலை. 11:00 AM முதல் 04:00 PM வரை வெளியில் செல்வதை குறைக்கவும்.',
    'advisory.strong_winds': 'பலத்த காற்று எச்சரிக்கை',
    'advisory.detail.strong_winds': 'கடலோரப் பகுதிகளில் பலத்த காற்று வீசக்கூடும். திறந்த அமைப்புகளைப் பாதுகாக்கவும்.',
    'advisory.suitable_fishing': 'பொருத்தமான மீன்பிடி காலம்',
    'advisory.detail.suitable_fishing': 'அலை உயரம் 1.5 மீட்டருக்கும் குறைவாக உள்ளது. பாதுகாப்பான கடல் பயணம் அனுமதிக்கப்படுகிறது.',
    'incident.Flood': 'வெள்ளப்பெருக்கு',
    'incident.HeavyRain': 'அதிதீவிர மழைப்பொழிவு',
    'incident.TreeFall': 'மரம் விழுந்து அடைப்பு',
    'incident.Waterlogging': 'நீர் தேங்குதல்',
    'incident.CycloneDamage': 'புயல் சேதம்',
    'incident.CoastalErosion': 'கடலோர அரிப்பு',
    'incident.DeadFish': 'இறந்த மீன் அனாமதேயம்',
    'incident.RoadDamage': 'சாலை சேதம்',
    'ai.insights.title': 'AI மாதிரியின் விளக்கக் காரணங்கள்',
    'ai.reason.flood': 'அதிவேக மழைப்பொழிவு · அதிக ஈரப்பதம் · குறைந்த காற்றழுத்தம் · ஆற்று வெள்ள அபாயம்',
    'ai.reason.cyclone': 'கடல் மேற்பரப்பு வெப்பமாதல் · பலத்த கடலோர மழை · சூறாவளி காற்று',
    'ai.reason.heatwave': 'நீடித்த வறண்ட மண் · அதிக சூரிய கதிர்வீச்சு · வெப்பநிலை அளவீடு அனாமதேயம்',
    'analytics.tab.climate': 'காலநிலை',
    'analytics.tab.marine': 'கடல்சார்',
    'analytics.tab.agriculture': 'வேளாண்மை',
    'analytics.tab.fisheries': 'மீன்பிடி',
    'analytics.tab.reports': 'அறிக்கைகள்',
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [userRole, setUserRole] = useState<UserRole>('Citizen');
  const [timelineTab, setTimelineTab] = useState<TimeHorizon>('now');
  const [researchMode, setResearchMode] = useState<boolean>(false);
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictClimateData | null>(null);

  const t = (key: string): string => {
    const dict = translations[language] as any;
    return dict[key] || key;
  };

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      userRole,
      setUserRole,
      timelineTab,
      setTimelineTab,
      researchMode,
      setResearchMode,
      selectedDistrict,
      setSelectedDistrict,
      t
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
