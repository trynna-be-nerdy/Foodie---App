import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Restaurant
 *
 */
export type RestaurantModel = runtime.Types.Result.DefaultSelection<Prisma.$RestaurantPayload>;
export type AggregateRestaurant = {
    _count: RestaurantCountAggregateOutputType | null;
    _avg: RestaurantAvgAggregateOutputType | null;
    _sum: RestaurantSumAggregateOutputType | null;
    _min: RestaurantMinAggregateOutputType | null;
    _max: RestaurantMaxAggregateOutputType | null;
};
export type RestaurantAvgAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    priceRange: number | null;
    locationCount: number | null;
    rating: number | null;
    reviewCount: number | null;
    pointsPerDollar: number | null;
};
export type RestaurantSumAggregateOutputType = {
    latitude: number | null;
    longitude: number | null;
    priceRange: number | null;
    locationCount: number | null;
    rating: number | null;
    reviewCount: number | null;
    pointsPerDollar: number | null;
};
export type RestaurantMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    country: string | null;
    latitude: number | null;
    longitude: number | null;
    phone: string | null;
    email: string | null;
    website: string | null;
    imageUrl: string | null;
    priceRange: number | null;
    locationCount: number | null;
    rating: number | null;
    reviewCount: number | null;
    isVerified: boolean | null;
    isActive: boolean | null;
    loyaltyProgramEnabled: boolean | null;
    pointsPerDollar: number | null;
    loyaltyApiProvider: string | null;
    qrSecret: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RestaurantMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    zipCode: string | null;
    country: string | null;
    latitude: number | null;
    longitude: number | null;
    phone: string | null;
    email: string | null;
    website: string | null;
    imageUrl: string | null;
    priceRange: number | null;
    locationCount: number | null;
    rating: number | null;
    reviewCount: number | null;
    isVerified: boolean | null;
    isActive: boolean | null;
    loyaltyProgramEnabled: boolean | null;
    pointsPerDollar: number | null;
    loyaltyApiProvider: string | null;
    qrSecret: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type RestaurantCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    address: number;
    city: number;
    state: number;
    zipCode: number;
    country: number;
    latitude: number;
    longitude: number;
    phone: number;
    email: number;
    website: number;
    imageUrl: number;
    cuisineTypes: number;
    priceRange: number;
    locationCount: number;
    rating: number;
    reviewCount: number;
    isVerified: number;
    isActive: number;
    loyaltyProgramEnabled: number;
    pointsPerDollar: number;
    loyaltyApiProvider: number;
    loyaltyOauthConfig: number;
    qrSecret: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type RestaurantAvgAggregateInputType = {
    latitude?: true;
    longitude?: true;
    priceRange?: true;
    locationCount?: true;
    rating?: true;
    reviewCount?: true;
    pointsPerDollar?: true;
};
export type RestaurantSumAggregateInputType = {
    latitude?: true;
    longitude?: true;
    priceRange?: true;
    locationCount?: true;
    rating?: true;
    reviewCount?: true;
    pointsPerDollar?: true;
};
export type RestaurantMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    address?: true;
    city?: true;
    state?: true;
    zipCode?: true;
    country?: true;
    latitude?: true;
    longitude?: true;
    phone?: true;
    email?: true;
    website?: true;
    imageUrl?: true;
    priceRange?: true;
    locationCount?: true;
    rating?: true;
    reviewCount?: true;
    isVerified?: true;
    isActive?: true;
    loyaltyProgramEnabled?: true;
    pointsPerDollar?: true;
    loyaltyApiProvider?: true;
    qrSecret?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RestaurantMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    address?: true;
    city?: true;
    state?: true;
    zipCode?: true;
    country?: true;
    latitude?: true;
    longitude?: true;
    phone?: true;
    email?: true;
    website?: true;
    imageUrl?: true;
    priceRange?: true;
    locationCount?: true;
    rating?: true;
    reviewCount?: true;
    isVerified?: true;
    isActive?: true;
    loyaltyProgramEnabled?: true;
    pointsPerDollar?: true;
    loyaltyApiProvider?: true;
    qrSecret?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type RestaurantCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    address?: true;
    city?: true;
    state?: true;
    zipCode?: true;
    country?: true;
    latitude?: true;
    longitude?: true;
    phone?: true;
    email?: true;
    website?: true;
    imageUrl?: true;
    cuisineTypes?: true;
    priceRange?: true;
    locationCount?: true;
    rating?: true;
    reviewCount?: true;
    isVerified?: true;
    isActive?: true;
    loyaltyProgramEnabled?: true;
    pointsPerDollar?: true;
    loyaltyApiProvider?: true;
    loyaltyOauthConfig?: true;
    qrSecret?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type RestaurantAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Restaurant to aggregate.
     */
    where?: Prisma.RestaurantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: Prisma.RestaurantOrderByWithRelationInput | Prisma.RestaurantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.RestaurantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Restaurants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Restaurants
    **/
    _count?: true | RestaurantCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: RestaurantAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: RestaurantSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: RestaurantMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: RestaurantMaxAggregateInputType;
};
export type GetRestaurantAggregateType<T extends RestaurantAggregateArgs> = {
    [P in keyof T & keyof AggregateRestaurant]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRestaurant[P]> : Prisma.GetScalarType<T[P], AggregateRestaurant[P]>;
};
export type RestaurantGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RestaurantWhereInput;
    orderBy?: Prisma.RestaurantOrderByWithAggregationInput | Prisma.RestaurantOrderByWithAggregationInput[];
    by: Prisma.RestaurantScalarFieldEnum[] | Prisma.RestaurantScalarFieldEnum;
    having?: Prisma.RestaurantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RestaurantCountAggregateInputType | true;
    _avg?: RestaurantAvgAggregateInputType;
    _sum?: RestaurantSumAggregateInputType;
    _min?: RestaurantMinAggregateInputType;
    _max?: RestaurantMaxAggregateInputType;
};
export type RestaurantGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    latitude: number | null;
    longitude: number | null;
    phone: string | null;
    email: string | null;
    website: string | null;
    imageUrl: string | null;
    cuisineTypes: string[];
    priceRange: number;
    locationCount: number;
    rating: number;
    reviewCount: number;
    isVerified: boolean;
    isActive: boolean;
    loyaltyProgramEnabled: boolean;
    pointsPerDollar: number;
    loyaltyApiProvider: string | null;
    loyaltyOauthConfig: runtime.JsonValue | null;
    qrSecret: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: RestaurantCountAggregateOutputType | null;
    _avg: RestaurantAvgAggregateOutputType | null;
    _sum: RestaurantSumAggregateOutputType | null;
    _min: RestaurantMinAggregateOutputType | null;
    _max: RestaurantMaxAggregateOutputType | null;
};
type GetRestaurantGroupByPayload<T extends RestaurantGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RestaurantGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RestaurantGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RestaurantGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RestaurantGroupByOutputType[P]>;
}>>;
export type RestaurantWhereInput = {
    AND?: Prisma.RestaurantWhereInput | Prisma.RestaurantWhereInput[];
    OR?: Prisma.RestaurantWhereInput[];
    NOT?: Prisma.RestaurantWhereInput | Prisma.RestaurantWhereInput[];
    id?: Prisma.StringFilter<"Restaurant"> | string;
    name?: Prisma.StringFilter<"Restaurant"> | string;
    description?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    address?: Prisma.StringFilter<"Restaurant"> | string;
    city?: Prisma.StringFilter<"Restaurant"> | string;
    state?: Prisma.StringFilter<"Restaurant"> | string;
    zipCode?: Prisma.StringFilter<"Restaurant"> | string;
    country?: Prisma.StringFilter<"Restaurant"> | string;
    latitude?: Prisma.FloatNullableFilter<"Restaurant"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"Restaurant"> | number | null;
    phone?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    email?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    website?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    cuisineTypes?: Prisma.StringNullableListFilter<"Restaurant">;
    priceRange?: Prisma.IntFilter<"Restaurant"> | number;
    locationCount?: Prisma.IntFilter<"Restaurant"> | number;
    rating?: Prisma.FloatFilter<"Restaurant"> | number;
    reviewCount?: Prisma.IntFilter<"Restaurant"> | number;
    isVerified?: Prisma.BoolFilter<"Restaurant"> | boolean;
    isActive?: Prisma.BoolFilter<"Restaurant"> | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFilter<"Restaurant"> | boolean;
    pointsPerDollar?: Prisma.IntFilter<"Restaurant"> | number;
    loyaltyApiProvider?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    loyaltyOauthConfig?: Prisma.JsonNullableFilter<"Restaurant">;
    qrSecret?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Restaurant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Restaurant"> | Date | string;
    pointsWallets?: Prisma.PointsWalletListRelationFilter;
    pointsTransactions?: Prisma.PointsTransactionListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    menuItems?: Prisma.MenuItemListRelationFilter;
    socialPosts?: Prisma.SocialPostListRelationFilter;
    events?: Prisma.EventListRelationFilter;
    challenges?: Prisma.ChallengeListRelationFilter;
    interactions?: Prisma.UserInteractionListRelationFilter;
    notInterested?: Prisma.NotInterestedListRelationFilter;
    savedBy?: Prisma.SavedRestaurantListRelationFilter;
};
export type RestaurantOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    website?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    cuisineTypes?: Prisma.SortOrder;
    priceRange?: Prisma.SortOrder;
    locationCount?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    loyaltyProgramEnabled?: Prisma.SortOrder;
    pointsPerDollar?: Prisma.SortOrder;
    loyaltyApiProvider?: Prisma.SortOrderInput | Prisma.SortOrder;
    loyaltyOauthConfig?: Prisma.SortOrderInput | Prisma.SortOrder;
    qrSecret?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pointsWallets?: Prisma.PointsWalletOrderByRelationAggregateInput;
    pointsTransactions?: Prisma.PointsTransactionOrderByRelationAggregateInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
    menuItems?: Prisma.MenuItemOrderByRelationAggregateInput;
    socialPosts?: Prisma.SocialPostOrderByRelationAggregateInput;
    events?: Prisma.EventOrderByRelationAggregateInput;
    challenges?: Prisma.ChallengeOrderByRelationAggregateInput;
    interactions?: Prisma.UserInteractionOrderByRelationAggregateInput;
    notInterested?: Prisma.NotInterestedOrderByRelationAggregateInput;
    savedBy?: Prisma.SavedRestaurantOrderByRelationAggregateInput;
};
export type RestaurantWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.RestaurantWhereInput | Prisma.RestaurantWhereInput[];
    OR?: Prisma.RestaurantWhereInput[];
    NOT?: Prisma.RestaurantWhereInput | Prisma.RestaurantWhereInput[];
    name?: Prisma.StringFilter<"Restaurant"> | string;
    description?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    address?: Prisma.StringFilter<"Restaurant"> | string;
    city?: Prisma.StringFilter<"Restaurant"> | string;
    state?: Prisma.StringFilter<"Restaurant"> | string;
    zipCode?: Prisma.StringFilter<"Restaurant"> | string;
    country?: Prisma.StringFilter<"Restaurant"> | string;
    latitude?: Prisma.FloatNullableFilter<"Restaurant"> | number | null;
    longitude?: Prisma.FloatNullableFilter<"Restaurant"> | number | null;
    phone?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    email?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    website?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    imageUrl?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    cuisineTypes?: Prisma.StringNullableListFilter<"Restaurant">;
    priceRange?: Prisma.IntFilter<"Restaurant"> | number;
    locationCount?: Prisma.IntFilter<"Restaurant"> | number;
    rating?: Prisma.FloatFilter<"Restaurant"> | number;
    reviewCount?: Prisma.IntFilter<"Restaurant"> | number;
    isVerified?: Prisma.BoolFilter<"Restaurant"> | boolean;
    isActive?: Prisma.BoolFilter<"Restaurant"> | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFilter<"Restaurant"> | boolean;
    pointsPerDollar?: Prisma.IntFilter<"Restaurant"> | number;
    loyaltyApiProvider?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    loyaltyOauthConfig?: Prisma.JsonNullableFilter<"Restaurant">;
    qrSecret?: Prisma.StringNullableFilter<"Restaurant"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Restaurant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Restaurant"> | Date | string;
    pointsWallets?: Prisma.PointsWalletListRelationFilter;
    pointsTransactions?: Prisma.PointsTransactionListRelationFilter;
    orders?: Prisma.OrderListRelationFilter;
    menuItems?: Prisma.MenuItemListRelationFilter;
    socialPosts?: Prisma.SocialPostListRelationFilter;
    events?: Prisma.EventListRelationFilter;
    challenges?: Prisma.ChallengeListRelationFilter;
    interactions?: Prisma.UserInteractionListRelationFilter;
    notInterested?: Prisma.NotInterestedListRelationFilter;
    savedBy?: Prisma.SavedRestaurantListRelationFilter;
}, "id">;
export type RestaurantOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    address?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    email?: Prisma.SortOrderInput | Prisma.SortOrder;
    website?: Prisma.SortOrderInput | Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    cuisineTypes?: Prisma.SortOrder;
    priceRange?: Prisma.SortOrder;
    locationCount?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    loyaltyProgramEnabled?: Prisma.SortOrder;
    pointsPerDollar?: Prisma.SortOrder;
    loyaltyApiProvider?: Prisma.SortOrderInput | Prisma.SortOrder;
    loyaltyOauthConfig?: Prisma.SortOrderInput | Prisma.SortOrder;
    qrSecret?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.RestaurantCountOrderByAggregateInput;
    _avg?: Prisma.RestaurantAvgOrderByAggregateInput;
    _max?: Prisma.RestaurantMaxOrderByAggregateInput;
    _min?: Prisma.RestaurantMinOrderByAggregateInput;
    _sum?: Prisma.RestaurantSumOrderByAggregateInput;
};
export type RestaurantScalarWhereWithAggregatesInput = {
    AND?: Prisma.RestaurantScalarWhereWithAggregatesInput | Prisma.RestaurantScalarWhereWithAggregatesInput[];
    OR?: Prisma.RestaurantScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RestaurantScalarWhereWithAggregatesInput | Prisma.RestaurantScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Restaurant"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Restaurant"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Restaurant"> | string | null;
    address?: Prisma.StringWithAggregatesFilter<"Restaurant"> | string;
    city?: Prisma.StringWithAggregatesFilter<"Restaurant"> | string;
    state?: Prisma.StringWithAggregatesFilter<"Restaurant"> | string;
    zipCode?: Prisma.StringWithAggregatesFilter<"Restaurant"> | string;
    country?: Prisma.StringWithAggregatesFilter<"Restaurant"> | string;
    latitude?: Prisma.FloatNullableWithAggregatesFilter<"Restaurant"> | number | null;
    longitude?: Prisma.FloatNullableWithAggregatesFilter<"Restaurant"> | number | null;
    phone?: Prisma.StringNullableWithAggregatesFilter<"Restaurant"> | string | null;
    email?: Prisma.StringNullableWithAggregatesFilter<"Restaurant"> | string | null;
    website?: Prisma.StringNullableWithAggregatesFilter<"Restaurant"> | string | null;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"Restaurant"> | string | null;
    cuisineTypes?: Prisma.StringNullableListFilter<"Restaurant">;
    priceRange?: Prisma.IntWithAggregatesFilter<"Restaurant"> | number;
    locationCount?: Prisma.IntWithAggregatesFilter<"Restaurant"> | number;
    rating?: Prisma.FloatWithAggregatesFilter<"Restaurant"> | number;
    reviewCount?: Prisma.IntWithAggregatesFilter<"Restaurant"> | number;
    isVerified?: Prisma.BoolWithAggregatesFilter<"Restaurant"> | boolean;
    isActive?: Prisma.BoolWithAggregatesFilter<"Restaurant"> | boolean;
    loyaltyProgramEnabled?: Prisma.BoolWithAggregatesFilter<"Restaurant"> | boolean;
    pointsPerDollar?: Prisma.IntWithAggregatesFilter<"Restaurant"> | number;
    loyaltyApiProvider?: Prisma.StringNullableWithAggregatesFilter<"Restaurant"> | string | null;
    loyaltyOauthConfig?: Prisma.JsonNullableWithAggregatesFilter<"Restaurant">;
    qrSecret?: Prisma.StringNullableWithAggregatesFilter<"Restaurant"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Restaurant"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Restaurant"> | Date | string;
};
export type RestaurantCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemUncheckedCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeUncheckedCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUncheckedUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type RestaurantUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RestaurantUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    has?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    hasEvery?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    hasSome?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    isEmpty?: boolean;
};
export type RestaurantCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    website?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    cuisineTypes?: Prisma.SortOrder;
    priceRange?: Prisma.SortOrder;
    locationCount?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    loyaltyProgramEnabled?: Prisma.SortOrder;
    pointsPerDollar?: Prisma.SortOrder;
    loyaltyApiProvider?: Prisma.SortOrder;
    loyaltyOauthConfig?: Prisma.SortOrder;
    qrSecret?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RestaurantAvgOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    priceRange?: Prisma.SortOrder;
    locationCount?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    pointsPerDollar?: Prisma.SortOrder;
};
export type RestaurantMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    website?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    priceRange?: Prisma.SortOrder;
    locationCount?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    loyaltyProgramEnabled?: Prisma.SortOrder;
    pointsPerDollar?: Prisma.SortOrder;
    loyaltyApiProvider?: Prisma.SortOrder;
    qrSecret?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RestaurantMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    address?: Prisma.SortOrder;
    city?: Prisma.SortOrder;
    state?: Prisma.SortOrder;
    zipCode?: Prisma.SortOrder;
    country?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    website?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    priceRange?: Prisma.SortOrder;
    locationCount?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    loyaltyProgramEnabled?: Prisma.SortOrder;
    pointsPerDollar?: Prisma.SortOrder;
    loyaltyApiProvider?: Prisma.SortOrder;
    qrSecret?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type RestaurantSumOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    priceRange?: Prisma.SortOrder;
    locationCount?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    reviewCount?: Prisma.SortOrder;
    pointsPerDollar?: Prisma.SortOrder;
};
export type RestaurantScalarRelationFilter = {
    is?: Prisma.RestaurantWhereInput;
    isNot?: Prisma.RestaurantWhereInput;
};
export type RestaurantNullableScalarRelationFilter = {
    is?: Prisma.RestaurantWhereInput | null;
    isNot?: Prisma.RestaurantWhereInput | null;
};
export type RestaurantCreatecuisineTypesInput = {
    set: string[];
};
export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type RestaurantUpdatecuisineTypesInput = {
    set?: string[];
    push?: string | string[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type RestaurantCreateNestedOneWithoutMenuItemsInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutMenuItemsInput, Prisma.RestaurantUncheckedCreateWithoutMenuItemsInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutMenuItemsInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantUpdateOneRequiredWithoutMenuItemsNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutMenuItemsInput, Prisma.RestaurantUncheckedCreateWithoutMenuItemsInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutMenuItemsInput;
    upsert?: Prisma.RestaurantUpsertWithoutMenuItemsInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantUpdateToOneWithWhereWithoutMenuItemsInput, Prisma.RestaurantUpdateWithoutMenuItemsInput>, Prisma.RestaurantUncheckedUpdateWithoutMenuItemsInput>;
};
export type RestaurantCreateNestedOneWithoutPointsWalletsInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutPointsWalletsInput, Prisma.RestaurantUncheckedCreateWithoutPointsWalletsInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutPointsWalletsInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantUpdateOneRequiredWithoutPointsWalletsNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutPointsWalletsInput, Prisma.RestaurantUncheckedCreateWithoutPointsWalletsInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutPointsWalletsInput;
    upsert?: Prisma.RestaurantUpsertWithoutPointsWalletsInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantUpdateToOneWithWhereWithoutPointsWalletsInput, Prisma.RestaurantUpdateWithoutPointsWalletsInput>, Prisma.RestaurantUncheckedUpdateWithoutPointsWalletsInput>;
};
export type RestaurantCreateNestedOneWithoutPointsTransactionsInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutPointsTransactionsInput, Prisma.RestaurantUncheckedCreateWithoutPointsTransactionsInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutPointsTransactionsInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantUpdateOneRequiredWithoutPointsTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutPointsTransactionsInput, Prisma.RestaurantUncheckedCreateWithoutPointsTransactionsInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutPointsTransactionsInput;
    upsert?: Prisma.RestaurantUpsertWithoutPointsTransactionsInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantUpdateToOneWithWhereWithoutPointsTransactionsInput, Prisma.RestaurantUpdateWithoutPointsTransactionsInput>, Prisma.RestaurantUncheckedUpdateWithoutPointsTransactionsInput>;
};
export type RestaurantCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutOrdersInput, Prisma.RestaurantUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutOrdersInput, Prisma.RestaurantUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.RestaurantUpsertWithoutOrdersInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantUpdateToOneWithWhereWithoutOrdersInput, Prisma.RestaurantUpdateWithoutOrdersInput>, Prisma.RestaurantUncheckedUpdateWithoutOrdersInput>;
};
export type RestaurantCreateNestedOneWithoutSocialPostsInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutSocialPostsInput, Prisma.RestaurantUncheckedCreateWithoutSocialPostsInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutSocialPostsInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantUpdateOneWithoutSocialPostsNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutSocialPostsInput, Prisma.RestaurantUncheckedCreateWithoutSocialPostsInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutSocialPostsInput;
    upsert?: Prisma.RestaurantUpsertWithoutSocialPostsInput;
    disconnect?: Prisma.RestaurantWhereInput | boolean;
    delete?: Prisma.RestaurantWhereInput | boolean;
    connect?: Prisma.RestaurantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantUpdateToOneWithWhereWithoutSocialPostsInput, Prisma.RestaurantUpdateWithoutSocialPostsInput>, Prisma.RestaurantUncheckedUpdateWithoutSocialPostsInput>;
};
export type RestaurantCreateNestedOneWithoutInteractionsInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutInteractionsInput, Prisma.RestaurantUncheckedCreateWithoutInteractionsInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutInteractionsInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantUpdateOneRequiredWithoutInteractionsNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutInteractionsInput, Prisma.RestaurantUncheckedCreateWithoutInteractionsInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutInteractionsInput;
    upsert?: Prisma.RestaurantUpsertWithoutInteractionsInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantUpdateToOneWithWhereWithoutInteractionsInput, Prisma.RestaurantUpdateWithoutInteractionsInput>, Prisma.RestaurantUncheckedUpdateWithoutInteractionsInput>;
};
export type RestaurantCreateNestedOneWithoutChallengesInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutChallengesInput, Prisma.RestaurantUncheckedCreateWithoutChallengesInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutChallengesInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantUpdateOneWithoutChallengesNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutChallengesInput, Prisma.RestaurantUncheckedCreateWithoutChallengesInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutChallengesInput;
    upsert?: Prisma.RestaurantUpsertWithoutChallengesInput;
    disconnect?: Prisma.RestaurantWhereInput | boolean;
    delete?: Prisma.RestaurantWhereInput | boolean;
    connect?: Prisma.RestaurantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantUpdateToOneWithWhereWithoutChallengesInput, Prisma.RestaurantUpdateWithoutChallengesInput>, Prisma.RestaurantUncheckedUpdateWithoutChallengesInput>;
};
export type RestaurantCreateNestedOneWithoutEventsInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutEventsInput, Prisma.RestaurantUncheckedCreateWithoutEventsInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutEventsInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantUpdateOneRequiredWithoutEventsNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutEventsInput, Prisma.RestaurantUncheckedCreateWithoutEventsInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutEventsInput;
    upsert?: Prisma.RestaurantUpsertWithoutEventsInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantUpdateToOneWithWhereWithoutEventsInput, Prisma.RestaurantUpdateWithoutEventsInput>, Prisma.RestaurantUncheckedUpdateWithoutEventsInput>;
};
export type RestaurantCreateNestedOneWithoutNotInterestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutNotInterestedInput, Prisma.RestaurantUncheckedCreateWithoutNotInterestedInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutNotInterestedInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantUpdateOneRequiredWithoutNotInterestedNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutNotInterestedInput, Prisma.RestaurantUncheckedCreateWithoutNotInterestedInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutNotInterestedInput;
    upsert?: Prisma.RestaurantUpsertWithoutNotInterestedInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantUpdateToOneWithWhereWithoutNotInterestedInput, Prisma.RestaurantUpdateWithoutNotInterestedInput>, Prisma.RestaurantUncheckedUpdateWithoutNotInterestedInput>;
};
export type RestaurantCreateNestedOneWithoutSavedByInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutSavedByInput, Prisma.RestaurantUncheckedCreateWithoutSavedByInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutSavedByInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
};
export type RestaurantUpdateOneRequiredWithoutSavedByNestedInput = {
    create?: Prisma.XOR<Prisma.RestaurantCreateWithoutSavedByInput, Prisma.RestaurantUncheckedCreateWithoutSavedByInput>;
    connectOrCreate?: Prisma.RestaurantCreateOrConnectWithoutSavedByInput;
    upsert?: Prisma.RestaurantUpsertWithoutSavedByInput;
    connect?: Prisma.RestaurantWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RestaurantUpdateToOneWithWhereWithoutSavedByInput, Prisma.RestaurantUpdateWithoutSavedByInput>, Prisma.RestaurantUncheckedUpdateWithoutSavedByInput>;
};
export type RestaurantCreateWithoutMenuItemsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateWithoutMenuItemsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeUncheckedCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantCreateOrConnectWithoutMenuItemsInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutMenuItemsInput, Prisma.RestaurantUncheckedCreateWithoutMenuItemsInput>;
};
export type RestaurantUpsertWithoutMenuItemsInput = {
    update: Prisma.XOR<Prisma.RestaurantUpdateWithoutMenuItemsInput, Prisma.RestaurantUncheckedUpdateWithoutMenuItemsInput>;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutMenuItemsInput, Prisma.RestaurantUncheckedCreateWithoutMenuItemsInput>;
    where?: Prisma.RestaurantWhereInput;
};
export type RestaurantUpdateToOneWithWhereWithoutMenuItemsInput = {
    where?: Prisma.RestaurantWhereInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateWithoutMenuItemsInput, Prisma.RestaurantUncheckedUpdateWithoutMenuItemsInput>;
};
export type RestaurantUpdateWithoutMenuItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateWithoutMenuItemsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUncheckedUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantCreateWithoutPointsWalletsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateWithoutPointsWalletsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemUncheckedCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeUncheckedCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantCreateOrConnectWithoutPointsWalletsInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutPointsWalletsInput, Prisma.RestaurantUncheckedCreateWithoutPointsWalletsInput>;
};
export type RestaurantUpsertWithoutPointsWalletsInput = {
    update: Prisma.XOR<Prisma.RestaurantUpdateWithoutPointsWalletsInput, Prisma.RestaurantUncheckedUpdateWithoutPointsWalletsInput>;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutPointsWalletsInput, Prisma.RestaurantUncheckedCreateWithoutPointsWalletsInput>;
    where?: Prisma.RestaurantWhereInput;
};
export type RestaurantUpdateToOneWithWhereWithoutPointsWalletsInput = {
    where?: Prisma.RestaurantWhereInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateWithoutPointsWalletsInput, Prisma.RestaurantUncheckedUpdateWithoutPointsWalletsInput>;
};
export type RestaurantUpdateWithoutPointsWalletsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateWithoutPointsWalletsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUncheckedUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantCreateWithoutPointsTransactionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateWithoutPointsTransactionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemUncheckedCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeUncheckedCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantCreateOrConnectWithoutPointsTransactionsInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutPointsTransactionsInput, Prisma.RestaurantUncheckedCreateWithoutPointsTransactionsInput>;
};
export type RestaurantUpsertWithoutPointsTransactionsInput = {
    update: Prisma.XOR<Prisma.RestaurantUpdateWithoutPointsTransactionsInput, Prisma.RestaurantUncheckedUpdateWithoutPointsTransactionsInput>;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutPointsTransactionsInput, Prisma.RestaurantUncheckedCreateWithoutPointsTransactionsInput>;
    where?: Prisma.RestaurantWhereInput;
};
export type RestaurantUpdateToOneWithWhereWithoutPointsTransactionsInput = {
    where?: Prisma.RestaurantWhereInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateWithoutPointsTransactionsInput, Prisma.RestaurantUncheckedUpdateWithoutPointsTransactionsInput>;
};
export type RestaurantUpdateWithoutPointsTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateWithoutPointsTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUncheckedUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantCreateWithoutOrdersInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateWithoutOrdersInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemUncheckedCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeUncheckedCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantCreateOrConnectWithoutOrdersInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutOrdersInput, Prisma.RestaurantUncheckedCreateWithoutOrdersInput>;
};
export type RestaurantUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.RestaurantUpdateWithoutOrdersInput, Prisma.RestaurantUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutOrdersInput, Prisma.RestaurantUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.RestaurantWhereInput;
};
export type RestaurantUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.RestaurantWhereInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateWithoutOrdersInput, Prisma.RestaurantUncheckedUpdateWithoutOrdersInput>;
};
export type RestaurantUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUncheckedUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantCreateWithoutSocialPostsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateWithoutSocialPostsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemUncheckedCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeUncheckedCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantCreateOrConnectWithoutSocialPostsInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutSocialPostsInput, Prisma.RestaurantUncheckedCreateWithoutSocialPostsInput>;
};
export type RestaurantUpsertWithoutSocialPostsInput = {
    update: Prisma.XOR<Prisma.RestaurantUpdateWithoutSocialPostsInput, Prisma.RestaurantUncheckedUpdateWithoutSocialPostsInput>;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutSocialPostsInput, Prisma.RestaurantUncheckedCreateWithoutSocialPostsInput>;
    where?: Prisma.RestaurantWhereInput;
};
export type RestaurantUpdateToOneWithWhereWithoutSocialPostsInput = {
    where?: Prisma.RestaurantWhereInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateWithoutSocialPostsInput, Prisma.RestaurantUncheckedUpdateWithoutSocialPostsInput>;
};
export type RestaurantUpdateWithoutSocialPostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateWithoutSocialPostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUncheckedUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantCreateWithoutInteractionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeCreateNestedManyWithoutSponsorRestaurantInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateWithoutInteractionsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemUncheckedCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeUncheckedCreateNestedManyWithoutSponsorRestaurantInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantCreateOrConnectWithoutInteractionsInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutInteractionsInput, Prisma.RestaurantUncheckedCreateWithoutInteractionsInput>;
};
export type RestaurantUpsertWithoutInteractionsInput = {
    update: Prisma.XOR<Prisma.RestaurantUpdateWithoutInteractionsInput, Prisma.RestaurantUncheckedUpdateWithoutInteractionsInput>;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutInteractionsInput, Prisma.RestaurantUncheckedCreateWithoutInteractionsInput>;
    where?: Prisma.RestaurantWhereInput;
};
export type RestaurantUpdateToOneWithWhereWithoutInteractionsInput = {
    where?: Prisma.RestaurantWhereInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateWithoutInteractionsInput, Prisma.RestaurantUncheckedUpdateWithoutInteractionsInput>;
};
export type RestaurantUpdateWithoutInteractionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUpdateManyWithoutSponsorRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateWithoutInteractionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUncheckedUpdateManyWithoutSponsorRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantCreateWithoutChallengesInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventCreateNestedManyWithoutRestaurantInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateWithoutChallengesInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemUncheckedCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutRestaurantInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantCreateOrConnectWithoutChallengesInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutChallengesInput, Prisma.RestaurantUncheckedCreateWithoutChallengesInput>;
};
export type RestaurantUpsertWithoutChallengesInput = {
    update: Prisma.XOR<Prisma.RestaurantUpdateWithoutChallengesInput, Prisma.RestaurantUncheckedUpdateWithoutChallengesInput>;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutChallengesInput, Prisma.RestaurantUncheckedCreateWithoutChallengesInput>;
    where?: Prisma.RestaurantWhereInput;
};
export type RestaurantUpdateToOneWithWhereWithoutChallengesInput = {
    where?: Prisma.RestaurantWhereInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateWithoutChallengesInput, Prisma.RestaurantUncheckedUpdateWithoutChallengesInput>;
};
export type RestaurantUpdateWithoutChallengesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUpdateManyWithoutRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateWithoutChallengesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantCreateWithoutEventsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateWithoutEventsInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemUncheckedCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeUncheckedCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantCreateOrConnectWithoutEventsInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutEventsInput, Prisma.RestaurantUncheckedCreateWithoutEventsInput>;
};
export type RestaurantUpsertWithoutEventsInput = {
    update: Prisma.XOR<Prisma.RestaurantUpdateWithoutEventsInput, Prisma.RestaurantUncheckedUpdateWithoutEventsInput>;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutEventsInput, Prisma.RestaurantUncheckedCreateWithoutEventsInput>;
    where?: Prisma.RestaurantWhereInput;
};
export type RestaurantUpdateToOneWithWhereWithoutEventsInput = {
    where?: Prisma.RestaurantWhereInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateWithoutEventsInput, Prisma.RestaurantUncheckedUpdateWithoutEventsInput>;
};
export type RestaurantUpdateWithoutEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateWithoutEventsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUncheckedUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantCreateWithoutNotInterestedInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateWithoutNotInterestedInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemUncheckedCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeUncheckedCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutRestaurantInput;
    savedBy?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantCreateOrConnectWithoutNotInterestedInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutNotInterestedInput, Prisma.RestaurantUncheckedCreateWithoutNotInterestedInput>;
};
export type RestaurantUpsertWithoutNotInterestedInput = {
    update: Prisma.XOR<Prisma.RestaurantUpdateWithoutNotInterestedInput, Prisma.RestaurantUncheckedUpdateWithoutNotInterestedInput>;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutNotInterestedInput, Prisma.RestaurantUncheckedCreateWithoutNotInterestedInput>;
    where?: Prisma.RestaurantWhereInput;
};
export type RestaurantUpdateToOneWithWhereWithoutNotInterestedInput = {
    where?: Prisma.RestaurantWhereInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateWithoutNotInterestedInput, Prisma.RestaurantUncheckedUpdateWithoutNotInterestedInput>;
};
export type RestaurantUpdateWithoutNotInterestedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateWithoutNotInterestedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUncheckedUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutRestaurantNestedInput;
    savedBy?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantCreateWithoutSavedByInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantUncheckedCreateWithoutSavedByInput = {
    id?: string;
    name: string;
    description?: string | null;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    latitude?: number | null;
    longitude?: number | null;
    phone?: string | null;
    email?: string | null;
    website?: string | null;
    imageUrl?: string | null;
    cuisineTypes?: Prisma.RestaurantCreatecuisineTypesInput | string[];
    priceRange?: number;
    locationCount?: number;
    rating?: number;
    reviewCount?: number;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: number;
    loyaltyApiProvider?: string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutRestaurantInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutRestaurantInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutRestaurantInput;
    menuItems?: Prisma.MenuItemUncheckedCreateNestedManyWithoutRestaurantInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutRestaurantInput;
    events?: Prisma.EventUncheckedCreateNestedManyWithoutRestaurantInput;
    challenges?: Prisma.ChallengeUncheckedCreateNestedManyWithoutSponsorRestaurantInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutRestaurantInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutRestaurantInput;
};
export type RestaurantCreateOrConnectWithoutSavedByInput = {
    where: Prisma.RestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutSavedByInput, Prisma.RestaurantUncheckedCreateWithoutSavedByInput>;
};
export type RestaurantUpsertWithoutSavedByInput = {
    update: Prisma.XOR<Prisma.RestaurantUpdateWithoutSavedByInput, Prisma.RestaurantUncheckedUpdateWithoutSavedByInput>;
    create: Prisma.XOR<Prisma.RestaurantCreateWithoutSavedByInput, Prisma.RestaurantUncheckedCreateWithoutSavedByInput>;
    where?: Prisma.RestaurantWhereInput;
};
export type RestaurantUpdateToOneWithWhereWithoutSavedByInput = {
    where?: Prisma.RestaurantWhereInput;
    data: Prisma.XOR<Prisma.RestaurantUpdateWithoutSavedByInput, Prisma.RestaurantUncheckedUpdateWithoutSavedByInput>;
};
export type RestaurantUpdateWithoutSavedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutRestaurantNestedInput;
};
export type RestaurantUncheckedUpdateWithoutSavedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    address?: Prisma.StringFieldUpdateOperationsInput | string;
    city?: Prisma.StringFieldUpdateOperationsInput | string;
    state?: Prisma.StringFieldUpdateOperationsInput | string;
    zipCode?: Prisma.StringFieldUpdateOperationsInput | string;
    country?: Prisma.StringFieldUpdateOperationsInput | string;
    latitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    longitude?: Prisma.NullableFloatFieldUpdateOperationsInput | number | null;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    email?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    cuisineTypes?: Prisma.RestaurantUpdatecuisineTypesInput | string[];
    priceRange?: Prisma.IntFieldUpdateOperationsInput | number;
    locationCount?: Prisma.IntFieldUpdateOperationsInput | number;
    rating?: Prisma.FloatFieldUpdateOperationsInput | number;
    reviewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loyaltyProgramEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    pointsPerDollar?: Prisma.IntFieldUpdateOperationsInput | number;
    loyaltyApiProvider?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    loyaltyOauthConfig?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    qrSecret?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutRestaurantNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutRestaurantNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutRestaurantNestedInput;
    menuItems?: Prisma.MenuItemUncheckedUpdateManyWithoutRestaurantNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutRestaurantNestedInput;
    events?: Prisma.EventUncheckedUpdateManyWithoutRestaurantNestedInput;
    challenges?: Prisma.ChallengeUncheckedUpdateManyWithoutSponsorRestaurantNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutRestaurantNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutRestaurantNestedInput;
};
/**
 * Count Type RestaurantCountOutputType
 */
