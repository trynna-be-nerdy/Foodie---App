import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model SocialPost
 *
 */
export type SocialPostModel = runtime.Types.Result.DefaultSelection<Prisma.$SocialPostPayload>;
export type AggregateSocialPost = {
    _count: SocialPostCountAggregateOutputType | null;
    _avg: SocialPostAvgAggregateOutputType | null;
    _sum: SocialPostSumAggregateOutputType | null;
    _min: SocialPostMinAggregateOutputType | null;
    _max: SocialPostMaxAggregateOutputType | null;
};
export type SocialPostAvgAggregateOutputType = {
    rating: number | null;
    earnings: number | null;
    viewCount: number | null;
};
export type SocialPostSumAggregateOutputType = {
    rating: number | null;
    earnings: number | null;
    viewCount: number | null;
};
export type SocialPostMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    content: string | null;
    rating: number | null;
    privacy: $Enums.PostPrivacy | null;
    earnings: number | null;
    viewCount: number | null;
    isSponsored: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SocialPostMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    content: string | null;
    rating: number | null;
    privacy: $Enums.PostPrivacy | null;
    earnings: number | null;
    viewCount: number | null;
    isSponsored: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SocialPostCountAggregateOutputType = {
    id: number;
    userId: number;
    restaurantId: number;
    content: number;
    mediaUrls: number;
    rating: number;
    dishTags: number;
    privacy: number;
    earnings: number;
    viewCount: number;
    isSponsored: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SocialPostAvgAggregateInputType = {
    rating?: true;
    earnings?: true;
    viewCount?: true;
};
export type SocialPostSumAggregateInputType = {
    rating?: true;
    earnings?: true;
    viewCount?: true;
};
export type SocialPostMinAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    content?: true;
    rating?: true;
    privacy?: true;
    earnings?: true;
    viewCount?: true;
    isSponsored?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SocialPostMaxAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    content?: true;
    rating?: true;
    privacy?: true;
    earnings?: true;
    viewCount?: true;
    isSponsored?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SocialPostCountAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    content?: true;
    mediaUrls?: true;
    rating?: true;
    dishTags?: true;
    privacy?: true;
    earnings?: true;
    viewCount?: true;
    isSponsored?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SocialPostAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SocialPost to aggregate.
     */
    where?: Prisma.SocialPostWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SocialPosts to fetch.
     */
    orderBy?: Prisma.SocialPostOrderByWithRelationInput | Prisma.SocialPostOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SocialPostWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SocialPosts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SocialPosts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SocialPosts
    **/
    _count?: true | SocialPostCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: SocialPostAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: SocialPostSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SocialPostMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SocialPostMaxAggregateInputType;
};
export type GetSocialPostAggregateType<T extends SocialPostAggregateArgs> = {
    [P in keyof T & keyof AggregateSocialPost]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSocialPost[P]> : Prisma.GetScalarType<T[P], AggregateSocialPost[P]>;
};
export type SocialPostGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SocialPostWhereInput;
    orderBy?: Prisma.SocialPostOrderByWithAggregationInput | Prisma.SocialPostOrderByWithAggregationInput[];
    by: Prisma.SocialPostScalarFieldEnum[] | Prisma.SocialPostScalarFieldEnum;
    having?: Prisma.SocialPostScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SocialPostCountAggregateInputType | true;
    _avg?: SocialPostAvgAggregateInputType;
    _sum?: SocialPostSumAggregateInputType;
    _min?: SocialPostMinAggregateInputType;
    _max?: SocialPostMaxAggregateInputType;
};
export type SocialPostGroupByOutputType = {
    id: string;
    userId: string;
    restaurantId: string | null;
    content: string;
    mediaUrls: string[];
    rating: number | null;
    dishTags: string[];
    privacy: $Enums.PostPrivacy;
    earnings: number;
    viewCount: number;
    isSponsored: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: SocialPostCountAggregateOutputType | null;
    _avg: SocialPostAvgAggregateOutputType | null;
    _sum: SocialPostSumAggregateOutputType | null;
    _min: SocialPostMinAggregateOutputType | null;
    _max: SocialPostMaxAggregateOutputType | null;
};
type GetSocialPostGroupByPayload<T extends SocialPostGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SocialPostGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SocialPostGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SocialPostGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SocialPostGroupByOutputType[P]>;
}>>;
export type SocialPostWhereInput = {
    AND?: Prisma.SocialPostWhereInput | Prisma.SocialPostWhereInput[];
    OR?: Prisma.SocialPostWhereInput[];
    NOT?: Prisma.SocialPostWhereInput | Prisma.SocialPostWhereInput[];
    id?: Prisma.StringFilter<"SocialPost"> | string;
    userId?: Prisma.StringFilter<"SocialPost"> | string;
    restaurantId?: Prisma.StringNullableFilter<"SocialPost"> | string | null;
    content?: Prisma.StringFilter<"SocialPost"> | string;
    mediaUrls?: Prisma.StringNullableListFilter<"SocialPost">;
    rating?: Prisma.IntNullableFilter<"SocialPost"> | number | null;
    dishTags?: Prisma.StringNullableListFilter<"SocialPost">;
    privacy?: Prisma.EnumPostPrivacyFilter<"SocialPost"> | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFilter<"SocialPost"> | number;
    viewCount?: Prisma.IntFilter<"SocialPost"> | number;
    isSponsored?: Prisma.BoolFilter<"SocialPost"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"SocialPost"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SocialPost"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    restaurant?: Prisma.XOR<Prisma.RestaurantNullableScalarRelationFilter, Prisma.RestaurantWhereInput> | null;
    comments?: Prisma.CommentListRelationFilter;
    likes?: Prisma.LikeListRelationFilter;
};
export type SocialPostOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrder;
    mediaUrls?: Prisma.SortOrder;
    rating?: Prisma.SortOrderInput | Prisma.SortOrder;
    dishTags?: Prisma.SortOrder;
    privacy?: Prisma.SortOrder;
    earnings?: Prisma.SortOrder;
    viewCount?: Prisma.SortOrder;
    isSponsored?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    restaurant?: Prisma.RestaurantOrderByWithRelationInput;
    comments?: Prisma.CommentOrderByRelationAggregateInput;
    likes?: Prisma.LikeOrderByRelationAggregateInput;
};
export type SocialPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SocialPostWhereInput | Prisma.SocialPostWhereInput[];
    OR?: Prisma.SocialPostWhereInput[];
    NOT?: Prisma.SocialPostWhereInput | Prisma.SocialPostWhereInput[];
    userId?: Prisma.StringFilter<"SocialPost"> | string;
    restaurantId?: Prisma.StringNullableFilter<"SocialPost"> | string | null;
    content?: Prisma.StringFilter<"SocialPost"> | string;
    mediaUrls?: Prisma.StringNullableListFilter<"SocialPost">;
    rating?: Prisma.IntNullableFilter<"SocialPost"> | number | null;
    dishTags?: Prisma.StringNullableListFilter<"SocialPost">;
    privacy?: Prisma.EnumPostPrivacyFilter<"SocialPost"> | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFilter<"SocialPost"> | number;
    viewCount?: Prisma.IntFilter<"SocialPost"> | number;
    isSponsored?: Prisma.BoolFilter<"SocialPost"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"SocialPost"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SocialPost"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    restaurant?: Prisma.XOR<Prisma.RestaurantNullableScalarRelationFilter, Prisma.RestaurantWhereInput> | null;
    comments?: Prisma.CommentListRelationFilter;
    likes?: Prisma.LikeListRelationFilter;
}, "id">;
export type SocialPostOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrder;
    mediaUrls?: Prisma.SortOrder;
    rating?: Prisma.SortOrderInput | Prisma.SortOrder;
    dishTags?: Prisma.SortOrder;
    privacy?: Prisma.SortOrder;
    earnings?: Prisma.SortOrder;
    viewCount?: Prisma.SortOrder;
    isSponsored?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SocialPostCountOrderByAggregateInput;
    _avg?: Prisma.SocialPostAvgOrderByAggregateInput;
    _max?: Prisma.SocialPostMaxOrderByAggregateInput;
    _min?: Prisma.SocialPostMinOrderByAggregateInput;
    _sum?: Prisma.SocialPostSumOrderByAggregateInput;
};
export type SocialPostScalarWhereWithAggregatesInput = {
    AND?: Prisma.SocialPostScalarWhereWithAggregatesInput | Prisma.SocialPostScalarWhereWithAggregatesInput[];
    OR?: Prisma.SocialPostScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SocialPostScalarWhereWithAggregatesInput | Prisma.SocialPostScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SocialPost"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"SocialPost"> | string;
    restaurantId?: Prisma.StringNullableWithAggregatesFilter<"SocialPost"> | string | null;
    content?: Prisma.StringWithAggregatesFilter<"SocialPost"> | string;
    mediaUrls?: Prisma.StringNullableListFilter<"SocialPost">;
    rating?: Prisma.IntNullableWithAggregatesFilter<"SocialPost"> | number | null;
    dishTags?: Prisma.StringNullableListFilter<"SocialPost">;
    privacy?: Prisma.EnumPostPrivacyWithAggregatesFilter<"SocialPost"> | $Enums.PostPrivacy;
    earnings?: Prisma.FloatWithAggregatesFilter<"SocialPost"> | number;
    viewCount?: Prisma.IntWithAggregatesFilter<"SocialPost"> | number;
    isSponsored?: Prisma.BoolWithAggregatesFilter<"SocialPost"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SocialPost"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SocialPost"> | Date | string;
};
export type SocialPostCreateInput = {
    id?: string;
    content: string;
    mediaUrls?: Prisma.SocialPostCreatemediaUrlsInput | string[];
    rating?: number | null;
    dishTags?: Prisma.SocialPostCreatedishTagsInput | string[];
    privacy?: $Enums.PostPrivacy;
    earnings?: number;
    viewCount?: number;
    isSponsored?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSocialPostsInput;
    restaurant?: Prisma.RestaurantCreateNestedOneWithoutSocialPostsInput;
    comments?: Prisma.CommentCreateNestedManyWithoutPostInput;
    likes?: Prisma.LikeCreateNestedManyWithoutPostInput;
};
export type SocialPostUncheckedCreateInput = {
    id?: string;
    userId: string;
    restaurantId?: string | null;
    content: string;
    mediaUrls?: Prisma.SocialPostCreatemediaUrlsInput | string[];
    rating?: number | null;
    dishTags?: Prisma.SocialPostCreatedishTagsInput | string[];
    privacy?: $Enums.PostPrivacy;
    earnings?: number;
    viewCount?: number;
    isSponsored?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutPostInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutPostInput;
};
export type SocialPostUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSocialPostsNestedInput;
    restaurant?: Prisma.RestaurantUpdateOneWithoutSocialPostsNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutPostNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutPostNestedInput;
};
export type SocialPostUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutPostNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutPostNestedInput;
};
export type SocialPostCreateManyInput = {
    id?: string;
    userId: string;
    restaurantId?: string | null;
    content: string;
    mediaUrls?: Prisma.SocialPostCreatemediaUrlsInput | string[];
    rating?: number | null;
    dishTags?: Prisma.SocialPostCreatedishTagsInput | string[];
    privacy?: $Enums.PostPrivacy;
    earnings?: number;
    viewCount?: number;
    isSponsored?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SocialPostUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SocialPostUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SocialPostListRelationFilter = {
    every?: Prisma.SocialPostWhereInput;
    some?: Prisma.SocialPostWhereInput;
    none?: Prisma.SocialPostWhereInput;
};
export type SocialPostOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SocialPostCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    mediaUrls?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    dishTags?: Prisma.SortOrder;
    privacy?: Prisma.SortOrder;
    earnings?: Prisma.SortOrder;
    viewCount?: Prisma.SortOrder;
    isSponsored?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SocialPostAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    earnings?: Prisma.SortOrder;
    viewCount?: Prisma.SortOrder;
};
export type SocialPostMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    privacy?: Prisma.SortOrder;
    earnings?: Prisma.SortOrder;
    viewCount?: Prisma.SortOrder;
    isSponsored?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SocialPostMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    privacy?: Prisma.SortOrder;
    earnings?: Prisma.SortOrder;
    viewCount?: Prisma.SortOrder;
    isSponsored?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SocialPostSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
    earnings?: Prisma.SortOrder;
    viewCount?: Prisma.SortOrder;
};
export type SocialPostScalarRelationFilter = {
    is?: Prisma.SocialPostWhereInput;
    isNot?: Prisma.SocialPostWhereInput;
};
export type SocialPostCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SocialPostCreateWithoutUserInput, Prisma.SocialPostUncheckedCreateWithoutUserInput> | Prisma.SocialPostCreateWithoutUserInput[] | Prisma.SocialPostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SocialPostCreateOrConnectWithoutUserInput | Prisma.SocialPostCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SocialPostCreateManyUserInputEnvelope;
    connect?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
};
export type SocialPostUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SocialPostCreateWithoutUserInput, Prisma.SocialPostUncheckedCreateWithoutUserInput> | Prisma.SocialPostCreateWithoutUserInput[] | Prisma.SocialPostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SocialPostCreateOrConnectWithoutUserInput | Prisma.SocialPostCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SocialPostCreateManyUserInputEnvelope;
    connect?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
};
export type SocialPostUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SocialPostCreateWithoutUserInput, Prisma.SocialPostUncheckedCreateWithoutUserInput> | Prisma.SocialPostCreateWithoutUserInput[] | Prisma.SocialPostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SocialPostCreateOrConnectWithoutUserInput | Prisma.SocialPostCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SocialPostUpsertWithWhereUniqueWithoutUserInput | Prisma.SocialPostUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SocialPostCreateManyUserInputEnvelope;
    set?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    disconnect?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    delete?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    connect?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    update?: Prisma.SocialPostUpdateWithWhereUniqueWithoutUserInput | Prisma.SocialPostUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SocialPostUpdateManyWithWhereWithoutUserInput | Prisma.SocialPostUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SocialPostScalarWhereInput | Prisma.SocialPostScalarWhereInput[];
};
export type SocialPostUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SocialPostCreateWithoutUserInput, Prisma.SocialPostUncheckedCreateWithoutUserInput> | Prisma.SocialPostCreateWithoutUserInput[] | Prisma.SocialPostUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SocialPostCreateOrConnectWithoutUserInput | Prisma.SocialPostCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SocialPostUpsertWithWhereUniqueWithoutUserInput | Prisma.SocialPostUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SocialPostCreateManyUserInputEnvelope;
    set?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    disconnect?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    delete?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    connect?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    update?: Prisma.SocialPostUpdateWithWhereUniqueWithoutUserInput | Prisma.SocialPostUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SocialPostUpdateManyWithWhereWithoutUserInput | Prisma.SocialPostUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SocialPostScalarWhereInput | Prisma.SocialPostScalarWhereInput[];
};
export type SocialPostCreateNestedManyWithoutRestaurantInput = {
    create?: Prisma.XOR<Prisma.SocialPostCreateWithoutRestaurantInput, Prisma.SocialPostUncheckedCreateWithoutRestaurantInput> | Prisma.SocialPostCreateWithoutRestaurantInput[] | Prisma.SocialPostUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.SocialPostCreateOrConnectWithoutRestaurantInput | Prisma.SocialPostCreateOrConnectWithoutRestaurantInput[];
    createMany?: Prisma.SocialPostCreateManyRestaurantInputEnvelope;
    connect?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
};
export type SocialPostUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: Prisma.XOR<Prisma.SocialPostCreateWithoutRestaurantInput, Prisma.SocialPostUncheckedCreateWithoutRestaurantInput> | Prisma.SocialPostCreateWithoutRestaurantInput[] | Prisma.SocialPostUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.SocialPostCreateOrConnectWithoutRestaurantInput | Prisma.SocialPostCreateOrConnectWithoutRestaurantInput[];
    createMany?: Prisma.SocialPostCreateManyRestaurantInputEnvelope;
    connect?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
};
export type SocialPostUpdateManyWithoutRestaurantNestedInput = {
    create?: Prisma.XOR<Prisma.SocialPostCreateWithoutRestaurantInput, Prisma.SocialPostUncheckedCreateWithoutRestaurantInput> | Prisma.SocialPostCreateWithoutRestaurantInput[] | Prisma.SocialPostUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.SocialPostCreateOrConnectWithoutRestaurantInput | Prisma.SocialPostCreateOrConnectWithoutRestaurantInput[];
    upsert?: Prisma.SocialPostUpsertWithWhereUniqueWithoutRestaurantInput | Prisma.SocialPostUpsertWithWhereUniqueWithoutRestaurantInput[];
    createMany?: Prisma.SocialPostCreateManyRestaurantInputEnvelope;
    set?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    disconnect?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    delete?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    connect?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    update?: Prisma.SocialPostUpdateWithWhereUniqueWithoutRestaurantInput | Prisma.SocialPostUpdateWithWhereUniqueWithoutRestaurantInput[];
    updateMany?: Prisma.SocialPostUpdateManyWithWhereWithoutRestaurantInput | Prisma.SocialPostUpdateManyWithWhereWithoutRestaurantInput[];
    deleteMany?: Prisma.SocialPostScalarWhereInput | Prisma.SocialPostScalarWhereInput[];
};
export type SocialPostUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: Prisma.XOR<Prisma.SocialPostCreateWithoutRestaurantInput, Prisma.SocialPostUncheckedCreateWithoutRestaurantInput> | Prisma.SocialPostCreateWithoutRestaurantInput[] | Prisma.SocialPostUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.SocialPostCreateOrConnectWithoutRestaurantInput | Prisma.SocialPostCreateOrConnectWithoutRestaurantInput[];
    upsert?: Prisma.SocialPostUpsertWithWhereUniqueWithoutRestaurantInput | Prisma.SocialPostUpsertWithWhereUniqueWithoutRestaurantInput[];
    createMany?: Prisma.SocialPostCreateManyRestaurantInputEnvelope;
    set?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    disconnect?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    delete?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    connect?: Prisma.SocialPostWhereUniqueInput | Prisma.SocialPostWhereUniqueInput[];
    update?: Prisma.SocialPostUpdateWithWhereUniqueWithoutRestaurantInput | Prisma.SocialPostUpdateWithWhereUniqueWithoutRestaurantInput[];
    updateMany?: Prisma.SocialPostUpdateManyWithWhereWithoutRestaurantInput | Prisma.SocialPostUpdateManyWithWhereWithoutRestaurantInput[];
    deleteMany?: Prisma.SocialPostScalarWhereInput | Prisma.SocialPostScalarWhereInput[];
};
export type SocialPostCreatemediaUrlsInput = {
    set: string[];
};
export type SocialPostCreatedishTagsInput = {
    set: string[];
};
export type SocialPostUpdatemediaUrlsInput = {
    set?: string[];
    push?: string | string[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type SocialPostUpdatedishTagsInput = {
    set?: string[];
    push?: string | string[];
};
export type EnumPostPrivacyFieldUpdateOperationsInput = {
    set?: $Enums.PostPrivacy;
};
export type SocialPostCreateNestedOneWithoutCommentsInput = {
    create?: Prisma.XOR<Prisma.SocialPostCreateWithoutCommentsInput, Prisma.SocialPostUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.SocialPostCreateOrConnectWithoutCommentsInput;
    connect?: Prisma.SocialPostWhereUniqueInput;
};
export type SocialPostUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: Prisma.XOR<Prisma.SocialPostCreateWithoutCommentsInput, Prisma.SocialPostUncheckedCreateWithoutCommentsInput>;
    connectOrCreate?: Prisma.SocialPostCreateOrConnectWithoutCommentsInput;
    upsert?: Prisma.SocialPostUpsertWithoutCommentsInput;
    connect?: Prisma.SocialPostWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SocialPostUpdateToOneWithWhereWithoutCommentsInput, Prisma.SocialPostUpdateWithoutCommentsInput>, Prisma.SocialPostUncheckedUpdateWithoutCommentsInput>;
};
export type SocialPostCreateNestedOneWithoutLikesInput = {
    create?: Prisma.XOR<Prisma.SocialPostCreateWithoutLikesInput, Prisma.SocialPostUncheckedCreateWithoutLikesInput>;
    connectOrCreate?: Prisma.SocialPostCreateOrConnectWithoutLikesInput;
    connect?: Prisma.SocialPostWhereUniqueInput;
};
export type SocialPostUpdateOneRequiredWithoutLikesNestedInput = {
    create?: Prisma.XOR<Prisma.SocialPostCreateWithoutLikesInput, Prisma.SocialPostUncheckedCreateWithoutLikesInput>;
    connectOrCreate?: Prisma.SocialPostCreateOrConnectWithoutLikesInput;
    upsert?: Prisma.SocialPostUpsertWithoutLikesInput;
    connect?: Prisma.SocialPostWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SocialPostUpdateToOneWithWhereWithoutLikesInput, Prisma.SocialPostUpdateWithoutLikesInput>, Prisma.SocialPostUncheckedUpdateWithoutLikesInput>;
};
export type SocialPostCreateWithoutUserInput = {
    id?: string;
    content: string;
    mediaUrls?: Prisma.SocialPostCreatemediaUrlsInput | string[];
    rating?: number | null;
    dishTags?: Prisma.SocialPostCreatedishTagsInput | string[];
    privacy?: $Enums.PostPrivacy;
    earnings?: number;
    viewCount?: number;
    isSponsored?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    restaurant?: Prisma.RestaurantCreateNestedOneWithoutSocialPostsInput;
    comments?: Prisma.CommentCreateNestedManyWithoutPostInput;
    likes?: Prisma.LikeCreateNestedManyWithoutPostInput;
};
export type SocialPostUncheckedCreateWithoutUserInput = {
    id?: string;
    restaurantId?: string | null;
    content: string;
    mediaUrls?: Prisma.SocialPostCreatemediaUrlsInput | string[];
    rating?: number | null;
    dishTags?: Prisma.SocialPostCreatedishTagsInput | string[];
    privacy?: $Enums.PostPrivacy;
    earnings?: number;
    viewCount?: number;
    isSponsored?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutPostInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutPostInput;
};
export type SocialPostCreateOrConnectWithoutUserInput = {
    where: Prisma.SocialPostWhereUniqueInput;
    create: Prisma.XOR<Prisma.SocialPostCreateWithoutUserInput, Prisma.SocialPostUncheckedCreateWithoutUserInput>;
};
export type SocialPostCreateManyUserInputEnvelope = {
    data: Prisma.SocialPostCreateManyUserInput | Prisma.SocialPostCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type SocialPostUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.SocialPostWhereUniqueInput;
    update: Prisma.XOR<Prisma.SocialPostUpdateWithoutUserInput, Prisma.SocialPostUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.SocialPostCreateWithoutUserInput, Prisma.SocialPostUncheckedCreateWithoutUserInput>;
};
export type SocialPostUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.SocialPostWhereUniqueInput;
    data: Prisma.XOR<Prisma.SocialPostUpdateWithoutUserInput, Prisma.SocialPostUncheckedUpdateWithoutUserInput>;
};
export type SocialPostUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.SocialPostScalarWhereInput;
    data: Prisma.XOR<Prisma.SocialPostUpdateManyMutationInput, Prisma.SocialPostUncheckedUpdateManyWithoutUserInput>;
};
export type SocialPostScalarWhereInput = {
    AND?: Prisma.SocialPostScalarWhereInput | Prisma.SocialPostScalarWhereInput[];
    OR?: Prisma.SocialPostScalarWhereInput[];
    NOT?: Prisma.SocialPostScalarWhereInput | Prisma.SocialPostScalarWhereInput[];
    id?: Prisma.StringFilter<"SocialPost"> | string;
    userId?: Prisma.StringFilter<"SocialPost"> | string;
    restaurantId?: Prisma.StringNullableFilter<"SocialPost"> | string | null;
    content?: Prisma.StringFilter<"SocialPost"> | string;
    mediaUrls?: Prisma.StringNullableListFilter<"SocialPost">;
    rating?: Prisma.IntNullableFilter<"SocialPost"> | number | null;
    dishTags?: Prisma.StringNullableListFilter<"SocialPost">;
    privacy?: Prisma.EnumPostPrivacyFilter<"SocialPost"> | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFilter<"SocialPost"> | number;
    viewCount?: Prisma.IntFilter<"SocialPost"> | number;
    isSponsored?: Prisma.BoolFilter<"SocialPost"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"SocialPost"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SocialPost"> | Date | string;
};
export type SocialPostCreateWithoutRestaurantInput = {
    id?: string;
    content: string;
    mediaUrls?: Prisma.SocialPostCreatemediaUrlsInput | string[];
    rating?: number | null;
    dishTags?: Prisma.SocialPostCreatedishTagsInput | string[];
    privacy?: $Enums.PostPrivacy;
    earnings?: number;
    viewCount?: number;
    isSponsored?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSocialPostsInput;
    comments?: Prisma.CommentCreateNestedManyWithoutPostInput;
    likes?: Prisma.LikeCreateNestedManyWithoutPostInput;
};
export type SocialPostUncheckedCreateWithoutRestaurantInput = {
    id?: string;
    userId: string;
    content: string;
    mediaUrls?: Prisma.SocialPostCreatemediaUrlsInput | string[];
    rating?: number | null;
    dishTags?: Prisma.SocialPostCreatedishTagsInput | string[];
    privacy?: $Enums.PostPrivacy;
    earnings?: number;
    viewCount?: number;
    isSponsored?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutPostInput;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutPostInput;
};
export type SocialPostCreateOrConnectWithoutRestaurantInput = {
    where: Prisma.SocialPostWhereUniqueInput;
    create: Prisma.XOR<Prisma.SocialPostCreateWithoutRestaurantInput, Prisma.SocialPostUncheckedCreateWithoutRestaurantInput>;
};
export type SocialPostCreateManyRestaurantInputEnvelope = {
    data: Prisma.SocialPostCreateManyRestaurantInput | Prisma.SocialPostCreateManyRestaurantInput[];
    skipDuplicates?: boolean;
};
export type SocialPostUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: Prisma.SocialPostWhereUniqueInput;
    update: Prisma.XOR<Prisma.SocialPostUpdateWithoutRestaurantInput, Prisma.SocialPostUncheckedUpdateWithoutRestaurantInput>;
    create: Prisma.XOR<Prisma.SocialPostCreateWithoutRestaurantInput, Prisma.SocialPostUncheckedCreateWithoutRestaurantInput>;
};
export type SocialPostUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: Prisma.SocialPostWhereUniqueInput;
    data: Prisma.XOR<Prisma.SocialPostUpdateWithoutRestaurantInput, Prisma.SocialPostUncheckedUpdateWithoutRestaurantInput>;
};
export type SocialPostUpdateManyWithWhereWithoutRestaurantInput = {
    where: Prisma.SocialPostScalarWhereInput;
    data: Prisma.XOR<Prisma.SocialPostUpdateManyMutationInput, Prisma.SocialPostUncheckedUpdateManyWithoutRestaurantInput>;
};
export type SocialPostCreateWithoutCommentsInput = {
    id?: string;
    content: string;
    mediaUrls?: Prisma.SocialPostCreatemediaUrlsInput | string[];
    rating?: number | null;
    dishTags?: Prisma.SocialPostCreatedishTagsInput | string[];
    privacy?: $Enums.PostPrivacy;
    earnings?: number;
    viewCount?: number;
    isSponsored?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSocialPostsInput;
    restaurant?: Prisma.RestaurantCreateNestedOneWithoutSocialPostsInput;
    likes?: Prisma.LikeCreateNestedManyWithoutPostInput;
};
export type SocialPostUncheckedCreateWithoutCommentsInput = {
    id?: string;
    userId: string;
    restaurantId?: string | null;
    content: string;
    mediaUrls?: Prisma.SocialPostCreatemediaUrlsInput | string[];
    rating?: number | null;
    dishTags?: Prisma.SocialPostCreatedishTagsInput | string[];
    privacy?: $Enums.PostPrivacy;
    earnings?: number;
    viewCount?: number;
    isSponsored?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    likes?: Prisma.LikeUncheckedCreateNestedManyWithoutPostInput;
};
export type SocialPostCreateOrConnectWithoutCommentsInput = {
    where: Prisma.SocialPostWhereUniqueInput;
    create: Prisma.XOR<Prisma.SocialPostCreateWithoutCommentsInput, Prisma.SocialPostUncheckedCreateWithoutCommentsInput>;
};
export type SocialPostUpsertWithoutCommentsInput = {
    update: Prisma.XOR<Prisma.SocialPostUpdateWithoutCommentsInput, Prisma.SocialPostUncheckedUpdateWithoutCommentsInput>;
    create: Prisma.XOR<Prisma.SocialPostCreateWithoutCommentsInput, Prisma.SocialPostUncheckedCreateWithoutCommentsInput>;
    where?: Prisma.SocialPostWhereInput;
};
export type SocialPostUpdateToOneWithWhereWithoutCommentsInput = {
    where?: Prisma.SocialPostWhereInput;
    data: Prisma.XOR<Prisma.SocialPostUpdateWithoutCommentsInput, Prisma.SocialPostUncheckedUpdateWithoutCommentsInput>;
};
export type SocialPostUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSocialPostsNestedInput;
    restaurant?: Prisma.RestaurantUpdateOneWithoutSocialPostsNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutPostNestedInput;
};
export type SocialPostUncheckedUpdateWithoutCommentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutPostNestedInput;
};
export type SocialPostCreateWithoutLikesInput = {
    id?: string;
    content: string;
    mediaUrls?: Prisma.SocialPostCreatemediaUrlsInput | string[];
    rating?: number | null;
    dishTags?: Prisma.SocialPostCreatedishTagsInput | string[];
    privacy?: $Enums.PostPrivacy;
    earnings?: number;
    viewCount?: number;
    isSponsored?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSocialPostsInput;
    restaurant?: Prisma.RestaurantCreateNestedOneWithoutSocialPostsInput;
    comments?: Prisma.CommentCreateNestedManyWithoutPostInput;
};
export type SocialPostUncheckedCreateWithoutLikesInput = {
    id?: string;
    userId: string;
    restaurantId?: string | null;
    content: string;
    mediaUrls?: Prisma.SocialPostCreatemediaUrlsInput | string[];
    rating?: number | null;
    dishTags?: Prisma.SocialPostCreatedishTagsInput | string[];
    privacy?: $Enums.PostPrivacy;
    earnings?: number;
    viewCount?: number;
    isSponsored?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    comments?: Prisma.CommentUncheckedCreateNestedManyWithoutPostInput;
};
export type SocialPostCreateOrConnectWithoutLikesInput = {
    where: Prisma.SocialPostWhereUniqueInput;
    create: Prisma.XOR<Prisma.SocialPostCreateWithoutLikesInput, Prisma.SocialPostUncheckedCreateWithoutLikesInput>;
};
export type SocialPostUpsertWithoutLikesInput = {
    update: Prisma.XOR<Prisma.SocialPostUpdateWithoutLikesInput, Prisma.SocialPostUncheckedUpdateWithoutLikesInput>;
    create: Prisma.XOR<Prisma.SocialPostCreateWithoutLikesInput, Prisma.SocialPostUncheckedCreateWithoutLikesInput>;
    where?: Prisma.SocialPostWhereInput;
};
export type SocialPostUpdateToOneWithWhereWithoutLikesInput = {
    where?: Prisma.SocialPostWhereInput;
    data: Prisma.XOR<Prisma.SocialPostUpdateWithoutLikesInput, Prisma.SocialPostUncheckedUpdateWithoutLikesInput>;
};
export type SocialPostUpdateWithoutLikesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSocialPostsNestedInput;
    restaurant?: Prisma.RestaurantUpdateOneWithoutSocialPostsNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutPostNestedInput;
};
export type SocialPostUncheckedUpdateWithoutLikesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutPostNestedInput;
};
export type SocialPostCreateManyUserInput = {
    id?: string;
    restaurantId?: string | null;
    content: string;
    mediaUrls?: Prisma.SocialPostCreatemediaUrlsInput | string[];
    rating?: number | null;
    dishTags?: Prisma.SocialPostCreatedishTagsInput | string[];
    privacy?: $Enums.PostPrivacy;
    earnings?: number;
    viewCount?: number;
    isSponsored?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SocialPostUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    restaurant?: Prisma.RestaurantUpdateOneWithoutSocialPostsNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutPostNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutPostNestedInput;
};
export type SocialPostUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutPostNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutPostNestedInput;
};
export type SocialPostUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SocialPostCreateManyRestaurantInput = {
    id?: string;
    userId: string;
    content: string;
    mediaUrls?: Prisma.SocialPostCreatemediaUrlsInput | string[];
    rating?: number | null;
    dishTags?: Prisma.SocialPostCreatedishTagsInput | string[];
    privacy?: $Enums.PostPrivacy;
    earnings?: number;
    viewCount?: number;
    isSponsored?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SocialPostUpdateWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSocialPostsNestedInput;
    comments?: Prisma.CommentUpdateManyWithoutPostNestedInput;
    likes?: Prisma.LikeUpdateManyWithoutPostNestedInput;
};
export type SocialPostUncheckedUpdateWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    comments?: Prisma.CommentUncheckedUpdateManyWithoutPostNestedInput;
    likes?: Prisma.LikeUncheckedUpdateManyWithoutPostNestedInput;
};
export type SocialPostUncheckedUpdateManyWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    mediaUrls?: Prisma.SocialPostUpdatemediaUrlsInput | string[];
    rating?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    dishTags?: Prisma.SocialPostUpdatedishTagsInput | string[];
    privacy?: Prisma.EnumPostPrivacyFieldUpdateOperationsInput | $Enums.PostPrivacy;
    earnings?: Prisma.FloatFieldUpdateOperationsInput | number;
    viewCount?: Prisma.IntFieldUpdateOperationsInput | number;
    isSponsored?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type SocialPostCountOutputType
 */
