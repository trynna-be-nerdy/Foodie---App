import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  CharityCard,
  DonationFlow,
  DonationLeaderboard,
  ImpactDashboard,
} from '../components/impact';
import {borderRadius, colors, spacing} from '../theme';
import {textStyles} from '../theme/typography';
import type {
  Charity,
  CommunityStats,
  FoodDrive,
  ImpactStats,
  LeaderboardEntry,
  MatchingCampaign,
} from '../types/impact';
import {
  getCharities,
  getCommunityStats,
  getFoodDrives,
  getImpactStats,
  getLeaderboard,
  getMatchingCampaign,
} from '../services/impactService';

type TabValue = 'dashboard' | 'charities' | 'leaderboard' | 'drives';

interface TabConfig {
  value: TabValue;
  label: string;
  icon: string;
}

const TABS: TabConfig[] = [
  {value: 'dashboard', label: 'Impact', icon: 'chart-arc'},
  {value: 'charities', label: 'Give', icon: 'heart'},
  {value: 'leaderboard', label: 'Top', icon: 'trophy'},
  {value: 'drives', label: 'Drives', icon: 'calendar'},
];

const TAB_BAR_HEIGHT = 52;
const SCROLL_THRESHOLD = 10;

export function ImpactScreen(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<TabValue>('dashboard');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [leaderboardScope, setLeaderboardScope] = useState<'local' | 'national' | 'friends'>('national');

  // Data states
  const [impactStats, setImpactStats] = useState<ImpactStats | null>(null);
  const [communityStats, setCommunityStats] = useState<CommunityStats | null>(null);
  const [matchingCampaign, setMatchingCampaign] = useState<MatchingCampaign | null>(null);
  const [charities, setCharities] = useState<Charity[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [foodDrives, setFoodDrives] = useState<FoodDrive[]>([]);

  // Donation flow state
  const [selectedCharity, setSelectedCharity] = useState<Charity | null>(null);
  const [showDonationFlow, setShowDonationFlow] = useState(false);

  // Scroll tracking for tab bar visibility
  const lastScrollY = useRef(0);
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;
  const isTabBarVisible = useRef(true);

  const loadData = useCallback(async () => {
    try {
      const [stats, community, campaign, charityList, leaders, drives] = await Promise.all([
        getImpactStats(),
        getCommunityStats(),
        getMatchingCampaign(),
        getCharities(),
        getLeaderboard(leaderboardScope),
        getFoodDrives(),
      ]);

      setImpactStats(stats);
      setCommunityStats(community);
      setMatchingCampaign(campaign);
      setCharities(charityList);
      setLeaderboard(leaders);
      setFoodDrives(drives);
    } catch (error) {
      console.error('Failed to load impact data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [leaderboardScope]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const showTabBar = useCallback(() => {
    if (!isTabBarVisible.current) {
      isTabBarVisible.current = true;
      Animated.spring(tabBarTranslateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 15,
      }).start();
    }
  }, [tabBarTranslateY]);

  const hideTabBar = useCallback(() => {
    if (isTabBarVisible.current) {
      isTabBarVisible.current = false;
      Animated.spring(tabBarTranslateY, {
        toValue: -(TAB_BAR_HEIGHT + spacing.md + spacing.sm),
        useNativeDriver: true,
        tension: 100,
        friction: 15,
      }).start();
    }
  }, [tabBarTranslateY]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // Show the tab bar when refreshing
    showTabBar();
    loadData();
  }, [loadData, showTabBar]);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const diff = currentScrollY - lastScrollY.current;

    // Only respond to significant scroll movements
    if (Math.abs(diff) < SCROLL_THRESHOLD) {
      return;
    }

    // At the very top, always show the tab bar
    if (currentScrollY <= 0) {
      showTabBar();
    } else if (diff > 0 && currentScrollY > TAB_BAR_HEIGHT) {
      // Scrolling down and past the threshold - hide and keep hidden
      hideTabBar();
    }
    // Removed: else if (diff < 0) - only show when at top, not when scrolling up

    lastScrollY.current = currentScrollY;
  }, [showTabBar, hideTabBar]);

  const handleDonate = useCallback((charity: Charity) => {
    setSelectedCharity(charity);
    setShowDonationFlow(true);
  }, []);

  const handleDonationSuccess = useCallback((_mealsContributed: number, _bonusPoints: number) => {
    setShowDonationFlow(false);
    setSelectedCharity(null);
    loadData();
  }, [loadData]);

  const handleScopeChange = useCallback(async (scope: 'local' | 'national' | 'friends') => {
    setLeaderboardScope(scope);
    try {
      const leaders = await getLeaderboard(scope);
      setLeaderboard(leaders);
    } catch (error) {
      console.error('Failed to load leaderboard:', error);
    }
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
          <Text style={styles.loadingText}>Loading your impact...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <View style={styles.tabContent}>
            {impactStats && (
              <ImpactDashboard
                stats={impactStats}
                communityStats={communityStats ?? undefined}
                matchingCampaign={matchingCampaign}
              />
            )}
          </View>
        );

      case 'charities':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Partner Charities</Text>
            <Text style={styles.sectionSubtitle}>
              100% goes directly to fighting hunger
            </Text>
            {charities.map(charity => (
              <CharityCard
                key={charity.id}
                charity={charity}
                onDonate={() => handleDonate(charity)}
              />
            ))}
          </View>
        );

      case 'leaderboard':
        return (
          <View style={styles.tabContent}>
            <DonationLeaderboard
              entries={leaderboard}
              scope={leaderboardScope}
              onScopeChange={handleScopeChange}
            />
          </View>
        );

      case 'drives':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.sectionTitle}>Food Drives</Text>
            <Text style={styles.sectionSubtitle}>
              Join local drives and make a difference
            </Text>
            {foodDrives.length === 0 ? (
              <View style={styles.emptyState}>
                <Icon name="calendar-blank" size={48} color={colors.text.light} />
                <Text style={styles.emptyText}>No active food drives</Text>
                <Text style={styles.emptySubtext}>
                  Check back soon for upcoming events
                </Text>
              </View>
            ) : (
              foodDrives.map(drive => (
                <View key={drive.id} style={styles.driveCard}>
                  <View style={styles.driveHeader}>
                    <Text style={styles.driveName} numberOfLines={1}>{drive.name}</Text>
                    {drive.isUserParticipating && (
                      <View style={styles.participatingBadge}>
                        <Icon name="check" size={12} color={colors.background.white} />
                        <Text style={styles.participatingText}>Joined</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.driveDescription} numberOfLines={2}>
                    {drive.description}
                  </Text>
                  <View style={styles.driveInfo}>
                    <View style={styles.driveInfoItem}>
                      <Icon name="map-marker" size={14} color={colors.text.secondary} />
                      <Text style={styles.driveInfoText}>{drive.location}</Text>
                    </View>
                    <View style={styles.driveInfoItem}>
                      <Icon name="account-group" size={14} color={colors.text.secondary} />
                      <Text style={styles.driveInfoText}>{drive.participantCount}</Text>
                    </View>
                  </View>
                  <View style={styles.driveProgress}>
                    <View style={styles.driveProgressBar}>
                      <View
                        style={[
                          styles.driveProgressFill,
                          {width: `${(drive.collectedItems / drive.goalItems) * 100}%`},
                        ]}
                      />
                    </View>
                    <Text style={styles.driveProgressText}>
                      {drive.collectedItems.toLocaleString()} / {drive.goalItems.toLocaleString()} items
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Animated Tab Bar */}
      <Animated.View
        style={[
          styles.tabBarContainer,
          {
            transform: [{translateY: tabBarTranslateY}],
          },
        ]}>
        <View style={styles.tabBar}>
          {TABS.map(tab => {
            const isActive = activeTab === tab.value;
            return (
              <TouchableOpacity
                key={tab.value}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => setActiveTab(tab.value)}
                activeOpacity={0.7}>
                <Icon
                  name={tab.icon}
                  size={20}
                  color={isActive ? colors.primary.freshAvocadoGreen : colors.text.secondary}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    isActive && styles.tabLabelActive,
                  ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Animated.View>

      {/* Scroll Content */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          {paddingTop: TAB_BAR_HEIGHT + spacing.md + spacing.sm},
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary.freshAvocadoGreen]}
            tintColor={colors.primary.freshAvocadoGreen}
            progressViewOffset={TAB_BAR_HEIGHT + spacing.md}
          />
        }>
        {renderContent()}
      </Animated.ScrollView>

      {/* Donation Flow Modal */}
      {selectedCharity && (
        <DonationFlow
          visible={showDonationFlow}
          charity={selectedCharity}
          matchingCampaign={matchingCampaign}
          userPoints={5000}
          onClose={() => {
            setShowDonationFlow(false);
            setSelectedCharity(null);
          }}
          onSuccess={handleDonationSuccess}
        />
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
  },
  loadingText: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  tabBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background.cream,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.md,
    gap: 4,
  },
  tabActive: {
    backgroundColor: colors.primary.freshAvocadoGreen + '15',
  },
  tabLabel: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: colors.primary.freshAvocadoGreen,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  tabContent: {
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyText: {
    ...textStyles.h4,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  emptySubtext: {
    ...textStyles.body,
    color: colors.text.light,
    marginTop: spacing.xs,
  },
  driveCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  driveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  driveName: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
    flex: 1,
  },
  participatingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary.freshAvocadoGreen,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  participatingText: {
    ...textStyles.caption,
    color: colors.background.white,
    fontWeight: '600',
    marginLeft: 2,
    fontSize: 11,
  },
  driveDescription: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  driveInfo: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  driveInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  driveInfoText: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginLeft: 4,
    fontSize: 12,
  },
  driveProgress: {
    marginBottom: spacing.xs,
  },
  driveProgressBar: {
    height: 6,
    backgroundColor: colors.neutral.gray200,
    borderRadius: 3,
  },
  driveProgressFill: {
    height: '100%',
    backgroundColor: colors.primary.freshAvocadoGreen,
    borderRadius: 3,
  },
  driveProgressText: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    textAlign: 'right',
    fontSize: 11,
  },
});
