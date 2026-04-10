import {api} from './api';
import {FeedFilters, FeedPagination, FeedRestaurant} from '../types/feed';

interface FeedResponse {
  restaurants: FeedRestaurant[];
  pagination: FeedPagination;
  metadata?: {
    generatedAt?: string;
  };
}

interface TrendingDish {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl?: string | null;
  dietaryTags: string[];
  restaurant: {
    id: string;
    name: string;
    cuisineTypes: string[];
    imageUrl?: string | null;
    rating: number;
  };
  orderCount: number;
  trendScore: number;
  whyTrending: string;
}

export interface FeedQueryParams {
  page: number;
  limit: number;
  lat?: number;
  lng?: number;
  maxDistanceKm?: number;
  filters: FeedFilters;
}

function buildQuery(params: FeedQueryParams): string {
  const query = new URLSearchParams();
  query.set('page', params.page.toString());
  query.set('limit', params.limit.toString());

  if (params.lat !== undefined && params.lng !== undefined) {
    query.set('lat', params.lat.toString());
    query.set('lng', params.lng.toString());
  }

  if (params.maxDistanceKm !== undefined) {
    query.set('maxDistance', params.maxDistanceKm.toString());
  }

  if (params.filters.cuisineTypes.length) {
    query.set('cuisineTypes', params.filters.cuisineTypes.join(','));
  }

  if (params.filters.dietaryRestrictions.length) {
    query.set('dietaryRestrictions', params.filters.dietaryRestrictions.join(','));
  }

  if (params.filters.priceRange) {
    query.set('priceRange', `${params.filters.priceRange.min}-${params.filters.priceRange.max}`);
  }

  return query.toString();
}

export async function fetchFeedRestaurants(params: FeedQueryParams): Promise<FeedResponse> {
  const query = buildQuery(params);
  const response = await api.get<FeedResponse>(`/feed/restaurants?${query}`);
  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to load feed');
  }
  return response.data;
}

export async function fetchTrendingDishes(params: {
  lat?: number;
  lng?: number;
  cuisineType?: string;
  dietaryRestrictions?: string[];
  maxDistanceKm?: number;
}): Promise<TrendingDish[]> {
  const query = new URLSearchParams();
  if (params.lat !== undefined && params.lng !== undefined) {
    query.set('lat', params.lat.toString());
    query.set('lng', params.lng.toString());
  }
  if (params.cuisineType) {
    query.set('cuisineType', params.cuisineType);
  }
  if (params.dietaryRestrictions?.length) {
    query.set('dietaryRestrictions', params.dietaryRestrictions.join(','));
  }
  if (params.maxDistanceKm !== undefined) {
    query.set('maxDistance', params.maxDistanceKm.toString());
  }

  const response = await api.get<{dishes: TrendingDish[]}>(
    `/feed/trending-dishes?${query.toString()}`,
  );
  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to load trending dishes');
  }
  return response.data.dishes;
}

export async function markNotInterested(restaurantId: string, reason?: string): Promise<void> {
  const response = await api.post('/feed/not-interested', {restaurantId, reason});
  if (!response.success) {
    throw new Error(response.error?.message || 'Failed to update preference');
  }
}
