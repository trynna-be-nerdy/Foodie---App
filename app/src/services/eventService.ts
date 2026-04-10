import {USE_MOCKS} from '../config';
import {api} from './api';
import type {FoodieEvent, EventsResponse, EventFilters} from '../types/event';
import {
  getMockEvents,
  getMockEventById,
  registerForMockEvent,
  cancelMockRegistration,
} from '../mocks/eventMocks';

// Simulate network delay for more realistic mock behavior
const simulateDelay = (ms: number = 500) =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get list of events with optional filters
 */
export async function getEvents(filters?: EventFilters): Promise<EventsResponse> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    const events = getMockEvents({
      type: filters?.type,
      date: filters?.date,
      distanceKm: filters?.distanceKm,
    });
    return {
      events,
      pagination: {
        total: events.length,
        limit: 20,
        offset: 0,
        hasMore: false,
      },
    };
  }

  const params: Record<string, string | number> = {};
  if (filters?.type) params.type = filters.type;
  if (filters?.date) params.date = filters.date;
  if (filters?.distanceKm) params.distance = filters.distanceKm;
  if (filters?.restaurantId) params.restaurantId = filters.restaurantId;

  const response = await api.get<EventsResponse>('/events', {params});
  if (response.success && response.data) {
    return response.data;
  }
  return {events: [], pagination: {total: 0, limit: 20, offset: 0, hasMore: false}};
}

/**
 * Get a single event by ID
 */
export async function getEventById(eventId: string): Promise<FoodieEvent | null> {
  if (USE_MOCKS) {
    await simulateDelay(200);
    return getMockEventById(eventId);
  }

  const response = await api.get<FoodieEvent>(`/events/${eventId}`);
  if (response.success && response.data) {
    return response.data;
  }
  return null;
}

/**
 * Register for an event
 */
export async function registerForEvent(
  eventId: string,
): Promise<{success: boolean; qrCode?: string; error?: string}> {
  if (USE_MOCKS) {
    await simulateDelay(400);
    const result = registerForMockEvent(eventId);
    if (result) {
      return {success: true, qrCode: result.qrCode};
    }
    return {success: false, error: 'Event not found'};
  }

  const response = await api.post<{qrCode: string}>(`/events/${eventId}/register`);
  if (response.success && response.data) {
    return {success: true, qrCode: response.data.qrCode};
  }
  return {success: false, error: response.error?.message || 'Registration failed'};
}

/**
 * Cancel event registration
 */
export async function cancelEventRegistration(
  eventId: string,
): Promise<{success: boolean; error?: string}> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    const result = cancelMockRegistration(eventId);
    if (result) {
      return {success: true};
    }
    return {success: false, error: 'Registration not found'};
  }

  const response = await api.delete(`/events/${eventId}/register`);
  if (response.success) {
    return {success: true};
  }
  return {success: false, error: response.error?.message || 'Cancellation failed'};
}

/**
 * Check in to an event (staff-side)
 */
export async function checkInToEvent(
  eventId: string,
  qrCode: string,
): Promise<{success: boolean; pointsAwarded?: number; error?: string}> {
  if (USE_MOCKS) {
    await simulateDelay(500);
    // In mocks, always succeed if the QR code matches expected pattern
    if (qrCode.startsWith('FOODIE-')) {
      return {success: true, pointsAwarded: 100};
    }
    return {success: false, error: 'Invalid QR code'};
  }

  const response = await api.post<{pointsAwarded: number}>(`/events/${eventId}/checkin`, {
    qrCode,
  });
  if (response.success && response.data) {
    return {success: true, pointsAwarded: response.data.pointsAwarded};
  }
  return {success: false, error: response.error?.message || 'Check-in failed'};
}

/**
 * Get user's registered events
 */
export async function getMyRegisteredEvents(): Promise<FoodieEvent[]> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    const allEvents = getMockEvents();
    return allEvents.filter(e => e.isRegistered);
  }

  const response = await api.get<{events: FoodieEvent[]}>('/events/my-registrations');
  if (response.success && response.data) {
    return response.data.events;
  }
  return [];
}
