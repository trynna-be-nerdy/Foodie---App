interface TangoRecipient {
    name: string;
    email: string;
}
export declare function isTangoConfigured(): boolean;
export declare function createTangoGiftCardOrder(params: {
    rewardId: string;
    amount: number;
    recipient: TangoRecipient;
    referenceId: string;
}): Promise<{
    orderId: string | null;
    cardNumber: string | null;
    cardPin: string | null;
    expirationDate: string | null;
}>;
export {};
//# sourceMappingURL=tango.service.d.ts.map