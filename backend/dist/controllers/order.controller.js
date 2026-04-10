"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = createOrder;
exports.confirmOrder = confirmOrder;
exports.getOrder = getOrder;
exports.getOrderHistory = getOrderHistory;
exports.updateOrderStatus = updateOrderStatus;
exports.cancelOrder = cancelOrder;
exports.trackOrder = trackOrder;
exports.getRestaurantMenu = getRestaurantMenu;
const zod_1 = require("zod");
const database_service_1 = require("../services/database.service");
const stripe_service_1 = require("../services/stripe.service");
const orderFallback_service_1 = require("../services/orderFallback.service");
const notification_service_1 = require("../services/notification.service");
const websocket_service_1 = require("../services/websocket.service");
const challengeJob_service_1 = require("../services/challengeJob.service");
// Validation schemas
const orderItemSchema = zod_1.z.object({
    menuItemId: zod_1.z.string().min(1),
    quantity: zod_1.z.number().int().min(1).max(99),
    customizations: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    specialInstructions: zod_1.z.string().max(500).optional(),
});
const createOrderSchema = zod_1.z.object({
    restaurantId: zod_1.z.string().min(1),
    items: zod_1.z.array(orderItemSchema).min(1).max(50),
    fulfillmentType: zod_1.z.enum(['PICKUP', 'DELIVERY', 'DINE_IN']).default('PICKUP'),
    deliveryAddress: zod_1.z
        .object({
        street: zod_1.z.string(),
        city: zod_1.z.string(),
        state: zod_1.z.string(),
        zipCode: zod_1.z.string(),
        instructions: zod_1.z.string().optional(),
    })
        .optional(),
    tip: zod_1.z.number().min(0).max(1000).default(0),
    pointsToUse: zod_1.z.number().int().min(0).default(0),
    specialInstructions: zod_1.z.string().max(500).optional(),
});
const updateStatusSchema = zod_1.z.object({
    status: zod_1.z.enum([
        'PENDING',
        'CONFIRMED',
        'PREPARING',
        'READY',
        'OUT_FOR_DELIVERY',
        'DELIVERED',
        'COMPLETED',
        'CANCELLED',
    ]),
    estimatedReadyTime: zod_1.z.string().datetime().optional(),
});
// Fee configuration
const SERVICE_FEE_PERCENT = 0.05; // 5%
const DELIVERY_FEE_BASE = 2.99;
const DELIVERY_FEE_PER_MILE = 0.5;
const TAX_RATE = 0.0875; // 8.75%
const POINTS_PER_DOLLAR = 10;
const POINTS_VALUE_CENTS = 1; // 1 point = $0.01, so 100 points = $1
const MAX_POINTS_DISCOUNT_PERCENT = 0.5; // Max 50% discount with points
/**
 * POST /api/v1/orders
 * Create a new order and initiate payment
 */
