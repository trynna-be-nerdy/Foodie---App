import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Button, Chip, IconButton, Text} from 'react-native-paper';
import {LinearGradient} from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import * as Location from 'expo-location';

import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';
import {borderRadius, spacing} from '../theme';
import {RestaurantDetails} from '../types/restaurant';
import {API_BASE_URL} from '../config';

interface RestaurantDetailScreenProps {
  route: {
    params: {
      restaurantId: string;
    };
  };
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

// Mock business hours helper
function getCurrentDayHours(
  hours?: {day: string; open: string; close: string; isClosed: boolean}[],
) {
  if (!hours || hours.length === 0) {
    return null;
  }
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  return hours.find(h => h.day === today);
}

function isOpen(hours?: {day: string; open: string; close: string; isClosed: boolean}[]): boolean {
  const todayHours = getCurrentDayHours(hours);
  if (!todayHours || todayHours.isClosed) {
    return false;
  }

  const now = new Date();
  const currentTime = now.getHours() * 100 + now.getMinutes();
  const openTime = parseInt(todayHours.open.replace(':', ''), 10);
  const closeTime = parseInt(todayHours.close.replace(':', ''), 10);

  return currentTime >= openTime && currentTime <= closeTime;
}

function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

export function RestaurantDetailScreen({
  route,
  navigation,
}: RestaurantDetailScreenProps): React.JSX.Element {
  const {restaurantId} = route.params;
  const [restaurant, setRestaurant] = useState<RestaurantDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number; lng: number} | null>(null);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const saveScaleAnim = useRef(new Animated.Value(1)).current;

