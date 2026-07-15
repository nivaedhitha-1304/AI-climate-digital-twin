import { Platform } from 'react-native';

export const TYPOGRAPHY = {
  fontFamily: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'System',
  }),
  
  sizes: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 18,
    xl: 22,
    xxl: 28,
    giant: 48,
  },
  
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    heavy: '800' as const,
  },

  lineHeights: {
    xs: 14,
    sm: 18,
    md: 22,
    lg: 26,
    xl: 30,
    xxl: 36,
    giant: 56,
  },
};