async function createOrder(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            });
            return;
        }
        const validation = createOrderSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: { message: 'Invalid request body', details: validation.error.issues },
            });
            return;
        }
        const { restaurantId, items, fulfillmentType, deliveryAddress, tip, pointsToUse, specialInstructions, } = validation.data;
        // Get user info for Stripe
        const user = await database_service_1.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true },
        });
        if (!user) {
            res.status(404).json({
                success: false,
                error: { message: 'User not found', code: 'USER_NOT_FOUND' },
            });
            return;
        }
        // Get restaurant info
        const restaurant = await database_service_1.prisma.restaurant.findUnique({
            where: { id: restaurantId },
            select: { id: true, name: true, pointsPerDollar: true, loyaltyProgramEnabled: true },
        });
        if (!restaurant) {
            res.status(404).json({
                success: false,
                error: { message: 'Restaurant not found', code: 'RESTAURANT_NOT_FOUND' },
            });
            return;
        }
        // Get menu items and validate availability
        const menuItemIds = items.map((item) => item.menuItemId);
        const menuItems = await database_service_1.prisma.menuItem.findMany({
            where: {
                id: { in: menuItemIds },
                restaurantId,
                isAvailable: true,
            },
        });
        if (menuItems.length !== menuItemIds.length) {
            res.status(400).json({
                success: false,
                error: { message: 'One or more menu items are unavailable', code: 'ITEMS_UNAVAILABLE' },
            });
            return;
        }
        // Calculate order totals
        const menuItemMap = new Map(menuItems.map((item) => [item.id, item]));
        let subtotal = 0;
        const orderItems = items.map((item) => {
            const menuItem = menuItemMap.get(item.menuItemId);
            const totalPrice = menuItem.price * item.quantity;
            subtotal += totalPrice;
            return {
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                unitPrice: menuItem.price,
                totalPrice,
                customizations: item.customizations || null,
                specialInstructions: item.specialInstructions || null,
            };
        });
        // Calculate fees
        const tax = subtotal * TAX_RATE;
        const serviceFee = subtotal * SERVICE_FEE_PERCENT;
        const deliveryFee = fulfillmentType === 'DELIVERY' ? DELIVERY_FEE_BASE : 0;
        // Calculate points discount
        let pointsDiscount = 0;
        let actualPointsUsed = 0;
        if (pointsToUse > 0) {
            // Get user's points balance at this restaurant
            const wallet = await database_service_1.prisma.pointsWallet.findUnique({
                where: {
                    userId_restaurantId: {
                        userId,
                        restaurantId,
                    },
                },
            });
            const availablePoints = wallet?.balance ?? 0;
            const maxPointsAllowed = Math.floor((subtotal * MAX_POINTS_DISCOUNT_PERCENT * 100) / POINTS_VALUE_CENTS);
            actualPointsUsed = Math.min(pointsToUse, availablePoints, maxPointsAllowed);
            pointsDiscount = (actualPointsUsed * POINTS_VALUE_CENTS) / 100;
        }
        // Calculate total
        const total = Math.max(subtotal + tax + serviceFee + deliveryFee + tip - pointsDiscount, 0);
        const totalCents = Math.round(total * 100);
        // Create Stripe customer and payment intent
        const stripeCustomer = await (0, stripe_service_1.getOrCreateCustomer)(userId, user.email, user.name);
        const paymentIntent = await (0, stripe_service_1.createPaymentIntent)({
            amount: totalCents,
            customerId: stripeCustomer.id,
            metadata: {
                userId,
                restaurantId,
                orderType: 'food_order',
            },
        });
        // Create ephemeral key for mobile SDK
        const ephemeralKey = await (0, stripe_service_1.createEphemeralKey)(stripeCustomer.id);
        // Calculate points to earn (based on subtotal, not total with discounts)
        const pointsEarned = restaurant.loyaltyProgramEnabled
            ? Math.floor(subtotal * (restaurant.pointsPerDollar || POINTS_PER_DOLLAR))
            : 0;
        // Create order in database
        const order = await database_service_1.prisma.order.create({
            data: {
                userId,
                restaurantId,
                status: 'PENDING',
                fulfillmentType,
                subtotal,
                tax,
                deliveryFee,
                serviceFee,
                tip,
                total,
                pointsUsed: actualPointsUsed,
                pointsEarned,
                deliveryAddress: deliveryAddress ?? undefined,
                specialInstructions,
                stripePaymentIntentId: paymentIntent.paymentIntentId,
                items: {
                    create: orderItems.map((item) => ({
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        totalPrice: item.totalPrice,
                        customizations: item.customizations
                            ? item.customizations
                            : undefined,
                        specialInstructions: item.specialInstructions,
                        menuItem: { connect: { id: item.menuItemId } },
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        menuItem: {
                            select: {
                                id: true,
                                name: true,
                                imageUrl: true,
                            },
                        },
                    },
                },
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        address: true,
                        phone: true,
                    },
                },
            },
        });
        res.status(201).json({
            success: true,
            data: {
                order,
                payment: {
                    clientSecret: paymentIntent.clientSecret,
                    ephemeralKey: ephemeralKey.secret,
                    customerId: stripeCustomer.id,
                    paymentIntentId: paymentIntent.paymentIntentId,
                },
                breakdown: {
                    subtotal,
                    tax,
                    serviceFee,
                    deliveryFee,
                    tip,
                    pointsDiscount,
                    total,
                    pointsUsed: actualPointsUsed,
                    pointsToEarn: pointsEarned,
                },
            },
        });
    }
    catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to create order', code: 'ORDER_CREATE_FAILED' },
        });
    }
}
/**
 * POST /api/v1/orders/:id/confirm
 * Confirm order after successful payment
 */
