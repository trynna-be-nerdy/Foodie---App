import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model RefreshToken
 *
 */
export type RefreshToken = Prisma.RefreshTokenModel;
/**
 * Model Restaurant
 *
 */
export type Restaurant = Prisma.RestaurantModel;
/**
 * Model MenuItem
 *
 */
export type MenuItem = Prisma.MenuItemModel;
/**
 * Model PointsWallet
 *
 */
export type PointsWallet = Prisma.PointsWalletModel;
/**
 * Model PointsTransaction
 *
 */
export type PointsTransaction = Prisma.PointsTransactionModel;
/**
 * Model FoodiePoints
 *
 */
export type FoodiePoints = Prisma.FoodiePointsModel;
/**
 * Model Order
 *
 */
export type Order = Prisma.OrderModel;
/**
 * Model OrderItem
 *
 */
export type OrderItem = Prisma.OrderItemModel;
/**
 * Model SocialPost
 *
 */
export type SocialPost = Prisma.SocialPostModel;
/**
 * Model Comment
 *
 */
export type Comment = Prisma.CommentModel;
/**
 * Model Like
 *
 */
export type Like = Prisma.LikeModel;
/**
 * Model Follow
 *
 */
export type Follow = Prisma.FollowModel;
/**
 * Model UserInteraction
 *
 */
export type UserInteraction = Prisma.UserInteractionModel;
/**
 * Model Challenge
 *
 */
export type Challenge = Prisma.ChallengeModel;
/**
 * Model ChallengeParticipant
 *
 */
export type ChallengeParticipant = Prisma.ChallengeParticipantModel;
/**
 * Model Achievement
 *
 */
export type Achievement = Prisma.AchievementModel;
/**
 * Model Event
 *
 */
export type Event = Prisma.EventModel;
/**
 * Model EventRegistration
 *
 */
export type EventRegistration = Prisma.EventRegistrationModel;
/**
 * Model Charity
 *
 */
export type Charity = Prisma.CharityModel;
/**
 * Model Donation
 *
 */
export type Donation = Prisma.DonationModel;
/**
 * Model Receipt
 *
 */
export type Receipt = Prisma.ReceiptModel;
/**
 * Model QRScan
 *
 */
export type QRScan = Prisma.QRScanModel;
/**
 * Model NotInterested
 *
 */
export type NotInterested = Prisma.NotInterestedModel;
/**
 * Model SavedRestaurant
 *
 */
export type SavedRestaurant = Prisma.SavedRestaurantModel;
//# sourceMappingURL=client.d.ts.map