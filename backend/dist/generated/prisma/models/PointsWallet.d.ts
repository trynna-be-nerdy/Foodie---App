import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model PointsWallet
 *
 */
export type PointsWalletModel = runtime.Types.Result.DefaultSelection<Prisma.$PointsWalletPayload>;
export type AggregatePointsWallet = {
    _count: PointsWalletCountAggregateOutputType | null;
    _avg: PointsWalletAvgAggregateOutputType | null;
    _sum: PointsWalletSumAggregateOutputType | null;
    _min: PointsWalletMinAggregateOutputType | null;
    _max: PointsWalletMaxAggregateOutputType | null;
};
export type PointsWalletAvgAggregateOutputType = {
    balance: number | null;
};
export type PointsWalletSumAggregateOutputType = {
    balance: number | null;
};
export type PointsWalletMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    balance: number | null;
    lastSyncedAt: Date | null;
    expirationDate: Date | null;
    accountNumber: string | null;
    isConnected: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PointsWalletMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    balance: number | null;
    lastSyncedAt: Date | null;
    expirationDate: Date | null;
    accountNumber: string | null;
    isConnected: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PointsWalletCountAggregateOutputType = {
    id: number;
    userId: number;
    restaurantId: number;
    balance: number;
    lastSyncedAt: number;
    expirationDate: number;
    accountNumber: number;
    isConnected: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PointsWalletAvgAggregateInputType = {
    balance?: true;
};
export type PointsWalletSumAggregateInputType = {
    balance?: true;
};
export type PointsWalletMinAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    balance?: true;
    lastSyncedAt?: true;
    expirationDate?: true;
    accountNumber?: true;
    isConnected?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PointsWalletMaxAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    balance?: true;
    lastSyncedAt?: true;
    expirationDate?: true;
    accountNumber?: true;
    isConnected?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PointsWalletCountAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    balance?: true;
    lastSyncedAt?: true;
    expirationDate?: true;
    accountNumber?: true;
    isConnected?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PointsWalletAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PointsWallet to aggregate.
     */
    where?: Prisma.PointsWalletWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PointsWallets to fetch.
     */
    orderBy?: Prisma.PointsWalletOrderByWithRelationInput | Prisma.PointsWalletOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PointsWalletWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PointsWallets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PointsWallets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PointsWallets
    **/
    _count?: true | PointsWalletCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PointsWalletAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PointsWalletSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PointsWalletMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PointsWalletMaxAggregateInputType;
};
export type GetPointsWalletAggregateType<T extends PointsWalletAggregateArgs> = {
    [P in keyof T & keyof AggregatePointsWallet]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePointsWallet[P]> : Prisma.GetScalarType<T[P], AggregatePointsWallet[P]>;
};
export type PointsWalletGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PointsWalletWhereInput;
    orderBy?: Prisma.PointsWalletOrderByWithAggregationInput | Prisma.PointsWalletOrderByWithAggregationInput[];
    by: Prisma.PointsWalletScalarFieldEnum[] | Prisma.PointsWalletScalarFieldEnum;
    having?: Prisma.PointsWalletScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PointsWalletCountAggregateInputType | true;
    _avg?: PointsWalletAvgAggregateInputType;
    _sum?: PointsWalletSumAggregateInputType;
    _min?: PointsWalletMinAggregateInputType;
    _max?: PointsWalletMaxAggregateInputType;
};
export type PointsWalletGroupByOutputType = {
    id: string;
    userId: string;
    restaurantId: string;
    balance: number;
    lastSyncedAt: Date | null;
    expirationDate: Date | null;
    accountNumber: string | null;
    isConnected: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: PointsWalletCountAggregateOutputType | null;
    _avg: PointsWalletAvgAggregateOutputType | null;
    _sum: PointsWalletSumAggregateOutputType | null;
    _min: PointsWalletMinAggregateOutputType | null;
    _max: PointsWalletMaxAggregateOutputType | null;
};
type GetPointsWalletGroupByPayload<T extends PointsWalletGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PointsWalletGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PointsWalletGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PointsWalletGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PointsWalletGroupByOutputType[P]>;
}>>;
export type PointsWalletWhereInput = {
    AND?: Prisma.PointsWalletWhereInput | Prisma.PointsWalletWhereInput[];
    OR?: Prisma.PointsWalletWhereInput[];
    NOT?: Prisma.PointsWalletWhereInput | Prisma.PointsWalletWhereInput[];
    id?: Prisma.StringFilter<"PointsWallet"> | string;
    userId?: Prisma.StringFilter<"PointsWallet"> | string;
    restaurantId?: Prisma.StringFilter<"PointsWallet"> | string;
    balance?: Prisma.IntFilter<"PointsWallet"> | number;
    lastSyncedAt?: Prisma.DateTimeNullableFilter<"PointsWallet"> | Date | string | null;
    expirationDate?: Prisma.DateTimeNullableFilter<"PointsWallet"> | Date | string | null;
    accountNumber?: Prisma.StringNullableFilter<"PointsWallet"> | string | null;
    isConnected?: Prisma.BoolFilter<"PointsWallet"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PointsWallet"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PointsWallet"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    restaurant?: Prisma.XOR<Prisma.RestaurantScalarRelationFilter, Prisma.RestaurantWhereInput>;
};
export type PointsWalletOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    expirationDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    accountNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    isConnected?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    restaurant?: Prisma.RestaurantOrderByWithRelationInput;
};
export type PointsWalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_restaurantId?: Prisma.PointsWalletUserIdRestaurantIdCompoundUniqueInput;
    AND?: Prisma.PointsWalletWhereInput | Prisma.PointsWalletWhereInput[];
    OR?: Prisma.PointsWalletWhereInput[];
    NOT?: Prisma.PointsWalletWhereInput | Prisma.PointsWalletWhereInput[];
    userId?: Prisma.StringFilter<"PointsWallet"> | string;
    restaurantId?: Prisma.StringFilter<"PointsWallet"> | string;
    balance?: Prisma.IntFilter<"PointsWallet"> | number;
    lastSyncedAt?: Prisma.DateTimeNullableFilter<"PointsWallet"> | Date | string | null;
    expirationDate?: Prisma.DateTimeNullableFilter<"PointsWallet"> | Date | string | null;
    accountNumber?: Prisma.StringNullableFilter<"PointsWallet"> | string | null;
    isConnected?: Prisma.BoolFilter<"PointsWallet"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PointsWallet"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PointsWallet"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    restaurant?: Prisma.XOR<Prisma.RestaurantScalarRelationFilter, Prisma.RestaurantWhereInput>;
}, "id" | "userId_restaurantId">;
export type PointsWalletOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    expirationDate?: Prisma.SortOrderInput | Prisma.SortOrder;
    accountNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    isConnected?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PointsWalletCountOrderByAggregateInput;
    _avg?: Prisma.PointsWalletAvgOrderByAggregateInput;
    _max?: Prisma.PointsWalletMaxOrderByAggregateInput;
    _min?: Prisma.PointsWalletMinOrderByAggregateInput;
    _sum?: Prisma.PointsWalletSumOrderByAggregateInput;
};
export type PointsWalletScalarWhereWithAggregatesInput = {
    AND?: Prisma.PointsWalletScalarWhereWithAggregatesInput | Prisma.PointsWalletScalarWhereWithAggregatesInput[];
    OR?: Prisma.PointsWalletScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PointsWalletScalarWhereWithAggregatesInput | Prisma.PointsWalletScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PointsWallet"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"PointsWallet"> | string;
    restaurantId?: Prisma.StringWithAggregatesFilter<"PointsWallet"> | string;
    balance?: Prisma.IntWithAggregatesFilter<"PointsWallet"> | number;
    lastSyncedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PointsWallet"> | Date | string | null;
    expirationDate?: Prisma.DateTimeNullableWithAggregatesFilter<"PointsWallet"> | Date | string | null;
    accountNumber?: Prisma.StringNullableWithAggregatesFilter<"PointsWallet"> | string | null;
    isConnected?: Prisma.BoolWithAggregatesFilter<"PointsWallet"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PointsWallet"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PointsWallet"> | Date | string;
};
export type PointsWalletCreateInput = {
    id?: string;
    balance?: number;
    lastSyncedAt?: Date | string | null;
    expirationDate?: Date | string | null;
    accountNumber?: string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPointsWalletsInput;
    restaurant: Prisma.RestaurantCreateNestedOneWithoutPointsWalletsInput;
};
export type PointsWalletUncheckedCreateInput = {
    id?: string;
    userId: string;
    restaurantId: string;
    balance?: number;
    lastSyncedAt?: Date | string | null;
    expirationDate?: Date | string | null;
    accountNumber?: string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PointsWalletUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expirationDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPointsWalletsNestedInput;
    restaurant?: Prisma.RestaurantUpdateOneRequiredWithoutPointsWalletsNestedInput;
};
export type PointsWalletUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expirationDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsWalletCreateManyInput = {
    id?: string;
    userId: string;
    restaurantId: string;
    balance?: number;
    lastSyncedAt?: Date | string | null;
    expirationDate?: Date | string | null;
    accountNumber?: string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PointsWalletUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expirationDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsWalletUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expirationDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsWalletListRelationFilter = {
    every?: Prisma.PointsWalletWhereInput;
    some?: Prisma.PointsWalletWhereInput;
    none?: Prisma.PointsWalletWhereInput;
};
export type PointsWalletOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PointsWalletUserIdRestaurantIdCompoundUniqueInput = {
    userId: string;
    restaurantId: string;
};
export type PointsWalletCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    expirationDate?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    isConnected?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PointsWalletAvgOrderByAggregateInput = {
    balance?: Prisma.SortOrder;
};
export type PointsWalletMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    expirationDate?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    isConnected?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PointsWalletMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    lastSyncedAt?: Prisma.SortOrder;
    expirationDate?: Prisma.SortOrder;
    accountNumber?: Prisma.SortOrder;
    isConnected?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PointsWalletSumOrderByAggregateInput = {
    balance?: Prisma.SortOrder;
};
export type PointsWalletCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PointsWalletCreateWithoutUserInput, Prisma.PointsWalletUncheckedCreateWithoutUserInput> | Prisma.PointsWalletCreateWithoutUserInput[] | Prisma.PointsWalletUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointsWalletCreateOrConnectWithoutUserInput | Prisma.PointsWalletCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PointsWalletCreateManyUserInputEnvelope;
    connect?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
};
export type PointsWalletUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PointsWalletCreateWithoutUserInput, Prisma.PointsWalletUncheckedCreateWithoutUserInput> | Prisma.PointsWalletCreateWithoutUserInput[] | Prisma.PointsWalletUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointsWalletCreateOrConnectWithoutUserInput | Prisma.PointsWalletCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PointsWalletCreateManyUserInputEnvelope;
    connect?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
};
export type PointsWalletUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PointsWalletCreateWithoutUserInput, Prisma.PointsWalletUncheckedCreateWithoutUserInput> | Prisma.PointsWalletCreateWithoutUserInput[] | Prisma.PointsWalletUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointsWalletCreateOrConnectWithoutUserInput | Prisma.PointsWalletCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PointsWalletUpsertWithWhereUniqueWithoutUserInput | Prisma.PointsWalletUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PointsWalletCreateManyUserInputEnvelope;
    set?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    disconnect?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    delete?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    connect?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    update?: Prisma.PointsWalletUpdateWithWhereUniqueWithoutUserInput | Prisma.PointsWalletUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PointsWalletUpdateManyWithWhereWithoutUserInput | Prisma.PointsWalletUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PointsWalletScalarWhereInput | Prisma.PointsWalletScalarWhereInput[];
};
export type PointsWalletUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PointsWalletCreateWithoutUserInput, Prisma.PointsWalletUncheckedCreateWithoutUserInput> | Prisma.PointsWalletCreateWithoutUserInput[] | Prisma.PointsWalletUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PointsWalletCreateOrConnectWithoutUserInput | Prisma.PointsWalletCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PointsWalletUpsertWithWhereUniqueWithoutUserInput | Prisma.PointsWalletUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PointsWalletCreateManyUserInputEnvelope;
    set?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    disconnect?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    delete?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    connect?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    update?: Prisma.PointsWalletUpdateWithWhereUniqueWithoutUserInput | Prisma.PointsWalletUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PointsWalletUpdateManyWithWhereWithoutUserInput | Prisma.PointsWalletUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PointsWalletScalarWhereInput | Prisma.PointsWalletScalarWhereInput[];
};
export type PointsWalletCreateNestedManyWithoutRestaurantInput = {
    create?: Prisma.XOR<Prisma.PointsWalletCreateWithoutRestaurantInput, Prisma.PointsWalletUncheckedCreateWithoutRestaurantInput> | Prisma.PointsWalletCreateWithoutRestaurantInput[] | Prisma.PointsWalletUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.PointsWalletCreateOrConnectWithoutRestaurantInput | Prisma.PointsWalletCreateOrConnectWithoutRestaurantInput[];
    createMany?: Prisma.PointsWalletCreateManyRestaurantInputEnvelope;
    connect?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
};
export type PointsWalletUncheckedCreateNestedManyWithoutRestaurantInput = {
    create?: Prisma.XOR<Prisma.PointsWalletCreateWithoutRestaurantInput, Prisma.PointsWalletUncheckedCreateWithoutRestaurantInput> | Prisma.PointsWalletCreateWithoutRestaurantInput[] | Prisma.PointsWalletUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.PointsWalletCreateOrConnectWithoutRestaurantInput | Prisma.PointsWalletCreateOrConnectWithoutRestaurantInput[];
    createMany?: Prisma.PointsWalletCreateManyRestaurantInputEnvelope;
    connect?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
};
export type PointsWalletUpdateManyWithoutRestaurantNestedInput = {
    create?: Prisma.XOR<Prisma.PointsWalletCreateWithoutRestaurantInput, Prisma.PointsWalletUncheckedCreateWithoutRestaurantInput> | Prisma.PointsWalletCreateWithoutRestaurantInput[] | Prisma.PointsWalletUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.PointsWalletCreateOrConnectWithoutRestaurantInput | Prisma.PointsWalletCreateOrConnectWithoutRestaurantInput[];
    upsert?: Prisma.PointsWalletUpsertWithWhereUniqueWithoutRestaurantInput | Prisma.PointsWalletUpsertWithWhereUniqueWithoutRestaurantInput[];
    createMany?: Prisma.PointsWalletCreateManyRestaurantInputEnvelope;
    set?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    disconnect?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    delete?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    connect?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    update?: Prisma.PointsWalletUpdateWithWhereUniqueWithoutRestaurantInput | Prisma.PointsWalletUpdateWithWhereUniqueWithoutRestaurantInput[];
    updateMany?: Prisma.PointsWalletUpdateManyWithWhereWithoutRestaurantInput | Prisma.PointsWalletUpdateManyWithWhereWithoutRestaurantInput[];
    deleteMany?: Prisma.PointsWalletScalarWhereInput | Prisma.PointsWalletScalarWhereInput[];
};
export type PointsWalletUncheckedUpdateManyWithoutRestaurantNestedInput = {
    create?: Prisma.XOR<Prisma.PointsWalletCreateWithoutRestaurantInput, Prisma.PointsWalletUncheckedCreateWithoutRestaurantInput> | Prisma.PointsWalletCreateWithoutRestaurantInput[] | Prisma.PointsWalletUncheckedCreateWithoutRestaurantInput[];
    connectOrCreate?: Prisma.PointsWalletCreateOrConnectWithoutRestaurantInput | Prisma.PointsWalletCreateOrConnectWithoutRestaurantInput[];
    upsert?: Prisma.PointsWalletUpsertWithWhereUniqueWithoutRestaurantInput | Prisma.PointsWalletUpsertWithWhereUniqueWithoutRestaurantInput[];
    createMany?: Prisma.PointsWalletCreateManyRestaurantInputEnvelope;
    set?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    disconnect?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    delete?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    connect?: Prisma.PointsWalletWhereUniqueInput | Prisma.PointsWalletWhereUniqueInput[];
    update?: Prisma.PointsWalletUpdateWithWhereUniqueWithoutRestaurantInput | Prisma.PointsWalletUpdateWithWhereUniqueWithoutRestaurantInput[];
    updateMany?: Prisma.PointsWalletUpdateManyWithWhereWithoutRestaurantInput | Prisma.PointsWalletUpdateManyWithWhereWithoutRestaurantInput[];
    deleteMany?: Prisma.PointsWalletScalarWhereInput | Prisma.PointsWalletScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type PointsWalletCreateWithoutUserInput = {
    id?: string;
    balance?: number;
    lastSyncedAt?: Date | string | null;
    expirationDate?: Date | string | null;
    accountNumber?: string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    restaurant: Prisma.RestaurantCreateNestedOneWithoutPointsWalletsInput;
};
export type PointsWalletUncheckedCreateWithoutUserInput = {
    id?: string;
    restaurantId: string;
    balance?: number;
    lastSyncedAt?: Date | string | null;
    expirationDate?: Date | string | null;
    accountNumber?: string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PointsWalletCreateOrConnectWithoutUserInput = {
    where: Prisma.PointsWalletWhereUniqueInput;
    create: Prisma.XOR<Prisma.PointsWalletCreateWithoutUserInput, Prisma.PointsWalletUncheckedCreateWithoutUserInput>;
};
export type PointsWalletCreateManyUserInputEnvelope = {
    data: Prisma.PointsWalletCreateManyUserInput | Prisma.PointsWalletCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PointsWalletUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PointsWalletWhereUniqueInput;
    update: Prisma.XOR<Prisma.PointsWalletUpdateWithoutUserInput, Prisma.PointsWalletUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PointsWalletCreateWithoutUserInput, Prisma.PointsWalletUncheckedCreateWithoutUserInput>;
};
export type PointsWalletUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PointsWalletWhereUniqueInput;
    data: Prisma.XOR<Prisma.PointsWalletUpdateWithoutUserInput, Prisma.PointsWalletUncheckedUpdateWithoutUserInput>;
};
export type PointsWalletUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PointsWalletScalarWhereInput;
    data: Prisma.XOR<Prisma.PointsWalletUpdateManyMutationInput, Prisma.PointsWalletUncheckedUpdateManyWithoutUserInput>;
};
export type PointsWalletScalarWhereInput = {
    AND?: Prisma.PointsWalletScalarWhereInput | Prisma.PointsWalletScalarWhereInput[];
    OR?: Prisma.PointsWalletScalarWhereInput[];
    NOT?: Prisma.PointsWalletScalarWhereInput | Prisma.PointsWalletScalarWhereInput[];
    id?: Prisma.StringFilter<"PointsWallet"> | string;
    userId?: Prisma.StringFilter<"PointsWallet"> | string;
    restaurantId?: Prisma.StringFilter<"PointsWallet"> | string;
    balance?: Prisma.IntFilter<"PointsWallet"> | number;
    lastSyncedAt?: Prisma.DateTimeNullableFilter<"PointsWallet"> | Date | string | null;
    expirationDate?: Prisma.DateTimeNullableFilter<"PointsWallet"> | Date | string | null;
    accountNumber?: Prisma.StringNullableFilter<"PointsWallet"> | string | null;
    isConnected?: Prisma.BoolFilter<"PointsWallet"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PointsWallet"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PointsWallet"> | Date | string;
};
export type PointsWalletCreateWithoutRestaurantInput = {
    id?: string;
    balance?: number;
    lastSyncedAt?: Date | string | null;
    expirationDate?: Date | string | null;
    accountNumber?: string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPointsWalletsInput;
};
export type PointsWalletUncheckedCreateWithoutRestaurantInput = {
    id?: string;
    userId: string;
    balance?: number;
    lastSyncedAt?: Date | string | null;
    expirationDate?: Date | string | null;
    accountNumber?: string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PointsWalletCreateOrConnectWithoutRestaurantInput = {
    where: Prisma.PointsWalletWhereUniqueInput;
    create: Prisma.XOR<Prisma.PointsWalletCreateWithoutRestaurantInput, Prisma.PointsWalletUncheckedCreateWithoutRestaurantInput>;
};
export type PointsWalletCreateManyRestaurantInputEnvelope = {
    data: Prisma.PointsWalletCreateManyRestaurantInput | Prisma.PointsWalletCreateManyRestaurantInput[];
    skipDuplicates?: boolean;
};
export type PointsWalletUpsertWithWhereUniqueWithoutRestaurantInput = {
    where: Prisma.PointsWalletWhereUniqueInput;
    update: Prisma.XOR<Prisma.PointsWalletUpdateWithoutRestaurantInput, Prisma.PointsWalletUncheckedUpdateWithoutRestaurantInput>;
    create: Prisma.XOR<Prisma.PointsWalletCreateWithoutRestaurantInput, Prisma.PointsWalletUncheckedCreateWithoutRestaurantInput>;
};
export type PointsWalletUpdateWithWhereUniqueWithoutRestaurantInput = {
    where: Prisma.PointsWalletWhereUniqueInput;
    data: Prisma.XOR<Prisma.PointsWalletUpdateWithoutRestaurantInput, Prisma.PointsWalletUncheckedUpdateWithoutRestaurantInput>;
};
export type PointsWalletUpdateManyWithWhereWithoutRestaurantInput = {
    where: Prisma.PointsWalletScalarWhereInput;
    data: Prisma.XOR<Prisma.PointsWalletUpdateManyMutationInput, Prisma.PointsWalletUncheckedUpdateManyWithoutRestaurantInput>;
};
export type PointsWalletCreateManyUserInput = {
    id?: string;
    restaurantId: string;
    balance?: number;
    lastSyncedAt?: Date | string | null;
    expirationDate?: Date | string | null;
    accountNumber?: string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PointsWalletUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expirationDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    restaurant?: Prisma.RestaurantUpdateOneRequiredWithoutPointsWalletsNestedInput;
};
export type PointsWalletUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expirationDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsWalletUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expirationDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsWalletCreateManyRestaurantInput = {
    id?: string;
    userId: string;
    balance?: number;
    lastSyncedAt?: Date | string | null;
    expirationDate?: Date | string | null;
    accountNumber?: string | null;
    isConnected?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PointsWalletUpdateWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expirationDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPointsWalletsNestedInput;
};
export type PointsWalletUncheckedUpdateWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expirationDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsWalletUncheckedUpdateManyWithoutRestaurantInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    lastSyncedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    expirationDate?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    accountNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isConnected?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PointsWalletSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    balance?: boolean;
    lastSyncedAt?: boolean;
    expirationDate?: boolean;
    accountNumber?: boolean;
    isConnected?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pointsWallet"]>;
export type PointsWalletSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    balance?: boolean;
    lastSyncedAt?: boolean;
    expirationDate?: boolean;
    accountNumber?: boolean;
    isConnected?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pointsWallet"]>;
export type PointsWalletSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    balance?: boolean;
    lastSyncedAt?: boolean;
    expirationDate?: boolean;
    accountNumber?: boolean;
    isConnected?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pointsWallet"]>;
export type PointsWalletSelectScalar = {
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    balance?: boolean;
    lastSyncedAt?: boolean;
    expirationDate?: boolean;
    accountNumber?: boolean;
    isConnected?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PointsWalletOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "restaurantId" | "balance" | "lastSyncedAt" | "expirationDate" | "accountNumber" | "isConnected" | "createdAt" | "updatedAt", ExtArgs["result"]["pointsWallet"]>;
export type PointsWalletInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type PointsWalletIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type PointsWalletIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    restaurant?: boolean | Prisma.RestaurantDefaultArgs<ExtArgs>;
};
export type $PointsWalletPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PointsWallet";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        restaurant: Prisma.$RestaurantPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        restaurantId: string;
        balance: number;
        lastSyncedAt: Date | null;
        expirationDate: Date | null;
        accountNumber: string | null;
        isConnected: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["pointsWallet"]>;
    composites: {};
};
export type PointsWalletGetPayload<S extends boolean | null | undefined | PointsWalletDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload, S>;
export type PointsWalletCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PointsWalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PointsWalletCountAggregateInputType | true;
};
export interface PointsWalletDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PointsWallet'];
        meta: {
            name: 'PointsWallet';
        };
    };
    /**
     * Find zero or one PointsWallet that matches the filter.
     * @param {PointsWalletFindUniqueArgs} args - Arguments to find a PointsWallet
     * @example
     * // Get one PointsWallet
     * const pointsWallet = await prisma.pointsWallet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PointsWalletFindUniqueArgs>(args: Prisma.SelectSubset<T, PointsWalletFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PointsWalletClient<runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PointsWallet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PointsWalletFindUniqueOrThrowArgs} args - Arguments to find a PointsWallet
     * @example
     * // Get one PointsWallet
     * const pointsWallet = await prisma.pointsWallet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PointsWalletFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PointsWalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PointsWalletClient<runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PointsWallet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsWalletFindFirstArgs} args - Arguments to find a PointsWallet
     * @example
     * // Get one PointsWallet
     * const pointsWallet = await prisma.pointsWallet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PointsWalletFindFirstArgs>(args?: Prisma.SelectSubset<T, PointsWalletFindFirstArgs<ExtArgs>>): Prisma.Prisma__PointsWalletClient<runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PointsWallet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsWalletFindFirstOrThrowArgs} args - Arguments to find a PointsWallet
     * @example
     * // Get one PointsWallet
     * const pointsWallet = await prisma.pointsWallet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PointsWalletFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PointsWalletFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PointsWalletClient<runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PointsWallets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsWalletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PointsWallets
     * const pointsWallets = await prisma.pointsWallet.findMany()
     *
     * // Get first 10 PointsWallets
     * const pointsWallets = await prisma.pointsWallet.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const pointsWalletWithIdOnly = await prisma.pointsWallet.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PointsWalletFindManyArgs>(args?: Prisma.SelectSubset<T, PointsWalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PointsWallet.
     * @param {PointsWalletCreateArgs} args - Arguments to create a PointsWallet.
     * @example
     * // Create one PointsWallet
     * const PointsWallet = await prisma.pointsWallet.create({
     *   data: {
     *     // ... data to create a PointsWallet
     *   }
     * })
     *
     */
    create<T extends PointsWalletCreateArgs>(args: Prisma.SelectSubset<T, PointsWalletCreateArgs<ExtArgs>>): Prisma.Prisma__PointsWalletClient<runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PointsWallets.
     * @param {PointsWalletCreateManyArgs} args - Arguments to create many PointsWallets.
     * @example
     * // Create many PointsWallets
     * const pointsWallet = await prisma.pointsWallet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PointsWalletCreateManyArgs>(args?: Prisma.SelectSubset<T, PointsWalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PointsWallets and returns the data saved in the database.
     * @param {PointsWalletCreateManyAndReturnArgs} args - Arguments to create many PointsWallets.
     * @example
     * // Create many PointsWallets
     * const pointsWallet = await prisma.pointsWallet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PointsWallets and only return the `id`
     * const pointsWalletWithIdOnly = await prisma.pointsWallet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PointsWalletCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PointsWalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PointsWallet.
     * @param {PointsWalletDeleteArgs} args - Arguments to delete one PointsWallet.
     * @example
     * // Delete one PointsWallet
     * const PointsWallet = await prisma.pointsWallet.delete({
     *   where: {
     *     // ... filter to delete one PointsWallet
     *   }
     * })
     *
     */
    delete<T extends PointsWalletDeleteArgs>(args: Prisma.SelectSubset<T, PointsWalletDeleteArgs<ExtArgs>>): Prisma.Prisma__PointsWalletClient<runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PointsWallet.
     * @param {PointsWalletUpdateArgs} args - Arguments to update one PointsWallet.
     * @example
     * // Update one PointsWallet
     * const pointsWallet = await prisma.pointsWallet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PointsWalletUpdateArgs>(args: Prisma.SelectSubset<T, PointsWalletUpdateArgs<ExtArgs>>): Prisma.Prisma__PointsWalletClient<runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PointsWallets.
     * @param {PointsWalletDeleteManyArgs} args - Arguments to filter PointsWallets to delete.
     * @example
     * // Delete a few PointsWallets
     * const { count } = await prisma.pointsWallet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PointsWalletDeleteManyArgs>(args?: Prisma.SelectSubset<T, PointsWalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PointsWallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsWalletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PointsWallets
     * const pointsWallet = await prisma.pointsWallet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PointsWalletUpdateManyArgs>(args: Prisma.SelectSubset<T, PointsWalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PointsWallets and returns the data updated in the database.
     * @param {PointsWalletUpdateManyAndReturnArgs} args - Arguments to update many PointsWallets.
     * @example
     * // Update many PointsWallets
     * const pointsWallet = await prisma.pointsWallet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PointsWallets and only return the `id`
     * const pointsWalletWithIdOnly = await prisma.pointsWallet.updateManyAndReturn({
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
    updateManyAndReturn<T extends PointsWalletUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PointsWalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PointsWallet.
     * @param {PointsWalletUpsertArgs} args - Arguments to update or create a PointsWallet.
     * @example
     * // Update or create a PointsWallet
     * const pointsWallet = await prisma.pointsWallet.upsert({
     *   create: {
     *     // ... data to create a PointsWallet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PointsWallet we want to update
     *   }
     * })
     */
    upsert<T extends PointsWalletUpsertArgs>(args: Prisma.SelectSubset<T, PointsWalletUpsertArgs<ExtArgs>>): Prisma.Prisma__PointsWalletClient<runtime.Types.Result.GetResult<Prisma.$PointsWalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PointsWallets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsWalletCountArgs} args - Arguments to filter PointsWallets to count.
     * @example
     * // Count the number of PointsWallets
     * const count = await prisma.pointsWallet.count({
     *   where: {
     *     // ... the filter for the PointsWallets we want to count
     *   }
     * })
    **/
    count<T extends PointsWalletCountArgs>(args?: Prisma.Subset<T, PointsWalletCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PointsWalletCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PointsWallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsWalletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PointsWalletAggregateArgs>(args: Prisma.Subset<T, PointsWalletAggregateArgs>): Prisma.PrismaPromise<GetPointsWalletAggregateType<T>>;
    /**
     * Group by PointsWallet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PointsWalletGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PointsWalletGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PointsWalletGroupByArgs['orderBy'];
    } : {
        orderBy?: PointsWalletGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PointsWalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPointsWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PointsWallet model
     */
    readonly fields: PointsWalletFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PointsWallet.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PointsWalletClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
 * Fields of the PointsWallet model
 */
export interface PointsWalletFieldRefs {
    readonly id: Prisma.FieldRef<"PointsWallet", 'String'>;
    readonly userId: Prisma.FieldRef<"PointsWallet", 'String'>;
    readonly restaurantId: Prisma.FieldRef<"PointsWallet", 'String'>;
    readonly balance: Prisma.FieldRef<"PointsWallet", 'Int'>;
    readonly lastSyncedAt: Prisma.FieldRef<"PointsWallet", 'DateTime'>;
    readonly expirationDate: Prisma.FieldRef<"PointsWallet", 'DateTime'>;
    readonly accountNumber: Prisma.FieldRef<"PointsWallet", 'String'>;
    readonly isConnected: Prisma.FieldRef<"PointsWallet", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"PointsWallet", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PointsWallet", 'DateTime'>;
}
/**
 * PointsWallet findUnique
 */
export type PointsWalletFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PointsWallet to fetch.
     */
    where: Prisma.PointsWalletWhereUniqueInput;
};
/**
 * PointsWallet findUniqueOrThrow
 */
export type PointsWalletFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PointsWallet to fetch.
     */
    where: Prisma.PointsWalletWhereUniqueInput;
};
/**
 * PointsWallet findFirst
 */
export type PointsWalletFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PointsWallet to fetch.
     */
    where?: Prisma.PointsWalletWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PointsWallets to fetch.
     */
    orderBy?: Prisma.PointsWalletOrderByWithRelationInput | Prisma.PointsWalletOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PointsWallets.
     */
    cursor?: Prisma.PointsWalletWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PointsWallets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PointsWallets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PointsWallets.
     */
    distinct?: Prisma.PointsWalletScalarFieldEnum | Prisma.PointsWalletScalarFieldEnum[];
};
/**
 * PointsWallet findFirstOrThrow
 */
export type PointsWalletFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PointsWallet to fetch.
     */
    where?: Prisma.PointsWalletWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PointsWallets to fetch.
     */
    orderBy?: Prisma.PointsWalletOrderByWithRelationInput | Prisma.PointsWalletOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PointsWallets.
     */
    cursor?: Prisma.PointsWalletWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PointsWallets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PointsWallets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PointsWallets.
     */
    distinct?: Prisma.PointsWalletScalarFieldEnum | Prisma.PointsWalletScalarFieldEnum[];
};
/**
 * PointsWallet findMany
 */
export type PointsWalletFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which PointsWallets to fetch.
     */
    where?: Prisma.PointsWalletWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PointsWallets to fetch.
     */
    orderBy?: Prisma.PointsWalletOrderByWithRelationInput | Prisma.PointsWalletOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PointsWallets.
     */
    cursor?: Prisma.PointsWalletWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PointsWallets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PointsWallets.
     */
    skip?: number;
    distinct?: Prisma.PointsWalletScalarFieldEnum | Prisma.PointsWalletScalarFieldEnum[];
};
/**
 * PointsWallet create
 */
