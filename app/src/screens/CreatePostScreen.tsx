import React, {useCallback, useState} from 'react';
import {Alert, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import {Button, Chip, IconButton, Menu, Text, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

import {borderRadius, colors, spacing} from '../theme';
import {textStyles} from '../theme/typography';
import * as socialFeedService from '../services/socialFeedService';

const MAX_PHOTOS = 5;
const MAX_CAPTION_LENGTH = 500;

type PrivacySetting = 'PUBLIC' | 'FRIENDS_ONLY' | 'PRIVATE';

interface SelectedPhoto {
  uri: string;
  fileName?: string;
  type?: string;
  fileSize?: number;
}

export function CreatePostScreen(): React.JSX.Element {
  const navigation = useNavigation<StackNavigationProp<any>>();

  const [photos, setPhotos] = useState<SelectedPhoto[]>([]);
  const [caption, setCaption] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [dishTags, setDishTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [privacy, setPrivacy] = useState<PrivacySetting>('PUBLIC');
  const [privacyMenuVisible, setPrivacyMenuVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoSourceMenuVisible, setPhotoSourceMenuVisible] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<{id: string; name: string; cuisineType: string} | null>(null);
  const [restaurantModalVisible, setRestaurantModalVisible] = useState(false);
  const [restaurantSearch, setRestaurantSearch] = useState('');
  const [restaurants, setRestaurants] = useState<Array<{id: string; name: string; cuisineType: string}>>([]);

  const handleSelectFromGallery = useCallback(async () => {
    setPhotoSourceMenuVisible(false);

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Permission required', 'Please allow photo library access.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: MAX_PHOTOS - photos.length,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newPhotos: SelectedPhoto[] = result.assets.map(asset => ({
        uri: asset.uri,
        fileName: asset.fileName ?? undefined,
        type: asset.type ?? undefined,
        fileSize: asset.fileSize ?? undefined,
      }));

      setPhotos(prev => [...prev, ...newPhotos].slice(0, MAX_PHOTOS));
    }
  }, [photos.length]);

  const handleTakePhoto = useCallback(async () => {
    setPhotoSourceMenuVisible(false);

    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Permission required', 'Please allow camera access.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: false,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      const asset = result.assets[0];
      const newPhoto: SelectedPhoto = {
        uri: asset.uri,
        fileName: asset.fileName ?? undefined,
        type: asset.type ?? undefined,
        fileSize: asset.fileSize ?? undefined,
      };
      setPhotos(prev => [...prev, newPhoto].slice(0, MAX_PHOTOS));
    }
  }, []);

  const handleRemovePhoto = useCallback((index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  }, []);

  const handleAddTag = useCallback(() => {
    const tag = tagInput.trim();
    if (tag && !dishTags.includes(tag) && dishTags.length < 10) {
      setDishTags(prev => [...prev, tag]);
      setTagInput('');
    }
  }, [tagInput, dishTags]);

  const handleRemoveTag = useCallback((tag: string) => {
    setDishTags(prev => prev.filter(t => t !== tag));
  }, []);

  const handleOpenRestaurantSelector = useCallback(async () => {
    setRestaurantModalVisible(true);
    const restaurantsList = await socialFeedService.searchRestaurants('');
    setRestaurants(restaurantsList);
  }, []);

  const handleSelectRestaurant = useCallback((restaurant: {id: string; name: string; cuisineType: string}) => {
    setSelectedRestaurant(restaurant);
    setRestaurantModalVisible(false);
    setRestaurantSearch('');
  }, []);

  const handleRemoveRestaurant = useCallback(() => {
    setSelectedRestaurant(null);
  }, []);

  const handleSearchRestaurants = useCallback(async (query: string) => {
    setRestaurantSearch(query);
    const filtered = await socialFeedService.searchRestaurants(query);
    setRestaurants(filtered);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (photos.length === 0 && !caption.trim()) {
      Alert.alert('Error', 'Please add at least one photo or write a caption.');
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Upload photos to S3 and get URLs
      // TODO: Call API to create post
      const postData = {
        content: caption,
        mediaUrls: photos.map(p => p.uri), // Replace with S3 URLs after upload
        restaurantId: selectedRestaurant?.id,
        rating: rating > 0 ? rating : undefined,
        dishTags,
        privacy,
      };

      console.log('Creating post:', postData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      Alert.alert('Success', 'Your post has been created!', [
        {text: 'OK', onPress: () => navigation.goBack()},
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [photos, caption, rating, dishTags, privacy, navigation]);

  const privacyLabels: Record<PrivacySetting, string> = {
    PUBLIC: 'Public',
    FRIENDS_ONLY: 'Friends Only',
    PRIVATE: 'Private',
  };

  const privacyIcons: Record<PrivacySetting, string> = {
    PUBLIC: 'earth',
    FRIENDS_ONLY: 'account-group',
    PRIVATE: 'lock',
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Photo Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Photos ({photos.length}/{MAX_PHOTOS})
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photosContainer}>
            {photos.map((photo, index) => (
              <View key={photo.uri} style={styles.photoWrapper}>
                <Image source={{uri: photo.uri}} style={styles.photoThumbnail} />
                <IconButton
                  icon="close-circle"
                  size={24}
                  iconColor={colors.status.error}
                  style={styles.removePhotoButton}
                  onPress={() => handleRemovePhoto(index)}
                />
                {index === 0 && (
                  <View style={styles.coverBadge}>
                    <Text style={styles.coverBadgeText}>Cover</Text>
                  </View>
                )}
              </View>
            ))}

            {photos.length < MAX_PHOTOS && (
              <Menu
                visible={photoSourceMenuVisible}
                onDismiss={() => setPhotoSourceMenuVisible(false)}
                anchor={
                  <Pressable
                    style={styles.addPhotoButton}
                    onPress={() => setPhotoSourceMenuVisible(true)}>
                    <Icon name="plus" size={32} color={colors.text.secondary} />
                    <Text style={styles.addPhotoText}>Add Photo</Text>
                  </Pressable>
                }>
                <Menu.Item leadingIcon="camera" onPress={handleTakePhoto} title="Take Photo" />
                <Menu.Item
                  leadingIcon="image-multiple"
                  onPress={handleSelectFromGallery}
                  title="Choose from Gallery"
                />
              </Menu>
            )}
          </ScrollView>
        </View>

        {/* Tag Restaurant */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tag Restaurant (Optional)</Text>
          {selectedRestaurant ? (
            <View style={styles.selectedRestaurantContainer}>
              <View style={styles.selectedRestaurantInfo}>
                <Icon name="map-marker" size={20} color={colors.primary.freshAvocadoGreen} />
                <View style={styles.selectedRestaurantText}>
                  <Text style={styles.selectedRestaurantName}>{selectedRestaurant.name}</Text>
                  <Text style={styles.selectedRestaurantCuisine}>{selectedRestaurant.cuisineType}</Text>
                </View>
              </View>
              <IconButton
                icon="close"
                size={20}
                iconColor={colors.text.secondary}
                onPress={handleRemoveRestaurant}
              />
            </View>
          ) : (
            <Pressable style={styles.tagRestaurantButton} onPress={handleOpenRestaurantSelector}>
              <Icon name="plus-circle-outline" size={24} color={colors.primary.freshAvocadoGreen} />
              <Text style={styles.tagRestaurantText}>Tag Restaurant</Text>
            </Pressable>
          )}
        </View>

        {/* Caption */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Caption</Text>
          <TextInput
            mode="outlined"
            placeholder="Share your food experience..."
            value={caption}
            onChangeText={setCaption}
            multiline
            numberOfLines={4}
            maxLength={MAX_CAPTION_LENGTH}
            style={styles.captionInput}
            outlineColor={colors.neutral.gray300}
            activeOutlineColor={colors.primary.freshAvocadoGreen}
          />
          <Text style={styles.charCount}>
            {caption.length}/{MAX_CAPTION_LENGTH}
          </Text>
        </View>

        {/* Rating */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rating (Optional)</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map(star => (
              <Pressable key={star} onPress={() => setRating(star === rating ? 0 : star)}>
                <Icon
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={36}
                  color={star <= rating ? colors.accent.goldenYellow : colors.neutral.gray400}
                />
              </Pressable>
            ))}
            {rating > 0 && (
              <Text style={styles.ratingText}>
                {rating} star{rating > 1 ? 's' : ''}
              </Text>
            )}
          </View>
        </View>

        {/* Dish Tags */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dish Tags</Text>
          <View style={styles.tagInputRow}>
            <TextInput
              mode="outlined"
              placeholder="Add a dish tag..."
              value={tagInput}
              onChangeText={setTagInput}
              onSubmitEditing={handleAddTag}
              style={styles.tagInput}
              outlineColor={colors.neutral.gray300}
              activeOutlineColor={colors.primary.freshAvocadoGreen}
              dense
            />
            <IconButton
              icon="plus"
              mode="contained"
              containerColor={colors.primary.freshAvocadoGreen}
              iconColor={colors.text.inverse}
              onPress={handleAddTag}
              disabled={!tagInput.trim()}
            />
          </View>
          {dishTags.length > 0 && (
            <View style={styles.tagsContainer}>
              {dishTags.map(tag => (
                <Chip
                  key={tag}
                  style={styles.tag}
                  textStyle={styles.tagText}
                  onClose={() => handleRemoveTag(tag)}>
                  {tag}
                </Chip>
              ))}
            </View>
          )}
        </View>

        {/* Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <Menu
            visible={privacyMenuVisible}
            onDismiss={() => setPrivacyMenuVisible(false)}
            anchor={
              <Pressable style={styles.privacySelector} onPress={() => setPrivacyMenuVisible(true)}>
                <Icon
                  name={privacyIcons[privacy]}
                  size={24}
                  color={colors.primary.freshAvocadoGreen}
                />
                <Text style={styles.privacyText}>{privacyLabels[privacy]}</Text>
                <Icon name="chevron-down" size={24} color={colors.text.secondary} />
              </Pressable>
            }>
            {(['PUBLIC', 'FRIENDS_ONLY', 'PRIVATE'] as PrivacySetting[]).map(option => (
              <Menu.Item
                key={option}
                leadingIcon={privacyIcons[option]}
                onPress={() => {
                  setPrivacy(option);
                  setPrivacyMenuVisible(false);
                }}
                title={privacyLabels[option]}
              />
            ))}
          </Menu>
        </View>
      </ScrollView>

      {/* Restaurant Selector Modal */}
      <Modal
        visible={restaurantModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setRestaurantModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Restaurant</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setRestaurantModalVisible(false)}
              />
            </View>

            <TextInput
              mode="outlined"
              placeholder="Search restaurants..."
              value={restaurantSearch}
              onChangeText={handleSearchRestaurants}
              left={<TextInput.Icon icon="magnify" />}
              style={styles.searchInput}
              outlineColor={colors.neutral.gray300}
              activeOutlineColor={colors.primary.freshAvocadoGreen}
            />

            <FlatList
              data={restaurants}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Pressable
                  style={styles.restaurantItem}
                  onPress={() => handleSelectRestaurant(item)}>
                  <Icon name="map-marker" size={24} color={colors.primary.freshAvocadoGreen} />
                  <View style={styles.restaurantItemInfo}>
                    <Text style={styles.restaurantItemName}>{item.name}</Text>
                    <Text style={styles.restaurantItemCuisine}>{item.cuisineType}</Text>
                  </View>
                  <Icon
                    name={selectedRestaurant?.id === item.id ? 'check-circle' : 'circle-outline'}
                    size={24}
                    color={selectedRestaurant?.id === item.id ? colors.primary.freshAvocadoGreen : colors.neutral.gray400}
                  />
                </Pressable>
              )}
              ListEmptyComponent={
                <View style={styles.emptyList}>
                  <Icon name="store-off" size={48} color={colors.neutral.gray400} />
                  <Text style={styles.emptyListText}>No restaurants found</Text>
                </View>
              }
              contentContainerStyle={styles.restaurantList}
            />
          </View>
        </View>
      </Modal>

      {/* Submit Button */}
      <View style={styles.footer}>
        <Button
          mode="contained"
          buttonColor={colors.primary.freshAvocadoGreen}
          textColor={colors.text.inverse}
          onPress={handleSubmit}
          loading={isSubmitting}
          disabled={isSubmitting || (photos.length === 0 && !caption.trim())}
          style={styles.submitButton}
          contentStyle={styles.submitButtonContent}>
          Share Post
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  sectionTitle: {
    ...textStyles.labelMedium,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  photosContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  photoWrapper: {
    position: 'relative',
  },
  photoThumbnail: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral.gray200,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: colors.background.white,
    margin: 0,
  },
  coverBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: colors.primary.freshAvocadoGreen,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  coverBadgeText: {
    ...textStyles.caption,
    color: colors.text.inverse,
    fontSize: 10,
  },
  addPhotoButton: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.neutral.gray300,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.white,
  },
  addPhotoText: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  captionInput: {
    backgroundColor: colors.background.white,
    minHeight: 100,
  },
  charCount: {
    ...textStyles.caption,
    color: colors.text.secondary,
    textAlign: 'right',
    marginTop: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  ratingText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
  tagInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  tagInput: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  tag: {
    backgroundColor: colors.primary.mintGreen,
  },
  tagText: {
    color: colors.primary.freshAvocadoGreen,
  },
  privacySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.neutral.gray300,
  },
  privacyText: {
    ...textStyles.body,
    color: colors.text.primary,
    flex: 1,
  },
  footer: {
    padding: spacing.base,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
    backgroundColor: colors.background.white,
  },
  submitButton: {
    borderRadius: borderRadius.md,
  },
  submitButtonContent: {
    paddingVertical: spacing.xs,
  },
  tagRestaurantButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.background.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.neutral.gray300,
    borderStyle: 'dashed',
  },
  tagRestaurantText: {
    ...textStyles.body,
    color: colors.primary.freshAvocadoGreen,
    fontWeight: '600',
  },
  selectedRestaurantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary.mintGreen,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  selectedRestaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  selectedRestaurantText: {
    flex: 1,
  },
  selectedRestaurantName: {
    ...textStyles.labelMedium,
    color: colors.primary.basilLeaf,
    fontWeight: '600',
  },
  selectedRestaurantCuisine: {
    ...textStyles.caption,
    color: colors.primary.basilLeaf,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: colors.background.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '80%',
    paddingBottom: spacing.xl,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.base,
    paddingTop: spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  modalTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
  },
  searchInput: {
    margin: spacing.base,
    backgroundColor: colors.background.white,
  },
  restaurantList: {
    paddingHorizontal: spacing.base,
  },
  restaurantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.neutral.gray200,
    marginBottom: spacing.sm,
  },
  restaurantItemInfo: {
    flex: 1,
  },
  restaurantItemName: {
    ...textStyles.labelMedium,
    color: colors.text.primary,
  },
  restaurantItemCuisine: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  emptyList: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyListText: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
});
