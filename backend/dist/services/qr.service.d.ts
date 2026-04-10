export interface QRCodePayload {
    restaurantId: string;
    transactionId: string;
    amount: number;
    timestamp: number;
    signature: string;
}
export interface QRScanResult {
    success: boolean;
    scanId?: string;
    pointsEarned?: number;
    restaurantName?: string;
    error?: string;
    errorCode?: 'INVALID_SIGNATURE' | 'EXPIRED' | 'DUPLICATE' | 'RATE_LIMITED' | 'RESTAURANT_NOT_FOUND' | 'INVALID_FORMAT';
}
export declare function generateSignature(restaurantId: string, transactionId: string, amount: number, timestamp: number, secret: string): string;
export declare function verifySignature(payload: QRCodePayload, secret: string): boolean;
export declare function isQRCodeExpired(timestamp: number): boolean;
export declare function checkRateLimit(userId: string): Promise<boolean>;
export declare function incrementRateLimit(userId: string): Promise<void>;
export declare function getTodayScanCount(userId: string): Promise<number>;
export declare function processQRScan(userId: string, payload: QRCodePayload): Promise<QRScanResult>;
export declare function generateQRCodeData(restaurantId: string, transactionId: string, amount: number): Promise<QRCodePayload | null>;
export declare function generateQRSecret(): string;
export declare function getScanHistory(userId: string, limit?: number, offset?: number): Promise<{
    scans: any[];
    total: number;
}>;
//# sourceMappingURL=qr.service.d.ts.map