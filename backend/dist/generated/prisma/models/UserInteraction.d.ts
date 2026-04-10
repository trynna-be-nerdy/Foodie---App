import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model UserInteraction
 *
 */
export type UserInteractionModel = runtime.Types.Result.DefaultSelection<Prisma.$UserInteractionPayload>;
export type AggregateUserInteraction = {
    _count: UserInteractionCountAggregateOutputType | null;
    _avg: UserInteractionAvgAggregateOutputType | null;
    _sum: UserInteractionSumAggregateOutputType | null;
    _min: UserInteractionMinAggregateOutputType | null;
    _max: UserInteractionMaxAggregateOutputType | null;
};
export type UserInteractionAvgAggregateOutputType = {
    weight: number | null;
};
export type UserInteractionSumAggregateOutputType = {
    weight: number | null;
};
export type UserInteractionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    interactionType: $Enums.InteractionType | null;
    weight: number | null;
    createdAt: Date | null;
};
export type UserInteractionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    interactionType: $Enums.InteractionType | null;
    weight: number | null;
    createdAt: Date | null;
};
export type UserInteractionCountAggregateOutputType = {
    id: number;
    userId: number;
    restaurantId: number;
    interactionType: number;
    weight: number;
    createdAt: number;
    _all: number;
};
export type UserInteractionAvgAggregateInputType = {
    weight?: true;
};
export type UserInteractionSumAggregateInputType = {
    weight?: true;
};
export type UserInteractionMinAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    interactionType?: true;
    weight?: true;
    createdAt?: true;
};
export type UserInteractionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    interactionType?: true;
    weight?: true;
    createdAt?: true;
};
export type UserInteractionCountAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    interactionType?: true;
    weight?: true;
    createdAt?: true;
    _all?: true;
};
export type UserInteractionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UserInteraction to aggregate.
     */
    where?: Prisma.UserInteractionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserInteractions to fetch.
     */
    orderBy?: Prisma.UserInteractionOrderByWithRelationInput | Prisma.UserInteractionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserInteractionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserInteractions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserInteractions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned UserInteractions
    **/
    _count?: true | UserInteractionCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: UserInteractionAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: UserInteractionSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserInteractionMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserInteractionMaxAggregateInputType;
};
export type GetUserInteractionAggregateType<T extends UserInteractionAggregateArgs> = {
    [P in keyof T & keyof AggregateUserInteraction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUserInteraction[P]> : Prisma.GetScalarType<T[P], AggregateUserInteraction[P]>;
};
export type UserInteractionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserInteractionWhereInput;
    orderBy?: Prisma.UserInteractionOrderByWithAggregationInput | Prisma.UserInteractionOrderByWithAggregationInput[];
    by: Prisma.UserInteractionScalarFieldEnum[] | Prisma.UserInteractionScalarFieldEnum;
    having?: Prisma.UserInteractionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserInteractionCountAggregateInputType | true;
    _avg?: UserInteractionAvgAggregateInputType;
    _sum?: UserInteractionSumAggregateInputType;
    _min?: UserInteractionMinAggregateInputType;
    _max?: UserInteractionMaxAggregateInputType;
};
export type UserInteractionGroupByOutputType = {
    id: string;
    userId: string;
    restaurantId: string;
    interactionType: $Enums.InteractionType;
    weight: number;
    createdAt: Date;
    _count: UserInteractionCountAggregateOutputType | null;
    _avg: UserInteractionAvgAggregateOutputType | null;
    _sum: UserInteractionSumAggregateOutputType | null;
    _min: UserInteractionMinAggregateOutputType | null;
    _max: UserInteractionMaxAggregateOutputType | null;
};
type GetUserInteractionGroupByPayload<T extends UserInteractionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserInteractionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserInteractionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserInteractionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserInteractionGroupByOutputType[P]>;
}>>;
export type UserInteractionWhereInput = {
    AND?: Prisma.UserInteractionWhereInput | Prisma.UserInteractionWhereInput[];
    OR?: Prisma.UserInteractionWhereInput[];
    NOT?: Prisma.UserInteractionWhereInput | Prisma.UserInteractionWhereInput[];
    id?: Prisma.StringFilter<"UserInteraction"> | string;
    userId?: Prisma.StringFilter<"UserInteraction"> | string;
    restaurantId?: Prisma.StringFilter<"UserInteraction"> | string;
    interactionType?: Prisma.EnumInteractionTypeFilter<"UserInteraction"> | $Enums.InteractionType;
    weight?: Prisma.FloatFilter<"UserInteraction"> | number;
    createdAt?: Prisma.DateTimeFilter<"UserInteraction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    restaurant?: Prisma.XOR<Prisma.RestaurantScalarRelationFilter, Prisma.RestaurantWhereInput>;
};
export type UserInteractionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    interactionType?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    restaurant?: Prisma.RestaurantOrderByWithRelationInput;
};
export type UserInteractionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_restaurantId_interactionType?: Prisma.UserInteractionUserIdRestaurantIdInteractionTypeCompoundUniqueInput;
    AND?: Prisma.UserInteractionWhereInput | Prisma.UserInteractionWhereInput[];
    OR?: Prisma.UserInteractionWhereInput[];
    NOT?: Prisma.UserInteractionWhereInput | Prisma.UserInteractionWhereInput[];
    userId?: Prisma.StringFilter<"UserInteraction"> | string;
    restaurantId?: Prisma.StringFilter<"UserInteraction"> | string;
    interactionType?: Prisma.EnumInteractionTypeFilter<"UserInteraction"> | $Enums.InteractionType;
    weight?: Prisma.FloatFilter<"UserInteraction"> | number;
    createdAt?: Prisma.DateTimeFilter<"UserInteraction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    restaurant?: Prisma.XOR<Prisma.RestaurantScalarRelationFilter, Prisma.RestaurantWhereInput>;
}, "id" | "userId_restaurantId_interactionType">;
export type UserInteractionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    interactionType?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.UserInteractionCountOrderByAggregateInput;
    _avg?: Prisma.UserInteractionAvgOrderByAggregateInput;
    _max?: Prisma.UserInteractionMaxOrderByAggregateInput;
    _min?: Prisma.UserInteractionMinOrderByAggregateInput;
    _sum?: Prisma.UserInteractionSumOrderByAggregateInput;
};
export type UserInteractionScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserInteractionScalarWhereWithAggregatesInput | Prisma.UserInteractionScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserInteractionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserInteractionScalarWhereWithAggregatesInput | Prisma.UserInteractionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"UserInteraction"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"UserInteraction"> | string;
    restaurantId?: Prisma.StringWithAggregatesFilter<"UserInteraction"> | string;
    interactionType?: Prisma.EnumInteractionTypeWithAggregatesFilter<"UserInteraction"> | $Enums.InteractionType;
    weight?: Prisma.FloatWithAggregatesFilter<"UserInteraction"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"UserInteraction"> | Date | string;
};
export type UserInteractionCreateInput = {
    id?: string;
    interactionType: $Enums.InteractionType;
    weight?: number;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutInteractionsInput;
    restaurant: Prisma.RestaurantCreateNestedOneWithoutInteractionsInput;
};
export type UserInteractionUncheckedCreateInput = {
    id?: string;
    userId: string;
    restaurantId: string;
    interactionType: $Enums.InteractionType;
    weight?: number;
    createdAt?: Date | string;
};
export type UserInteractionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionType?: Prisma.EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType;
    weight?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutInteractionsNestedInput;
    restaurant?: Prisma.RestaurantUpdateOneRequiredWithoutInteractionsNestedInput;
};
export type UserInteractionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionType?: Prisma.EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType;
    weight?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserInteractionCreateManyInput = {
    id?: string;
    userId: string;
    restaurantId: string;
    interactionType: $Enums.InteractionType;
    weight?: number;
    createdAt?: Date | string;
};
export type UserInteractionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionType?: Prisma.EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType;
    weight?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserInteractionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionType?: Prisma.EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType;
    weight?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserInteractionListRelationFilter = {
    every?: Prisma.UserInteractionWhereInput;
    some?: Prisma.UserInteractionWhereInput;
    none?: Prisma.UserInteractionWhereInput;
};
export type UserInteractionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserInteractionUserIdRestaurantIdInteractionTypeCompoundUniqueInput = {
    userId: string;
    restaurantId: string;
    interactionType: $Enums.InteractionType;
};
export type UserInteractionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    interactionType?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserInteractionAvgOrderByAggregateInput = {
    weight?: Prisma.SortOrder;
};
export type UserInteractionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    interactionType?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserInteractionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    interactionType?: Prisma.SortOrder;
    weight?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type UserInteractionSumOrderByAggregateInput = {
    weight?: Prisma.SortOrder;
};
export type UserInteractionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserInteractionCreateWithoutUserInput, Prisma.UserInteractionUncheckedCreateWithoutUserInput> | Prisma.UserInteractionCreateWithoutUserInput[] | Prisma.UserInteractionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserInteractionCreateOrConnectWithoutUserInput | Prisma.UserInteractionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserInteractionCreateManyUserInputEnvelope;
    connect?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
};
export type UserInteractionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.UserInteractionCreateWithoutUserInput, Prisma.UserInteractionUncheckedCreateWithoutUserInput> | Prisma.UserInteractionCreateWithoutUserInput[] | Prisma.UserInteractionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserInteractionCreateOrConnectWithoutUserInput | Prisma.UserInteractionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.UserInteractionCreateManyUserInputEnvelope;
    connect?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
};
export type UserInteractionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserInteractionCreateWithoutUserInput, Prisma.UserInteractionUncheckedCreateWithoutUserInput> | Prisma.UserInteractionCreateWithoutUserInput[] | Prisma.UserInteractionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserInteractionCreateOrConnectWithoutUserInput | Prisma.UserInteractionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserInteractionUpsertWithWhereUniqueWithoutUserInput | Prisma.UserInteractionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserInteractionCreateManyUserInputEnvelope;
    set?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    disconnect?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    delete?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    connect?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    update?: Prisma.UserInteractionUpdateWithWhereUniqueWithoutUserInput | Prisma.UserInteractionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserInteractionUpdateManyWithWhereWithoutUserInput | Prisma.UserInteractionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserInteractionScalarWhereInput | Prisma.UserInteractionScalarWhereInput[];
};
export type UserInteractionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.UserInteractionCreateWithoutUserInput, Prisma.UserInteractionUncheckedCreateWithoutUserInput> | Prisma.UserInteractionCreateWithoutUserInput[] | Prisma.UserInteractionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.UserInteractionCreateOrConnectWithoutUserInput | Prisma.UserInteractionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.UserInteractionUpsertWithWhereUniqueWithoutUserInput | Prisma.UserInteractionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.UserInteractionCreateManyUserInputEnvelope;
    set?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    disconnect?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    delete?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    connect?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    update?: Prisma.UserInteractionUpdateWithWhereUniqueWithoutUserInput | Prisma.UserInteractionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.UserInteractionUpdateManyWithWhereWithoutUserInput | Prisma.UserInteractionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.UserInteractionScalarWhereInput | Prisma.UserInteractionScalarWhereInput[];
};
export type UserInteractionCreateNestedManyWithoutRestaurantInput = {
    create?: Prisma.XOR<Prisma.UserInteractionCreateWithoutRestaurantInput, Prisma.UserInteractionUncheckedCreateWithoutRestaurantInput> | Prisma.UserInteractionCreateWithoutRestaurantInput[] | Prisma.UserInteractionUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.UserInteractionCreateOrConnectWithoutRestaurantInput | Prisma.UserInteractionCreateOrConnectWithoutRestaurantInput[];
    createMany?: Prisma.UserInteractionCreateManyRestaurantInputEnvelope;
    connect?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
};
export type UserInteractionUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: Prisma.XOR<Prisma.UserInteractionCreateWithoutRestaurantInput, Prisma.UserInteractionUncheckedCreateWithoutRestaurantInput> | Prisma.UserInteractionCreateWithoutRestaurantInput[] | Prisma.UserInteractionUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.UserInteractionCreateOrConnectWithoutRestaurantInput | Prisma.UserInteractionCreateOrConnectWithoutRestaurantInput[];
    createMany?: Prisma.UserInteractionCreateManyRestaurantInputEnvelope;
    connect?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
};
export type UserInteractionUpdateManyWithoutRestaurantNestedInput = {
    create?: Prisma.XOR<Prisma.UserInteractionCreateWithoutRestaurantInput, Prisma.UserInteractionUncheckedCreateWithoutRestaurantInput> | Prisma.UserInteractionCreateWithoutRestaurantInput[] | Prisma.UserInteractionUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.UserInteractionCreateOrConnectWithoutRestaurantInput | Prisma.UserInteractionCreateOrConnectWithoutRestaurantInput[];
    upsert?: Prisma.UserInteractionUpsertWithWhereUniqueWithoutRestaurantInput | Prisma.UserInteractionUpsertWithWhereUniqueWithoutRestaurantInput[];
    createMany?: Prisma.UserInteractionCreateManyRestaurantInputEnvelope;
    set?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    disconnect?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    delete?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    connect?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    update?: Prisma.UserInteractionUpdateWithWhereUniqueWithoutRestaurantInput | Prisma.UserInteractionUpdateWithWhereUniqueWithoutRestaurantInput[];
    updateMany?: Prisma.UserInteractionUpdateManyWithWhereWithoutRestaurantInput | Prisma.UserInteractionUpdateManyWithWhereWithoutRestaurantInput[];
    deleteMany?: Prisma.UserInteractionScalarWhereInput | Prisma.UserInteractionScalarWhereInput[];
};
export type UserInteractionUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: Prisma.XOR<Prisma.UserInteractionCreateWithoutRestaurantInput, Prisma.UserInteractionUncheckedCreateWithoutRestaurantInput> | Prisma.UserInteractionCreateWithoutRestaurantInput[] | Prisma.UserInteractionUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.UserInteractionCreateOrConnectWithoutRestaurantInput | Prisma.UserInteractionCreateOrConnectWithoutRestaurantInput[];
    upsert?: Prisma.UserInteractionUpsertWithWhereUniqueWithoutRestaurantInput | Prisma.UserInteractionUpsertWithWhereUniqueWithoutRestaurantInput[];
    createMany?: Prisma.UserInteractionCreateManyRestaurantInputEnvelope;
    set?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    disconnect?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    delete?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    connect?: Prisma.UserInteractionWhereUniqueInput | Prisma.UserInteractionWhereUniqueInput[];
    update?: Prisma.UserInteractionUpdateWithWhereUniqueWithoutRestaurantInput | Prisma.UserInteractionUpdateWithWhereUniqueWithoutRestaurantInput[];
    updateMany?: Prisma.UserInteractionUpdateManyWithWhereWithoutRestaurantInput | Prisma.UserInteractionUpdateManyWithWhereWithoutRestaurantInput[];
    deleteMany?: Prisma.UserInteractionScalarWhereInput | Prisma.UserInteractionScalarWhereInput[];
};
export type EnumInteractionTypeFieldUpdateOperationsInput = {
    set?: $Enums.InteractionType;
};
export type UserInteractionCreateWithoutUserInput = {
    id?: string;
    interactionType: $Enums.InteractionType;
    weight?: number;
    createdAt?: Date | string;
    restaurant: Prisma.RestaurantCreateNestedOneWithoutInteractionsInput;
};
export type UserInteractionUncheckedCreateWithoutUserInput = {
    id?: string;
    restaurantId: string;
    interactionType: $Enums.InteractionType;
    weight?: number;
    createdAt?: Date | string;
};
export type UserInteractionCreateOrConnectWithoutUserInput = {
    where: Prisma.UserInteractionWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserInteractionCreateWithoutUserInput, Prisma.UserInteractionUncheckedCreateWithoutUserInput>;
};
export type UserInteractionCreateManyUserInputEnvelope = {
    data: Prisma.UserInteractionCreateManyUserInput | Prisma.UserInteractionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type UserInteractionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserInteractionWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserInteractionUpdateWithoutUserInput, Prisma.UserInteractionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.UserInteractionCreateWithoutUserInput, Prisma.UserInteractionUncheckedCreateWithoutUserInput>;
};
export type UserInteractionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.UserInteractionWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserInteractionUpdateWithoutUserInput, Prisma.UserInteractionUncheckedUpdateWithoutUserInput>;
};
export type UserInteractionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.UserInteractionScalarWhereInput;
    data: Prisma.XOR<Prisma.UserInteractionUpdateManyMutationInput, Prisma.UserInteractionUncheckedUpdateManyWithoutUserInput>;
};
export type UserInteractionScalarWhereInput = {
    AND?: Prisma.UserInteractionScalarWhereInput | Prisma.UserInteractionScalarWhereInput[];
    OR?: Prisma.UserInteractionScalarWhereInput[];
    NOT?: Prisma.UserInteractionScalarWhereInput | Prisma.UserInteractionScalarWhereInput[];
    id?: Prisma.StringFilter<"UserInteraction"> | string;
    userId?: Prisma.StringFilter<"UserInteraction"> | string;
    restaurantId?: Prisma.StringFilter<"UserInteraction"> | string;
    interactionType?: Prisma.EnumInteractionTypeFilter<"UserInteraction"> | $Enums.InteractionType;
    weight?: Prisma.FloatFilter<"UserInteraction"> | number;
    createdAt?: Prisma.DateTimeFilter<"UserInteraction"> | Date | string;
};
export type UserInteractionCreateWithoutRestaurantInput = {
    id?: string;
    interactionType: $Enums.InteractionType;
    weight?: number;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutInteractionsInput;
};
export type UserInteractionUncheckedCreateWithoutRestaurantInput = {
    id?: string;
    userId: string;
    interactionType: $Enums.InteractionType;
    weight?: number;
    createdAt?: Date | string;
};
export type UserInteractionCreateOrConnectWithoutRestaurantInput = {
    where: Prisma.UserInteractionWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserInteractionCreateWithoutRestaurantInput, Prisma.UserInteractionUncheckedCreateWithoutRestaurantInput>;
};
export type UserInteractionCreateManyRestaurantInputEnvelope = {
    data: Prisma.UserInteractionCreateManyRestaurantInput | Prisma.UserInteractionCreateManyRestaurantInput[];
    skipDuplicates?: boolean;
};
export type UserInteractionUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: Prisma.UserInteractionWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserInteractionUpdateWithoutRestaurantInput, Prisma.UserInteractionUncheckedUpdateWithoutRestaurantInput>;
    create: Prisma.XOR<Prisma.UserInteractionCreateWithoutRestaurantInput, Prisma.UserInteractionUncheckedCreateWithoutRestaurantInput>;
};
export type UserInteractionUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: Prisma.UserInteractionWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserInteractionUpdateWithoutRestaurantInput, Prisma.UserInteractionUncheckedUpdateWithoutRestaurantInput>;
};
export type UserInteractionUpdateManyWithWhereWithoutRestaurantInput = {
    where: Prisma.UserInteractionScalarWhereInput;
    data: Prisma.XOR<Prisma.UserInteractionUpdateManyMutationInput, Prisma.UserInteractionUncheckedUpdateManyWithoutRestaurantInput>;
};
export type UserInteractionCreateManyUserInput = {
    id?: string;
    restaurantId: string;
    interactionType: $Enums.InteractionType;
    weight?: number;
    createdAt?: Date | string;
};
export type UserInteractionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionType?: Prisma.EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType;
    weight?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    restaurant?: Prisma.RestaurantUpdateOneRequiredWithoutInteractionsNestedInput;
};
export type UserInteractionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionType?: Prisma.EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType;
    weight?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserInteractionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionType?: Prisma.EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType;
    weight?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserInteractionCreateManyRestaurantInput = {
    id?: string;
    userId: string;
    interactionType: $Enums.InteractionType;
    weight?: number;
    createdAt?: Date | string;
};
export type UserInteractionUpdateWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionType?: Prisma.EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType;
    weight?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutInteractionsNestedInput;
};
export type UserInteractionUncheckedUpdateWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionType?: Prisma.EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType;
    weight?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserInteractionUncheckedUpdateManyWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    interactionType?: Prisma.EnumInteractionTypeFieldUpdateOperationsInput | $Enums.InteractionType;
    weight?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserInteractionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    interactionType?: boolean;
    weight?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userInteraction"]>;
