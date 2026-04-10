import { Request, Response, NextFunction } from 'express';
export declare function scanQRCode(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getScanStatus(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getScanHistoryHandler(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function generateQR(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function setupQRForRestaurant(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getQRStats(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=qr.controller.d.ts.map