export type RestaurantCountOutputType = {
    pointsWallets: number;
    pointsTransactions: number;
    orders: number;
    menuItems: number;
    socialPosts: number;
    events: number;
    challenges: number;
    interactions: number;
    notInterested: number;
    savedBy: number;
};
export type RestaurantCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pointsWallets?: boolean | RestaurantCountOutputTypeCountPointsWalletsArgs;
    pointsTransactions?: boolean | RestaurantCountOutputTypeCountPointsTransactionsArgs;
    orders?: boolean | RestaurantCountOutputTypeCountOrdersArgs;
    menuItems?: boolean | RestaurantCountOutputTypeCountMenuItemsArgs;
    socialPosts?: boolean | RestaurantCountOutputTypeCountSocialPostsArgs;
    events?: boolean | RestaurantCountOutputTypeCountEventsArgs;
    challenges?: boolean | RestaurantCountOutputTypeCountChallengesArgs;
    interactions?: boolean | RestaurantCountOutputTypeCountInteractionsArgs;
    notInterested?: boolean | RestaurantCountOutputTypeCountNotInterestedArgs;
    savedBy?: boolean | RestaurantCountOutputTypeCountSavedByArgs;
};
/**
 * RestaurantCountOutputType without action
 */
export type RestaurantCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RestaurantCountOutputType
     */
    select?: Prisma.RestaurantCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * RestaurantCountOutputType without action
 */
