import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model SavedRestaurant
 *
 */
export type SavedRestaurantModel = runtime.Types.Result.DefaultSelection<Prisma.$SavedRestaurantPayload>;
export type AggregateSavedRestaurant = {
    _count: SavedRestaurantCountAggregateOutputType | null;
    _min: SavedRestaurantMinAggregateOutputType | null;
    _max: SavedRestaurantMaxAggregateOutputType | null;
};
export type SavedRestaurantMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    createdAt: Date | null;
};
export type SavedRestaurantMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    createdAt: Date | null;
};
export type SavedRestaurantCountAggregateOutputType = {
    id: number;
    userId: number;
    restaurantId: number;
    createdAt: number;
    _all: number;
};
export type SavedRestaurantMinAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    createdAt?: true;
};
export type SavedRestaurantMaxAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    createdAt?: true;
};
export type SavedRestaurantCountAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    createdAt?: true;
    _all?: true;
};
export type SavedRestaurantAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SavedRestaurant to aggregate.
     */
    where?: Prisma.SavedRestaurantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SavedRestaurants to fetch.
     */
    orderBy?: Prisma.SavedRestaurantOrderByWithRelationInput | Prisma.SavedRestaurantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SavedRestaurantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SavedRestaurants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SavedRestaurants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned SavedRestaurants
    **/
    _count?: true | SavedRestaurantCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SavedRestaurantMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SavedRestaurantMaxAggregateInputType;
};
export type GetSavedRestaurantAggregateType<T extends SavedRestaurantAggregateArgs> = {
    [P in keyof T & keyof AggregateSavedRestaurant]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSavedRestaurant[P]> : Prisma.GetScalarType<T[P], AggregateSavedRestaurant[P]>;
};
export type SavedRestaurantGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SavedRestaurantWhereInput;
    orderBy?: Prisma.SavedRestaurantOrderByWithAggregationInput | Prisma.SavedRestaurantOrderByWithAggregationInput[];
    by: Prisma.SavedRestaurantScalarFieldEnum[] | Prisma.SavedRestaurantScalarFieldEnum;
    having?: Prisma.SavedRestaurantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SavedRestaurantCountAggregateInputType | true;
    _min?: SavedRestaurantMinAggregateInputType;
    _max?: SavedRestaurantMaxAggregateInputType;
};
export type SavedRestaurantGroupByOutputType = {
    id: string;
    userId: string;
    restaurantId: string;
    createdAt: Date;
    _count: SavedRestaurantCountAggregateOutputType | null;
    _min: SavedRestaurantMinAggregateOutputType | null;
    _max: SavedRestaurantMaxAggregateOutputType | null;
};
type GetSavedRestaurantGroupByPayload<T extends SavedRestaurantGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SavedRestaurantGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SavedRestaurantGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SavedRestaurantGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SavedRestaurantGroupByOutputType[P]>;
}>>;
export type SavedRestaurantWhereInput = {
    AND?: Prisma.SavedRestaurantWhereInput | Prisma.SavedRestaurantWhereInput[];
    OR?: Prisma.SavedRestaurantWhereInput[];
    NOT?: Prisma.SavedRestaurantWhereInput | Prisma.SavedRestaurantWhereInput[];
    id?: Prisma.StringFilter<"SavedRestaurant"> | string;
    userId?: Prisma.StringFilter<"SavedRestaurant"> | string;
    restaurantId?: Prisma.StringFilter<"SavedRestaurant"> | string;
    createdAt?: Prisma.DateTimeFilter<"SavedRestaurant"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    restaurant?: Prisma.XOR<Prisma.RestaurantScalarRelationFilter, Prisma.RestaurantWhereInput>;
};
export type SavedRestaurantOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    restaurant?: Prisma.RestaurantOrderByWithRelationInput;
};
export type SavedRestaurantWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_restaurantId?: Prisma.SavedRestaurantUserIdRestaurantIdCompoundUniqueInput;
    AND?: Prisma.SavedRestaurantWhereInput | Prisma.SavedRestaurantWhereInput[];
    OR?: Prisma.SavedRestaurantWhereInput[];
    NOT?: Prisma.SavedRestaurantWhereInput | Prisma.SavedRestaurantWhereInput[];
    userId?: Prisma.StringFilter<"SavedRestaurant"> | string;
    restaurantId?: Prisma.StringFilter<"SavedRestaurant"> | string;
    createdAt?: Prisma.DateTimeFilter<"SavedRestaurant"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    restaurant?: Prisma.XOR<Prisma.RestaurantScalarRelationFilter, Prisma.RestaurantWhereInput>;
}, "id" | "userId_restaurantId">;
export type SavedRestaurantOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SavedRestaurantCountOrderByAggregateInput;
    _max?: Prisma.SavedRestaurantMaxOrderByAggregateInput;
    _min?: Prisma.SavedRestaurantMinOrderByAggregateInput;
};
export type SavedRestaurantScalarWhereWithAggregatesInput = {
    AND?: Prisma.SavedRestaurantScalarWhereWithAggregatesInput | Prisma.SavedRestaurantScalarWhereWithAggregatesInput[];
    OR?: Prisma.SavedRestaurantScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SavedRestaurantScalarWhereWithAggregatesInput | Prisma.SavedRestaurantScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SavedRestaurant"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"SavedRestaurant"> | string;
    restaurantId?: Prisma.StringWithAggregatesFilter<"SavedRestaurant"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SavedRestaurant"> | Date | string;
};
export type SavedRestaurantCreateInput = {
    id?: string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSavedRestaurantsInput;
    restaurant: Prisma.RestaurantCreateNestedOneWithoutSavedByInput;
};
export type SavedRestaurantUncheckedCreateInput = {
    id?: string;
    userId: string;
    restaurantId: string;
    createdAt?: Date | string;
};
export type SavedRestaurantUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSavedRestaurantsNestedInput;
    restaurant?: Prisma.RestaurantUpdateOneRequiredWithoutSavedByNestedInput;
};
export type SavedRestaurantUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedRestaurantCreateManyInput = {
    id?: string;
    userId: string;
    restaurantId: string;
    createdAt?: Date | string;
};
export type SavedRestaurantUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedRestaurantUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedRestaurantListRelationFilter = {
    every?: Prisma.SavedRestaurantWhereInput;
    some?: Prisma.SavedRestaurantWhereInput;
    none?: Prisma.SavedRestaurantWhereInput;
};
export type SavedRestaurantOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SavedRestaurantUserIdRestaurantIdCompoundUniqueInput = {
    userId: string;
    restaurantId: string;
};
export type SavedRestaurantCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SavedRestaurantMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SavedRestaurantMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SavedRestaurantCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SavedRestaurantCreateWithoutUserInput, Prisma.SavedRestaurantUncheckedCreateWithoutUserInput> | Prisma.SavedRestaurantCreateWithoutUserInput[] | Prisma.SavedRestaurantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SavedRestaurantCreateOrConnectWithoutUserInput | Prisma.SavedRestaurantCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SavedRestaurantCreateManyUserInputEnvelope;
    connect?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
};
export type SavedRestaurantUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SavedRestaurantCreateWithoutUserInput, Prisma.SavedRestaurantUncheckedCreateWithoutUserInput> | Prisma.SavedRestaurantCreateWithoutUserInput[] | Prisma.SavedRestaurantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SavedRestaurantCreateOrConnectWithoutUserInput | Prisma.SavedRestaurantCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SavedRestaurantCreateManyUserInputEnvelope;
    connect?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
};
export type SavedRestaurantUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SavedRestaurantCreateWithoutUserInput, Prisma.SavedRestaurantUncheckedCreateWithoutUserInput> | Prisma.SavedRestaurantCreateWithoutUserInput[] | Prisma.SavedRestaurantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SavedRestaurantCreateOrConnectWithoutUserInput | Prisma.SavedRestaurantCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SavedRestaurantUpsertWithWhereUniqueWithoutUserInput | Prisma.SavedRestaurantUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SavedRestaurantCreateManyUserInputEnvelope;
    set?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    disconnect?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    delete?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    connect?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    update?: Prisma.SavedRestaurantUpdateWithWhereUniqueWithoutUserInput | Prisma.SavedRestaurantUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SavedRestaurantUpdateManyWithWhereWithoutUserInput | Prisma.SavedRestaurantUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SavedRestaurantScalarWhereInput | Prisma.SavedRestaurantScalarWhereInput[];
};
export type SavedRestaurantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SavedRestaurantCreateWithoutUserInput, Prisma.SavedRestaurantUncheckedCreateWithoutUserInput> | Prisma.SavedRestaurantCreateWithoutUserInput[] | Prisma.SavedRestaurantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SavedRestaurantCreateOrConnectWithoutUserInput | Prisma.SavedRestaurantCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SavedRestaurantUpsertWithWhereUniqueWithoutUserInput | Prisma.SavedRestaurantUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SavedRestaurantCreateManyUserInputEnvelope;
    set?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    disconnect?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    delete?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    connect?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    update?: Prisma.SavedRestaurantUpdateWithWhereUniqueWithoutUserInput | Prisma.SavedRestaurantUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SavedRestaurantUpdateManyWithWhereWithoutUserInput | Prisma.SavedRestaurantUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SavedRestaurantScalarWhereInput | Prisma.SavedRestaurantScalarWhereInput[];
};
export type SavedRestaurantCreateNestedManyWithoutRestaurantInput = {
    create?: Prisma.XOR<Prisma.SavedRestaurantCreateWithoutRestaurantInput, Prisma.SavedRestaurantUncheckedCreateWithoutRestaurantInput> | Prisma.SavedRestaurantCreateWithoutRestaurantInput[] | Prisma.SavedRestaurantUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.SavedRestaurantCreateOrConnectWithoutRestaurantInput | Prisma.SavedRestaurantCreateOrConnectWithoutRestaurantInput[];
    createMany?: Prisma.SavedRestaurantCreateManyRestaurantInputEnvelope;
    connect?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
};
export type SavedRestaurantUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: Prisma.XOR<Prisma.SavedRestaurantCreateWithoutRestaurantInput, Prisma.SavedRestaurantUncheckedCreateWithoutRestaurantInput> | Prisma.SavedRestaurantCreateWithoutRestaurantInput[] | Prisma.SavedRestaurantUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.SavedRestaurantCreateOrConnectWithoutRestaurantInput | Prisma.SavedRestaurantCreateOrConnectWithoutRestaurantInput[];
    createMany?: Prisma.SavedRestaurantCreateManyRestaurantInputEnvelope;
    connect?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
};
export type SavedRestaurantUpdateManyWithoutRestaurantNestedInput = {
    create?: Prisma.XOR<Prisma.SavedRestaurantCreateWithoutRestaurantInput, Prisma.SavedRestaurantUncheckedCreateWithoutRestaurantInput> | Prisma.SavedRestaurantCreateWithoutRestaurantInput[] | Prisma.SavedRestaurantUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.SavedRestaurantCreateOrConnectWithoutRestaurantInput | Prisma.SavedRestaurantCreateOrConnectWithoutRestaurantInput[];
    upsert?: Prisma.SavedRestaurantUpsertWithWhereUniqueWithoutRestaurantInput | Prisma.SavedRestaurantUpsertWithWhereUniqueWithoutRestaurantInput[];
    createMany?: Prisma.SavedRestaurantCreateManyRestaurantInputEnvelope;
    set?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    disconnect?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    delete?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    connect?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    update?: Prisma.SavedRestaurantUpdateWithWhereUniqueWithoutRestaurantInput | Prisma.SavedRestaurantUpdateWithWhereUniqueWithoutRestaurantInput[];
    updateMany?: Prisma.SavedRestaurantUpdateManyWithWhereWithoutRestaurantInput | Prisma.SavedRestaurantUpdateManyWithWhereWithoutRestaurantInput[];
    deleteMany?: Prisma.SavedRestaurantScalarWhereInput | Prisma.SavedRestaurantScalarWhereInput[];
};
export type SavedRestaurantUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: Prisma.XOR<Prisma.SavedRestaurantCreateWithoutRestaurantInput, Prisma.SavedRestaurantUncheckedCreateWithoutRestaurantInput> | Prisma.SavedRestaurantCreateWithoutRestaurantInput[] | Prisma.SavedRestaurantUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.SavedRestaurantCreateOrConnectWithoutRestaurantInput | Prisma.SavedRestaurantCreateOrConnectWithoutRestaurantInput[];
    upsert?: Prisma.SavedRestaurantUpsertWithWhereUniqueWithoutRestaurantInput | Prisma.SavedRestaurantUpsertWithWhereUniqueWithoutRestaurantInput[];
    createMany?: Prisma.SavedRestaurantCreateManyRestaurantInputEnvelope;
    set?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    disconnect?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    delete?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    connect?: Prisma.SavedRestaurantWhereUniqueInput | Prisma.SavedRestaurantWhereUniqueInput[];
    update?: Prisma.SavedRestaurantUpdateWithWhereUniqueWithoutRestaurantInput | Prisma.SavedRestaurantUpdateWithWhereUniqueWithoutRestaurantInput[];
    updateMany?: Prisma.SavedRestaurantUpdateManyWithWhereWithoutRestaurantInput | Prisma.SavedRestaurantUpdateManyWithWhereWithoutRestaurantInput[];
    deleteMany?: Prisma.SavedRestaurantScalarWhereInput | Prisma.SavedRestaurantScalarWhereInput[];
};
export type SavedRestaurantCreateWithoutUserInput = {
    id?: string;
    createdAt?: Date | string;
    restaurant: Prisma.RestaurantCreateNestedOneWithoutSavedByInput;
};
export type SavedRestaurantUncheckedCreateWithoutUserInput = {
    id?: string;
    restaurantId: string;
    createdAt?: Date | string;
};
export type SavedRestaurantCreateOrConnectWithoutUserInput = {
    where: Prisma.SavedRestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.SavedRestaurantCreateWithoutUserInput, Prisma.SavedRestaurantUncheckedCreateWithoutUserInput>;
};
export type SavedRestaurantCreateManyUserInputEnvelope = {
    data: Prisma.SavedRestaurantCreateManyUserInput | Prisma.SavedRestaurantCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type SavedRestaurantUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.SavedRestaurantWhereUniqueInput;
    update: Prisma.XOR<Prisma.SavedRestaurantUpdateWithoutUserInput, Prisma.SavedRestaurantUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.SavedRestaurantCreateWithoutUserInput, Prisma.SavedRestaurantUncheckedCreateWithoutUserInput>;
};
export type SavedRestaurantUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.SavedRestaurantWhereUniqueInput;
    data: Prisma.XOR<Prisma.SavedRestaurantUpdateWithoutUserInput, Prisma.SavedRestaurantUncheckedUpdateWithoutUserInput>;
};
export type SavedRestaurantUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.SavedRestaurantScalarWhereInput;
    data: Prisma.XOR<Prisma.SavedRestaurantUpdateManyMutationInput, Prisma.SavedRestaurantUncheckedUpdateManyWithoutUserInput>;
};
export type SavedRestaurantScalarWhereInput = {
    AND?: Prisma.SavedRestaurantScalarWhereInput | Prisma.SavedRestaurantScalarWhereInput[];
    OR?: Prisma.SavedRestaurantScalarWhereInput[];
    NOT?: Prisma.SavedRestaurantScalarWhereInput | Prisma.SavedRestaurantScalarWhereInput[];
    id?: Prisma.StringFilter<"SavedRestaurant"> | string;
    userId?: Prisma.StringFilter<"SavedRestaurant"> | string;
    restaurantId?: Prisma.StringFilter<"SavedRestaurant"> | string;
    createdAt?: Prisma.DateTimeFilter<"SavedRestaurant"> | Date | string;
};
export type SavedRestaurantCreateWithoutRestaurantInput = {
    id?: string;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSavedRestaurantsInput;
};
export type SavedRestaurantUncheckedCreateWithoutRestaurantInput = {
    id?: string;
    userId: string;
    createdAt?: Date | string;
};
export type SavedRestaurantCreateOrConnectWithoutRestaurantInput = {
    where: Prisma.SavedRestaurantWhereUniqueInput;
    create: Prisma.XOR<Prisma.SavedRestaurantCreateWithoutRestaurantInput, Prisma.SavedRestaurantUncheckedCreateWithoutRestaurantInput>;
};
export type SavedRestaurantCreateManyRestaurantInputEnvelope = {
    data: Prisma.SavedRestaurantCreateManyRestaurantInput | Prisma.SavedRestaurantCreateManyRestaurantInput[];
    skipDuplicates?: boolean;
};
export type SavedRestaurantUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: Prisma.SavedRestaurantWhereUniqueInput;
    update: Prisma.XOR<Prisma.SavedRestaurantUpdateWithoutRestaurantInput, Prisma.SavedRestaurantUncheckedUpdateWithoutRestaurantInput>;
    create: Prisma.XOR<Prisma.SavedRestaurantCreateWithoutRestaurantInput, Prisma.SavedRestaurantUncheckedCreateWithoutRestaurantInput>;
};
export type SavedRestaurantUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: Prisma.SavedRestaurantWhereUniqueInput;
    data: Prisma.XOR<Prisma.SavedRestaurantUpdateWithoutRestaurantInput, Prisma.SavedRestaurantUncheckedUpdateWithoutRestaurantInput>;
};
export type SavedRestaurantUpdateManyWithWhereWithoutRestaurantInput = {
    where: Prisma.SavedRestaurantScalarWhereInput;
    data: Prisma.XOR<Prisma.SavedRestaurantUpdateManyMutationInput, Prisma.SavedRestaurantUncheckedUpdateManyWithoutRestaurantInput>;
};
export type SavedRestaurantCreateManyUserInput = {
    id?: string;
    restaurantId: string;
    createdAt?: Date | string;
};
export type SavedRestaurantUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    restaurant?: Prisma.RestaurantUpdateOneRequiredWithoutSavedByNestedInput;
};
export type SavedRestaurantUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedRestaurantUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedRestaurantCreateManyRestaurantInput = {
    id?: string;
    userId: string;
    createdAt?: Date | string;
};
export type SavedRestaurantUpdateWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSavedRestaurantsNestedInput;
};
export type SavedRestaurantUncheckedUpdateWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedRestaurantUncheckedUpdateManyWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SavedRestaurantSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["savedRestaurant"]>;
export type SavedRestaurantSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["savedRestaurant"]>;
export type SavedRestaurantSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["savedRestaurant"]>;
export type SavedRestaurantSelectScalar = {
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    createdAt?: boolean;
};
export type SavedRestaurantOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "restaurantId" | "createdAt", ExtArgs["result"]["savedRestaurant"]>;
export type SavedRestaurantInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type SavedRestaurantIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type SavedRestaurantIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type $SavedRestaurantPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SavedRestaurant";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        restaurant: Prisma.$RestaurantPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        restaurantId: string;
        createdAt: Date;
    }, ExtArgs["result"]["savedRestaurant"]>;
    composites: {};
};
export type SavedRestaurantGetPayload<S extends boolean | null | undefined | SavedRestaurantDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload, S>;
export type SavedRestaurantCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SavedRestaurantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SavedRestaurantCountAggregateInputType | true;
};
export interface SavedRestaurantDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SavedRestaurant'];
        meta: {
            name: 'SavedRestaurant';
        };
    };
    /**
     * Find zero or one SavedRestaurant that matches the filter.
     * @param {SavedRestaurantFindUniqueArgs} args - Arguments to find a SavedRestaurant
     * @example
     * // Get one SavedRestaurant
     * const savedRestaurant = await prisma.savedRestaurant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SavedRestaurantFindUniqueArgs>(args: Prisma.SelectSubset<T, SavedRestaurantFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SavedRestaurantClient<runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one SavedRestaurant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SavedRestaurantFindUniqueOrThrowArgs} args - Arguments to find a SavedRestaurant
     * @example
     * // Get one SavedRestaurant
     * const savedRestaurant = await prisma.savedRestaurant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SavedRestaurantFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SavedRestaurantFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SavedRestaurantClient<runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SavedRestaurant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRestaurantFindFirstArgs} args - Arguments to find a SavedRestaurant
     * @example
     * // Get one SavedRestaurant
     * const savedRestaurant = await prisma.savedRestaurant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SavedRestaurantFindFirstArgs>(args?: Prisma.SelectSubset<T, SavedRestaurantFindFirstArgs<ExtArgs>>): Prisma.Prisma__SavedRestaurantClient<runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first SavedRestaurant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRestaurantFindFirstOrThrowArgs} args - Arguments to find a SavedRestaurant
     * @example
     * // Get one SavedRestaurant
     * const savedRestaurant = await prisma.savedRestaurant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SavedRestaurantFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SavedRestaurantFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SavedRestaurantClient<runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more SavedRestaurants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRestaurantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SavedRestaurants
     * const savedRestaurants = await prisma.savedRestaurant.findMany()
     *
     * // Get first 10 SavedRestaurants
     * const savedRestaurants = await prisma.savedRestaurant.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const savedRestaurantWithIdOnly = await prisma.savedRestaurant.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SavedRestaurantFindManyArgs>(args?: Prisma.SelectSubset<T, SavedRestaurantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a SavedRestaurant.
     * @param {SavedRestaurantCreateArgs} args - Arguments to create a SavedRestaurant.
     * @example
     * // Create one SavedRestaurant
     * const SavedRestaurant = await prisma.savedRestaurant.create({
     *   data: {
     *     // ... data to create a SavedRestaurant
     *   }
     * })
     *
     */
    create<T extends SavedRestaurantCreateArgs>(args: Prisma.SelectSubset<T, SavedRestaurantCreateArgs<ExtArgs>>): Prisma.Prisma__SavedRestaurantClient<runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many SavedRestaurants.
     * @param {SavedRestaurantCreateManyArgs} args - Arguments to create many SavedRestaurants.
     * @example
     * // Create many SavedRestaurants
     * const savedRestaurant = await prisma.savedRestaurant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SavedRestaurantCreateManyArgs>(args?: Prisma.SelectSubset<T, SavedRestaurantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many SavedRestaurants and returns the data saved in the database.
     * @param {SavedRestaurantCreateManyAndReturnArgs} args - Arguments to create many SavedRestaurants.
     * @example
     * // Create many SavedRestaurants
     * const savedRestaurant = await prisma.savedRestaurant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many SavedRestaurants and only return the `id`
     * const savedRestaurantWithIdOnly = await prisma.savedRestaurant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SavedRestaurantCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SavedRestaurantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a SavedRestaurant.
     * @param {SavedRestaurantDeleteArgs} args - Arguments to delete one SavedRestaurant.
     * @example
     * // Delete one SavedRestaurant
     * const SavedRestaurant = await prisma.savedRestaurant.delete({
     *   where: {
     *     // ... filter to delete one SavedRestaurant
     *   }
     * })
     *
     */
    delete<T extends SavedRestaurantDeleteArgs>(args: Prisma.SelectSubset<T, SavedRestaurantDeleteArgs<ExtArgs>>): Prisma.Prisma__SavedRestaurantClient<runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one SavedRestaurant.
     * @param {SavedRestaurantUpdateArgs} args - Arguments to update one SavedRestaurant.
     * @example
     * // Update one SavedRestaurant
     * const savedRestaurant = await prisma.savedRestaurant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SavedRestaurantUpdateArgs>(args: Prisma.SelectSubset<T, SavedRestaurantUpdateArgs<ExtArgs>>): Prisma.Prisma__SavedRestaurantClient<runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more SavedRestaurants.
     * @param {SavedRestaurantDeleteManyArgs} args - Arguments to filter SavedRestaurants to delete.
     * @example
     * // Delete a few SavedRestaurants
     * const { count } = await prisma.savedRestaurant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SavedRestaurantDeleteManyArgs>(args?: Prisma.SelectSubset<T, SavedRestaurantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SavedRestaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRestaurantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SavedRestaurants
     * const savedRestaurant = await prisma.savedRestaurant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SavedRestaurantUpdateManyArgs>(args: Prisma.SelectSubset<T, SavedRestaurantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more SavedRestaurants and returns the data updated in the database.
     * @param {SavedRestaurantUpdateManyAndReturnArgs} args - Arguments to update many SavedRestaurants.
     * @example
     * // Update many SavedRestaurants
     * const savedRestaurant = await prisma.savedRestaurant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more SavedRestaurants and only return the `id`
     * const savedRestaurantWithIdOnly = await prisma.savedRestaurant.updateManyAndReturn({
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
    updateManyAndReturn<T extends SavedRestaurantUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SavedRestaurantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one SavedRestaurant.
     * @param {SavedRestaurantUpsertArgs} args - Arguments to update or create a SavedRestaurant.
     * @example
     * // Update or create a SavedRestaurant
     * const savedRestaurant = await prisma.savedRestaurant.upsert({
     *   create: {
     *     // ... data to create a SavedRestaurant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SavedRestaurant we want to update
     *   }
     * })
     */
    upsert<T extends SavedRestaurantUpsertArgs>(args: Prisma.SelectSubset<T, SavedRestaurantUpsertArgs<ExtArgs>>): Prisma.Prisma__SavedRestaurantClient<runtime.Types.Result.GetResult<Prisma.$SavedRestaurantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of SavedRestaurants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRestaurantCountArgs} args - Arguments to filter SavedRestaurants to count.
     * @example
     * // Count the number of SavedRestaurants
     * const count = await prisma.savedRestaurant.count({
     *   where: {
     *     // ... the filter for the SavedRestaurants we want to count
     *   }
     * })
    **/
    count<T extends SavedRestaurantCountArgs>(args?: Prisma.Subset<T, SavedRestaurantCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SavedRestaurantCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a SavedRestaurant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRestaurantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SavedRestaurantAggregateArgs>(args: Prisma.Subset<T, SavedRestaurantAggregateArgs>): Prisma.PrismaPromise<GetSavedRestaurantAggregateType<T>>;
    /**
     * Group by SavedRestaurant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SavedRestaurantGroupByArgs} args - Group by arguments.
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
    groupBy<T extends SavedRestaurantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SavedRestaurantGroupByArgs['orderBy'];
    } : {
        orderBy?: SavedRestaurantGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SavedRestaurantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSavedRestaurantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the SavedRestaurant model
     */
    readonly fields: SavedRestaurantFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for SavedRestaurant.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SavedRestaurantClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the SavedRestaurant model
 */
export interface SavedRestaurantFieldRefs {
    readonly id: Prisma.FieldRef<"SavedRestaurant", 'String'>;
    readonly userId: Prisma.FieldRef<"SavedRestaurant", 'String'>;
    readonly restaurantId: Prisma.FieldRef<"SavedRestaurant", 'String'>;
    readonly createdAt: Prisma.FieldRef<"SavedRestaurant", 'DateTime'>;
}
/**
 * SavedRestaurant findUnique
 */
export type SavedRestaurantFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SavedRestaurant to fetch.
     */
    where: Prisma.SavedRestaurantWhereUniqueInput;
};
/**
 * SavedRestaurant findUniqueOrThrow
 */
export type SavedRestaurantFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SavedRestaurant to fetch.
     */
    where: Prisma.SavedRestaurantWhereUniqueInput;
};
/**
 * SavedRestaurant findFirst
 */
export type SavedRestaurantFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SavedRestaurant to fetch.
     */
    where?: Prisma.SavedRestaurantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SavedRestaurants to fetch.
     */
    orderBy?: Prisma.SavedRestaurantOrderByWithRelationInput | Prisma.SavedRestaurantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SavedRestaurants.
     */
    cursor?: Prisma.SavedRestaurantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SavedRestaurants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SavedRestaurants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SavedRestaurants.
     */
    distinct?: Prisma.SavedRestaurantScalarFieldEnum | Prisma.SavedRestaurantScalarFieldEnum[];
};
/**
 * SavedRestaurant findFirstOrThrow
 */
export type SavedRestaurantFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SavedRestaurant to fetch.
     */
    where?: Prisma.SavedRestaurantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SavedRestaurants to fetch.
     */
    orderBy?: Prisma.SavedRestaurantOrderByWithRelationInput | Prisma.SavedRestaurantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for SavedRestaurants.
     */
    cursor?: Prisma.SavedRestaurantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SavedRestaurants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SavedRestaurants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of SavedRestaurants.
     */
    distinct?: Prisma.SavedRestaurantScalarFieldEnum | Prisma.SavedRestaurantScalarFieldEnum[];
};
/**
 * SavedRestaurant findMany
 */
export type SavedRestaurantFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which SavedRestaurants to fetch.
     */
    where?: Prisma.SavedRestaurantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of SavedRestaurants to fetch.
     */
    orderBy?: Prisma.SavedRestaurantOrderByWithRelationInput | Prisma.SavedRestaurantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing SavedRestaurants.
     */
    cursor?: Prisma.SavedRestaurantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` SavedRestaurants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` SavedRestaurants.
     */
    skip?: number;
    distinct?: Prisma.SavedRestaurantScalarFieldEnum | Prisma.SavedRestaurantScalarFieldEnum[];
};
/**
 * SavedRestaurant create
 */
