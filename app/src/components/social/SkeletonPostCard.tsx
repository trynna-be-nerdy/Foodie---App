import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, StyleSheet, View, type StyleProp, type ViewStyle} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import {borderRadius, colors, spacing} from '../../theme';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SHIMMER_WIDTH = 140;

function ShimmerPlaceholder({style}: {style?: StyleProp<ViewStyle>}): React.JSX.Element {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SHIMMER_WIDTH, SCREEN_WIDTH + SHIMMER_WIDTH],
  });

  return (
    <View style={[styles.placeholder, style]}>
      <Animated.View style={[styles.shimmer, {transform: [{translateX}]}]}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)', 'rgba(255,255,255,0)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={StyleSheet.absoluteFillObject}
        />
      </Animated.View>
    </View>
  );
}

export function SkeletonPostCard(): React.JSX.Element {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <ShimmerPlaceholder style={styles.avatar} />
        <View style={styles.headerText}>
          <ShimmerPlaceholder style={styles.lineShort} />
          <ShimmerPlaceholder style={styles.lineTiny} />
        </View>
      </View>

      <ShimmerPlaceholder style={styles.image} />

      <View style={styles.actions}>
        <ShimmerPlaceholder style={styles.actionPill} />
        <ShimmerPlaceholder style={styles.actionPill} />
        <ShimmerPlaceholder style={styles.actionPillWide} />
      </View>

      <View style={styles.content}>
        <ShimmerPlaceholder style={styles.lineFull} />
        <ShimmerPlaceholder style={styles.lineMedium} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.white,
    paddingVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  headerText: {
    flex: 1,
    marginLeft: spacing.sm,
    gap: spacing.xs,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: SCREEN_WIDTH,
    borderRadius: borderRadius.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    gap: spacing.md,
  },
  actionPill: {
    width: 50,
    height: 16,
    borderRadius: 8,
  },
  actionPillWide: {
    width: 80,
    height: 16,
    borderRadius: 8,
  },
  content: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  lineShort: {
    width: '50%',
    height: 12,
    borderRadius: 6,
  },
  lineTiny: {
    width: '30%',
    height: 10,
    borderRadius: 6,
  },
  lineFull: {
    width: '100%',
    height: 12,
    borderRadius: 6,
  },
  lineMedium: {
    width: '70%',
    height: 12,
    borderRadius: 6,
  },
  placeholder: {
    backgroundColor: colors.neutral.gray200,
    overflow: 'hidden',
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
  },
});
