import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ChallengeParticipant
 *
 */
export type ChallengeParticipantModel = runtime.Types.Result.DefaultSelection<Prisma.$ChallengeParticipantPayload>;
export type AggregateChallengeParticipant = {
    _count: ChallengeParticipantCountAggregateOutputType | null;
    _avg: ChallengeParticipantAvgAggregateOutputType | null;
    _sum: ChallengeParticipantSumAggregateOutputType | null;
    _min: ChallengeParticipantMinAggregateOutputType | null;
    _max: ChallengeParticipantMaxAggregateOutputType | null;
};
export type ChallengeParticipantAvgAggregateOutputType = {
    progress: number | null;
};
export type ChallengeParticipantSumAggregateOutputType = {
    progress: number | null;
};
export type ChallengeParticipantMinAggregateOutputType = {
    id: string | null;
    challengeId: string | null;
    userId: string | null;
    progress: number | null;
    isCompleted: boolean | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ChallengeParticipantMaxAggregateOutputType = {
    id: string | null;
    challengeId: string | null;
    userId: string | null;
    progress: number | null;
    isCompleted: boolean | null;
    completedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ChallengeParticipantCountAggregateOutputType = {
    id: number;
    challengeId: number;
    userId: number;
    progress: number;
    isCompleted: number;
    completedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ChallengeParticipantAvgAggregateInputType = {
    progress?: true;
};
export type ChallengeParticipantSumAggregateInputType = {
    progress?: true;
};
export type ChallengeParticipantMinAggregateInputType = {
    id?: true;
    challengeId?: true;
    userId?: true;
    progress?: true;
    isCompleted?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ChallengeParticipantMaxAggregateInputType = {
    id?: true;
    challengeId?: true;
    userId?: true;
    progress?: true;
    isCompleted?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ChallengeParticipantCountAggregateInputType = {
    id?: true;
    challengeId?: true;
    userId?: true;
    progress?: true;
    isCompleted?: true;
    completedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ChallengeParticipantAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ChallengeParticipant to aggregate.
     */
    where?: Prisma.ChallengeParticipantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChallengeParticipants to fetch.
     */
    orderBy?: Prisma.ChallengeParticipantOrderByWithRelationInput | Prisma.ChallengeParticipantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ChallengeParticipantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChallengeParticipants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChallengeParticipants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ChallengeParticipants
    **/
    _count?: true | ChallengeParticipantCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ChallengeParticipantAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ChallengeParticipantSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ChallengeParticipantMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ChallengeParticipantMaxAggregateInputType;
};
export type GetChallengeParticipantAggregateType<T extends ChallengeParticipantAggregateArgs> = {
    [P in keyof T & keyof AggregateChallengeParticipant]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChallengeParticipant[P]> : Prisma.GetScalarType<T[P], AggregateChallengeParticipant[P]>;
};
export type ChallengeParticipantGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChallengeParticipantWhereInput;
    orderBy?: Prisma.ChallengeParticipantOrderByWithAggregationInput | Prisma.ChallengeParticipantOrderByWithAggregationInput[];
    by: Prisma.ChallengeParticipantScalarFieldEnum[] | Prisma.ChallengeParticipantScalarFieldEnum;
    having?: Prisma.ChallengeParticipantScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChallengeParticipantCountAggregateInputType | true;
    _avg?: ChallengeParticipantAvgAggregateInputType;
    _sum?: ChallengeParticipantSumAggregateInputType;
    _min?: ChallengeParticipantMinAggregateInputType;
    _max?: ChallengeParticipantMaxAggregateInputType;
};
export type ChallengeParticipantGroupByOutputType = {
    id: string;
    challengeId: string;
    userId: string;
    progress: number;
    isCompleted: boolean;
    completedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ChallengeParticipantCountAggregateOutputType | null;
    _avg: ChallengeParticipantAvgAggregateOutputType | null;
    _sum: ChallengeParticipantSumAggregateOutputType | null;
    _min: ChallengeParticipantMinAggregateOutputType | null;
    _max: ChallengeParticipantMaxAggregateOutputType | null;
};
type GetChallengeParticipantGroupByPayload<T extends ChallengeParticipantGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ChallengeParticipantGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ChallengeParticipantGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ChallengeParticipantGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ChallengeParticipantGroupByOutputType[P]>;
}>>;
export type ChallengeParticipantWhereInput = {
    AND?: Prisma.ChallengeParticipantWhereInput | Prisma.ChallengeParticipantWhereInput[];
    OR?: Prisma.ChallengeParticipantWhereInput[];
    NOT?: Prisma.ChallengeParticipantWhereInput | Prisma.ChallengeParticipantWhereInput[];
    id?: Prisma.StringFilter<"ChallengeParticipant"> | string;
    challengeId?: Prisma.StringFilter<"ChallengeParticipant"> | string;
    userId?: Prisma.StringFilter<"ChallengeParticipant"> | string;
    progress?: Prisma.IntFilter<"ChallengeParticipant"> | number;
    isCompleted?: Prisma.BoolFilter<"ChallengeParticipant"> | boolean;
    completedAt?: Prisma.DateTimeNullableFilter<"ChallengeParticipant"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ChallengeParticipant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ChallengeParticipant"> | Date | string;
    challenge?: Prisma.XOR<Prisma.ChallengeScalarRelationFilter, Prisma.ChallengeWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type ChallengeParticipantOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    challengeId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    isCompleted?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    challenge?: Prisma.ChallengeOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type ChallengeParticipantWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    challengeId_userId?: Prisma.ChallengeParticipantChallengeIdUserIdCompoundUniqueInput;
    AND?: Prisma.ChallengeParticipantWhereInput | Prisma.ChallengeParticipantWhereInput[];
    OR?: Prisma.ChallengeParticipantWhereInput[];
    NOT?: Prisma.ChallengeParticipantWhereInput | Prisma.ChallengeParticipantWhereInput[];
    challengeId?: Prisma.StringFilter<"ChallengeParticipant"> | string;
    userId?: Prisma.StringFilter<"ChallengeParticipant"> | string;
    progress?: Prisma.IntFilter<"ChallengeParticipant"> | number;
    isCompleted?: Prisma.BoolFilter<"ChallengeParticipant"> | boolean;
    completedAt?: Prisma.DateTimeNullableFilter<"ChallengeParticipant"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ChallengeParticipant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ChallengeParticipant"> | Date | string;
    challenge?: Prisma.XOR<Prisma.ChallengeScalarRelationFilter, Prisma.ChallengeWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "challengeId_userId">;
export type ChallengeParticipantOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    challengeId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    isCompleted?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ChallengeParticipantCountOrderByAggregateInput;
    _avg?: Prisma.ChallengeParticipantAvgOrderByAggregateInput;
    _max?: Prisma.ChallengeParticipantMaxOrderByAggregateInput;
    _min?: Prisma.ChallengeParticipantMinOrderByAggregateInput;
    _sum?: Prisma.ChallengeParticipantSumOrderByAggregateInput;
};
export type ChallengeParticipantScalarWhereWithAggregatesInput = {
    AND?: Prisma.ChallengeParticipantScalarWhereWithAggregatesInput | Prisma.ChallengeParticipantScalarWhereWithAggregatesInput[];
    OR?: Prisma.ChallengeParticipantScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ChallengeParticipantScalarWhereWithAggregatesInput | Prisma.ChallengeParticipantScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ChallengeParticipant"> | string;
    challengeId?: Prisma.StringWithAggregatesFilter<"ChallengeParticipant"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"ChallengeParticipant"> | string;
    progress?: Prisma.IntWithAggregatesFilter<"ChallengeParticipant"> | number;
    isCompleted?: Prisma.BoolWithAggregatesFilter<"ChallengeParticipant"> | boolean;
    completedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ChallengeParticipant"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ChallengeParticipant"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ChallengeParticipant"> | Date | string;
};
export type ChallengeParticipantCreateInput = {
    id?: string;
    progress?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    challenge: Prisma.ChallengeCreateNestedOneWithoutParticipantsInput;
    user: Prisma.UserCreateNestedOneWithoutChallengeParticipantsInput;
};
export type ChallengeParticipantUncheckedCreateInput = {
    id?: string;
    challengeId: string;
    userId: string;
    progress?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChallengeParticipantUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    challenge?: Prisma.ChallengeUpdateOneRequiredWithoutParticipantsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutChallengeParticipantsNestedInput;
};
export type ChallengeParticipantUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    challengeId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChallengeParticipantCreateManyInput = {
    id?: string;
    challengeId: string;
    userId: string;
    progress?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChallengeParticipantUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChallengeParticipantUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    challengeId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChallengeParticipantListRelationFilter = {
    every?: Prisma.ChallengeParticipantWhereInput;
    some?: Prisma.ChallengeParticipantWhereInput;
    none?: Prisma.ChallengeParticipantWhereInput;
};
export type ChallengeParticipantOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ChallengeParticipantChallengeIdUserIdCompoundUniqueInput = {
    challengeId: string;
    userId: string;
};
export type ChallengeParticipantCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    challengeId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    isCompleted?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChallengeParticipantAvgOrderByAggregateInput = {
    progress?: Prisma.SortOrder;
};
export type ChallengeParticipantMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    challengeId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    isCompleted?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChallengeParticipantMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    challengeId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    progress?: Prisma.SortOrder;
    isCompleted?: Prisma.SortOrder;
    completedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChallengeParticipantSumOrderByAggregateInput = {
    progress?: Prisma.SortOrder;
};
export type ChallengeParticipantCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ChallengeParticipantCreateWithoutUserInput, Prisma.ChallengeParticipantUncheckedCreateWithoutUserInput> | Prisma.ChallengeParticipantCreateWithoutUserInput[] | Prisma.ChallengeParticipantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ChallengeParticipantCreateOrConnectWithoutUserInput | Prisma.ChallengeParticipantCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ChallengeParticipantCreateManyUserInputEnvelope;
    connect?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
};
export type ChallengeParticipantUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ChallengeParticipantCreateWithoutUserInput, Prisma.ChallengeParticipantUncheckedCreateWithoutUserInput> | Prisma.ChallengeParticipantCreateWithoutUserInput[] | Prisma.ChallengeParticipantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ChallengeParticipantCreateOrConnectWithoutUserInput | Prisma.ChallengeParticipantCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ChallengeParticipantCreateManyUserInputEnvelope;
    connect?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
};
export type ChallengeParticipantUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ChallengeParticipantCreateWithoutUserInput, Prisma.ChallengeParticipantUncheckedCreateWithoutUserInput> | Prisma.ChallengeParticipantCreateWithoutUserInput[] | Prisma.ChallengeParticipantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ChallengeParticipantCreateOrConnectWithoutUserInput | Prisma.ChallengeParticipantCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ChallengeParticipantUpsertWithWhereUniqueWithoutUserInput | Prisma.ChallengeParticipantUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ChallengeParticipantCreateManyUserInputEnvelope;
    set?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    disconnect?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    delete?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    connect?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    update?: Prisma.ChallengeParticipantUpdateWithWhereUniqueWithoutUserInput | Prisma.ChallengeParticipantUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ChallengeParticipantUpdateManyWithWhereWithoutUserInput | Prisma.ChallengeParticipantUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ChallengeParticipantScalarWhereInput | Prisma.ChallengeParticipantScalarWhereInput[];
};
export type ChallengeParticipantUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ChallengeParticipantCreateWithoutUserInput, Prisma.ChallengeParticipantUncheckedCreateWithoutUserInput> | Prisma.ChallengeParticipantCreateWithoutUserInput[] | Prisma.ChallengeParticipantUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ChallengeParticipantCreateOrConnectWithoutUserInput | Prisma.ChallengeParticipantCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ChallengeParticipantUpsertWithWhereUniqueWithoutUserInput | Prisma.ChallengeParticipantUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ChallengeParticipantCreateManyUserInputEnvelope;
    set?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    disconnect?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    delete?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    connect?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    update?: Prisma.ChallengeParticipantUpdateWithWhereUniqueWithoutUserInput | Prisma.ChallengeParticipantUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ChallengeParticipantUpdateManyWithWhereWithoutUserInput | Prisma.ChallengeParticipantUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ChallengeParticipantScalarWhereInput | Prisma.ChallengeParticipantScalarWhereInput[];
};
export type ChallengeParticipantCreateNestedManyWithoutChallengeInput = {
    create?: Prisma.XOR<Prisma.ChallengeParticipantCreateWithoutChallengeInput, Prisma.ChallengeParticipantUncheckedCreateWithoutChallengeInput> | Prisma.ChallengeParticipantCreateWithoutChallengeInput[] | Prisma.ChallengeParticipantUncheckedCreateWithoutChallengeInput[];
    connectOrCreate?: Prisma.ChallengeParticipantCreateOrConnectWithoutChallengeInput | Prisma.ChallengeParticipantCreateOrConnectWithoutChallengeInput[];
    createMany?: Prisma.ChallengeParticipantCreateManyChallengeInputEnvelope;
    connect?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
};
export type ChallengeParticipantUncheckedCreateNestedManyWithoutChallengeInput = {
    create?: Prisma.XOR<Prisma.ChallengeParticipantCreateWithoutChallengeInput, Prisma.ChallengeParticipantUncheckedCreateWithoutChallengeInput> | Prisma.ChallengeParticipantCreateWithoutChallengeInput[] | Prisma.ChallengeParticipantUncheckedCreateWithoutChallengeInput[];
    connectOrCreate?: Prisma.ChallengeParticipantCreateOrConnectWithoutChallengeInput | Prisma.ChallengeParticipantCreateOrConnectWithoutChallengeInput[];
    createMany?: Prisma.ChallengeParticipantCreateManyChallengeInputEnvelope;
    connect?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
};
export type ChallengeParticipantUpdateManyWithoutChallengeNestedInput = {
    create?: Prisma.XOR<Prisma.ChallengeParticipantCreateWithoutChallengeInput, Prisma.ChallengeParticipantUncheckedCreateWithoutChallengeInput> | Prisma.ChallengeParticipantCreateWithoutChallengeInput[] | Prisma.ChallengeParticipantUncheckedCreateWithoutChallengeInput[];
    connectOrCreate?: Prisma.ChallengeParticipantCreateOrConnectWithoutChallengeInput | Prisma.ChallengeParticipantCreateOrConnectWithoutChallengeInput[];
    upsert?: Prisma.ChallengeParticipantUpsertWithWhereUniqueWithoutChallengeInput | Prisma.ChallengeParticipantUpsertWithWhereUniqueWithoutChallengeInput[];
    createMany?: Prisma.ChallengeParticipantCreateManyChallengeInputEnvelope;
    set?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    disconnect?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    delete?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    connect?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    update?: Prisma.ChallengeParticipantUpdateWithWhereUniqueWithoutChallengeInput | Prisma.ChallengeParticipantUpdateWithWhereUniqueWithoutChallengeInput[];
    updateMany?: Prisma.ChallengeParticipantUpdateManyWithWhereWithoutChallengeInput | Prisma.ChallengeParticipantUpdateManyWithWhereWithoutChallengeInput[];
    deleteMany?: Prisma.ChallengeParticipantScalarWhereInput | Prisma.ChallengeParticipantScalarWhereInput[];
};
export type ChallengeParticipantUncheckedUpdateManyWithoutChallengeNestedInput = {
    create?: Prisma.XOR<Prisma.ChallengeParticipantCreateWithoutChallengeInput, Prisma.ChallengeParticipantUncheckedCreateWithoutChallengeInput> | Prisma.ChallengeParticipantCreateWithoutChallengeInput[] | Prisma.ChallengeParticipantUncheckedCreateWithoutChallengeInput[];
    connectOrCreate?: Prisma.ChallengeParticipantCreateOrConnectWithoutChallengeInput | Prisma.ChallengeParticipantCreateOrConnectWithoutChallengeInput[];
    upsert?: Prisma.ChallengeParticipantUpsertWithWhereUniqueWithoutChallengeInput | Prisma.ChallengeParticipantUpsertWithWhereUniqueWithoutChallengeInput[];
    createMany?: Prisma.ChallengeParticipantCreateManyChallengeInputEnvelope;
    set?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    disconnect?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    delete?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    connect?: Prisma.ChallengeParticipantWhereUniqueInput | Prisma.ChallengeParticipantWhereUniqueInput[];
    update?: Prisma.ChallengeParticipantUpdateWithWhereUniqueWithoutChallengeInput | Prisma.ChallengeParticipantUpdateWithWhereUniqueWithoutChallengeInput[];
    updateMany?: Prisma.ChallengeParticipantUpdateManyWithWhereWithoutChallengeInput | Prisma.ChallengeParticipantUpdateManyWithWhereWithoutChallengeInput[];
    deleteMany?: Prisma.ChallengeParticipantScalarWhereInput | Prisma.ChallengeParticipantScalarWhereInput[];
};
export type ChallengeParticipantCreateWithoutUserInput = {
    id?: string;
    progress?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    challenge: Prisma.ChallengeCreateNestedOneWithoutParticipantsInput;
};
export type ChallengeParticipantUncheckedCreateWithoutUserInput = {
    id?: string;
    challengeId: string;
    progress?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChallengeParticipantCreateOrConnectWithoutUserInput = {
    where: Prisma.ChallengeParticipantWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChallengeParticipantCreateWithoutUserInput, Prisma.ChallengeParticipantUncheckedCreateWithoutUserInput>;
};
export type ChallengeParticipantCreateManyUserInputEnvelope = {
    data: Prisma.ChallengeParticipantCreateManyUserInput | Prisma.ChallengeParticipantCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ChallengeParticipantUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ChallengeParticipantWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChallengeParticipantUpdateWithoutUserInput, Prisma.ChallengeParticipantUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ChallengeParticipantCreateWithoutUserInput, Prisma.ChallengeParticipantUncheckedCreateWithoutUserInput>;
};
export type ChallengeParticipantUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ChallengeParticipantWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChallengeParticipantUpdateWithoutUserInput, Prisma.ChallengeParticipantUncheckedUpdateWithoutUserInput>;
};
export type ChallengeParticipantUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ChallengeParticipantScalarWhereInput;
    data: Prisma.XOR<Prisma.ChallengeParticipantUpdateManyMutationInput, Prisma.ChallengeParticipantUncheckedUpdateManyWithoutUserInput>;
};
export type ChallengeParticipantScalarWhereInput = {
    AND?: Prisma.ChallengeParticipantScalarWhereInput | Prisma.ChallengeParticipantScalarWhereInput[];
    OR?: Prisma.ChallengeParticipantScalarWhereInput[];
    NOT?: Prisma.ChallengeParticipantScalarWhereInput | Prisma.ChallengeParticipantScalarWhereInput[];
    id?: Prisma.StringFilter<"ChallengeParticipant"> | string;
    challengeId?: Prisma.StringFilter<"ChallengeParticipant"> | string;
    userId?: Prisma.StringFilter<"ChallengeParticipant"> | string;
    progress?: Prisma.IntFilter<"ChallengeParticipant"> | number;
    isCompleted?: Prisma.BoolFilter<"ChallengeParticipant"> | boolean;
    completedAt?: Prisma.DateTimeNullableFilter<"ChallengeParticipant"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"ChallengeParticipant"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ChallengeParticipant"> | Date | string;
};
export type ChallengeParticipantCreateWithoutChallengeInput = {
    id?: string;
    progress?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutChallengeParticipantsInput;
};
export type ChallengeParticipantUncheckedCreateWithoutChallengeInput = {
    id?: string;
    userId: string;
    progress?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChallengeParticipantCreateOrConnectWithoutChallengeInput = {
    where: Prisma.ChallengeParticipantWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChallengeParticipantCreateWithoutChallengeInput, Prisma.ChallengeParticipantUncheckedCreateWithoutChallengeInput>;
};
export type ChallengeParticipantCreateManyChallengeInputEnvelope = {
    data: Prisma.ChallengeParticipantCreateManyChallengeInput | Prisma.ChallengeParticipantCreateManyChallengeInput[];
    skipDuplicates?: boolean;
};
export type ChallengeParticipantUpsertWithWhereUniqueWithoutChallengeInput = {
    where: Prisma.ChallengeParticipantWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChallengeParticipantUpdateWithoutChallengeInput, Prisma.ChallengeParticipantUncheckedUpdateWithoutChallengeInput>;
    create: Prisma.XOR<Prisma.ChallengeParticipantCreateWithoutChallengeInput, Prisma.ChallengeParticipantUncheckedCreateWithoutChallengeInput>;
};
export type ChallengeParticipantUpdateWithWhereUniqueWithoutChallengeInput = {
    where: Prisma.ChallengeParticipantWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChallengeParticipantUpdateWithoutChallengeInput, Prisma.ChallengeParticipantUncheckedUpdateWithoutChallengeInput>;
};
export type ChallengeParticipantUpdateManyWithWhereWithoutChallengeInput = {
    where: Prisma.ChallengeParticipantScalarWhereInput;
    data: Prisma.XOR<Prisma.ChallengeParticipantUpdateManyMutationInput, Prisma.ChallengeParticipantUncheckedUpdateManyWithoutChallengeInput>;
};
export type ChallengeParticipantCreateManyUserInput = {
    id?: string;
    challengeId: string;
    progress?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChallengeParticipantUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    challenge?: Prisma.ChallengeUpdateOneRequiredWithoutParticipantsNestedInput;
};
export type ChallengeParticipantUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    challengeId?: Prisma.StringFieldUpdateOperationsInput | string;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChallengeParticipantUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    challengeId?: Prisma.StringFieldUpdateOperationsInput | string;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChallengeParticipantCreateManyChallengeInput = {
    id?: string;
    userId: string;
    progress?: number;
    isCompleted?: boolean;
    completedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChallengeParticipantUpdateWithoutChallengeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutChallengeParticipantsNestedInput;
};
export type ChallengeParticipantUncheckedUpdateWithoutChallengeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChallengeParticipantUncheckedUpdateManyWithoutChallengeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    progress?: Prisma.IntFieldUpdateOperationsInput | number;
    isCompleted?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    completedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChallengeParticipantSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    challengeId?: boolean;
    userId?: boolean;
    progress?: boolean;
    isCompleted?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    challenge?: boolean | Prisma.ChallengeDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["challengeParticipant"]>;
export type ChallengeParticipantSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    challengeId?: boolean;
    userId?: boolean;
    progress?: boolean;
    isCompleted?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    challenge?: boolean | Prisma.ChallengeDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["challengeParticipant"]>;
export type ChallengeParticipantSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    challengeId?: boolean;
    userId?: boolean;
    progress?: boolean;
    isCompleted?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    challenge?: boolean | Prisma.ChallengeDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["challengeParticipant"]>;
export type ChallengeParticipantSelectScalar = {
    id?: boolean;
    challengeId?: boolean;
    userId?: boolean;
    progress?: boolean;
    isCompleted?: boolean;
    completedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ChallengeParticipantOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "challengeId" | "userId" | "progress" | "isCompleted" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["challengeParticipant"]>;
export type ChallengeParticipantInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    challenge?: boolean | Prisma.ChallengeDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ChallengeParticipantIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    challenge?: boolean | Prisma.ChallengeDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ChallengeParticipantIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    challenge?: boolean | Prisma.ChallengeDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ChallengeParticipantPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ChallengeParticipant";
    objects: {
        challenge: Prisma.$ChallengePayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        challengeId: string;
        userId: string;
        progress: number;
        isCompleted: boolean;
        completedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["challengeParticipant"]>;
    composites: {};
};
export type ChallengeParticipantGetPayload<S extends boolean | null | undefined | ChallengeParticipantDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ChallengeParticipantPayload, S>;
export type ChallengeParticipantCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ChallengeParticipantFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ChallengeParticipantCountAggregateInputType | true;
};
export interface ChallengeParticipantDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ChallengeParticipant'];
        meta: {
            name: 'ChallengeParticipant';
        };
    };
    /**
     * Find zero or one ChallengeParticipant that matches the filter.
     * @param {ChallengeParticipantFindUniqueArgs} args - Arguments to find a ChallengeParticipant
     * @example
     * // Get one ChallengeParticipant
     * const challengeParticipant = await prisma.challengeParticipant.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ChallengeParticipantFindUniqueArgs>(args: Prisma.SelectSubset<T, ChallengeParticipantFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ChallengeParticipantClient<runtime.Types.Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ChallengeParticipant that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ChallengeParticipantFindUniqueOrThrowArgs} args - Arguments to find a ChallengeParticipant
     * @example
     * // Get one ChallengeParticipant
     * const challengeParticipant = await prisma.challengeParticipant.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ChallengeParticipantFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ChallengeParticipantFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChallengeParticipantClient<runtime.Types.Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ChallengeParticipant that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantFindFirstArgs} args - Arguments to find a ChallengeParticipant
     * @example
     * // Get one ChallengeParticipant
     * const challengeParticipant = await prisma.challengeParticipant.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ChallengeParticipantFindFirstArgs>(args?: Prisma.SelectSubset<T, ChallengeParticipantFindFirstArgs<ExtArgs>>): Prisma.Prisma__ChallengeParticipantClient<runtime.Types.Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ChallengeParticipant that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantFindFirstOrThrowArgs} args - Arguments to find a ChallengeParticipant
     * @example
     * // Get one ChallengeParticipant
     * const challengeParticipant = await prisma.challengeParticipant.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ChallengeParticipantFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ChallengeParticipantFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChallengeParticipantClient<runtime.Types.Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ChallengeParticipants that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ChallengeParticipants
     * const challengeParticipants = await prisma.challengeParticipant.findMany()
     *
     * // Get first 10 ChallengeParticipants
     * const challengeParticipants = await prisma.challengeParticipant.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const challengeParticipantWithIdOnly = await prisma.challengeParticipant.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ChallengeParticipantFindManyArgs>(args?: Prisma.SelectSubset<T, ChallengeParticipantFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ChallengeParticipant.
     * @param {ChallengeParticipantCreateArgs} args - Arguments to create a ChallengeParticipant.
     * @example
     * // Create one ChallengeParticipant
     * const ChallengeParticipant = await prisma.challengeParticipant.create({
     *   data: {
     *     // ... data to create a ChallengeParticipant
     *   }
     * })
     *
     */
    create<T extends ChallengeParticipantCreateArgs>(args: Prisma.SelectSubset<T, ChallengeParticipantCreateArgs<ExtArgs>>): Prisma.Prisma__ChallengeParticipantClient<runtime.Types.Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ChallengeParticipants.
     * @param {ChallengeParticipantCreateManyArgs} args - Arguments to create many ChallengeParticipants.
     * @example
     * // Create many ChallengeParticipants
     * const challengeParticipant = await prisma.challengeParticipant.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ChallengeParticipantCreateManyArgs>(args?: Prisma.SelectSubset<T, ChallengeParticipantCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ChallengeParticipants and returns the data saved in the database.
     * @param {ChallengeParticipantCreateManyAndReturnArgs} args - Arguments to create many ChallengeParticipants.
     * @example
     * // Create many ChallengeParticipants
     * const challengeParticipant = await prisma.challengeParticipant.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ChallengeParticipants and only return the `id`
     * const challengeParticipantWithIdOnly = await prisma.challengeParticipant.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ChallengeParticipantCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ChallengeParticipantCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ChallengeParticipant.
     * @param {ChallengeParticipantDeleteArgs} args - Arguments to delete one ChallengeParticipant.
     * @example
     * // Delete one ChallengeParticipant
     * const ChallengeParticipant = await prisma.challengeParticipant.delete({
     *   where: {
     *     // ... filter to delete one ChallengeParticipant
     *   }
     * })
     *
     */
    delete<T extends ChallengeParticipantDeleteArgs>(args: Prisma.SelectSubset<T, ChallengeParticipantDeleteArgs<ExtArgs>>): Prisma.Prisma__ChallengeParticipantClient<runtime.Types.Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ChallengeParticipant.
     * @param {ChallengeParticipantUpdateArgs} args - Arguments to update one ChallengeParticipant.
     * @example
     * // Update one ChallengeParticipant
     * const challengeParticipant = await prisma.challengeParticipant.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ChallengeParticipantUpdateArgs>(args: Prisma.SelectSubset<T, ChallengeParticipantUpdateArgs<ExtArgs>>): Prisma.Prisma__ChallengeParticipantClient<runtime.Types.Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ChallengeParticipants.
     * @param {ChallengeParticipantDeleteManyArgs} args - Arguments to filter ChallengeParticipants to delete.
     * @example
     * // Delete a few ChallengeParticipants
     * const { count } = await prisma.challengeParticipant.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ChallengeParticipantDeleteManyArgs>(args?: Prisma.SelectSubset<T, ChallengeParticipantDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ChallengeParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ChallengeParticipants
     * const challengeParticipant = await prisma.challengeParticipant.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ChallengeParticipantUpdateManyArgs>(args: Prisma.SelectSubset<T, ChallengeParticipantUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ChallengeParticipants and returns the data updated in the database.
     * @param {ChallengeParticipantUpdateManyAndReturnArgs} args - Arguments to update many ChallengeParticipants.
     * @example
     * // Update many ChallengeParticipants
     * const challengeParticipant = await prisma.challengeParticipant.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ChallengeParticipants and only return the `id`
     * const challengeParticipantWithIdOnly = await prisma.challengeParticipant.updateManyAndReturn({
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
    updateManyAndReturn<T extends ChallengeParticipantUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ChallengeParticipantUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ChallengeParticipant.
     * @param {ChallengeParticipantUpsertArgs} args - Arguments to update or create a ChallengeParticipant.
     * @example
     * // Update or create a ChallengeParticipant
     * const challengeParticipant = await prisma.challengeParticipant.upsert({
     *   create: {
     *     // ... data to create a ChallengeParticipant
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ChallengeParticipant we want to update
     *   }
     * })
     */
    upsert<T extends ChallengeParticipantUpsertArgs>(args: Prisma.SelectSubset<T, ChallengeParticipantUpsertArgs<ExtArgs>>): Prisma.Prisma__ChallengeParticipantClient<runtime.Types.Result.GetResult<Prisma.$ChallengeParticipantPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ChallengeParticipants.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantCountArgs} args - Arguments to filter ChallengeParticipants to count.
     * @example
     * // Count the number of ChallengeParticipants
     * const count = await prisma.challengeParticipant.count({
     *   where: {
     *     // ... the filter for the ChallengeParticipants we want to count
     *   }
     * })
    **/
    count<T extends ChallengeParticipantCountArgs>(args?: Prisma.Subset<T, ChallengeParticipantCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ChallengeParticipantCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ChallengeParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ChallengeParticipantAggregateArgs>(args: Prisma.Subset<T, ChallengeParticipantAggregateArgs>): Prisma.PrismaPromise<GetChallengeParticipantAggregateType<T>>;
    /**
     * Group by ChallengeParticipant.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChallengeParticipantGroupByArgs} args - Group by arguments.
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
    groupBy<T extends ChallengeParticipantGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ChallengeParticipantGroupByArgs['orderBy'];
    } : {
        orderBy?: ChallengeParticipantGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ChallengeParticipantGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChallengeParticipantGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ChallengeParticipant model
     */
    readonly fields: ChallengeParticipantFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ChallengeParticipant.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ChallengeParticipantClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    challenge<T extends Prisma.ChallengeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ChallengeDefaultArgs<ExtArgs>>): Prisma.Prisma__ChallengeClient<runtime.Types.Result.GetResult<Prisma.$ChallengePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the ChallengeParticipant model
 */
export interface ChallengeParticipantFieldRefs {
    readonly id: Prisma.FieldRef<"ChallengeParticipant", 'String'>;
    readonly challengeId: Prisma.FieldRef<"ChallengeParticipant", 'String'>;
    readonly userId: Prisma.FieldRef<"ChallengeParticipant", 'String'>;
    readonly progress: Prisma.FieldRef<"ChallengeParticipant", 'Int'>;
    readonly isCompleted: Prisma.FieldRef<"ChallengeParticipant", 'Boolean'>;
    readonly completedAt: Prisma.FieldRef<"ChallengeParticipant", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"ChallengeParticipant", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ChallengeParticipant", 'DateTime'>;
}
/**
 * ChallengeParticipant findUnique
 */
export type ChallengeParticipantFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ChallengeParticipant to fetch.
     */
    where: Prisma.ChallengeParticipantWhereUniqueInput;
};
/**
 * ChallengeParticipant findUniqueOrThrow
 */
export type ChallengeParticipantFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ChallengeParticipant to fetch.
     */
    where: Prisma.ChallengeParticipantWhereUniqueInput;
};
/**
 * ChallengeParticipant findFirst
 */
export type ChallengeParticipantFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ChallengeParticipant to fetch.
     */
    where?: Prisma.ChallengeParticipantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChallengeParticipants to fetch.
     */
    orderBy?: Prisma.ChallengeParticipantOrderByWithRelationInput | Prisma.ChallengeParticipantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ChallengeParticipants.
     */
    cursor?: Prisma.ChallengeParticipantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChallengeParticipants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChallengeParticipants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ChallengeParticipants.
     */
    distinct?: Prisma.ChallengeParticipantScalarFieldEnum | Prisma.ChallengeParticipantScalarFieldEnum[];
};
/**
 * ChallengeParticipant findFirstOrThrow
 */
export type ChallengeParticipantFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ChallengeParticipant to fetch.
     */
    where?: Prisma.ChallengeParticipantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChallengeParticipants to fetch.
     */
    orderBy?: Prisma.ChallengeParticipantOrderByWithRelationInput | Prisma.ChallengeParticipantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ChallengeParticipants.
     */
    cursor?: Prisma.ChallengeParticipantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChallengeParticipants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChallengeParticipants.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ChallengeParticipants.
     */
    distinct?: Prisma.ChallengeParticipantScalarFieldEnum | Prisma.ChallengeParticipantScalarFieldEnum[];
};
/**
 * ChallengeParticipant findMany
 */