export type SavedRestaurantCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a SavedRestaurant.
     */
    data: Prisma.XOR<Prisma.SavedRestaurantCreateInput, Prisma.SavedRestaurantUncheckedCreateInput>;
};
/**
 * SavedRestaurant createMany
 */
export type SavedRestaurantCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many SavedRestaurants.
     */
    data: Prisma.SavedRestaurantCreateManyInput | Prisma.SavedRestaurantCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * SavedRestaurant createManyAndReturn
 */
export type SavedRestaurantCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRestaurant
     */
    select?: Prisma.SavedRestaurantSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SavedRestaurant
     */
    omit?: Prisma.SavedRestaurantOmit<ExtArgs> | null;
    /**
     * The data used to create many SavedRestaurants.
     */
    data: Prisma.SavedRestaurantCreateManyInput | Prisma.SavedRestaurantCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SavedRestaurantIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * SavedRestaurant update
 */
export type SavedRestaurantUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a SavedRestaurant.
     */
    data: Prisma.XOR<Prisma.SavedRestaurantUpdateInput, Prisma.SavedRestaurantUncheckedUpdateInput>;
    /**
     * Choose, which SavedRestaurant to update.
     */
    where: Prisma.SavedRestaurantWhereUniqueInput;
};
/**
 * SavedRestaurant updateMany
 */