async function confirmOrder(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            });
            return;
        }
        const order = await database_service_1.prisma.order.findFirst({
            where: { id, userId },
        });
        if (!order) {
            res.status(404).json({
                success: false,
                error: { message: 'Order not found', code: 'ORDER_NOT_FOUND' },
            });
            return;
        }
        if (order.status !== 'PENDING') {
            res.status(400).json({
                success: false,
                error: { message: 'Order already confirmed or cancelled', code: 'INVALID_ORDER_STATUS' },
            });
            return;
        }
        // Update order status
        const updatedOrder = await database_service_1.prisma.order.update({
            where: { id },
            data: {
                status: 'CONFIRMED',
                estimatedReadyTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes default
            },
            include: {
                items: {
                    include: {
                        menuItem: {
                            select: { id: true, name: true, imageUrl: true },
                        },
                    },
                },
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        address: true,
                        city: true,
                        state: true,
                        zipCode: true,
                        phone: true,
                        email: true,
                    },
                },
                user: {
                    select: { id: true, name: true, email: true, phone: true },
                },
            },
        });
        // Deduct points used
        if (order.pointsUsed > 0) {
            await database_service_1.prisma.pointsWallet.update({
                where: {
                    userId_restaurantId: {
                        userId,
                        restaurantId: order.restaurantId,
                    },
                },
                data: {
                    balance: { decrement: order.pointsUsed },
                },
            });
            // Record points transaction
            await database_service_1.prisma.pointsTransaction.create({
                data: {
                    userId,
                    restaurantId: order.restaurantId,
                    amount: -order.pointsUsed,
                    type: 'REDEEM',
                    source: 'order',
                    orderId: order.id,
                },
            });
        }
        try {
            await (0, orderFallback_service_1.sendOrderFallbackNotifications)({
                order: updatedOrder,
                items: updatedOrder.items,
                restaurant: updatedOrder.restaurant,
                user: updatedOrder.user,
            });
        }
        catch (notificationError) {
            console.error('Order fallback notification failed:', notificationError);
        }
        res.status(200).json({
            success: true,
            data: { order: updatedOrder },
        });
    }
    catch (error) {
        console.error('Confirm order error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to confirm order', code: 'ORDER_CONFIRM_FAILED' },
        });
    }
}
/**
 * GET /api/v1/orders/:id
 * Get order details
 */
async function getOrder(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            });
            return;
        }
        const order = await database_service_1.prisma.order.findFirst({
            where: { id, userId },
            include: {
                items: {
                    include: {
                        menuItem: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                imageUrl: true,
                                category: true,
                            },
                        },
                    },
                },
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        address: true,
                        city: true,
                        state: true,
                        phone: true,
                        latitude: true,
                        longitude: true,
                    },
                },
            },
        });
        if (!order) {
            res.status(404).json({
                success: false,
                error: { message: 'Order not found', code: 'ORDER_NOT_FOUND' },
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: { order },
        });
    }
    catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch order', code: 'ORDER_FETCH_FAILED' },
        });
    }
}
/**
 * GET /api/v1/orders/history
 * Get user's order history
 */
async function getOrderHistory(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            });
            return;
        }
        const { status, restaurantId, limit = '20', offset = '0' } = req.query;
        const where = { userId };
        if (status && typeof status === 'string') {
            where.status = status;
        }
        if (restaurantId && typeof restaurantId === 'string') {
            where.restaurantId = restaurantId;
        }
        const orders = await database_service_1.prisma.order.findMany({
            where,
            include: {
                items: {
                    include: {
                        menuItem: {
                            select: { id: true, name: true, imageUrl: true },
                        },
                    },
                },
                restaurant: {
                    select: { id: true, name: true, imageUrl: true },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: parseInt(limit),
            skip: parseInt(offset),
        });
        const total = await database_service_1.prisma.order.count({ where });
        res.status(200).json({
            success: true,
            data: {
                orders,
                pagination: {
                    total,
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                },
            },
        });
    }
    catch (error) {
        console.error('Get order history error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch order history', code: 'ORDER_HISTORY_FAILED' },
        });
    }
}
/**
 * PUT /api/v1/orders/:id/status
 * Update order status (restaurant/admin only)
 */
