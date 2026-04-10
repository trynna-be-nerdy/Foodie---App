import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Charity
 *
 */
export type CharityModel = runtime.Types.Result.DefaultSelection<Prisma.$CharityPayload>;
export type AggregateCharity = {
    _count: CharityCountAggregateOutputType | null;
    _avg: CharityAvgAggregateOutputType | null;
    _sum: CharitySumAggregateOutputType | null;
    _min: CharityMinAggregateOutputType | null;
    _max: CharityMaxAggregateOutputType | null;
};
export type CharityAvgAggregateOutputType = {
    totalDonations: number | null;
};
export type CharitySumAggregateOutputType = {
    totalDonations: number | null;
};
export type CharityMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    logoUrl: string | null;
    website: string | null;
    mission: string | null;
    totalDonations: number | null;
    isVerified: boolean | null;
    taxId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CharityMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    logoUrl: string | null;
    website: string | null;
    mission: string | null;
    totalDonations: number | null;
    isVerified: boolean | null;
    taxId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type CharityCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    logoUrl: number;
    website: number;
    mission: number;
    totalDonations: number;
    isVerified: number;
    taxId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type CharityAvgAggregateInputType = {
    totalDonations?: true;
};
export type CharitySumAggregateInputType = {
    totalDonations?: true;
};
export type CharityMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    logoUrl?: true;
    website?: true;
    mission?: true;
    totalDonations?: true;
    isVerified?: true;
    taxId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CharityMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    logoUrl?: true;
    website?: true;
    mission?: true;
    totalDonations?: true;
    isVerified?: true;
    taxId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type CharityCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    logoUrl?: true;
    website?: true;
    mission?: true;
    totalDonations?: true;
    isVerified?: true;
    taxId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type CharityAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Charity to aggregate.
     */
    where?: Prisma.CharityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Charities to fetch.
     */
    orderBy?: Prisma.CharityOrderByWithRelationInput | Prisma.CharityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.CharityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Charities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Charities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Charities
    **/
    _count?: true | CharityCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: CharityAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: CharitySumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: CharityMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: CharityMaxAggregateInputType;
};
export type GetCharityAggregateType<T extends CharityAggregateArgs> = {
    [P in keyof T & keyof AggregateCharity]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCharity[P]> : Prisma.GetScalarType<T[P], AggregateCharity[P]>;
};
export type CharityGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CharityWhereInput;
    orderBy?: Prisma.CharityOrderByWithAggregationInput | Prisma.CharityOrderByWithAggregationInput[];
    by: Prisma.CharityScalarFieldEnum[] | Prisma.CharityScalarFieldEnum;
    having?: Prisma.CharityScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CharityCountAggregateInputType | true;
    _avg?: CharityAvgAggregateInputType;
    _sum?: CharitySumAggregateInputType;
    _min?: CharityMinAggregateInputType;
    _max?: CharityMaxAggregateInputType;
};
export type CharityGroupByOutputType = {
    id: string;
    name: string;
    description: string;
    logoUrl: string | null;
    website: string | null;
    mission: string | null;
    totalDonations: number;
    isVerified: boolean;
    taxId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: CharityCountAggregateOutputType | null;
    _avg: CharityAvgAggregateOutputType | null;
    _sum: CharitySumAggregateOutputType | null;
    _min: CharityMinAggregateOutputType | null;
    _max: CharityMaxAggregateOutputType | null;
};
type GetCharityGroupByPayload<T extends CharityGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CharityGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CharityGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CharityGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CharityGroupByOutputType[P]>;
}>>;
export type CharityWhereInput = {
    AND?: Prisma.CharityWhereInput | Prisma.CharityWhereInput[];
    OR?: Prisma.CharityWhereInput[];
    NOT?: Prisma.CharityWhereInput | Prisma.CharityWhereInput[];
    id?: Prisma.StringFilter<"Charity"> | string;
    name?: Prisma.StringFilter<"Charity"> | string;
    description?: Prisma.StringFilter<"Charity"> | string;
    logoUrl?: Prisma.StringNullableFilter<"Charity"> | string | null;
    website?: Prisma.StringNullableFilter<"Charity"> | string | null;
    mission?: Prisma.StringNullableFilter<"Charity"> | string | null;
    totalDonations?: Prisma.FloatFilter<"Charity"> | number;
    isVerified?: Prisma.BoolFilter<"Charity"> | boolean;
    taxId?: Prisma.StringNullableFilter<"Charity"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Charity"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Charity"> | Date | string;
    donations?: Prisma.DonationListRelationFilter;
};
export type CharityOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    website?: Prisma.SortOrderInput | Prisma.SortOrder;
    mission?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalDonations?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    taxId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    donations?: Prisma.DonationOrderByRelationAggregateInput;
};
export type CharityWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CharityWhereInput | Prisma.CharityWhereInput[];
    OR?: Prisma.CharityWhereInput[];
    NOT?: Prisma.CharityWhereInput | Prisma.CharityWhereInput[];
    name?: Prisma.StringFilter<"Charity"> | string;
    description?: Prisma.StringFilter<"Charity"> | string;
    logoUrl?: Prisma.StringNullableFilter<"Charity"> | string | null;
    website?: Prisma.StringNullableFilter<"Charity"> | string | null;
    mission?: Prisma.StringNullableFilter<"Charity"> | string | null;
    totalDonations?: Prisma.FloatFilter<"Charity"> | number;
    isVerified?: Prisma.BoolFilter<"Charity"> | boolean;
    taxId?: Prisma.StringNullableFilter<"Charity"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Charity"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Charity"> | Date | string;
    donations?: Prisma.DonationListRelationFilter;
}, "id">;
export type CharityOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    website?: Prisma.SortOrderInput | Prisma.SortOrder;
    mission?: Prisma.SortOrderInput | Prisma.SortOrder;
    totalDonations?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    taxId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.CharityCountOrderByAggregateInput;
    _avg?: Prisma.CharityAvgOrderByAggregateInput;
    _max?: Prisma.CharityMaxOrderByAggregateInput;
    _min?: Prisma.CharityMinOrderByAggregateInput;
    _sum?: Prisma.CharitySumOrderByAggregateInput;
};
export type CharityScalarWhereWithAggregatesInput = {
    AND?: Prisma.CharityScalarWhereWithAggregatesInput | Prisma.CharityScalarWhereWithAggregatesInput[];
    OR?: Prisma.CharityScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CharityScalarWhereWithAggregatesInput | Prisma.CharityScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Charity"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Charity"> | string;
    description?: Prisma.StringWithAggregatesFilter<"Charity"> | string;
    logoUrl?: Prisma.StringNullableWithAggregatesFilter<"Charity"> | string | null;
    website?: Prisma.StringNullableWithAggregatesFilter<"Charity"> | string | null;
    mission?: Prisma.StringNullableWithAggregatesFilter<"Charity"> | string | null;
    totalDonations?: Prisma.FloatWithAggregatesFilter<"Charity"> | number;
    isVerified?: Prisma.BoolWithAggregatesFilter<"Charity"> | boolean;
    taxId?: Prisma.StringNullableWithAggregatesFilter<"Charity"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Charity"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Charity"> | Date | string;
};
export type CharityCreateInput = {
    id?: string;
    name: string;
    description: string;
    logoUrl?: string | null;
    website?: string | null;
    mission?: string | null;
    totalDonations?: number;
    isVerified?: boolean;
    taxId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    donations?: Prisma.DonationCreateNestedManyWithoutCharityInput;
};
export type CharityUncheckedCreateInput = {
    id?: string;
    name: string;
    description: string;
    logoUrl?: string | null;
    website?: string | null;
    mission?: string | null;
    totalDonations?: number;
    isVerified?: boolean;
    taxId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    donations?: Prisma.DonationUncheckedCreateNestedManyWithoutCharityInput;
};
export type CharityUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mission?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalDonations?: Prisma.FloatFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    taxId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    donations?: Prisma.DonationUpdateManyWithoutCharityNestedInput;
};
export type CharityUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mission?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalDonations?: Prisma.FloatFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    taxId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    donations?: Prisma.DonationUncheckedUpdateManyWithoutCharityNestedInput;
};
export type CharityCreateManyInput = {
    id?: string;
    name: string;
    description: string;
    logoUrl?: string | null;
    website?: string | null;
    mission?: string | null;
    totalDonations?: number;
    isVerified?: boolean;
    taxId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CharityUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mission?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalDonations?: Prisma.FloatFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    taxId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CharityUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mission?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalDonations?: Prisma.FloatFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    taxId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CharityCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    website?: Prisma.SortOrder;
    mission?: Prisma.SortOrder;
    totalDonations?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    taxId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CharityAvgOrderByAggregateInput = {
    totalDonations?: Prisma.SortOrder;
};
export type CharityMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    website?: Prisma.SortOrder;
    mission?: Prisma.SortOrder;
    totalDonations?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    taxId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CharityMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    logoUrl?: Prisma.SortOrder;
    website?: Prisma.SortOrder;
    mission?: Prisma.SortOrder;
    totalDonations?: Prisma.SortOrder;
    isVerified?: Prisma.SortOrder;
    taxId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type CharitySumOrderByAggregateInput = {
    totalDonations?: Prisma.SortOrder;
};
export type CharityScalarRelationFilter = {
    is?: Prisma.CharityWhereInput;
    isNot?: Prisma.CharityWhereInput;
};
export type CharityCreateNestedOneWithoutDonationsInput = {
    create?: Prisma.XOR<Prisma.CharityCreateWithoutDonationsInput, Prisma.CharityUncheckedCreateWithoutDonationsInput>;
    connectOrCreate?: Prisma.CharityCreateOrConnectWithoutDonationsInput;
    connect?: Prisma.CharityWhereUniqueInput;
};
export type CharityUpdateOneRequiredWithoutDonationsNestedInput = {
    create?: Prisma.XOR<Prisma.CharityCreateWithoutDonationsInput, Prisma.CharityUncheckedCreateWithoutDonationsInput>;
    connectOrCreate?: Prisma.CharityCreateOrConnectWithoutDonationsInput;
    upsert?: Prisma.CharityUpsertWithoutDonationsInput;
    connect?: Prisma.CharityWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.CharityUpdateToOneWithWhereWithoutDonationsInput, Prisma.CharityUpdateWithoutDonationsInput>, Prisma.CharityUncheckedUpdateWithoutDonationsInput>;
};
export type CharityCreateWithoutDonationsInput = {
    id?: string;
    name: string;
    description: string;
    logoUrl?: string | null;
    website?: string | null;
    mission?: string | null;
    totalDonations?: number;
    isVerified?: boolean;
    taxId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CharityUncheckedCreateWithoutDonationsInput = {
    id?: string;
    name: string;
    description: string;
    logoUrl?: string | null;
    website?: string | null;
    mission?: string | null;
    totalDonations?: number;
    isVerified?: boolean;
    taxId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type CharityCreateOrConnectWithoutDonationsInput = {
    where: Prisma.CharityWhereUniqueInput;
    create: Prisma.XOR<Prisma.CharityCreateWithoutDonationsInput, Prisma.CharityUncheckedCreateWithoutDonationsInput>;
};
export type CharityUpsertWithoutDonationsInput = {
    update: Prisma.XOR<Prisma.CharityUpdateWithoutDonationsInput, Prisma.CharityUncheckedUpdateWithoutDonationsInput>;
    create: Prisma.XOR<Prisma.CharityCreateWithoutDonationsInput, Prisma.CharityUncheckedCreateWithoutDonationsInput>;
    where?: Prisma.CharityWhereInput;
};
export type CharityUpdateToOneWithWhereWithoutDonationsInput = {
    where?: Prisma.CharityWhereInput;
    data: Prisma.XOR<Prisma.CharityUpdateWithoutDonationsInput, Prisma.CharityUncheckedUpdateWithoutDonationsInput>;
};
export type CharityUpdateWithoutDonationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mission?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalDonations?: Prisma.FloatFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    taxId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type CharityUncheckedUpdateWithoutDonationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    logoUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    website?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mission?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    totalDonations?: Prisma.FloatFieldUpdateOperationsInput | number;
    isVerified?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    taxId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type CharityCountOutputType
 */
export type CharityCountOutputType = {
    donations: number;
};
export type CharityCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    donations?: boolean | CharityCountOutputTypeCountDonationsArgs;
};
/**
 * CharityCountOutputType without action
 */
export type CharityCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CharityCountOutputType
     */
    select?: Prisma.CharityCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * CharityCountOutputType without action
 */
export type CharityCountOutputTypeCountDonationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DonationWhereInput;
};
export type CharitySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    logoUrl?: boolean;
    website?: boolean;
    mission?: boolean;
    totalDonations?: boolean;
    isVerified?: boolean;
    taxId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    donations?: boolean | Prisma.Charity$donationsArgs<ExtArgs>;
    _count?: boolean | Prisma.CharityCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["charity"]>;
export type CharitySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    logoUrl?: boolean;
    website?: boolean;
    mission?: boolean;
    totalDonations?: boolean;
    isVerified?: boolean;
    taxId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["charity"]>;
export type CharitySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    logoUrl?: boolean;
    website?: boolean;
    mission?: boolean;
    totalDonations?: boolean;
    isVerified?: boolean;
    taxId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["charity"]>;
export type CharitySelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    logoUrl?: boolean;
    website?: boolean;
    mission?: boolean;
    totalDonations?: boolean;
    isVerified?: boolean;
    taxId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type CharityOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "logoUrl" | "website" | "mission" | "totalDonations" | "isVerified" | "taxId" | "createdAt" | "updatedAt", ExtArgs["result"]["charity"]>;
export type CharityInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    donations?: boolean | Prisma.Charity$donationsArgs<ExtArgs>;
    _count?: boolean | Prisma.CharityCountOutputTypeDefaultArgs<ExtArgs>;
};
export type CharityIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type CharityIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $CharityPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Charity";
    objects: {
        donations: Prisma.$DonationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string;
        logoUrl: string | null;
        website: string | null;
        mission: string | null;
        totalDonations: number;
        isVerified: boolean;
        taxId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["charity"]>;
    composites: {};
};
export type CharityGetPayload<S extends boolean | null | undefined | CharityDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CharityPayload, S>;
export type CharityCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CharityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CharityCountAggregateInputType | true;
};
export interface CharityDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Charity'];
        meta: {
            name: 'Charity';
        };
    };
    /**
     * Find zero or one Charity that matches the filter.
     * @param {CharityFindUniqueArgs} args - Arguments to find a Charity
     * @example
     * // Get one Charity
     * const charity = await prisma.charity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CharityFindUniqueArgs>(args: Prisma.SelectSubset<T, CharityFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CharityClient<runtime.Types.Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Charity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CharityFindUniqueOrThrowArgs} args - Arguments to find a Charity
     * @example
     * // Get one Charity
     * const charity = await prisma.charity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CharityFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CharityFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CharityClient<runtime.Types.Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Charity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityFindFirstArgs} args - Arguments to find a Charity
     * @example
     * // Get one Charity
     * const charity = await prisma.charity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CharityFindFirstArgs>(args?: Prisma.SelectSubset<T, CharityFindFirstArgs<ExtArgs>>): Prisma.Prisma__CharityClient<runtime.Types.Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Charity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityFindFirstOrThrowArgs} args - Arguments to find a Charity
     * @example
     * // Get one Charity
     * const charity = await prisma.charity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CharityFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CharityFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CharityClient<runtime.Types.Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Charities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Charities
     * const charities = await prisma.charity.findMany()
     *
     * // Get first 10 Charities
     * const charities = await prisma.charity.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const charityWithIdOnly = await prisma.charity.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CharityFindManyArgs>(args?: Prisma.SelectSubset<T, CharityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Charity.
     * @param {CharityCreateArgs} args - Arguments to create a Charity.
     * @example
     * // Create one Charity
     * const Charity = await prisma.charity.create({
     *   data: {
     *     // ... data to create a Charity
     *   }
     * })
     *
     */
    create<T extends CharityCreateArgs>(args: Prisma.SelectSubset<T, CharityCreateArgs<ExtArgs>>): Prisma.Prisma__CharityClient<runtime.Types.Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Charities.
     * @param {CharityCreateManyArgs} args - Arguments to create many Charities.
     * @example
     * // Create many Charities
     * const charity = await prisma.charity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CharityCreateManyArgs>(args?: Prisma.SelectSubset<T, CharityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Charities and returns the data saved in the database.
     * @param {CharityCreateManyAndReturnArgs} args - Arguments to create many Charities.
     * @example
     * // Create many Charities
     * const charity = await prisma.charity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Charities and only return the `id`
     * const charityWithIdOnly = await prisma.charity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CharityCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CharityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Charity.
     * @param {CharityDeleteArgs} args - Arguments to delete one Charity.
     * @example
     * // Delete one Charity
     * const Charity = await prisma.charity.delete({
     *   where: {
     *     // ... filter to delete one Charity
     *   }
     * })
     *
     */
    delete<T extends CharityDeleteArgs>(args: Prisma.SelectSubset<T, CharityDeleteArgs<ExtArgs>>): Prisma.Prisma__CharityClient<runtime.Types.Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Charity.
     * @param {CharityUpdateArgs} args - Arguments to update one Charity.
     * @example
     * // Update one Charity
     * const charity = await prisma.charity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CharityUpdateArgs>(args: Prisma.SelectSubset<T, CharityUpdateArgs<ExtArgs>>): Prisma.Prisma__CharityClient<runtime.Types.Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Charities.
     * @param {CharityDeleteManyArgs} args - Arguments to filter Charities to delete.
     * @example
     * // Delete a few Charities
     * const { count } = await prisma.charity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CharityDeleteManyArgs>(args?: Prisma.SelectSubset<T, CharityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Charities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Charities
     * const charity = await prisma.charity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CharityUpdateManyArgs>(args: Prisma.SelectSubset<T, CharityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Charities and returns the data updated in the database.
     * @param {CharityUpdateManyAndReturnArgs} args - Arguments to update many Charities.
     * @example
     * // Update many Charities
     * const charity = await prisma.charity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Charities and only return the `id`
     * const charityWithIdOnly = await prisma.charity.updateManyAndReturn({
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
    updateManyAndReturn<T extends CharityUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CharityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Charity.
     * @param {CharityUpsertArgs} args - Arguments to update or create a Charity.
     * @example
     * // Update or create a Charity
     * const charity = await prisma.charity.upsert({
     *   create: {
     *     // ... data to create a Charity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Charity we want to update
     *   }
     * })
     */
    upsert<T extends CharityUpsertArgs>(args: Prisma.SelectSubset<T, CharityUpsertArgs<ExtArgs>>): Prisma.Prisma__CharityClient<runtime.Types.Result.GetResult<Prisma.$CharityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Charities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityCountArgs} args - Arguments to filter Charities to count.
     * @example
     * // Count the number of Charities
     * const count = await prisma.charity.count({
     *   where: {
     *     // ... the filter for the Charities we want to count
     *   }
     * })
    **/
    count<T extends CharityCountArgs>(args?: Prisma.Subset<T, CharityCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CharityCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Charity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CharityAggregateArgs>(args: Prisma.Subset<T, CharityAggregateArgs>): Prisma.PrismaPromise<GetCharityAggregateType<T>>;
    /**
     * Group by Charity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CharityGroupByArgs} args - Group by arguments.
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
    groupBy<T extends CharityGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CharityGroupByArgs['orderBy'];
    } : {
        orderBy?: CharityGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CharityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCharityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Charity model
     */
    readonly fields: CharityFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Charity.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__CharityClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    donations<T extends Prisma.Charity$donationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Charity$donationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DonationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Charity model
 */
export interface CharityFieldRefs {
    readonly id: Prisma.FieldRef<"Charity", 'String'>;
    readonly name: Prisma.FieldRef<"Charity", 'String'>;
    readonly description: Prisma.FieldRef<"Charity", 'String'>;
    readonly logoUrl: Prisma.FieldRef<"Charity", 'String'>;
    readonly website: Prisma.FieldRef<"Charity", 'String'>;
    readonly mission: Prisma.FieldRef<"Charity", 'String'>;
    readonly totalDonations: Prisma.FieldRef<"Charity", 'Float'>;
    readonly isVerified: Prisma.FieldRef<"Charity", 'Boolean'>;
    readonly taxId: Prisma.FieldRef<"Charity", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Charity", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Charity", 'DateTime'>;
}
/**
 * Charity findUnique
 */
export type CharityFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: Prisma.CharitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Charity
     */
    omit?: Prisma.CharityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CharityInclude<ExtArgs> | null;
    /**
     * Filter, which Charity to fetch.
     */
    where: Prisma.CharityWhereUniqueInput;
};
/**
 * Charity findUniqueOrThrow
 */
export type CharityFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: Prisma.CharitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Charity
     */
    omit?: Prisma.CharityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CharityInclude<ExtArgs> | null;
    /**
     * Filter, which Charity to fetch.
     */
    where: Prisma.CharityWhereUniqueInput;
};
/**
 * Charity findFirst
 */
export type CharityFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: Prisma.CharitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Charity
     */
    omit?: Prisma.CharityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CharityInclude<ExtArgs> | null;
    /**
     * Filter, which Charity to fetch.
     */
    where?: Prisma.CharityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Charities to fetch.
     */
    orderBy?: Prisma.CharityOrderByWithRelationInput | Prisma.CharityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Charities.
     */
    cursor?: Prisma.CharityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Charities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Charities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Charities.
     */
    distinct?: Prisma.CharityScalarFieldEnum | Prisma.CharityScalarFieldEnum[];
};
/**
 * Charity findFirstOrThrow
 */
export type CharityFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: Prisma.CharitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Charity
     */
    omit?: Prisma.CharityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CharityInclude<ExtArgs> | null;
    /**
     * Filter, which Charity to fetch.
     */
    where?: Prisma.CharityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Charities to fetch.
     */
    orderBy?: Prisma.CharityOrderByWithRelationInput | Prisma.CharityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Charities.
     */
    cursor?: Prisma.CharityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Charities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Charities.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Charities.
     */
    distinct?: Prisma.CharityScalarFieldEnum | Prisma.CharityScalarFieldEnum[];
};
/**
 * Charity findMany
 */
export type CharityFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: Prisma.CharitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Charity
     */
    omit?: Prisma.CharityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CharityInclude<ExtArgs> | null;
    /**
     * Filter, which Charities to fetch.
     */
    where?: Prisma.CharityWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Charities to fetch.
     */
    orderBy?: Prisma.CharityOrderByWithRelationInput | Prisma.CharityOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Charities.
     */
    cursor?: Prisma.CharityWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Charities from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Charities.
     */
    skip?: number;
    distinct?: Prisma.CharityScalarFieldEnum | Prisma.CharityScalarFieldEnum[];
};
/**
 * Charity create
 */
