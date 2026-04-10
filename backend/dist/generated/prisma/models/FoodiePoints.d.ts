import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model FoodiePoints
 *
 */
export type FoodiePointsModel = runtime.Types.Result.DefaultSelection<Prisma.$FoodiePointsPayload>;
export type AggregateFoodiePoints = {
    _count: FoodiePointsCountAggregateOutputType | null;
    _avg: FoodiePointsAvgAggregateOutputType | null;
    _sum: FoodiePointsSumAggregateOutputType | null;
    _min: FoodiePointsMinAggregateOutputType | null;
    _max: FoodiePointsMaxAggregateOutputType | null;
};
export type FoodiePointsAvgAggregateOutputType = {
    balance: number | null;
    totalEarned: number | null;
    totalRedeemed: number | null;
};
export type FoodiePointsSumAggregateOutputType = {
    balance: number | null;
    totalEarned: number | null;
    totalRedeemed: number | null;
};
export type FoodiePointsMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    balance: number | null;
    totalEarned: number | null;
    totalRedeemed: number | null;
    lastActivity: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FoodiePointsMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    balance: number | null;
    totalEarned: number | null;
    totalRedeemed: number | null;
    lastActivity: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type FoodiePointsCountAggregateOutputType = {
    id: number;
    userId: number;
    balance: number;
    totalEarned: number;
    totalRedeemed: number;
    lastActivity: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type FoodiePointsAvgAggregateInputType = {
    balance?: true;
    totalEarned?: true;
    totalRedeemed?: true;
};
export type FoodiePointsSumAggregateInputType = {
    balance?: true;
    totalEarned?: true;
    totalRedeemed?: true;
};
export type FoodiePointsMinAggregateInputType = {
    id?: true;
    userId?: true;
    balance?: true;
    totalEarned?: true;
    totalRedeemed?: true;
    lastActivity?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FoodiePointsMaxAggregateInputType = {
    id?: true;
    userId?: true;
    balance?: true;
    totalEarned?: true;
    totalRedeemed?: true;
    lastActivity?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type FoodiePointsCountAggregateInputType = {
    id?: true;
    userId?: true;
    balance?: true;
    totalEarned?: true;
    totalRedeemed?: true;
    lastActivity?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type FoodiePointsAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FoodiePoints to aggregate.
     */
    where?: Prisma.FoodiePointsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FoodiePoints to fetch.
     */
    orderBy?: Prisma.FoodiePointsOrderByWithRelationInput | Prisma.FoodiePointsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.FoodiePointsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FoodiePoints from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FoodiePoints.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned FoodiePoints
    **/
    _count?: true | FoodiePointsCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: FoodiePointsAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: FoodiePointsSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: FoodiePointsMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: FoodiePointsMaxAggregateInputType;
};
export type GetFoodiePointsAggregateType<T extends FoodiePointsAggregateArgs> = {
    [P in keyof T & keyof AggregateFoodiePoints]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateFoodiePoints[P]> : Prisma.GetScalarType<T[P], AggregateFoodiePoints[P]>;
};
export type FoodiePointsGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.FoodiePointsWhereInput;
    orderBy?: Prisma.FoodiePointsOrderByWithAggregationInput | Prisma.FoodiePointsOrderByWithAggregationInput[];
    by: Prisma.FoodiePointsScalarFieldEnum[] | Prisma.FoodiePointsScalarFieldEnum;
    having?: Prisma.FoodiePointsScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: FoodiePointsCountAggregateInputType | true;
    _avg?: FoodiePointsAvgAggregateInputType;
    _sum?: FoodiePointsSumAggregateInputType;
    _min?: FoodiePointsMinAggregateInputType;
    _max?: FoodiePointsMaxAggregateInputType;
};
export type FoodiePointsGroupByOutputType = {
    id: string;
    userId: string;
    balance: number;
    totalEarned: number;
    totalRedeemed: number;
    lastActivity: Date;
    createdAt: Date;
    updatedAt: Date;
    _count: FoodiePointsCountAggregateOutputType | null;
    _avg: FoodiePointsAvgAggregateOutputType | null;
    _sum: FoodiePointsSumAggregateOutputType | null;
    _min: FoodiePointsMinAggregateOutputType | null;
    _max: FoodiePointsMaxAggregateOutputType | null;
};
type GetFoodiePointsGroupByPayload<T extends FoodiePointsGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<FoodiePointsGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof FoodiePointsGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], FoodiePointsGroupByOutputType[P]> : Prisma.GetScalarType<T[P], FoodiePointsGroupByOutputType[P]>;
}>>;
export type FoodiePointsWhereInput = {
    AND?: Prisma.FoodiePointsWhereInput | Prisma.FoodiePointsWhereInput[];
    OR?: Prisma.FoodiePointsWhereInput[];
    NOT?: Prisma.FoodiePointsWhereInput | Prisma.FoodiePointsWhereInput[];
    id?: Prisma.StringFilter<"FoodiePoints"> | string;
    userId?: Prisma.StringFilter<"FoodiePoints"> | string;
    balance?: Prisma.IntFilter<"FoodiePoints"> | number;
    totalEarned?: Prisma.IntFilter<"FoodiePoints"> | number;
    totalRedeemed?: Prisma.IntFilter<"FoodiePoints"> | number;
    lastActivity?: Prisma.DateTimeFilter<"FoodiePoints"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"FoodiePoints"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FoodiePoints"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type FoodiePointsOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    totalEarned?: Prisma.SortOrder;
    totalRedeemed?: Prisma.SortOrder;
    lastActivity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type FoodiePointsWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.FoodiePointsWhereInput | Prisma.FoodiePointsWhereInput[];
    OR?: Prisma.FoodiePointsWhereInput[];
    NOT?: Prisma.FoodiePointsWhereInput | Prisma.FoodiePointsWhereInput[];
    balance?: Prisma.IntFilter<"FoodiePoints"> | number;
    totalEarned?: Prisma.IntFilter<"FoodiePoints"> | number;
    totalRedeemed?: Prisma.IntFilter<"FoodiePoints"> | number;
    lastActivity?: Prisma.DateTimeFilter<"FoodiePoints"> | Date | string;
    createdAt?: Prisma.DateTimeFilter<"FoodiePoints"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"FoodiePoints"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId">;
export type FoodiePointsOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    totalEarned?: Prisma.SortOrder;
    totalRedeemed?: Prisma.SortOrder;
    lastActivity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.FoodiePointsCountOrderByAggregateInput;
    _avg?: Prisma.FoodiePointsAvgOrderByAggregateInput;
    _max?: Prisma.FoodiePointsMaxOrderByAggregateInput;
    _min?: Prisma.FoodiePointsMinOrderByAggregateInput;
    _sum?: Prisma.FoodiePointsSumOrderByAggregateInput;
};
export type FoodiePointsScalarWhereWithAggregatesInput = {
    AND?: Prisma.FoodiePointsScalarWhereWithAggregatesInput | Prisma.FoodiePointsScalarWhereWithAggregatesInput[];
    OR?: Prisma.FoodiePointsScalarWhereWithAggregatesInput[];
    NOT?: Prisma.FoodiePointsScalarWhereWithAggregatesInput | Prisma.FoodiePointsScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"FoodiePoints"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"FoodiePoints"> | string;
    balance?: Prisma.IntWithAggregatesFilter<"FoodiePoints"> | number;
    totalEarned?: Prisma.IntWithAggregatesFilter<"FoodiePoints"> | number;
    totalRedeemed?: Prisma.IntWithAggregatesFilter<"FoodiePoints"> | number;
    lastActivity?: Prisma.DateTimeWithAggregatesFilter<"FoodiePoints"> | Date | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"FoodiePoints"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"FoodiePoints"> | Date | string;
};
export type FoodiePointsCreateInput = {
    id?: string;
    balance?: number;
    totalEarned?: number;
    totalRedeemed?: number;
    lastActivity?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutFoodiePointsInput;
};
export type FoodiePointsUncheckedCreateInput = {
    id?: string;
    userId: string;
    balance?: number;
    totalEarned?: number;
    totalRedeemed?: number;
    lastActivity?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FoodiePointsUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    totalEarned?: Prisma.IntFieldUpdateOperationsInput | number;
    totalRedeemed?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutFoodiePointsNestedInput;
};
export type FoodiePointsUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    totalEarned?: Prisma.IntFieldUpdateOperationsInput | number;
    totalRedeemed?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodiePointsCreateManyInput = {
    id?: string;
    userId: string;
    balance?: number;
    totalEarned?: number;
    totalRedeemed?: number;
    lastActivity?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FoodiePointsUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    totalEarned?: Prisma.IntFieldUpdateOperationsInput | number;
    totalRedeemed?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodiePointsUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    totalEarned?: Prisma.IntFieldUpdateOperationsInput | number;
    totalRedeemed?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodiePointsNullableScalarRelationFilter = {
    is?: Prisma.FoodiePointsWhereInput | null;
    isNot?: Prisma.FoodiePointsWhereInput | null;
};
export type FoodiePointsCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    totalEarned?: Prisma.SortOrder;
    totalRedeemed?: Prisma.SortOrder;
    lastActivity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FoodiePointsAvgOrderByAggregateInput = {
    balance?: Prisma.SortOrder;
    totalEarned?: Prisma.SortOrder;
    totalRedeemed?: Prisma.SortOrder;
};
export type FoodiePointsMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    totalEarned?: Prisma.SortOrder;
    totalRedeemed?: Prisma.SortOrder;
    lastActivity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FoodiePointsMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    totalEarned?: Prisma.SortOrder;
    totalRedeemed?: Prisma.SortOrder;
    lastActivity?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type FoodiePointsSumOrderByAggregateInput = {
    balance?: Prisma.SortOrder;
    totalEarned?: Prisma.SortOrder;
    totalRedeemed?: Prisma.SortOrder;
};
export type FoodiePointsCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FoodiePointsCreateWithoutUserInput, Prisma.FoodiePointsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FoodiePointsCreateOrConnectWithoutUserInput;
    connect?: Prisma.FoodiePointsWhereUniqueInput;
};
export type FoodiePointsUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.FoodiePointsCreateWithoutUserInput, Prisma.FoodiePointsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FoodiePointsCreateOrConnectWithoutUserInput;
    connect?: Prisma.FoodiePointsWhereUniqueInput;
};
export type FoodiePointsUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FoodiePointsCreateWithoutUserInput, Prisma.FoodiePointsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FoodiePointsCreateOrConnectWithoutUserInput;
    upsert?: Prisma.FoodiePointsUpsertWithoutUserInput;
    disconnect?: Prisma.FoodiePointsWhereInput | boolean;
    delete?: Prisma.FoodiePointsWhereInput | boolean;
    connect?: Prisma.FoodiePointsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodiePointsUpdateToOneWithWhereWithoutUserInput, Prisma.FoodiePointsUpdateWithoutUserInput>, Prisma.FoodiePointsUncheckedUpdateWithoutUserInput>;
};
export type FoodiePointsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.FoodiePointsCreateWithoutUserInput, Prisma.FoodiePointsUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.FoodiePointsCreateOrConnectWithoutUserInput;
    upsert?: Prisma.FoodiePointsUpsertWithoutUserInput;
    disconnect?: Prisma.FoodiePointsWhereInput | boolean;
    delete?: Prisma.FoodiePointsWhereInput | boolean;
    connect?: Prisma.FoodiePointsWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.FoodiePointsUpdateToOneWithWhereWithoutUserInput, Prisma.FoodiePointsUpdateWithoutUserInput>, Prisma.FoodiePointsUncheckedUpdateWithoutUserInput>;
};
export type FoodiePointsCreateWithoutUserInput = {
    id?: string;
    balance?: number;
    totalEarned?: number;
    totalRedeemed?: number;
    lastActivity?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FoodiePointsUncheckedCreateWithoutUserInput = {
    id?: string;
    balance?: number;
    totalEarned?: number;
    totalRedeemed?: number;
    lastActivity?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type FoodiePointsCreateOrConnectWithoutUserInput = {
    where: Prisma.FoodiePointsWhereUniqueInput;
    create: Prisma.XOR<Prisma.FoodiePointsCreateWithoutUserInput, Prisma.FoodiePointsUncheckedCreateWithoutUserInput>;
};
export type FoodiePointsUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.FoodiePointsUpdateWithoutUserInput, Prisma.FoodiePointsUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.FoodiePointsCreateWithoutUserInput, Prisma.FoodiePointsUncheckedCreateWithoutUserInput>;
    where?: Prisma.FoodiePointsWhereInput;
};
export type FoodiePointsUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.FoodiePointsWhereInput;
    data: Prisma.XOR<Prisma.FoodiePointsUpdateWithoutUserInput, Prisma.FoodiePointsUncheckedUpdateWithoutUserInput>;
};
export type FoodiePointsUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    totalEarned?: Prisma.IntFieldUpdateOperationsInput | number;
    totalRedeemed?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodiePointsUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    balance?: Prisma.IntFieldUpdateOperationsInput | number;
    totalEarned?: Prisma.IntFieldUpdateOperationsInput | number;
    totalRedeemed?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivity?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type FoodiePointsSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    balance?: boolean;
    totalEarned?: boolean;
    totalRedeemed?: boolean;
    lastActivity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["foodiePoints"]>;
