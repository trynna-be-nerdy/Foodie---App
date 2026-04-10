import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model PointsTransaction
 *
 */
export type PointsTransactionModel = runtime.Types.Result.DefaultSelection<Prisma.$PointsTransactionPayload>;
export type AggregatePointsTransaction = {
    _count: PointsTransactionCountAggregateOutputType | null;
    _avg: PointsTransactionAvgAggregateOutputType | null;
    _sum: PointsTransactionSumAggregateOutputType | null;
    _min: PointsTransactionMinAggregateOutputType | null;
    _max: PointsTransactionMaxAggregateOutputType | null;
};
export type PointsTransactionAvgAggregateOutputType = {
    amount: number | null;
};
export type PointsTransactionSumAggregateOutputType = {
    amount: number | null;
};
export type PointsTransactionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    amount: number | null;
    type: $Enums.PointsTransactionType | null;
    source: string | null;
    orderId: string | null;
    createdAt: Date | null;
};
export type PointsTransactionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    amount: number | null;
    type: $Enums.PointsTransactionType | null;
    source: string | null;
    orderId: string | null;
    createdAt: Date | null;
};
export type PointsTransactionCountAggregateOutputType = {
    id: number;
    userId: number;
    restaurantId: number;
    amount: number;
    type: number;
    source: number;
    orderId: number;
    metadata: number;
    createdAt: number;
    _all: number;
};
export type PointsTransactionAvgAggregateInputType = {
    amount?: true;
};
export type PointsTransactionSumAggregateInputType = {
    amount?: true;
};
export type PointsTransactionMinAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    amount?: true;
    type?: true;
    source?: true;
    orderId?: true;
    createdAt?: true;
};
export type PointsTransactionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    amount?: true;
    type?: true;
    source?: true;
    orderId?: true;
    createdAt?: true;
};
export type PointsTransactionCountAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    amount?: true;
    type?: true;
    source?: true;
    orderId?: true;
    metadata?: true;
    createdAt?: true;
    _all?: true;
};
export type PointsTransactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PointsTransaction to aggregate.
     */
    where?: Prisma.PointsTransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PointsTransactions to fetch.
     */
    orderBy?: Prisma.PointsTransactionOrderByWithRelationInput | Prisma.PointsTransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PointsTransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PointsTransactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PointsTransactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PointsTransactions
    **/
    _count?: true | PointsTransactionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PointsTransactionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PointsTransactionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PointsTransactionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PointsTransactionMaxAggregateInputType;
};
export type GetPointsTransactionAggregateType<T extends PointsTransactionAggregateArgs> = {
    [P in keyof T & keyof AggregatePointsTransaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePointsTransaction[P]> : Prisma.GetScalarType<T[P], AggregatePointsTransaction[P]>;
};
export type PointsTransactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointsTransactionWhereInput;
    orderBy?: Prisma.PointsTransactionOrderByWithAggregationInput | Prisma.PointsTransactionOrderByWithAggregationInput[];
    by: Prisma.PointsTransactionScalarFieldEnum[] | Prisma.PointsTransactionScalarFieldEnum;
    having?: Prisma.PointsTransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PointsTransactionCountAggregateInputType | true;
    _avg?: PointsTransactionAvgAggregateInputType;
    _sum?: PointsTransactionSumAggregateInputType;
    _min?: PointsTransactionMinAggregateInputType;
    _max?: PointsTransactionMaxAggregateInputType;
};
export type PointsTransactionGroupByOutputType = {
    id: string;
    userId: string;
    restaurantId: string;
    amount: number;
    type: $Enums.PointsTransactionType;
    source: string;
    orderId: string | null;
    metadata: runtime.JsonValue | null;
    createdAt: Date;
    _count: PointsTransactionCountAggregateOutputType | null;
    _avg: PointsTransactionAvgAggregateOutputType | null;
    _sum: PointsTransactionSumAggregateOutputType | null;
    _min: PointsTransactionMinAggregateOutputType | null;
    _max: PointsTransactionMaxAggregateOutputType | null;
};
type GetPointsTransactionGroupByPayload<T extends PointsTransactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PointsTransactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PointsTransactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PointsTransactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PointsTransactionGroupByOutputType[P]>;
}>>;
export type PointsTransactionWhereInput = {
    AND?: Prisma.PointsTransactionWhereInput | Prisma.PointsTransactionWhereInput[];
    OR?: Prisma.PointsTransactionWhereInput[];
    NOT?: Prisma.PointsTransactionWhereInput | Prisma.PointsTransactionWhereInput[];
    id?: Prisma.StringFilter<"PointsTransaction"> | string;
    userId?: Prisma.StringFilter<"PointsTransaction"> | string;
    restaurantId?: Prisma.StringFilter<"PointsTransaction"> | string;
    amount?: Prisma.IntFilter<"PointsTransaction"> | number;
    type?: Prisma.EnumPointsTransactionTypeFilter<"PointsTransaction"> | $Enums.PointsTransactionType;
    source?: Prisma.StringFilter<"PointsTransaction"> | string;
    orderId?: Prisma.StringNullableFilter<"PointsTransaction"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"PointsTransaction">;
    createdAt?: Prisma.DateTimeFilter<"PointsTransaction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    restaurant?: Prisma.XOR<Prisma.RestaurantScalarRelationFilter, Prisma.RestaurantWhereInput>;
};
export type PointsTransactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    orderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    restaurant?: Prisma.RestaurantOrderByWithRelationInput;
};
export type PointsTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PointsTransactionWhereInput | Prisma.PointsTransactionWhereInput[];
    OR?: Prisma.PointsTransactionWhereInput[];
    NOT?: Prisma.PointsTransactionWhereInput | Prisma.PointsTransactionWhereInput[];
    userId?: Prisma.StringFilter<"PointsTransaction"> | string;
    restaurantId?: Prisma.StringFilter<"PointsTransaction"> | string;
    amount?: Prisma.IntFilter<"PointsTransaction"> | number;
    type?: Prisma.EnumPointsTransactionTypeFilter<"PointsTransaction"> | $Enums.PointsTransactionType;
    source?: Prisma.StringFilter<"PointsTransaction"> | string;
    orderId?: Prisma.StringNullableFilter<"PointsTransaction"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"PointsTransaction">;
    createdAt?: Prisma.DateTimeFilter<"PointsTransaction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    restaurant?: Prisma.XOR<Prisma.RestaurantScalarRelationFilter, Prisma.RestaurantWhereInput>;
}, "id">;
export type PointsTransactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    orderId?: Prisma.SortOrderInput | Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PointsTransactionCountOrderByAggregateInput;
    _avg?: Prisma.PointsTransactionAvgOrderByAggregateInput;
    _max?: Prisma.PointsTransactionMaxOrderByAggregateInput;
    _min?: Prisma.PointsTransactionMinOrderByAggregateInput;
    _sum?: Prisma.PointsTransactionSumOrderByAggregateInput;
};
export type PointsTransactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.PointsTransactionScalarWhereWithAggregatesInput | Prisma.PointsTransactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.PointsTransactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PointsTransactionScalarWhereWithAggregatesInput | Prisma.PointsTransactionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PointsTransaction"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"PointsTransaction"> | string;
    restaurantId?: Prisma.StringWithAggregatesFilter<"PointsTransaction"> | string;
    amount?: Prisma.IntWithAggregatesFilter<"PointsTransaction"> | number;
    type?: Prisma.EnumPointsTransactionTypeWithAggregatesFilter<"PointsTransaction"> | $Enums.PointsTransactionType;
    source?: Prisma.StringWithAggregatesFilter<"PointsTransaction"> | string;
    orderId?: Prisma.StringNullableWithAggregatesFilter<"PointsTransaction"> | string | null;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"PointsTransaction">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PointsTransaction"> | Date | string;
};
export type PointsTransactionCreateInput = {
    id?: string;
    amount: number;
    type: $Enums.PointsTransactionType;
    source: string;
    orderId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPointsTransactionsInput;
    restaurant: Prisma.RestaurantCreateNestedOneWithoutPointsTransactionsInput;
};
export type PointsTransactionUncheckedCreateInput = {
    id?: string;
    userId: string;
    restaurantId: string;
    amount: number;
    type: $Enums.PointsTransactionType;
    source: string;
    orderId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointsTransactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointsTransactionTypeFieldUpdateOperationsInput | $Enums.PointsTransactionType;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPointsTransactionsNestedInput;
    restaurant?: Prisma.RestaurantUpdateOneRequiredWithoutPointsTransactionsNestedInput;
};
export type PointsTransactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointsTransactionTypeFieldUpdateOperationsInput | $Enums.PointsTransactionType;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsTransactionCreateManyInput = {
    id?: string;
    userId: string;
    restaurantId: string;
    amount: number;
    type: $Enums.PointsTransactionType;
    source: string;
    orderId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointsTransactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointsTransactionTypeFieldUpdateOperationsInput | $Enums.PointsTransactionType;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsTransactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointsTransactionTypeFieldUpdateOperationsInput | $Enums.PointsTransactionType;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsTransactionListRelationFilter = {
    every?: Prisma.PointsTransactionWhereInput;
    some?: Prisma.PointsTransactionWhereInput;
    none?: Prisma.PointsTransactionWhereInput;
};
export type PointsTransactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PointsTransactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PointsTransactionAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type PointsTransactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PointsTransactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    source?: Prisma.SortOrder;
    orderId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PointsTransactionSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type PointsTransactionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PointsTransactionCreateWithoutUserInput, Prisma.PointsTransactionUncheckedCreateWithoutUserInput> | Prisma.PointsTransactionCreateWithoutUserInput[] | Prisma.PointsTransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointsTransactionCreateOrConnectWithoutUserInput | Prisma.PointsTransactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PointsTransactionCreateManyUserInputEnvelope;
    connect?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
};
export type PointsTransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PointsTransactionCreateWithoutUserInput, Prisma.PointsTransactionUncheckedCreateWithoutUserInput> | Prisma.PointsTransactionCreateWithoutUserInput[] | Prisma.PointsTransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointsTransactionCreateOrConnectWithoutUserInput | Prisma.PointsTransactionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PointsTransactionCreateManyUserInputEnvelope;
    connect?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
};
export type PointsTransactionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PointsTransactionCreateWithoutUserInput, Prisma.PointsTransactionUncheckedCreateWithoutUserInput> | Prisma.PointsTransactionCreateWithoutUserInput[] | Prisma.PointsTransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointsTransactionCreateOrConnectWithoutUserInput | Prisma.PointsTransactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PointsTransactionUpsertWithWhereUniqueWithoutUserInput | Prisma.PointsTransactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PointsTransactionCreateManyUserInputEnvelope;
    set?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    disconnect?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    delete?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    connect?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    update?: Prisma.PointsTransactionUpdateWithWhereUniqueWithoutUserInput | Prisma.PointsTransactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PointsTransactionUpdateManyWithWhereWithoutUserInput | Prisma.PointsTransactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PointsTransactionScalarWhereInput | Prisma.PointsTransactionScalarWhereInput[];
};
export type PointsTransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PointsTransactionCreateWithoutUserInput, Prisma.PointsTransactionUncheckedCreateWithoutUserInput> | Prisma.PointsTransactionCreateWithoutUserInput[] | Prisma.PointsTransactionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointsTransactionCreateOrConnectWithoutUserInput | Prisma.PointsTransactionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PointsTransactionUpsertWithWhereUniqueWithoutUserInput | Prisma.PointsTransactionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PointsTransactionCreateManyUserInputEnvelope;
    set?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    disconnect?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    delete?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    connect?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    update?: Prisma.PointsTransactionUpdateWithWhereUniqueWithoutUserInput | Prisma.PointsTransactionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PointsTransactionUpdateManyWithWhereWithoutUserInput | Prisma.PointsTransactionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PointsTransactionScalarWhereInput | Prisma.PointsTransactionScalarWhereInput[];
};
export type PointsTransactionCreateNestedManyWithoutRestaurantInput = {
    create?: Prisma.XOR<Prisma.PointsTransactionCreateWithoutRestaurantInput, Prisma.PointsTransactionUncheckedCreateWithoutRestaurantInput> | Prisma.PointsTransactionCreateWithoutRestaurantInput[] | Prisma.PointsTransactionUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.PointsTransactionCreateOrConnectWithoutRestaurantInput | Prisma.PointsTransactionCreateOrConnectWithoutRestaurantInput[];
    createMany?: Prisma.PointsTransactionCreateManyRestaurantInputEnvelope;
    connect?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
};
export type PointsTransactionUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: Prisma.XOR<Prisma.PointsTransactionCreateWithoutRestaurantInput, Prisma.PointsTransactionUncheckedCreateWithoutRestaurantInput> | Prisma.PointsTransactionCreateWithoutRestaurantInput[] | Prisma.PointsTransactionUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.PointsTransactionCreateOrConnectWithoutRestaurantInput | Prisma.PointsTransactionCreateOrConnectWithoutRestaurantInput[];
    createMany?: Prisma.PointsTransactionCreateManyRestaurantInputEnvelope;
    connect?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
};
export type PointsTransactionUpdateManyWithoutRestaurantNestedInput = {
    create?: Prisma.XOR<Prisma.PointsTransactionCreateWithoutRestaurantInput, Prisma.PointsTransactionUncheckedCreateWithoutRestaurantInput> | Prisma.PointsTransactionCreateWithoutRestaurantInput[] | Prisma.PointsTransactionUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.PointsTransactionCreateOrConnectWithoutRestaurantInput | Prisma.PointsTransactionCreateOrConnectWithoutRestaurantInput[];
    upsert?: Prisma.PointsTransactionUpsertWithWhereUniqueWithoutRestaurantInput | Prisma.PointsTransactionUpsertWithWhereUniqueWithoutRestaurantInput[];
    createMany?: Prisma.PointsTransactionCreateManyRestaurantInputEnvelope;
    set?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    disconnect?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    delete?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    connect?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    update?: Prisma.PointsTransactionUpdateWithWhereUniqueWithoutRestaurantInput | Prisma.PointsTransactionUpdateWithWhereUniqueWithoutRestaurantInput[];
    updateMany?: Prisma.PointsTransactionUpdateManyWithWhereWithoutRestaurantInput | Prisma.PointsTransactionUpdateManyWithWhereWithoutRestaurantInput[];
    deleteMany?: Prisma.PointsTransactionScalarWhereInput | Prisma.PointsTransactionScalarWhereInput[];
};
export type PointsTransactionUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: Prisma.XOR<Prisma.PointsTransactionCreateWithoutRestaurantInput, Prisma.PointsTransactionUncheckedCreateWithoutRestaurantInput> | Prisma.PointsTransactionCreateWithoutRestaurantInput[] | Prisma.PointsTransactionUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.PointsTransactionCreateOrConnectWithoutRestaurantInput | Prisma.PointsTransactionCreateOrConnectWithoutRestaurantInput[];
    upsert?: Prisma.PointsTransactionUpsertWithWhereUniqueWithoutRestaurantInput | Prisma.PointsTransactionUpsertWithWhereUniqueWithoutRestaurantInput[];
    createMany?: Prisma.PointsTransactionCreateManyRestaurantInputEnvelope;
    set?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    disconnect?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    delete?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    connect?: Prisma.PointsTransactionWhereUniqueInput | Prisma.PointsTransactionWhereUniqueInput[];
    update?: Prisma.PointsTransactionUpdateWithWhereUniqueWithoutRestaurantInput | Prisma.PointsTransactionUpdateWithWhereUniqueWithoutRestaurantInput[];
    updateMany?: Prisma.PointsTransactionUpdateManyWithWhereWithoutRestaurantInput | Prisma.PointsTransactionUpdateManyWithWhereWithoutRestaurantInput[];
    deleteMany?: Prisma.PointsTransactionScalarWhereInput | Prisma.PointsTransactionScalarWhereInput[];
};
export type EnumPointsTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.PointsTransactionType;
};
export type PointsTransactionCreateWithoutUserInput = {
    id?: string;
    amount: number;
    type: $Enums.PointsTransactionType;
    source: string;
    orderId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    restaurant: Prisma.RestaurantCreateNestedOneWithoutPointsTransactionsInput;
};
export type PointsTransactionUncheckedCreateWithoutUserInput = {
    id?: string;
    restaurantId: string;
    amount: number;
    type: $Enums.PointsTransactionType;
    source: string;
    orderId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointsTransactionCreateOrConnectWithoutUserInput = {
    where: Prisma.PointsTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PointsTransactionCreateWithoutUserInput, Prisma.PointsTransactionUncheckedCreateWithoutUserInput>;
};
export type PointsTransactionCreateManyUserInputEnvelope = {
    data: Prisma.PointsTransactionCreateManyUserInput | Prisma.PointsTransactionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PointsTransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PointsTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PointsTransactionUpdateWithoutUserInput, Prisma.PointsTransactionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PointsTransactionCreateWithoutUserInput, Prisma.PointsTransactionUncheckedCreateWithoutUserInput>;
};
export type PointsTransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PointsTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PointsTransactionUpdateWithoutUserInput, Prisma.PointsTransactionUncheckedUpdateWithoutUserInput>;
};
export type PointsTransactionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PointsTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.PointsTransactionUpdateManyMutationInput, Prisma.PointsTransactionUncheckedUpdateManyWithoutUserInput>;
};
export type PointsTransactionScalarWhereInput = {
    AND?: Prisma.PointsTransactionScalarWhereInput | Prisma.PointsTransactionScalarWhereInput[];
    OR?: Prisma.PointsTransactionScalarWhereInput[];
    NOT?: Prisma.PointsTransactionScalarWhereInput | Prisma.PointsTransactionScalarWhereInput[];
    id?: Prisma.StringFilter<"PointsTransaction"> | string;
    userId?: Prisma.StringFilter<"PointsTransaction"> | string;
    restaurantId?: Prisma.StringFilter<"PointsTransaction"> | string;
    amount?: Prisma.IntFilter<"PointsTransaction"> | number;
    type?: Prisma.EnumPointsTransactionTypeFilter<"PointsTransaction"> | $Enums.PointsTransactionType;
    source?: Prisma.StringFilter<"PointsTransaction"> | string;
    orderId?: Prisma.StringNullableFilter<"PointsTransaction"> | string | null;
    metadata?: Prisma.JsonNullableFilter<"PointsTransaction">;
    createdAt?: Prisma.DateTimeFilter<"PointsTransaction"> | Date | string;
};
export type PointsTransactionCreateWithoutRestaurantInput = {
    id?: string;
    amount: number;
    type: $Enums.PointsTransactionType;
    source: string;
    orderId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPointsTransactionsInput;
};
export type PointsTransactionUncheckedCreateWithoutRestaurantInput = {
    id?: string;
    userId: string;
    amount: number;
    type: $Enums.PointsTransactionType;
    source: string;
    orderId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointsTransactionCreateOrConnectWithoutRestaurantInput = {
    where: Prisma.PointsTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PointsTransactionCreateWithoutRestaurantInput, Prisma.PointsTransactionUncheckedCreateWithoutRestaurantInput>;
};
export type PointsTransactionCreateManyRestaurantInputEnvelope = {
    data: Prisma.PointsTransactionCreateManyRestaurantInput | Prisma.PointsTransactionCreateManyRestaurantInput[];
    skipDuplicates?: boolean;
};
export type PointsTransactionUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: Prisma.PointsTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PointsTransactionUpdateWithoutRestaurantInput, Prisma.PointsTransactionUncheckedUpdateWithoutRestaurantInput>;
    create: Prisma.XOR<Prisma.PointsTransactionCreateWithoutRestaurantInput, Prisma.PointsTransactionUncheckedCreateWithoutRestaurantInput>;
};
export type PointsTransactionUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: Prisma.PointsTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PointsTransactionUpdateWithoutRestaurantInput, Prisma.PointsTransactionUncheckedUpdateWithoutRestaurantInput>;
};
export type PointsTransactionUpdateManyWithWhereWithoutRestaurantInput = {
    where: Prisma.PointsTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.PointsTransactionUpdateManyMutationInput, Prisma.PointsTransactionUncheckedUpdateManyWithoutRestaurantInput>;
};
export type PointsTransactionCreateManyUserInput = {
    id?: string;
    restaurantId: string;
    amount: number;
    type: $Enums.PointsTransactionType;
    source: string;
    orderId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointsTransactionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointsTransactionTypeFieldUpdateOperationsInput | $Enums.PointsTransactionType;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    restaurant?: Prisma.RestaurantUpdateOneRequiredWithoutPointsTransactionsNestedInput;
};
export type PointsTransactionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointsTransactionTypeFieldUpdateOperationsInput | $Enums.PointsTransactionType;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsTransactionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointsTransactionTypeFieldUpdateOperationsInput | $Enums.PointsTransactionType;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsTransactionCreateManyRestaurantInput = {
    id?: string;
    userId: string;
    amount: number;
    type: $Enums.PointsTransactionType;
    source: string;
    orderId?: string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
};
export type PointsTransactionUpdateWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointsTransactionTypeFieldUpdateOperationsInput | $Enums.PointsTransactionType;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPointsTransactionsNestedInput;
};
export type PointsTransactionUncheckedUpdateWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointsTransactionTypeFieldUpdateOperationsInput | $Enums.PointsTransactionType;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsTransactionUncheckedUpdateManyWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.IntFieldUpdateOperationsInput | number;
    type?: Prisma.EnumPointsTransactionTypeFieldUpdateOperationsInput | $Enums.PointsTransactionType;
    source?: Prisma.StringFieldUpdateOperationsInput | string;
    orderId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsTransactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    amount?: boolean;
    type?: boolean;
    source?: boolean;
    orderId?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pointsTransaction"]>;
