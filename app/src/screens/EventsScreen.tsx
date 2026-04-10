import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Chip,
  FAB,
  SegmentedButtons,
  Text,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {EventCard} from '../components/events/EventCard';
import type {FoodieEvent, EventType} from '../types/event';
import {EVENT_TYPE_LABELS, EVENT_TYPE_COLORS} from '../types/event';
import {getEvents, registerForEvent} from '../services/eventService';
import type {RootStackParamList} from '../navigation/AppNavigator';
import {colors, spacing, borderRadius} from '../theme';
import {textStyles} from '../theme/typography';

type EventsNavigationProp = StackNavigationProp<RootStackParamList>;

const EVENT_TYPES: EventType[] = [
  'HAPPY_HOUR',
  'POP_UP',
  'COMPETITION',
  'TASTING',
  'LIVE_MUSIC',
  'SPECIAL_MENU',
  'HOLIDAY',
  'OTHER',
];

export function EventsScreen(): React.JSX.Element {
  const navigation = useNavigation<EventsNavigationProp>();
  const [activeTab, setActiveTab] = useState<'feed' | 'calendar' | 'my-events'>('feed');

  // Feed Tab Component
  const FeedTab = () => {
    const [events, setEvents] = useState<FoodieEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedType, setSelectedType] = useState<EventType | null>(null);
    const [registeringIds, setRegisteringIds] = useState<Record<string, boolean>>({});

    const fetchEvents = useCallback(
      async ({refresh = false} = {}) => {
        if (refresh) {
          setIsRefreshing(true);
        } else {
          setIsLoading(true);
        }

        try {
          const response = await getEvents(
            selectedType ? {type: selectedType} : undefined,
          );
          setEvents(response.events);
        } catch (error) {
          console.error('Error fetching events:', error);
        } finally {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      },
      [selectedType],
    );

    useEffect(() => {
      fetchEvents();
    }, [fetchEvents]);

    const handleRegister = async (eventId: string) => {
      setRegisteringIds(prev => ({...prev, [eventId]: true}));

      try {
        const result = await registerForEvent(eventId);
        if (result.success) {
          // Update local state optimistically
          setEvents(prev =>
            prev.map(event =>
              event.id === eventId
                ? {
                    ...event,
                    isRegistered: true,
                    registrationCount: event.registrationCount + 1,
                    userQrCode: result.qrCode,
                  }
                : event,
            ),
          );
        }
      } catch (error) {
        console.error('Error registering for event:', error);
      } finally {
        setRegisteringIds(prev => {
          const next = {...prev};
          delete next[eventId];
          return next;
        });
      }
    };

    const handleRefresh = () => {
      fetchEvents({refresh: true});
    };

    const filteredEvents = useMemo(() => {
      if (!selectedType) return events;
      return events.filter(e => e.type === selectedType);
    }, [events, selectedType]);

    return (
      <View style={styles.tabContent}>
        {/* Type Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContainer}>
          <Chip
            selected={!selectedType}
            onPress={() => setSelectedType(null)}
            style={styles.filterChip}
            selectedColor={colors.primary.freshAvocadoGreen}>
            All
          </Chip>
          {EVENT_TYPES.map(type => (
            <Chip
              key={type}
              selected={selectedType === type}
              onPress={() => setSelectedType(selectedType === type ? null : type)}
              style={[
                styles.filterChip,
                selectedType === type && {
                  backgroundColor: EVENT_TYPE_COLORS[type] + '20',
                },
              ]}
              selectedColor={EVENT_TYPE_COLORS[type]}>
              {EVENT_TYPE_LABELS[type]}
            </Chip>
          ))}
        </ScrollView>

        {isLoading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
          </View>
        ) : (
          <FlatList
            data={filteredEvents}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <EventCard
                event={item}
                onPress={() =>
                  navigation.navigate('EventDetail', {eventId: item.id})
                }
                onRegister={() => handleRegister(item.id)}
                isRegistering={registeringIds[item.id]}
              />
            )}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Icon name="calendar-blank" size={64} color={colors.neutral.gray300} />
                <Text style={styles.emptyText}>No events found</Text>
                <Text style={styles.emptySubtext}>
                  {selectedType
                    ? 'Try a different filter'
                    : 'Check back later for upcoming events!'}
                </Text>
              </View>
            }
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={[colors.primary.freshAvocadoGreen]}
                tintColor={colors.primary.freshAvocadoGreen}
              />
            }
          />
        )}
      </View>
    );
  };

  // Calendar Tab Component
  const CalendarTab = () => {
    const [events, setEvents] = useState<FoodieEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const fetchEvents = useCallback(async () => {
      setIsLoading(true);
      try {
        const response = await getEvents();
        setEvents(response.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    }, []);

    useEffect(() => {
      fetchEvents();
    }, [fetchEvents]);

    // Group events by date
    const eventsByDate = useMemo(() => {
      const grouped: Record<string, FoodieEvent[]> = {};
      events.forEach(event => {
        const dateKey = new Date(event.startTime).toDateString();
        if (!grouped[dateKey]) {
          grouped[dateKey] = [];
        }
        grouped[dateKey].push(event);
      });
      return grouped;
    }, [events]);

    // Generate calendar dates for the next 14 days
    const calendarDates = useMemo(() => {
      const dates: Date[] = [];
      const today = new Date();
      for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date);
      }
      return dates;
    }, []);

    const selectedDateEvents = useMemo(() => {
      const dateKey = selectedDate.toDateString();
      return eventsByDate[dateKey] || [];
    }, [eventsByDate, selectedDate]);

    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
        </View>
      );
    }

    return (
      <View style={styles.tabContent}>
        {/* Date Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
          contentContainerStyle={styles.dateContainer}>
          {calendarDates.map(date => {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const hasEvents = eventsByDate[date.toDateString()]?.length > 0;
            const isToday = date.toDateString() === new Date().toDateString();

            return (
              <View
                key={date.toISOString()}
                style={[
                  styles.dateItem,
                  isSelected && styles.dateItemSelected,
                ]}>
                <Text
                  style={[
                    styles.dateDayName,
                    isSelected && styles.dateTextSelected,
                  ]}>
                  {isToday ? 'Today' : date.toLocaleDateString('en-US', {weekday: 'short'})}
                </Text>
                <View
                  style={[
                    styles.dateCircle,
                    isSelected && styles.dateCircleSelected,
                  ]}>
                  <Text
                    style={[
                      styles.dateNumber,
                      isSelected && styles.dateTextSelected,
                    ]}
                    onPress={() => setSelectedDate(date)}>
                    {date.getDate()}
                  </Text>
                </View>
                {hasEvents && (
                  <View
                    style={[
                      styles.eventDot,
                      isSelected && styles.eventDotSelected,
                    ]}
                  />
                )}
              </View>
            );
          })}
        </ScrollView>

        {/* Events for Selected Date */}
        <FlatList
          data={selectedDateEvents}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <EventCard
              event={item}
              compact
              onPress={() => navigation.navigate('EventDetail', {eventId: item.id})}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="calendar-blank" size={48} color={colors.neutral.gray300} />
              <Text style={styles.emptyText}>No events on this date</Text>
            </View>
          }
        />
      </View>
    );
  };

  // My Events Tab Component
  const MyEventsTab = () => {
    const [events, setEvents] = useState<FoodieEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchMyEvents = useCallback(async ({refresh = false} = {}) => {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const response = await getEvents();
        // Filter to only registered events
        const registeredEvents = response.events.filter(e => e.isRegistered);
        setEvents(registeredEvents);
      } catch (error) {
        console.error('Error fetching my events:', error);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }, []);

    useEffect(() => {
      fetchMyEvents();
    }, [fetchMyEvents]);

    const handleRefresh = () => {
      fetchMyEvents({refresh: true});
    };

    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
        </View>
      );
    }

    return (
      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate('EventDetail', {eventId: item.id})}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="calendar-check" size={64} color={colors.neutral.gray300} />
            <Text style={styles.emptyText}>No registered events</Text>
            <Text style={styles.emptySubtext}>
              Browse events and register to see them here!
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary.freshAvocadoGreen]}
            tintColor={colors.primary.freshAvocadoGreen}
          />
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <Text style={styles.headerSubtitle}>Discover what's happening nearby</Text>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabSwitch}>
        <SegmentedButtons
          value={activeTab}
          onValueChange={value => setActiveTab(value as typeof activeTab)}
          buttons={[
            {value: 'feed', label: 'Discover', icon: 'compass'},
            {value: 'calendar', label: 'Calendar', icon: 'calendar'},
            {value: 'my-events', label: 'My Events', icon: 'ticket'},
          ]}
        />
      </View>

      {/* Tab Content */}
      {activeTab === 'feed' && <FeedTab />}
      {activeTab === 'calendar' && <CalendarTab />}
      {activeTab === 'my-events' && <MyEventsTab />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerTitle: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  headerSubtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  tabSwitch: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  tabContent: {
    flex: 1,
  },
  filterScroll: {
    maxHeight: 50,
  },
  filterContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  filterChip: {
    marginRight: spacing.xs,
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
  },
  emptyText: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginTop: spacing.md,
  },
  emptySubtext: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  dateScroll: {
    maxHeight: 90,
  },
  dateContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  dateItem: {
    alignItems: 'center',
    marginRight: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
  },
  dateItemSelected: {
    backgroundColor: colors.primary.freshAvocadoGreen + '15',
  },
  dateDayName: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  dateCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.white,
  },
  dateCircleSelected: {
    backgroundColor: colors.primary.freshAvocadoGreen,
  },
  dateNumber: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  dateTextSelected: {
    color: colors.text.inverse,
  },
  eventDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary.freshAvocadoGreen,
    marginTop: spacing.xs,
  },
  eventDotSelected: {
    backgroundColor: colors.text.inverse,
  },
});