export type RestaurantCountOutputTypeCountPointsWalletsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointsWalletWhereInput;
};
/**
 * RestaurantCountOutputType without action
 */
export type RestaurantCountOutputTypeCountPointsTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointsTransactionWhereInput;
};
/**
 * RestaurantCountOutputType without action
 */
export type RestaurantCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
/**
 * RestaurantCountOutputType without action
 */
export type RestaurantCountOutputTypeCountMenuItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.MenuItemWhereInput;
};
/**
 * RestaurantCountOutputType without action
 */
export type RestaurantCountOutputTypeCountSocialPostsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SocialPostWhereInput;
};
/**
 * RestaurantCountOutputType without action
 */
export type RestaurantCountOutputTypeCountEventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventWhereInput;
};
/**
 * RestaurantCountOutputType without action
 */
export type RestaurantCountOutputTypeCountChallengesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChallengeWhereInput;
};
/**
 * RestaurantCountOutputType without action
 */
export type RestaurantCountOutputTypeCountInteractionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserInteractionWhereInput;
};
/**
 * RestaurantCountOutputType without action
 */
export type RestaurantCountOutputTypeCountNotInterestedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotInterestedWhereInput;
};
/**
 * RestaurantCountOutputType without action
 */
export type RestaurantCountOutputTypeCountSavedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SavedRestaurantWhereInput;
};
export type RestaurantSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    address?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    country?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    phone?: boolean;
    email?: boolean;
    website?: boolean;
    imageUrl?: boolean;
    cuisineTypes?: boolean;
    priceRange?: boolean;
    locationCount?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: boolean;
    loyaltyApiProvider?: boolean;
    loyaltyOauthConfig?: boolean;
    qrSecret?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pointsWallets?: boolean | Prisma.Restaurant$pointsWalletsArgs<ExtArgs>;
    pointsTransactions?: boolean | Prisma.Restaurant$pointsTransactionsArgs<ExtArgs>;
    orders?: boolean | Prisma.Restaurant$ordersArgs<ExtArgs>;
    menuItems?: boolean | Prisma.Restaurant$menuItemsArgs<ExtArgs>;
    socialPosts?: boolean | Prisma.Restaurant$socialPostsArgs<ExtArgs>;
    events?: boolean | Prisma.Restaurant$eventsArgs<ExtArgs>;
    challenges?: boolean | Prisma.Restaurant$challengesArgs<ExtArgs>;
    interactions?: boolean | Prisma.Restaurant$interactionsArgs<ExtArgs>;
    notInterested?: boolean | Prisma.Restaurant$notInterestedArgs<ExtArgs>;
    savedBy?: boolean | Prisma.Restaurant$savedByArgs<ExtArgs>;
    _count?: boolean | Prisma.RestaurantCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["restaurant"]>;
