import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, Image, Pressable, RefreshControl, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlashList} from '@shopify/flash-list';
import {Button, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute, RouteProp} from '@react-navigation/native';
import type {RootStackParamList} from '../navigation/AppNavigator';

import {borderRadius, colors, spacing} from '../theme';
import {textStyles} from '../theme/typography';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const POST_SIZE = (SCREEN_WIDTH - spacing.xs * 4) / 3;

interface UserProfile {
  id: string;
  name: string;
  profilePhoto: string | null;
  createdAt: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  isFollowing: boolean;
}

interface UserPost {
  id: string;
  mediaUrls: string[];
  likeCount: number;
  commentCount: number;
}

type UserProfileRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;
export function UserProfileScreen(): React.JSX.Element {
  const route = useRoute<UserProfileRouteProp>();
  const {userId} = route.params;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.get(`/users/${userId}`);

      // Mock data
      const mockProfile: UserProfile = {
        id: userId,
        name: 'Sarah Johnson',
        profilePhoto: 'https://picsum.photos/200/200?random=profile',
        createdAt: '2024-01-15T00:00:00Z',
        postCount: 42,
        followerCount: 1234,
        followingCount: 567,
        isFollowing: false,
      };

      setProfile(mockProfile);

      // Mock posts
      const mockPosts: UserPost[] = Array.from({length: 12}, (_, i) => ({
        id: `post-${i}`,
        mediaUrls: [`https://picsum.photos/400/400?random=${i}`],
        likeCount: Math.floor(Math.random() * 100),
        commentCount: Math.floor(Math.random() * 20),
      }));

      setPosts(mockPosts);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchProfile();
  }, [fetchProfile]);

  const handleToggleFollow = useCallback(async () => {
    if (!profile) {
      return;
    }

    setIsFollowLoading(true);
    try {
      // TODO: Call API
      // await api.post(`/users/${userId}/follow`);

      setProfile(prev =>
        prev
          ? {
              ...prev,
              isFollowing: !prev.isFollowing,
              followerCount: prev.isFollowing ? prev.followerCount - 1 : prev.followerCount + 1,
            }
          : null,
      );
    } catch (error) {
      console.error('Error toggling follow:', error);
    } finally {
      setIsFollowLoading(false);
    }
  }, [profile]);

  const formatCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const renderHeader = () => {
    if (!profile) {
      return null;
    }

    return (
      <View style={styles.header}>
        {/* Profile Info */}
        <View style={styles.profileInfo}>
          <Image
            source={{
              uri: profile.profilePhoto || 'https://picsum.photos/200/200?random=default',
            }}
            style={styles.avatar}
          />
          <View style={styles.statsContainer}>
            <Pressable style={styles.stat}>
              <Text style={styles.statNumber}>{formatCount(profile.postCount)}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </Pressable>
            <Pressable style={styles.stat}>
              <Text style={styles.statNumber}>{formatCount(profile.followerCount)}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </Pressable>
            <Pressable style={styles.stat}>
              <Text style={styles.statNumber}>{formatCount(profile.followingCount)}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </Pressable>
          </View>
        </View>

        {/* Name */}
        <Text style={styles.name}>{profile.name}</Text>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            mode={profile.isFollowing ? 'outlined' : 'contained'}
            buttonColor={profile.isFollowing ? undefined : colors.primary.freshAvocadoGreen}
            textColor={profile.isFollowing ? colors.text.primary : colors.text.inverse}
            style={styles.followButton}
            loading={isFollowLoading}
            onPress={handleToggleFollow}>
            {profile.isFollowing ? 'Following' : 'Follow'}
          </Button>
          <Button
            mode="outlined"
            style={styles.messageButton}
            onPress={() => {
              /* TODO: Open message */
            }}>
            Message
          </Button>
        </View>

        {/* Posts Grid Header */}
        <View style={styles.gridHeader}>
          <Icon name="grid" size={24} color={colors.primary.freshAvocadoGreen} />
        </View>
      </View>
    );
  };

  const renderPost = ({item}: {item: UserPost}) => (
    <Pressable
      style={styles.postThumbnail}
      onPress={() => {
        /* TODO: Navigate to post detail */
      }}>
      <Image source={{uri: item.mediaUrls[0]}} style={styles.postImage} resizeMode="cover" />
      {item.mediaUrls.length > 1 && (
        <View style={styles.multipleIndicator}>
          <Icon name="image-multiple" size={16} color={colors.text.inverse} />
        </View>
      )}
    </Pressable>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>User not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlashList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        numColumns={3}
        ListHeaderComponent={renderHeader}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary.freshAvocadoGreen]}
            tintColor={colors.primary.freshAvocadoGreen}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="camera-off" size={48} color={colors.neutral.gray400} />
            <Text style={styles.emptyText}>No posts yet</Text>
          </View>
        }
      />
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
  },
  loadingText: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  header: {
    paddingHorizontal: spacing.base,
    paddingBottom: spacing.md,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.neutral.gray200,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: spacing.lg,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    ...textStyles.h4,
    color: colors.text.primary,
  },
  statLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  name: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
    marginTop: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  followButton: {
    flex: 1,
    borderRadius: borderRadius.md,
  },
  messageButton: {
    flex: 1,
    borderRadius: borderRadius.md,
  },
  gridHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  postThumbnail: {
    width: POST_SIZE,
    height: POST_SIZE,
    margin: spacing.xs / 2,
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.neutral.gray200,
  },
  multipleIndicator: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  emptyText: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
});
