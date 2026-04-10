import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Surface} from 'react-native-paper';

import {colors} from '../../theme/colors';
import {spacing} from '../../theme';
import {ShimmerOverlay} from './ShimmerOverlay';

export function RestaurantCardSkeleton(): React.JSX.Element {
  return (
    <Surface style={styles.container} elevation={1}>
      <View style={styles.header}>
        <View style={styles.logo} />
        <View style={styles.headerText}>
          <View style={styles.lineShort} />
          <View style={styles.lineLong} />
        </View>
      </View>
      <View style={styles.balanceBlock}>
        <View style={styles.lineMedium} />
        <View style={styles.lineShort} />
      </View>
      <View style={styles.footer}>
        <View style={styles.lineLong} />
      </View>
      <ShimmerOverlay borderRadius={12} />
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background.lightGray,
  },
  headerText: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  lineShort: {
    width: '40%',
    height: 10,
    borderRadius: 6,
    backgroundColor: colors.background.lightGray,
    marginBottom: spacing.xs,
  },
  lineMedium: {
    width: '55%',
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.background.lightGray,
    marginBottom: spacing.xs,
  },
  lineLong: {
    width: '70%',
    height: 10,
    borderRadius: 6,
    backgroundColor: colors.background.lightGray,
  },
  balanceBlock: {
    marginBottom: spacing.sm,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.background.lightGray,
    paddingTop: spacing.sm,
  },
});
