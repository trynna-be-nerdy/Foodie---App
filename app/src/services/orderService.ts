import api from './api';
import {RestaurantMenuItem} from '../types/restaurant';
import {CreateOrderPayload, OrderPaymentData, OrderTotals} from '../types/order';

export interface MenuCategory {
  name: string;
  items: RestaurantMenuItem[];
}

export interface OrderResponse {
  order: {
    id: string;
    status: string;
    total: number;
    createdAt: string;
    estimatedReadyTime?: string | null;
  };
  payment: OrderPaymentData;
  breakdown: OrderTotals;
}

export async function fetchRestaurantMenu(restaurantId: string) {
  return api.get<{restaurantId: string; categories: MenuCategory[]; totalItems: number}>(
    `/orders/menu/${restaurantId}`,
  );
}

export async function createOrder(payload: CreateOrderPayload) {
  return api.post<OrderResponse>('/orders', payload);
}

export async function confirmOrder(orderId: string) {
  return api.post<{order: unknown}>(`/orders/${orderId}/confirm`);
}

export async function getOrder(orderId: string) {
  return api.get<{order: unknown}>(`/orders/${orderId}`);
}

export async function getOrderHistory(params?: {
  status?: string;
  restaurantId?: string;
  limit?: number;
  offset?: number;
}) {
  const search = new URLSearchParams();
  if (params?.status) {
    search.append('status', params.status);
  }
  if (params?.restaurantId) {
    search.append('restaurantId', params.restaurantId);
  }
  if (params?.limit !== undefined) {
    search.append('limit', String(params.limit));
  }
  if (params?.offset !== undefined) {
    search.append('offset', String(params.offset));
  }
  const query = search.toString();
  return api.get<{orders: unknown[]}>(`/orders/history${query ? `?${query}` : ''}`);
}

export async function trackOrder(orderId: string) {
  return api.get<{
    orderId: string;
    currentStatus: string;
    fulfillmentType: string;
    estimatedReadyTime?: string | null;
    restaurant?: {
      id: string;
      name: string;
      phone?: string | null;
      address?: string | null;
      latitude?: number | null;
      longitude?: number | null;
    };
    statusTimeline: {status: string; label: string; completed: boolean; time?: string | null}[];
  }>(`/orders/${orderId}/track`);
}