export type FoodiePointsSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    balance?: boolean;
    totalEarned?: boolean;
    totalRedeemed?: boolean;
    lastActivity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["foodiePoints"]>;
export type FoodiePointsSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    balance?: boolean;
    totalEarned?: boolean;
    totalRedeemed?: boolean;
    lastActivity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["foodiePoints"]>;
export type FoodiePointsSelectScalar = {
    id?: boolean;
    userId?: boolean;
    balance?: boolean;
    totalEarned?: boolean;
    totalRedeemed?: boolean;
    lastActivity?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type FoodiePointsOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "balance" | "totalEarned" | "totalRedeemed" | "lastActivity" | "createdAt" | "updatedAt", ExtArgs["result"]["foodiePoints"]>;
export type FoodiePointsInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FoodiePointsIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type FoodiePointsIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $FoodiePointsPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "FoodiePoints";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        balance: number;
        totalEarned: number;
        totalRedeemed: number;
        lastActivity: Date;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["foodiePoints"]>;
    composites: {};
};
export type FoodiePointsGetPayload<S extends boolean | null | undefined | FoodiePointsDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$FoodiePointsPayload, S>;
export type FoodiePointsCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<FoodiePointsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: FoodiePointsCountAggregateInputType | true;
};
export interface FoodiePointsDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['FoodiePoints'];
        meta: {
            name: 'FoodiePoints';
        };
    };
    /**
     * Find zero or one FoodiePoints that matches the filter.
     * @param {FoodiePointsFindUniqueArgs} args - Arguments to find a FoodiePoints
     * @example
     * // Get one FoodiePoints
     * const foodiePoints = await prisma.foodiePoints.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoodiePointsFindUniqueArgs>(args: Prisma.SelectSubset<T, FoodiePointsFindUniqueArgs<ExtArgs>>): Prisma.Prisma__FoodiePointsClient<runtime.Types.Result.GetResult<Prisma.$FoodiePointsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one FoodiePoints that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FoodiePointsFindUniqueOrThrowArgs} args - Arguments to find a FoodiePoints
     * @example
     * // Get one FoodiePoints
     * const foodiePoints = await prisma.foodiePoints.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoodiePointsFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, FoodiePointsFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__FoodiePointsClient<runtime.Types.Result.GetResult<Prisma.$FoodiePointsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FoodiePoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodiePointsFindFirstArgs} args - Arguments to find a FoodiePoints
     * @example
     * // Get one FoodiePoints
     * const foodiePoints = await prisma.foodiePoints.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoodiePointsFindFirstArgs>(args?: Prisma.SelectSubset<T, FoodiePointsFindFirstArgs<ExtArgs>>): Prisma.Prisma__FoodiePointsClient<runtime.Types.Result.GetResult<Prisma.$FoodiePointsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first FoodiePoints that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodiePointsFindFirstOrThrowArgs} args - Arguments to find a FoodiePoints
     * @example
     * // Get one FoodiePoints
     * const foodiePoints = await prisma.foodiePoints.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoodiePointsFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, FoodiePointsFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__FoodiePointsClient<runtime.Types.Result.GetResult<Prisma.$FoodiePointsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more FoodiePoints that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodiePointsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FoodiePoints
     * const foodiePoints = await prisma.foodiePoints.findMany()
     *
     * // Get first 10 FoodiePoints
     * const foodiePoints = await prisma.foodiePoints.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const foodiePointsWithIdOnly = await prisma.foodiePoints.findMany({ select: { id: true } })
     *
     */
    findMany<T extends FoodiePointsFindManyArgs>(args?: Prisma.SelectSubset<T, FoodiePointsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FoodiePointsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a FoodiePoints.
     * @param {FoodiePointsCreateArgs} args - Arguments to create a FoodiePoints.
     * @example
     * // Create one FoodiePoints
     * const FoodiePoints = await prisma.foodiePoints.create({
     *   data: {
     *     // ... data to create a FoodiePoints
     *   }
     * })
     *
     */
    create<T extends FoodiePointsCreateArgs>(args: Prisma.SelectSubset<T, FoodiePointsCreateArgs<ExtArgs>>): Prisma.Prisma__FoodiePointsClient<runtime.Types.Result.GetResult<Prisma.$FoodiePointsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many FoodiePoints.
     * @param {FoodiePointsCreateManyArgs} args - Arguments to create many FoodiePoints.
     * @example
     * // Create many FoodiePoints
     * const foodiePoints = await prisma.foodiePoints.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends FoodiePointsCreateManyArgs>(args?: Prisma.SelectSubset<T, FoodiePointsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many FoodiePoints and returns the data saved in the database.
     * @param {FoodiePointsCreateManyAndReturnArgs} args - Arguments to create many FoodiePoints.
     * @example
     * // Create many FoodiePoints
     * const foodiePoints = await prisma.foodiePoints.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many FoodiePoints and only return the `id`
     * const foodiePointsWithIdOnly = await prisma.foodiePoints.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends FoodiePointsCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, FoodiePointsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FoodiePointsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a FoodiePoints.
     * @param {FoodiePointsDeleteArgs} args - Arguments to delete one FoodiePoints.
     * @example
     * // Delete one FoodiePoints
     * const FoodiePoints = await prisma.foodiePoints.delete({
     *   where: {
     *     // ... filter to delete one FoodiePoints
     *   }
     * })
     *
     */
    delete<T extends FoodiePointsDeleteArgs>(args: Prisma.SelectSubset<T, FoodiePointsDeleteArgs<ExtArgs>>): Prisma.Prisma__FoodiePointsClient<runtime.Types.Result.GetResult<Prisma.$FoodiePointsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one FoodiePoints.
     * @param {FoodiePointsUpdateArgs} args - Arguments to update one FoodiePoints.
     * @example
     * // Update one FoodiePoints
     * const foodiePoints = await prisma.foodiePoints.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends FoodiePointsUpdateArgs>(args: Prisma.SelectSubset<T, FoodiePointsUpdateArgs<ExtArgs>>): Prisma.Prisma__FoodiePointsClient<runtime.Types.Result.GetResult<Prisma.$FoodiePointsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more FoodiePoints.
     * @param {FoodiePointsDeleteManyArgs} args - Arguments to filter FoodiePoints to delete.
     * @example
     * // Delete a few FoodiePoints
     * const { count } = await prisma.foodiePoints.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends FoodiePointsDeleteManyArgs>(args?: Prisma.SelectSubset<T, FoodiePointsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FoodiePoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodiePointsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FoodiePoints
     * const foodiePoints = await prisma.foodiePoints.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends FoodiePointsUpdateManyArgs>(args: Prisma.SelectSubset<T, FoodiePointsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more FoodiePoints and returns the data updated in the database.
     * @param {FoodiePointsUpdateManyAndReturnArgs} args - Arguments to update many FoodiePoints.
     * @example
     * // Update many FoodiePoints
     * const foodiePoints = await prisma.foodiePoints.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more FoodiePoints and only return the `id`
     * const foodiePointsWithIdOnly = await prisma.foodiePoints.updateManyAndReturn({
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
    updateManyAndReturn<T extends FoodiePointsUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, FoodiePointsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$FoodiePointsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one FoodiePoints.
     * @param {FoodiePointsUpsertArgs} args - Arguments to update or create a FoodiePoints.
     * @example
     * // Update or create a FoodiePoints
     * const foodiePoints = await prisma.foodiePoints.upsert({
     *   create: {
     *     // ... data to create a FoodiePoints
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FoodiePoints we want to update
     *   }
     * })
     */
    upsert<T extends FoodiePointsUpsertArgs>(args: Prisma.SelectSubset<T, FoodiePointsUpsertArgs<ExtArgs>>): Prisma.Prisma__FoodiePointsClient<runtime.Types.Result.GetResult<Prisma.$FoodiePointsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of FoodiePoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodiePointsCountArgs} args - Arguments to filter FoodiePoints to count.
     * @example
     * // Count the number of FoodiePoints
     * const count = await prisma.foodiePoints.count({
     *   where: {
     *     // ... the filter for the FoodiePoints we want to count
     *   }
     * })
    **/
    count<T extends FoodiePointsCountArgs>(args?: Prisma.Subset<T, FoodiePointsCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], FoodiePointsCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a FoodiePoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodiePointsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FoodiePointsAggregateArgs>(args: Prisma.Subset<T, FoodiePointsAggregateArgs>): Prisma.PrismaPromise<GetFoodiePointsAggregateType<T>>;
    /**
     * Group by FoodiePoints.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodiePointsGroupByArgs} args - Group by arguments.
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
    groupBy<T extends FoodiePointsGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: FoodiePointsGroupByArgs['orderBy'];
    } : {
        orderBy?: FoodiePointsGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, FoodiePointsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoodiePointsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the FoodiePoints model
     */
    readonly fields: FoodiePointsFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for FoodiePoints.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__FoodiePointsClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the FoodiePoints model
 */
export interface FoodiePointsFieldRefs {
    readonly id: Prisma.FieldRef<"FoodiePoints", 'String'>;
    readonly userId: Prisma.FieldRef<"FoodiePoints", 'String'>;
    readonly balance: Prisma.FieldRef<"FoodiePoints", 'Int'>;
    readonly totalEarned: Prisma.FieldRef<"FoodiePoints", 'Int'>;
    readonly totalRedeemed: Prisma.FieldRef<"FoodiePoints", 'Int'>;
    readonly lastActivity: Prisma.FieldRef<"FoodiePoints", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"FoodiePoints", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"FoodiePoints", 'DateTime'>;
}
/**
 * FoodiePoints findUnique
 */
export type FoodiePointsFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which FoodiePoints to fetch.
     */
    where: Prisma.FoodiePointsWhereUniqueInput;
};
/**
 * FoodiePoints findUniqueOrThrow
 */
export type FoodiePointsFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which FoodiePoints to fetch.
     */
    where: Prisma.FoodiePointsWhereUniqueInput;
};
/**
 * FoodiePoints findFirst
 */
export type FoodiePointsFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which FoodiePoints to fetch.
     */
    where?: Prisma.FoodiePointsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FoodiePoints to fetch.
     */
    orderBy?: Prisma.FoodiePointsOrderByWithRelationInput | Prisma.FoodiePointsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FoodiePoints.
     */
    cursor?: Prisma.FoodiePointsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FoodiePoints from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FoodiePoints.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FoodiePoints.
     */
    distinct?: Prisma.FoodiePointsScalarFieldEnum | Prisma.FoodiePointsScalarFieldEnum[];
};
/**
 * FoodiePoints findFirstOrThrow
 */
export type FoodiePointsFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which FoodiePoints to fetch.
     */
    where?: Prisma.FoodiePointsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FoodiePoints to fetch.
     */
    orderBy?: Prisma.FoodiePointsOrderByWithRelationInput | Prisma.FoodiePointsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for FoodiePoints.
     */
    cursor?: Prisma.FoodiePointsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FoodiePoints from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FoodiePoints.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of FoodiePoints.
     */
    distinct?: Prisma.FoodiePointsScalarFieldEnum | Prisma.FoodiePointsScalarFieldEnum[];
};
/**
 * FoodiePoints findMany
 */
export type FoodiePointsFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which FoodiePoints to fetch.
     */
    where?: Prisma.FoodiePointsWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of FoodiePoints to fetch.
     */
    orderBy?: Prisma.FoodiePointsOrderByWithRelationInput | Prisma.FoodiePointsOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing FoodiePoints.
     */
    cursor?: Prisma.FoodiePointsWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` FoodiePoints from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` FoodiePoints.
     */
    skip?: number;
    distinct?: Prisma.FoodiePointsScalarFieldEnum | Prisma.FoodiePointsScalarFieldEnum[];
};
/**
 * FoodiePoints create
 */
