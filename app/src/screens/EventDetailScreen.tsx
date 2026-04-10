import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Button,
  Chip,
  Divider,
  IconButton,
  Text,
} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LinearGradient} from 'expo-linear-gradient';
import * as Calendar from 'expo-calendar';

import type {FoodieEvent} from '../types/event';
import {EVENT_TYPE_COLORS, EVENT_TYPE_ICONS, EVENT_TYPE_LABELS} from '../types/event';
import {
  getEventById,
  registerForEvent,
  cancelEventRegistration,
} from '../services/eventService';
import type {RootStackParamList} from '../navigation/AppNavigator';
import {colors, spacing, borderRadius} from '../theme';
import {textStyles} from '../theme/typography';

type EventDetailRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;
type EventDetailNavigationProp = StackNavigationProp<RootStackParamList>;

export function EventDetailScreen(): React.JSX.Element {
  const route = useRoute<EventDetailRouteProp>();
  const navigation = useNavigation<EventDetailNavigationProp>();
  const {eventId} = route.params;

  const [event, setEvent] = useState<FoodieEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const fetchEvent = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getEventById(eventId);
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const formattedDate = useMemo(() => {
    if (!event) return '';
    const startDate = new Date(event.startTime);
    return startDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [event]);

  const formattedTime = useMemo(() => {
    if (!event) return '';
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
    };
    return `${startDate.toLocaleTimeString('en-US', timeOptions)} - ${endDate.toLocaleTimeString('en-US', timeOptions)}`;
  }, [event]);

  const spotsInfo = useMemo(() => {
    if (!event) return null;
    if (!event.maxAttendees) return {text: `${event.registrationCount} registered`, isFull: false};
    const remaining = event.maxAttendees - event.registrationCount;
    if (remaining <= 0) return {text: 'Event is full', isFull: true};
    return {text: `${remaining} of ${event.maxAttendees} spots available`, isFull: false};
  }, [event]);

  const handleRegister = async () => {
    if (!event) return;
    setIsRegistering(true);

    try {
      const result = await registerForEvent(event.id);
      if (result.success) {
        setEvent(prev =>
          prev
            ? {
                ...prev,
                isRegistered: true,
                registrationCount: prev.registrationCount + 1,
                userQrCode: result.qrCode,
              }
            : null,
        );
        Alert.alert('Success!', 'You have been registered for this event.');
      } else {
        Alert.alert('Error', result.error || 'Failed to register');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to register for event');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleCancelRegistration = async () => {
    if (!event) return;

    Alert.alert(
      'Cancel Registration',
      'Are you sure you want to cancel your registration for this event?',
      [
        {text: 'Keep Registration', style: 'cancel'},
        {
          text: 'Cancel Registration',
          style: 'destructive',
          onPress: async () => {
            setIsCancelling(true);
            try {
              const result = await cancelEventRegistration(event.id);
              if (result.success) {
                setEvent(prev =>
                  prev
                    ? {
                        ...prev,
                        isRegistered: false,
                        registrationCount: Math.max(0, prev.registrationCount - 1),
                        userQrCode: null,
                      }
                    : null,
                );
              } else {
                Alert.alert('Error', result.error || 'Failed to cancel');
              }
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel registration');
            } finally {
              setIsCancelling(false);
            }
          },
        },
      ],
    );
  };

  const handleAddToCalendar = async () => {
    if (!event) return;

    try {
      const {status} = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Please allow calendar access to add events.');
        return;
      }

      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      const defaultCalendar = calendars.find(
        (cal: Calendar.Calendar) => cal.allowsModifications && cal.source.name === 'Default',
      ) || calendars.find((cal: Calendar.Calendar) => cal.allowsModifications);

      if (!defaultCalendar) {
        Alert.alert('Error', 'No writable calendar found');
        return;
      }

      await Calendar.createEventAsync(defaultCalendar.id, {
        title: event.title,
        startDate: new Date(event.startTime),
        endDate: new Date(event.endTime),
        location: `${event.restaurant.name}, ${event.restaurant.address}, ${event.restaurant.city}`,
        notes: event.description,
      });

      Alert.alert('Success!', 'Event added to your calendar.');
    } catch (error) {
      console.error('Calendar error:', error);
      Alert.alert('Error', 'Failed to add event to calendar');
    }
  };

  const handleGetDirections = () => {
    if (!event?.restaurant.latitude || !event?.restaurant.longitude) {
      Alert.alert('Error', 'Location not available for this event');
      return;
    }

    const {latitude, longitude} = event.restaurant;
    const label = encodeURIComponent(event.restaurant.name);

    const url = Platform.select({
      ios: `maps://app?daddr=${latitude},${longitude}&q=${label}`,
      android: `google.navigation:q=${latitude},${longitude}`,
      default: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
    });

    Linking.openURL(url).catch(() => {
      // Fallback to Google Maps web
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`,
      );
    });
  };

  const handleShare = async () => {
    if (!event) return;

    try {
      await Share.share({
        message: `Check out "${event.title}" at ${event.restaurant.name} on ${formattedDate}! Join me on Foodie.`,
      });
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="alert-circle" size={64} color={colors.neutral.gray300} />
        <Text style={styles.errorText}>Event not found</Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>
          Go Back
        </Button>
      </View>
    );
  }

  const typeColor = EVENT_TYPE_COLORS[event.type];
  const typeIcon = EVENT_TYPE_ICONS[event.type];
  const typeLabel = EVENT_TYPE_LABELS[event.type];

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          {event.imageUrl ? (
            <Image source={{uri: event.imageUrl}} style={styles.heroImage} resizeMode="cover" />
          ) : (
            <View style={[styles.heroImage, styles.heroPlaceholder]}>
              <Icon name={typeIcon} size={64} color={colors.neutral.gray300} />
            </View>
          )}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.heroGradient}
          />

          {/* Back Button */}
          <IconButton
            icon="arrow-left"
            iconColor="#fff"
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          />

          {/* Share Button */}
          <IconButton
            icon="share-variant"
            iconColor="#fff"
            style={styles.shareButton}
            onPress={handleShare}
          />

          {/* Type Badge */}
          <Chip
            style={[styles.typeBadge, {backgroundColor: typeColor}]}
            textStyle={styles.typeBadgeText}
            icon={() => <Icon name={typeIcon} size={14} color="#fff" />}>
            {typeLabel}
          </Chip>

          {/* Title over image */}
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>{event.title}</Text>
            <Text style={styles.heroRestaurant}>{event.restaurant.name}</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Points Reward */}
          {event.pointsReward > 0 && (
            <View style={styles.pointsReward}>
              <Icon name="star" size={20} color={colors.accent.goldenYellow} />
              <Text style={styles.pointsRewardText}>
                Earn {event.pointsReward} Foodie Points for attending!
              </Text>
            </View>
          )}

          {/* Date & Time */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="calendar" size={24} color={colors.primary.freshAvocadoGreen} />
              <Text style={styles.sectionTitle}>Date & Time</Text>
            </View>
            <Text style={styles.dateText}>{formattedDate}</Text>
            <Text style={styles.timeText}>{formattedTime}</Text>
          </View>

          <Divider style={styles.divider} />

          {/* Location */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="map-marker" size={24} color={colors.primary.freshAvocadoGreen} />
              <Text style={styles.sectionTitle}>Location</Text>
            </View>
            <Text style={styles.locationName}>{event.restaurant.name}</Text>
            <Text style={styles.locationAddress}>
              {event.restaurant.address}, {event.restaurant.city}
            </Text>
            <Button
              mode="outlined"
              icon="directions"
              style={styles.directionsButton}
              onPress={handleGetDirections}>
              Get Directions
            </Button>
          </View>

          <Divider style={styles.divider} />

          {/* Description */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="information" size={24} color={colors.primary.freshAvocadoGreen} />
              <Text style={styles.sectionTitle}>About</Text>
            </View>
            <Text style={styles.description}>{event.description}</Text>
          </View>

          {/* Prize Details */}
          {event.prizeDetails && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Icon name="trophy" size={24} color={colors.accent.goldenYellow} />
                  <Text style={styles.sectionTitle}>Prizes</Text>
                </View>
                <Text style={styles.prizeDetails}>{event.prizeDetails}</Text>
              </View>
            </>
          )}

          {/* Registration Info */}
          <Divider style={styles.divider} />
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="account-group" size={24} color={colors.primary.freshAvocadoGreen} />
              <Text style={styles.sectionTitle}>Registration</Text>
            </View>
            {spotsInfo && (
              <Text
                style={[
                  styles.spotsText,
                  spotsInfo.isFull && styles.spotsTextFull,
                ]}>
                {spotsInfo.text}
              </Text>
            )}
          </View>

          {/* QR Code Section (for registered users) */}
          {event.isRegistered && event.userQrCode && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Icon name="qrcode" size={24} color={colors.primary.freshAvocadoGreen} />
                  <Text style={styles.sectionTitle}>Your Check-in QR Code</Text>
                </View>
                <View style={styles.qrContainer}>
                  <View style={styles.qrCodePlaceholder}>
                    <Icon name="qrcode-scan" size={100} color={colors.text.primary} />
                    <Text style={styles.qrCodeText}>{event.userQrCode}</Text>
                  </View>
                  <Text style={styles.qrInstructions}>
                    Show this QR code to the staff when you arrive to check in and earn your points!
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {event.isRegistered ? (
              <>
                <Button
                  mode="contained"
                  icon="calendar-plus"
                  buttonColor={colors.primary.freshAvocadoGreen}
                  style={styles.actionButton}
                  onPress={handleAddToCalendar}>
                  Add to Calendar
                </Button>
                <Button
                  mode="outlined"
                  icon="close"
                  textColor={colors.status.error}
                  style={styles.cancelButton}
                  loading={isCancelling}
                  disabled={isCancelling}
                  onPress={handleCancelRegistration}>
                  Cancel Registration
                </Button>
              </>
            ) : (
              <Button
                mode="contained"
                icon="calendar-plus"
                buttonColor={colors.primary.freshAvocadoGreen}
                style={styles.actionButton}
                loading={isRegistering}
                disabled={isRegistering || spotsInfo?.isFull}
                onPress={handleRegister}>
                {spotsInfo?.isFull ? 'Event Full' : 'Register for Event'}
              </Button>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background.white,
  },
  errorText: {
    ...textStyles.h4,
    color: colors.text.secondary,
    marginVertical: spacing.lg,
  },
  heroContainer: {
    position: 'relative',
    height: 280,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    backgroundColor: colors.neutral.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
  },
  backButton: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  shareButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  typeBadge: {
    position: 'absolute',
    top: spacing.md + 48,
    left: spacing.md,
  },
  typeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  heroContent: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    right: spacing.lg,
  },
  heroTitle: {
    ...textStyles.h2,
    color: '#fff',
    marginBottom: spacing.xs,
  },
  heroRestaurant: {
    ...textStyles.body,
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    padding: spacing.lg,
  },
  pointsReward: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent.softYellow,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  pointsRewardText: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  divider: {
    marginVertical: spacing.md,
  },
  dateText: {
    ...textStyles.body,
    color: colors.text.primary,
    marginLeft: spacing.lg + spacing.sm,
  },
  timeText: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginLeft: spacing.lg + spacing.sm,
  },
  locationName: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginLeft: spacing.lg + spacing.sm,
  },
  locationAddress: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginLeft: spacing.lg + spacing.sm,
    marginBottom: spacing.sm,
  },
  directionsButton: {
    marginLeft: spacing.lg + spacing.sm,
    alignSelf: 'flex-start',
  },
  description: {
    ...textStyles.body,
    color: colors.text.primary,
    marginLeft: spacing.lg + spacing.sm,
    lineHeight: 24,
  },
  prizeDetails: {
    ...textStyles.body,
    color: colors.text.primary,
    marginLeft: spacing.lg + spacing.sm,
    lineHeight: 24,
  },
  spotsText: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginLeft: spacing.lg + spacing.sm,
  },
  spotsTextFull: {
    color: colors.status.error,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  qrCodePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: colors.background.lightGray,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.neutral.gray200,
    borderStyle: 'dashed',
  },
  qrCodeText: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  qrInstructions: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  actionButtons: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  actionButton: {
    paddingVertical: spacing.xs,
  },
  cancelButton: {
    borderColor: colors.status.error,
  },
});
