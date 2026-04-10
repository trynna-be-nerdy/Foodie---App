/**
 * Foodie App Color Palette
 * Fresh, food-inspired colors for a vibrant user experience
 */

export const colors = {
  // Primary Colors
  primary: {
    freshAvocadoGreen: '#7CB342',
    limeZest: '#9CCC65',
    basilLeaf: '#558B2F',
    mintGreen: '#C8E6C9',
  },

  // Background Colors
  background: {
    cream: '#FFF8E1',
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
  },

  // Text Colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    light: '#BDBDBD',
    inverse: '#FFFFFF',
  },

  // Accent Colors
  accent: {
    tomato: '#E53935',
    carrot: '#FF7043',
    lemon: '#FFCA28',
    blueberry: '#5C6BC0',
    sunriseOrange: '#FF9800',
    goldenYellow: '#FFD700',
    softYellow: '#FFF9C4',
  },

  // Status Colors
  status: {
    success: '#4CAF50',
    successLight: '#E8F5E9',
    warning: '#FFC107',
    warningLight: '#FFF8E1',
    error: '#F44336',
    errorLight: '#FFEBEE',
    info: '#2196F3',
    infoLight: '#E3F2FD',
  },

  // Neutral Colors
  neutral: {
    gray100: '#F5F5F5',
    gray200: '#EEEEEE',
    gray300: '#E0E0E0',
    gray400: '#BDBDBD',
    gray500: '#9E9E9E',
    gray600: '#757575',
    gray700: '#616161',
    gray800: '#424242',
    gray900: '#212121',
  },

  // Transparent variants
  transparent: {
    black10: 'rgba(0, 0, 0, 0.1)',
    black20: 'rgba(0, 0, 0, 0.2)',
    black50: 'rgba(0, 0, 0, 0.5)',
    white50: 'rgba(255, 255, 255, 0.5)',
    white80: 'rgba(255, 255, 255, 0.8)',
  },
} as const;

// Semantic color aliases for easier usage
export const semanticColors = {
  buttonPrimary: colors.primary.freshAvocadoGreen,
  buttonSecondary: colors.primary.limeZest,
  tabBarActive: colors.primary.basilLeaf,
  tabBarInactive: colors.neutral.gray400,
  cardBackground: colors.background.white,
  screenBackground: colors.background.cream,
  divider: colors.neutral.gray200,
  inputBorder: colors.neutral.gray300,
  inputBorderFocused: colors.primary.freshAvocadoGreen,
} as const;

export type ColorKeys = keyof typeof colors;
export type SemanticColorKeys = keyof typeof semanticColors;