  const fetchRestaurantDetails = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}`);
      const data = await response.json();

      if (data.success) {
        setRestaurant(data.data);
      } else {
        setError(data.error?.message || 'Failed to load restaurant');
      }
    } catch (err) {
      setError('Failed to load restaurant details');
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId]);

  const getCurrentLocation = useCallback(() => {
    Location.requestForegroundPermissionsAsync()
      .then(({status}) => {
        if (status !== 'granted') {
          return null;
        }
        return Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
      })
      .then(position => {
        if (!position) {
          return;
        }
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      })
      .catch(() => undefined);
  }, []);

  // Fetch restaurant details
  useEffect(() => {
    fetchRestaurantDetails();
    getCurrentLocation();
  }, [fetchRestaurantDetails, getCurrentLocation]);

  const distanceLabel = useMemo(() => {
    if (!restaurant || !userLocation || !restaurant.latitude || !restaurant.longitude) {
      return null;
    }
    const distanceKm = calculateDistanceKm(
      userLocation.lat,
      userLocation.lng,
      restaurant.latitude,
      restaurant.longitude,
    );
    const miles = distanceKm * 0.621371;
    return `${miles.toFixed(1)} mi`;
  }, [restaurant, userLocation]);

  const openStatus = useMemo(() => {
    if (!restaurant?.businessHours) {
      return {isOpen: true, text: ''};
    }
    const open = isOpen(restaurant.businessHours);
    const todayHours = getCurrentDayHours(restaurant.businessHours);
    return {
      isOpen: open,
      text: open
        ? `Open until ${todayHours?.close || '10:00 PM'}`
        : todayHours?.isClosed
          ? 'Closed today'
          : `Opens at ${todayHours?.open || '9:00 AM'}`,
    };
  }, [restaurant?.businessHours]);

  const handleSaveToggle = useCallback(() => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
    Animated.sequence([
      Animated.timing(saveScaleAnim, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(saveScaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // TODO: Persist save state to backend
  }, [isSaved, saveScaleAnim]);

  const handleCall = useCallback(() => {
    if (restaurant?.phone) {
      Linking.openURL(`tel:${restaurant.phone}`);
    }
  }, [restaurant?.phone]);

  const handleShare = useCallback(async () => {
    if (!restaurant) {
      return;
    }

    try {
      await Share.share({
        message: `Check out ${restaurant.name} on Foodie!\n${restaurant.address}, ${restaurant.city}`,
      });
    } catch {
      // User cancelled sharing
    }
  }, [restaurant]);

  const handleCopyAddress = useCallback(() => {
    if (!restaurant) {
      return;
    }

    const fullAddress = `${restaurant.address}, ${restaurant.city}, ${restaurant.state} ${restaurant.zipCode}`;
    Clipboard.setStringAsync(fullAddress).catch(() => undefined);
    setCopiedAddress(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => undefined);

    setTimeout(() => setCopiedAddress(false), 2000);
  }, [restaurant]);

  const handleOpenMaps = useCallback(
    async (app: 'apple' | 'google' | 'waze' | 'web') => {
      if (!restaurant?.latitude || !restaurant?.longitude) {
        return;
      }

      const {latitude: lat, longitude: lng} = restaurant;
      let url = '';

      switch (app) {
        case 'apple':
          url = `maps://maps.apple.com/?daddr=${lat},${lng}`;
          break;
        case 'google':
          url = `comgooglemaps://?daddr=${lat},${lng}&directionsmode=driving`;
          break;
        case 'waze':
          url = `waze://?ll=${lat},${lng}&navigate=yes`;
          break;
        case 'web':
        default:
          url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
          break;
      }

      try {
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) {
          await Linking.openURL(url);
        } else if (app !== 'web') {
          // Fallback to web
          await Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
        }
      } catch {
        // Fallback to web
        await Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`);
      }

      setShowDirectionsModal(false);
    },
    [restaurant],
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
          <Text style={styles.loadingText}>Loading restaurant...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !restaurant) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>😕</Text>
          <Text style={styles.errorTitle}>Couldn't load restaurant</Text>
          <Text style={styles.errorText}>{error || 'Restaurant not found'}</Text>
          <Button mode="contained" onPress={fetchRestaurantDetails} style={styles.retryButton}>
            Try Again
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Image */}
        <View style={styles.heroContainer}>
          {restaurant.imageUrl ? (
            <Image source={{uri: restaurant.imageUrl}} style={styles.heroImage} resizeMode="cover" />
          ) : (
            <View style={[styles.heroImage, styles.heroPlaceholder]} />
          )}
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.heroGradient} />

          {/* Badges */}
          <View style={styles.badgeRow}>
            {restaurant.isLocalBusiness && (
              <View style={styles.localBadge}>
                <Text style={styles.localBadgeText}>Local Gem</Text>
              </View>
            )}
            {restaurant.isVerified && (
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedBadgeText}>✓ Verified</Text>
              </View>
            )}
            {distanceLabel && (
              <View style={styles.distanceBadge}>
                <Text style={styles.distanceBadgeText}>{distanceLabel}</Text>
              </View>
            )}
          </View>

          {/* Hero Content */}
          <View style={styles.heroContent}>
            <Text style={styles.restaurantName}>{restaurant.name}</Text>
            <Text style={styles.cuisineText}>
              {restaurant.cuisineTypes.slice(0, 3).join(' • ')}
            </Text>
            <View style={styles.metaRow}>
              <Text style={styles.ratingText}>
                ⭐ {restaurant.rating.toFixed(1)} ({restaurant.reviewCount} reviews)
              </Text>
              <Text style={styles.priceText}>{'$'.repeat(Math.max(1, restaurant.priceRange))}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                openStatus.isOpen ? styles.openBadge : styles.closedBadge,
              ]}>
              <Text style={styles.statusText}>{openStatus.text}</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable style={styles.actionButton} onPress={() => setShowDirectionsModal(true)}>
            <IconButton icon="directions" iconColor={colors.primary.freshAvocadoGreen} size={24} />
            <Text style={styles.actionLabel}>Directions</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={handleCall} disabled={!restaurant.phone}>
            <IconButton
              icon="phone"
              iconColor={
                restaurant.phone ? colors.primary.freshAvocadoGreen : colors.neutral.gray400
              }
              size={24}
            />
            <Text style={[styles.actionLabel, !restaurant.phone && styles.actionLabelDisabled]}>
              Call
            </Text>
          </Pressable>

          <Pressable
            style={styles.actionButton}
            onPress={() => navigation.navigate('Menu', {restaurantId})}>
            <IconButton icon="cart" iconColor={colors.primary.freshAvocadoGreen} size={24} />
            <Text style={styles.actionLabel}>Order</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={handleSaveToggle}>
            <Animated.View style={{transform: [{scale: saveScaleAnim}]}}>
              <IconButton
                icon={isSaved ? 'heart' : 'heart-outline'}
                iconColor={isSaved ? colors.status.error : colors.primary.freshAvocadoGreen}
                size={24}
              />
            </Animated.View>
            <Text style={styles.actionLabel}>{isSaved ? 'Saved' : 'Save'}</Text>
          </Pressable>

          <Pressable style={styles.actionButton} onPress={handleShare}>
            <IconButton
              icon="share-variant"
              iconColor={colors.primary.freshAvocadoGreen}
              size={24}
            />
            <Text style={styles.actionLabel}>Share</Text>
          </Pressable>
        </View>

        {/* Description */}
        {restaurant.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.descriptionText}>{restaurant.description}</Text>
          </View>
        )}

        {/* Location & Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <View style={styles.addressCard}>
            <Pressable onPress={handleCopyAddress} style={styles.addressContent}>
              <Text style={styles.addressText}>{restaurant.address}</Text>
              <Text style={styles.cityStateText}>
                {restaurant.city}, {restaurant.state} {restaurant.zipCode}
              </Text>
            </Pressable>
            <View style={styles.addressActions}>
              <Button
                mode="text"
                compact
                onPress={handleCopyAddress}
                textColor={colors.primary.basilLeaf}>
                {copiedAddress ? 'Copied!' : 'Copy'}
              </Button>
              <Button
                mode="contained"
                compact
                onPress={() => setShowDirectionsModal(true)}
                buttonColor={colors.primary.freshAvocadoGreen}>
                Directions
              </Button>
            </View>
          </View>
        </View>

        {/* Loyalty & Points */}
        {restaurant.loyaltyProgramEnabled && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rewards</Text>
            <View style={styles.loyaltyCard}>
              <View style={styles.loyaltyHeader}>
                <Text style={styles.loyaltyPoints}>{restaurant.userPointsBalance ?? 0} pts</Text>
                <Chip compact mode="outlined" style={styles.loyaltyChip}>
                  ${1} = {restaurant.pointsPerDollar} pts
                </Chip>
              </View>
              <Text style={styles.loyaltyText}>
                Earn points with every order at {restaurant.name}
              </Text>
            </View>
          </View>
        )}

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{restaurant.menuItemCount ?? 0}</Text>
            <Text style={styles.statLabel}>Menu Items</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{restaurant.socialPostCount ?? 0}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{restaurant.upcomingEventsCount ?? 0}</Text>
            <Text style={styles.statLabel}>Events</Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact</Text>
          {restaurant.phone && (
            <Pressable style={styles.contactRow} onPress={handleCall}>
              <Text style={styles.contactIcon}>📞</Text>
              <Text style={styles.contactText}>{restaurant.phone}</Text>
            </Pressable>
          )}
          {restaurant.email && (
            <Pressable
              style={styles.contactRow}
              onPress={() => Linking.openURL(`mailto:${restaurant.email}`)}>
              <Text style={styles.contactIcon}>✉️</Text>
              <Text style={styles.contactText}>{restaurant.email}</Text>
            </Pressable>
          )}
          {restaurant.website && (
            <Pressable
              style={styles.contactRow}
              onPress={() => Linking.openURL(restaurant.website!)}>
              <Text style={styles.contactIcon}>🌐</Text>
              <Text style={styles.contactText}>{restaurant.website}</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>

      {/* Directions Modal */}
      {showDirectionsModal && (
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalBackdrop} onPress={() => setShowDirectionsModal(false)} />
          <View style={styles.directionsModal}>
            <Text style={styles.modalTitle}>Get Directions</Text>

            {Platform.OS === 'ios' && (
              <Pressable style={styles.modalOption} onPress={() => handleOpenMaps('apple')}>
                <Text style={styles.modalOptionIcon}>🗺️</Text>
                <Text style={styles.modalOptionText}>Apple Maps</Text>
              </Pressable>
            )}

            <Pressable style={styles.modalOption} onPress={() => handleOpenMaps('google')}>
              <Text style={styles.modalOptionIcon}>📍</Text>
              <Text style={styles.modalOptionText}>Google Maps</Text>
            </Pressable>

            <Pressable style={styles.modalOption} onPress={() => handleOpenMaps('waze')}>
              <Text style={styles.modalOptionIcon}>🚗</Text>
              <Text style={styles.modalOptionText}>Waze</Text>
            </Pressable>

            <Button
              mode="outlined"
              onPress={() => setShowDirectionsModal(false)}
              style={styles.modalCancel}>
              Cancel
            </Button>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  loadingText: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  errorTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
  },
  errorText: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary.freshAvocadoGreen,
  },
  heroContainer: {
    height: 280,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroPlaceholder: {
    backgroundColor: colors.neutral.gray300,
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  badgeRow: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    gap: spacing.sm,
  },
  localBadge: {
    backgroundColor: colors.primary.freshAvocadoGreen,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  localBadgeText: {
    ...textStyles.caption,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  verifiedBadge: {
    backgroundColor: colors.status.info,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  verifiedBadgeText: {
    ...textStyles.caption,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  distanceBadge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginLeft: 'auto',
  },
  distanceBadgeText: {
    ...textStyles.caption,
    color: colors.text.primary,
    fontWeight: '600',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
  },
  restaurantName: {
    ...textStyles.h1,
    color: colors.text.inverse,
    marginBottom: spacing.xs,
  },
  cuisineText: {
    ...textStyles.body,
    color: colors.neutral.gray200,
    marginBottom: spacing.sm,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  ratingText: {
    ...textStyles.body,
    color: colors.text.inverse,
  },
  priceText: {
    ...textStyles.body,
    color: colors.neutral.gray200,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  openBadge: {
    backgroundColor: colors.status.success,
  },
  closedBadge: {
    backgroundColor: colors.status.error,
  },
  statusText: {
    ...textStyles.caption,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    backgroundColor: colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: -spacing.sm,
  },
  actionLabelDisabled: {
    color: colors.neutral.gray400,
  },
  section: {
    padding: spacing.md,
    backgroundColor: colors.background.white,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  descriptionText: {
    ...textStyles.body,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  addressCard: {
    backgroundColor: colors.background.lightGray,
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  addressContent: {
    marginBottom: spacing.sm,
  },
  addressText: {
    ...textStyles.body,
    color: colors.text.primary,
  },
  cityStateText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  addressActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  loyaltyCard: {
    backgroundColor: colors.primary.freshAvocadoGreen + '15',
    borderRadius: borderRadius.md,
    padding: spacing.md,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  loyaltyPoints: {
    ...textStyles.h2,
    color: colors.primary.freshAvocadoGreen,
  },
  loyaltyChip: {
    borderColor: colors.primary.freshAvocadoGreen,
  },
  loyaltyText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    marginTop: spacing.sm,
    paddingVertical: spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...textStyles.h3,
    color: colors.text.primary,
  },
  statLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: colors.neutral.gray200,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  contactIcon: {
    fontSize: 18,
  },
  contactText: {
    ...textStyles.body,
    color: colors.primary.freshAvocadoGreen,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  directionsModal: {
    backgroundColor: colors.background.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  modalTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  modalOptionIcon: {
    fontSize: 24,
  },
  modalOptionText: {
    ...textStyles.body,
    color: colors.text.primary,
  },
  modalCancel: {
    marginTop: spacing.lg,
  },
});
