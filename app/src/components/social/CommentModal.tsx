import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    profilePhoto: string | null;
  };
  replies: Comment[];
  replyCount: number;
}

interface CommentModalProps {
  visible: boolean;
  postId: string;
  onClose: () => void;
  onCommentAdded?: () => void;
}

export function CommentModal({
  visible,
  postId: _postId,
  onClose,
  onCommentAdded,
}: CommentModalProps): React.JSX.Element {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<{id: string; name: string} | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const fetchComments = useCallback(async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.get(`/posts/${postId}/comments`);

      // Mock data
      const mockComments: Comment[] = [
        {
          id: 'c1',
          content: 'This looks amazing! Where is this place?',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          user: {
            id: 'u1',
            name: 'John Doe',
            profilePhoto: 'https://picsum.photos/100/100?random=20',
          },
          replies: [
            {
              id: 'c1r1',
              content: "It's on Main Street, downtown!",
              createdAt: new Date(Date.now() - 1800000).toISOString(),
              user: {
                id: 'u2',
                name: 'Sarah Smith',
                profilePhoto: 'https://picsum.photos/100/100?random=21',
              },
              replies: [],
              replyCount: 0,
            },
          ],
          replyCount: 1,
        },
        {
          id: 'c2',
          content: 'I need to try this! Adding to my list 🍜',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          user: {
            id: 'u3',
            name: 'Mike Chen',
            profilePhoto: 'https://picsum.photos/100/100?random=22',
          },
          replies: [],
          replyCount: 0,
        },
        {
          id: 'c3',
          content: 'The presentation is gorgeous!',
          createdAt: new Date(Date.now() - 10800000).toISOString(),
          user: {
            id: 'u4',
            name: 'Emma Wilson',
            profilePhoto: 'https://picsum.photos/100/100?random=23',
          },
          replies: [],
          replyCount: 0,
        },
      ];

      setComments(mockComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      fetchComments();
    }
  }, [visible, fetchComments]);

  const handleSubmitComment = useCallback(async () => {
    if (!newComment.trim()) {
      return;
    }

    setIsSubmitting(true);
    Keyboard.dismiss();

    try {
      // TODO: Replace with actual API call
      // await api.post(`/posts/${postId}/comment`, {
      //   content: newComment,
      //   parentId: replyingTo?.id,
      // });

      // Optimistically add comment
      const newCommentObj: Comment = {
        id: `temp-${Date.now()}`,
        content: newComment,
        createdAt: new Date().toISOString(),
        user: {
          id: 'current-user',
          name: 'You',
          profilePhoto: null,
        },
        replies: [],
        replyCount: 0,
      };

      if (replyingTo) {
        setComments(prev =>
          prev.map(c =>
            c.id === replyingTo.id
              ? {...c, replies: [...c.replies, newCommentObj], replyCount: c.replyCount + 1}
              : c,
          ),
        );
      } else {
        setComments(prev => [newCommentObj, ...prev]);
      }

      setNewComment('');
      setReplyingTo(null);
      onCommentAdded?.();
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [newComment, replyingTo, onCommentAdded]);

  const handleReply = useCallback((comment: Comment) => {
    setReplyingTo({id: comment.id, name: comment.user.name});
    inputRef.current?.focus();
  }, []);

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
      return `${minutes}m`;
    }
    if (hours < 24) {
      return `${hours}h`;
    }
    if (days < 7) {
      return `${days}d`;
    }
    return new Date(dateString).toLocaleDateString();
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <View key={comment.id} style={[styles.commentItem, isReply && styles.replyItem]}>
      <Image
        source={{
          uri: comment.user.profilePhoto || 'https://picsum.photos/100/100?random=default',
        }}
        style={[styles.commentAvatar, isReply && styles.replyAvatar]}
      />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.commentUserName}>{comment.user.name}</Text>
          <Text style={styles.commentTime}>{formatTimeAgo(comment.createdAt)}</Text>
        </View>
        <Text style={styles.commentText}>{comment.content}</Text>
        {!isReply && (
          <Pressable onPress={() => handleReply(comment)} style={styles.replyButton}>
            <Text style={styles.replyButtonText}>Reply</Text>
          </Pressable>
        )}
        {/* Render nested replies */}
        {comment.replies.length > 0 && (
          <View style={styles.repliesContainer}>
            {comment.replies.map(reply => renderComment(reply, true))}
          </View>
        )}
        {comment.replyCount > comment.replies.length && (
          <Pressable style={styles.viewMoreReplies}>
            <Text style={styles.viewMoreText}>
              View {comment.replyCount - comment.replies.length} more{' '}
              {comment.replyCount - comment.replies.length === 1 ? 'reply' : 'replies'}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Comments</Text>
          <IconButton icon="close" size={24} onPress={onClose} />
        </View>

        {/* Comments List */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading comments...</Text>
          </View>
        ) : comments.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="comment-outline" size={48} color={colors.neutral.gray400} />
            <Text style={styles.emptyTitle}>No comments yet</Text>
            <Text style={styles.emptyText}>Be the first to comment!</Text>
          </View>
        ) : (
          <FlatList
            data={comments}
            renderItem={({item}) => renderComment(item)}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Input Area */}
        <View style={styles.inputContainer}>
          {replyingTo && (
            <View style={styles.replyingToBar}>
              <Text style={styles.replyingToText}>
                Replying to <Text style={styles.replyingToName}>{replyingTo.name}</Text>
              </Text>
              <Pressable onPress={() => setReplyingTo(null)}>
                <Icon name="close" size={18} color={colors.text.secondary} />
              </Pressable>
            </View>
          )}
          <View style={styles.inputRow}>
            <TextInput
              ref={inputRef}
              style={styles.input}
              placeholder={replyingTo ? `Reply to ${replyingTo.name}...` : 'Add a comment...'}
              placeholderTextColor={colors.text.secondary}
              value={newComment}
              onChangeText={setNewComment}
              multiline
              maxLength={500}
            />
            <IconButton
              icon="send"
              size={24}
              iconColor={
                newComment.trim() ? colors.primary.freshAvocadoGreen : colors.neutral.gray400
              }
              onPress={handleSubmitComment}
              disabled={!newComment.trim() || isSubmitting}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  headerTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginTop: spacing.md,
  },
  emptyText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  listContent: {
    padding: spacing.md,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  replyItem: {
    marginLeft: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: 0,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.neutral.gray200,
  },
  replyAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  commentContent: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentUserName: {
    ...textStyles.labelMedium,
    color: colors.text.primary,
  },
  commentTime: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginLeft: spacing.sm,
  },
  commentText: {
    ...textStyles.body,
    color: colors.text.primary,
    marginTop: 2,
  },
  replyButton: {
    marginTop: spacing.xs,
  },
  replyButtonText: {
    ...textStyles.caption,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  repliesContainer: {
    marginTop: spacing.sm,
  },
  viewMoreReplies: {
    marginTop: spacing.xs,
  },
  viewMoreText: {
    ...textStyles.caption,
    color: colors.primary.freshAvocadoGreen,
  },
  inputContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
    backgroundColor: colors.background.white,
  },
  replyingToBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: colors.neutral.gray100,
  },
  replyingToText: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  replyingToName: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  input: {
    flex: 1,
    ...textStyles.body,
    color: colors.text.primary,
    maxHeight: 100,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.neutral.gray100,
    borderRadius: borderRadius.full,
  },
});
