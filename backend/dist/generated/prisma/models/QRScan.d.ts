import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model QRScan
 *
 */
export type QRScanModel = runtime.Types.Result.DefaultSelection<Prisma.$QRScanPayload>;
export type AggregateQRScan = {
    _count: QRScanCountAggregateOutputType | null;
    _avg: QRScanAvgAggregateOutputType | null;
    _sum: QRScanSumAggregateOutputType | null;
    _min: QRScanMinAggregateOutputType | null;
    _max: QRScanMaxAggregateOutputType | null;
};
export type QRScanAvgAggregateOutputType = {
    amount: number | null;
    pointsAwarded: number | null;
};
export type QRScanSumAggregateOutputType = {
    amount: number | null;
    pointsAwarded: number | null;
};
export type QRScanMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    transactionId: string | null;
    amount: number | null;
    pointsAwarded: number | null;
    scannedAt: Date | null;
};
export type QRScanMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    restaurantId: string | null;
    transactionId: string | null;
    amount: number | null;
    pointsAwarded: number | null;
    scannedAt: Date | null;
};
export type QRScanCountAggregateOutputType = {
    id: number;
    userId: number;
    restaurantId: number;
    transactionId: number;
    amount: number;
    pointsAwarded: number;
    scannedAt: number;
    _all: number;
};
export type QRScanAvgAggregateInputType = {
    amount?: true;
    pointsAwarded?: true;
};
export type QRScanSumAggregateInputType = {
    amount?: true;
    pointsAwarded?: true;
};
export type QRScanMinAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    transactionId?: true;
    amount?: true;
    pointsAwarded?: true;
    scannedAt?: true;
};
export type QRScanMaxAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    transactionId?: true;
    amount?: true;
    pointsAwarded?: true;
    scannedAt?: true;
};
export type QRScanCountAggregateInputType = {
    id?: true;
    userId?: true;
    restaurantId?: true;
    transactionId?: true;
    amount?: true;
    pointsAwarded?: true;
    scannedAt?: true;
    _all?: true;
};
export type QRScanAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which QRScan to aggregate.
     */
    where?: Prisma.QRScanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of QRScans to fetch.
     */
    orderBy?: Prisma.QRScanOrderByWithRelationInput | Prisma.QRScanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.QRScanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` QRScans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` QRScans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned QRScans
    **/
    _count?: true | QRScanCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: QRScanAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: QRScanSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: QRScanMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: QRScanMaxAggregateInputType;
};
export type GetQRScanAggregateType<T extends QRScanAggregateArgs> = {
    [P in keyof T & keyof AggregateQRScan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateQRScan[P]> : Prisma.GetScalarType<T[P], AggregateQRScan[P]>;
};
export type QRScanGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.QRScanWhereInput;
    orderBy?: Prisma.QRScanOrderByWithAggregationInput | Prisma.QRScanOrderByWithAggregationInput[];
    by: Prisma.QRScanScalarFieldEnum[] | Prisma.QRScanScalarFieldEnum;
    having?: Prisma.QRScanScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: QRScanCountAggregateInputType | true;
    _avg?: QRScanAvgAggregateInputType;
    _sum?: QRScanSumAggregateInputType;
    _min?: QRScanMinAggregateInputType;
    _max?: QRScanMaxAggregateInputType;
};
export type QRScanGroupByOutputType = {
    id: string;
    userId: string;
    restaurantId: string;
    transactionId: string;
    amount: number;
    pointsAwarded: number;
    scannedAt: Date;
    _count: QRScanCountAggregateOutputType | null;
    _avg: QRScanAvgAggregateOutputType | null;
    _sum: QRScanSumAggregateOutputType | null;
    _min: QRScanMinAggregateOutputType | null;
    _max: QRScanMaxAggregateOutputType | null;
};
type GetQRScanGroupByPayload<T extends QRScanGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<QRScanGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof QRScanGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], QRScanGroupByOutputType[P]> : Prisma.GetScalarType<T[P], QRScanGroupByOutputType[P]>;
}>>;
export type QRScanWhereInput = {
    AND?: Prisma.QRScanWhereInput | Prisma.QRScanWhereInput[];
    OR?: Prisma.QRScanWhereInput[];
    NOT?: Prisma.QRScanWhereInput | Prisma.QRScanWhereInput[];
    id?: Prisma.StringFilter<"QRScan"> | string;
    userId?: Prisma.StringFilter<"QRScan"> | string;
    restaurantId?: Prisma.StringFilter<"QRScan"> | string;
    transactionId?: Prisma.StringFilter<"QRScan"> | string;
    amount?: Prisma.FloatFilter<"QRScan"> | number;
    pointsAwarded?: Prisma.IntFilter<"QRScan"> | number;
    scannedAt?: Prisma.DateTimeFilter<"QRScan"> | Date | string;
};
export type QRScanOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    pointsAwarded?: Prisma.SortOrder;
    scannedAt?: Prisma.SortOrder;
};
export type QRScanWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    transactionId?: string;
    AND?: Prisma.QRScanWhereInput | Prisma.QRScanWhereInput[];
    OR?: Prisma.QRScanWhereInput[];
    NOT?: Prisma.QRScanWhereInput | Prisma.QRScanWhereInput[];
    userId?: Prisma.StringFilter<"QRScan"> | string;
    restaurantId?: Prisma.StringFilter<"QRScan"> | string;
    amount?: Prisma.FloatFilter<"QRScan"> | number;
    pointsAwarded?: Prisma.IntFilter<"QRScan"> | number;
    scannedAt?: Prisma.DateTimeFilter<"QRScan"> | Date | string;
}, "id" | "transactionId">;
export type QRScanOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    pointsAwarded?: Prisma.SortOrder;
    scannedAt?: Prisma.SortOrder;
    _count?: Prisma.QRScanCountOrderByAggregateInput;
    _avg?: Prisma.QRScanAvgOrderByAggregateInput;
    _max?: Prisma.QRScanMaxOrderByAggregateInput;
    _min?: Prisma.QRScanMinOrderByAggregateInput;
    _sum?: Prisma.QRScanSumOrderByAggregateInput;
};
export type QRScanScalarWhereWithAggregatesInput = {
    AND?: Prisma.QRScanScalarWhereWithAggregatesInput | Prisma.QRScanScalarWhereWithAggregatesInput[];
    OR?: Prisma.QRScanScalarWhereWithAggregatesInput[];
    NOT?: Prisma.QRScanScalarWhereWithAggregatesInput | Prisma.QRScanScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"QRScan"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"QRScan"> | string;
    restaurantId?: Prisma.StringWithAggregatesFilter<"QRScan"> | string;
    transactionId?: Prisma.StringWithAggregatesFilter<"QRScan"> | string;
    amount?: Prisma.FloatWithAggregatesFilter<"QRScan"> | number;
    pointsAwarded?: Prisma.IntWithAggregatesFilter<"QRScan"> | number;
    scannedAt?: Prisma.DateTimeWithAggregatesFilter<"QRScan"> | Date | string;
};
export type QRScanCreateInput = {
    id?: string;
    userId: string;
    restaurantId: string;
    transactionId: string;
    amount: number;
    pointsAwarded: number;
    scannedAt?: Date | string;
};
export type QRScanUncheckedCreateInput = {
    id?: string;
    userId: string;
    restaurantId: string;
    transactionId: string;
    amount: number;
    pointsAwarded: number;
    scannedAt?: Date | string;
};
export type QRScanUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QRScanUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QRScanCreateManyInput = {
    id?: string;
    userId: string;
    restaurantId: string;
    transactionId: string;
    amount: number;
    pointsAwarded: number;
    scannedAt?: Date | string;
};
export type QRScanUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QRScanUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    restaurantId?: Prisma.StringFieldUpdateOperationsInput | string;
    transactionId?: Prisma.StringFieldUpdateOperationsInput | string;
    amount?: Prisma.FloatFieldUpdateOperationsInput | number;
    pointsAwarded?: Prisma.IntFieldUpdateOperationsInput | number;
    scannedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type QRScanCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    pointsAwarded?: Prisma.SortOrder;
    scannedAt?: Prisma.SortOrder;
};
export type QRScanAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    pointsAwarded?: Prisma.SortOrder;
};
export type QRScanMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    pointsAwarded?: Prisma.SortOrder;
    scannedAt?: Prisma.SortOrder;
};
export type QRScanMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    restaurantId?: Prisma.SortOrder;
    transactionId?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    pointsAwarded?: Prisma.SortOrder;
    scannedAt?: Prisma.SortOrder;
};
export type QRScanSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
    pointsAwarded?: Prisma.SortOrder;
};
export type QRScanSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    transactionId?: boolean;
    amount?: boolean;
    pointsAwarded?: boolean;
    scannedAt?: boolean;
}, ExtArgs["result"]["qRScan"]>;
export type QRScanSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    transactionId?: boolean;
    amount?: boolean;
    pointsAwarded?: boolean;
    scannedAt?: boolean;
}, ExtArgs["result"]["qRScan"]>;
export type QRScanSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    transactionId?: boolean;
    amount?: boolean;
    pointsAwarded?: boolean;
    scannedAt?: boolean;
}, ExtArgs["result"]["qRScan"]>;
export type QRScanSelectScalar = {
    id?: boolean;
    userId?: boolean;
    restaurantId?: boolean;
    transactionId?: boolean;
    amount?: boolean;
    pointsAwarded?: boolean;
    scannedAt?: boolean;
};
export type QRScanOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "restaurantId" | "transactionId" | "amount" | "pointsAwarded" | "scannedAt", ExtArgs["result"]["qRScan"]>;
export type $QRScanPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "QRScan";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        restaurantId: string;
        transactionId: string;
        amount: number;
        pointsAwarded: number;
        scannedAt: Date;
    }, ExtArgs["result"]["qRScan"]>;
    composites: {};
};
export type QRScanGetPayload<S extends boolean | null | undefined | QRScanDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$QRScanPayload, S>;
export type QRScanCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<QRScanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: QRScanCountAggregateInputType | true;
};
export interface QRScanDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['QRScan'];
        meta: {
            name: 'QRScan';
        };
    };
    /**
     * Find zero or one QRScan that matches the filter.
     * @param {QRScanFindUniqueArgs} args - Arguments to find a QRScan
     * @example
     * // Get one QRScan
     * const qRScan = await prisma.qRScan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QRScanFindUniqueArgs>(args: Prisma.SelectSubset<T, QRScanFindUniqueArgs<ExtArgs>>): Prisma.Prisma__QRScanClient<runtime.Types.Result.GetResult<Prisma.$QRScanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one QRScan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QRScanFindUniqueOrThrowArgs} args - Arguments to find a QRScan
     * @example
     * // Get one QRScan
     * const qRScan = await prisma.qRScan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QRScanFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, QRScanFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__QRScanClient<runtime.Types.Result.GetResult<Prisma.$QRScanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first QRScan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRScanFindFirstArgs} args - Arguments to find a QRScan
     * @example
     * // Get one QRScan
     * const qRScan = await prisma.qRScan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QRScanFindFirstArgs>(args?: Prisma.SelectSubset<T, QRScanFindFirstArgs<ExtArgs>>): Prisma.Prisma__QRScanClient<runtime.Types.Result.GetResult<Prisma.$QRScanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first QRScan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRScanFindFirstOrThrowArgs} args - Arguments to find a QRScan
     * @example
     * // Get one QRScan
     * const qRScan = await prisma.qRScan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QRScanFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, QRScanFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__QRScanClient<runtime.Types.Result.GetResult<Prisma.$QRScanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more QRScans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRScanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QRScans
     * const qRScans = await prisma.qRScan.findMany()
     *
     * // Get first 10 QRScans
     * const qRScans = await prisma.qRScan.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const qRScanWithIdOnly = await prisma.qRScan.findMany({ select: { id: true } })
     *
     */
    findMany<T extends QRScanFindManyArgs>(args?: Prisma.SelectSubset<T, QRScanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QRScanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a QRScan.
     * @param {QRScanCreateArgs} args - Arguments to create a QRScan.
     * @example
     * // Create one QRScan
     * const QRScan = await prisma.qRScan.create({
     *   data: {
     *     // ... data to create a QRScan
     *   }
     * })
     *
     */
    create<T extends QRScanCreateArgs>(args: Prisma.SelectSubset<T, QRScanCreateArgs<ExtArgs>>): Prisma.Prisma__QRScanClient<runtime.Types.Result.GetResult<Prisma.$QRScanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many QRScans.
     * @param {QRScanCreateManyArgs} args - Arguments to create many QRScans.
     * @example
     * // Create many QRScans
     * const qRScan = await prisma.qRScan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends QRScanCreateManyArgs>(args?: Prisma.SelectSubset<T, QRScanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many QRScans and returns the data saved in the database.
     * @param {QRScanCreateManyAndReturnArgs} args - Arguments to create many QRScans.
     * @example
     * // Create many QRScans
     * const qRScan = await prisma.qRScan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many QRScans and only return the `id`
     * const qRScanWithIdOnly = await prisma.qRScan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends QRScanCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, QRScanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QRScanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a QRScan.
     * @param {QRScanDeleteArgs} args - Arguments to delete one QRScan.
     * @example
     * // Delete one QRScan
     * const QRScan = await prisma.qRScan.delete({
     *   where: {
     *     // ... filter to delete one QRScan
     *   }
     * })
     *
     */
    delete<T extends QRScanDeleteArgs>(args: Prisma.SelectSubset<T, QRScanDeleteArgs<ExtArgs>>): Prisma.Prisma__QRScanClient<runtime.Types.Result.GetResult<Prisma.$QRScanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one QRScan.
     * @param {QRScanUpdateArgs} args - Arguments to update one QRScan.
     * @example
     * // Update one QRScan
     * const qRScan = await prisma.qRScan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends QRScanUpdateArgs>(args: Prisma.SelectSubset<T, QRScanUpdateArgs<ExtArgs>>): Prisma.Prisma__QRScanClient<runtime.Types.Result.GetResult<Prisma.$QRScanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more QRScans.
     * @param {QRScanDeleteManyArgs} args - Arguments to filter QRScans to delete.
     * @example
     * // Delete a few QRScans
     * const { count } = await prisma.qRScan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends QRScanDeleteManyArgs>(args?: Prisma.SelectSubset<T, QRScanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more QRScans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRScanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QRScans
     * const qRScan = await prisma.qRScan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends QRScanUpdateManyArgs>(args: Prisma.SelectSubset<T, QRScanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more QRScans and returns the data updated in the database.
     * @param {QRScanUpdateManyAndReturnArgs} args - Arguments to update many QRScans.
     * @example
     * // Update many QRScans
     * const qRScan = await prisma.qRScan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more QRScans and only return the `id`
     * const qRScanWithIdOnly = await prisma.qRScan.updateManyAndReturn({
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
    updateManyAndReturn<T extends QRScanUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, QRScanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$QRScanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one QRScan.
     * @param {QRScanUpsertArgs} args - Arguments to update or create a QRScan.
     * @example
     * // Update or create a QRScan
     * const qRScan = await prisma.qRScan.upsert({
     *   create: {
     *     // ... data to create a QRScan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QRScan we want to update
     *   }
     * })
     */
    upsert<T extends QRScanUpsertArgs>(args: Prisma.SelectSubset<T, QRScanUpsertArgs<ExtArgs>>): Prisma.Prisma__QRScanClient<runtime.Types.Result.GetResult<Prisma.$QRScanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of QRScans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRScanCountArgs} args - Arguments to filter QRScans to count.
     * @example
     * // Count the number of QRScans
     * const count = await prisma.qRScan.count({
     *   where: {
     *     // ... the filter for the QRScans we want to count
     *   }
     * })
    **/
    count<T extends QRScanCountArgs>(args?: Prisma.Subset<T, QRScanCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], QRScanCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a QRScan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRScanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends QRScanAggregateArgs>(args: Prisma.Subset<T, QRScanAggregateArgs>): Prisma.PrismaPromise<GetQRScanAggregateType<T>>;
    /**
     * Group by QRScan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QRScanGroupByArgs} args - Group by arguments.
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
    groupBy<T extends QRScanGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: QRScanGroupByArgs['orderBy'];
    } : {
        orderBy?: QRScanGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, QRScanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQRScanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the QRScan model
     */
    readonly fields: QRScanFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for QRScan.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__QRScanClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
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
 * Fields of the QRScan model
 */
export interface QRScanFieldRefs {
    readonly id: Prisma.FieldRef<"QRScan", 'String'>;
    readonly userId: Prisma.FieldRef<"QRScan", 'String'>;
    readonly restaurantId: Prisma.FieldRef<"QRScan", 'String'>;
    readonly transactionId: Prisma.FieldRef<"QRScan", 'String'>;
    readonly amount: Prisma.FieldRef<"QRScan", 'Float'>;
    readonly pointsAwarded: Prisma.FieldRef<"QRScan", 'Int'>;
    readonly scannedAt: Prisma.FieldRef<"QRScan", 'DateTime'>;
}
/**
 * QRScan findUnique
 */
export type QRScanFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRScan
     */
    select?: Prisma.QRScanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the QRScan
     */
    omit?: Prisma.QRScanOmit<ExtArgs> | null;
    /**
     * Filter, which QRScan to fetch.
     */
    where: Prisma.QRScanWhereUniqueInput;
};
/**
 * QRScan findUniqueOrThrow
 */
export type QRScanFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRScan
     */
    select?: Prisma.QRScanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the QRScan
     */
    omit?: Prisma.QRScanOmit<ExtArgs> | null;
    /**
     * Filter, which QRScan to fetch.
     */
    where: Prisma.QRScanWhereUniqueInput;
};
/**
 * QRScan findFirst
 */
export type QRScanFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRScan
     */
    select?: Prisma.QRScanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the QRScan
     */
    omit?: Prisma.QRScanOmit<ExtArgs> | null;
    /**
     * Filter, which QRScan to fetch.
     */
    where?: Prisma.QRScanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of QRScans to fetch.
     */
    orderBy?: Prisma.QRScanOrderByWithRelationInput | Prisma.QRScanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for QRScans.
     */
    cursor?: Prisma.QRScanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` QRScans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` QRScans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of QRScans.
     */
    distinct?: Prisma.QRScanScalarFieldEnum | Prisma.QRScanScalarFieldEnum[];
};
/**
 * QRScan findFirstOrThrow
 */
export type QRScanFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRScan
     */
    select?: Prisma.QRScanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the QRScan
     */
    omit?: Prisma.QRScanOmit<ExtArgs> | null;
    /**
     * Filter, which QRScan to fetch.
     */
    where?: Prisma.QRScanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of QRScans to fetch.
     */
    orderBy?: Prisma.QRScanOrderByWithRelationInput | Prisma.QRScanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for QRScans.
     */
    cursor?: Prisma.QRScanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` QRScans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` QRScans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of QRScans.
     */
    distinct?: Prisma.QRScanScalarFieldEnum | Prisma.QRScanScalarFieldEnum[];
};
/**
 * QRScan findMany
 */
export type QRScanFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRScan
     */
    select?: Prisma.QRScanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the QRScan
     */
    omit?: Prisma.QRScanOmit<ExtArgs> | null;
    /**
     * Filter, which QRScans to fetch.
     */
    where?: Prisma.QRScanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of QRScans to fetch.
     */
    orderBy?: Prisma.QRScanOrderByWithRelationInput | Prisma.QRScanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing QRScans.
     */
    cursor?: Prisma.QRScanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` QRScans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` QRScans.
     */
    skip?: number;
    distinct?: Prisma.QRScanScalarFieldEnum | Prisma.QRScanScalarFieldEnum[];
};
/**
 * QRScan create
 */