export type UserInteractionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    interactionType?: boolean;
    weight?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userInteraction"]>;
export type UserInteractionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    interactionType?: boolean;
    weight?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["userInteraction"]>;
export type UserInteractionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    interactionType?: boolean;
    weight?: boolean;
    createdAt?: boolean;
};
export type UserInteractionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "restaurantId" | "interactionType" | "weight" | "createdAt", ExtArgs["result"]["userInteraction"]>;
export type UserInteractionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type UserInteractionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type UserInteractionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type $UserInteractionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "UserInteraction";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        restaurant: Prisma.$RestaurantPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        restaurantId: string;
        interactionType: $Enums.InteractionType;
        weight: number;
        createdAt: Date;
    }, ExtArgs["result"]["userInteraction"]>;
    composites: {};
};
export type UserInteractionGetPayload<S extends boolean | null | undefined | UserInteractionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload, S>;
export type UserInteractionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserInteractionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserInteractionCountAggregateInputType | true;
};
export interface UserInteractionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['UserInteraction'];
        meta: {
            name: 'UserInteraction';
        };
    };
    /**
     * Find zero or one UserInteraction that matches the filter.
     * @param {UserInteractionFindUniqueArgs} args - Arguments to find a UserInteraction
     * @example
     * // Get one UserInteraction
     * const userInteraction = await prisma.userInteraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserInteractionFindUniqueArgs>(args: Prisma.SelectSubset<T, UserInteractionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserInteractionClient<runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one UserInteraction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserInteractionFindUniqueOrThrowArgs} args - Arguments to find a UserInteraction
     * @example
     * // Get one UserInteraction
     * const userInteraction = await prisma.userInteraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserInteractionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserInteractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserInteractionClient<runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UserInteraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionFindFirstArgs} args - Arguments to find a UserInteraction
     * @example
     * // Get one UserInteraction
     * const userInteraction = await prisma.userInteraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserInteractionFindFirstArgs>(args?: Prisma.SelectSubset<T, UserInteractionFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserInteractionClient<runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first UserInteraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionFindFirstOrThrowArgs} args - Arguments to find a UserInteraction
     * @example
     * // Get one UserInteraction
     * const userInteraction = await prisma.userInteraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserInteractionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserInteractionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserInteractionClient<runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more UserInteractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserInteractions
     * const userInteractions = await prisma.userInteraction.findMany()
     *
     * // Get first 10 UserInteractions
     * const userInteractions = await prisma.userInteraction.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userInteractionWithIdOnly = await prisma.userInteraction.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserInteractionFindManyArgs>(args?: Prisma.SelectSubset<T, UserInteractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a UserInteraction.
     * @param {UserInteractionCreateArgs} args - Arguments to create a UserInteraction.
     * @example
     * // Create one UserInteraction
     * const UserInteraction = await prisma.userInteraction.create({
     *   data: {
     *     // ... data to create a UserInteraction
     *   }
     * })
     *
     */
    create<T extends UserInteractionCreateArgs>(args: Prisma.SelectSubset<T, UserInteractionCreateArgs<ExtArgs>>): Prisma.Prisma__UserInteractionClient<runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many UserInteractions.
     * @param {UserInteractionCreateManyArgs} args - Arguments to create many UserInteractions.
     * @example
     * // Create many UserInteractions
     * const userInteraction = await prisma.userInteraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserInteractionCreateManyArgs>(args?: Prisma.SelectSubset<T, UserInteractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many UserInteractions and returns the data saved in the database.
     * @param {UserInteractionCreateManyAndReturnArgs} args - Arguments to create many UserInteractions.
     * @example
     * // Create many UserInteractions
     * const userInteraction = await prisma.userInteraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many UserInteractions and only return the `id`
     * const userInteractionWithIdOnly = await prisma.userInteraction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserInteractionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserInteractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a UserInteraction.
     * @param {UserInteractionDeleteArgs} args - Arguments to delete one UserInteraction.
     * @example
     * // Delete one UserInteraction
     * const UserInteraction = await prisma.userInteraction.delete({
     *   where: {
     *     // ... filter to delete one UserInteraction
     *   }
     * })
     *
     */
    delete<T extends UserInteractionDeleteArgs>(args: Prisma.SelectSubset<T, UserInteractionDeleteArgs<ExtArgs>>): Prisma.Prisma__UserInteractionClient<runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one UserInteraction.
     * @param {UserInteractionUpdateArgs} args - Arguments to update one UserInteraction.
     * @example
     * // Update one UserInteraction
     * const userInteraction = await prisma.userInteraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserInteractionUpdateArgs>(args: Prisma.SelectSubset<T, UserInteractionUpdateArgs<ExtArgs>>): Prisma.Prisma__UserInteractionClient<runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more UserInteractions.
     * @param {UserInteractionDeleteManyArgs} args - Arguments to filter UserInteractions to delete.
     * @example
     * // Delete a few UserInteractions
     * const { count } = await prisma.userInteraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserInteractionDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserInteractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more UserInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserInteractions
     * const userInteraction = await prisma.userInteraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserInteractionUpdateManyArgs>(args: Prisma.SelectSubset<T, UserInteractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more UserInteractions and returns the data updated in the database.
     * @param {UserInteractionUpdateManyAndReturnArgs} args - Arguments to update many UserInteractions.
     * @example
     * // Update many UserInteractions
     * const userInteraction = await prisma.userInteraction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more UserInteractions and only return the `id`
     * const userInteractionWithIdOnly = await prisma.userInteraction.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserInteractionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserInteractionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one UserInteraction.
     * @param {UserInteractionUpsertArgs} args - Arguments to update or create a UserInteraction.
     * @example
     * // Update or create a UserInteraction
     * const userInteraction = await prisma.userInteraction.upsert({
     *   create: {
     *     // ... data to create a UserInteraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserInteraction we want to update
     *   }
     * })
     */
    upsert<T extends UserInteractionUpsertArgs>(args: Prisma.SelectSubset<T, UserInteractionUpsertArgs<ExtArgs>>): Prisma.Prisma__UserInteractionClient<runtime.Types.Result.GetResult<Prisma.$UserInteractionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of UserInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionCountArgs} args - Arguments to filter UserInteractions to count.
     * @example
     * // Count the number of UserInteractions
     * const count = await prisma.userInteraction.count({
     *   where: {
     *     // ... the filter for the UserInteractions we want to count
     *   }
     * })
    **/
    count<T extends UserInteractionCountArgs>(args?: Prisma.Subset<T, UserInteractionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserInteractionCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a UserInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserInteractionAggregateArgs>(args: Prisma.Subset<T, UserInteractionAggregateArgs>): Prisma.PrismaPromise<GetUserInteractionAggregateType<T>>;
    /**
     * Group by UserInteraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInteractionGroupByArgs} args - Group by arguments.
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
    groupBy<T extends UserInteractionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserInteractionGroupByArgs['orderBy'];
    } : {
        orderBy?: UserInteractionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserInteractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserInteractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the UserInteraction model
     */
    readonly fields: UserInteractionFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for UserInteraction.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserInteractionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the UserInteraction model
 */
export interface UserInteractionFieldRefs {
    readonly id: Prisma.FieldRef<"UserInteraction", 'String'>;
    readonly userId: Prisma.FieldRef<"UserInteraction", 'String'>;
    readonly restaurantId: Prisma.FieldRef<"UserInteraction", 'String'>;
    readonly interactionType: Prisma.FieldRef<"UserInteraction", 'InteractionType'>;
    readonly weight: Prisma.FieldRef<"UserInteraction", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"UserInteraction", 'DateTime'>;
}
/**
 * UserInteraction findUnique
 */
export type UserInteractionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which UserInteraction to fetch.
     */
    where: Prisma.UserInteractionWhereUniqueInput;
};
/**
 * UserInteraction findUniqueOrThrow
 */
export type UserInteractionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which UserInteraction to fetch.
     */
    where: Prisma.UserInteractionWhereUniqueInput;
};
/**
 * UserInteraction findFirst
 */
