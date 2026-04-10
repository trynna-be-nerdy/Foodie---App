import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
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
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
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
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.user`: Exposes CRUD operations for the **User** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Users
  * const users = await prisma.user.findMany()
  * ```
  */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RefreshTokens
      * const refreshTokens = await prisma.refreshToken.findMany()
      * ```
      */
    get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.restaurant`: Exposes CRUD operations for the **Restaurant** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Restaurants
      * const restaurants = await prisma.restaurant.findMany()
      * ```
      */
    get restaurant(): Prisma.RestaurantDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.menuItem`: Exposes CRUD operations for the **MenuItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MenuItems
      * const menuItems = await prisma.menuItem.findMany()
      * ```
      */
    get menuItem(): Prisma.MenuItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.pointsWallet`: Exposes CRUD operations for the **PointsWallet** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PointsWallets
      * const pointsWallets = await prisma.pointsWallet.findMany()
      * ```
      */
    get pointsWallet(): Prisma.PointsWalletDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.pointsTransaction`: Exposes CRUD operations for the **PointsTransaction** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more PointsTransactions
      * const pointsTransactions = await prisma.pointsTransaction.findMany()
      * ```
      */
    get pointsTransaction(): Prisma.PointsTransactionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.foodiePoints`: Exposes CRUD operations for the **FoodiePoints** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more FoodiePoints
      * const foodiePoints = await prisma.foodiePoints.findMany()
      * ```
      */
    get foodiePoints(): Prisma.FoodiePointsDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.order`: Exposes CRUD operations for the **Order** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Orders
      * const orders = await prisma.order.findMany()
      * ```
      */
    get order(): Prisma.OrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OrderItems
      * const orderItems = await prisma.orderItem.findMany()
      * ```
      */
    get orderItem(): Prisma.OrderItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.socialPost`: Exposes CRUD operations for the **SocialPost** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SocialPosts
      * const socialPosts = await prisma.socialPost.findMany()
      * ```
      */
    get socialPost(): Prisma.SocialPostDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Comments
      * const comments = await prisma.comment.findMany()
      * ```
      */
    get comment(): Prisma.CommentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.like`: Exposes CRUD operations for the **Like** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Likes
      * const likes = await prisma.like.findMany()
      * ```
      */
    get like(): Prisma.LikeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.follow`: Exposes CRUD operations for the **Follow** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Follows
      * const follows = await prisma.follow.findMany()
      * ```
      */
    get follow(): Prisma.FollowDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.userInteraction`: Exposes CRUD operations for the **UserInteraction** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more UserInteractions
      * const userInteractions = await prisma.userInteraction.findMany()
      * ```
      */
    get userInteraction(): Prisma.UserInteractionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.challenge`: Exposes CRUD operations for the **Challenge** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Challenges
      * const challenges = await prisma.challenge.findMany()
      * ```
      */
    get challenge(): Prisma.ChallengeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.challengeParticipant`: Exposes CRUD operations for the **ChallengeParticipant** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ChallengeParticipants
      * const challengeParticipants = await prisma.challengeParticipant.findMany()
      * ```
      */
    get challengeParticipant(): Prisma.ChallengeParticipantDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.achievement`: Exposes CRUD operations for the **Achievement** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Achievements
      * const achievements = await prisma.achievement.findMany()
      * ```
      */
    get achievement(): Prisma.AchievementDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.event`: Exposes CRUD operations for the **Event** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Events
      * const events = await prisma.event.findMany()
      * ```
      */
    get event(): Prisma.EventDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.eventRegistration`: Exposes CRUD operations for the **EventRegistration** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more EventRegistrations
      * const eventRegistrations = await prisma.eventRegistration.findMany()
      * ```
      */
    get eventRegistration(): Prisma.EventRegistrationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.charity`: Exposes CRUD operations for the **Charity** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Charities
      * const charities = await prisma.charity.findMany()
      * ```
      */
    get charity(): Prisma.CharityDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.donation`: Exposes CRUD operations for the **Donation** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Donations
      * const donations = await prisma.donation.findMany()
      * ```
      */
    get donation(): Prisma.DonationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.receipt`: Exposes CRUD operations for the **Receipt** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Receipts
      * const receipts = await prisma.receipt.findMany()
      * ```
      */
    get receipt(): Prisma.ReceiptDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.qRScan`: Exposes CRUD operations for the **QRScan** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more QRScans
      * const qRScans = await prisma.qRScan.findMany()
      * ```
      */
    get qRScan(): Prisma.QRScanDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notInterested`: Exposes CRUD operations for the **NotInterested** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more NotInteresteds
      * const notInteresteds = await prisma.notInterested.findMany()
      * ```
      */
    get notInterested(): Prisma.NotInterestedDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.savedRestaurant`: Exposes CRUD operations for the **SavedRestaurant** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SavedRestaurants
      * const savedRestaurants = await prisma.savedRestaurant.findMany()
      * ```
      */
    get savedRestaurant(): Prisma.SavedRestaurantDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map