import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';

/**
 * Loading screen displayed while fonts and resources are loading
 */
export function LoadingScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.cream,
  },
});

export default LoadingScreen;