export type SocialPostCountOutputType = {
    comments: number;
    likes: number;
};
export type SocialPostCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    comments?: boolean | SocialPostCountOutputTypeCountCommentsArgs;
    likes?: boolean | SocialPostCountOutputTypeCountLikesArgs;
};
/**
 * SocialPostCountOutputType without action
 */
export type SocialPostCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialPostCountOutputType
     */
    select?: Prisma.SocialPostCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * SocialPostCountOutputType without action
 */
export type SocialPostCountOutputTypeCountCommentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommentWhereInput;
};
/**
 * SocialPostCountOutputType without action
 */
export type SocialPostCountOutputTypeCountLikesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LikeWhereInput;
};
export type SocialPostSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    content?: boolean;
    mediaUrls?: boolean;
    rating?: boolean;
    dishTags?: boolean;
    privacy?: boolean;
    earnings?: boolean;
    viewCount?: boolean;
    isSponsored?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.SocialPost$restaurantArgs<ExtArgs>;
    comments?: boolean | Prisma.SocialPost$commentsArgs<ExtArgs>;
    likes?: boolean | Prisma.SocialPost$likesArgs<ExtArgs>;
    _count?: boolean | Prisma.SocialPostCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["socialPost"]>;
export type SocialPostSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    content?: boolean;
    mediaUrls?: boolean;
    rating?: boolean;
    dishTags?: boolean;
    privacy?: boolean;
    earnings?: boolean;
    viewCount?: boolean;
    isSponsored?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.SocialPost$restaurantArgs<ExtArgs>;
}, ExtArgs["result"]["socialPost"]>;
export type SocialPostSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    content?: boolean;
    mediaUrls?: boolean;
    rating?: boolean;
    dishTags?: boolean;
    privacy?: boolean;
    earnings?: boolean;
    viewCount?: boolean;
    isSponsored?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.SocialPost$restaurantArgs<ExtArgs>;
}, ExtArgs["result"]["socialPost"]>;
export type SocialPostSelectScalar = {
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    content?: boolean;
    mediaUrls?: boolean;
    rating?: boolean;
    dishTags?: boolean;
    privacy?: boolean;
    earnings?: boolean;
    viewCount?: boolean;
    isSponsored?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SocialPostOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "restaurantId" | "content" | "mediaUrls" | "rating" | "dishTags" | "privacy" | "earnings" | "viewCount" | "isSponsored" | "createdAt" | "updatedAt", ExtArgs["result"]["socialPost"]>;
export type SocialPostInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.SocialPost$restaurantArgs<ExtArgs>;
    comments?: boolean | Prisma.SocialPost$commentsArgs<ExtArgs>;
    likes?: boolean | Prisma.SocialPost$likesArgs<ExtArgs>;
    _count?: boolean | Prisma.SocialPostCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SocialPostIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.SocialPost$restaurantArgs<ExtArgs>;
};
export type SocialPostIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.SocialPost$restaurantArgs<ExtArgs>;
};
export type $SocialPostPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SocialPost";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        restaurant: Prisma.$RestaurantPayload<ExtArgs> | null;
        comments: Prisma.$CommentPayload<ExtArgs>[];
        likes: Prisma.$LikePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        restaurantId: string | null;
        content: string;
        mediaUrls: string[];
        rating: number | null;
        dishTags: string[];
        privacy: $Enums.PostPrivacy;
        earnings: number;
        viewCount: number;
        isSponsored: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["socialPost"]>;
    composites: {};
};
export type SocialPostGetPayload<S extends boolean | null | undefined | SocialPostDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SocialPostPayload, S>;
export type SocialPostCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SocialPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SocialPostCountAggregateInputType | true;
};
export interface SocialPostDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SocialPost'];
        meta: {
            name: 'SocialPost';
        };
    };
    /**
     * Find zero or one SocialPost that matches the filter.
     * @param {SocialPostFindUniqueArgs} args - Arguments to find a SocialPost
     * @example
     * // Get one SocialPost
     * const socialPost = await prisma.socialPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SocialPostFindUniqueArgs>(args: Prisma.SelectSubset<T, SocialPostFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SocialPostClient<runtime.Types.Result.GetResult<Prisma.$SocialPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one SocialPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SocialPostFindUniqueOrThrowArgs} args - Arguments to find a SocialPost
     * @example
     * // Get one SocialPost
     * const socialPost = await prisma.socialPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SocialPostFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SocialPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SocialPostClient<runtime.Types.Result.GetResult<Prisma.$SocialPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SocialPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialPostFindFirstArgs} args - Arguments to find a SocialPost
     * @example
     * // Get one SocialPost
     * const socialPost = await prisma.socialPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SocialPostFindFirstArgs>(args?: Prisma.SelectSubset<T, SocialPostFindFirstArgs<ExtArgs>>): Prisma.Prisma__SocialPostClient<runtime.Types.Result.GetResult<Prisma.$SocialPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SocialPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialPostFindFirstOrThrowArgs} args - Arguments to find a SocialPost
     * @example
     * // Get one SocialPost
     * const socialPost = await prisma.socialPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SocialPostFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SocialPostFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SocialPostClient<runtime.Types.Result.GetResult<Prisma.$SocialPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more SocialPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SocialPosts
     * const socialPosts = await prisma.socialPost.findMany()
     *
     * // Get first 10 SocialPosts
     * const socialPosts = await prisma.socialPost.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const socialPostWithIdOnly = await prisma.socialPost.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SocialPostFindManyArgs>(args?: Prisma.SelectSubset<T, SocialPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SocialPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a SocialPost.
     * @param {SocialPostCreateArgs} args - Arguments to create a SocialPost.
     * @example
     * // Create one SocialPost
     * const SocialPost = await prisma.socialPost.create({
     *   data: {
     *     // ... data to create a SocialPost
     *   }
     * })
     *
     */
    create<T extends SocialPostCreateArgs>(args: Prisma.SelectSubset<T, SocialPostCreateArgs<ExtArgs>>): Prisma.Prisma__SocialPostClient<runtime.Types.Result.GetResult<Prisma.$SocialPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many SocialPosts.
     * @param {SocialPostCreateManyArgs} args - Arguments to create many SocialPosts.
     * @example
     * // Create many SocialPosts
     * const socialPost = await prisma.socialPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SocialPostCreateManyArgs>(args?: Prisma.SelectSubset<T, SocialPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many SocialPosts and returns the data saved in the database.
     * @param {SocialPostCreateManyAndReturnArgs} args - Arguments to create many SocialPosts.
     * @example
     * // Create many SocialPosts
     * const socialPost = await prisma.socialPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SocialPosts and only return the `id`
     * const socialPostWithIdOnly = await prisma.socialPost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SocialPostCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SocialPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SocialPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a SocialPost.
     * @param {SocialPostDeleteArgs} args - Arguments to delete one SocialPost.
     * @example
     * // Delete one SocialPost
     * const SocialPost = await prisma.socialPost.delete({
     *   where: {
     *     // ... filter to delete one SocialPost
     *   }
     * })
     *
     */
    delete<T extends SocialPostDeleteArgs>(args: Prisma.SelectSubset<T, SocialPostDeleteArgs<ExtArgs>>): Prisma.Prisma__SocialPostClient<runtime.Types.Result.GetResult<Prisma.$SocialPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one SocialPost.
     * @param {SocialPostUpdateArgs} args - Arguments to update one SocialPost.
     * @example
     * // Update one SocialPost
     * const socialPost = await prisma.socialPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SocialPostUpdateArgs>(args: Prisma.SelectSubset<T, SocialPostUpdateArgs<ExtArgs>>): Prisma.Prisma__SocialPostClient<runtime.Types.Result.GetResult<Prisma.$SocialPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more SocialPosts.
     * @param {SocialPostDeleteManyArgs} args - Arguments to filter SocialPosts to delete.
     * @example
     * // Delete a few SocialPosts
     * const { count } = await prisma.socialPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SocialPostDeleteManyArgs>(args?: Prisma.SelectSubset<T, SocialPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SocialPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SocialPosts
     * const socialPost = await prisma.socialPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SocialPostUpdateManyArgs>(args: Prisma.SelectSubset<T, SocialPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SocialPosts and returns the data updated in the database.
     * @param {SocialPostUpdateManyAndReturnArgs} args - Arguments to update many SocialPosts.
     * @example
     * // Update many SocialPosts
     * const socialPost = await prisma.socialPost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more SocialPosts and only return the `id`
     * const socialPostWithIdOnly = await prisma.socialPost.updateManyAndReturn({
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
    updateManyAndReturn<T extends SocialPostUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SocialPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SocialPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one SocialPost.
     * @param {SocialPostUpsertArgs} args - Arguments to update or create a SocialPost.
     * @example
     * // Update or create a SocialPost
     * const socialPost = await prisma.socialPost.upsert({
     *   create: {
     *     // ... data to create a SocialPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SocialPost we want to update
     *   }
     * })
     */
    upsert<T extends SocialPostUpsertArgs>(args: Prisma.SelectSubset<T, SocialPostUpsertArgs<ExtArgs>>): Prisma.Prisma__SocialPostClient<runtime.Types.Result.GetResult<Prisma.$SocialPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of SocialPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialPostCountArgs} args - Arguments to filter SocialPosts to count.
     * @example
     * // Count the number of SocialPosts
     * const count = await prisma.socialPost.count({
     *   where: {
     *     // ... the filter for the SocialPosts we want to count
     *   }
     * })
    **/
    count<T extends SocialPostCountArgs>(args?: Prisma.Subset<T, SocialPostCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SocialPostCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a SocialPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SocialPostAggregateArgs>(args: Prisma.Subset<T, SocialPostAggregateArgs>): Prisma.PrismaPromise<GetSocialPostAggregateType<T>>;
    /**
     * Group by SocialPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SocialPostGroupByArgs} args - Group by arguments.
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
    groupBy<T extends SocialPostGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SocialPostGroupByArgs['orderBy'];
    } : {
        orderBy?: SocialPostGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SocialPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSocialPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SocialPost model
     */
    readonly fields: SocialPostFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for SocialPost.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SocialPostClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    restaurant<T extends Prisma.SocialPost$restaurantArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SocialPost$restaurantArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    comments<T extends Prisma.SocialPost$commentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SocialPost$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    likes<T extends Prisma.SocialPost$likesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SocialPost$likesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LikePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the SocialPost model
 */
export interface SocialPostFieldRefs {
    readonly id: Prisma.FieldRef<"SocialPost", 'String'>;
    readonly userId: Prisma.FieldRef<"SocialPost", 'String'>;
    readonly restaurantId: Prisma.FieldRef<"SocialPost", 'String'>;
    readonly content: Prisma.FieldRef<"SocialPost", 'String'>;
    readonly mediaUrls: Prisma.FieldRef<"SocialPost", 'String[]'>;
    readonly rating: Prisma.FieldRef<"SocialPost", 'Int'>;
    readonly dishTags: Prisma.FieldRef<"SocialPost", 'String[]'>;
    readonly privacy: Prisma.FieldRef<"SocialPost", 'PostPrivacy'>;
    readonly earnings: Prisma.FieldRef<"SocialPost", 'Float'>;
    readonly viewCount: Prisma.FieldRef<"SocialPost", 'Int'>;
    readonly isSponsored: Prisma.FieldRef<"SocialPost", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"SocialPost", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"SocialPost", 'DateTime'>;
}
/**
 * SocialPost findUnique
 */
export type SocialPostFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SocialPost to fetch.
     */
    where: Prisma.SocialPostWhereUniqueInput;
};
/**
 * SocialPost findUniqueOrThrow
 */
export type SocialPostFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SocialPost to fetch.
     */
    where: Prisma.SocialPostWhereUniqueInput;
};
/**
 * SocialPost findFirst
 */
export type SocialPostFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SocialPost to fetch.
     */
    where?: Prisma.SocialPostWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SocialPosts to fetch.
     */
    orderBy?: Prisma.SocialPostOrderByWithRelationInput | Prisma.SocialPostOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SocialPosts.
     */
    cursor?: Prisma.SocialPostWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SocialPosts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SocialPosts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SocialPosts.
     */
    distinct?: Prisma.SocialPostScalarFieldEnum | Prisma.SocialPostScalarFieldEnum[];
};
/**
 * SocialPost findFirstOrThrow
 */
export type SocialPostFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SocialPost to fetch.
     */
    where?: Prisma.SocialPostWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SocialPosts to fetch.
     */
    orderBy?: Prisma.SocialPostOrderByWithRelationInput | Prisma.SocialPostOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SocialPosts.
     */
    cursor?: Prisma.SocialPostWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SocialPosts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SocialPosts.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SocialPosts.
     */
    distinct?: Prisma.SocialPostScalarFieldEnum | Prisma.SocialPostScalarFieldEnum[];
};
/**
 * SocialPost findMany
 */
export type SocialPostFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SocialPosts to fetch.
     */
    where?: Prisma.SocialPostWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SocialPosts to fetch.
     */
    orderBy?: Prisma.SocialPostOrderByWithRelationInput | Prisma.SocialPostOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SocialPosts.
     */
    cursor?: Prisma.SocialPostWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SocialPosts from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SocialPosts.
     */
    skip?: number;
    distinct?: Prisma.SocialPostScalarFieldEnum | Prisma.SocialPostScalarFieldEnum[];
};
/**
 * SocialPost create
 */