export type ChallengeParticipantFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which ChallengeParticipants to fetch.
     */
    where?: Prisma.ChallengeParticipantWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ChallengeParticipants to fetch.
     */
    orderBy?: Prisma.ChallengeParticipantOrderByWithRelationInput | Prisma.ChallengeParticipantOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ChallengeParticipants.
     */
    cursor?: Prisma.ChallengeParticipantWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ChallengeParticipants from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ChallengeParticipants.
     */
    skip?: number;
    distinct?: Prisma.ChallengeParticipantScalarFieldEnum | Prisma.ChallengeParticipantScalarFieldEnum[];
};
/**
 * ChallengeParticipant create
 */
export type ChallengeParticipantCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a ChallengeParticipant.
     */
    data: Prisma.XOR<Prisma.ChallengeParticipantCreateInput, Prisma.ChallengeParticipantUncheckedCreateInput>;
};
/**
 * ChallengeParticipant createMany
 */
export type ChallengeParticipantCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ChallengeParticipants.
     */
    data: Prisma.ChallengeParticipantCreateManyInput | Prisma.ChallengeParticipantCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ChallengeParticipant createManyAndReturn
 */
export type ChallengeParticipantCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: Prisma.ChallengeParticipantSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: Prisma.ChallengeParticipantOmit<ExtArgs> | null;
    /**
     * The data used to create many ChallengeParticipants.
     */
    data: Prisma.ChallengeParticipantCreateManyInput | Prisma.ChallengeParticipantCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChallengeParticipantIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ChallengeParticipant update
 */