export type PointsTransactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    amount?: boolean;
    type?: boolean;
    source?: boolean;
    orderId?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pointsTransaction"]>;
export type PointsTransactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    amount?: boolean;
    type?: boolean;
    source?: boolean;
    orderId?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pointsTransaction"]>;
export type PointsTransactionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    amount?: boolean;
    type?: boolean;
    source?: boolean;
    orderId?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
};
export type PointsTransactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "restaurantId" | "amount" | "type" | "source" | "orderId" | "metadata" | "createdAt", ExtArgs["result"]["pointsTransaction"]>;
export type PointsTransactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type PointsTransactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type PointsTransactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type $PointsTransactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PointsTransaction";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        restaurant: Prisma.$RestaurantPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        restaurantId: string;
        amount: number;
        type: $Enums.PointsTransactionType;
        source: string;
        orderId: string | null;
        metadata: runtime.JsonValue | null;
        createdAt: Date;
    }, ExtArgs["result"]["pointsTransaction"]>;
    composites: {};
};
export type PointsTransactionGetPayload<S extends boolean | null | undefined | PointsTransactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload, S>;
export type PointsTransactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PointsTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PointsTransactionCountAggregateInputType | true;
};
export interface PointsTransactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PointsTransaction'];
        meta: {
            name: 'PointsTransaction';
        };
    };
    /**
     * Find zero or one PointsTransaction that matches the filter.
     * @param {PointsTransactionFindUniqueArgs} args - Arguments to find a PointsTransaction
     * @example
     * // Get one PointsTransaction
     * const pointsTransaction = await prisma.pointsTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PointsTransactionFindUniqueArgs>(args: Prisma.SelectSubset<T, PointsTransactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PointsTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PointsTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PointsTransactionFindUniqueOrThrowArgs} args - Arguments to find a PointsTransaction
     * @example
     * // Get one PointsTransaction
     * const pointsTransaction = await prisma.pointsTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PointsTransactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PointsTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PointsTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PointsTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionFindFirstArgs} args - Arguments to find a PointsTransaction
     * @example
     * // Get one PointsTransaction
     * const pointsTransaction = await prisma.pointsTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PointsTransactionFindFirstArgs>(args?: Prisma.SelectSubset<T, PointsTransactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__PointsTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PointsTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionFindFirstOrThrowArgs} args - Arguments to find a PointsTransaction
     * @example
     * // Get one PointsTransaction
     * const pointsTransaction = await prisma.pointsTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PointsTransactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PointsTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PointsTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PointsTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PointsTransactions
     * const pointsTransactions = await prisma.pointsTransaction.findMany()
     *
     * // Get first 10 PointsTransactions
     * const pointsTransactions = await prisma.pointsTransaction.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const pointsTransactionWithIdOnly = await prisma.pointsTransaction.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PointsTransactionFindManyArgs>(args?: Prisma.SelectSubset<T, PointsTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PointsTransaction.
     * @param {PointsTransactionCreateArgs} args - Arguments to create a PointsTransaction.
     * @example
     * // Create one PointsTransaction
     * const PointsTransaction = await prisma.pointsTransaction.create({
     *   data: {
     *     // ... data to create a PointsTransaction
     *   }
     * })
     *
     */
    create<T extends PointsTransactionCreateArgs>(args: Prisma.SelectSubset<T, PointsTransactionCreateArgs<ExtArgs>>): Prisma.Prisma__PointsTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PointsTransactions.
     * @param {PointsTransactionCreateManyArgs} args - Arguments to create many PointsTransactions.
     * @example
     * // Create many PointsTransactions
     * const pointsTransaction = await prisma.pointsTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PointsTransactionCreateManyArgs>(args?: Prisma.SelectSubset<T, PointsTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PointsTransactions and returns the data saved in the database.
     * @param {PointsTransactionCreateManyAndReturnArgs} args - Arguments to create many PointsTransactions.
     * @example
     * // Create many PointsTransactions
     * const pointsTransaction = await prisma.pointsTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PointsTransactions and only return the `id`
     * const pointsTransactionWithIdOnly = await prisma.pointsTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PointsTransactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PointsTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PointsTransaction.
     * @param {PointsTransactionDeleteArgs} args - Arguments to delete one PointsTransaction.
     * @example
     * // Delete one PointsTransaction
     * const PointsTransaction = await prisma.pointsTransaction.delete({
     *   where: {
     *     // ... filter to delete one PointsTransaction
     *   }
     * })
     *
     */
    delete<T extends PointsTransactionDeleteArgs>(args: Prisma.SelectSubset<T, PointsTransactionDeleteArgs<ExtArgs>>): Prisma.Prisma__PointsTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PointsTransaction.
     * @param {PointsTransactionUpdateArgs} args - Arguments to update one PointsTransaction.
     * @example
     * // Update one PointsTransaction
     * const pointsTransaction = await prisma.pointsTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PointsTransactionUpdateArgs>(args: Prisma.SelectSubset<T, PointsTransactionUpdateArgs<ExtArgs>>): Prisma.Prisma__PointsTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PointsTransactions.
     * @param {PointsTransactionDeleteManyArgs} args - Arguments to filter PointsTransactions to delete.
     * @example
     * // Delete a few PointsTransactions
     * const { count } = await prisma.pointsTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PointsTransactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, PointsTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PointsTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PointsTransactions
     * const pointsTransaction = await prisma.pointsTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PointsTransactionUpdateManyArgs>(args: Prisma.SelectSubset<T, PointsTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PointsTransactions and returns the data updated in the database.
     * @param {PointsTransactionUpdateManyAndReturnArgs} args - Arguments to update many PointsTransactions.
     * @example
     * // Update many PointsTransactions
     * const pointsTransaction = await prisma.pointsTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PointsTransactions and only return the `id`
     * const pointsTransactionWithIdOnly = await prisma.pointsTransaction.updateManyAndReturn({
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
    updateManyAndReturn<T extends PointsTransactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PointsTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PointsTransaction.
     * @param {PointsTransactionUpsertArgs} args - Arguments to update or create a PointsTransaction.
     * @example
     * // Update or create a PointsTransaction
     * const pointsTransaction = await prisma.pointsTransaction.upsert({
     *   create: {
     *     // ... data to create a PointsTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PointsTransaction we want to update
     *   }
     * })
     */
    upsert<T extends PointsTransactionUpsertArgs>(args: Prisma.SelectSubset<T, PointsTransactionUpsertArgs<ExtArgs>>): Prisma.Prisma__PointsTransactionClient<runtime.Types.Result.GetResult<Prisma.$PointsTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PointsTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionCountArgs} args - Arguments to filter PointsTransactions to count.
     * @example
     * // Count the number of PointsTransactions
     * const count = await prisma.pointsTransaction.count({
     *   where: {
     *     // ... the filter for the PointsTransactions we want to count
     *   }
     * })
    **/
    count<T extends PointsTransactionCountArgs>(args?: Prisma.Subset<T, PointsTransactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PointsTransactionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PointsTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PointsTransactionAggregateArgs>(args: Prisma.Subset<T, PointsTransactionAggregateArgs>): Prisma.PrismaPromise<GetPointsTransactionAggregateType<T>>;
    /**
     * Group by PointsTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsTransactionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PointsTransactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PointsTransactionGroupByArgs['orderBy'];
    } : {
        orderBy?: PointsTransactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PointsTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointsTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PointsTransaction model
     */
    readonly fields: PointsTransactionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PointsTransaction.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PointsTransactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the PointsTransaction model
 */
export interface PointsTransactionFieldRefs {
    readonly id: Prisma.FieldRef<"PointsTransaction", 'String'>;
    readonly userId: Prisma.FieldRef<"PointsTransaction", 'String'>;
    readonly restaurantId: Prisma.FieldRef<"PointsTransaction", 'String'>;
    readonly amount: Prisma.FieldRef<"PointsTransaction", 'Int'>;
    readonly type: Prisma.FieldRef<"PointsTransaction", 'PointsTransactionType'>;
    readonly source: Prisma.FieldRef<"PointsTransaction", 'String'>;
    readonly orderId: Prisma.FieldRef<"PointsTransaction", 'String'>;
    readonly metadata: Prisma.FieldRef<"PointsTransaction", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"PointsTransaction", 'DateTime'>;
}
/**
 * PointsTransaction findUnique
 */
export type PointsTransactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PointsTransaction to fetch.
     */
    where: Prisma.PointsTransactionWhereUniqueInput;
};
/**
 * PointsTransaction findUniqueOrThrow
 */
export type PointsTransactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PointsTransaction to fetch.
     */
    where: Prisma.PointsTransactionWhereUniqueInput;
};
/**
 * PointsTransaction findFirst
 */
export type PointsTransactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PointsTransaction to fetch.
     */
    where?: Prisma.PointsTransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PointsTransactions to fetch.
     */
    orderBy?: Prisma.PointsTransactionOrderByWithRelationInput | Prisma.PointsTransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PointsTransactions.
     */
    cursor?: Prisma.PointsTransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PointsTransactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PointsTransactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PointsTransactions.
     */
    distinct?: Prisma.PointsTransactionScalarFieldEnum | Prisma.PointsTransactionScalarFieldEnum[];
};
/**
 * PointsTransaction findFirstOrThrow
 */
export type PointsTransactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PointsTransaction to fetch.
     */
    where?: Prisma.PointsTransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PointsTransactions to fetch.
     */
    orderBy?: Prisma.PointsTransactionOrderByWithRelationInput | Prisma.PointsTransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PointsTransactions.
     */
    cursor?: Prisma.PointsTransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PointsTransactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PointsTransactions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PointsTransactions.
     */
    distinct?: Prisma.PointsTransactionScalarFieldEnum | Prisma.PointsTransactionScalarFieldEnum[];
};
/**
 * PointsTransaction findMany
 */