export type RestaurantSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    address?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    country?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    phone?: boolean;
    email?: boolean;
    website?: boolean;
    imageUrl?: boolean;
    cuisineTypes?: boolean;
    priceRange?: boolean;
    locationCount?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: boolean;
    loyaltyApiProvider?: boolean;
    loyaltyOauthConfig?: boolean;
    qrSecret?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["restaurant"]>;
export type RestaurantSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    address?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    country?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    phone?: boolean;
    email?: boolean;
    website?: boolean;
    imageUrl?: boolean;
    cuisineTypes?: boolean;
    priceRange?: boolean;
    locationCount?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: boolean;
    loyaltyApiProvider?: boolean;
    loyaltyOauthConfig?: boolean;
    qrSecret?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["restaurant"]>;
export type RestaurantSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    address?: boolean;
    city?: boolean;
    state?: boolean;
    zipCode?: boolean;
    country?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    phone?: boolean;
    email?: boolean;
    website?: boolean;
    imageUrl?: boolean;
    cuisineTypes?: boolean;
    priceRange?: boolean;
    locationCount?: boolean;
    rating?: boolean;
    reviewCount?: boolean;
    isVerified?: boolean;
    isActive?: boolean;
    loyaltyProgramEnabled?: boolean;
    pointsPerDollar?: boolean;
    loyaltyApiProvider?: boolean;
    loyaltyOauthConfig?: boolean;
    qrSecret?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type RestaurantOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "address" | "city" | "state" | "zipCode" | "country" | "latitude" | "longitude" | "phone" | "email" | "website" | "imageUrl" | "cuisineTypes" | "priceRange" | "locationCount" | "rating" | "reviewCount" | "isVerified" | "isActive" | "loyaltyProgramEnabled" | "pointsPerDollar" | "loyaltyApiProvider" | "loyaltyOauthConfig" | "qrSecret" | "createdAt" | "updatedAt", ExtArgs["result"]["restaurant"]>;