export type CharityCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: Prisma.CharitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Charity
     */
    omit?: Prisma.CharityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CharityInclude<ExtArgs> | null;
    /**
     * The data needed to create a Charity.
     */
    data: Prisma.XOR<Prisma.CharityCreateInput, Prisma.CharityUncheckedCreateInput>;
};
/**
 * Charity createMany
 */
export type CharityCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Charities.
     */
    data: Prisma.CharityCreateManyInput | Prisma.CharityCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Charity createManyAndReturn
 */
export type CharityCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: Prisma.CharitySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Charity
     */
    omit?: Prisma.CharityOmit<ExtArgs> | null;
    /**
     * The data used to create many Charities.
     */
    data: Prisma.CharityCreateManyInput | Prisma.CharityCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Charity update
 */
export type CharityUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: Prisma.CharitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Charity
     */
    omit?: Prisma.CharityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CharityInclude<ExtArgs> | null;
    /**
     * The data needed to update a Charity.
     */
    data: Prisma.XOR<Prisma.CharityUpdateInput, Prisma.CharityUncheckedUpdateInput>;
    /**
     * Choose, which Charity to update.
     */
    where: Prisma.CharityWhereUniqueInput;
};
/**
 * Charity updateMany
 */
export type CharityUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Charities.
     */
    data: Prisma.XOR<Prisma.CharityUpdateManyMutationInput, Prisma.CharityUncheckedUpdateManyInput>;
    /**
     * Filter which Charities to update
     */
    where?: Prisma.CharityWhereInput;
    /**
     * Limit how many Charities to update.
     */
    limit?: number;
};
/**
 * Charity updateManyAndReturn
 */
