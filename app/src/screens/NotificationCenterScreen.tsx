import React, {useMemo, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Text, Chip, Surface, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';
import {spacing} from '../theme';
import {useAppDispatch, useAppSelector} from '../store';
import {
  AppNotification,
  markAllRead,
  markNotificationRead,
} from '../store/slices/notificationSlice';

interface NotificationCenterScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

const FILTERS = [
  {key: 'all', label: 'All'},
  {key: 'unread', label: 'Unread'},
  {key: 'EXPIRATION', label: 'Expiring'},
  {key: 'TRANSACTION', label: 'Transactions'},
  {key: 'PROMOTION', label: 'Promotions'},
];

const getIconName = (type: AppNotification['type']) => {
  switch (type) {
    case 'EXPIRATION':
      return 'clock-alert-outline';
    case 'TRANSACTION':
      return 'swap-horizontal';
    case 'PROMOTION':
      return 'tag-outline';
    default:
      return 'bell-outline';
  }
};

const formatNotificationDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

export function NotificationCenterScreen({
  navigation,
}: NotificationCenterScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {notifications} = useAppSelector(state => state.notifications);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredNotifications = useMemo(() => {
    switch (activeFilter) {
      case 'unread':
        return notifications.filter(notification => !notification.read);
      case 'EXPIRATION':
      case 'TRANSACTION':
      case 'PROMOTION':
        return notifications.filter(notification => notification.type === activeFilter);
      default:
        return notifications;
    }
  }, [activeFilter, notifications]);

  const handlePressNotification = (notification: AppNotification) => {
    if (!notification.read) {
      dispatch(markNotificationRead(notification.id));
    }
    if (notification.routeName) {
      navigation.navigate(notification.routeName, notification.routeParams);
    }
  };

  const renderNotificationItem = ({item}: {item: AppNotification}) => (
    <TouchableOpacity onPress={() => handlePressNotification(item)} activeOpacity={0.8}>
      <Surface style={[styles.card, !item.read && styles.cardUnread]} elevation={1}>
        <View style={styles.cardIcon}>
          <Icon name={getIconName(item.type)} size={22} color={colors.text.primary} />
        </View>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDate}>
              {formatNotificationDate(item.scheduledFor ?? item.createdAt)}
            </Text>
          </View>
          <Text style={styles.cardMessage}>{item.message}</Text>
          {item.scheduledFor && (
            <Text style={styles.cardMeta}>
              Scheduled {formatNotificationDate(item.scheduledFor)}
            </Text>
          )}
        </View>
      </Surface>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <Button mode="text" onPress={() => dispatch(markAllRead())}>
          Mark all read
        </Button>
      </View>

      <View style={styles.filters}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={FILTERS}
          keyExtractor={item => item.key}
          renderItem={({item}) => (
            <Chip
              selected={activeFilter === item.key}
              onPress={() => setActiveFilter(item.key)}
              style={[styles.filterChip, activeFilter === item.key && styles.filterChipSelected]}
              textStyle={[
                styles.filterChipText,
                activeFilter === item.key && styles.filterChipTextSelected,
              ]}>
              {item.label}
            </Chip>
          )}
        />
      </View>

      <FlatList
        data={filteredNotifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[
          styles.listContent,
          filteredNotifications.length === 0 && styles.listEmpty,
        ]}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="bell-off-outline" size={48} color={colors.text.secondary} />
            <Text style={styles.emptyTitle}>No notifications</Text>
            <Text style={styles.emptyText}>
              You are all caught up. Expiring points and promotions show up here.
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  filters: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  filterChip: {
    backgroundColor: colors.background.white,
    marginRight: spacing.xs,
  },
  filterChipSelected: {
    backgroundColor: colors.primary.freshAvocadoGreen,
  },
  filterChipText: {
    color: colors.text.secondary,
  },
  filterChipTextSelected: {
    color: colors.text.inverse,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  listEmpty: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    flexDirection: 'row',
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 12,
    backgroundColor: colors.background.white,
  },
  cardUnread: {
    borderWidth: 1,
    borderColor: colors.primary.limeZest,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  cardTitle: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  cardDate: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  cardMessage: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  cardMeta: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptyText: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
