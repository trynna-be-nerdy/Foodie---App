import React, {useEffect, useMemo, useState} from 'react';
import {Linking, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Button, Text} from 'react-native-paper';

import {trackOrder} from '../services/orderService';
import {borderRadius, colors, spacing} from '../theme';
import {textStyles} from '../theme/typography';

interface OrderTrackingScreenProps {
  route: {
    params: {
      orderId: string;
    };
  };
}

export function OrderTrackingScreen({route}: OrderTrackingScreenProps): React.JSX.Element {
  const {orderId} = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tracking, setTracking] = useState<{
    currentStatus: string;
    fulfillmentType: string;
    estimatedReadyTime?: string | null;
    restaurant?: {name: string; phone?: string | null};
    statusTimeline: {status: string; label: string; completed: boolean}[];
  } | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const fetchTracking = async () => {
      const response = await trackOrder(orderId);
      if (response.success && response.data) {
        setTracking(response.data);
        setError(null);
      } else {
        setError(response.error?.message || 'Failed to load tracking');
      }
      setIsLoading(false);
    };

    fetchTracking();
    intervalId = setInterval(fetchTracking, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, [orderId]);

  const statusProgress = useMemo(() => {
    if (!tracking?.statusTimeline.length) {
      return 0;
    }
    const completedCount = tracking.statusTimeline.filter(step => step.completed).length;
    return completedCount / tracking.statusTimeline.length;
  }, [tracking]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
          <Text style={styles.loadingText}>Tracking your order...</Text>
        </View>
      ) : error || !tracking ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error || 'Unable to load tracking'}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.title}>Order #{orderId}</Text>
          <Text style={styles.subtitle}>Current status: {tracking.currentStatus}</Text>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, {width: `${statusProgress * 100}%`}]} />
          </View>

          <View style={styles.timeline}>
            {tracking.statusTimeline.map(step => (
              <View key={step.status} style={styles.timelineRow}>
                <View
                  style={[
                    styles.timelineDot,
                    step.completed ? styles.timelineDotActive : styles.timelineDotInactive,
                  ]}
                />
                <Text style={step.completed ? styles.timelineLabelActive : styles.timelineLabel}>
                  {step.label}
                </Text>
              </View>
            ))}
          </View>

          {tracking.restaurant && (
            <View style={styles.contactCard}>
              <Text style={styles.sectionTitle}>Restaurant</Text>
              <Text style={styles.contactName}>{tracking.restaurant.name}</Text>
              {tracking.restaurant.phone && (
                <Button
                  mode="outlined"
                  onPress={() => Linking.openURL(`tel:${tracking.restaurant?.phone}`)}>
                  Call Restaurant
                </Button>
              )}
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  content: {
    padding: spacing.lg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  loadingText: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  errorText: {
    ...textStyles.body,
    color: colors.status.error,
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  subtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral.gray200,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.freshAvocadoGreen,
  },
  timeline: {
    gap: spacing.md,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: borderRadius.full,
  },
  timelineDotActive: {
    backgroundColor: colors.primary.freshAvocadoGreen,
  },
  timelineDotInactive: {
    backgroundColor: colors.neutral.gray300,
  },
  timelineLabel: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  timelineLabelActive: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
  },
  contactCard: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.white,
    gap: spacing.sm,
  },
  sectionTitle: {
    ...textStyles.bodyLarge,
    color: colors.text.primary,
  },
  contactName: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
});
