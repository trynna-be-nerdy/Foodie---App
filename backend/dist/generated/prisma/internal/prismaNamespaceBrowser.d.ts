import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly RefreshToken: "RefreshToken";
    readonly Restaurant: "Restaurant";
    readonly MenuItem: "MenuItem";
    readonly PointsWallet: "PointsWallet";
    readonly PointsTransaction: "PointsTransaction";
    readonly FoodiePoints: "FoodiePoints";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
    readonly SocialPost: "SocialPost";
    readonly Comment: "Comment";
    readonly Like: "Like";
    readonly Follow: "Follow";
    readonly UserInteraction: "UserInteraction";
    readonly Challenge: "Challenge";
    readonly ChallengeParticipant: "ChallengeParticipant";
    readonly Achievement: "Achievement";
    readonly Event: "Event";
    readonly EventRegistration: "EventRegistration";
    readonly Charity: "Charity";
    readonly Donation: "Donation";
    readonly Receipt: "Receipt";
    readonly QRScan: "QRScan";
    readonly NotInterested: "NotInterested";
    readonly SavedRestaurant: "SavedRestaurant";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly name: "name";
    readonly phone: "phone";
    readonly profilePhoto: "profilePhoto";
    readonly role: "role";
    readonly isVerified: "isVerified";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly id: "id";
    readonly token: "token";
    readonly userId: "userId";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const RestaurantScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly address: "address";
    readonly city: "city";
    readonly state: "state";
    readonly zipCode: "zipCode";
    readonly country: "country";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly phone: "phone";
    readonly email: "email";
    readonly website: "website";
    readonly imageUrl: "imageUrl";
    readonly cuisineTypes: "cuisineTypes";
    readonly priceRange: "priceRange";
    readonly locationCount: "locationCount";
    readonly rating: "rating";
    readonly reviewCount: "reviewCount";
    readonly isVerified: "isVerified";
    readonly isActive: "isActive";
    readonly loyaltyProgramEnabled: "loyaltyProgramEnabled";
    readonly pointsPerDollar: "pointsPerDollar";
    readonly loyaltyApiProvider: "loyaltyApiProvider";
    readonly loyaltyOauthConfig: "loyaltyOauthConfig";
    readonly qrSecret: "qrSecret";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RestaurantScalarFieldEnum = (typeof RestaurantScalarFieldEnum)[keyof typeof RestaurantScalarFieldEnum];
