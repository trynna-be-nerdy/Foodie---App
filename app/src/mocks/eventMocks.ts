import type {FoodieEvent, EventType} from '../types/event';

// Helper to generate dates
const addDays = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

const addHours = (hours: number): string => {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  return date.toISOString();
};

// Mock restaurants for events
const mockRestaurants = [
  {
    id: 'rest-1',
    name: 'The Rustic Table',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    address: '123 Main St',
    city: 'San Francisco',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    id: 'rest-2',
    name: 'Sakura Sushi House',
    imageUrl: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=400',
    address: '456 Oak Ave',
    city: 'San Francisco',
    latitude: 37.7849,
    longitude: -122.4094,
  },
  {
    id: 'rest-3',
    name: 'Bella Italia',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
    address: '789 Pine Rd',
    city: 'San Francisco',
    latitude: 37.7649,
    longitude: -122.4294,
  },
  {
    id: 'rest-4',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
    address: '321 Elm St',
    city: 'San Francisco',
    latitude: 37.7549,
    longitude: -122.4394,
  },
  {
    id: 'rest-5',
    name: 'The Green Garden',
    imageUrl: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400',
    address: '654 Cedar Blvd',
    city: 'San Francisco',
    latitude: 37.7949,
    longitude: -122.3994,
  },
];

// Generate mock events
export const mockEvents: FoodieEvent[] = [
  {
    id: 'event-1',
    restaurantId: 'rest-1',
    title: 'Wine & Dine Wednesday',
    description:
      'Join us for our weekly Wine Wednesday! Half-price bottles of wine paired with our chef\'s special tasting menu. Live jazz from 7-9 PM.',
    type: 'HAPPY_HOUR' as EventType,
    startTime: addHours(2),
    endTime: addHours(5),
    maxAttendees: 50,
    registrationCount: 32,
    pointsReward: 100,
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600',
    prizeDetails: null,
    isActive: true,
    restaurant: mockRestaurants[0],
    distanceKm: 1.2,
    isRegistered: false,
  },
  {
    id: 'event-2',
    restaurantId: 'rest-2',
    title: 'Sushi Rolling Competition',
    description:
      'Think you can roll the perfect sushi? Compete against others in our monthly sushi rolling competition! Prizes include a $100 gift card and free omakase dinner.',
    type: 'COMPETITION' as EventType,
    startTime: addDays(2),
    endTime: addDays(2),
    maxAttendees: 20,
    registrationCount: 18,
    pointsReward: 250,
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600',
    prizeDetails: '1st Place: $100 Gift Card + Free Omakase\n2nd Place: $50 Gift Card\n3rd Place: Free Appetizer for 2',
    isActive: true,
    restaurant: mockRestaurants[1],
    distanceKm: 2.5,
    isRegistered: true,
    userQrCode: 'FOODIE-EVT2-USR123-QR',
  },
  {
    id: 'event-3',
    restaurantId: 'rest-3',
    title: 'Italian Pop-Up: Nonna\'s Kitchen',
    description:
      'Experience authentic Italian cuisine from our guest chef, Nonna Maria! Limited seats available for this exclusive 5-course meal featuring family recipes from Tuscany.',
    type: 'POP_UP' as EventType,
    startTime: addDays(5),
    endTime: addDays(5),
    maxAttendees: 30,
    registrationCount: 28,
    pointsReward: 150,
    imageUrl: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=600',
    prizeDetails: null,
    isActive: true,
    restaurant: mockRestaurants[2],
    distanceKm: 0.8,
    isRegistered: false,
  },
  {
    id: 'event-4',
    restaurantId: 'rest-4',
    title: 'Taco Tuesday Live Music Night',
    description:
      '$2 tacos all night long with live mariachi band! Family-friendly event with a kids\' taco-making station.',
    type: 'LIVE_MUSIC' as EventType,
    startTime: addDays(1),
    endTime: addDays(1),
    maxAttendees: null,
    registrationCount: 85,
    pointsReward: 50,
    imageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600',
    prizeDetails: null,
    isActive: true,
    restaurant: mockRestaurants[3],
    distanceKm: 3.1,
    isRegistered: false,
  },
  {
    id: 'event-5',
    restaurantId: 'rest-5',
    title: 'Farm-to-Table Tasting Experience',
    description:
      'Sample our new seasonal menu featuring ingredients from local farms. Meet the farmers and learn about sustainable sourcing. Includes 8 tasting portions with wine pairings.',
    type: 'TASTING' as EventType,
    startTime: addDays(7),
    endTime: addDays(7),
    maxAttendees: 40,
    registrationCount: 22,
    pointsReward: 200,
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
    prizeDetails: null,
    isActive: true,
    restaurant: mockRestaurants[4],
    distanceKm: 4.2,
    isRegistered: false,
  },
  {
    id: 'event-6',
    restaurantId: 'rest-1',
    title: 'Valentine\'s Day Special',
    description:
      'Celebrate love with our romantic 4-course dinner for two. Includes champagne toast, rose for your date, and live violin performance.',
    type: 'HOLIDAY' as EventType,
    startTime: addDays(30),
    endTime: addDays(30),
    maxAttendees: 24,
    registrationCount: 8,
    pointsReward: 300,
    imageUrl: 'https://images.unsplash.com/photo-1529543544277-750e1a6d4fd6?w=600',
    prizeDetails: null,
    isActive: true,
    restaurant: mockRestaurants[0],
    distanceKm: 1.2,
    isRegistered: false,
  },
  {
    id: 'event-7',
    restaurantId: 'rest-2',
    title: 'Sake Tasting Class',
    description:
      'Learn about different types of sake and how to pair them with sushi. Our sommelier will guide you through 6 premium sakes.',
    type: 'TASTING' as EventType,
    startTime: addDays(3),
    endTime: addDays(3),
    maxAttendees: 15,
    registrationCount: 12,
    pointsReward: 175,
    imageUrl: 'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=600',
    prizeDetails: null,
    isActive: true,
    restaurant: mockRestaurants[1],
    distanceKm: 2.5,
    isRegistered: false,
  },
  {
    id: 'event-8',
    restaurantId: 'rest-3',
    title: 'Chef\'s Special Menu Launch',
    description:
      'Be the first to try our new seasonal menu! 20% off all new dishes for the first week.',
    type: 'SPECIAL_MENU' as EventType,
    startTime: addDays(4),
    endTime: addDays(10),
    maxAttendees: null,
    registrationCount: 45,
    pointsReward: 75,
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
    prizeDetails: null,
    isActive: true,
    restaurant: mockRestaurants[2],
    distanceKm: 0.8,
    isRegistered: false,
  },
];