export type UserInteractionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which UserInteraction to fetch.
     */
    where?: Prisma.UserInteractionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserInteractions to fetch.
     */
    orderBy?: Prisma.UserInteractionOrderByWithRelationInput | Prisma.UserInteractionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserInteractions.
     */
    cursor?: Prisma.UserInteractionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserInteractions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserInteractions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserInteractions.
     */
    distinct?: Prisma.UserInteractionScalarFieldEnum | Prisma.UserInteractionScalarFieldEnum[];
};
/**
 * UserInteraction findFirstOrThrow
 */
export type UserInteractionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which UserInteraction to fetch.
     */
    where?: Prisma.UserInteractionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserInteractions to fetch.
     */
    orderBy?: Prisma.UserInteractionOrderByWithRelationInput | Prisma.UserInteractionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for UserInteractions.
     */
    cursor?: Prisma.UserInteractionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserInteractions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserInteractions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of UserInteractions.
     */
    distinct?: Prisma.UserInteractionScalarFieldEnum | Prisma.UserInteractionScalarFieldEnum[];
};
/**
 * UserInteraction findMany
 */
export type UserInteractionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which UserInteractions to fetch.
     */
    where?: Prisma.UserInteractionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of UserInteractions to fetch.
     */
    orderBy?: Prisma.UserInteractionOrderByWithRelationInput | Prisma.UserInteractionOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing UserInteractions.
     */
    cursor?: Prisma.UserInteractionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` UserInteractions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` UserInteractions.
     */
    skip?: number;
    distinct?: Prisma.UserInteractionScalarFieldEnum | Prisma.UserInteractionScalarFieldEnum[];
};
/**
 * UserInteraction create
 */