export type ChallengeParticipantUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a ChallengeParticipant.
     */
    data: Prisma.XOR<Prisma.ChallengeParticipantUpdateInput, Prisma.ChallengeParticipantUncheckedUpdateInput>;
    /**
     * Choose, which ChallengeParticipant to update.
     */
    where: Prisma.ChallengeParticipantWhereUniqueInput;
};
/**
 * ChallengeParticipant updateMany
 */
export type ChallengeParticipantUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ChallengeParticipants.
     */
    data: Prisma.XOR<Prisma.ChallengeParticipantUpdateManyMutationInput, Prisma.ChallengeParticipantUncheckedUpdateManyInput>;
    /**
     * Filter which ChallengeParticipants to update
     */
    where?: Prisma.ChallengeParticipantWhereInput;
    /**
     * Limit how many ChallengeParticipants to update.
     */
    limit?: number;
};
/**
 * ChallengeParticipant updateManyAndReturn
 */
export type ChallengeParticipantUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChallengeParticipant
     */
    select?: Prisma.ChallengeParticipantSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ChallengeParticipant
     */
    omit?: Prisma.ChallengeParticipantOmit<ExtArgs> | null;
    /**
     * The data used to update ChallengeParticipants.
     */
    data: Prisma.XOR<Prisma.ChallengeParticipantUpdateManyMutationInput, Prisma.ChallengeParticipantUncheckedUpdateManyInput>;
    /**
     * Filter which ChallengeParticipants to update
     */
    where?: Prisma.ChallengeParticipantWhereInput;
    /**
     * Limit how many ChallengeParticipants to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChallengeParticipantIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ChallengeParticipant upsert
 */
export type ChallengeParticipantUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the ChallengeParticipant to update in case it exists.
     */
    where: Prisma.ChallengeParticipantWhereUniqueInput;
    /**
     * In case the ChallengeParticipant found by the `where` argument doesn't exist, create a new ChallengeParticipant with this data.
     */
    create: Prisma.XOR<Prisma.ChallengeParticipantCreateInput, Prisma.ChallengeParticipantUncheckedCreateInput>;
    /**
     * In case the ChallengeParticipant was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ChallengeParticipantUpdateInput, Prisma.ChallengeParticipantUncheckedUpdateInput>;
};
/**
 * ChallengeParticipant delete
 */
export type ChallengeParticipantDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which ChallengeParticipant to delete.
     */
    where: Prisma.ChallengeParticipantWhereUniqueInput;
};
/**
 * ChallengeParticipant deleteMany
 */
export type ChallengeParticipantDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ChallengeParticipants to delete
     */
    where?: Prisma.ChallengeParticipantWhereInput;
    /**
     * Limit how many ChallengeParticipants to delete.
     */
    limit?: number;
};
/**
 * ChallengeParticipant without action
 */
export type ChallengeParticipantDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
export {};
//# sourceMappingURL=ChallengeParticipant.d.ts.map