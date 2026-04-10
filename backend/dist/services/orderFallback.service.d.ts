interface OrderItemInfo {
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    menuItem: {
        name: string;
    };
    customizations?: unknown;
    specialInstructions?: string | null;
}
interface OrderInfo {
    id: string;
    fulfillmentType: string;
    subtotal: number;
    tax: number;
    deliveryFee: number;
    serviceFee: number;
    tip: number;
    total: number;
    pointsUsed: number;
    deliveryAddress?: unknown;
    specialInstructions?: string | null;
    createdAt: Date;
}
interface RestaurantInfo {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone?: string | null;
    email?: string | null;
}
interface UserInfo {
    name: string;
    email: string;
    phone?: string | null;
}
interface OrderFallbackPayload {
    order: OrderInfo;
    items: OrderItemInfo[];
    restaurant: RestaurantInfo;
    user: UserInfo;
}
export declare function sendOrderFallbackNotifications(payload: OrderFallbackPayload): Promise<void>;
export {};
//# sourceMappingURL=orderFallback.service.d.ts.map