export type PointsTransactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PointsTransactions to fetch.
     */
    where?: Prisma.PointsTransactionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PointsTransactions to fetch.
     */
    orderBy?: Prisma.PointsTransactionOrderByWithRelationInput | Prisma.PointsTransactionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PointsTransactions.
     */
    cursor?: Prisma.PointsTransactionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PointsTransactions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PointsTransactions.
     */
    skip?: number;
    distinct?: Prisma.PointsTransactionScalarFieldEnum | Prisma.PointsTransactionScalarFieldEnum[];
};
/**
 * PointsTransaction create
 */
export type PointsTransactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a PointsTransaction.
     */
    data: Prisma.XOR<Prisma.PointsTransactionCreateInput, Prisma.PointsTransactionUncheckedCreateInput>;
};
/**
 * PointsTransaction createMany
 */
export type PointsTransactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PointsTransactions.
     */
    data: Prisma.PointsTransactionCreateManyInput | Prisma.PointsTransactionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PointsTransaction createManyAndReturn
 */
export type PointsTransactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: Prisma.PointsTransactionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PointsTransaction
     */
    omit?: Prisma.PointsTransactionOmit<ExtArgs> | null;
    /**
     * The data used to create many PointsTransactions.
     */
    data: Prisma.PointsTransactionCreateManyInput | Prisma.PointsTransactionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PointsTransactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PointsTransaction update
 */
