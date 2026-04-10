import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlashList} from '@shopify/flash-list';
import {IconButton, Text, Badge} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {LinearGradient} from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../navigation/AppNavigator';

import {CommentModal} from '../components/social/CommentModal';
import {SkeletonPostCard} from '../components/social';
import {borderRadius, colors, spacing} from '../theme';
import {textStyles} from '../theme/typography';
import {triggerHaptic} from '../services/haptics';
import * as socialFeedService from '../services/socialFeedService';
import type {SocialPost as SocialPostType} from '../services/socialFeedService';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SKELETON_COUNT = 4;

const FeedSeparator = (): React.JSX.Element => <View style={styles.separator} />;

function FadeInView({children}: {children: React.ReactNode}): React.JSX.Element {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return <Animated.View style={{opacity}}>{children}</Animated.View>;
}

function FeedHeader({onPostNow, onMyPosts, onMessages, messageCount}: {
  onPostNow: () => void;
  onMyPosts: () => void;
  onMessages: () => void;
  messageCount: number;
}): React.JSX.Element {
  return (
    <View style={styles.feedHeader}>
      {/* Post Now Button with Gradient */}
      <Pressable onPress={onPostNow}>
        <LinearGradient
          colors={[colors.primary.freshAvocadoGreen, colors.primary.limeZest]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.postNowButton}>
          <Icon name="camera-plus" size={20} color={colors.text.inverse} />
          <Text style={styles.postNowText}>Post Now</Text>
        </LinearGradient>
      </Pressable>

      {/* My Posts Button */}
      <Pressable style={styles.myPostsButton} onPress={onMyPosts}>
        <Icon name="grid" size={20} color={colors.primary.basilLeaf} />
        <Text style={styles.myPostsText}>My Posts</Text>
      </Pressable>

      {/* Messages Button with Badge */}
      <Pressable style={styles.messagesButton} onPress={onMessages}>
        <View>
          <Icon name="message-outline" size={24} color={colors.primary.basilLeaf} />
          {messageCount > 0 && (
            <Badge style={styles.messageBadge}>{messageCount}</Badge>
          )}
        </View>
        <Text style={styles.messagesText}>Messages</Text>
      </Pressable>
    </View>
  );
}

type SocialPost = SocialPostType;

type SocialFeedNavigationProp = StackNavigationProp<RootStackParamList>;

export function SocialFeedScreen(): React.JSX.Element {
  const navigation = useNavigation<SocialFeedNavigationProp>();
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [messageCount] = useState(3); // Mock unread message count
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const fetchPosts = useCallback(async (refresh = false, loadMore = false) => {
    try {
      if (!refresh && !loadMore) {
        setIsLoading(true);
      }

      const cursor = refresh ? undefined : nextCursor || undefined;
      const response = await socialFeedService.getSocialFeed(cursor, 20);

      if (refresh) {
        setPosts(response.posts);
      } else {
        setPosts(prev => [...prev, ...response.posts]);
      }

      setNextCursor(response.nextCursor);
      setHasMore(response.nextCursor !== null);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Show error to user (could add Snackbar here)
    } finally {
      if (refresh) {
        setIsRefreshing(false);
        triggerHaptic('impactLight');
      } else if (loadMore) {
        setIsLoadingMore(false);
      } else {
        setIsLoading(false);
      }
    }
  }, [nextCursor]);

  useEffect(() => {
    fetchPosts(true);
  }, [fetchPosts]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchPosts(true);
  }, [fetchPosts]);

  const handleLoadMore = useCallback(() => {
    if (isLoading || isLoadingMore || !hasMore) {
      return;
    }

    setIsLoadingMore(true);
    fetchPosts(false, true);
  }, [isLoading, isLoadingMore, hasMore, fetchPosts]);

  const handleLike = useCallback(async (postId: string) => {
    // Optimistic update
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1,
            }
          : post,
      ),
    );

    try {
      const response = await socialFeedService.toggleLike(postId);
      // Update with actual values from server
      setPosts(prev =>
        prev.map(post =>
          post.id === postId
            ? {
                ...post,
                isLiked: response.isLiked,
                likeCount: response.likeCount,
              }
            : post,
        ),
      );
    } catch (error) {
      console.error('Error toggling like:', error);
      // Rollback on error
      setPosts(prev =>
        prev.map(post =>
          post.id === postId
            ? {
                ...post,
                isLiked: !post.isLiked,
                likeCount: post.isLiked ? post.likeCount + 1 : post.likeCount - 1,
              }
            : post,
        ),
      );
    }
  }, []);

  const handleOpenComments = useCallback((postId: string) => {
    setSelectedPostId(postId);
    setCommentModalVisible(true);
  }, []);

  const handleCommentAdded = useCallback(() => {
    if (selectedPostId) {
      setPosts(prev =>
        prev.map(post =>
          post.id === selectedPostId ? {...post, commentCount: post.commentCount + 1} : post,
        ),
      );
    }
  }, [selectedPostId]);

  const handlePostNow = useCallback(() => {
    navigation.navigate('CreatePost', {});
  }, [navigation]);

  const handleMyPosts = useCallback(() => {
    Alert.alert('My Posts', 'Navigate to your posts gallery (Coming soon)');
  }, []);

  const handleMessages = useCallback(() => {
    Alert.alert('Messages', 'Navigate to direct messages (Coming soon)');
  }, []);

  const renderPost = ({item}: {item: SocialPost}) => (
    <FadeInView>
      <PostCard
        post={item}
        onLike={() => handleLike(item.id)}
        onComment={() => handleOpenComments(item.id)}
        onShare={() => {
          /* TODO: Share post */
        }}
        onUserPress={() => navigation.navigate('UserProfile', {userId: item.user.id})}
        onRestaurantPress={() => {
          if (item.restaurant) {
            navigation.navigate('RestaurantDetail', {restaurantId: item.restaurant.id});
          }
        }}
      />
    </FadeInView>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlashList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListHeaderComponent={
          <FeedHeader
            onPostNow={handlePostNow}
            onMyPosts={handleMyPosts}
            onMessages={handleMessages}
            messageCount={messageCount}
          />
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary.freshAvocadoGreen]}
            tintColor={colors.primary.freshAvocadoGreen}
          />
        }
        ListEmptyComponent={
          isLoading ? (
            <View style={styles.skeletonContainer}>
              {Array.from({length: SKELETON_COUNT}).map((_, index) => (
                <SkeletonPostCard key={`skeleton-${index}`} />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Icon name="image-off" size={48} color={colors.neutral.gray400} />
              <Text style={styles.emptyTitle}>No posts yet</Text>
              <Text style={styles.emptyText}>Follow some foodies or create your first post!</Text>
            </View>
          )
        }
        ListFooterComponent={
          isLoadingMore ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color={colors.primary.freshAvocadoGreen} />
              <Text style={styles.footerText}>Loading more posts...</Text>
            </View>
          ) : null
        }
        ItemSeparatorComponent={FeedSeparator}
      />

      {selectedPostId && (
        <CommentModal
          visible={commentModalVisible}
          postId={selectedPostId}
          onClose={() => {
            setCommentModalVisible(false);
            setSelectedPostId(null);
          }}
          onCommentAdded={handleCommentAdded}
        />
      )}
    </SafeAreaView>
  );
}