export type CharityUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: Prisma.CharitySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Charity
     */
    omit?: Prisma.CharityOmit<ExtArgs> | null;
    /**
     * The data used to update Charities.
     */
    data: Prisma.XOR<Prisma.CharityUpdateManyMutationInput, Prisma.CharityUncheckedUpdateManyInput>;
    /**
     * Filter which Charities to update
     */
    where?: Prisma.CharityWhereInput;
    /**
     * Limit how many Charities to update.
     */
    limit?: number;
};
/**
 * Charity upsert
 */
export type CharityUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: Prisma.CharitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Charity
     */
    omit?: Prisma.CharityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CharityInclude<ExtArgs> | null;
    /**
     * The filter to search for the Charity to update in case it exists.
     */
    where: Prisma.CharityWhereUniqueInput;
    /**
     * In case the Charity found by the `where` argument doesn't exist, create a new Charity with this data.
     */
    create: Prisma.XOR<Prisma.CharityCreateInput, Prisma.CharityUncheckedCreateInput>;
    /**
     * In case the Charity was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.CharityUpdateInput, Prisma.CharityUncheckedUpdateInput>;
};
/**
 * Charity delete
 */
export type CharityDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: Prisma.CharitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Charity
     */
    omit?: Prisma.CharityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CharityInclude<ExtArgs> | null;
    /**
     * Filter which Charity to delete.
     */
    where: Prisma.CharityWhereUniqueInput;
};
/**
 * Charity deleteMany
 */
export type CharityDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Charities to delete
     */
    where?: Prisma.CharityWhereInput;
    /**
     * Limit how many Charities to delete.
     */
    limit?: number;
};
/**
 * Charity.donations
 */
export type Charity$donationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * Charity without action
 */
export type CharityDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Charity
     */
    select?: Prisma.CharitySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Charity
     */
    omit?: Prisma.CharityOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.CharityInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=Charity.d.ts.map