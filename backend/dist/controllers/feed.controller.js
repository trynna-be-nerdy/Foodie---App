"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedRestaurants = getFeedRestaurants;
exports.getTrendingDishes = getTrendingDishes;
exports.markNotInterested = markNotInterested;
const zod_1 = require("zod");
const database_service_1 = require("../services/database.service");
const FEED_LIMIT_MAX = 50;
const DEFAULT_MAX_DISTANCE_KM = 25;
const feedQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional().default('1'),
    limit: zod_1.z.string().optional().default('20'),
    lat: zod_1.z.string().optional(),
    lng: zod_1.z.string().optional(),
    cuisineTypes: zod_1.z.string().optional(),
    priceRange: zod_1.z.string().optional(),
    dietaryRestrictions: zod_1.z.string().optional(),
    maxDistance: zod_1.z.string().optional(),
});
const trendingQuerySchema = zod_1.z.object({
    lat: zod_1.z.string().optional(),
    lng: zod_1.z.string().optional(),
    cuisineType: zod_1.z.string().optional(),
    dietaryRestrictions: zod_1.z.string().optional(),
    maxDistance: zod_1.z.string().optional(),
});
const notInterestedSchema = zod_1.z.object({
    restaurantId: zod_1.z.string().min(1),
    reason: zod_1.z.string().optional(),
});
async function getFeedRestaurants(req, res) {
    try {
        const validation = feedQuerySchema.safeParse(req.query);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: { message: 'Invalid query parameters', details: validation.error.issues },
            });
            return;
        }
        if (!req.user?.userId) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            });
            return;
        }
        const page = Math.max(1, parseInt(validation.data.page, 10));
        const limit = Math.min(FEED_LIMIT_MAX, Math.max(1, parseInt(validation.data.limit, 10)));
        const offset = (page - 1) * limit;
        const lat = parseFloatOrUndefined(validation.data.lat);
        const lng = parseFloatOrUndefined(validation.data.lng);
        const maxDistanceKm = parseFloatOrUndefined(validation.data.maxDistance) ?? DEFAULT_MAX_DISTANCE_KM;
        const cuisineTypes = parseCsv(validation.data.cuisineTypes);
        const dietaryRestrictions = parseCsv(validation.data.dietaryRestrictions);
        const priceRange = parsePriceRange(validation.data.priceRange);
        const preferenceProfile = await getUserPreferenceProfile(req.user.userId);
        const dismissedIds = await getNotInterestedIds(req.user.userId);
        const where = { isActive: true };
        if (cuisineTypes?.length) {
            where.cuisineTypes = { hasSome: cuisineTypes };
        }
        if (priceRange) {
            if (priceRange.min !== undefined && priceRange.max !== undefined) {
                where.priceRange = { gte: priceRange.min, lte: priceRange.max };
            }
            else if (priceRange.min !== undefined) {
                where.priceRange = priceRange.min;
            }
        }
        if (dietaryRestrictions?.length) {
            where.menuItems = {
                some: {
                    dietaryTags: { hasEvery: dietaryRestrictions },
                },
            };
        }
        if (dismissedIds.length) {
            where.id = { notIn: dismissedIds };
        }
        if (lat !== undefined && lng !== undefined) {
            const { latDiff, lngDiff } = calculateBoundingBox(lat, lng, maxDistanceKm);
            where.latitude = { not: null, gte: lat - latDiff, lte: lat + latDiff };
            where.longitude = { not: null, gte: lng - lngDiff, lte: lng + lngDiff };
        }
        const [restaurants, total] = await Promise.all([
            database_service_1.prisma.restaurant.findMany({
                where,
                select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                    cuisineTypes: true,
                    priceRange: true,
                    rating: true,
                    reviewCount: true,
                    latitude: true,
                    longitude: true,
                    locationCount: true,
                    city: true,
                    state: true,
                    createdAt: true,
                    updatedAt: true,
                    _count: {
                        select: {
                            socialPosts: true,
                            orders: true,
                        },
                    },
                },
                take: limit,
                skip: offset,
            }),
            database_service_1.prisma.restaurant.count({ where }),
        ]);
        const scoredRestaurants = restaurants
            .map((restaurant) => {
            const distanceKm = lat !== undefined &&
                lng !== undefined &&
                restaurant.latitude !== null &&
                restaurant.longitude !== null
                ? calculateDistanceKm(lat, lng, restaurant.latitude, restaurant.longitude)
                : null;
            const preferenceScore = calculatePreferenceScore(restaurant, preferenceProfile, dietaryRestrictions);
            const proximityScore = distanceKm !== null ? 1 - Math.min(distanceKm / maxDistanceKm, 1) : 0.5;
            const recencyScore = calculateRecencyScore(restaurant.createdAt, restaurant.updatedAt);
            const engagementScore = calculateEngagementScore(restaurant.rating, restaurant.reviewCount, restaurant._count.socialPosts);
            const diversityScore = calculateDiversityScore(restaurant.cuisineTypes, preferenceProfile);
            const baseScore = 0.4 * preferenceScore +
                0.25 * proximityScore +
                0.15 * recencyScore +
                0.1 * engagementScore +
                0.1 * diversityScore;
            const isLocalBusiness = restaurant.locationCount < 3;
            const finalScore = isLocalBusiness ? baseScore * 1.15 : baseScore;
            return {
                ...restaurant,
                distanceKm,
                isLocalBusiness,
                finalScore,
                recommendationReason: buildRecommendationReason({
                    preferenceScore,
                    proximityScore,
                    recencyScore,
                    engagementScore,
                    diversityScore,
                    isLocalBusiness,
                }),
            };
        })
            .sort((a, b) => b.finalScore - a.finalScore);
        const collaborativeRecs = await getCollaborativeRecommendations({
            userId: req.user.userId,
            excludeIds: new Set([
                ...scoredRestaurants.map((restaurant) => restaurant.id),
                ...dismissedIds,
            ]),
            maxDistanceKm,
            lat,
            lng,
            limit: Math.min(5, Math.ceil(limit * 0.1)),
        });
        const blended = blendRecommendations(scoredRestaurants, collaborativeRecs, limit);
        res.status(200).json({
            success: true,
            data: {
                restaurants: blended.map((restaurant) => ({
                    id: restaurant.id,
                    name: restaurant.name,
                    imageUrl: restaurant.imageUrl,
                    cuisineTypes: restaurant.cuisineTypes,
                    priceRange: restaurant.priceRange,
                    rating: restaurant.rating,
                    reviewCount: restaurant.reviewCount,
                    city: restaurant.city,
                    state: restaurant.state,
                    distanceKm: restaurant.distanceKm,
                    isLocalBusiness: restaurant.isLocalBusiness,
                    recommendationReason: restaurant.recommendationReason,
                })),
                pagination: {
                    page,
                    totalPages: Math.ceil(total / limit),
                    totalCount: total,
                },
                metadata: {
                    generatedAt: new Date().toISOString(),
                },
            },
        });
    }
    catch (error) {
        console.error('Feed restaurants error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to generate feed', code: 'FEED_GENERATION_FAILED' },
        });
    }
}
async function getTrendingDishes(req, res) {
    try {
        const validation = trendingQuerySchema.safeParse(req.query);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: { message: 'Invalid query parameters', details: validation.error.issues },
            });
            return;
        }
        const lat = parseFloatOrUndefined(validation.data.lat);
        const lng = parseFloatOrUndefined(validation.data.lng);
        const maxDistanceKm = parseFloatOrUndefined(validation.data.maxDistance) ?? DEFAULT_MAX_DISTANCE_KM;
        const cuisineType = validation.data.cuisineType?.trim();
        const dietaryRestrictions = parseCsv(validation.data.dietaryRestrictions);
        const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const orderCounts = await database_service_1.prisma.orderItem.groupBy({
            by: ['menuItemId'],
            where: {
                order: {
                    createdAt: {
                        gte: since,
                    },
                },
            },
            _count: {
                menuItemId: true,
            },
            orderBy: {
                _count: {
                    menuItemId: 'desc',
                },
            },
            take: 50,
        });
        if (!orderCounts.length) {
            res.status(200).json({
                success: true,
                data: {
                    dishes: [],
                },
            });
            return;
        }
        const menuItemIds = orderCounts.map((item) => item.menuItemId);
        const menuItems = await database_service_1.prisma.menuItem.findMany({
            where: {
                id: { in: menuItemIds },
                isAvailable: true,
                ...(dietaryRestrictions?.length
                    ? { dietaryTags: { hasEvery: dietaryRestrictions } }
                    : {}),
                ...(cuisineType
                    ? {
                        restaurant: {
                            cuisineTypes: { has: cuisineType },
                        },
                    }
                    : {}),
            },
            include: {
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        cuisineTypes: true,
                        latitude: true,
                        longitude: true,
                        imageUrl: true,
                        rating: true,
                    },
                },
            },
        });
        const menuItemsById = new Map(menuItems.map((item) => [item.id, item]));
        const menuItemNames = menuItems.map((item) => item.name);
        const posts = await database_service_1.prisma.socialPost.findMany({
            where: {
                createdAt: { gte: since },
                dishTags: {
                    hasSome: menuItemNames,
                },
            },
            select: {
                dishTags: true,
                rating: true,
            },
        });
        const postStats = new Map();
        posts.forEach((post) => {
            post.dishTags.forEach((tag) => {
                if (!menuItemNames.includes(tag)) {
                    return;
                }
                const existing = postStats.get(tag) ?? { count: 0, ratingTotal: 0, ratingCount: 0 };
                existing.count += 1;
                if (post.rating) {
                    existing.ratingTotal += post.rating;
                    existing.ratingCount += 1;
                }
                postStats.set(tag, existing);
            });
        });
        const maxOrderCount = Math.max(...orderCounts.map((item) => item._count.menuItemId));
        const maxPostCount = Math.max(1, ...Array.from(postStats.values()).map((stat) => stat.count));
        const dishes = orderCounts
            .map((count) => {
            const menuItem = menuItemsById.get(count.menuItemId);
            if (!menuItem) {
                return null;
            }
            if (lat !== undefined &&
                lng !== undefined &&
                menuItem.restaurant.latitude !== null &&
                menuItem.restaurant.longitude !== null) {
                const distanceKm = calculateDistanceKm(lat, lng, menuItem.restaurant.latitude, menuItem.restaurant.longitude);
                if (distanceKm > maxDistanceKm) {
                    return null;
                }
            }
            const stats = postStats.get(menuItem.name) ?? {
                count: 0,
                ratingTotal: 0,
                ratingCount: 0,
            };
            const orderScore = count._count.menuItemId / maxOrderCount;
            const engagementScore = stats.count / maxPostCount;
            const ratingScore = stats.ratingCount > 0 ? stats.ratingTotal / stats.ratingCount / 5 : 0.5;
            const trendScore = orderScore * 0.5 + engagementScore * 0.3 + ratingScore * 0.2;
            return {
                id: menuItem.id,
                name: menuItem.name,
                price: menuItem.price,
                category: menuItem.category,
                imageUrl: menuItem.imageUrl,
                dietaryTags: menuItem.dietaryTags,
                restaurant: {
                    id: menuItem.restaurant.id,
                    name: menuItem.restaurant.name,
                    cuisineTypes: menuItem.restaurant.cuisineTypes,
                    imageUrl: menuItem.restaurant.imageUrl,
                    rating: menuItem.restaurant.rating,
                },
                orderCount: count._count.menuItemId,
                trendScore,
                whyTrending: stats.count > 0
                    ? `${count._count.menuItemId} orders and ${stats.count} posts this week`
                    : `${count._count.menuItemId} orders this week`,
            };
        })
            .filter((item) => item !== null)
            .sort((a, b) => b.trendScore - a.trendScore)
            .slice(0, 20);
        res.status(200).json({
            success: true,
            data: { dishes },
        });
    }
    catch (error) {
        console.error('Trending dishes error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch trending dishes', code: 'TRENDING_FETCH_FAILED' },
        });
    }
}
async function markNotInterested(req, res) {
    try {
        if (!req.user?.userId) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            });
            return;
        }
        const validation = notInterestedSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: { message: 'Invalid request body', details: validation.error.issues },
            });
            return;
        }
        const { restaurantId, reason } = validation.data;
        await database_service_1.prisma.notInterested.upsert({
            where: {
                userId_restaurantId: {
                    userId: req.user.userId,
                    restaurantId,
                },
            },
            update: { reason },
            create: {
                userId: req.user.userId,
                restaurantId,
                reason,
            },
        });
        await database_service_1.prisma.userInteraction.upsert({
            where: {
                userId_restaurantId_interactionType: {
                    userId: req.user.userId,
                    restaurantId,
                    interactionType: 'NOT_INTERESTED',
                },
            },
            update: { weight: -1 },
            create: {
                userId: req.user.userId,
                restaurantId,
                interactionType: 'NOT_INTERESTED',
                weight: -1,
            },
        });
        res.status(200).json({
            success: true,
            data: { message: 'Restaurant dismissed' },
        });
    }
    catch (error) {
        console.error('Not interested error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to update preference', code: 'NOT_INTERESTED_FAILED' },
        });
    }
}
function parseCsv(value) {
    if (!value) {
        return undefined;
    }
    const parsed = value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    return parsed.length ? parsed : undefined;
}
function parsePriceRange(value) {
    if (!value) {
        return null;
    }
    const trimmed = value.trim();
    if (trimmed.includes('-')) {
        const [minRaw, maxRaw] = trimmed.split('-');
        const min = Number(minRaw);
        const max = Number(maxRaw);
        if (Number.isNaN(min) || Number.isNaN(max)) {
            return null;
        }
        return { min, max };
    }
    const single = Number(trimmed);
    if (Number.isNaN(single)) {
        return null;
    }
    return { min: single };
}
function parseFloatOrUndefined(value) {
    if (!value) {
        return undefined;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
}
function calculateDistanceKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
function toRad(deg) {
    return deg * (Math.PI / 180);
}
function calculateBoundingBox(lat, lng, radiusKm) {
    const latDiff = radiusKm / 111;
    const lngDiff = radiusKm / (111 * Math.cos(lat * (Math.PI / 180)));
    return { latDiff, lngDiff };
}
async function getUserPreferenceProfile(userId) {
    const interactions = await database_service_1.prisma.userInteraction.findMany({
        where: {
            userId,
            interactionType: {
                in: ['SAVED', 'ORDERED', 'RATED', 'NOT_INTERESTED'],
            },
        },
        include: {
            restaurant: {
                select: {
                    cuisineTypes: true,
                    priceRange: true,
                },
            },
        },
    });
    const cuisineWeights = new Map();
    const priceRanges = [];
    const interactedRestaurantIds = new Set();
    interactions.forEach((interaction) => {
        interactedRestaurantIds.add(interaction.restaurantId);
        const weight = interaction.interactionType === 'NOT_INTERESTED' ? -1 : 1;
        interaction.restaurant.cuisineTypes.forEach((cuisine) => {
            cuisineWeights.set(cuisine, (cuisineWeights.get(cuisine) ?? 0) + weight);
        });
        if (weight > 0) {
            priceRanges.push(interaction.restaurant.priceRange);
        }
    });
    const avgPriceRange = priceRanges.length > 0
        ? priceRanges.reduce((total, value) => total + value, 0) / priceRanges.length
        : null;
    return {
        cuisineWeights,
        avgPriceRange,
        totalInteractions: interactions.length,
        interactedRestaurantIds,
    };
}
async function getNotInterestedIds(userId) {
    const dismissed = await database_service_1.prisma.notInterested.findMany({
        where: { userId },
        select: { restaurantId: true },
    });
    return dismissed.map((item) => item.restaurantId);
}
function calculatePreferenceScore(restaurant, profile, dietaryRestrictions) {
    const cuisineScore = calculateCuisineScore(restaurant.cuisineTypes, profile);
    const priceScore = calculatePriceScore(restaurant.priceRange, profile.avgPriceRange);
    const dietaryScore = dietaryRestrictions?.length ? 1 : 0.7;
    return clamp01((cuisineScore + priceScore + dietaryScore) / 3);
}
function calculateCuisineScore(cuisines, profile) {
    if (profile.cuisineWeights.size === 0) {
        return 0.5;
    }
    const weights = Array.from(profile.cuisineWeights.values());
    const totalWeight = weights.reduce((sum, weight) => sum + Math.abs(weight), 0);
    const matchedWeight = cuisines.reduce((sum, cuisine) => sum + (profile.cuisineWeights.get(cuisine) ?? 0), 0);
    if (totalWeight === 0) {
        return 0.5;
    }
    return clamp01((matchedWeight / totalWeight + 1) / 2);
}
function calculatePriceScore(priceRange, avgPriceRange) {
    if (!avgPriceRange) {
        return 0.5;
    }
    const diff = Math.abs(priceRange - avgPriceRange);
    return clamp01(1 - diff / 3);
}
function calculateRecencyScore(createdAt, updatedAt) {
    const referenceDate = updatedAt ?? createdAt;
    const daysSince = (Date.now() - referenceDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince <= 30) {
        return 1;
    }
    if (daysSince <= 180) {
        return 0.7;
    }
    return 0.4;
}
function calculateEngagementScore(rating, reviewCount, socialPostsCount) {
    const ratingScore = clamp01(rating / 5);
    const reviewScore = clamp01(reviewCount / 200);
    const socialScore = clamp01(socialPostsCount / 50);
    return ratingScore * 0.5 + reviewScore * 0.3 + socialScore * 0.2;
}
function calculateDiversityScore(cuisines, profile) {
    if (profile.cuisineWeights.size === 0) {
        return 1;
    }
    const maxCuisineCount = Math.max(...Array.from(profile.cuisineWeights.values()), 1);
    const cuisinePenalty = Math.max(...cuisines.map((cuisine) => profile.cuisineWeights.get(cuisine) ?? 0), 0);
    return clamp01(1 - (cuisinePenalty / maxCuisineCount) * 0.5);
}
function buildRecommendationReason({ preferenceScore, proximityScore, recencyScore, engagementScore, diversityScore, isLocalBusiness, }) {
    if (isLocalBusiness) {
        return 'Local favorite';
    }
    const entries = [
        { key: 'preference', score: preferenceScore, reason: 'Matches your tastes' },
        { key: 'proximity', score: proximityScore, reason: 'Close to you' },
        { key: 'recency', score: recencyScore, reason: 'Just opened or updated' },
        { key: 'engagement', score: engagementScore, reason: 'Highly rated' },
        { key: 'diversity', score: diversityScore, reason: 'Try something new' },
    ];
    entries.sort((a, b) => b.score - a.score);
    return entries[0]?.reason ?? 'Recommended for you';
}
function blendRecommendations(primary, secondary, limit) {
    if (!secondary.length) {
        return primary.slice(0, limit);
    }
    const result = [];
    const insertEvery = Math.max(5, Math.floor(primary.length / (secondary.length + 1)));
    let secondaryIndex = 0;
    primary.forEach((item, index) => {
        if (result.length >= limit) {
            return;
        }
        if (index > 0 && index % insertEvery === 0 && secondaryIndex < secondary.length) {
            result.push(secondary[secondaryIndex]);
            secondaryIndex += 1;
        }
        if (result.length < limit) {
            result.push(item);
        }
    });
    while (result.length < limit && secondaryIndex < secondary.length) {
        result.push(secondary[secondaryIndex]);
        secondaryIndex += 1;
    }
    return result.slice(0, limit);
}
function clamp01(value) {
    if (value < 0) {
        return 0;
    }
    if (value > 1) {
        return 1;
    }
    return value;
}
async function getCollaborativeRecommendations({ userId, excludeIds, limit, lat, lng, maxDistanceKm, }) {
    const userInteractions = await database_service_1.prisma.userInteraction.findMany({
        where: {
            userId,
            interactionType: { in: ['SAVED', 'ORDERED', 'RATED'] },
        },
        select: { restaurantId: true },
    });
    if (!userInteractions.length) {
        return [];
    }
    const restaurantIds = userInteractions.map((interaction) => interaction.restaurantId);
    restaurantIds.forEach((id) => excludeIds.add(id));
    const similarInteractions = await database_service_1.prisma.userInteraction.findMany({
        where: {
            restaurantId: { in: restaurantIds },
            userId: { not: userId },
            interactionType: { in: ['SAVED', 'ORDERED', 'RATED'] },
        },
        select: { userId: true, restaurantId: true },
    });
    const similarityCounts = new Map();
    similarInteractions.forEach((interaction) => {
        similarityCounts.set(interaction.userId, (similarityCounts.get(interaction.userId) ?? 0) + 1);
    });
    const similarUserIds = Array.from(similarityCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([id]) => id);
    if (!similarUserIds.length) {
        return [];
    }
    const candidateInteractions = await database_service_1.prisma.userInteraction.findMany({
        where: {
            userId: { in: similarUserIds },
            interactionType: { in: ['SAVED', 'ORDERED', 'RATED'] },
        },
        select: { restaurantId: true },
    });
    const restaurantCounts = new Map();
    candidateInteractions.forEach((interaction) => {
        if (excludeIds.has(interaction.restaurantId)) {
            return;
        }
        restaurantCounts.set(interaction.restaurantId, (restaurantCounts.get(interaction.restaurantId) ?? 0) + 1);
    });
    const topRestaurantIds = Array.from(restaurantCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([id]) => id);
    if (!topRestaurantIds.length) {
        return [];
    }
    const restaurants = await database_service_1.prisma.restaurant.findMany({
        where: {
            id: { in: topRestaurantIds },
            isActive: true,
        },
        select: {
            id: true,
            name: true,
            imageUrl: true,
            cuisineTypes: true,
            priceRange: true,
            rating: true,
            reviewCount: true,
            latitude: true,
            longitude: true,
            locationCount: true,
            city: true,
            state: true,
        },
    });
    return restaurants
        .map((restaurant) => {
        const distanceKm = lat !== undefined &&
            lng !== undefined &&
            restaurant.latitude !== null &&
            restaurant.longitude !== null
            ? calculateDistanceKm(lat, lng, restaurant.latitude, restaurant.longitude)
            : null;
        if (distanceKm !== null && distanceKm > maxDistanceKm) {
            return null;
        }
        return {
            ...restaurant,
            distanceKm,
            isLocalBusiness: restaurant.locationCount < 3,
            recommendationReason: 'Popular with similar diners',
        };
    })
        .filter((item) => item !== null);
}
//# sourceMappingURL=feed.controller.js.map