export type RestaurantInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pointsWallets?: boolean | Prisma.Restaurant$pointsWalletsArgs<ExtArgs>;
    pointsTransactions?: boolean | Prisma.Restaurant$pointsTransactionsArgs<ExtArgs>;
    orders?: boolean | Prisma.Restaurant$ordersArgs<ExtArgs>;
    menuItems?: boolean | Prisma.Restaurant$menuItemsArgs<ExtArgs>;
    socialPosts?: boolean | Prisma.Restaurant$socialPostsArgs<ExtArgs>;
    events?: boolean | Prisma.Restaurant$eventsArgs<ExtArgs>;
    challenges?: boolean | Prisma.Restaurant$challengesArgs<ExtArgs>;
    interactions?: boolean | Prisma.Restaurant$interactionsArgs<ExtArgs>;
    notInterested?: boolean | Prisma.Restaurant$notInterestedArgs<ExtArgs>;
    savedBy?: boolean | Prisma.Restaurant$savedByArgs<ExtArgs>;
    _count?: boolean | Prisma.RestaurantCountOutputTypeDefaultArgs<ExtArgs>;
};
export type RestaurantIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type RestaurantIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $RestaurantPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Restaurant";
    objects: {
        pointsWallets: Prisma.$PointsWalletPayload<ExtArgs>[];
        pointsTransactions: Prisma.$PointsTransactionPayload<ExtArgs>[];
        orders: Prisma.$OrderPayload<ExtArgs>[];
        menuItems: Prisma.$MenuItemPayload<ExtArgs>[];
        socialPosts: Prisma.$SocialPostPayload<ExtArgs>[];
        events: Prisma.$EventPayload<ExtArgs>[];
        challenges: Prisma.$ChallengePayload<ExtArgs>[];
        interactions: Prisma.$UserInteractionPayload<ExtArgs>[];
        notInterested: Prisma.$NotInterestedPayload<ExtArgs>[];
        savedBy: Prisma.$SavedRestaurantPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        address: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
        latitude: number | null;
        longitude: number | null;
        phone: string | null;
        email: string | null;
        website: string | null;
        imageUrl: string | null;
        cuisineTypes: string[];
        priceRange: number;
        locationCount: number;
        rating: number;
        reviewCount: number;
        isVerified: boolean;
        isActive: boolean;
        loyaltyProgramEnabled: boolean;
        pointsPerDollar: number;
        loyaltyApiProvider: string | null;
        loyaltyOauthConfig: runtime.JsonValue | null;
        qrSecret: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["restaurant"]>;
    composites: {};
};
export type RestaurantGetPayload<S extends boolean | null | undefined | RestaurantDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RestaurantPayload, S>;
export type RestaurantCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RestaurantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RestaurantCountAggregateInputType | true;
};
export interface RestaurantDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Restaurant'];
        meta: {
            name: 'Restaurant';
        };
    };
    /**
     * Find zero or one Restaurant that matches the filter.
     * @param {RestaurantFindUniqueArgs} args - Arguments to find a Restaurant
     * @example
     * // Get one Restaurant
     * const restaurant = await prisma.restaurant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RestaurantFindUniqueArgs>(args: Prisma.SelectSubset<T, RestaurantFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Restaurant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RestaurantFindUniqueOrThrowArgs} args - Arguments to find a Restaurant
     * @example
     * // Get one Restaurant
     * const restaurant = await prisma.restaurant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RestaurantFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RestaurantFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Restaurant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantFindFirstArgs} args - Arguments to find a Restaurant
     * @example
     * // Get one Restaurant
     * const restaurant = await prisma.restaurant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RestaurantFindFirstArgs>(args?: Prisma.SelectSubset<T, RestaurantFindFirstArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Restaurant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantFindFirstOrThrowArgs} args - Arguments to find a Restaurant
     * @example
     * // Get one Restaurant
     * const restaurant = await prisma.restaurant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RestaurantFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RestaurantFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Restaurants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Restaurants
     * const restaurants = await prisma.restaurant.findMany()
     *
     * // Get first 10 Restaurants
     * const restaurants = await prisma.restaurant.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const restaurantWithIdOnly = await prisma.restaurant.findMany({ select: { id: true } })
     *
     */
    findMany<T extends RestaurantFindManyArgs>(args?: Prisma.SelectSubset<T, RestaurantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Restaurant.
     * @param {RestaurantCreateArgs} args - Arguments to create a Restaurant.
     * @example
     * // Create one Restaurant
     * const Restaurant = await prisma.restaurant.create({
     *   data: {
     *     // ... data to create a Restaurant
     *   }
     * })
     *
     */
    create<T extends RestaurantCreateArgs>(args: Prisma.SelectSubset<T, RestaurantCreateArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Restaurants.
     * @param {RestaurantCreateManyArgs} args - Arguments to create many Restaurants.
     * @example
     * // Create many Restaurants
     * const restaurant = await prisma.restaurant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends RestaurantCreateManyArgs>(args?: Prisma.SelectSubset<T, RestaurantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Restaurants and returns the data saved in the database.
     * @param {RestaurantCreateManyAndReturnArgs} args - Arguments to create many Restaurants.
     * @example
     * // Create many Restaurants
     * const restaurant = await prisma.restaurant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Restaurants and only return the `id`
     * const restaurantWithIdOnly = await prisma.restaurant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends RestaurantCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RestaurantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Restaurant.
     * @param {RestaurantDeleteArgs} args - Arguments to delete one Restaurant.
     * @example
     * // Delete one Restaurant
     * const Restaurant = await prisma.restaurant.delete({
     *   where: {
     *     // ... filter to delete one Restaurant
     *   }
     * })
     *
     */
    delete<T extends RestaurantDeleteArgs>(args: Prisma.SelectSubset<T, RestaurantDeleteArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Restaurant.
     * @param {RestaurantUpdateArgs} args - Arguments to update one Restaurant.
     * @example
     * // Update one Restaurant
     * const restaurant = await prisma.restaurant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends RestaurantUpdateArgs>(args: Prisma.SelectSubset<T, RestaurantUpdateArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Restaurants.
     * @param {RestaurantDeleteManyArgs} args - Arguments to filter Restaurants to delete.
     * @example
     * // Delete a few Restaurants
     * const { count } = await prisma.restaurant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends RestaurantDeleteManyArgs>(args?: Prisma.SelectSubset<T, RestaurantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Restaurants
     * const restaurant = await prisma.restaurant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends RestaurantUpdateManyArgs>(args: Prisma.SelectSubset<T, RestaurantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Restaurants and returns the data updated in the database.
     * @param {RestaurantUpdateManyAndReturnArgs} args - Arguments to update many Restaurants.
     * @example
     * // Update many Restaurants
     * const restaurant = await prisma.restaurant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Restaurants and only return the `id`
     * const restaurantWithIdOnly = await prisma.restaurant.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends RestaurantUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RestaurantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Restaurant.
     * @param {RestaurantUpsertArgs} args - Arguments to update or create a Restaurant.
     * @example
     * // Update or create a Restaurant
     * const restaurant = await prisma.restaurant.upsert({
     *   create: {
     *     // ... data to create a Restaurant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Restaurant we want to update
     *   }
     * })
     */
    upsert<T extends RestaurantUpsertArgs>(args: Prisma.SelectSubset<T, RestaurantUpsertArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Restaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantCountArgs} args - Arguments to filter Restaurants to count.
     * @example
     * // Count the number of Restaurants
     * const count = await prisma.restaurant.count({
     *   where: {
     *     // ... the filter for the Restaurants we want to count
     *   }
     * })
    **/
    count<T extends RestaurantCountArgs>(args?: Prisma.Subset<T, RestaurantCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RestaurantCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Restaurant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RestaurantAggregateArgs>(args: Prisma.Subset<T, RestaurantAggregateArgs>): Prisma.PrismaPromise<GetRestaurantAggregateType<T>>;
    /**
     * Group by Restaurant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RestaurantGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends RestaurantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RestaurantGroupByArgs['orderBy'];
    } : {
        orderBy?: RestaurantGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RestaurantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRestaurantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Restaurant model
     */
    readonly fields: RestaurantFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Restaurant.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__RestaurantClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    pointsWallets<T extends Prisma.Restaurant$pointsWalletsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Restaurant$pointsWalletsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    pointsTransactions<T extends Prisma.Restaurant$pointsTransactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Restaurant$pointsTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    orders<T extends Prisma.Restaurant$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Restaurant$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    menuItems<T extends Prisma.Restaurant$menuItemsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Restaurant$menuItemsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$MenuItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    socialPosts<T extends Prisma.Restaurant$socialPostsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Restaurant$socialPostsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SocialPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    events<T extends Prisma.Restaurant$eventsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Restaurant$eventsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    challenges<T extends Prisma.Restaurant$challengesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Restaurant$challengesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    interactions<T extends Prisma.Restaurant$interactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Restaurant$interactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    notInterested<T extends Prisma.Restaurant$notInterestedArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Restaurant$notInterestedArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    savedBy<T extends Prisma.Restaurant$savedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Restaurant$savedByArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Restaurant model
 */
export interface RestaurantFieldRefs {
    readonly id: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly name: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly description: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly address: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly city: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly state: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly zipCode: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly country: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly latitude: Prisma.FieldRef<"Restaurant", 'Float'>;
    readonly longitude: Prisma.FieldRef<"Restaurant", 'Float'>;
    readonly phone: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly email: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly website: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly cuisineTypes: Prisma.FieldRef<"Restaurant", 'String[]'>;
    readonly priceRange: Prisma.FieldRef<"Restaurant", 'Int'>;
    readonly locationCount: Prisma.FieldRef<"Restaurant", 'Int'>;
    readonly rating: Prisma.FieldRef<"Restaurant", 'Float'>;
    readonly reviewCount: Prisma.FieldRef<"Restaurant", 'Int'>;
    readonly isVerified: Prisma.FieldRef<"Restaurant", 'Boolean'>;
    readonly isActive: Prisma.FieldRef<"Restaurant", 'Boolean'>;
    readonly loyaltyProgramEnabled: Prisma.FieldRef<"Restaurant", 'Boolean'>;
    readonly pointsPerDollar: Prisma.FieldRef<"Restaurant", 'Int'>;
    readonly loyaltyApiProvider: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly loyaltyOauthConfig: Prisma.FieldRef<"Restaurant", 'Json'>;
    readonly qrSecret: Prisma.FieldRef<"Restaurant", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Restaurant", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Restaurant", 'DateTime'>;
}
/**
 * Restaurant findUnique
 */
export type RestaurantFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    /**
     * Filter, which Restaurant to fetch.
     */
    where: Prisma.RestaurantWhereUniqueInput;
};
/**
 * Restaurant findUniqueOrThrow
 */
export type RestaurantFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    /**
     * Filter, which Restaurant to fetch.
     */
    where: Prisma.RestaurantWhereUniqueInput;
};
/**
 * Restaurant findFirst
 */
export type RestaurantFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    /**
     * Filter, which Restaurant to fetch.
     */
    where?: Prisma.RestaurantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: Prisma.RestaurantOrderByWithRelationInput | Prisma.RestaurantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Restaurants.
     */
    cursor?: Prisma.RestaurantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Restaurants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Restaurants.
     */
    distinct?: Prisma.RestaurantScalarFieldEnum | Prisma.RestaurantScalarFieldEnum[];
};
/**
 * Restaurant findFirstOrThrow
 */
export type RestaurantFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    /**
     * Filter, which Restaurant to fetch.
     */
    where?: Prisma.RestaurantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: Prisma.RestaurantOrderByWithRelationInput | Prisma.RestaurantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Restaurants.
     */
    cursor?: Prisma.RestaurantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Restaurants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Restaurants.
     */
    distinct?: Prisma.RestaurantScalarFieldEnum | Prisma.RestaurantScalarFieldEnum[];
};
/**
 * Restaurant findMany
 */
export type RestaurantFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    /**
     * Filter, which Restaurants to fetch.
     */
    where?: Prisma.RestaurantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Restaurants to fetch.
     */
    orderBy?: Prisma.RestaurantOrderByWithRelationInput | Prisma.RestaurantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Restaurants.
     */
    cursor?: Prisma.RestaurantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Restaurants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Restaurants.
     */
    skip?: number;
    distinct?: Prisma.RestaurantScalarFieldEnum | Prisma.RestaurantScalarFieldEnum[];
};
/**
 * Restaurant create
 */
export type RestaurantCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    /**
     * The data needed to create a Restaurant.
     */
    data: Prisma.XOR<Prisma.RestaurantCreateInput, Prisma.RestaurantUncheckedCreateInput>;
};
/**
 * Restaurant createMany
 */
export type RestaurantCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Restaurants.
     */
    data: Prisma.RestaurantCreateManyInput | Prisma.RestaurantCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Restaurant createManyAndReturn
 */
export type RestaurantCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: Prisma.RestaurantSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    /**
     * The data used to create many Restaurants.
     */
    data: Prisma.RestaurantCreateManyInput | Prisma.RestaurantCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Restaurant update
 */
export type RestaurantUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    /**
     * The data needed to update a Restaurant.
     */
    data: Prisma.XOR<Prisma.RestaurantUpdateInput, Prisma.RestaurantUncheckedUpdateInput>;
    /**
     * Choose, which Restaurant to update.
     */
    where: Prisma.RestaurantWhereUniqueInput;
};
/**
 * Restaurant updateMany
 */
export type RestaurantUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Restaurants.
     */
    data: Prisma.XOR<Prisma.RestaurantUpdateManyMutationInput, Prisma.RestaurantUncheckedUpdateManyInput>;
    /**
     * Filter which Restaurants to update
     */
    where?: Prisma.RestaurantWhereInput;
    /**
     * Limit how many Restaurants to update.
     */
    limit?: number;
};
/**
 * Restaurant updateManyAndReturn
 */
