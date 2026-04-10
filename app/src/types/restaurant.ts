export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
}

export interface RestaurantDetails {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string | null;
  cuisineTypes: string[];
  priceRange: number;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number | null;
  longitude?: number | null;
  phone?: string;
  email?: string;
  website?: string;
  isVerified: boolean;
  isLocalBusiness: boolean;
  locationCount: number;
  businessHours?: BusinessHours[];
  distanceKm?: number | null;
  // Loyalty info
  loyaltyProgramEnabled: boolean;
  pointsPerDollar: number;
  userPointsBalance?: number;
  // Menu summary
  menuItemCount?: number;
  // Social stats
  socialPostCount?: number;
  // Events
  upcomingEventsCount?: number;
}

export interface RestaurantMenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string | null;
  dietaryTags: string[];
  isAvailable: boolean;
}

export interface RestaurantReview {
  id: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number;
  content: string;
  photos?: string[];
  createdAt: string;
}

export interface RestaurantEvent {
  id: string;
  title: string;
  description: string;
  type: string;
  startTime: string;
  endTime: string;
  pointsReward: number;
  imageUrl?: string | null;
  isRegistered?: boolean;
}
