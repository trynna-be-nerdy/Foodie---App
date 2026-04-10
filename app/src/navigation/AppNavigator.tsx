import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {StackNavigationProp} from '@react-navigation/stack';
import {IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {WalletScreen} from '../screens/WalletScreen';
import {ScanScreen} from '../screens/ScanScreen';
import {FeedScreen} from '../screens/FeedScreen';
import {ValueScreen} from '../screens/ValueScreen';
import {ImpactScreen} from '../screens/ImpactScreen';
import {EventsScreen} from '../screens/EventsScreen';
import {EventDetailScreen} from '../screens/EventDetailScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {TransactionHistoryScreen} from '../screens/TransactionHistoryScreen';
import {NotificationCenterScreen} from '../screens/NotificationCenterScreen';
import {ReceiptReviewScreen} from '../screens/ReceiptReviewScreen';
import {ReceiptConfirmationScreen} from '../screens/ReceiptConfirmationScreen';
import {ReceiptHistoryScreen} from '../screens/ReceiptHistoryScreen';
import {QRScanScreen} from '../screens/QRScanScreen';
import {QRScanSuccessScreen} from '../screens/QRScanSuccessScreen';
import {RestaurantDetailScreen} from '../screens/RestaurantDetailScreen';
import {MenuScreen} from '../screens/MenuScreen';
import {CheckoutScreen} from '../screens/CheckoutScreen';
import {OrderConfirmationScreen} from '../screens/OrderConfirmationScreen';
import {OrderTrackingScreen} from '../screens/OrderTrackingScreen';
import {CreatePostScreen} from '../screens/CreatePostScreen';
import {UserProfileScreen} from '../screens/UserProfileScreen';
import {EarningsScreen} from '../screens/EarningsScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import {ExtractedReceiptData, MatchedRestaurant} from '../services/receiptService';
import {colors, semanticColors} from '../theme/colors';
import {fontFamilies} from '../theme/typography';
import {useAppSelector} from '../store';

export type BottomTabParamList = {
  Wallet: undefined;
  Scan: undefined;
  Feed: undefined;
  Impact: undefined;
  Value: undefined;
};

export type RootStackParamList = {
  Tabs: undefined;
  TransactionHistory: {restaurantId?: string; restaurantName?: string};
  NotificationCenter: undefined;
  ReceiptReview: {
    receiptId: string;
    extractedData: ExtractedReceiptData | null;
    matchedRestaurant: MatchedRestaurant | null;
  };
  ReceiptConfirmation: {
    receiptId: string;
    pointsEarned: number;
    restaurantName?: string;
  };
  ReceiptHistory: undefined;
  QRScan: undefined;
  QRScanSuccess: {
    pointsEarned: number;
    restaurantName?: string;
  };
  RestaurantDetail: {
    restaurantId: string;
  };
  Menu: {
    restaurantId: string;
  };
  Checkout: {
    restaurantId: string;
  };
  OrderConfirmation: {
    orderId: string;
  };
  OrderTracking: {
    orderId: string;
  };
  CreatePost: {
    restaurantId?: string;
    restaurantName?: string;
  };
  UserProfile: {
    userId: string;
  };
  EventDetail: {
    eventId: string;
  };
  Events: undefined;
  Earnings: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const tabIcons: Record<keyof BottomTabParamList, string> = {
  Wallet: 'wallet',
  Scan: 'barcode-scan',
  Feed: 'food',
  Impact: 'hand-heart',
  Value: 'chart-bar',
};

type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;

const createTabBarIcon =
  (routeName: keyof BottomTabParamList) =>
  ({color, size}: {color: string; size: number}) => {
    const iconName = tabIcons[routeName];
    return <Icon name={iconName} size={size} color={color} />;
  };

const createHeaderLeft = (navigation: RootStackNavigationProp) => () => (
  <IconButton
    icon="cog-outline"
    onPress={() => navigation.navigate('Settings')}
  />
);

const createHeaderRight = (navigation: RootStackNavigationProp) => () => (
  <IconButton
    icon="bell-outline"
    onPress={() => navigation.navigate('NotificationCenter')}
  />
);

const tabScreenOptions = ({route, navigation}: BottomTabScreenProps<BottomTabParamList>) => ({
  tabBarIcon: createTabBarIcon(route.name),
  tabBarActiveTintColor: semanticColors.tabBarActive,
  tabBarInactiveTintColor: semanticColors.tabBarInactive,
  tabBarStyle: {
    backgroundColor: colors.background.white,
    borderTopColor: colors.neutral.gray200,
    paddingBottom: 8,
    paddingTop: 8,
    height: 75,
  },
  tabBarLabelStyle: {
    fontFamily: fontFamilies.quicksand.medium,
    fontSize: 12,
    marginTop: -4,
  },
  headerStyle: {
    backgroundColor: colors.background.cream,
  },
  headerTitleStyle: {
    fontFamily: fontFamilies.poppins.semiBold,
    color: colors.text.primary,
  },
  headerLeft: createHeaderLeft(navigation.getParent<RootStackNavigationProp>() ?? navigation),
  headerRight: createHeaderRight(navigation.getParent<RootStackNavigationProp>() ?? navigation),
});

function TabNavigator(): React.JSX.Element {
  return (
    <Tab.Navigator initialRouteName="Feed" screenOptions={tabScreenOptions}>
      <Tab.Screen name="Wallet" component={WalletScreen} options={{title: 'Wallet'}} />
      <Tab.Screen name="Scan" component={ScanScreen} options={{title: 'Scan'}} />
      <Tab.Screen name="Feed" component={FeedScreen} options={{title: 'Feed'}} />
      <Tab.Screen name="Impact" component={ImpactScreen} options={{title: 'Impact'}} />
      <Tab.Screen name="Value" component={ValueScreen} options={{title: 'Value'}} />
    </Tab.Navigator>
  );
}

export function AppNavigator(): React.JSX.Element {
  const hasCompletedOnboarding = useAppSelector(state => state.app.hasCompletedOnboarding);

  if (!hasCompletedOnboarding) {
    return <OnboardingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.background.cream},
        headerTitleStyle: {
          fontFamily: fontFamilies.poppins.semiBold,
          color: colors.text.primary,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen name="Tabs" component={TabNavigator} options={{headerShown: false}} />
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistoryScreen}
        options={{title: 'Transaction History'}}
      />
      <Stack.Screen
        name="NotificationCenter"
        component={NotificationCenterScreen}
        options={{title: 'Notifications'}}
      />
      <Stack.Screen
        name="ReceiptReview"
        component={ReceiptReviewScreen}
        options={{title: 'Review Receipt'}}
      />
      <Stack.Screen
        name="ReceiptConfirmation"
        component={ReceiptConfirmationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ReceiptHistory"
        component={ReceiptHistoryScreen}
        options={{title: 'Scan History'}}
      />
      <Stack.Screen name="QRScan" component={QRScanScreen} options={{title: 'Scan QR Code'}} />
      <Stack.Screen
        name="QRScanSuccess"
        component={QRScanSuccessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
        options={{title: ''}}
      />
      <Stack.Screen name="Menu" component={MenuScreen} options={{title: 'Menu'}} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{title: 'Checkout'}} />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderTracking"
        component={OrderTrackingScreen}
        options={{title: 'Track Order'}}
      />
      <Stack.Screen
        name="CreatePost"
        component={CreatePostScreen}
        options={{title: 'Create Post'}}
      />
      <Stack.Screen name="UserProfile" component={UserProfileScreen} options={{title: 'Profile'}} />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{title: 'Event Details'}}
      />
      <Stack.Screen name="Events" component={EventsScreen} options={{title: 'Events'}} />
      <Stack.Screen name="Earnings" component={EarningsScreen} options={{title: 'Earnings'}} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{title: 'Settings'}} />
    </Stack.Navigator>
  );
}