export type RestaurantUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: Prisma.RestaurantSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    /**
     * The data used to update Restaurants.
     */
    data: Prisma.XOR<Prisma.RestaurantUpdateManyMutationInput, Prisma.RestaurantUncheckedUpdateManyInput>;
    /**
     * Filter which Restaurants to update
     */
    where?: Prisma.RestaurantWhereInput;
    /**
     * Limit how many Restaurants to update.
     */
    limit?: number;
};
/**
 * Restaurant upsert
 */
export type RestaurantUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    /**
     * The filter to search for the Restaurant to update in case it exists.
     */
    where: Prisma.RestaurantWhereUniqueInput;
    /**
     * In case the Restaurant found by the `where` argument doesn't exist, create a new Restaurant with this data.
     */
    create: Prisma.XOR<Prisma.RestaurantCreateInput, Prisma.RestaurantUncheckedCreateInput>;
    /**
     * In case the Restaurant was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.RestaurantUpdateInput, Prisma.RestaurantUncheckedUpdateInput>;
};
/**
 * Restaurant delete
 */
export type RestaurantDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
    /**
     * Filter which Restaurant to delete.
     */
    where: Prisma.RestaurantWhereUniqueInput;
};
/**
 * Restaurant deleteMany
 */
export type RestaurantDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Restaurants to delete
     */
    where?: Prisma.RestaurantWhereInput;
    /**
     * Limit how many Restaurants to delete.
     */
    limit?: number;
};
/**
 * Restaurant.pointsWallets
 */
