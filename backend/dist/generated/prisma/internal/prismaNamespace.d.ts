import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.2.0
 * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
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
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "refreshToken" | "restaurant" | "menuItem" | "pointsWallet" | "pointsTransaction" | "foodiePoints" | "order" | "orderItem" | "socialPost" | "comment" | "like" | "follow" | "userInteraction" | "challenge" | "challengeParticipant" | "achievement" | "event" | "eventRegistration" | "charity" | "donation" | "receipt" | "qRScan" | "notInterested" | "savedRestaurant";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        RefreshToken: {
            payload: Prisma.$RefreshTokenPayload<ExtArgs>;
            fields: Prisma.RefreshTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findFirst: {
                    args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                findMany: {
                    args: Prisma.RefreshTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                create: {
                    args: Prisma.RefreshTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                createMany: {
                    args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                delete: {
                    args: Prisma.RefreshTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                update: {
                    args: Prisma.RefreshTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[];
                };
                upsert: {
                    args: Prisma.RefreshTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RefreshTokenPayload>;
                };
                aggregate: {
                    args: Prisma.RefreshTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRefreshToken>;
                };
                groupBy: {
                    args: Prisma.RefreshTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RefreshTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RefreshTokenCountAggregateOutputType> | number;
                };
            };
        };
        Restaurant: {
            payload: Prisma.$RestaurantPayload<ExtArgs>;
            fields: Prisma.RestaurantFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.RestaurantFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.RestaurantFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantPayload>;
                };
                findFirst: {
                    args: Prisma.RestaurantFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.RestaurantFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantPayload>;
                };
                findMany: {
                    args: Prisma.RestaurantFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantPayload>[];
                };
                create: {
                    args: Prisma.RestaurantCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantPayload>;
                };
                createMany: {
                    args: Prisma.RestaurantCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.RestaurantCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantPayload>[];
                };
                delete: {
                    args: Prisma.RestaurantDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantPayload>;
                };
                update: {
                    args: Prisma.RestaurantUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantPayload>;
                };
                deleteMany: {
                    args: Prisma.RestaurantDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.RestaurantUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.RestaurantUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantPayload>[];
                };
                upsert: {
                    args: Prisma.RestaurantUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$RestaurantPayload>;
                };
                aggregate: {
                    args: Prisma.RestaurantAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateRestaurant>;
                };
                groupBy: {
                    args: Prisma.RestaurantGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RestaurantGroupByOutputType>[];
                };
                count: {
                    args: Prisma.RestaurantCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.RestaurantCountAggregateOutputType> | number;
                };
            };
        };
        MenuItem: {
            payload: Prisma.$MenuItemPayload<ExtArgs>;
            fields: Prisma.MenuItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.MenuItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.MenuItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>;
                };
                findFirst: {
                    args: Prisma.MenuItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.MenuItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>;
                };
                findMany: {
                    args: Prisma.MenuItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>[];
                };
                create: {
                    args: Prisma.MenuItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>;
                };
                createMany: {
                    args: Prisma.MenuItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.MenuItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>[];
                };
                delete: {
                    args: Prisma.MenuItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>;
                };
                update: {
                    args: Prisma.MenuItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>;
                };
                deleteMany: {
                    args: Prisma.MenuItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.MenuItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.MenuItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>[];
                };
                upsert: {
                    args: Prisma.MenuItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$MenuItemPayload>;
                };
                aggregate: {
                    args: Prisma.MenuItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateMenuItem>;
                };
                groupBy: {
                    args: Prisma.MenuItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MenuItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.MenuItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.MenuItemCountAggregateOutputType> | number;
                };
            };
        };
        PointsWallet: {
            payload: Prisma.$PointsWalletPayload<ExtArgs>;
            fields: Prisma.PointsWalletFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PointsWalletFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsWalletPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PointsWalletFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsWalletPayload>;
                };
                findFirst: {
                    args: Prisma.PointsWalletFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsWalletPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PointsWalletFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsWalletPayload>;
                };
                findMany: {
                    args: Prisma.PointsWalletFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsWalletPayload>[];
                };
                create: {
                    args: Prisma.PointsWalletCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsWalletPayload>;
                };
                createMany: {
                    args: Prisma.PointsWalletCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PointsWalletCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsWalletPayload>[];
                };
                delete: {
                    args: Prisma.PointsWalletDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsWalletPayload>;
                };
                update: {
                    args: Prisma.PointsWalletUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsWalletPayload>;
                };
                deleteMany: {
                    args: Prisma.PointsWalletDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PointsWalletUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PointsWalletUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsWalletPayload>[];
                };
                upsert: {
                    args: Prisma.PointsWalletUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsWalletPayload>;
                };
                aggregate: {
                    args: Prisma.PointsWalletAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePointsWallet>;
                };
                groupBy: {
                    args: Prisma.PointsWalletGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PointsWalletGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PointsWalletCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PointsWalletCountAggregateOutputType> | number;
                };
            };
        };
        PointsTransaction: {
            payload: Prisma.$PointsTransactionPayload<ExtArgs>;
            fields: Prisma.PointsTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PointsTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PointsTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.PointsTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PointsTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsTransactionPayload>;
                };
                findMany: {
                    args: Prisma.PointsTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsTransactionPayload>[];
                };
                create: {
                    args: Prisma.PointsTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsTransactionPayload>;
                };
                createMany: {
                    args: Prisma.PointsTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PointsTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsTransactionPayload>[];
                };
                delete: {
                    args: Prisma.PointsTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsTransactionPayload>;
                };
                update: {
                    args: Prisma.PointsTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.PointsTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PointsTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PointsTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.PointsTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PointsTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.PointsTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePointsTransaction>;
                };
                groupBy: {
                    args: Prisma.PointsTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PointsTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PointsTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PointsTransactionCountAggregateOutputType> | number;
                };
            };
        };
        FoodiePoints: {
            payload: Prisma.$FoodiePointsPayload<ExtArgs>;
            fields: Prisma.FoodiePointsFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FoodiePointsFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodiePointsPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FoodiePointsFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodiePointsPayload>;
                };
                findFirst: {
                    args: Prisma.FoodiePointsFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodiePointsPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FoodiePointsFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodiePointsPayload>;
                };
                findMany: {
                    args: Prisma.FoodiePointsFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodiePointsPayload>[];
                };
                create: {
                    args: Prisma.FoodiePointsCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodiePointsPayload>;
                };
                createMany: {
                    args: Prisma.FoodiePointsCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FoodiePointsCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodiePointsPayload>[];
                };
                delete: {
                    args: Prisma.FoodiePointsDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodiePointsPayload>;
                };
                update: {
                    args: Prisma.FoodiePointsUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodiePointsPayload>;
                };
                deleteMany: {
                    args: Prisma.FoodiePointsDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FoodiePointsUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FoodiePointsUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodiePointsPayload>[];
                };
                upsert: {
                    args: Prisma.FoodiePointsUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FoodiePointsPayload>;
                };
                aggregate: {
                    args: Prisma.FoodiePointsAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFoodiePoints>;
                };
                groupBy: {
                    args: Prisma.FoodiePointsGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FoodiePointsGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FoodiePointsCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FoodiePointsCountAggregateOutputType> | number;
                };
            };
        };
        Order: {
            payload: Prisma.$OrderPayload<ExtArgs>;
            fields: Prisma.OrderFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                findFirst: {
                    args: Prisma.OrderFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                findMany: {
                    args: Prisma.OrderFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                create: {
                    args: Prisma.OrderCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                createMany: {
                    args: Prisma.OrderCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                delete: {
                    args: Prisma.OrderDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                update: {
                    args: Prisma.OrderUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                deleteMany: {
                    args: Prisma.OrderDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>[];
                };
                upsert: {
                    args: Prisma.OrderUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderPayload>;
                };
                aggregate: {
                    args: Prisma.OrderAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrder>;
                };
                groupBy: {
                    args: Prisma.OrderGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderCountAggregateOutputType> | number;
                };
            };
        };
        OrderItem: {
            payload: Prisma.$OrderItemPayload<ExtArgs>;
            fields: Prisma.OrderItemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OrderItemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                findFirst: {
                    args: Prisma.OrderItemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                findMany: {
                    args: Prisma.OrderItemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
                };
                create: {
                    args: Prisma.OrderItemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                createMany: {
                    args: Prisma.OrderItemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OrderItemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
                };
                delete: {
                    args: Prisma.OrderItemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                update: {
                    args: Prisma.OrderItemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                deleteMany: {
                    args: Prisma.OrderItemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OrderItemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OrderItemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>[];
                };
                upsert: {
                    args: Prisma.OrderItemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OrderItemPayload>;
                };
                aggregate: {
                    args: Prisma.OrderItemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOrderItem>;
                };
                groupBy: {
                    args: Prisma.OrderItemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderItemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OrderItemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OrderItemCountAggregateOutputType> | number;
                };
            };
        };
        SocialPost: {
            payload: Prisma.$SocialPostPayload<ExtArgs>;
            fields: Prisma.SocialPostFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SocialPostFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialPostPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SocialPostFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialPostPayload>;
                };
                findFirst: {
                    args: Prisma.SocialPostFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialPostPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SocialPostFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialPostPayload>;
                };
                findMany: {
                    args: Prisma.SocialPostFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialPostPayload>[];
                };
                create: {
                    args: Prisma.SocialPostCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialPostPayload>;
                };
                createMany: {
                    args: Prisma.SocialPostCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SocialPostCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialPostPayload>[];
                };
                delete: {
                    args: Prisma.SocialPostDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialPostPayload>;
                };
                update: {
                    args: Prisma.SocialPostUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialPostPayload>;
                };
                deleteMany: {
                    args: Prisma.SocialPostDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SocialPostUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SocialPostUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialPostPayload>[];
                };
                upsert: {
                    args: Prisma.SocialPostUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SocialPostPayload>;
                };
                aggregate: {
                    args: Prisma.SocialPostAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSocialPost>;
                };
                groupBy: {
                    args: Prisma.SocialPostGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SocialPostGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SocialPostCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SocialPostCountAggregateOutputType> | number;
                };
            };
        };
        Comment: {
            payload: Prisma.$CommentPayload<ExtArgs>;
            fields: Prisma.CommentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CommentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                findFirst: {
                    args: Prisma.CommentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                findMany: {
                    args: Prisma.CommentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>[];
                };
                create: {
                    args: Prisma.CommentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                createMany: {
                    args: Prisma.CommentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>[];
                };
                delete: {
                    args: Prisma.CommentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                update: {
                    args: Prisma.CommentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                deleteMany: {
                    args: Prisma.CommentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CommentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>[];
                };
                upsert: {
                    args: Prisma.CommentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CommentPayload>;
                };
                aggregate: {
                    args: Prisma.CommentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateComment>;
                };
                groupBy: {
                    args: Prisma.CommentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CommentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CommentCountAggregateOutputType> | number;
                };
            };
        };
        Like: {
            payload: Prisma.$LikePayload<ExtArgs>;
            fields: Prisma.LikeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.LikeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LikePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.LikeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LikePayload>;
                };
                findFirst: {
                    args: Prisma.LikeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LikePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.LikeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LikePayload>;
                };
                findMany: {
                    args: Prisma.LikeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LikePayload>[];
                };
                create: {
                    args: Prisma.LikeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LikePayload>;
                };
                createMany: {
                    args: Prisma.LikeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.LikeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LikePayload>[];
                };
                delete: {
                    args: Prisma.LikeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LikePayload>;
                };
                update: {
                    args: Prisma.LikeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LikePayload>;
                };
                deleteMany: {
                    args: Prisma.LikeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.LikeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.LikeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LikePayload>[];
                };
                upsert: {
                    args: Prisma.LikeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$LikePayload>;
                };
                aggregate: {
                    args: Prisma.LikeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateLike>;
                };
                groupBy: {
                    args: Prisma.LikeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LikeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.LikeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.LikeCountAggregateOutputType> | number;
                };
            };
        };
        Follow: {
            payload: Prisma.$FollowPayload<ExtArgs>;
            fields: Prisma.FollowFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.FollowFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.FollowFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                findFirst: {
                    args: Prisma.FollowFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.FollowFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                findMany: {
                    args: Prisma.FollowFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>[];
                };
                create: {
                    args: Prisma.FollowCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                createMany: {
                    args: Prisma.FollowCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.FollowCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>[];
                };
                delete: {
                    args: Prisma.FollowDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                update: {
                    args: Prisma.FollowUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                deleteMany: {
                    args: Prisma.FollowDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.FollowUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.FollowUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>[];
                };
                upsert: {
                    args: Prisma.FollowUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$FollowPayload>;
                };
                aggregate: {
                    args: Prisma.FollowAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateFollow>;
                };
                groupBy: {
                    args: Prisma.FollowGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FollowGroupByOutputType>[];
                };
                count: {
                    args: Prisma.FollowCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.FollowCountAggregateOutputType> | number;
                };
            };
        };
        UserInteraction: {
            payload: Prisma.$UserInteractionPayload<ExtArgs>;
            fields: Prisma.UserInteractionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserInteractionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInteractionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserInteractionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInteractionPayload>;
                };
                findFirst: {
                    args: Prisma.UserInteractionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInteractionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserInteractionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInteractionPayload>;
                };
                findMany: {
                    args: Prisma.UserInteractionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInteractionPayload>[];
                };
                create: {
                    args: Prisma.UserInteractionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInteractionPayload>;
                };
                createMany: {
                    args: Prisma.UserInteractionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserInteractionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInteractionPayload>[];
                };
                delete: {
                    args: Prisma.UserInteractionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInteractionPayload>;
                };
                update: {
                    args: Prisma.UserInteractionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInteractionPayload>;
                };
                deleteMany: {
                    args: Prisma.UserInteractionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserInteractionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserInteractionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInteractionPayload>[];
                };
                upsert: {
                    args: Prisma.UserInteractionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserInteractionPayload>;
                };
                aggregate: {
                    args: Prisma.UserInteractionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserInteraction>;
                };
                groupBy: {
                    args: Prisma.UserInteractionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserInteractionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserInteractionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserInteractionCountAggregateOutputType> | number;
                };
            };
        };
        Challenge: {
            payload: Prisma.$ChallengePayload<ExtArgs>;
            fields: Prisma.ChallengeFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ChallengeFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ChallengeFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>;
                };
                findFirst: {
                    args: Prisma.ChallengeFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ChallengeFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>;
                };
                findMany: {
                    args: Prisma.ChallengeFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>[];
                };
                create: {
                    args: Prisma.ChallengeCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>;
                };
                createMany: {
                    args: Prisma.ChallengeCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ChallengeCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>[];
                };
                delete: {
                    args: Prisma.ChallengeDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>;
                };
                update: {
                    args: Prisma.ChallengeUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>;
                };
                deleteMany: {
                    args: Prisma.ChallengeDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ChallengeUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ChallengeUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>[];
                };
                upsert: {
                    args: Prisma.ChallengeUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengePayload>;
                };
                aggregate: {
                    args: Prisma.ChallengeAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChallenge>;
                };
                groupBy: {
                    args: Prisma.ChallengeGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChallengeGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ChallengeCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChallengeCountAggregateOutputType> | number;
                };
            };
        };
        ChallengeParticipant: {
            payload: Prisma.$ChallengeParticipantPayload<ExtArgs>;
            fields: Prisma.ChallengeParticipantFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ChallengeParticipantFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ChallengeParticipantFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>;
                };
                findFirst: {
                    args: Prisma.ChallengeParticipantFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ChallengeParticipantFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>;
                };
                findMany: {
                    args: Prisma.ChallengeParticipantFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>[];
                };
                create: {
                    args: Prisma.ChallengeParticipantCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>;
                };
                createMany: {
                    args: Prisma.ChallengeParticipantCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ChallengeParticipantCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>[];
                };
                delete: {
                    args: Prisma.ChallengeParticipantDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>;
                };
                update: {
                    args: Prisma.ChallengeParticipantUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>;
                };
                deleteMany: {
                    args: Prisma.ChallengeParticipantDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ChallengeParticipantUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ChallengeParticipantUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>[];
                };
                upsert: {
                    args: Prisma.ChallengeParticipantUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ChallengeParticipantPayload>;
                };
                aggregate: {
                    args: Prisma.ChallengeParticipantAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateChallengeParticipant>;
                };
                groupBy: {
                    args: Prisma.ChallengeParticipantGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChallengeParticipantGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ChallengeParticipantCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ChallengeParticipantCountAggregateOutputType> | number;
                };
            };
        };
        Achievement: {
            payload: Prisma.$AchievementPayload<ExtArgs>;
            fields: Prisma.AchievementFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AchievementFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AchievementFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementPayload>;
                };
                findFirst: {
                    args: Prisma.AchievementFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AchievementFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementPayload>;
                };
                findMany: {
                    args: Prisma.AchievementFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementPayload>[];
                };
                create: {
                    args: Prisma.AchievementCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementPayload>;
                };
                createMany: {
                    args: Prisma.AchievementCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AchievementCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementPayload>[];
                };
                delete: {
                    args: Prisma.AchievementDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementPayload>;
                };
                update: {
                    args: Prisma.AchievementUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementPayload>;
                };
                deleteMany: {
                    args: Prisma.AchievementDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AchievementUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AchievementUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementPayload>[];
                };
                upsert: {
                    args: Prisma.AchievementUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AchievementPayload>;
                };
                aggregate: {
                    args: Prisma.AchievementAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAchievement>;
                };
                groupBy: {
                    args: Prisma.AchievementGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AchievementGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AchievementCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AchievementCountAggregateOutputType> | number;
                };
            };
        };
        Event: {
            payload: Prisma.$EventPayload<ExtArgs>;
            fields: Prisma.EventFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EventFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventPayload>;
                };
                findFirst: {
                    args: Prisma.EventFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventPayload>;
                };
                findMany: {
                    args: Prisma.EventFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventPayload>[];
                };
                create: {
                    args: Prisma.EventCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventPayload>;
                };
                createMany: {
                    args: Prisma.EventCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventPayload>[];
                };
                delete: {
                    args: Prisma.EventDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventPayload>;
                };
                update: {
                    args: Prisma.EventUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventPayload>;
                };
                deleteMany: {
                    args: Prisma.EventDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EventUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventPayload>[];
                };
                upsert: {
                    args: Prisma.EventUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventPayload>;
                };
                aggregate: {
                    args: Prisma.EventAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEvent>;
                };
                groupBy: {
                    args: Prisma.EventGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EventGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EventCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EventCountAggregateOutputType> | number;
                };
            };
        };
        EventRegistration: {
            payload: Prisma.$EventRegistrationPayload<ExtArgs>;
            fields: Prisma.EventRegistrationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EventRegistrationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventRegistrationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EventRegistrationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventRegistrationPayload>;
                };
                findFirst: {
                    args: Prisma.EventRegistrationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventRegistrationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EventRegistrationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventRegistrationPayload>;
                };
                findMany: {
                    args: Prisma.EventRegistrationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventRegistrationPayload>[];
                };
                create: {
                    args: Prisma.EventRegistrationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventRegistrationPayload>;
                };
                createMany: {
                    args: Prisma.EventRegistrationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.EventRegistrationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventRegistrationPayload>[];
                };
                delete: {
                    args: Prisma.EventRegistrationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventRegistrationPayload>;
                };
                update: {
                    args: Prisma.EventRegistrationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventRegistrationPayload>;
                };
                deleteMany: {
                    args: Prisma.EventRegistrationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EventRegistrationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.EventRegistrationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventRegistrationPayload>[];
                };
                upsert: {
                    args: Prisma.EventRegistrationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EventRegistrationPayload>;
                };
                aggregate: {
                    args: Prisma.EventRegistrationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEventRegistration>;
                };
                groupBy: {
                    args: Prisma.EventRegistrationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EventRegistrationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EventRegistrationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EventRegistrationCountAggregateOutputType> | number;
                };
            };
        };
        Charity: {
            payload: Prisma.$CharityPayload<ExtArgs>;
            fields: Prisma.CharityFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.CharityFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CharityPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.CharityFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CharityPayload>;
                };
                findFirst: {
                    args: Prisma.CharityFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CharityPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.CharityFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CharityPayload>;
                };
                findMany: {
                    args: Prisma.CharityFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CharityPayload>[];
                };
                create: {
                    args: Prisma.CharityCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CharityPayload>;
                };
                createMany: {
                    args: Prisma.CharityCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.CharityCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CharityPayload>[];
                };
                delete: {
                    args: Prisma.CharityDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CharityPayload>;
                };
                update: {
                    args: Prisma.CharityUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CharityPayload>;
                };
                deleteMany: {
                    args: Prisma.CharityDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.CharityUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.CharityUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CharityPayload>[];
                };
                upsert: {
                    args: Prisma.CharityUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$CharityPayload>;
                };
                aggregate: {
                    args: Prisma.CharityAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateCharity>;
                };
                groupBy: {
                    args: Prisma.CharityGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CharityGroupByOutputType>[];
                };
                count: {
                    args: Prisma.CharityCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.CharityCountAggregateOutputType> | number;
                };
            };
        };
        Donation: {
            payload: Prisma.$DonationPayload<ExtArgs>;
            fields: Prisma.DonationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.DonationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DonationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.DonationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DonationPayload>;
                };
                findFirst: {
                    args: Prisma.DonationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DonationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.DonationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DonationPayload>;
                };
                findMany: {
                    args: Prisma.DonationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DonationPayload>[];
                };
                create: {
                    args: Prisma.DonationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DonationPayload>;
                };
                createMany: {
                    args: Prisma.DonationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.DonationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DonationPayload>[];
                };
                delete: {
                    args: Prisma.DonationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DonationPayload>;
                };
                update: {
                    args: Prisma.DonationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DonationPayload>;
                };
                deleteMany: {
                    args: Prisma.DonationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.DonationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.DonationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DonationPayload>[];
                };
                upsert: {
                    args: Prisma.DonationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$DonationPayload>;
                };
                aggregate: {
                    args: Prisma.DonationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDonation>;
                };
                groupBy: {
                    args: Prisma.DonationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DonationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.DonationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DonationCountAggregateOutputType> | number;
                };
            };
        };
        Receipt: {
            payload: Prisma.$ReceiptPayload<ExtArgs>;
            fields: Prisma.ReceiptFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ReceiptFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ReceiptFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>;
                };
                findFirst: {
                    args: Prisma.ReceiptFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ReceiptFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>;
                };
                findMany: {
                    args: Prisma.ReceiptFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>[];
                };
                create: {
                    args: Prisma.ReceiptCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>;
                };
                createMany: {
                    args: Prisma.ReceiptCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ReceiptCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>[];
                };
                delete: {
                    args: Prisma.ReceiptDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>;
                };
                update: {
                    args: Prisma.ReceiptUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>;
                };
                deleteMany: {
                    args: Prisma.ReceiptDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ReceiptUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ReceiptUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>[];
                };
                upsert: {
                    args: Prisma.ReceiptUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ReceiptPayload>;
                };
                aggregate: {
                    args: Prisma.ReceiptAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateReceipt>;
                };
                groupBy: {
                    args: Prisma.ReceiptGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReceiptGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ReceiptCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ReceiptCountAggregateOutputType> | number;
                };
            };
        };
        QRScan: {
            payload: Prisma.$QRScanPayload<ExtArgs>;
            fields: Prisma.QRScanFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.QRScanFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QRScanPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.QRScanFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QRScanPayload>;
                };
                findFirst: {
                    args: Prisma.QRScanFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QRScanPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.QRScanFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QRScanPayload>;
                };
                findMany: {
                    args: Prisma.QRScanFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QRScanPayload>[];
                };
                create: {
                    args: Prisma.QRScanCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QRScanPayload>;
                };
                createMany: {
                    args: Prisma.QRScanCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.QRScanCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QRScanPayload>[];
                };
                delete: {
                    args: Prisma.QRScanDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QRScanPayload>;
                };
                update: {
                    args: Prisma.QRScanUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QRScanPayload>;
                };
                deleteMany: {
                    args: Prisma.QRScanDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.QRScanUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.QRScanUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QRScanPayload>[];
                };
                upsert: {
                    args: Prisma.QRScanUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$QRScanPayload>;
                };
                aggregate: {
                    args: Prisma.QRScanAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateQRScan>;
                };
                groupBy: {
                    args: Prisma.QRScanGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QRScanGroupByOutputType>[];
                };
                count: {
                    args: Prisma.QRScanCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.QRScanCountAggregateOutputType> | number;
                };
            };
        };
        NotInterested: {
            payload: Prisma.$NotInterestedPayload<ExtArgs>;
            fields: Prisma.NotInterestedFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotInterestedFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotInterestedPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotInterestedFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotInterestedPayload>;
                };
                findFirst: {
                    args: Prisma.NotInterestedFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotInterestedPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotInterestedFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotInterestedPayload>;
                };
                findMany: {
                    args: Prisma.NotInterestedFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotInterestedPayload>[];
                };
                create: {
                    args: Prisma.NotInterestedCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotInterestedPayload>;
                };
                createMany: {
                    args: Prisma.NotInterestedCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotInterestedCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotInterestedPayload>[];
                };
                delete: {
                    args: Prisma.NotInterestedDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotInterestedPayload>;
                };
                update: {
                    args: Prisma.NotInterestedUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotInterestedPayload>;
                };
                deleteMany: {
                    args: Prisma.NotInterestedDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotInterestedUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotInterestedUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotInterestedPayload>[];
                };
                upsert: {
                    args: Prisma.NotInterestedUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotInterestedPayload>;
                };
                aggregate: {
                    args: Prisma.NotInterestedAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotInterested>;
                };
                groupBy: {
                    args: Prisma.NotInterestedGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotInterestedGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotInterestedCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotInterestedCountAggregateOutputType> | number;
                };
            };
        };
        SavedRestaurant: {
            payload: Prisma.$SavedRestaurantPayload<ExtArgs>;
            fields: Prisma.SavedRestaurantFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SavedRestaurantFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SavedRestaurantPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SavedRestaurantFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SavedRestaurantPayload>;
                };
                findFirst: {
                    args: Prisma.SavedRestaurantFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SavedRestaurantPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SavedRestaurantFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SavedRestaurantPayload>;
                };
                findMany: {
                    args: Prisma.SavedRestaurantFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SavedRestaurantPayload>[];
                };
                create: {
                    args: Prisma.SavedRestaurantCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SavedRestaurantPayload>;
                };
                createMany: {
                    args: Prisma.SavedRestaurantCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.SavedRestaurantCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SavedRestaurantPayload>[];
                };
                delete: {
                    args: Prisma.SavedRestaurantDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SavedRestaurantPayload>;
                };
                update: {
                    args: Prisma.SavedRestaurantUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SavedRestaurantPayload>;
                };
                deleteMany: {
                    args: Prisma.SavedRestaurantDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SavedRestaurantUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.SavedRestaurantUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SavedRestaurantPayload>[];
                };
                upsert: {
                    args: Prisma.SavedRestaurantUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SavedRestaurantPayload>;
                };
                aggregate: {
                    args: Prisma.SavedRestaurantAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSavedRestaurant>;
                };
                groupBy: {
                    args: Prisma.SavedRestaurantGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SavedRestaurantGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SavedRestaurantCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SavedRestaurantCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
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
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const JsonNullValueInput: {
    readonly JsonNull: runtime.JsonNullClass;
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
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'UserRole'
 */
export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>;
/**
 * Reference to a field of type 'UserRole[]'
 */
export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'Json'
 */
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
/**
 * Reference to a field of type 'QueryMode'
 */
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
/**
 * Reference to a field of type 'PointsTransactionType'
 */
export type EnumPointsTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PointsTransactionType'>;
/**
 * Reference to a field of type 'PointsTransactionType[]'
 */
export type ListEnumPointsTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PointsTransactionType[]'>;
/**
 * Reference to a field of type 'OrderStatus'
 */
export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>;
/**
 * Reference to a field of type 'OrderStatus[]'
 */
export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>;
/**
 * Reference to a field of type 'FulfillmentType'
 */
export type EnumFulfillmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FulfillmentType'>;
/**
 * Reference to a field of type 'FulfillmentType[]'
 */
export type ListEnumFulfillmentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FulfillmentType[]'>;
/**
 * Reference to a field of type 'PostPrivacy'
 */
export type EnumPostPrivacyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostPrivacy'>;
/**
 * Reference to a field of type 'PostPrivacy[]'
 */
export type ListEnumPostPrivacyFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostPrivacy[]'>;
/**
 * Reference to a field of type 'InteractionType'
 */
export type EnumInteractionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InteractionType'>;
/**
 * Reference to a field of type 'InteractionType[]'
 */
export type ListEnumInteractionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InteractionType[]'>;
/**
 * Reference to a field of type 'ChallengeType'
 */
export type EnumChallengeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChallengeType'>;
/**
 * Reference to a field of type 'ChallengeType[]'
 */
export type ListEnumChallengeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ChallengeType[]'>;
/**
 * Reference to a field of type 'EventType'
 */
export type EnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType'>;
/**
 * Reference to a field of type 'EventType[]'
 */
export type ListEnumEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EventType[]'>;
/**
 * Reference to a field of type 'DonationType'
 */
export type EnumDonationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DonationType'>;
/**
 * Reference to a field of type 'DonationType[]'
 */
export type ListEnumDonationTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DonationType[]'>;
/**
 * Reference to a field of type 'ReceiptStatus'
 */
export type EnumReceiptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReceiptStatus'>;
/**
 * Reference to a field of type 'ReceiptStatus[]'
 */
export type ListEnumReceiptStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReceiptStatus[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    refreshToken?: Prisma.RefreshTokenOmit;
    restaurant?: Prisma.RestaurantOmit;
    menuItem?: Prisma.MenuItemOmit;
    pointsWallet?: Prisma.PointsWalletOmit;
    pointsTransaction?: Prisma.PointsTransactionOmit;
    foodiePoints?: Prisma.FoodiePointsOmit;
    order?: Prisma.OrderOmit;
    orderItem?: Prisma.OrderItemOmit;
    socialPost?: Prisma.SocialPostOmit;
    comment?: Prisma.CommentOmit;
    like?: Prisma.LikeOmit;
    follow?: Prisma.FollowOmit;
    userInteraction?: Prisma.UserInteractionOmit;
    challenge?: Prisma.ChallengeOmit;
    challengeParticipant?: Prisma.ChallengeParticipantOmit;
    achievement?: Prisma.AchievementOmit;
    event?: Prisma.EventOmit;
    eventRegistration?: Prisma.EventRegistrationOmit;
    charity?: Prisma.CharityOmit;
    donation?: Prisma.DonationOmit;
    receipt?: Prisma.ReceiptOmit;
    qRScan?: Prisma.QRScanOmit;
    notInterested?: Prisma.NotInterestedOmit;
    savedRestaurant?: Prisma.SavedRestaurantOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map