export declare const UserRole: {
    readonly USER: "USER";
    readonly ADMIN: "ADMIN";
    readonly RESTAURANT_OWNER: "RESTAURANT_OWNER";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const PointsTransactionType: {
    readonly EARN: "EARN";
    readonly REDEEM: "REDEEM";
    readonly EXPIRE: "EXPIRE";
    readonly GIFT_SENT: "GIFT_SENT";
    readonly GIFT_RECEIVED: "GIFT_RECEIVED";
    readonly BONUS: "BONUS";
    readonly ADJUSTMENT: "ADJUSTMENT";
};
export type PointsTransactionType = (typeof PointsTransactionType)[keyof typeof PointsTransactionType];
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly CONFIRMED: "CONFIRMED";
    readonly PREPARING: "PREPARING";
    readonly READY: "READY";
    readonly OUT_FOR_DELIVERY: "OUT_FOR_DELIVERY";
    readonly DELIVERED: "DELIVERED";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const FulfillmentType: {
    readonly PICKUP: "PICKUP";
    readonly DELIVERY: "DELIVERY";
    readonly DINE_IN: "DINE_IN";
};
export type FulfillmentType = (typeof FulfillmentType)[keyof typeof FulfillmentType];
export declare const PostPrivacy: {
    readonly PUBLIC: "PUBLIC";
    readonly FRIENDS_ONLY: "FRIENDS_ONLY";
    readonly PRIVATE: "PRIVATE";
};
export type PostPrivacy = (typeof PostPrivacy)[keyof typeof PostPrivacy];
export declare const InteractionType: {
    readonly SAVED: "SAVED";
    readonly ORDERED: "ORDERED";
    readonly RATED: "RATED";
    readonly NOT_INTERESTED: "NOT_INTERESTED";
};
export type InteractionType = (typeof InteractionType)[keyof typeof InteractionType];
export declare const ChallengeType: {
    readonly UNIQUE_RESTAURANTS: "UNIQUE_RESTAURANTS";
    readonly DIVERSE_DISHES: "DIVERSE_DISHES";
    readonly CUISINE_EXPLORATION: "CUISINE_EXPLORATION";
    readonly SPONSORED: "SPONSORED";
    readonly SOCIAL_ENGAGEMENT: "SOCIAL_ENGAGEMENT";
    readonly STREAK: "STREAK";
};
export type ChallengeType = (typeof ChallengeType)[keyof typeof ChallengeType];
export declare const EventType: {
    readonly HAPPY_HOUR: "HAPPY_HOUR";
    readonly POP_UP: "POP_UP";
    readonly COMPETITION: "COMPETITION";
    readonly TASTING: "TASTING";
    readonly LIVE_MUSIC: "LIVE_MUSIC";
    readonly SPECIAL_MENU: "SPECIAL_MENU";
    readonly HOLIDAY: "HOLIDAY";
    readonly OTHER: "OTHER";
};
export type EventType = (typeof EventType)[keyof typeof EventType];
export declare const DonationType: {
    readonly CASH: "CASH";
    readonly POINTS: "POINTS";
    readonly MIXED: "MIXED";
};
export type DonationType = (typeof DonationType)[keyof typeof DonationType];
export declare const ReceiptStatus: {
    readonly PENDING: "PENDING";
    readonly PROCESSING: "PROCESSING";
    readonly COMPLETED: "COMPLETED";
    readonly FAILED: "FAILED";
    readonly DUPLICATE: "DUPLICATE";
};
export type ReceiptStatus = (typeof ReceiptStatus)[keyof typeof ReceiptStatus];
//# sourceMappingURL=enums.d.ts.map