export type Restaurant$pointsWalletsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsWallet
     */
    select?: Prisma.PointsWalletSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PointsWallet
     */
    omit?: Prisma.PointsWalletOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PointsWalletInclude<ExtArgs> | null;
    where?: Prisma.PointsWalletWhereInput;
    orderBy?: Prisma.PointsWalletOrderByWithRelationInput | Prisma.PointsWalletOrderByWithRelationInput[];
    cursor?: Prisma.PointsWalletWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PointsWalletScalarFieldEnum | Prisma.PointsWalletScalarFieldEnum[];
};
/**
 * Restaurant.pointsTransactions
 */
export type Restaurant$pointsTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: Prisma.PointsTransactionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PointsTransaction
     */
    omit?: Prisma.PointsTransactionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PointsTransactionInclude<ExtArgs> | null;
    where?: Prisma.PointsTransactionWhereInput;
    orderBy?: Prisma.PointsTransactionOrderByWithRelationInput | Prisma.PointsTransactionOrderByWithRelationInput[];
    cursor?: Prisma.PointsTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PointsTransactionScalarFieldEnum | Prisma.PointsTransactionScalarFieldEnum[];
};
/**
 * Restaurant.orders
 */
export type Restaurant$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: Prisma.OrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Order
     */
    omit?: Prisma.OrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.OrderInclude<ExtArgs> | null;
    where?: Prisma.OrderWhereInput;
    orderBy?: Prisma.OrderOrderByWithRelationInput | Prisma.OrderOrderByWithRelationInput[];
    cursor?: Prisma.OrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrderScalarFieldEnum | Prisma.OrderScalarFieldEnum[];
};
/**
 * Restaurant.menuItems
 */
