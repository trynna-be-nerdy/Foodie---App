import React, {useCallback, useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Button,
  Card,
  FAB,
  Text,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  BestValueCard,
  SavingsSummary,
  BudgetTracker,
  DecisionHelper,
} from '../components/value';
import type {
  ValueDashboardData,
  MaxPointsRestaurant,
  UsePointsRestaurant,
  ValueAlert,
} from '../types/value';
import {getValueDashboard} from '../services/valueService';
import type {RootStackParamList} from '../navigation/AppNavigator';
import {borderRadius, colors, spacing} from '../theme';
import {textStyles} from '../theme/typography';

type ValueNavigationProp = StackNavigationProp<RootStackParamList>;

export function ValueScreen(): React.JSX.Element {
  const navigation = useNavigation<ValueNavigationProp>();
  const [dashboardData, setDashboardData] = useState<ValueDashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showDecisionHelper, setShowDecisionHelper] = useState(false);

  const fetchDashboard = useCallback(async (refresh = false) => {
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      const data = await getValueDashboard();
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching value dashboard:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleRefresh = () => fetchDashboard(true);

  const handleRestaurantPress = (restaurantId: string) => {
    navigation.navigate('RestaurantDetail', {restaurantId});
  };

  const renderAlertBanner = (alert: ValueAlert) => {
    const iconMap: Record<ValueAlert['type'], string> = {
      bonus_points: 'star-circle',
      expiring_points: 'clock-alert',
      flash_sale: 'flash',
      budget_warning: 'wallet-outline',
      milestone: 'trophy',
    };

    const colorMap: Record<ValueAlert['type'], string> = {
      bonus_points: colors.primary.freshAvocadoGreen,
      expiring_points: colors.accent.sunriseOrange,
      flash_sale: colors.status.error,
      budget_warning: colors.accent.goldenYellow,
      milestone: colors.accent.goldenYellow,
    };

    return (
      <Card
        key={alert.id}
        style={styles.alertCard}
        mode="elevated"
        onPress={() => alert.restaurantId && handleRestaurantPress(alert.restaurantId)}>
        <View style={styles.alertContent}>
          <View style={[styles.alertIcon, {backgroundColor: colorMap[alert.type] + '20'}]}>
            <Icon name={iconMap[alert.type]} size={20} color={colorMap[alert.type]} />
          </View>
          <View style={styles.alertText}>
            <Text style={styles.alertTitle}>{alert.title}</Text>
            <Text style={styles.alertMessage} numberOfLines={2}>
              {alert.message}
            </Text>
          </View>
          <Icon name="chevron-right" size={20} color={colors.neutral.gray400} />
        </View>
      </Card>
    );
  };

  const renderMaxPointsItem = (item: MaxPointsRestaurant) => (
    <Pressable
      key={item.id}
      style={styles.maxPointsItem}
      onPress={() => handleRestaurantPress(item.id)}>
      {item.logoUrl ? (
        <Image source={{uri: item.logoUrl}} style={styles.maxPointsLogo} resizeMode="cover" />
      ) : (
        <View style={[styles.maxPointsLogo, styles.logoPlaceholder]}>
          <Icon name="store" size={20} color={colors.neutral.gray400} />
        </View>
      )}
      <View style={styles.maxPointsInfo}>
        <Text style={styles.maxPointsName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.maxPointsReason} numberOfLines={1}>
          {item.bonusReason}
        </Text>
      </View>
      <View style={styles.maxPointsBadge}>
        <Text style={styles.maxPointsMultiplier}>{item.bonusMultiplier}x</Text>
        <Text style={styles.maxPointsLabel}>Points</Text>
      </View>
    </Pressable>
  );

  const renderUsePointsItem = (item: UsePointsRestaurant) => (
    <Pressable
      key={item.id}
      style={styles.usePointsItem}
      onPress={() => handleRestaurantPress(item.id)}>
      {item.logoUrl ? (
        <Image source={{uri: item.logoUrl}} style={styles.usePointsLogo} resizeMode="cover" />
      ) : (
        <View style={[styles.usePointsLogo, styles.logoPlaceholder]}>
          <Icon name="store" size={20} color={colors.neutral.gray400} />
        </View>
      )}
      <View style={styles.usePointsInfo}>
        <Text style={styles.usePointsName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.usePointsRow}>
          <Icon name="star" size={14} color={colors.accent.goldenYellow} />
          <Text style={styles.usePointsBalance}>
            {item.availablePoints.toLocaleString()} pts (${item.pointsValue.toFixed(2)})
          </Text>
        </View>
        {item.expiringPoints > 0 && (
          <Text style={styles.expiringText}>
            {item.expiringPoints} expiring soon
          </Text>
        )}
      </View>
      <Button
        mode="contained"
        compact
        buttonColor={colors.primary.freshAvocadoGreen}
        onPress={() => handleRestaurantPress(item.id)}>
        Use
      </Button>
    </Pressable>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
          <Text style={styles.loadingText}>Loading your value insights...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!dashboardData) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.errorContainer}>
          <Icon name="alert-circle-outline" size={64} color={colors.neutral.gray400} />
          <Text style={styles.errorText}>Unable to load dashboard</Text>
          <Button mode="contained" onPress={() => fetchDashboard()}>
            Try Again
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const unreadAlerts = dashboardData.alerts.filter(a => !a.isRead);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary.freshAvocadoGreen]}
            tintColor={colors.primary.freshAvocadoGreen}
          />
        }>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Value Dashboard</Text>
          <Text style={styles.headerSubtitle}>
            Make smarter dining decisions
          </Text>
        </View>

        {/* Active Alerts */}
        {unreadAlerts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>For You</Text>
            {unreadAlerts.slice(0, 3).map(renderAlertBanner)}
          </View>
        )}

        {/* Savings Summary */}
        <View style={styles.section}>
          <SavingsSummary data={dashboardData.savingsSummary} />
        </View>

        {/* Budget Tracker */}
        <View style={styles.section}>
          <BudgetTracker budget={dashboardData.budget} />
        </View>

        {/* Max Points Today */}
        {dashboardData.maxPointsToday.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="fire" size={20} color={colors.accent.sunriseOrange} />
              <Text style={styles.sectionTitleIcon}>Max Points Today</Text>
            </View>
            <Card style={styles.listCard} mode="elevated">
              {dashboardData.maxPointsToday.map(renderMaxPointsItem)}
            </Card>
          </View>
        )}

        {/* Use Your Points */}
        {dashboardData.useYourPoints.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="gift" size={20} color={colors.primary.freshAvocadoGreen} />
              <Text style={styles.sectionTitleIcon}>Use Your Points</Text>
            </View>
            <Card style={styles.listCard} mode="elevated">
              {dashboardData.useYourPoints.map(renderUsePointsItem)}
            </Card>
          </View>
        )}

        {/* Best Value Restaurants */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Value Restaurants</Text>
          {dashboardData.bestValueRestaurants.slice(0, 5).map((restaurant, index) => (
            <BestValueCard
              key={restaurant.id}
              restaurant={restaurant}
              rank={index + 1}
              onPress={() => handleRestaurantPress(restaurant.id)}
            />
          ))}
        </View>

        {/* Spacer for FAB */}
        <View style={styles.fabSpacer} />
      </ScrollView>

      {/* Decision Helper FAB */}
      <FAB
        icon="magic-staff"
        label="Where Should I Eat?"
        style={styles.fab}
        onPress={() => setShowDecisionHelper(true)}
        color={colors.text.inverse}
      />

      {/* Decision Helper Modal */}
      <DecisionHelper
        visible={showDecisionHelper}
        onClose={() => setShowDecisionHelper(false)}
        onSelectRestaurant={handleRestaurantPress}
      />
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
  scrollContent: {
    paddingHorizontal: spacing.md,
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
    padding: spacing.xl,
  },
  errorText: {
    ...textStyles.h4,
    color: colors.text.secondary,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  header: {
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
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitleIcon: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginLeft: spacing.xs,
  },
  alertCard: {
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.white,
  },
  alertContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  alertIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  alertText: {
    flex: 1,
  },
  alertTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  alertMessage: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginTop: 2,
  },
  listCard: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.white,
    overflow: 'hidden',
  },
  maxPointsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  maxPointsLogo: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
  },
  logoPlaceholder: {
    backgroundColor: colors.neutral.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maxPointsInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  maxPointsName: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  maxPointsReason: {
    ...textStyles.bodySmall,
    color: colors.accent.sunriseOrange,
    marginTop: 2,
  },
  maxPointsBadge: {
    backgroundColor: colors.accent.sunriseOrange,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  maxPointsMultiplier: {
    ...textStyles.h4,
    color: colors.text.inverse,
  },
  maxPointsLabel: {
    ...textStyles.labelSmall,
    color: colors.text.inverse,
  },
  usePointsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  usePointsLogo: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
  },
  usePointsInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  usePointsName: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  usePointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  usePointsBalance: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginLeft: 4,
  },
  expiringText: {
    ...textStyles.labelSmall,
    color: colors.accent.sunriseOrange,
    marginTop: 2,
  },
  fabSpacer: {
    height: 80,
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.md,
    backgroundColor: colors.primary.freshAvocadoGreen,
  },
});