export type FoodiePointsCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a FoodiePoints.
     */
    data: Prisma.XOR<Prisma.FoodiePointsCreateInput, Prisma.FoodiePointsUncheckedCreateInput>;
};
/**
 * FoodiePoints createMany
 */
export type FoodiePointsCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many FoodiePoints.
     */
    data: Prisma.FoodiePointsCreateManyInput | Prisma.FoodiePointsCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * FoodiePoints createManyAndReturn
 */
export type FoodiePointsCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodiePoints
     */
    select?: Prisma.FoodiePointsSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodiePoints
     */
    omit?: Prisma.FoodiePointsOmit<ExtArgs> | null;
    /**
     * The data used to create many FoodiePoints.
     */
    data: Prisma.FoodiePointsCreateManyInput | Prisma.FoodiePointsCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodiePointsIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * FoodiePoints update
 */
export type FoodiePointsUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a FoodiePoints.
     */
    data: Prisma.XOR<Prisma.FoodiePointsUpdateInput, Prisma.FoodiePointsUncheckedUpdateInput>;
    /**
     * Choose, which FoodiePoints to update.
     */
    where: Prisma.FoodiePointsWhereUniqueInput;
};
/**
 * FoodiePoints updateMany
 */
export type FoodiePointsUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update FoodiePoints.
     */
    data: Prisma.XOR<Prisma.FoodiePointsUpdateManyMutationInput, Prisma.FoodiePointsUncheckedUpdateManyInput>;
    /**
     * Filter which FoodiePoints to update
     */
    where?: Prisma.FoodiePointsWhereInput;
    /**
     * Limit how many FoodiePoints to update.
     */
    limit?: number;
};
/**
 * FoodiePoints updateManyAndReturn
 */
