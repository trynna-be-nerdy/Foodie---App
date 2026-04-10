"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurants = getRestaurants;
exports.getRestaurantById = getRestaurantById;
exports.getNearbyRestaurants = getNearbyRestaurants;
exports.getLoyaltyRestaurants = getLoyaltyRestaurants;
exports.updateRestaurantLocationCount = updateRestaurantLocationCount;
const zod_1 = require("zod");
const database_service_1 = require("../services/database.service");
// Validation schemas
const searchSchema = zod_1.z.object({
    query: zod_1.z.string().optional(),
    cuisineTypes: zod_1.z.string().optional(), // comma-separated
    priceRange: zod_1.z.string().optional(), // 1-4
    city: zod_1.z.string().optional(),
    limit: zod_1.z.string().optional().default('20'),
    offset: zod_1.z.string().optional().default('0'),
});
const locationCountSchema = zod_1.z.object({
    locationCount: zod_1.z.number().int().min(1).max(1000),
});
/**
 * GET /api/v1/restaurants
 * Get list of restaurants with optional filters
 */
async function getRestaurants(req, res) {
    try {
        const validation = searchSchema.safeParse(req.query);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: { message: 'Invalid query parameters', details: validation.error.issues },
            });
            return;
        }
        const { query, cuisineTypes, priceRange, city, limit, offset } = validation.data;
        // Build where clause
        const where = { isActive: true };
        if (query) {
            where.OR = [
                { name: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
            ];
        }
        if (cuisineTypes) {
            where.cuisineTypes = { hasSome: cuisineTypes.split(',') };
        }
        if (priceRange) {
            where.priceRange = parseInt(priceRange);
        }
        if (city) {
            where.city = { equals: city, mode: 'insensitive' };
        }
        const restaurants = await database_service_1.prisma.restaurant.findMany({
            where,
            select: {
                id: true,
                name: true,
                description: true,
                address: true,
                city: true,
                state: true,
                imageUrl: true,
                cuisineTypes: true,
                priceRange: true,
                rating: true,
                reviewCount: true,
                loyaltyProgramEnabled: true,
                pointsPerDollar: true,
                latitude: true,
                longitude: true,
            },
            orderBy: [{ rating: 'desc' }, { reviewCount: 'desc' }],
            take: parseInt(limit),
            skip: parseInt(offset),
        });
        const total = await database_service_1.prisma.restaurant.count({ where });
        res.status(200).json({
            success: true,
            data: {
                restaurants,
                pagination: {
                    total,
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                },
            },
        });
    }
    catch (error) {
        console.error('Get restaurants error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch restaurants', code: 'RESTAURANTS_FETCH_FAILED' },
        });
    }
}
/**
 * GET /api/v1/restaurants/:id
 * Get a single restaurant by ID with full details
 */
async function getRestaurantById(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user?.userId;
        const restaurant = await database_service_1.prisma.restaurant.findUnique({
            where: { id },
            include: {
                menuItems: {
                    where: { isAvailable: true },
                    orderBy: [{ category: 'asc' }, { name: 'asc' }],
                },
                events: {
                    where: {
                        isActive: true,
                        endTime: { gte: new Date() },
                    },
                    orderBy: { startTime: 'asc' },
                    take: 5,
                },
                _count: {
                    select: {
                        socialPosts: true,
                        orders: true,
                        menuItems: true,
                    },
                },
            },
        });
        if (!restaurant) {
            res.status(404).json({
                success: false,
                error: { message: 'Restaurant not found', code: 'RESTAURANT_NOT_FOUND' },
            });
            return;
        }
        // Get user's points balance at this restaurant (if logged in)
        let userPointsBalance = 0;
        if (userId) {
            const wallet = await database_service_1.prisma.pointsWallet.findUnique({
                where: {
                    userId_restaurantId: {
                        userId,
                        restaurantId: id,
                    },
                },
                select: { balance: true },
            });
            userPointsBalance = wallet?.balance ?? 0;
        }
        // Format response with all details needed for mobile app
        const formattedRestaurant = {
            id: restaurant.id,
            name: restaurant.name,
            description: restaurant.description,
            imageUrl: restaurant.imageUrl,
            cuisineTypes: restaurant.cuisineTypes,
            priceRange: restaurant.priceRange,
            rating: restaurant.rating,
            reviewCount: restaurant.reviewCount,
            address: restaurant.address,
            city: restaurant.city,
            state: restaurant.state,
            zipCode: restaurant.zipCode,
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            phone: restaurant.phone,
            email: restaurant.email,
            website: restaurant.website,
            isVerified: restaurant.isVerified,
            isLocalBusiness: restaurant.locationCount < 3,
            locationCount: restaurant.locationCount,
            loyaltyProgramEnabled: restaurant.loyaltyProgramEnabled,
            pointsPerDollar: restaurant.pointsPerDollar,
            userPointsBalance,
            menuItemCount: restaurant._count.menuItems,
            socialPostCount: restaurant._count.socialPosts,
            upcomingEventsCount: restaurant.events.length,
            menuItems: restaurant.menuItems,
            events: restaurant.events,
        };
        res.status(200).json({
            success: true,
            data: formattedRestaurant,
        });
    }
    catch (error) {
        console.error('Get restaurant error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch restaurant', code: 'RESTAURANT_FETCH_FAILED' },
        });
    }
}
/**
 * GET /api/v1/restaurants/nearby
 * Get restaurants near a location
 */
