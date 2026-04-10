import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {SegmentedButtons, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  EarningsDashboard,
  PostEarningsBreakdown,
  CampaignList,
  PayoutSettings,
} from '../components/earnings';
import {borderRadius, colors, spacing} from '../theme';
import {textStyles} from '../theme/typography';
import type {
  CreatorProfile,
  EarningsSummary,
  PostEarnings,
  PromotionCampaign,
  Payout,
  PayoutMethodConfig,
  PayoutMethod,
} from '../types/monetization';
import {
  getCreatorProfile,
  getEarningsSummary,
  getPostEarnings,
  getCampaigns,
  getPayoutHistory,
  getPayoutMethods,
  requestPayout,
  connectPayoutMethod,
  enrollPostInCampaign,
} from '../services/monetizationService';

type TabValue = 'dashboard' | 'posts' | 'campaigns' | 'payouts';

export function EarningsScreen(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<TabValue>('dashboard');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Data states
  const [profile, setProfile] = useState<CreatorProfile | null>(null);
  const [summary, setSummary] = useState<EarningsSummary | null>(null);
  const [postEarnings, setPostEarnings] = useState<PostEarnings[]>([]);
  const [campaigns, setCampaigns] = useState<PromotionCampaign[]>([]);
  const [payoutHistory, setPayoutHistory] = useState<Payout[]>([]);
  const [payoutMethods, setPayoutMethods] = useState<PayoutMethodConfig[]>([]);

  const loadData = useCallback(async () => {
    try {
      const [
        profileData,
        summaryData,
        postsData,
        campaignsData,
        historyData,
        methodsData,
      ] = await Promise.all([
        getCreatorProfile(),
        getEarningsSummary(),
        getPostEarnings(),
        getCampaigns(),
        getPayoutHistory(),
        getPayoutMethods(),
      ]);

      setProfile(profileData);
      setSummary(summaryData);
      setPostEarnings(postsData);
      setCampaigns(campaignsData);
      setPayoutHistory(historyData);
      setPayoutMethods(methodsData);
    } catch (error) {
      console.error('Failed to load earnings data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, [loadData]);

  const handleRequestPayout = useCallback(async (amount: number, method: PayoutMethod) => {
    const response = await requestPayout({amount, method});
    if (response.success) {
      // Refresh data after payout
      loadData();
    } else {
      throw new Error(response.error);
    }
  }, [loadData]);

  const handleConnectMethod = useCallback(async (method: PayoutMethod) => {
    const response = await connectPayoutMethod({method});
    if (response.success) {
      loadData();
    }
  }, [loadData]);

  const handleEnrollCampaign = useCallback(async (campaignId: string) => {
    // In a real app, you'd show a post selector here
    // For now, just simulate enrollment with first unenrolled post
    const unenrolledPost = postEarnings.find(p => !p.isEnrolledInCampaign);
    if (unenrolledPost) {
      const response = await enrollPostInCampaign({
        postId: unenrolledPost.postId,
        campaignId,
      });
      if (response.success) {
        loadData();
      }
    }
  }, [postEarnings, loadData]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
          <Text style={styles.loadingText}>Loading your earnings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile || !summary) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load earnings data</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <View style={styles.tabContent}>
            <EarningsDashboard
              profile={profile}
              summary={summary}
              onRequestPayout={() => setActiveTab('payouts')}
              onViewHistory={() => setActiveTab('payouts')}
            />
          </View>
        );

      case 'posts':
        return (
          <View style={styles.tabContent}>
            <PostEarningsBreakdown
              posts={postEarnings}
              onPostPress={(postId) => {
                console.log('View post:', postId);
              }}
            />
          </View>
        );

      case 'campaigns':
        return (
          <View style={styles.tabContent}>
            <CampaignList
              campaigns={campaigns}
              onEnroll={handleEnrollCampaign}
              onViewDetails={(campaignId) => {
                console.log('View campaign:', campaignId);
              }}
            />
          </View>
        );

      case 'payouts':
        return (
          <View style={styles.tabContent}>
            <PayoutSettings
              profile={profile}
              payoutMethods={payoutMethods}
              payoutHistory={payoutHistory}
              onConnectMethod={handleConnectMethod}
              onRequestPayout={handleRequestPayout}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Creator Earnings</Text>
        <Text style={styles.subtitle}>
          Earn money from your food content
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <SegmentedButtons
          value={activeTab}
          onValueChange={v => setActiveTab(v as TabValue)}
          buttons={[
            {value: 'dashboard', label: 'Overview', icon: 'chart-arc'},
            {value: 'posts', label: 'Posts', icon: 'file-document'},
            {value: 'campaigns', label: 'Promos', icon: 'bullhorn'},
            {value: 'payouts', label: 'Payouts', icon: 'cash'},
          ]}
          style={styles.segmentedButtons}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary.freshAvocadoGreen]}
            tintColor={colors.primary.freshAvocadoGreen}
          />
        }>
        {renderContent()}
      </ScrollView>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  errorText: {
    ...textStyles.body,
    color: colors.status.error,
    textAlign: 'center',
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  subtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  tabContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  segmentedButtons: {
    backgroundColor: colors.background.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  tabContent: {
    paddingHorizontal: spacing.lg,
  },
});
