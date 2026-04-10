import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

import {colors} from '../../theme/colors';

interface ShimmerOverlayProps {
  borderRadius?: number;
}

export function ShimmerOverlay({borderRadius = 12}: ShimmerOverlayProps): React.JSX.Element {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View
      pointerEvents="none"
      style={[styles.container, {borderRadius}]}
      onLayout={event => setWidth(event.nativeEvent.layout.width)}>
      {width > 0 && (
        <Animated.View style={[StyleSheet.absoluteFillObject, {transform: [{translateX}]}]}>
          <LinearGradient
            colors={[
              colors.background.lightGray,
              colors.background.white,
              colors.background.lightGray,
            ]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={[StyleSheet.absoluteFillObject, {borderRadius}]}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background.lightGray,
    overflow: 'hidden',
  },
});
