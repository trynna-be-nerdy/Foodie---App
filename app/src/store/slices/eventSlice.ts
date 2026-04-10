import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {FoodieEvent, EventType} from '../../types/event';

interface EventState {
  events: FoodieEvent[];
  registeredEvents: FoodieEvent[];
  selectedType: EventType | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  lastFetchedAt: number | null;
}

const initialState: EventState = {
  events: [],
  registeredEvents: [],
  selectedType: null,
  isLoading: false,
  isRefreshing: false,
  error: null,
  lastFetchedAt: null,
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEventsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setEventsRefreshing(state, action: PayloadAction<boolean>) {
      state.isRefreshing = action.payload;
    },
    setEventsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setEvents(
      state,
      action: PayloadAction<{events: FoodieEvent[]; fetchedAt: number}>,
    ) {
      state.events = action.payload.events;
      state.lastFetchedAt = action.payload.fetchedAt;
      state.isLoading = false;
      state.isRefreshing = false;
    },
    setRegisteredEvents(state, action: PayloadAction<FoodieEvent[]>) {
      state.registeredEvents = action.payload;
    },
    setSelectedType(state, action: PayloadAction<EventType | null>) {
      state.selectedType = action.payload;
    },
    registerForEventSuccess(
      state,
      action: PayloadAction<{eventId: string; qrCode?: string}>,
    ) {
      const {eventId, qrCode} = action.payload;
      // Update event in events list
      const eventIndex = state.events.findIndex(e => e.id === eventId);
      if (eventIndex !== -1) {
        state.events[eventIndex] = {
          ...state.events[eventIndex],
          isRegistered: true,
          registrationCount: state.events[eventIndex].registrationCount + 1,
          userQrCode: qrCode || null,
        };
        // Add to registered events if not already there
        if (!state.registeredEvents.find(e => e.id === eventId)) {
          state.registeredEvents.push(state.events[eventIndex]);
        }
      }
    },
    cancelRegistrationSuccess(state, action: PayloadAction<string>) {
      const eventId = action.payload;
      // Update event in events list
      const eventIndex = state.events.findIndex(e => e.id === eventId);
      if (eventIndex !== -1) {
        state.events[eventIndex] = {
          ...state.events[eventIndex],
          isRegistered: false,
          registrationCount: Math.max(
            0,
            state.events[eventIndex].registrationCount - 1,
          ),
          userQrCode: null,
        };
      }
      // Remove from registered events
      state.registeredEvents = state.registeredEvents.filter(
        e => e.id !== eventId,
      );
    },
    resetEvents(state) {
      state.events = [];
      state.registeredEvents = [];
      state.selectedType = null;
      state.lastFetchedAt = null;
      state.error = null;
    },
  },
});

export const {
  setEventsLoading,
  setEventsRefreshing,
  setEventsError,
  setEvents,
  setRegisteredEvents,
  setSelectedType,
  registerForEventSuccess,
  cancelRegistrationSuccess,
  resetEvents,
} = eventSlice.actions;

export default eventSlice.reducer;