export type PointsTransactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a PointsTransaction.
     */
    data: Prisma.XOR<Prisma.PointsTransactionUpdateInput, Prisma.PointsTransactionUncheckedUpdateInput>;
    /**
     * Choose, which PointsTransaction to update.
     */
    where: Prisma.PointsTransactionWhereUniqueInput;
};
/**
 * PointsTransaction updateMany
 */
export type PointsTransactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PointsTransactions.
     */
    data: Prisma.XOR<Prisma.PointsTransactionUpdateManyMutationInput, Prisma.PointsTransactionUncheckedUpdateManyInput>;
    /**
     * Filter which PointsTransactions to update
     */
    where?: Prisma.PointsTransactionWhereInput;
    /**
     * Limit how many PointsTransactions to update.
     */
    limit?: number;
};
/**
 * PointsTransaction updateManyAndReturn
 */
export type PointsTransactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsTransaction
     */
    select?: Prisma.PointsTransactionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PointsTransaction
     */
    omit?: Prisma.PointsTransactionOmit<ExtArgs> | null;
    /**
     * The data used to update PointsTransactions.
     */
    data: Prisma.XOR<Prisma.PointsTransactionUpdateManyMutationInput, Prisma.PointsTransactionUncheckedUpdateManyInput>;
    /**
     * Filter which PointsTransactions to update
     */
    where?: Prisma.PointsTransactionWhereInput;
    /**
     * Limit how many PointsTransactions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PointsTransactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PointsTransaction upsert
 */
export type PointsTransactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the PointsTransaction to update in case it exists.
     */
    where: Prisma.PointsTransactionWhereUniqueInput;
    /**
     * In case the PointsTransaction found by the `where` argument doesn't exist, create a new PointsTransaction with this data.
     */
    create: Prisma.XOR<Prisma.PointsTransactionCreateInput, Prisma.PointsTransactionUncheckedCreateInput>;
    /**
     * In case the PointsTransaction was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PointsTransactionUpdateInput, Prisma.PointsTransactionUncheckedUpdateInput>;
};
/**
 * PointsTransaction delete
 */
export type PointsTransactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which PointsTransaction to delete.
     */
    where: Prisma.PointsTransactionWhereUniqueInput;
};
/**
 * PointsTransaction deleteMany
 */
export type PointsTransactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PointsTransactions to delete
     */
    where?: Prisma.PointsTransactionWhereInput;
    /**
     * Limit how many PointsTransactions to delete.
     */
    limit?: number;
};
/**
 * PointsTransaction without action
 */
export type PointsTransactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=PointsTransaction.d.ts.map