export type PointsWalletCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a PointsWallet.
     */
    data: Prisma.XOR<Prisma.PointsWalletCreateInput, Prisma.PointsWalletUncheckedCreateInput>;
};
/**
 * PointsWallet createMany
 */
export type PointsWalletCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PointsWallets.
     */
    data: Prisma.PointsWalletCreateManyInput | Prisma.PointsWalletCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PointsWallet createManyAndReturn
 */
export type PointsWalletCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsWallet
     */
    select?: Prisma.PointsWalletSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PointsWallet
     */
    omit?: Prisma.PointsWalletOmit<ExtArgs> | null;
    /**
     * The data used to create many PointsWallets.
     */
    data: Prisma.PointsWalletCreateManyInput | Prisma.PointsWalletCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PointsWalletIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PointsWallet update
 */
export type PointsWalletUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a PointsWallet.
     */
    data: Prisma.XOR<Prisma.PointsWalletUpdateInput, Prisma.PointsWalletUncheckedUpdateInput>;
    /**
     * Choose, which PointsWallet to update.
     */
    where: Prisma.PointsWalletWhereUniqueInput;
};
/**
 * PointsWallet updateMany
 */
export type PointsWalletUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PointsWallets.
     */
    data: Prisma.XOR<Prisma.PointsWalletUpdateManyMutationInput, Prisma.PointsWalletUncheckedUpdateManyInput>;
    /**
     * Filter which PointsWallets to update
     */
    where?: Prisma.PointsWalletWhereInput;
    /**
     * Limit how many PointsWallets to update.
     */
    limit?: number;
};
/**
 * PointsWallet updateManyAndReturn
 */