export type QRScanCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRScan
     */
    select?: Prisma.QRScanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the QRScan
     */
    omit?: Prisma.QRScanOmit<ExtArgs> | null;
    /**
     * The data needed to create a QRScan.
     */
    data: Prisma.XOR<Prisma.QRScanCreateInput, Prisma.QRScanUncheckedCreateInput>;
};
/**
 * QRScan createMany
 */
export type QRScanCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many QRScans.
     */
    data: Prisma.QRScanCreateManyInput | Prisma.QRScanCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * QRScan createManyAndReturn
 */
export type QRScanCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRScan
     */
    select?: Prisma.QRScanSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the QRScan
     */
    omit?: Prisma.QRScanOmit<ExtArgs> | null;
    /**
     * The data used to create many QRScans.
     */
    data: Prisma.QRScanCreateManyInput | Prisma.QRScanCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * QRScan update
 */
export type QRScanUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRScan
     */
    select?: Prisma.QRScanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the QRScan
     */
    omit?: Prisma.QRScanOmit<ExtArgs> | null;
    /**
     * The data needed to update a QRScan.
     */
    data: Prisma.XOR<Prisma.QRScanUpdateInput, Prisma.QRScanUncheckedUpdateInput>;
    /**
     * Choose, which QRScan to update.
     */
    where: Prisma.QRScanWhereUniqueInput;
};
/**
 * QRScan updateMany
 */