export declare const MenuItemScalarFieldEnum: {
    readonly id: "id";
    readonly restaurantId: "restaurantId";
    readonly name: "name";
    readonly description: "description";
    readonly price: "price";
    readonly category: "category";
    readonly imageUrl: "imageUrl";
    readonly dietaryTags: "dietaryTags";
    readonly isAvailable: "isAvailable";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type MenuItemScalarFieldEnum = (typeof MenuItemScalarFieldEnum)[keyof typeof MenuItemScalarFieldEnum];
export declare const PointsWalletScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly restaurantId: "restaurantId";
    readonly balance: "balance";
    readonly lastSyncedAt: "lastSyncedAt";
    readonly expirationDate: "expirationDate";
    readonly accountNumber: "accountNumber";
    readonly isConnected: "isConnected";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PointsWalletScalarFieldEnum = (typeof PointsWalletScalarFieldEnum)[keyof typeof PointsWalletScalarFieldEnum];
export declare const PointsTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly restaurantId: "restaurantId";
    readonly amount: "amount";
    readonly type: "type";
    readonly source: "source";
    readonly orderId: "orderId";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
};
export type PointsTransactionScalarFieldEnum = (typeof PointsTransactionScalarFieldEnum)[keyof typeof PointsTransactionScalarFieldEnum];
export declare const FoodiePointsScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly balance: "balance";
    readonly totalEarned: "totalEarned";
    readonly totalRedeemed: "totalRedeemed";
    readonly lastActivity: "lastActivity";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type FoodiePointsScalarFieldEnum = (typeof FoodiePointsScalarFieldEnum)[keyof typeof FoodiePointsScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly restaurantId: "restaurantId";
    readonly status: "status";
    readonly fulfillmentType: "fulfillmentType";
    readonly subtotal: "subtotal";
    readonly tax: "tax";
    readonly deliveryFee: "deliveryFee";
    readonly serviceFee: "serviceFee";
    readonly tip: "tip";
    readonly total: "total";
    readonly pointsUsed: "pointsUsed";
    readonly pointsEarned: "pointsEarned";
    readonly deliveryAddress: "deliveryAddress";
    readonly specialInstructions: "specialInstructions";
    readonly stripePaymentIntentId: "stripePaymentIntentId";
    readonly estimatedReadyTime: "estimatedReadyTime";
    readonly completedAt: "completedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly menuItemId: "menuItemId";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly totalPrice: "totalPrice";
    readonly customizations: "customizations";
    readonly specialInstructions: "specialInstructions";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const SocialPostScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly restaurantId: "restaurantId";
    readonly content: "content";
    readonly mediaUrls: "mediaUrls";
    readonly rating: "rating";
    readonly dishTags: "dishTags";
    readonly privacy: "privacy";
    readonly earnings: "earnings";
    readonly viewCount: "viewCount";
    readonly isSponsored: "isSponsored";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SocialPostScalarFieldEnum = (typeof SocialPostScalarFieldEnum)[keyof typeof SocialPostScalarFieldEnum];
export declare const CommentScalarFieldEnum: {
    readonly id: "id";
    readonly postId: "postId";
    readonly userId: "userId";
    readonly content: "content";
    readonly parentId: "parentId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum];
export declare const LikeScalarFieldEnum: {
    readonly id: "id";
    readonly postId: "postId";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
};
export type LikeScalarFieldEnum = (typeof LikeScalarFieldEnum)[keyof typeof LikeScalarFieldEnum];
export declare const FollowScalarFieldEnum: {
    readonly id: "id";
    readonly followerId: "followerId";
    readonly followingId: "followingId";
    readonly createdAt: "createdAt";
};
export type FollowScalarFieldEnum = (typeof FollowScalarFieldEnum)[keyof typeof FollowScalarFieldEnum];
export declare const UserInteractionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly restaurantId: "restaurantId";
    readonly interactionType: "interactionType";
    readonly weight: "weight";
    readonly createdAt: "createdAt";
};
export type UserInteractionScalarFieldEnum = (typeof UserInteractionScalarFieldEnum)[keyof typeof UserInteractionScalarFieldEnum];
export declare const ChallengeScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly type: "type";
    readonly requirements: "requirements";
    readonly rewardFoodiePoints: "rewardFoodiePoints";
    readonly rewardGiftCardValue: "rewardGiftCardValue";
    readonly sponsorRestaurantId: "sponsorRestaurantId";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ChallengeScalarFieldEnum = (typeof ChallengeScalarFieldEnum)[keyof typeof ChallengeScalarFieldEnum];
export declare const ChallengeParticipantScalarFieldEnum: {
    readonly id: "id";
    readonly challengeId: "challengeId";
    readonly userId: "userId";
    readonly progress: "progress";
    readonly isCompleted: "isCompleted";
    readonly completedAt: "completedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ChallengeParticipantScalarFieldEnum = (typeof ChallengeParticipantScalarFieldEnum)[keyof typeof ChallengeParticipantScalarFieldEnum];
export declare const AchievementScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly badgeType: "badgeType";
    readonly earnedAt: "earnedAt";
};
export type AchievementScalarFieldEnum = (typeof AchievementScalarFieldEnum)[keyof typeof AchievementScalarFieldEnum];
export declare const EventScalarFieldEnum: {
    readonly id: "id";
    readonly restaurantId: "restaurantId";
    readonly title: "title";
    readonly description: "description";
    readonly type: "type";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly maxAttendees: "maxAttendees";
    readonly pointsReward: "pointsReward";
    readonly imageUrl: "imageUrl";
    readonly prizeDetails: "prizeDetails";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum];
export declare const EventRegistrationScalarFieldEnum: {
    readonly id: "id";
    readonly eventId: "eventId";
    readonly userId: "userId";
    readonly qrCode: "qrCode";
    readonly isCheckedIn: "isCheckedIn";
    readonly checkedInAt: "checkedInAt";
    readonly createdAt: "createdAt";
};
export type EventRegistrationScalarFieldEnum = (typeof EventRegistrationScalarFieldEnum)[keyof typeof EventRegistrationScalarFieldEnum];
export declare const CharityScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly logoUrl: "logoUrl";
    readonly website: "website";
    readonly mission: "mission";
    readonly totalDonations: "totalDonations";
    readonly isVerified: "isVerified";
    readonly taxId: "taxId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CharityScalarFieldEnum = (typeof CharityScalarFieldEnum)[keyof typeof CharityScalarFieldEnum];
export declare const DonationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly charityId: "charityId";
    readonly amount: "amount";
    readonly pointsUsed: "pointsUsed";
    readonly donationType: "donationType";
    readonly mealsContributed: "mealsContributed";
    readonly taxReceiptUrl: "taxReceiptUrl";
    readonly stripePaymentId: "stripePaymentId";
    readonly createdAt: "createdAt";
};
export type DonationScalarFieldEnum = (typeof DonationScalarFieldEnum)[keyof typeof DonationScalarFieldEnum];
export declare const ReceiptScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly restaurantId: "restaurantId";
    readonly imageUrl: "imageUrl";
    readonly imageHash: "imageHash";
    readonly extractedData: "extractedData";
    readonly totalAmount: "totalAmount";
    readonly receiptDate: "receiptDate";
    readonly pointsAwarded: "pointsAwarded";
    readonly status: "status";
    readonly errorMessage: "errorMessage";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReceiptScalarFieldEnum = (typeof ReceiptScalarFieldEnum)[keyof typeof ReceiptScalarFieldEnum];
export declare const QRScanScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly restaurantId: "restaurantId";
    readonly transactionId: "transactionId";
    readonly amount: "amount";
    readonly pointsAwarded: "pointsAwarded";
    readonly scannedAt: "scannedAt";
};
export type QRScanScalarFieldEnum = (typeof QRScanScalarFieldEnum)[keyof typeof QRScanScalarFieldEnum];
export declare const NotInterestedScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly restaurantId: "restaurantId";
    readonly reason: "reason";
    readonly createdAt: "createdAt";
};
export type NotInterestedScalarFieldEnum = (typeof NotInterestedScalarFieldEnum)[keyof typeof NotInterestedScalarFieldEnum];
export declare const SavedRestaurantScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly restaurantId: "restaurantId";
    readonly createdAt: "createdAt";
};
export type SavedRestaurantScalarFieldEnum = (typeof SavedRestaurantScalarFieldEnum)[keyof typeof SavedRestaurantScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: "JsonNull";
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
    readonly AnyNull: "AnyNull";
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map