export type UserInteractionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a UserInteraction.
     */
    data: Prisma.XOR<Prisma.UserInteractionCreateInput, Prisma.UserInteractionUncheckedCreateInput>;
};
/**
 * UserInteraction createMany
 */
export type UserInteractionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserInteractions.
     */
    data: Prisma.UserInteractionCreateManyInput | Prisma.UserInteractionCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * UserInteraction createManyAndReturn
 */
export type UserInteractionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: Prisma.UserInteractionSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: Prisma.UserInteractionOmit<ExtArgs> | null;
    /**
     * The data used to create many UserInteractions.
     */
    data: Prisma.UserInteractionCreateManyInput | Prisma.UserInteractionCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInteractionIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * UserInteraction update
 */
export type UserInteractionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a UserInteraction.
     */
    data: Prisma.XOR<Prisma.UserInteractionUpdateInput, Prisma.UserInteractionUncheckedUpdateInput>;
    /**
     * Choose, which UserInteraction to update.
     */
    where: Prisma.UserInteractionWhereUniqueInput;
};
/**
 * UserInteraction updateMany
 */
export type UserInteractionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update UserInteractions.
     */
    data: Prisma.XOR<Prisma.UserInteractionUpdateManyMutationInput, Prisma.UserInteractionUncheckedUpdateManyInput>;
    /**
     * Filter which UserInteractions to update
     */
    where?: Prisma.UserInteractionWhereInput;
    /**
     * Limit how many UserInteractions to update.
     */
    limit?: number;
};
/**
 * UserInteraction updateManyAndReturn
 */
