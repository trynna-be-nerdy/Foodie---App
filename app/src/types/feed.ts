export interface FeedRestaurant {
  id: string;
  name: string;
  imageUrl?: string | null;
  cuisineTypes: string[];
  priceRange: number;
  rating: number;
  reviewCount: number;
  city?: string;
  state?: string;
  distanceKm?: number | null;
  isLocalBusiness?: boolean;
  recommendationReason?: string;
}

export interface FeedFilters {
  cuisineTypes: string[];
  priceRange: {min: number; max: number};
  distanceMiles: number;
  dietaryRestrictions: string[];
}

export interface FeedPagination {
  page: number;
  totalPages: number;
  totalCount: number;
}
