module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@services': './src/services',
          '@store': './src/store',
          '@utils': './src/utils',
          '@types': './src/types',
          '@assets': './src/assets',
          '@theme': './src/theme',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