export type FoodiePointsUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodiePoints
     */
    select?: Prisma.FoodiePointsSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the FoodiePoints
     */
    omit?: Prisma.FoodiePointsOmit<ExtArgs> | null;
    /**
     * The data used to update FoodiePoints.
     */
    data: Prisma.XOR<Prisma.FoodiePointsUpdateManyMutationInput, Prisma.FoodiePointsUncheckedUpdateManyInput>;
    /**
     * Filter which FoodiePoints to update
     */
    where?: Prisma.FoodiePointsWhereInput;
    /**
     * Limit how many FoodiePoints to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.FoodiePointsIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * FoodiePoints upsert
 */
export type FoodiePointsUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the FoodiePoints to update in case it exists.
     */
    where: Prisma.FoodiePointsWhereUniqueInput;
    /**
     * In case the FoodiePoints found by the `where` argument doesn't exist, create a new FoodiePoints with this data.
     */
    create: Prisma.XOR<Prisma.FoodiePointsCreateInput, Prisma.FoodiePointsUncheckedCreateInput>;
    /**
     * In case the FoodiePoints was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.FoodiePointsUpdateInput, Prisma.FoodiePointsUncheckedUpdateInput>;
};
/**
 * FoodiePoints delete
 */
export type FoodiePointsDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which FoodiePoints to delete.
     */
    where: Prisma.FoodiePointsWhereUniqueInput;
};
/**
 * FoodiePoints deleteMany
 */
export type FoodiePointsDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which FoodiePoints to delete
     */
    where?: Prisma.FoodiePointsWhereInput;
    /**
     * Limit how many FoodiePoints to delete.
     */
    limit?: number;
};
/**
 * FoodiePoints without action
 */
export type FoodiePointsDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=FoodiePoints.d.ts.map