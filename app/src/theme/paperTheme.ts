import {MD3LightTheme, configureFonts} from 'react-native-paper';
import {colors} from './colors';
import {fontFamilies} from './typography';

const fontConfig = {
  displayLarge: {
    fontFamily: fontFamilies.poppins.bold,
  },
  displayMedium: {
    fontFamily: fontFamilies.poppins.bold,
  },
  displaySmall: {
    fontFamily: fontFamilies.poppins.semiBold,
  },
  headlineLarge: {
    fontFamily: fontFamilies.poppins.semiBold,
  },
  headlineMedium: {
    fontFamily: fontFamilies.poppins.semiBold,
  },
  headlineSmall: {
    fontFamily: fontFamilies.poppins.medium,
  },
  titleLarge: {
    fontFamily: fontFamilies.poppins.medium,
  },
  titleMedium: {
    fontFamily: fontFamilies.poppins.medium,
  },
  titleSmall: {
    fontFamily: fontFamilies.quicksand.semiBold,
  },
  bodyLarge: {
    fontFamily: fontFamilies.quicksand.regular,
  },
  bodyMedium: {
    fontFamily: fontFamilies.quicksand.regular,
  },
  bodySmall: {
    fontFamily: fontFamilies.quicksand.regular,
  },
  labelLarge: {
    fontFamily: fontFamilies.quicksand.medium,
  },
  labelMedium: {
    fontFamily: fontFamilies.quicksand.medium,
  },
  labelSmall: {
    fontFamily: fontFamilies.quicksand.regular,
  },
};

export const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary.freshAvocadoGreen,
    primaryContainer: colors.primary.limeZest,
    secondary: colors.primary.basilLeaf,
    secondaryContainer: colors.primary.limeZest,
    tertiary: colors.accent.lemon,
    tertiaryContainer: colors.background.cream,
    surface: colors.background.white,
    surfaceVariant: colors.neutral.gray100,
    background: colors.background.cream,
    error: colors.status.error,
    errorContainer: '#FFCDD2',
    onPrimary: colors.text.inverse,
    onPrimaryContainer: colors.text.primary,
    onSecondary: colors.text.inverse,
    onSecondaryContainer: colors.text.primary,
    onTertiary: colors.text.primary,
    onTertiaryContainer: colors.text.primary,
    onSurface: colors.text.primary,
    onSurfaceVariant: colors.text.secondary,
    onError: colors.text.inverse,
    onErrorContainer: colors.status.error,
    onBackground: colors.text.primary,
    outline: colors.neutral.gray400,
    outlineVariant: colors.neutral.gray200,
    inverseSurface: colors.neutral.gray800,
    inverseOnSurface: colors.text.inverse,
    inversePrimary: colors.primary.limeZest,
    shadow: colors.transparent.black20,
    scrim: colors.transparent.black50,
    elevation: {
      level0: 'transparent',
      level1: colors.background.white,
      level2: colors.neutral.gray100,
      level3: colors.neutral.gray200,
      level4: colors.neutral.gray200,
      level5: colors.neutral.gray300,
    },
  },
  fonts: configureFonts({config: fontConfig}),
};

export type AppTheme = typeof paperTheme;