async function updateOrderStatus(req, res) {
    try {
        const userRole = req.user?.role;
        const { id } = req.params;
        // Only restaurant owners and admins can update order status
        if (userRole !== 'RESTAURANT_OWNER' && userRole !== 'ADMIN') {
            res.status(403).json({
                success: false,
                error: { message: 'Permission denied', code: 'FORBIDDEN' },
            });
            return;
        }
        const validation = updateStatusSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: { message: 'Invalid request body', details: validation.error.issues },
            });
            return;
        }
        const { status, estimatedReadyTime } = validation.data;
        const order = await database_service_1.prisma.order.findUnique({ where: { id } });
        if (!order) {
            res.status(404).json({
                success: false,
                error: { message: 'Order not found', code: 'ORDER_NOT_FOUND' },
            });
            return;
        }
        const updateData = { status };
        if (estimatedReadyTime) {
            updateData.estimatedReadyTime = new Date(estimatedReadyTime);
        }
        // If completed, set completedAt and credit points
        if (status === 'COMPLETED' && order.status !== 'COMPLETED') {
            updateData.completedAt = new Date();
            // Credit points earned
            if (order.pointsEarned > 0) {
                await database_service_1.prisma.pointsWallet.upsert({
                    where: {
                        userId_restaurantId: {
                            userId: order.userId,
                            restaurantId: order.restaurantId,
                        },
                    },
                    update: {
                        balance: { increment: order.pointsEarned },
                    },
                    create: {
                        userId: order.userId,
                        restaurantId: order.restaurantId,
                        balance: order.pointsEarned,
                        isConnected: true,
                    },
                });
                // Record points transaction
                await database_service_1.prisma.pointsTransaction.create({
                    data: {
                        userId: order.userId,
                        restaurantId: order.restaurantId,
                        amount: order.pointsEarned,
                        type: 'EARN',
                        source: 'order',
                        orderId: order.id,
                    },
                });
            }
            (0, challengeJob_service_1.enqueueChallengeTracking)(order.userId, order.restaurantId, { amount: order.total });
        }
        const updatedOrder = await database_service_1.prisma.order.update({
            where: { id },
            data: updateData,
            include: {
                items: {
                    include: {
                        menuItem: { select: { id: true, name: true, imageUrl: true } },
                    },
                },
                restaurant: { select: { id: true, name: true, imageUrl: true } },
            },
        });
        // Emit WebSocket event for real-time tracking
        (0, websocket_service_1.emitOrderStatusUpdate)(order.id, status, {
            estimatedReadyTime: updatedOrder.estimatedReadyTime,
            updatedAt: updatedOrder.updatedAt,
        });
        // Send push notification for status update
        try {
            await (0, notification_service_1.sendOrderStatusNotification)(order.userId, order.id, status, undefined // Use default message for status
            );
        }
        catch (notificationError) {
            console.error('Failed to send order status notification:', notificationError);
            // Don't fail the request if notification fails
        }
        res.status(200).json({
            success: true,
            data: { order: updatedOrder },
        });
    }
    catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to update order status', code: 'STATUS_UPDATE_FAILED' },
        });
    }
}
/**
 * POST /api/v1/orders/:id/cancel
 * Cancel an order
 */
async function cancelOrder(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            });
            return;
        }
        const order = await database_service_1.prisma.order.findFirst({
            where: { id, userId },
        });
        if (!order) {
            res.status(404).json({
                success: false,
                error: { message: 'Order not found', code: 'ORDER_NOT_FOUND' },
            });
            return;
        }
        // Can only cancel pending or confirmed orders
        if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
            res.status(400).json({
                success: false,
                error: { message: 'Order cannot be cancelled at this stage', code: 'CANCEL_NOT_ALLOWED' },
            });
            return;
        }
        // Cancel Stripe payment intent if exists
        if (order.stripePaymentIntentId) {
            try {
                await (0, stripe_service_1.cancelPaymentIntent)(order.stripePaymentIntentId);
            }
            catch (stripeError) {
                console.error('Failed to cancel Stripe payment:', stripeError);
                // Continue with order cancellation even if Stripe fails
            }
        }
        // Refund points if they were used
        if (order.pointsUsed > 0) {
            await database_service_1.prisma.pointsWallet.update({
                where: {
                    userId_restaurantId: {
                        userId,
                        restaurantId: order.restaurantId,
                    },
                },
                data: {
                    balance: { increment: order.pointsUsed },
                },
            });
            await database_service_1.prisma.pointsTransaction.create({
                data: {
                    userId,
                    restaurantId: order.restaurantId,
                    amount: order.pointsUsed,
                    type: 'ADJUSTMENT',
                    source: 'order_cancelled',
                    orderId: order.id,
                },
            });
        }
        const updatedOrder = await database_service_1.prisma.order.update({
            where: { id },
            data: { status: 'CANCELLED' },
            include: {
                restaurant: { select: { id: true, name: true } },
            },
        });
        res.status(200).json({
            success: true,
            data: { order: updatedOrder },
        });
    }
    catch (error) {
        console.error('Cancel order error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to cancel order', code: 'ORDER_CANCEL_FAILED' },
        });
    }
}
/**
 * GET /api/v1/orders/:id/track
 * Get real-time order tracking info
 */
