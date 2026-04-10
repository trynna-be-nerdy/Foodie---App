import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    name: string | null;
    phone: string | null;
    profilePhoto: string | null;
    role: $Enums.UserRole | null;
    isVerified: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    name: string | null;
    phone: string | null;
    profilePhoto: string | null;
    role: $Enums.UserRole | null;
    isVerified: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    passwordHash: number;
    name: number;
    phone: number;
    profilePhoto: number;
    role: number;
    isVerified: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    name?: true;
    phone?: true;
    profilePhoto?: true;
    role?: true;
    isVerified?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    name?: true;
    phone?: true;
    profilePhoto?: true;
    role?: true;
    isVerified?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    name?: true;
    phone?: true;
    profilePhoto?: true;
    role?: true;
    isVerified?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    phone: string | null;
    profilePhoto: string | null;
    role: $Enums.UserRole;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    phone?: Prisma.StringNullableFilter<"User"> | string | null;
    profilePhoto?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    isVerified?: Prisma.BoolFilter<"User"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    pointsWallets?: Prisma.PointsWalletListRelationFilter;
    pointsTransactions?: Prisma.PointsTransactionListRelationFilter;
    foodiePoints?: Prisma.XOR<Prisma.FoodiePointsNullableScalarRelationFilter, Prisma.FoodiePointsWhereInput> | null;
    orders?: Prisma.OrderListRelationFilter;
    socialPosts?: Prisma.SocialPostListRelationFilter;
    comments?: Prisma.CommentListRelationFilter;
    likes?: Prisma.LikeListRelationFilter;
    challengeParticipants?: Prisma.ChallengeParticipantListRelationFilter;
    eventRegistrations?: Prisma.EventRegistrationListRelationFilter;
    donations?: Prisma.DonationListRelationFilter;
    interactions?: Prisma.UserInteractionListRelationFilter;
    notInterested?: Prisma.NotInterestedListRelationFilter;
    savedRestaurants?: Prisma.SavedRestaurantListRelationFilter;
    followers?: Prisma.FollowListRelationFilter;
    following?: Prisma.FollowListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    profilePhoto?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    pointsWallets?: Prisma.PointsWalletOrderByRelationAggregateInput;
    pointsTransactions?: Prisma.PointsTransactionOrderByRelationAggregateInput;
    foodiePoints?: Prisma.FoodiePointsOrderByWithRelationInput;
    orders?: Prisma.OrderOrderByRelationAggregateInput;
    socialPosts?: Prisma.SocialPostOrderByRelationAggregateInput;
    comments?: Prisma.CommentOrderByRelationAggregateInput;
    likes?: Prisma.LikeOrderByRelationAggregateInput;
    challengeParticipants?: Prisma.ChallengeParticipantOrderByRelationAggregateInput;
    eventRegistrations?: Prisma.EventRegistrationOrderByRelationAggregateInput;
    donations?: Prisma.DonationOrderByRelationAggregateInput;
    interactions?: Prisma.UserInteractionOrderByRelationAggregateInput;
    notInterested?: Prisma.NotInterestedOrderByRelationAggregateInput;
    savedRestaurants?: Prisma.SavedRestaurantOrderByRelationAggregateInput;
    followers?: Prisma.FollowOrderByRelationAggregateInput;
    following?: Prisma.FollowOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    passwordHash?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    phone?: Prisma.StringNullableFilter<"User"> | string | null;
    profilePhoto?: Prisma.StringNullableFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    isVerified?: Prisma.BoolFilter<"User"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    pointsWallets?: Prisma.PointsWalletListRelationFilter;
    pointsTransactions?: Prisma.PointsTransactionListRelationFilter;
    foodiePoints?: Prisma.XOR<Prisma.FoodiePointsNullableScalarRelationFilter, Prisma.FoodiePointsWhereInput> | null;
    orders?: Prisma.OrderListRelationFilter;
    socialPosts?: Prisma.SocialPostListRelationFilter;
    comments?: Prisma.CommentListRelationFilter;
    likes?: Prisma.LikeListRelationFilter;
    challengeParticipants?: Prisma.ChallengeParticipantListRelationFilter;
    eventRegistrations?: Prisma.EventRegistrationListRelationFilter;
    donations?: Prisma.DonationListRelationFilter;
    interactions?: Prisma.UserInteractionListRelationFilter;
    notInterested?: Prisma.NotInterestedListRelationFilter;
    savedRestaurants?: Prisma.SavedRestaurantListRelationFilter;
    followers?: Prisma.FollowListRelationFilter;
    following?: Prisma.FollowListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    profilePhoto?: Prisma.SortOrderInput | Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    phone?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    profilePhoto?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    role?: Prisma.EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole;
    isVerified?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    profilePhoto?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    profilePhoto?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    profilePhoto?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserCreateNestedOneWithoutPointsWalletsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPointsWalletsInput, Prisma.UserUncheckedCreateWithoutPointsWalletsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPointsWalletsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPointsWalletsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPointsWalletsInput, Prisma.UserUncheckedCreateWithoutPointsWalletsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPointsWalletsInput;
    upsert?: Prisma.UserUpsertWithoutPointsWalletsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPointsWalletsInput, Prisma.UserUpdateWithoutPointsWalletsInput>, Prisma.UserUncheckedUpdateWithoutPointsWalletsInput>;
};
export type UserCreateNestedOneWithoutPointsTransactionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPointsTransactionsInput, Prisma.UserUncheckedCreateWithoutPointsTransactionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPointsTransactionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutPointsTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPointsTransactionsInput, Prisma.UserUncheckedCreateWithoutPointsTransactionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPointsTransactionsInput;
    upsert?: Prisma.UserUpsertWithoutPointsTransactionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPointsTransactionsInput, Prisma.UserUpdateWithoutPointsTransactionsInput>, Prisma.UserUncheckedUpdateWithoutPointsTransactionsInput>;
};
export type UserCreateNestedOneWithoutFoodiePointsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFoodiePointsInput, Prisma.UserUncheckedCreateWithoutFoodiePointsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFoodiePointsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutFoodiePointsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFoodiePointsInput, Prisma.UserUncheckedCreateWithoutFoodiePointsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFoodiePointsInput;
    upsert?: Prisma.UserUpsertWithoutFoodiePointsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutFoodiePointsInput, Prisma.UserUpdateWithoutFoodiePointsInput>, Prisma.UserUncheckedUpdateWithoutFoodiePointsInput>;
};
export type UserCreateNestedOneWithoutOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutOrdersInput;
    upsert?: Prisma.UserUpsertWithoutOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutOrdersInput, Prisma.UserUpdateWithoutOrdersInput>, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
};
export type UserCreateNestedOneWithoutSocialPostsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSocialPostsInput, Prisma.UserUncheckedCreateWithoutSocialPostsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSocialPostsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSocialPostsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSocialPostsInput, Prisma.UserUncheckedCreateWithoutSocialPostsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSocialPostsInput;
    upsert?: Prisma.UserUpsertWithoutSocialPostsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSocialPostsInput, Prisma.UserUpdateWithoutSocialPostsInput>, Prisma.UserUncheckedUpdateWithoutSocialPostsInput>;
};
export type UserCreateNestedOneWithoutCommentsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCommentsInput, Prisma.UserUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCommentsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutCommentsInput, Prisma.UserUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutCommentsInput;
    upsert?: Prisma.UserUpsertWithoutCommentsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutCommentsInput, Prisma.UserUpdateWithoutCommentsInput>, Prisma.UserUncheckedUpdateWithoutCommentsInput>;
};
export type UserCreateNestedOneWithoutLikesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutLikesInput, Prisma.UserUncheckedCreateWithoutLikesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutLikesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutLikesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutLikesInput, Prisma.UserUncheckedCreateWithoutLikesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutLikesInput;
    upsert?: Prisma.UserUpsertWithoutLikesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutLikesInput, Prisma.UserUpdateWithoutLikesInput>, Prisma.UserUncheckedUpdateWithoutLikesInput>;
};
export type UserCreateNestedOneWithoutFollowingInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFollowingInput, Prisma.UserUncheckedCreateWithoutFollowingInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFollowingInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutFollowersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFollowersInput, Prisma.UserUncheckedCreateWithoutFollowersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFollowersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutFollowingNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFollowingInput, Prisma.UserUncheckedCreateWithoutFollowingInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFollowingInput;
    upsert?: Prisma.UserUpsertWithoutFollowingInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutFollowingInput, Prisma.UserUpdateWithoutFollowingInput>, Prisma.UserUncheckedUpdateWithoutFollowingInput>;
};
export type UserUpdateOneRequiredWithoutFollowersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutFollowersInput, Prisma.UserUncheckedCreateWithoutFollowersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutFollowersInput;
    upsert?: Prisma.UserUpsertWithoutFollowersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutFollowersInput, Prisma.UserUpdateWithoutFollowersInput>, Prisma.UserUncheckedUpdateWithoutFollowersInput>;
};
export type UserCreateNestedOneWithoutInteractionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInteractionsInput, Prisma.UserUncheckedCreateWithoutInteractionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInteractionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutInteractionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutInteractionsInput, Prisma.UserUncheckedCreateWithoutInteractionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutInteractionsInput;
    upsert?: Prisma.UserUpsertWithoutInteractionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutInteractionsInput, Prisma.UserUpdateWithoutInteractionsInput>, Prisma.UserUncheckedUpdateWithoutInteractionsInput>;
};
export type UserCreateNestedOneWithoutChallengeParticipantsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutChallengeParticipantsInput, Prisma.UserUncheckedCreateWithoutChallengeParticipantsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutChallengeParticipantsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutChallengeParticipantsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutChallengeParticipantsInput, Prisma.UserUncheckedCreateWithoutChallengeParticipantsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutChallengeParticipantsInput;
    upsert?: Prisma.UserUpsertWithoutChallengeParticipantsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutChallengeParticipantsInput, Prisma.UserUpdateWithoutChallengeParticipantsInput>, Prisma.UserUncheckedUpdateWithoutChallengeParticipantsInput>;
};
export type UserCreateNestedOneWithoutEventRegistrationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEventRegistrationsInput, Prisma.UserUncheckedCreateWithoutEventRegistrationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEventRegistrationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutEventRegistrationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEventRegistrationsInput, Prisma.UserUncheckedCreateWithoutEventRegistrationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEventRegistrationsInput;
    upsert?: Prisma.UserUpsertWithoutEventRegistrationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutEventRegistrationsInput, Prisma.UserUpdateWithoutEventRegistrationsInput>, Prisma.UserUncheckedUpdateWithoutEventRegistrationsInput>;
};
export type UserCreateNestedOneWithoutDonationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDonationsInput, Prisma.UserUncheckedCreateWithoutDonationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDonationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutDonationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDonationsInput, Prisma.UserUncheckedCreateWithoutDonationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDonationsInput;
    upsert?: Prisma.UserUpsertWithoutDonationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutDonationsInput, Prisma.UserUpdateWithoutDonationsInput>, Prisma.UserUncheckedUpdateWithoutDonationsInput>;
};
export type UserCreateNestedOneWithoutNotInterestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotInterestedInput, Prisma.UserUncheckedCreateWithoutNotInterestedInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotInterestedInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutNotInterestedNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutNotInterestedInput, Prisma.UserUncheckedCreateWithoutNotInterestedInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutNotInterestedInput;
    upsert?: Prisma.UserUpsertWithoutNotInterestedInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutNotInterestedInput, Prisma.UserUpdateWithoutNotInterestedInput>, Prisma.UserUncheckedUpdateWithoutNotInterestedInput>;
};
export type UserCreateNestedOneWithoutSavedRestaurantsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSavedRestaurantsInput, Prisma.UserUncheckedCreateWithoutSavedRestaurantsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSavedRestaurantsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSavedRestaurantsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSavedRestaurantsInput, Prisma.UserUncheckedCreateWithoutSavedRestaurantsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSavedRestaurantsInput;
    upsert?: Prisma.UserUpsertWithoutSavedRestaurantsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSavedRestaurantsInput, Prisma.UserUpdateWithoutSavedRestaurantsInput>, Prisma.UserUncheckedUpdateWithoutSavedRestaurantsInput>;
};
export type UserCreateWithoutPointsWalletsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutPointsWalletsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutPointsWalletsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPointsWalletsInput, Prisma.UserUncheckedCreateWithoutPointsWalletsInput>;
};
export type UserUpsertWithoutPointsWalletsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPointsWalletsInput, Prisma.UserUncheckedUpdateWithoutPointsWalletsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPointsWalletsInput, Prisma.UserUncheckedCreateWithoutPointsWalletsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPointsWalletsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPointsWalletsInput, Prisma.UserUncheckedUpdateWithoutPointsWalletsInput>;
};
export type UserUpdateWithoutPointsWalletsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutPointsWalletsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateWithoutPointsTransactionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutPointsTransactionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutPointsTransactionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPointsTransactionsInput, Prisma.UserUncheckedCreateWithoutPointsTransactionsInput>;
};
export type UserUpsertWithoutPointsTransactionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPointsTransactionsInput, Prisma.UserUncheckedUpdateWithoutPointsTransactionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPointsTransactionsInput, Prisma.UserUncheckedCreateWithoutPointsTransactionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPointsTransactionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPointsTransactionsInput, Prisma.UserUncheckedUpdateWithoutPointsTransactionsInput>;
};
export type UserUpdateWithoutPointsTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutPointsTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateWithoutFoodiePointsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutFoodiePointsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutFoodiePointsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutFoodiePointsInput, Prisma.UserUncheckedCreateWithoutFoodiePointsInput>;
};
export type UserUpsertWithoutFoodiePointsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutFoodiePointsInput, Prisma.UserUncheckedUpdateWithoutFoodiePointsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutFoodiePointsInput, Prisma.UserUncheckedCreateWithoutFoodiePointsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutFoodiePointsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutFoodiePointsInput, Prisma.UserUncheckedUpdateWithoutFoodiePointsInput>;
};
export type UserUpdateWithoutFoodiePointsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutFoodiePointsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateWithoutOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
};
export type UserUpsertWithoutOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutOrdersInput, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutOrdersInput, Prisma.UserUncheckedCreateWithoutOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutOrdersInput, Prisma.UserUncheckedUpdateWithoutOrdersInput>;
};
export type UserUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateWithoutSocialPostsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutSocialPostsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutSocialPostsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSocialPostsInput, Prisma.UserUncheckedCreateWithoutSocialPostsInput>;
};
export type UserUpsertWithoutSocialPostsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSocialPostsInput, Prisma.UserUncheckedUpdateWithoutSocialPostsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSocialPostsInput, Prisma.UserUncheckedCreateWithoutSocialPostsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSocialPostsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSocialPostsInput, Prisma.UserUncheckedUpdateWithoutSocialPostsInput>;
};
export type UserUpdateWithoutSocialPostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutSocialPostsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateWithoutCommentsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutCommentsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutCommentsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutCommentsInput, Prisma.UserUncheckedCreateWithoutCommentsInput>;
};
export type UserUpsertWithoutCommentsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutCommentsInput, Prisma.UserUncheckedUpdateWithoutCommentsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutCommentsInput, Prisma.UserUncheckedCreateWithoutCommentsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutCommentsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutCommentsInput, Prisma.UserUncheckedUpdateWithoutCommentsInput>;
};
export type UserUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateWithoutLikesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutLikesInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutLikesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutLikesInput, Prisma.UserUncheckedCreateWithoutLikesInput>;
};
export type UserUpsertWithoutLikesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutLikesInput, Prisma.UserUncheckedUpdateWithoutLikesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutLikesInput, Prisma.UserUncheckedCreateWithoutLikesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutLikesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutLikesInput, Prisma.UserUncheckedUpdateWithoutLikesInput>;
};
export type UserUpdateWithoutLikesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutLikesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateWithoutFollowingInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
};
export type UserUncheckedCreateWithoutFollowingInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
};
export type UserCreateOrConnectWithoutFollowingInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutFollowingInput, Prisma.UserUncheckedCreateWithoutFollowingInput>;
};
export type UserCreateWithoutFollowersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutFollowersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutFollowersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutFollowersInput, Prisma.UserUncheckedCreateWithoutFollowersInput>;
};
export type UserUpsertWithoutFollowingInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutFollowingInput, Prisma.UserUncheckedUpdateWithoutFollowingInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutFollowingInput, Prisma.UserUncheckedCreateWithoutFollowingInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutFollowingInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutFollowingInput, Prisma.UserUncheckedUpdateWithoutFollowingInput>;
};
export type UserUpdateWithoutFollowingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
};
export type UserUncheckedUpdateWithoutFollowingInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
};
export type UserUpsertWithoutFollowersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutFollowersInput, Prisma.UserUncheckedUpdateWithoutFollowersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutFollowersInput, Prisma.UserUncheckedCreateWithoutFollowersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutFollowersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutFollowersInput, Prisma.UserUncheckedUpdateWithoutFollowersInput>;
};
export type UserUpdateWithoutFollowersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutFollowersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateWithoutInteractionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutInteractionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutInteractionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutInteractionsInput, Prisma.UserUncheckedCreateWithoutInteractionsInput>;
};
export type UserUpsertWithoutInteractionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutInteractionsInput, Prisma.UserUncheckedUpdateWithoutInteractionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutInteractionsInput, Prisma.UserUncheckedCreateWithoutInteractionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutInteractionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutInteractionsInput, Prisma.UserUncheckedUpdateWithoutInteractionsInput>;
};
export type UserUpdateWithoutInteractionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutInteractionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateWithoutChallengeParticipantsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutChallengeParticipantsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutChallengeParticipantsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutChallengeParticipantsInput, Prisma.UserUncheckedCreateWithoutChallengeParticipantsInput>;
};
export type UserUpsertWithoutChallengeParticipantsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutChallengeParticipantsInput, Prisma.UserUncheckedUpdateWithoutChallengeParticipantsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutChallengeParticipantsInput, Prisma.UserUncheckedCreateWithoutChallengeParticipantsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutChallengeParticipantsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutChallengeParticipantsInput, Prisma.UserUncheckedUpdateWithoutChallengeParticipantsInput>;
};
export type UserUpdateWithoutChallengeParticipantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutChallengeParticipantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateWithoutEventRegistrationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutEventRegistrationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutEventRegistrationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutEventRegistrationsInput, Prisma.UserUncheckedCreateWithoutEventRegistrationsInput>;
};
export type UserUpsertWithoutEventRegistrationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutEventRegistrationsInput, Prisma.UserUncheckedUpdateWithoutEventRegistrationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutEventRegistrationsInput, Prisma.UserUncheckedCreateWithoutEventRegistrationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutEventRegistrationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutEventRegistrationsInput, Prisma.UserUncheckedUpdateWithoutEventRegistrationsInput>;
};
export type UserUpdateWithoutEventRegistrationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutEventRegistrationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateWithoutDonationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutDonationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutDonationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutDonationsInput, Prisma.UserUncheckedCreateWithoutDonationsInput>;
};
export type UserUpsertWithoutDonationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutDonationsInput, Prisma.UserUncheckedUpdateWithoutDonationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutDonationsInput, Prisma.UserUncheckedCreateWithoutDonationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutDonationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutDonationsInput, Prisma.UserUncheckedUpdateWithoutDonationsInput>;
};
export type UserUpdateWithoutDonationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutDonationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateWithoutNotInterestedInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutNotInterestedInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutNotInterestedInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotInterestedInput, Prisma.UserUncheckedCreateWithoutNotInterestedInput>;
};
export type UserUpsertWithoutNotInterestedInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutNotInterestedInput, Prisma.UserUncheckedUpdateWithoutNotInterestedInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutNotInterestedInput, Prisma.UserUncheckedCreateWithoutNotInterestedInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutNotInterestedInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutNotInterestedInput, Prisma.UserUncheckedUpdateWithoutNotInterestedInput>;
};
export type UserUpdateWithoutNotInterestedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutNotInterestedInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    savedRestaurants?: Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
export type UserCreateWithoutSavedRestaurantsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowCreateNestedManyWithoutFollowerInput;
};
export type UserUncheckedCreateWithoutSavedRestaurantsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    phone?: string | null;
    profilePhoto?: string | null;
    role?: $Enums.UserRole;
    isVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedCreateNestedManyWithoutUserInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedCreateNestedManyWithoutUserInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedCreateNestedOneWithoutUserInput;
    orders?: Prisma.OrderUncheckedCreateNestedManyWithoutUserInput;
    socialPosts?: Prisma.SocialPostUncheckedCreateNestedManyWithoutUserInput;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutUserInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutUserInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedCreateNestedManyWithoutUserInput;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutUserInput;
    interactions?: Prisma.UserInteractionUncheckedCreateNestedManyWithoutUserInput;
    notInterested?: Prisma.NotInterestedUncheckedCreateNestedManyWithoutUserInput;
    followers?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowingInput;
    following?: Prisma.FollowUncheckedCreateNestedManyWithoutFollowerInput;
};
export type UserCreateOrConnectWithoutSavedRestaurantsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSavedRestaurantsInput, Prisma.UserUncheckedCreateWithoutSavedRestaurantsInput>;
};
export type UserUpsertWithoutSavedRestaurantsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSavedRestaurantsInput, Prisma.UserUncheckedUpdateWithoutSavedRestaurantsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSavedRestaurantsInput, Prisma.UserUncheckedCreateWithoutSavedRestaurantsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSavedRestaurantsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSavedRestaurantsInput, Prisma.UserUncheckedUpdateWithoutSavedRestaurantsInput>;
};
export type UserUpdateWithoutSavedRestaurantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUpdateManyWithoutFollowerNestedInput;
};
export type UserUncheckedUpdateWithoutSavedRestaurantsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    profilePhoto?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    pointsWallets?: Prisma.PointsWalletUncheckedUpdateManyWithoutUserNestedInput;
    pointsTransactions?: Prisma.PointsTransactionUncheckedUpdateManyWithoutUserNestedInput;
    foodiePoints?: Prisma.FoodiePointsUncheckedUpdateOneWithoutUserNestedInput;
    orders?: Prisma.OrderUncheckedUpdateManyWithoutUserNestedInput;
    socialPosts?: Prisma.SocialPostUncheckedUpdateManyWithoutUserNestedInput;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutUserNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutUserNestedInput;
    challengeParticipants?: Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput;
    eventRegistrations?: Prisma.EventRegistrationUncheckedUpdateManyWithoutUserNestedInput;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutUserNestedInput;
    interactions?: Prisma.UserInteractionUncheckedUpdateManyWithoutUserNestedInput;
    notInterested?: Prisma.NotInterestedUncheckedUpdateManyWithoutUserNestedInput;
    followers?: Prisma.FollowUncheckedUpdateManyWithoutFollowingNestedInput;
    following?: Prisma.FollowUncheckedUpdateManyWithoutFollowerNestedInput;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    pointsWallets: number;
    pointsTransactions: number;
    orders: number;
    socialPosts: number;
    comments: number;
    likes: number;
    challengeParticipants: number;
    eventRegistrations: number;
    donations: number;
    interactions: number;
    notInterested: number;
    savedRestaurants: number;
    followers: number;
    following: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pointsWallets?: boolean | UserCountOutputTypeCountPointsWalletsArgs;
    pointsTransactions?: boolean | UserCountOutputTypeCountPointsTransactionsArgs;
    orders?: boolean | UserCountOutputTypeCountOrdersArgs;
    socialPosts?: boolean | UserCountOutputTypeCountSocialPostsArgs;
    comments?: boolean | UserCountOutputTypeCountCommentsArgs;
    likes?: boolean | UserCountOutputTypeCountLikesArgs;
    challengeParticipants?: boolean | UserCountOutputTypeCountChallengeParticipantsArgs;
    eventRegistrations?: boolean | UserCountOutputTypeCountEventRegistrationsArgs;
    donations?: boolean | UserCountOutputTypeCountDonationsArgs;
    interactions?: boolean | UserCountOutputTypeCountInteractionsArgs;
    notInterested?: boolean | UserCountOutputTypeCountNotInterestedArgs;
    savedRestaurants?: boolean | UserCountOutputTypeCountSavedRestaurantsArgs;
    followers?: boolean | UserCountOutputTypeCountFollowersArgs;
    following?: boolean | UserCountOutputTypeCountFollowingArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountPointsWalletsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointsWalletWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountPointsTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointsTransactionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSocialPostsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SocialPostWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountCommentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountLikesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LikeWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountChallengeParticipantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChallengeParticipantWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountEventRegistrationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventRegistrationWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountDonationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DonationWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountInteractionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserInteractionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountNotInterestedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotInterestedWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSavedRestaurantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SavedRestaurantWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountFollowersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FollowWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountFollowingArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FollowWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    name?: boolean;
    phone?: boolean;
    profilePhoto?: boolean;
    role?: boolean;
    isVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    pointsWallets?: boolean | Prisma.User$pointsWalletsArgs<ExtArgs>;
    pointsTransactions?: boolean | Prisma.User$pointsTransactionsArgs<ExtArgs>;
    foodiePoints?: boolean | Prisma.User$foodiePointsArgs<ExtArgs>;
    orders?: boolean | Prisma.User$ordersArgs<ExtArgs>;
    socialPosts?: boolean | Prisma.User$socialPostsArgs<ExtArgs>;
    comments?: boolean | Prisma.User$commentsArgs<ExtArgs>;
    likes?: boolean | Prisma.User$likesArgs<ExtArgs>;
    challengeParticipants?: boolean | Prisma.User$challengeParticipantsArgs<ExtArgs>;
    eventRegistrations?: boolean | Prisma.User$eventRegistrationsArgs<ExtArgs>;
    donations?: boolean | Prisma.User$donationsArgs<ExtArgs>;
    interactions?: boolean | Prisma.User$interactionsArgs<ExtArgs>;
    notInterested?: boolean | Prisma.User$notInterestedArgs<ExtArgs>;
    savedRestaurants?: boolean | Prisma.User$savedRestaurantsArgs<ExtArgs>;
    followers?: boolean | Prisma.User$followersArgs<ExtArgs>;
    following?: boolean | Prisma.User$followingArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    name?: boolean;
    phone?: boolean;
    profilePhoto?: boolean;
    role?: boolean;
    isVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    name?: boolean;
    phone?: boolean;
    profilePhoto?: boolean;
    role?: boolean;
    isVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    name?: boolean;
    phone?: boolean;
    profilePhoto?: boolean;
    role?: boolean;
    isVerified?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "passwordHash" | "name" | "phone" | "profilePhoto" | "role" | "isVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pointsWallets?: boolean | Prisma.User$pointsWalletsArgs<ExtArgs>;
    pointsTransactions?: boolean | Prisma.User$pointsTransactionsArgs<ExtArgs>;
    foodiePoints?: boolean | Prisma.User$foodiePointsArgs<ExtArgs>;
    orders?: boolean | Prisma.User$ordersArgs<ExtArgs>;
    socialPosts?: boolean | Prisma.User$socialPostsArgs<ExtArgs>;
    comments?: boolean | Prisma.User$commentsArgs<ExtArgs>;
    likes?: boolean | Prisma.User$likesArgs<ExtArgs>;
    challengeParticipants?: boolean | Prisma.User$challengeParticipantsArgs<ExtArgs>;
    eventRegistrations?: boolean | Prisma.User$eventRegistrationsArgs<ExtArgs>;
    donations?: boolean | Prisma.User$donationsArgs<ExtArgs>;
    interactions?: boolean | Prisma.User$interactionsArgs<ExtArgs>;
    notInterested?: boolean | Prisma.User$notInterestedArgs<ExtArgs>;
    savedRestaurants?: boolean | Prisma.User$savedRestaurantsArgs<ExtArgs>;
    followers?: boolean | Prisma.User$followersArgs<ExtArgs>;
    following?: boolean | Prisma.User$followingArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        pointsWallets: Prisma.$PointsWalletPayload<ExtArgs>[];
        pointsTransactions: Prisma.$PointsTransactionPayload<ExtArgs>[];
        foodiePoints: Prisma.$FoodiePointsPayload<ExtArgs> | null;
        orders: Prisma.$OrderPayload<ExtArgs>[];
        socialPosts: Prisma.$SocialPostPayload<ExtArgs>[];
        comments: Prisma.$CommentPayload<ExtArgs>[];
        likes: Prisma.$LikePayload<ExtArgs>[];
        challengeParticipants: Prisma.$ChallengeParticipantPayload<ExtArgs>[];
        eventRegistrations: Prisma.$EventRegistrationPayload<ExtArgs>[];
        donations: Prisma.$DonationPayload<ExtArgs>[];
        interactions: Prisma.$UserInteractionPayload<ExtArgs>[];
        notInterested: Prisma.$NotInterestedPayload<ExtArgs>[];
        savedRestaurants: Prisma.$SavedRestaurantPayload<ExtArgs>[];
        followers: Prisma.$FollowPayload<ExtArgs>[];
        following: Prisma.$FollowPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        passwordHash: string;
        name: string;
        phone: string | null;
        profilePhoto: string | null;
        role: $Enums.UserRole;
        isVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    pointsWallets<T extends Prisma.User$pointsWalletsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$pointsWalletsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    pointsTransactions<T extends Prisma.User$pointsTransactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$pointsTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    foodiePoints<T extends Prisma.User$foodiePointsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$foodiePointsArgs<ExtArgs>>): Prisma.Prisma__FoodiePointsClient<runtime.Types.Result.GetResult<Prisma.$FoodiePointsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    orders<T extends Prisma.User$ordersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    socialPosts<T extends Prisma.User$socialPostsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$socialPostsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SocialPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    comments<T extends Prisma.User$commentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    likes<T extends Prisma.User$likesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$likesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    challengeParticipants<T extends Prisma.User$challengeParticipantsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$challengeParticipantsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    eventRegistrations<T extends Prisma.User$eventRegistrationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$eventRegistrationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    donations<T extends Prisma.User$donationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$donationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    interactions<T extends Prisma.User$interactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$interactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    notInterested<T extends Prisma.User$notInterestedArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$notInterestedArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    savedRestaurants<T extends Prisma.User$savedRestaurantsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$savedRestaurantsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    followers<T extends Prisma.User$followersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$followersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    following<T extends Prisma.User$followingArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$followingArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FollowPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly phone: Prisma.FieldRef<"User", 'String'>;
    readonly profilePhoto: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'UserRole'>;
    readonly isVerified: Prisma.FieldRef<"User", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.pointsWallets
 */