export type PointsWalletUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PointsWallet
     */
    select?: Prisma.PointsWalletSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PointsWallet
     */
    omit?: Prisma.PointsWalletOmit<ExtArgs> | null;
    /**
     * The data used to update PointsWallets.
     */
    data: Prisma.XOR<Prisma.PointsWalletUpdateManyMutationInput, Prisma.PointsWalletUncheckedUpdateManyInput>;
    /**
     * Filter which PointsWallets to update
     */
    where?: Prisma.PointsWalletWhereInput;
    /**
     * Limit how many PointsWallets to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PointsWalletIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PointsWallet upsert
 */
export type PointsWalletUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the PointsWallet to update in case it exists.
     */
    where: Prisma.PointsWalletWhereUniqueInput;
    /**
     * In case the PointsWallet found by the `where` argument doesn't exist, create a new PointsWallet with this data.
     */
    create: Prisma.XOR<Prisma.PointsWalletCreateInput, Prisma.PointsWalletUncheckedCreateInput>;
    /**
     * In case the PointsWallet was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PointsWalletUpdateInput, Prisma.PointsWalletUncheckedUpdateInput>;
};
/**
 * PointsWallet delete
 */
export type PointsWalletDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which PointsWallet to delete.
     */
    where: Prisma.PointsWalletWhereUniqueInput;
};
/**
 * PointsWallet deleteMany
 */
export type PointsWalletDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PointsWallets to delete
     */
    where?: Prisma.PointsWalletWhereInput;
    /**
     * Limit how many PointsWallets to delete.
     */
    limit?: number;
};
/**
 * PointsWallet without action
 */
export type PointsWalletDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=PointsWallet.d.ts.map