export type SocialPostCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a SocialPost.
     */
    data: Prisma.XOR<Prisma.SocialPostCreateInput, Prisma.SocialPostUncheckedCreateInput>;
};
/**
 * SocialPost createMany
 */
export type SocialPostCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many SocialPosts.
     */
    data: Prisma.SocialPostCreateManyInput | Prisma.SocialPostCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SocialPost createManyAndReturn
 */
export type SocialPostCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialPost
     */
    select?: Prisma.SocialPostSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SocialPost
     */
    omit?: Prisma.SocialPostOmit<ExtArgs> | null;
    /**
     * The data used to create many SocialPosts.
     */
    data: Prisma.SocialPostCreateManyInput | Prisma.SocialPostCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SocialPostIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * SocialPost update
 */
export type SocialPostUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a SocialPost.
     */
    data: Prisma.XOR<Prisma.SocialPostUpdateInput, Prisma.SocialPostUncheckedUpdateInput>;
    /**
     * Choose, which SocialPost to update.
     */
    where: Prisma.SocialPostWhereUniqueInput;
};
/**
 * SocialPost updateMany
 */
export type SocialPostUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update SocialPosts.
     */
    data: Prisma.XOR<Prisma.SocialPostUpdateManyMutationInput, Prisma.SocialPostUncheckedUpdateManyInput>;
    /**
     * Filter which SocialPosts to update
     */
    where?: Prisma.SocialPostWhereInput;
    /**
     * Limit how many SocialPosts to update.
     */
    limit?: number;
};
/**
 * SocialPost updateManyAndReturn
 */