async function getNearbyRestaurants(req, res) {
    try {
        const { lat, lng, radius = '5000', limit = '20' } = req.query;
        if (!lat || !lng) {
            res.status(400).json({
                success: false,
                error: { message: 'Latitude and longitude are required', code: 'LOCATION_REQUIRED' },
            });
            return;
        }
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const radiusKm = parseInt(radius) / 1000;
        // Simple bounding box calculation (approximate)
        const latDiff = radiusKm / 111; // ~111km per degree latitude
        const lngDiff = radiusKm / (111 * Math.cos(latitude * (Math.PI / 180)));
        const restaurants = await database_service_1.prisma.restaurant.findMany({
            where: {
                isActive: true,
                latitude: {
                    gte: latitude - latDiff,
                    lte: latitude + latDiff,
                },
                longitude: {
                    gte: longitude - lngDiff,
                    lte: longitude + lngDiff,
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                address: true,
                city: true,
                imageUrl: true,
                cuisineTypes: true,
                priceRange: true,
                rating: true,
                reviewCount: true,
                loyaltyProgramEnabled: true,
                pointsPerDollar: true,
                latitude: true,
                longitude: true,
            },
            take: parseInt(limit),
        });
        // Calculate actual distance and sort
        const restaurantsWithDistance = restaurants
            .map(r => ({
            ...r,
            distance: calculateDistance(latitude, longitude, r.latitude, r.longitude),
        }))
            .sort((a, b) => a.distance - b.distance);
        res.status(200).json({
            success: true,
            data: { restaurants: restaurantsWithDistance },
        });
    }
    catch (error) {
        console.error('Get nearby restaurants error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch nearby restaurants', code: 'NEARBY_FETCH_FAILED' },
        });
    }
}
/**
 * GET /api/v1/restaurants/loyalty
 * Get restaurants with loyalty programs
 */
async function getLoyaltyRestaurants(req, res) {
    try {
        const { limit = '50', offset = '0' } = req.query;
        const restaurants = await database_service_1.prisma.restaurant.findMany({
            where: {
                isActive: true,
                loyaltyProgramEnabled: true,
            },
            select: {
                id: true,
                name: true,
                description: true,
                imageUrl: true,
                cuisineTypes: true,
                priceRange: true,
                rating: true,
                pointsPerDollar: true,
                loyaltyApiProvider: true,
            },
            orderBy: [{ rating: 'desc' }, { name: 'asc' }],
            take: parseInt(limit),
            skip: parseInt(offset),
        });
        const total = await database_service_1.prisma.restaurant.count({
            where: { isActive: true, loyaltyProgramEnabled: true },
        });
        res.status(200).json({
            success: true,
            data: {
                restaurants,
                pagination: {
                    total,
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                },
            },
        });
    }
    catch (error) {
        console.error('Get loyalty restaurants error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch restaurants', code: 'LOYALTY_FETCH_FAILED' },
        });
    }
}
/**
 * PUT /api/v1/restaurants/:id/location-count
 * Update restaurant location count (local business indicator)
 */
async function updateRestaurantLocationCount(req, res) {
    try {
        const validation = locationCountSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: { message: 'Invalid request body', details: validation.error.issues },
            });
            return;
        }
        const { id } = req.params;
        const { locationCount } = validation.data;
        const restaurant = await database_service_1.prisma.restaurant.update({
            where: { id },
            data: { locationCount },
            select: {
                id: true,
                name: true,
                locationCount: true,
            },
        });
        res.status(200).json({
            success: true,
            data: { restaurant },
        });
    }
    catch (error) {
        console.error('Update location count error:', error);
        res.status(500).json({
            success: false,
            error: {
                message: 'Failed to update location count',
                code: 'LOCATION_COUNT_UPDATE_FAILED',
            },
        });
    }
}
// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}
function toRad(deg) {
    return deg * (Math.PI / 180);
}
//# sourceMappingURL=restaurant.controller.js.map