import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model NotInterested
 *
 */
export type NotInterestedModel = runtime.Types.Result.DefaultSelection<Prisma.$NotInterestedPayload>;
export type AggregateNotInterested = {
    _count: NotInterestedCountAggregateOutputType | null;
    _min: NotInterestedMinAggregateOutputType | null;
    _max: NotInterestedMaxAggregateOutputType | null;
};
export type NotInterestedMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    reason: string | null;
    createdAt: Date | null;
};
export type NotInterestedMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    reason: string | null;
    createdAt: Date | null;
};
export type NotInterestedCountAggregateOutputType = {
    id: number;
    userId: number;
    restaurantId: number;
    reason: number;
    createdAt: number;
    _all: number;
};
export type NotInterestedMinAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    reason?: true;
    createdAt?: true;
};
export type NotInterestedMaxAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    reason?: true;
    createdAt?: true;
};
export type NotInterestedCountAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    reason?: true;
    createdAt?: true;
    _all?: true;
};
export type NotInterestedAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which NotInterested to aggregate.
     */
    where?: Prisma.NotInterestedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NotInteresteds to fetch.
     */
    orderBy?: Prisma.NotInterestedOrderByWithRelationInput | Prisma.NotInterestedOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.NotInterestedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NotInteresteds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NotInteresteds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned NotInteresteds
    **/
    _count?: true | NotInterestedCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: NotInterestedMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: NotInterestedMaxAggregateInputType;
};
export type GetNotInterestedAggregateType<T extends NotInterestedAggregateArgs> = {
    [P in keyof T & keyof AggregateNotInterested]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNotInterested[P]> : Prisma.GetScalarType<T[P], AggregateNotInterested[P]>;
};
export type NotInterestedGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.NotInterestedWhereInput;
    orderBy?: Prisma.NotInterestedOrderByWithAggregationInput | Prisma.NotInterestedOrderByWithAggregationInput[];
    by: Prisma.NotInterestedScalarFieldEnum[] | Prisma.NotInterestedScalarFieldEnum;
    having?: Prisma.NotInterestedScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NotInterestedCountAggregateInputType | true;
    _min?: NotInterestedMinAggregateInputType;
    _max?: NotInterestedMaxAggregateInputType;
};
export type NotInterestedGroupByOutputType = {
    id: string;
    userId: string;
    restaurantId: string;
    reason: string | null;
    createdAt: Date;
    _count: NotInterestedCountAggregateOutputType | null;
    _min: NotInterestedMinAggregateOutputType | null;
    _max: NotInterestedMaxAggregateOutputType | null;
};
type GetNotInterestedGroupByPayload<T extends NotInterestedGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NotInterestedGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NotInterestedGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NotInterestedGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NotInterestedGroupByOutputType[P]>;
}>>;
export type NotInterestedWhereInput = {
    AND?: Prisma.NotInterestedWhereInput | Prisma.NotInterestedWhereInput[];
    OR?: Prisma.NotInterestedWhereInput[];
    NOT?: Prisma.NotInterestedWhereInput | Prisma.NotInterestedWhereInput[];
    id?: Prisma.StringFilter<"NotInterested"> | string;
    userId?: Prisma.StringFilter<"NotInterested"> | string;
    restaurantId?: Prisma.StringFilter<"NotInterested"> | string;
    reason?: Prisma.StringNullableFilter<"NotInterested"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"NotInterested"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    restaurant?: Prisma.XOR<Prisma.RestaurantScalarRelationFilter, Prisma.RestaurantWhereInput>;
};
export type NotInterestedOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    restaurant?: Prisma.RestaurantOrderByWithRelationInput;
};
export type NotInterestedWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_restaurantId?: Prisma.NotInterestedUserIdRestaurantIdCompoundUniqueInput;
    AND?: Prisma.NotInterestedWhereInput | Prisma.NotInterestedWhereInput[];
    OR?: Prisma.NotInterestedWhereInput[];
    NOT?: Prisma.NotInterestedWhereInput | Prisma.NotInterestedWhereInput[];
    userId?: Prisma.StringFilter<"NotInterested"> | string;
    restaurantId?: Prisma.StringFilter<"NotInterested"> | string;
    reason?: Prisma.StringNullableFilter<"NotInterested"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"NotInterested"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    restaurant?: Prisma.XOR<Prisma.RestaurantScalarRelationFilter, Prisma.RestaurantWhereInput>;
}, "id" | "userId_restaurantId">;
export type NotInterestedOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.NotInterestedCountOrderByAggregateInput;
    _max?: Prisma.NotInterestedMaxOrderByAggregateInput;
    _min?: Prisma.NotInterestedMinOrderByAggregateInput;
};
export type NotInterestedScalarWhereWithAggregatesInput = {
    AND?: Prisma.NotInterestedScalarWhereWithAggregatesInput | Prisma.NotInterestedScalarWhereWithAggregatesInput[];
    OR?: Prisma.NotInterestedScalarWhereWithAggregatesInput[];
    NOT?: Prisma.NotInterestedScalarWhereWithAggregatesInput | Prisma.NotInterestedScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"NotInterested"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"NotInterested"> | string;
    restaurantId?: Prisma.StringWithAggregatesFilter<"NotInterested"> | string;
    reason?: Prisma.StringNullableWithAggregatesFilter<"NotInterested"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"NotInterested"> | Date | string;
};
export type NotInterestedCreateInput = {
    id?: string;
    reason?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutNotInterestedInput;
    restaurant: Prisma.RestaurantCreateNestedOneWithoutNotInterestedInput;
};
export type NotInterestedUncheckedCreateInput = {
    id?: string;
    userId: string;
    restaurantId: string;
    reason?: string | null;
    createdAt?: Date | string;
};
export type NotInterestedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutNotInterestedNestedInput;
    restaurant?: Prisma.RestaurantUpdateOneRequiredWithoutNotInterestedNestedInput;
};
export type NotInterestedUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotInterestedCreateManyInput = {
    id?: string;
    userId: string;
    restaurantId: string;
    reason?: string | null;
    createdAt?: Date | string;
};
export type NotInterestedUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotInterestedUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotInterestedListRelationFilter = {
    every?: Prisma.NotInterestedWhereInput;
    some?: Prisma.NotInterestedWhereInput;
    none?: Prisma.NotInterestedWhereInput;
};
export type NotInterestedOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NotInterestedUserIdRestaurantIdCompoundUniqueInput = {
    userId: string;
    restaurantId: string;
};
export type NotInterestedCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type NotInterestedMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type NotInterestedMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type NotInterestedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.NotInterestedCreateWithoutUserInput, Prisma.NotInterestedUncheckedCreateWithoutUserInput> | Prisma.NotInterestedCreateWithoutUserInput[] | Prisma.NotInterestedUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.NotInterestedCreateOrConnectWithoutUserInput | Prisma.NotInterestedCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.NotInterestedCreateManyUserInputEnvelope;
    connect?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
};
export type NotInterestedUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.NotInterestedCreateWithoutUserInput, Prisma.NotInterestedUncheckedCreateWithoutUserInput> | Prisma.NotInterestedCreateWithoutUserInput[] | Prisma.NotInterestedUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.NotInterestedCreateOrConnectWithoutUserInput | Prisma.NotInterestedCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.NotInterestedCreateManyUserInputEnvelope;
    connect?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
};
export type NotInterestedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.NotInterestedCreateWithoutUserInput, Prisma.NotInterestedUncheckedCreateWithoutUserInput> | Prisma.NotInterestedCreateWithoutUserInput[] | Prisma.NotInterestedUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.NotInterestedCreateOrConnectWithoutUserInput | Prisma.NotInterestedCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.NotInterestedUpsertWithWhereUniqueWithoutUserInput | Prisma.NotInterestedUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.NotInterestedCreateManyUserInputEnvelope;
    set?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    disconnect?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    delete?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    connect?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    update?: Prisma.NotInterestedUpdateWithWhereUniqueWithoutUserInput | Prisma.NotInterestedUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.NotInterestedUpdateManyWithWhereWithoutUserInput | Prisma.NotInterestedUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.NotInterestedScalarWhereInput | Prisma.NotInterestedScalarWhereInput[];
};
export type NotInterestedUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.NotInterestedCreateWithoutUserInput, Prisma.NotInterestedUncheckedCreateWithoutUserInput> | Prisma.NotInterestedCreateWithoutUserInput[] | Prisma.NotInterestedUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.NotInterestedCreateOrConnectWithoutUserInput | Prisma.NotInterestedCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.NotInterestedUpsertWithWhereUniqueWithoutUserInput | Prisma.NotInterestedUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.NotInterestedCreateManyUserInputEnvelope;
    set?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    disconnect?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    delete?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    connect?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    update?: Prisma.NotInterestedUpdateWithWhereUniqueWithoutUserInput | Prisma.NotInterestedUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.NotInterestedUpdateManyWithWhereWithoutUserInput | Prisma.NotInterestedUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.NotInterestedScalarWhereInput | Prisma.NotInterestedScalarWhereInput[];
};
export type NotInterestedCreateNestedManyWithoutRestaurantInput = {
    create?: Prisma.XOR<Prisma.NotInterestedCreateWithoutRestaurantInput, Prisma.NotInterestedUncheckedCreateWithoutRestaurantInput> | Prisma.NotInterestedCreateWithoutRestaurantInput[] | Prisma.NotInterestedUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.NotInterestedCreateOrConnectWithoutRestaurantInput | Prisma.NotInterestedCreateOrConnectWithoutRestaurantInput[];
    createMany?: Prisma.NotInterestedCreateManyRestaurantInputEnvelope;
    connect?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
};
export type NotInterestedUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: Prisma.XOR<Prisma.NotInterestedCreateWithoutRestaurantInput, Prisma.NotInterestedUncheckedCreateWithoutRestaurantInput> | Prisma.NotInterestedCreateWithoutRestaurantInput[] | Prisma.NotInterestedUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.NotInterestedCreateOrConnectWithoutRestaurantInput | Prisma.NotInterestedCreateOrConnectWithoutRestaurantInput[];
    createMany?: Prisma.NotInterestedCreateManyRestaurantInputEnvelope;
    connect?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
};
export type NotInterestedUpdateManyWithoutRestaurantNestedInput = {
    create?: Prisma.XOR<Prisma.NotInterestedCreateWithoutRestaurantInput, Prisma.NotInterestedUncheckedCreateWithoutRestaurantInput> | Prisma.NotInterestedCreateWithoutRestaurantInput[] | Prisma.NotInterestedUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.NotInterestedCreateOrConnectWithoutRestaurantInput | Prisma.NotInterestedCreateOrConnectWithoutRestaurantInput[];
    upsert?: Prisma.NotInterestedUpsertWithWhereUniqueWithoutRestaurantInput | Prisma.NotInterestedUpsertWithWhereUniqueWithoutRestaurantInput[];
    createMany?: Prisma.NotInterestedCreateManyRestaurantInputEnvelope;
    set?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    disconnect?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    delete?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    connect?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    update?: Prisma.NotInterestedUpdateWithWhereUniqueWithoutRestaurantInput | Prisma.NotInterestedUpdateWithWhereUniqueWithoutRestaurantInput[];
    updateMany?: Prisma.NotInterestedUpdateManyWithWhereWithoutRestaurantInput | Prisma.NotInterestedUpdateManyWithWhereWithoutRestaurantInput[];
    deleteMany?: Prisma.NotInterestedScalarWhereInput | Prisma.NotInterestedScalarWhereInput[];
};
export type NotInterestedUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: Prisma.XOR<Prisma.NotInterestedCreateWithoutRestaurantInput, Prisma.NotInterestedUncheckedCreateWithoutRestaurantInput> | Prisma.NotInterestedCreateWithoutRestaurantInput[] | Prisma.NotInterestedUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.NotInterestedCreateOrConnectWithoutRestaurantInput | Prisma.NotInterestedCreateOrConnectWithoutRestaurantInput[];
    upsert?: Prisma.NotInterestedUpsertWithWhereUniqueWithoutRestaurantInput | Prisma.NotInterestedUpsertWithWhereUniqueWithoutRestaurantInput[];
    createMany?: Prisma.NotInterestedCreateManyRestaurantInputEnvelope;
    set?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    disconnect?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    delete?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    connect?: Prisma.NotInterestedWhereUniqueInput | Prisma.NotInterestedWhereUniqueInput[];
    update?: Prisma.NotInterestedUpdateWithWhereUniqueWithoutRestaurantInput | Prisma.NotInterestedUpdateWithWhereUniqueWithoutRestaurantInput[];
    updateMany?: Prisma.NotInterestedUpdateManyWithWhereWithoutRestaurantInput | Prisma.NotInterestedUpdateManyWithWhereWithoutRestaurantInput[];
    deleteMany?: Prisma.NotInterestedScalarWhereInput | Prisma.NotInterestedScalarWhereInput[];
};
export type NotInterestedCreateWithoutUserInput = {
    id?: string;
    reason?: string | null;
    createdAt?: Date | string;
    restaurant: Prisma.RestaurantCreateNestedOneWithoutNotInterestedInput;
};
export type NotInterestedUncheckedCreateWithoutUserInput = {
    id?: string;
    restaurantId: string;
    reason?: string | null;
    createdAt?: Date | string;
};
export type NotInterestedCreateOrConnectWithoutUserInput = {
    where: Prisma.NotInterestedWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotInterestedCreateWithoutUserInput, Prisma.NotInterestedUncheckedCreateWithoutUserInput>;
};
export type NotInterestedCreateManyUserInputEnvelope = {
    data: Prisma.NotInterestedCreateManyUserInput | Prisma.NotInterestedCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type NotInterestedUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.NotInterestedWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotInterestedUpdateWithoutUserInput, Prisma.NotInterestedUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.NotInterestedCreateWithoutUserInput, Prisma.NotInterestedUncheckedCreateWithoutUserInput>;
};
export type NotInterestedUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.NotInterestedWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotInterestedUpdateWithoutUserInput, Prisma.NotInterestedUncheckedUpdateWithoutUserInput>;
};
export type NotInterestedUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.NotInterestedScalarWhereInput;
    data: Prisma.XOR<Prisma.NotInterestedUpdateManyMutationInput, Prisma.NotInterestedUncheckedUpdateManyWithoutUserInput>;
};
export type NotInterestedScalarWhereInput = {
    AND?: Prisma.NotInterestedScalarWhereInput | Prisma.NotInterestedScalarWhereInput[];
    OR?: Prisma.NotInterestedScalarWhereInput[];
    NOT?: Prisma.NotInterestedScalarWhereInput | Prisma.NotInterestedScalarWhereInput[];
    id?: Prisma.StringFilter<"NotInterested"> | string;
    userId?: Prisma.StringFilter<"NotInterested"> | string;
    restaurantId?: Prisma.StringFilter<"NotInterested"> | string;
    reason?: Prisma.StringNullableFilter<"NotInterested"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"NotInterested"> | Date | string;
};
export type NotInterestedCreateWithoutRestaurantInput = {
    id?: string;
    reason?: string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutNotInterestedInput;
};
export type NotInterestedUncheckedCreateWithoutRestaurantInput = {
    id?: string;
    userId: string;
    reason?: string | null;
    createdAt?: Date | string;
};
export type NotInterestedCreateOrConnectWithoutRestaurantInput = {
    where: Prisma.NotInterestedWhereUniqueInput;
    create: Prisma.XOR<Prisma.NotInterestedCreateWithoutRestaurantInput, Prisma.NotInterestedUncheckedCreateWithoutRestaurantInput>;
};
export type NotInterestedCreateManyRestaurantInputEnvelope = {
    data: Prisma.NotInterestedCreateManyRestaurantInput | Prisma.NotInterestedCreateManyRestaurantInput[];
    skipDuplicates?: boolean;
};
export type NotInterestedUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: Prisma.NotInterestedWhereUniqueInput;
    update: Prisma.XOR<Prisma.NotInterestedUpdateWithoutRestaurantInput, Prisma.NotInterestedUncheckedUpdateWithoutRestaurantInput>;
    create: Prisma.XOR<Prisma.NotInterestedCreateWithoutRestaurantInput, Prisma.NotInterestedUncheckedCreateWithoutRestaurantInput>;
};
export type NotInterestedUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: Prisma.NotInterestedWhereUniqueInput;
    data: Prisma.XOR<Prisma.NotInterestedUpdateWithoutRestaurantInput, Prisma.NotInterestedUncheckedUpdateWithoutRestaurantInput>;
};
export type NotInterestedUpdateManyWithWhereWithoutRestaurantInput = {
    where: Prisma.NotInterestedScalarWhereInput;
    data: Prisma.XOR<Prisma.NotInterestedUpdateManyMutationInput, Prisma.NotInterestedUncheckedUpdateManyWithoutRestaurantInput>;
};
export type NotInterestedCreateManyUserInput = {
    id?: string;
    restaurantId: string;
    reason?: string | null;
    createdAt?: Date | string;
};
export type NotInterestedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    restaurant?: Prisma.RestaurantUpdateOneRequiredWithoutNotInterestedNestedInput;
};
export type NotInterestedUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotInterestedUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotInterestedCreateManyRestaurantInput = {
    id?: string;
    userId: string;
    reason?: string | null;
    createdAt?: Date | string;
};
export type NotInterestedUpdateWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutNotInterestedNestedInput;
};
export type NotInterestedUncheckedUpdateWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotInterestedUncheckedUpdateManyWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type NotInterestedSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    reason?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notInterested"]>;
export type NotInterestedSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    reason?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notInterested"]>;
export type NotInterestedSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    reason?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["notInterested"]>;
export type NotInterestedSelectScalar = {
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    reason?: boolean;
    createdAt?: boolean;
};
export type NotInterestedOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "restaurantId" | "reason" | "createdAt", ExtArgs["result"]["notInterested"]>;
export type NotInterestedInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type NotInterestedIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type NotInterestedIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type $NotInterestedPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "NotInterested";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        restaurant: Prisma.$RestaurantPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        restaurantId: string;
        reason: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["notInterested"]>;
    composites: {};
};
export type NotInterestedGetPayload<S extends boolean | null | undefined | NotInterestedDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload, S>;
export type NotInterestedCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<NotInterestedFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NotInterestedCountAggregateInputType | true;
};
export interface NotInterestedDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['NotInterested'];
        meta: {
            name: 'NotInterested';
        };
    };
    /**
     * Find zero or one NotInterested that matches the filter.
     * @param {NotInterestedFindUniqueArgs} args - Arguments to find a NotInterested
     * @example
     * // Get one NotInterested
     * const notInterested = await prisma.notInterested.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotInterestedFindUniqueArgs>(args: Prisma.SelectSubset<T, NotInterestedFindUniqueArgs<ExtArgs>>): Prisma.Prisma__NotInterestedClient<runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one NotInterested that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotInterestedFindUniqueOrThrowArgs} args - Arguments to find a NotInterested
     * @example
     * // Get one NotInterested
     * const notInterested = await prisma.notInterested.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotInterestedFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, NotInterestedFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotInterestedClient<runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first NotInterested that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotInterestedFindFirstArgs} args - Arguments to find a NotInterested
     * @example
     * // Get one NotInterested
     * const notInterested = await prisma.notInterested.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotInterestedFindFirstArgs>(args?: Prisma.SelectSubset<T, NotInterestedFindFirstArgs<ExtArgs>>): Prisma.Prisma__NotInterestedClient<runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first NotInterested that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotInterestedFindFirstOrThrowArgs} args - Arguments to find a NotInterested
     * @example
     * // Get one NotInterested
     * const notInterested = await prisma.notInterested.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotInterestedFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, NotInterestedFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__NotInterestedClient<runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more NotInteresteds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotInterestedFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NotInteresteds
     * const notInteresteds = await prisma.notInterested.findMany()
     *
     * // Get first 10 NotInteresteds
     * const notInteresteds = await prisma.notInterested.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const notInterestedWithIdOnly = await prisma.notInterested.findMany({ select: { id: true } })
     *
     */
    findMany<T extends NotInterestedFindManyArgs>(args?: Prisma.SelectSubset<T, NotInterestedFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a NotInterested.
     * @param {NotInterestedCreateArgs} args - Arguments to create a NotInterested.
     * @example
     * // Create one NotInterested
     * const NotInterested = await prisma.notInterested.create({
     *   data: {
     *     // ... data to create a NotInterested
     *   }
     * })
     *
     */
    create<T extends NotInterestedCreateArgs>(args: Prisma.SelectSubset<T, NotInterestedCreateArgs<ExtArgs>>): Prisma.Prisma__NotInterestedClient<runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many NotInteresteds.
     * @param {NotInterestedCreateManyArgs} args - Arguments to create many NotInteresteds.
     * @example
     * // Create many NotInteresteds
     * const notInterested = await prisma.notInterested.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends NotInterestedCreateManyArgs>(args?: Prisma.SelectSubset<T, NotInterestedCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many NotInteresteds and returns the data saved in the database.
     * @param {NotInterestedCreateManyAndReturnArgs} args - Arguments to create many NotInteresteds.
     * @example
     * // Create many NotInteresteds
     * const notInterested = await prisma.notInterested.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many NotInteresteds and only return the `id`
     * const notInterestedWithIdOnly = await prisma.notInterested.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends NotInterestedCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, NotInterestedCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a NotInterested.
     * @param {NotInterestedDeleteArgs} args - Arguments to delete one NotInterested.
     * @example
     * // Delete one NotInterested
     * const NotInterested = await prisma.notInterested.delete({
     *   where: {
     *     // ... filter to delete one NotInterested
     *   }
     * })
     *
     */
    delete<T extends NotInterestedDeleteArgs>(args: Prisma.SelectSubset<T, NotInterestedDeleteArgs<ExtArgs>>): Prisma.Prisma__NotInterestedClient<runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one NotInterested.
     * @param {NotInterestedUpdateArgs} args - Arguments to update one NotInterested.
     * @example
     * // Update one NotInterested
     * const notInterested = await prisma.notInterested.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends NotInterestedUpdateArgs>(args: Prisma.SelectSubset<T, NotInterestedUpdateArgs<ExtArgs>>): Prisma.Prisma__NotInterestedClient<runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more NotInteresteds.
     * @param {NotInterestedDeleteManyArgs} args - Arguments to filter NotInteresteds to delete.
     * @example
     * // Delete a few NotInteresteds
     * const { count } = await prisma.notInterested.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends NotInterestedDeleteManyArgs>(args?: Prisma.SelectSubset<T, NotInterestedDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more NotInteresteds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotInterestedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NotInteresteds
     * const notInterested = await prisma.notInterested.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends NotInterestedUpdateManyArgs>(args: Prisma.SelectSubset<T, NotInterestedUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more NotInteresteds and returns the data updated in the database.
     * @param {NotInterestedUpdateManyAndReturnArgs} args - Arguments to update many NotInteresteds.
     * @example
     * // Update many NotInteresteds
     * const notInterested = await prisma.notInterested.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more NotInteresteds and only return the `id`
     * const notInterestedWithIdOnly = await prisma.notInterested.updateManyAndReturn({
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
    updateManyAndReturn<T extends NotInterestedUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, NotInterestedUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one NotInterested.
     * @param {NotInterestedUpsertArgs} args - Arguments to update or create a NotInterested.
     * @example
     * // Update or create a NotInterested
     * const notInterested = await prisma.notInterested.upsert({
     *   create: {
     *     // ... data to create a NotInterested
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NotInterested we want to update
     *   }
     * })
     */
    upsert<T extends NotInterestedUpsertArgs>(args: Prisma.SelectSubset<T, NotInterestedUpsertArgs<ExtArgs>>): Prisma.Prisma__NotInterestedClient<runtime.Types.Result.GetResult<Prisma.$NotInterestedPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of NotInteresteds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotInterestedCountArgs} args - Arguments to filter NotInteresteds to count.
     * @example
     * // Count the number of NotInteresteds
     * const count = await prisma.notInterested.count({
     *   where: {
     *     // ... the filter for the NotInteresteds we want to count
     *   }
     * })
    **/
    count<T extends NotInterestedCountArgs>(args?: Prisma.Subset<T, NotInterestedCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NotInterestedCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a NotInterested.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotInterestedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NotInterestedAggregateArgs>(args: Prisma.Subset<T, NotInterestedAggregateArgs>): Prisma.PrismaPromise<GetNotInterestedAggregateType<T>>;
    /**
     * Group by NotInterested.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotInterestedGroupByArgs} args - Group by arguments.
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
    groupBy<T extends NotInterestedGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: NotInterestedGroupByArgs['orderBy'];
    } : {
        orderBy?: NotInterestedGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, NotInterestedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotInterestedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the NotInterested model
     */
    readonly fields: NotInterestedFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for NotInterested.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__NotInterestedClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    restaurant<T extends Prisma.RestaurantDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RestaurantDefaultArgs<ExtArgs>>): Prisma.Prisma__RestaurantClient<runtime.Types.Result.GetResult<Prisma.$RestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the NotInterested model
 */
export interface NotInterestedFieldRefs {
    readonly id: Prisma.FieldRef<"NotInterested", 'String'>;
    readonly userId: Prisma.FieldRef<"NotInterested", 'String'>;
    readonly restaurantId: Prisma.FieldRef<"NotInterested", 'String'>;
    readonly reason: Prisma.FieldRef<"NotInterested", 'String'>;
    readonly createdAt: Prisma.FieldRef<"NotInterested", 'DateTime'>;
}
/**
 * NotInterested findUnique
 */
export type NotInterestedFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NotInterested to fetch.
     */
    where: Prisma.NotInterestedWhereUniqueInput;
};
/**
 * NotInterested findUniqueOrThrow
 */
export type NotInterestedFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NotInterested to fetch.
     */
    where: Prisma.NotInterestedWhereUniqueInput;
};
/**
 * NotInterested findFirst
 */
export type NotInterestedFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NotInterested to fetch.
     */
    where?: Prisma.NotInterestedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NotInteresteds to fetch.
     */
    orderBy?: Prisma.NotInterestedOrderByWithRelationInput | Prisma.NotInterestedOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for NotInteresteds.
     */
    cursor?: Prisma.NotInterestedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NotInteresteds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NotInteresteds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NotInteresteds.
     */
    distinct?: Prisma.NotInterestedScalarFieldEnum | Prisma.NotInterestedScalarFieldEnum[];
};
/**
 * NotInterested findFirstOrThrow
 */
export type NotInterestedFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NotInterested to fetch.
     */
    where?: Prisma.NotInterestedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NotInteresteds to fetch.
     */
    orderBy?: Prisma.NotInterestedOrderByWithRelationInput | Prisma.NotInterestedOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for NotInteresteds.
     */
    cursor?: Prisma.NotInterestedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NotInteresteds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NotInteresteds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of NotInteresteds.
     */
    distinct?: Prisma.NotInterestedScalarFieldEnum | Prisma.NotInterestedScalarFieldEnum[];
};
/**
 * NotInterested findMany
 */
export type NotInterestedFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which NotInteresteds to fetch.
     */
    where?: Prisma.NotInterestedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of NotInteresteds to fetch.
     */
    orderBy?: Prisma.NotInterestedOrderByWithRelationInput | Prisma.NotInterestedOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing NotInteresteds.
     */
    cursor?: Prisma.NotInterestedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` NotInteresteds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` NotInteresteds.
     */
    skip?: number;
    distinct?: Prisma.NotInterestedScalarFieldEnum | Prisma.NotInterestedScalarFieldEnum[];
};
/**
 * NotInterested create
 */
