import { ReceiptStatus } from '../generated/prisma/enums';
export interface ExtractedReceiptData {
    restaurantName: string | null;
    restaurantNameConfidence: number;
    totalAmount: number | null;
    receiptDate: Date | null;
    lineItems: Array<{
        name: string;
        price: number;
    }>;
    rawText: string;
}
export interface ReceiptScanResult {
    receiptId: string;
    status: ReceiptStatus;
    extractedData: ExtractedReceiptData | null;
    matchedRestaurant: {
        id: string;
        name: string;
        confidence: number;
    } | null;
    pointsEarned: number;
    isDuplicate: boolean;
    error?: string;
}
export declare function generateImageHash(imageBuffer: Buffer): string;
export declare function checkDuplicateReceipt(userId: string, imageHash: string): Promise<{
    isDuplicate: boolean;
    existingReceiptId?: string;
}>;
export declare function extractTextFromImage(imageBuffer: Buffer): Promise<string>;
export declare function parseReceiptText(rawText: string): ExtractedReceiptData;
export declare function matchRestaurant(extractedName: string): Promise<{
    id: string;
    name: string;
    confidence: number;
} | null>;
export declare function calculatePoints(restaurantId: string, totalAmount: number): Promise<number>;
export declare function creditPoints(userId: string, restaurantId: string, points: number, receiptId: string, totalAmount: number): Promise<void>;
export declare function scanReceipt(userId: string, imageBuffer: Buffer, userProvidedRestaurantId?: string, userProvidedAmount?: number): Promise<ReceiptScanResult>;
export declare function getReceiptHistory(userId: string, limit?: number, offset?: number): Promise<{
    receipts: any[];
    total: number;
}>;
export declare function updateReceiptWithCorrections(receiptId: string, userId: string, restaurantId: string, totalAmount: number): Promise<ReceiptScanResult>;
//# sourceMappingURL=receipt.service.d.ts.map