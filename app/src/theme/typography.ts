import {TextStyle} from 'react-native';

/**
 * Foodie App Typography System
 * Using Poppins for headings and Quicksand for body text
 */

export const fontFamilies = {
  // Poppins - for headings and emphasis
  poppins: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },
  // Quicksand - for body text and descriptions
  quicksand: {
    regular: 'Quicksand-Regular',
    medium: 'Quicksand-Medium',
    semiBold: 'Quicksand-SemiBold',
    bold: 'Quicksand-Bold',
  },
} as const;

// Font sizes following a modular scale (1.25 ratio)
export const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
} as const;

// Line heights
export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const;

// Letter spacing
export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
} as const;

// Pre-defined text styles
export const textStyles: Record<string, TextStyle> = {
  // Headings (Poppins)
  h1: {
    fontFamily: fontFamilies.poppins.bold,
    fontSize: fontSizes['4xl'],
    lineHeight: fontSizes['4xl'] * lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontFamily: fontFamilies.poppins.bold,
    fontSize: fontSizes['3xl'],
    lineHeight: fontSizes['3xl'] * lineHeights.tight,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontFamily: fontFamilies.poppins.semiBold,
    fontSize: fontSizes['2xl'],
    lineHeight: fontSizes['2xl'] * lineHeights.tight,
    letterSpacing: letterSpacing.normal,
  },
  h4: {
    fontFamily: fontFamilies.poppins.semiBold,
    fontSize: fontSizes.xl,
    lineHeight: fontSizes.xl * lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  h5: {
    fontFamily: fontFamilies.poppins.medium,
    fontSize: fontSizes.lg,
    lineHeight: fontSizes.lg * lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },
  h6: {
    fontFamily: fontFamilies.poppins.medium,
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Body text (Quicksand)
  bodyLarge: {
    fontFamily: fontFamilies.quicksand.regular,
    fontSize: fontSizes.lg,
    lineHeight: fontSizes.lg * lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  body: {
    fontFamily: fontFamilies.quicksand.regular,
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontFamily: fontFamilies.quicksand.regular,
    fontSize: fontSizes.md,
    lineHeight: fontSizes.md * lineHeights.relaxed,
    letterSpacing: letterSpacing.normal,
  },

  // Labels and captions
  label: {
    fontFamily: fontFamilies.quicksand.medium,
    fontSize: fontSizes.md,
    lineHeight: fontSizes.md * lineHeights.normal,
    letterSpacing: letterSpacing.wide,
  },
  caption: {
    fontFamily: fontFamilies.quicksand.regular,
    fontSize: fontSizes.sm,
    lineHeight: fontSizes.sm * lineHeights.normal,
    letterSpacing: letterSpacing.normal,
  },

  // Button text
  buttonLarge: {
    fontFamily: fontFamilies.poppins.semiBold,
    fontSize: fontSizes.lg,
    lineHeight: fontSizes.lg * lineHeights.tight,
    letterSpacing: letterSpacing.wide,
  },
  button: {
    fontFamily: fontFamilies.poppins.semiBold,
    fontSize: fontSizes.base,
    lineHeight: fontSizes.base * lineHeights.tight,
    letterSpacing: letterSpacing.wide,
  },
  buttonSmall: {
    fontFamily: fontFamilies.poppins.medium,
    fontSize: fontSizes.md,
    lineHeight: fontSizes.md * lineHeights.tight,
    letterSpacing: letterSpacing.wide,
  },
} as const;

export type FontSizeKeys = keyof typeof fontSizes;
export type TextStyleKeys = keyof typeof textStyles;
