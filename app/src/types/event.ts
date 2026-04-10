/**
 * Event types for Foodie Events Hub
 */

export type EventType =
  | 'HAPPY_HOUR'
  | 'POP_UP'
  | 'COMPETITION'
  | 'TASTING'
  | 'LIVE_MUSIC'
  | 'SPECIAL_MENU'
  | 'HOLIDAY'
  | 'OTHER';

export interface EventRestaurant {
  id: string;
  name: string;
  imageUrl: string | null;
  address: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
}

export interface FoodieEvent {
  id: string;
  restaurantId: string;
  title: string;
  description: string;
  type: EventType;
  startTime: string;
  endTime: string;
  maxAttendees: number | null;
  registrationCount: number;
  pointsReward: number;
  imageUrl: string | null;
  prizeDetails: string | null;
  isActive: boolean;
  restaurant: EventRestaurant;
  distanceKm?: number;
  isRegistered?: boolean;
  userQrCode?: string | null;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  userId: string;
  qrCode: string;
  isCheckedIn: boolean;
  checkedInAt: string | null;
  createdAt: string;
}

export interface EventsResponse {
  events: FoodieEvent[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface EventFilters {
  type?: EventType;
  date?: string;
  distanceKm?: number;
  restaurantId?: string;
}

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  HAPPY_HOUR: 'Happy Hour',
  POP_UP: 'Pop-Up',
  COMPETITION: 'Competition',
  TASTING: 'Tasting',
  LIVE_MUSIC: 'Live Music',
  SPECIAL_MENU: 'Special Menu',
  HOLIDAY: 'Holiday',
  OTHER: 'Other',
};

export const EVENT_TYPE_ICONS: Record<EventType, string> = {
  HAPPY_HOUR: 'glass-cocktail',
  POP_UP: 'store',
  COMPETITION: 'trophy',
  TASTING: 'silverware-fork-knife',
  LIVE_MUSIC: 'music',
  SPECIAL_MENU: 'food',
  HOLIDAY: 'party-popper',
  OTHER: 'calendar-star',
};

export const EVENT_TYPE_COLORS: Record<EventType, string> = {
  HAPPY_HOUR: '#FF7043',
  POP_UP: '#AB47BC',
  COMPETITION: '#FFD700',
  TASTING: '#7CB342',
  LIVE_MUSIC: '#5C6BC0',
  SPECIAL_MENU: '#26A69A',
  HOLIDAY: '#EF5350',
  OTHER: '#78909C',
};