export type User$pointsWalletsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.pointsTransactions
 */
export type User$pointsTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.foodiePoints
 */
export type User$foodiePointsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodiePoints
     */
    select?: Prisma.FoodiePointsSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodiePoints
     */
    omit?: Prisma.FoodiePointsOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodiePointsInclude<ExtArgs> | null;
    where?: Prisma.FoodiePointsWhereInput;
};
/**
 * User.orders
 */
export type User$ordersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.socialPosts
 */
export type User$socialPostsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.comments
 */
export type User$commentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: Prisma.CommentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Comment
     */
    omit?: Prisma.CommentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CommentInclude<ExtArgs> | null;
    where?: Prisma.CommentWhereInput;
    orderBy?: Prisma.CommentOrderByWithRelationInput | Prisma.CommentOrderByWithRelationInput[];
    cursor?: Prisma.CommentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommentScalarFieldEnum | Prisma.CommentScalarFieldEnum[];
};
/**
 * User.likes
 */
export type User$likesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Like
     */
    select?: Prisma.LikeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Like
     */
    omit?: Prisma.LikeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.LikeInclude<ExtArgs> | null;
    where?: Prisma.LikeWhereInput;
    orderBy?: Prisma.LikeOrderByWithRelationInput | Prisma.LikeOrderByWithRelationInput[];
    cursor?: Prisma.LikeWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LikeScalarFieldEnum | Prisma.LikeScalarFieldEnum[];
};
/**
 * User.challengeParticipants
 */
