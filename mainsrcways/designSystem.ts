/**
 * Design System
 * All design tokens, colors, typography, and spacing
 */

import { scale, verticalScale, SCREEN } from './utils/scale';

// Re-export scaling utilities
export { scale, verticalScale, SCREEN };

export const COLORS = {
  // Gradients
  gradientStart: '#7B2FF7',
  gradientEnd: '#B500D0',
  
  // Primaries
  primary: '#C6FF00',
  secondary: '#1ED6C3',
  accent: '#7B2FF7',
  
  // Backgrounds
  background: '#050609',
  cardLight: '#F2F2F2',
  cardDark: 'rgba(255,255,255,0.08)',
  
  // Text
  text: '#F7F5F2',
  textMuted: 'rgba(247,245,242,0.72)',
  textSecondary: 'rgba(247,245,242,0.48)',
  
  // Status
  success: '#1ED6C3',
  error: '#E12124',
  
  // Utility
  white: '#FFFFFF',
  black: '#000000',
};

export const SIZES = {
  // Paddings
  xs: scale(4),
  sm: scale(8),
  md: scale(12),
  lg: scale(16),
  xl: scale(20),
  xxl: scale(28),
  
  // Border radius
  radiusSm: scale(8),
  radiusMd: scale(12),
  radiusLg: scale(16),
  radiusXl: scale(24),
  radiusHuge: scale(32),
  
  // Font sizes
  fontSize8: scale(8),
  fontSize9: scale(9),
  fontSize12: scale(12),
  fontSize14: scale(14),
  fontSize16: scale(16),
  fontSize18: scale(18),
  fontSize20: scale(20),
  fontSize24: scale(24),
  fontSize28: scale(28),
  fontSize32: scale(32),
  fontSize36: scale(36),
  fontSize40: scale(40),
  fontSize44: scale(44),
  fontSize47: scale(47),
  
  // Component heights
  buttonHeight: scale(44),
  buttonHeightSmall: scale(36),
  tabBarHeight: verticalScale(80),
  
  // Icons
  iconSmall: scale(16),
  iconMedium: scale(24),
  iconLarge: scale(32),
  iconXLarge: scale(44),
};

export const TYPOGRAPHY = {
  // Primary font (Manrope)
  fontFamily: 'Manrope',
  fontFamilyBold: 'Manrope-Bold',
  fontFamilySemiBold: 'Manrope-SemiBold',
  
  // Line heights
  lineHeightTight: 1.2,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.75,
};

export const SPACING = {
  screenHorizontal: SIZES.xxl,
  cardPadding: SIZES.lg,
  elementGap: SIZES.md,
};

export const SHADOWS = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  strong: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 12,
  },
};