export type NotInterestedCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a NotInterested.
     */
    data: Prisma.XOR<Prisma.NotInterestedCreateInput, Prisma.NotInterestedUncheckedCreateInput>;
};
/**
 * NotInterested createMany
 */
export type NotInterestedCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many NotInteresteds.
     */
    data: Prisma.NotInterestedCreateManyInput | Prisma.NotInterestedCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * NotInterested createManyAndReturn
 */
export type NotInterestedCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotInterested
     */
    select?: Prisma.NotInterestedSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the NotInterested
     */
    omit?: Prisma.NotInterestedOmit<ExtArgs> | null;
    /**
     * The data used to create many NotInteresteds.
     */
    data: Prisma.NotInterestedCreateManyInput | Prisma.NotInterestedCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotInterestedIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * NotInterested update
 */
export type NotInterestedUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a NotInterested.
     */
    data: Prisma.XOR<Prisma.NotInterestedUpdateInput, Prisma.NotInterestedUncheckedUpdateInput>;
    /**
     * Choose, which NotInterested to update.
     */
    where: Prisma.NotInterestedWhereUniqueInput;
};
/**
 * NotInterested updateMany
 */
export type NotInterestedUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update NotInteresteds.
     */
    data: Prisma.XOR<Prisma.NotInterestedUpdateManyMutationInput, Prisma.NotInterestedUncheckedUpdateManyInput>;
    /**
     * Filter which NotInteresteds to update
     */
    where?: Prisma.NotInterestedWhereInput;
    /**
     * Limit how many NotInteresteds to update.
     */
    limit?: number;
};
/**
 * NotInterested updateManyAndReturn
 */