export type User$challengeParticipantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: Prisma.ChallengeParticipantSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: Prisma.ChallengeParticipantOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChallengeParticipantInclude<ExtArgs> | null;
    where?: Prisma.ChallengeParticipantWhereInput;
    orderBy?: Prisma.ChallengeParticipantOrderByWithRelationInput | Prisma.ChallengeParticipantOrderByWithRelationInput[];
    cursor?: Prisma.ChallengeParticipantWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChallengeParticipantScalarFieldEnum | Prisma.ChallengeParticipantScalarFieldEnum[];
};
/**
 * User.eventRegistrations
 */
export type User$eventRegistrationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventRegistration
     */
    select?: Prisma.EventRegistrationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventRegistration
     */
    omit?: Prisma.EventRegistrationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventRegistrationInclude<ExtArgs> | null;
    where?: Prisma.EventRegistrationWhereInput;
    orderBy?: Prisma.EventRegistrationOrderByWithRelationInput | Prisma.EventRegistrationOrderByWithRelationInput[];
    cursor?: Prisma.EventRegistrationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventRegistrationScalarFieldEnum | Prisma.EventRegistrationScalarFieldEnum[];
};
/**
 * User.donations
 */
export type User$donationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Donation
     */
    select?: Prisma.DonationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Donation
     */
    omit?: Prisma.DonationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DonationInclude<ExtArgs> | null;
    where?: Prisma.DonationWhereInput;
    orderBy?: Prisma.DonationOrderByWithRelationInput | Prisma.DonationOrderByWithRelationInput[];
    cursor?: Prisma.DonationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DonationScalarFieldEnum | Prisma.DonationScalarFieldEnum[];
};
/**
 * User.interactions
 */
export type User$interactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.notInterested
 */
export type User$notInterestedArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.savedRestaurants
 */
export type User$savedRestaurantsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.followers
 */
export type User$followersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: Prisma.FollowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Follow
     */
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FollowInclude<ExtArgs> | null;
    where?: Prisma.FollowWhereInput;
    orderBy?: Prisma.FollowOrderByWithRelationInput | Prisma.FollowOrderByWithRelationInput[];
    cursor?: Prisma.FollowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FollowScalarFieldEnum | Prisma.FollowScalarFieldEnum[];
};
/**
 * User.following
 */
export type User$followingArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Follow
     */
    select?: Prisma.FollowSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Follow
     */
    omit?: Prisma.FollowOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FollowInclude<ExtArgs> | null;
    where?: Prisma.FollowWhereInput;
    orderBy?: Prisma.FollowOrderByWithRelationInput | Prisma.FollowOrderByWithRelationInput[];
    cursor?: Prisma.FollowWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.FollowScalarFieldEnum | Prisma.FollowScalarFieldEnum[];
};
/**
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=User.d.ts.map