async function trackOrder(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            });
            return;
        }
        const order = await database_service_1.prisma.order.findFirst({
            where: { id, userId },
            select: {
                id: true,
                status: true,
                fulfillmentType: true,
                estimatedReadyTime: true,
                createdAt: true,
                completedAt: true,
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        phone: true,
                        address: true,
                        latitude: true,
                        longitude: true,
                    },
                },
            },
        });
        if (!order) {
            res.status(404).json({
                success: false,
                error: { message: 'Order not found', code: 'ORDER_NOT_FOUND' },
            });
            return;
        }
        // Status timeline
        const statusTimeline = [
            { status: 'PENDING', label: 'Order Placed', completed: true, time: order.createdAt },
            {
                status: 'CONFIRMED',
                label: 'Confirmed',
                completed: ['CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'COMPLETED'].includes(order.status),
            },
            {
                status: 'PREPARING',
                label: 'Preparing',
                completed: ['PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'COMPLETED'].includes(order.status),
            },
            {
                status: 'READY',
                label: order.fulfillmentType === 'DELIVERY' ? 'Ready for Pickup' : 'Ready',
                completed: ['READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'COMPLETED'].includes(order.status),
            },
        ];
        if (order.fulfillmentType === 'DELIVERY') {
            statusTimeline.push({
                status: 'OUT_FOR_DELIVERY',
                label: 'Out for Delivery',
                completed: ['OUT_FOR_DELIVERY', 'DELIVERED', 'COMPLETED'].includes(order.status),
            });
            statusTimeline.push({
                status: 'DELIVERED',
                label: 'Delivered',
                completed: ['DELIVERED', 'COMPLETED'].includes(order.status),
            });
        }
        statusTimeline.push({
            status: 'COMPLETED',
            label: 'Completed',
            completed: order.status === 'COMPLETED',
            time: order.completedAt ?? undefined,
        });
        res.status(200).json({
            success: true,
            data: {
                orderId: order.id,
                currentStatus: order.status,
                fulfillmentType: order.fulfillmentType,
                estimatedReadyTime: order.estimatedReadyTime,
                restaurant: order.restaurant,
                statusTimeline,
            },
        });
    }
    catch (error) {
        console.error('Track order error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to track order', code: 'ORDER_TRACK_FAILED' },
        });
    }
}
/**
 * GET /api/v1/restaurants/:restaurantId/menu
 * Get restaurant menu grouped by category
 */
async function getRestaurantMenu(req, res) {
    try {
        const { restaurantId } = req.params;
        const menuItems = await database_service_1.prisma.menuItem.findMany({
            where: {
                restaurantId,
                isAvailable: true,
            },
            orderBy: [{ category: 'asc' }, { name: 'asc' }],
        });
        // Group by category
        const menuByCategory = menuItems.reduce((acc, item) => {
            if (!acc[item.category]) {
                acc[item.category] = [];
            }
            acc[item.category].push(item);
            return acc;
        }, {});
        // Convert to array format
        const categories = Object.entries(menuByCategory).map(([name, items]) => ({
            name,
            items,
        }));
        res.status(200).json({
            success: true,
            data: {
                restaurantId,
                categories,
                totalItems: menuItems.length,
            },
        });
    }
    catch (error) {
        console.error('Get menu error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch menu', code: 'MENU_FETCH_FAILED' },
        });
    }
}
//# sourceMappingURL=order.controller.js.map