export type NotInterestedUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotInterested
     */
    select?: Prisma.NotInterestedSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the NotInterested
     */
    omit?: Prisma.NotInterestedOmit<ExtArgs> | null;
    /**
     * The data used to update NotInteresteds.
     */
    data: Prisma.XOR<Prisma.NotInterestedUpdateManyMutationInput, Prisma.NotInterestedUncheckedUpdateManyInput>;
    /**
     * Filter which NotInteresteds to update
     */
    where?: Prisma.NotInterestedWhereInput;
    /**
     * Limit how many NotInteresteds to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.NotInterestedIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * NotInterested upsert
 */
export type NotInterestedUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the NotInterested to update in case it exists.
     */
    where: Prisma.NotInterestedWhereUniqueInput;
    /**
     * In case the NotInterested found by the `where` argument doesn't exist, create a new NotInterested with this data.
     */
    create: Prisma.XOR<Prisma.NotInterestedCreateInput, Prisma.NotInterestedUncheckedCreateInput>;
    /**
     * In case the NotInterested was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.NotInterestedUpdateInput, Prisma.NotInterestedUncheckedUpdateInput>;
};
/**
 * NotInterested delete
 */
export type NotInterestedDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which NotInterested to delete.
     */
    where: Prisma.NotInterestedWhereUniqueInput;
};
/**
 * NotInterested deleteMany
 */
export type NotInterestedDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which NotInteresteds to delete
     */
    where?: Prisma.NotInterestedWhereInput;
    /**
     * Limit how many NotInteresteds to delete.
     */
    limit?: number;
};
/**
 * NotInterested without action
 */
export type NotInterestedDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=NotInterested.d.ts.map