export type Restaurant$menuItemsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuItem
     */
    select?: Prisma.MenuItemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the MenuItem
     */
    omit?: Prisma.MenuItemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.MenuItemInclude<ExtArgs> | null;
    where?: Prisma.MenuItemWhereInput;
    orderBy?: Prisma.MenuItemOrderByWithRelationInput | Prisma.MenuItemOrderByWithRelationInput[];
    cursor?: Prisma.MenuItemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.MenuItemScalarFieldEnum | Prisma.MenuItemScalarFieldEnum[];
};
/**
 * Restaurant.socialPosts
 */
export type Restaurant$socialPostsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialPost
     */
    select?: Prisma.SocialPostSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SocialPost
     */
    omit?: Prisma.SocialPostOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SocialPostInclude<ExtArgs> | null;
    where?: Prisma.SocialPostWhereInput;
    orderBy?: Prisma.SocialPostOrderByWithRelationInput | Prisma.SocialPostOrderByWithRelationInput[];
    cursor?: Prisma.SocialPostWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SocialPostScalarFieldEnum | Prisma.SocialPostScalarFieldEnum[];
};
/**
 * Restaurant.events
 */
export type Restaurant$eventsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: Prisma.EventSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Event
     */
    omit?: Prisma.EventOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventInclude<ExtArgs> | null;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput | Prisma.EventOrderByWithRelationInput[];
    cursor?: Prisma.EventWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventScalarFieldEnum | Prisma.EventScalarFieldEnum[];
};
/**
 * Restaurant.challenges
 */
export type Restaurant$challengesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Challenge
     */
    select?: Prisma.ChallengeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Challenge
     */
    omit?: Prisma.ChallengeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChallengeInclude<ExtArgs> | null;
    where?: Prisma.ChallengeWhereInput;
    orderBy?: Prisma.ChallengeOrderByWithRelationInput | Prisma.ChallengeOrderByWithRelationInput[];
    cursor?: Prisma.ChallengeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChallengeScalarFieldEnum | Prisma.ChallengeScalarFieldEnum[];
};
/**
 * Restaurant.interactions
 */
export type Restaurant$interactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: Prisma.UserInteractionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: Prisma.UserInteractionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInteractionInclude<ExtArgs> | null;
    where?: Prisma.UserInteractionWhereInput;
    orderBy?: Prisma.UserInteractionOrderByWithRelationInput | Prisma.UserInteractionOrderByWithRelationInput[];
    cursor?: Prisma.UserInteractionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserInteractionScalarFieldEnum | Prisma.UserInteractionScalarFieldEnum[];
};
/**
 * Restaurant.notInterested
 */
export type Restaurant$notInterestedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotInterested
     */
    select?: Prisma.NotInterestedSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the NotInterested
     */
    omit?: Prisma.NotInterestedOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotInterestedInclude<ExtArgs> | null;
    where?: Prisma.NotInterestedWhereInput;
    orderBy?: Prisma.NotInterestedOrderByWithRelationInput | Prisma.NotInterestedOrderByWithRelationInput[];
    cursor?: Prisma.NotInterestedWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.NotInterestedScalarFieldEnum | Prisma.NotInterestedScalarFieldEnum[];
};
/**
 * Restaurant.savedBy
 */
export type Restaurant$savedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRestaurant
     */
    select?: Prisma.SavedRestaurantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the SavedRestaurant
     */
    omit?: Prisma.SavedRestaurantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SavedRestaurantInclude<ExtArgs> | null;
    where?: Prisma.SavedRestaurantWhereInput;
    orderBy?: Prisma.SavedRestaurantOrderByWithRelationInput | Prisma.SavedRestaurantOrderByWithRelationInput[];
    cursor?: Prisma.SavedRestaurantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SavedRestaurantScalarFieldEnum | Prisma.SavedRestaurantScalarFieldEnum[];
};
/**
 * Restaurant without action
 */
export type RestaurantDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Restaurant
     */
    select?: Prisma.RestaurantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Restaurant
     */
    omit?: Prisma.RestaurantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RestaurantInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Restaurant.d.ts.map