export type SavedRestaurantUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update SavedRestaurants.
     */
    data: Prisma.XOR<Prisma.SavedRestaurantUpdateManyMutationInput, Prisma.SavedRestaurantUncheckedUpdateManyInput>;
    /**
     * Filter which SavedRestaurants to update
     */
    where?: Prisma.SavedRestaurantWhereInput;
    /**
     * Limit how many SavedRestaurants to update.
     */
    limit?: number;
};
/**
 * SavedRestaurant updateManyAndReturn
 */
export type SavedRestaurantUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SavedRestaurant
     */
    select?: Prisma.SavedRestaurantSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the SavedRestaurant
     */
    omit?: Prisma.SavedRestaurantOmit<ExtArgs> | null;
    /**
     * The data used to update SavedRestaurants.
     */
    data: Prisma.XOR<Prisma.SavedRestaurantUpdateManyMutationInput, Prisma.SavedRestaurantUncheckedUpdateManyInput>;
    /**
     * Filter which SavedRestaurants to update
     */
    where?: Prisma.SavedRestaurantWhereInput;
    /**
     * Limit how many SavedRestaurants to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SavedRestaurantIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * SavedRestaurant upsert
 */
export type SavedRestaurantUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the SavedRestaurant to update in case it exists.
     */
    where: Prisma.SavedRestaurantWhereUniqueInput;
    /**
     * In case the SavedRestaurant found by the `where` argument doesn't exist, create a new SavedRestaurant with this data.
     */
    create: Prisma.XOR<Prisma.SavedRestaurantCreateInput, Prisma.SavedRestaurantUncheckedCreateInput>;
    /**
     * In case the SavedRestaurant was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SavedRestaurantUpdateInput, Prisma.SavedRestaurantUncheckedUpdateInput>;
};
/**
 * SavedRestaurant delete
 */
export type SavedRestaurantDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which SavedRestaurant to delete.
     */
    where: Prisma.SavedRestaurantWhereUniqueInput;
};
/**
 * SavedRestaurant deleteMany
 */
export type SavedRestaurantDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which SavedRestaurants to delete
     */
    where?: Prisma.SavedRestaurantWhereInput;
    /**
     * Limit how many SavedRestaurants to delete.
     */
    limit?: number;
};
/**
 * SavedRestaurant without action
 */
export type SavedRestaurantDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=SavedRestaurant.d.ts.map