export type UserInteractionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserInteraction
     */
    select?: Prisma.UserInteractionSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the UserInteraction
     */
    omit?: Prisma.UserInteractionOmit<ExtArgs> | null;
    /**
     * The data used to update UserInteractions.
     */
    data: Prisma.XOR<Prisma.UserInteractionUpdateManyMutationInput, Prisma.UserInteractionUncheckedUpdateManyInput>;
    /**
     * Filter which UserInteractions to update
     */
    where?: Prisma.UserInteractionWhereInput;
    /**
     * Limit how many UserInteractions to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInteractionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * UserInteraction upsert
 */
export type UserInteractionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the UserInteraction to update in case it exists.
     */
    where: Prisma.UserInteractionWhereUniqueInput;
    /**
     * In case the UserInteraction found by the `where` argument doesn't exist, create a new UserInteraction with this data.
     */
    create: Prisma.XOR<Prisma.UserInteractionCreateInput, Prisma.UserInteractionUncheckedCreateInput>;
    /**
     * In case the UserInteraction was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserInteractionUpdateInput, Prisma.UserInteractionUncheckedUpdateInput>;
};
/**
 * UserInteraction delete
 */
export type UserInteractionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which UserInteraction to delete.
     */
    where: Prisma.UserInteractionWhereUniqueInput;
};
/**
 * UserInteraction deleteMany
 */
export type UserInteractionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which UserInteractions to delete
     */
    where?: Prisma.UserInteractionWhereInput;
    /**
     * Limit how many UserInteractions to delete.
     */
    limit?: number;
};
/**
 * UserInteraction without action
 */
export type UserInteractionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=UserInteraction.d.ts.map