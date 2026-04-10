import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  IconButton,
  Surface,
  ActivityIndicator,
  Divider,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {textStyles} from '../../theme/typography';
import {spacing} from '../../theme';
import {
  RestaurantSearchResult,
  searchRestaurants,
  getLoyaltyRestaurants,
} from '../../services/walletService';

interface AddRestaurantModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectRestaurant: (restaurant: RestaurantSearchResult) => void;
  onManualEntry: () => void;
}

const RestaurantListSeparator = (): React.JSX.Element => <Divider />;

export function AddRestaurantModal({
  visible,
  onClose,
  onSelectRestaurant,
  onManualEntry,
}: AddRestaurantModalProps): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState<RestaurantSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load loyalty restaurants on mount
  useEffect(() => {
    if (visible) {
      loadLoyaltyRestaurants();
    }
  }, [visible]);

  const loadLoyaltyRestaurants = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await getLoyaltyRestaurants();
      setRestaurants(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load restaurants');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      loadLoyaltyRestaurants();
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const results = await searchRestaurants(query);
      setRestaurants(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSelectRestaurant = (restaurant: RestaurantSearchResult) => {
    onSelectRestaurant(restaurant);
    setSearchQuery('');
  };

  const handleClose = () => {
    setSearchQuery('');
    setError(null);
    onClose();
  };

  const renderRestaurantItem = ({item}: {item: RestaurantSearchResult}) => (
    <TouchableOpacity
      style={styles.restaurantItem}
      onPress={() => handleSelectRestaurant(item)}
      activeOpacity={0.7}>
      {item.imageUrl ? (
        <Image source={{uri: item.imageUrl}} style={styles.restaurantLogo} />
      ) : (
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>{item.name.charAt(0)}</Text>
        </View>
      )}
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.restaurantCuisine}>{item.cuisineTypes.slice(0, 2).join(' • ')}</Text>
        {item.loyaltyProgramEnabled && (
          <View style={styles.loyaltyBadge}>
            <Text style={styles.loyaltyText}>{item.pointsPerDollar} pts/$1</Text>
          </View>
        )}
      </View>
      <IconButton icon="chevron-right" size={24} iconColor={colors.text.secondary} />
    </TouchableOpacity>
  );

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={handleClose}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Add Restaurant</Text>
            <IconButton icon="close" size={24} onPress={handleClose} />
          </View>

          {/* Search */}
          <View style={styles.searchContainer}>
            <TextInput
              mode="outlined"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChangeText={handleSearch}
              left={<TextInput.Icon icon="magnify" />}
              style={styles.searchInput}
            />
          </View>

          {/* Error */}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Loading */}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
            </View>
          )}

          {/* Restaurant List */}
          {!isLoading && (
            <FlatList
              data={restaurants}
              renderItem={renderRestaurantItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={RestaurantListSeparator}
              contentContainerStyle={styles.listContent}
              ListHeaderComponent={
                <Text style={styles.sectionTitle}>
                  {searchQuery ? 'Search Results' : 'Popular Restaurants'}
                </Text>
              }
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Text style={styles.emptyText}>No restaurants found</Text>
                </View>
              }
            />
          )}

          {/* Manual Entry Button */}
          <Surface style={styles.footer} elevation={4}>
            <Text style={styles.footerText}>Can't find your restaurant?</Text>
            <Button
              mode="outlined"
              onPress={onManualEntry}
              icon="pencil-plus"
              style={styles.manualButton}>
              Add Manually
            </Button>
          </Surface>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.lightGray,
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  searchContainer: {
    padding: spacing.md,
  },
  searchInput: {
    backgroundColor: colors.background.white,
  },
  errorContainer: {
    backgroundColor: colors.status.errorLight,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    borderRadius: 8,
  },
  errorText: {
    color: colors.status.error,
    ...textStyles.bodySmall,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    ...textStyles.h4,
    color: colors.text.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.white,
  },
  restaurantLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.lightGray,
  },
  logoPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.freshAvocadoGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    ...textStyles.h3,
    color: colors.text.inverse,
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  restaurantName: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  restaurantCuisine: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  loyaltyBadge: {
    backgroundColor: colors.primary.freshAvocadoGreen + '20',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  loyaltyText: {
    ...textStyles.caption,
    color: colors.primary.freshAvocadoGreen,
    fontWeight: '600',
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.background.white,
    padding: spacing.md,
    alignItems: 'center',
  },
  footerText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  manualButton: {
    width: '100%',
  },
});
