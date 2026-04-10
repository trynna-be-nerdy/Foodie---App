import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, SegmentedButtons, Text} from 'react-native-paper';

import {ChallengeCard} from '../components/challenges/ChallengeCard';
import {LeaderboardItem} from '../components/challenges/LeaderboardItem';
import {api} from '../services/api';
import {colors, spacing} from '../theme';
import {textStyles} from '../theme/typography';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  requirements: {count: number; specificItems?: string[]};
  rewardFoodiePoints: number;
  rewardGiftCardValue: number | null;
  sponsorRestaurant: {id: string; name: string; imageUrl: string | null} | null;
  startDate: string;
  endDate: string;
  participantCount: number;
  userProgress: number | null;
  isParticipating: boolean;
  isCompleted: boolean;
  completedAt?: string | null;
}

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  profilePhoto: string | null;
  totalPoints: number;
  achievementCount: number;
  isCurrentUser: boolean;
}

interface ChallengesResponse {
  challenges: Challenge[];
}

interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  currentUserRank?: number | null;
  pagination?: {
    hasMore?: boolean;
    nextPage?: number | null;
    totalPages?: number | null;
  };
  hasMore?: boolean;
}

const LEADERBOARD_PAGE_SIZE = 20;

export function ChallengesScreen(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'leaderboard'>('active');

  // Active challenges tab
  const ActiveChallengesTab = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [acceptingIds, setAcceptingIds] = useState<Record<string, boolean>>({});

    const fetchChallenges = useCallback(async ({refresh = false} = {}) => {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const response = await api.get<ChallengesResponse>('/challenges');
        if (response.success && response.data) {
          setChallenges(response.data.challenges);
        }
      } catch (error) {
        console.error('Error fetching challenges:', error);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }, []);

    useEffect(() => {
      fetchChallenges();
    }, [fetchChallenges]);

    const handleAccept = async (challengeId: string) => {
      setAcceptingIds(prev => ({...prev, [challengeId]: true}));
      const previousChallenges = challenges;

      setChallenges(prev =>
        prev.map(challenge =>
          challenge.id === challengeId
            ? {
                ...challenge,
                isParticipating: true,
                participantCount: challenge.participantCount + 1,
                userProgress: challenge.userProgress ?? 0,
              }
            : challenge,
        ),
      );

      try {
        const response = await api.post(`/challenges/${challengeId}/accept`);
        if (!response.success) {
          throw new Error(response.error?.message || 'Accept failed');
        }
      } catch (error) {
        console.error('Error accepting challenge:', error);
        setChallenges(previousChallenges);
      } finally {
        setAcceptingIds(prev => {
          const next = {...prev};
          delete next[challengeId];
          return next;
        });
      }
    };

    const handleRefresh = () => {
      fetchChallenges({refresh: true});
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
        data={challenges}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <ChallengeCard
            challenge={item}
            actionLabel={item.isParticipating ? 'Continue' : 'Accept'}
            actionLoading={acceptingIds[item.id]}
            actionDisabled={acceptingIds[item.id]}
            onAction={() => {
              if (!item.isParticipating) {
                handleAccept(item.id);
              }
            }}
            onPress={() => undefined}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No active challenges</Text>
            <Text style={styles.emptySubtext}>Accept a challenge to get started!</Text>
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

  // Completed challenges tab
  const CompletedChallengesTab = () => {
    const [challenges, setChallenges] = useState<Challenge[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchChallenges = useCallback(async ({refresh = false} = {}) => {
      if (refresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const response = await api.get<ChallengesResponse>('/challenges?status=completed');
        if (response.success && response.data) {
          setChallenges(response.data.challenges);
        }
      } catch (error) {
        console.error('Error fetching completed challenges:', error);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }, []);

    useEffect(() => {
      fetchChallenges();
    }, [fetchChallenges]);

    const handleRefresh = () => {
      fetchChallenges({refresh: true});
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
        data={challenges}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ChallengeCard challenge={item} showCompletedDetails />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No completed challenges yet</Text>
            <Text style={styles.emptySubtext}>Complete challenges to earn rewards!</Text>
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

  // Leaderboard tab
  const LeaderboardTab = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [scope, setScope] = useState<'national' | 'local' | 'friends'>('national');

    const fetchLeaderboard = useCallback(
      async (pageToLoad: number, {append}: {append: boolean}) => {
        if (append) {
          setIsLoadingMore(true);
        } else if (pageToLoad === 1) {
          setIsLoading(true);
        }

        try {
          const response = await api.get<LeaderboardResponse>(
            `/challenges/leaderboard?scope=${scope}&page=${pageToLoad}&limit=${LEADERBOARD_PAGE_SIZE}`,
          );
          if (response.success && response.data) {
            const entries = response.data.leaderboard ?? [];
            setLeaderboard(prev => (append ? [...prev, ...entries] : entries));
            setCurrentUserRank(response.data.currentUserRank ?? null);
            const nextHasMore =
              response.data.pagination?.hasMore ??
              response.data.hasMore ??
              entries.length === LEADERBOARD_PAGE_SIZE;
            setHasMore(nextHasMore);
            setPage(pageToLoad);
          }
        } catch (error) {
          console.error('Error fetching leaderboard:', error);
        } finally {
          setIsLoading(false);
          setIsRefreshing(false);
          setIsLoadingMore(false);
        }
      },
      [scope],
    );

    useEffect(() => {
      setLeaderboard([]);
      setHasMore(true);
      setPage(1);
      setCurrentUserRank(null);
      fetchLeaderboard(1, {append: false});
    }, [fetchLeaderboard, scope]);

    const handleRefresh = () => {
      setIsRefreshing(true);
      fetchLeaderboard(1, {append: false});
    };

    const handleLoadMore = () => {
      if (!hasMore || isLoadingMore || isLoading) {
        return;
      }
      const nextPage = page + 1;
      fetchLeaderboard(nextPage, {append: true});
    };

    return (
      <View style={styles.leaderboardContainer}>
        <SegmentedButtons
          value={scope}
          onValueChange={value => setScope(value as 'national' | 'local' | 'friends')}
          buttons={[
            {value: 'national', label: 'National'},
            {value: 'local', label: 'Local'},
            {value: 'friends', label: 'Friends'},
          ]}
          style={styles.segmentedButtons}
        />

        {currentUserRank !== null && (
          <View style={styles.yourRankContainer}>
            <Text style={styles.yourRankLabel}>Your Rank</Text>
            <Text style={styles.yourRankValue}>#{currentUserRank}</Text>
          </View>
        )}

        {isLoading && leaderboard.length === 0 ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
          </View>
        ) : (
          <FlatList
            data={leaderboard}
            keyExtractor={item => item.userId}
            renderItem={({item}) => <LeaderboardItem entry={item} />}
            contentContainerStyle={styles.listContent}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.3}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
                colors={[colors.primary.freshAvocadoGreen]}
                tintColor={colors.primary.freshAvocadoGreen}
              />
            }
            ListEmptyComponent={
              <View style={styles.centered}>
                <Text style={styles.emptyText}>No rankings yet</Text>
              </View>
            }
            ListFooterComponent={
              isLoadingMore ? (
                <View style={styles.loadingMore}>
                  <ActivityIndicator size="small" color={colors.primary.freshAvocadoGreen} />
                </View>
              ) : null
            }
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.tabSwitch}>
        <SegmentedButtons
          value={activeTab}
          onValueChange={value => setActiveTab(value as typeof activeTab)}
          buttons={[
            {value: 'active', label: 'Active'},
            {value: 'completed', label: 'Completed'},
            {value: 'leaderboard', label: 'Leaderboard'},
          ]}
        />
      </View>
      {activeTab === 'active' && <ActiveChallengesTab />}
      {activeTab === 'completed' && <CompletedChallengesTab />}
      {activeTab === 'leaderboard' && <LeaderboardTab />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  tabSwitch: {
    margin: spacing.md,
  },
  leaderboardContainer: {
    flex: 1,
  },
  segmentedButtons: {
    margin: spacing.md,
  },
  yourRankContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary.freshAvocadoGreen + '20',
    marginHorizontal: spacing.md,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 12,
  },
  yourRankLabel: {
    ...textStyles.body,
    color: colors.text.primary,
  },
  yourRankValue: {
    ...textStyles.h3,
    color: colors.primary.freshAvocadoGreen,
  },
  loadingMore: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
});