// Generate a unique QR code for registration
export const generateQRCode = (eventId: string, userId: string): string => {
  const timestamp = Date.now().toString(36);
  return `FOODIE-${eventId.toUpperCase()}-${userId.toUpperCase()}-${timestamp}`;
};

// Simulated user registrations storage
let userRegistrations: Map<string, {eventId: string; qrCode: string}> = new Map();

// Initialize with the already registered event
userRegistrations.set('event-2', {eventId: 'event-2', qrCode: 'FOODIE-EVT2-USR123-QR'});

export const getMockEvents = (filters?: {
  type?: string;
  date?: string;
  distanceKm?: number;
}): FoodieEvent[] => {
  let filtered = [...mockEvents];

  if (filters?.type) {
    filtered = filtered.filter(e => e.type === filters.type);
  }

  if (filters?.distanceKm) {
    filtered = filtered.filter(e => (e.distanceKm ?? 0) <= filters.distanceKm!);
  }

  // Update registration status
  filtered = filtered.map(event => ({
    ...event,
    isRegistered: userRegistrations.has(event.id),
    userQrCode: userRegistrations.get(event.id)?.qrCode ?? null,
  }));

  // Sort by start time
  filtered.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  return filtered;
};

export const getMockEventById = (eventId: string): FoodieEvent | null => {
  const event = mockEvents.find(e => e.id === eventId);
  if (!event) return null;

  return {
    ...event,
    isRegistered: userRegistrations.has(event.id),
    userQrCode: userRegistrations.get(event.id)?.qrCode ?? null,
  };
};

export const registerForMockEvent = (eventId: string): {qrCode: string} | null => {
  const event = mockEvents.find(e => e.id === eventId);
  if (!event) return null;

  if (userRegistrations.has(eventId)) {
    return {qrCode: userRegistrations.get(eventId)!.qrCode};
  }

  const qrCode = generateQRCode(eventId, 'USR123');
  userRegistrations.set(eventId, {eventId, qrCode});

  // Update the mock event's registration count
  const eventIndex = mockEvents.findIndex(e => e.id === eventId);
  if (eventIndex >= 0) {
    mockEvents[eventIndex].registrationCount += 1;
  }

  return {qrCode};
};

export const cancelMockRegistration = (eventId: string): boolean => {
  if (!userRegistrations.has(eventId)) {
    return false;
  }

  userRegistrations.delete(eventId);

  // Update the mock event's registration count
  const eventIndex = mockEvents.findIndex(e => e.id === eventId);
  if (eventIndex >= 0 && mockEvents[eventIndex].registrationCount > 0) {
    mockEvents[eventIndex].registrationCount -= 1;
  }

  return true;
};