export type SocialPostUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SocialPost
     */
    select?: Prisma.SocialPostSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SocialPost
     */
    omit?: Prisma.SocialPostOmit<ExtArgs> | null;
    /**
     * The data used to update SocialPosts.
     */
    data: Prisma.XOR<Prisma.SocialPostUpdateManyMutationInput, Prisma.SocialPostUncheckedUpdateManyInput>;
    /**
     * Filter which SocialPosts to update
     */
    where?: Prisma.SocialPostWhereInput;
    /**
     * Limit how many SocialPosts to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SocialPostIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * SocialPost upsert
 */
export type SocialPostUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the SocialPost to update in case it exists.
     */
    where: Prisma.SocialPostWhereUniqueInput;
    /**
     * In case the SocialPost found by the `where` argument doesn't exist, create a new SocialPost with this data.
     */
    create: Prisma.XOR<Prisma.SocialPostCreateInput, Prisma.SocialPostUncheckedCreateInput>;
    /**
     * In case the SocialPost was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SocialPostUpdateInput, Prisma.SocialPostUncheckedUpdateInput>;
};
/**
 * SocialPost delete
 */
export type SocialPostDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which SocialPost to delete.
     */
    where: Prisma.SocialPostWhereUniqueInput;
};
/**
 * SocialPost deleteMany
 */
export type SocialPostDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SocialPosts to delete
     */
    where?: Prisma.SocialPostWhereInput;
    /**
     * Limit how many SocialPosts to delete.
     */
    limit?: number;
};
/**
 * SocialPost.restaurant
 */
export type SocialPost$restaurantArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.RestaurantWhereInput;
};
/**
 * SocialPost.comments
 */
export type SocialPost$commentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * SocialPost.likes
 */
export type SocialPost$likesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * SocialPost without action
 */
export type SocialPostDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=SocialPost.d.ts.map