interface PostCardProps {
  post: SocialPost;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onUserPress: () => void;
  onRestaurantPress: () => void;
}

function PostCard({
  post,
  onLike,
  onComment,
  onShare,
  onUserPress,
  onRestaurantPress,
}: PostCardProps): React.JSX.Element {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const likeScale = useRef(new Animated.Value(1)).current;
  const heartOpacity = useRef(new Animated.Value(0)).current;
  const heartScale = useRef(new Animated.Value(0)).current;

  const animateLike = useCallback(() => {
    // Button scale animation
    Animated.sequence([
      Animated.timing(likeScale, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(likeScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Heart overlay animation (double-tap style)
    if (!post.isLiked) {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(heartOpacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.delay(400),
          Animated.timing(heartOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.spring(heartScale, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
          }),
          Animated.timing(heartScale, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }

    onLike();
  }, [post.isLiked, likeScale, heartOpacity, heartScale, onLike]);

  const handleDoubleTap = useCallback(() => {
    if (!post.isLiked) {
      animateLike();
    }
  }, [post.isLiked, animateLike]);

  const formatTimeAgo = (dateString: string): string => {
    const now = Date.now();
    const date = new Date(dateString).getTime();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) {
      return 'Just now';
    }
    if (minutes < 60) {
      return `${minutes}m ago`;
    }
    if (hours < 24) {
      return `${hours}h ago`;
    }
    if (days < 7) {
      return `${days}d ago`;
    }
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <View style={styles.postCard}>
      {/* Header */}
      <Pressable style={styles.postHeader} onPress={onUserPress}>
        <Image
          source={{
            uri: post.user.profilePhoto || 'https://picsum.photos/100/100?random=default',
          }}
          style={styles.avatar}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.timestamp}>{formatTimeAgo(post.createdAt)}</Text>
          {post.restaurant && (
            <Pressable onPress={onRestaurantPress} style={styles.restaurantTag}>
              <Icon name="map-marker" size={14} color={colors.primary.freshAvocadoGreen} />
              <Text style={styles.restaurantName}>@ {post.restaurant.name}</Text>
            </Pressable>
          )}
        </View>
        <IconButton icon="dots-vertical" size={20} onPress={() => {}} />
      </Pressable>

      {/* Images */}
      {post.mediaUrls.length > 0 && (
        <Pressable style={styles.imageContainer} onPress={handleDoubleTap}>
          <Image
            source={{uri: post.mediaUrls[currentImageIndex]}}
            style={styles.postImage}
            resizeMode="cover"
          />
          {/* Heart overlay animation */}
          <Animated.View
            style={[
              styles.heartOverlay,
              {
                opacity: heartOpacity,
                transform: [{scale: heartScale}],
              },
            ]}>
            <Icon name="heart" size={80} color={colors.background.white} />
          </Animated.View>

          {post.mediaUrls.length > 1 && (
            <>
              <View style={styles.imageIndicators}>
                {post.mediaUrls.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.indicator,
                      index === currentImageIndex && styles.indicatorActive,
                    ]}
                  />
                ))}
              </View>
              <View style={styles.imageNavigation}>
                {currentImageIndex > 0 && (
                  <Pressable
                    style={[styles.navButton, styles.navButtonLeft]}
                    onPress={() => setCurrentImageIndex(i => i - 1)}>
                    <Icon name="chevron-left" size={24} color={colors.text.inverse} />
                  </Pressable>
                )}
                {currentImageIndex < post.mediaUrls.length - 1 && (
                  <Pressable
                    style={[styles.navButton, styles.navButtonRight]}
                    onPress={() => setCurrentImageIndex(i => i + 1)}>
                    <Icon name="chevron-right" size={24} color={colors.text.inverse} />
                  </Pressable>
                )}
              </View>
            </>
          )}
        </Pressable>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={animateLike}>
          <Animated.View style={{transform: [{scale: likeScale}]}}>
            <Icon
              name={post.isLiked ? 'heart' : 'heart-outline'}
              size={26}
              color={post.isLiked ? colors.status.error : colors.text.primary}
            />
          </Animated.View>
          <Text style={styles.actionCount}>{post.likeCount}</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={onComment}>
          <Icon name="comment-outline" size={26} color={colors.text.primary} />
          <Text style={styles.actionCount}>{post.commentCount}</Text>
        </Pressable>
        <Pressable style={styles.actionButton} onPress={onShare}>
          <Icon name="share-outline" size={26} color={colors.text.primary} />
        </Pressable>
        <View style={styles.actionSpacer} />
        {post.pointsPossible && (
          <View style={styles.pointsBadge}>
            <Icon name="star-circle" size={16} color={colors.primary.freshAvocadoGreen} />
            <Text style={styles.pointsText}>{post.pointsPossible} pts</Text>
          </View>
        )}
        {post.rating && (
          <View style={styles.ratingBadge}>
            <Icon name="star" size={16} color={colors.accent.goldenYellow} />
            <Text style={styles.ratingText}>{post.rating}</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.caption} numberOfLines={3}>
          <Text style={styles.captionUser}>{post.user.name} </Text>
          {post.content}
        </Text>
        {post.dishTags.length > 0 && (
          <View style={styles.tags}>
            {post.dishTags.map(tag => (
              <Text key={tag} style={styles.tag}>
                #{tag}
              </Text>
            ))}
          </View>
        )}
      </View>

      {/* View comments */}
      {post.commentCount > 0 && (
        <Pressable style={styles.viewComments} onPress={onComment}>
          <Text style={styles.viewCommentsText}>View all {post.commentCount} comments</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    minHeight: 300,
  },
  skeletonContainer: {
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  emptyTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginTop: spacing.md,
  },
  emptyText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  footerLoader: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  footerText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  separator: {
    height: spacing.sm,
  },
  feedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background.cream,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  postNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    gap: spacing.xs,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postNowText: {
    ...textStyles.labelMedium,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  myPostsButton: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  myPostsText: {
    ...textStyles.caption,
    color: colors.primary.basilLeaf,
    fontWeight: '500',
  },
  messagesButton: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  messagesText: {
    ...textStyles.caption,
    color: colors.primary.basilLeaf,
    fontWeight: '500',
  },
  messageBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.status.error,
    fontSize: 10,
  },
  postCard: {
    backgroundColor: colors.background.white,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral.gray200,
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  userName: {
    ...textStyles.labelMedium,
    color: colors.text.primary,
  },
  timestamp: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  restaurantTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.mintGreen,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  restaurantName: {
    ...textStyles.labelSmall,
    color: colors.primary.basilLeaf,
    fontWeight: '600',
    marginLeft: 2,
  },
  imageContainer: {
    position: 'relative',
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
  postImage: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.neutral.gray200,
  },
  heartOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIndicators: {
    position: 'absolute',
    bottom: spacing.md,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  indicatorActive: {
    backgroundColor: colors.background.white,
  },
  imageNavigation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonLeft: {
    marginLeft: spacing.sm,
  },
  navButtonRight: {
    marginRight: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    paddingTop: spacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  actionCount: {
    ...textStyles.labelMedium,
    color: colors.text.primary,
    marginLeft: spacing.xs,
  },
  actionSpacer: {
    flex: 1,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.mintGreen,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    marginRight: spacing.xs,
  },
  pointsText: {
    ...textStyles.labelSmall,
    color: colors.primary.basilLeaf,
    marginLeft: 4,
    fontWeight: '600',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent.softYellow,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  ratingText: {
    ...textStyles.labelMedium,
    color: colors.text.primary,
    marginLeft: 2,
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  caption: {
    ...textStyles.body,
    color: colors.text.primary,
  },
  captionUser: {
    ...textStyles.labelMedium,
    color: colors.text.primary,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  tag: {
    ...textStyles.bodySmall,
    color: colors.primary.freshAvocadoGreen,
    marginRight: spacing.sm,
  },
  viewComments: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  viewCommentsText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
});
