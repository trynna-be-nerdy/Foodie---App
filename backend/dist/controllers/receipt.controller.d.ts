import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { AuthenticatedRequest } from '../types';
interface ReceiptUploadRequest extends AuthenticatedRequest {
    file?: Express.Multer.File;
}
export declare const upload: multer.Multer;
export declare function scanReceiptHandler(req: ReceiptUploadRequest, res: Response, next: NextFunction): Promise<void>;
export declare function getReceiptById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
export declare function getReceiptHistoryHandler(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
export declare function updateReceiptHandler(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void>;
export declare function getRestaurantsForReceipt(req: Request, res: Response, next: NextFunction): Promise<void>;
export {};
//# sourceMappingURL=receipt.controller.d.ts.map