export type QRScanUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update QRScans.
     */
    data: Prisma.XOR<Prisma.QRScanUpdateManyMutationInput, Prisma.QRScanUncheckedUpdateManyInput>;
    /**
     * Filter which QRScans to update
     */
    where?: Prisma.QRScanWhereInput;
    /**
     * Limit how many QRScans to update.
     */
    limit?: number;
};
/**
 * QRScan updateManyAndReturn
 */
export type QRScanUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRScan
     */
    select?: Prisma.QRScanSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the QRScan
     */
    omit?: Prisma.QRScanOmit<ExtArgs> | null;
    /**
     * The data used to update QRScans.
     */
    data: Prisma.XOR<Prisma.QRScanUpdateManyMutationInput, Prisma.QRScanUncheckedUpdateManyInput>;
    /**
     * Filter which QRScans to update
     */
    where?: Prisma.QRScanWhereInput;
    /**
     * Limit how many QRScans to update.
     */
    limit?: number;
};
/**
 * QRScan upsert
 */
export type QRScanUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRScan
     */
    select?: Prisma.QRScanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the QRScan
     */
    omit?: Prisma.QRScanOmit<ExtArgs> | null;
    /**
     * The filter to search for the QRScan to update in case it exists.
     */
    where: Prisma.QRScanWhereUniqueInput;
    /**
     * In case the QRScan found by the `where` argument doesn't exist, create a new QRScan with this data.
     */
    create: Prisma.XOR<Prisma.QRScanCreateInput, Prisma.QRScanUncheckedCreateInput>;
    /**
     * In case the QRScan was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.QRScanUpdateInput, Prisma.QRScanUncheckedUpdateInput>;
};
/**
 * QRScan delete
 */
export type QRScanDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRScan
     */
    select?: Prisma.QRScanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the QRScan
     */
    omit?: Prisma.QRScanOmit<ExtArgs> | null;
    /**
     * Filter which QRScan to delete.
     */
    where: Prisma.QRScanWhereUniqueInput;
};
/**
 * QRScan deleteMany
 */
export type QRScanDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which QRScans to delete
     */
    where?: Prisma.QRScanWhereInput;
    /**
     * Limit how many QRScans to delete.
     */
    limit?: number;
};
/**
 * QRScan without action
 */
export type QRScanDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QRScan
     */
    select?: Prisma.QRScanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the QRScan
     */
    omit?: Prisma.QRScanOmit<ExtArgs> | null;
};
export {};
//# sourceMappingURL=QRScan.d.ts.map