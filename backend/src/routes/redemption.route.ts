import { Router } from 'express';
import { authenticateToken, authorize } from '../middleware/auth.middleware';
import { fulfillRedemptionRequest, getUserRedemptions } from '../controllers/redemption.controller';

const router = Router();

router.use(authenticateToken);

router.get('/', getUserRedemptions);
router.post('/:id/fulfill', authorize('ADMIN'), fulfillRedemptionRequest);

export default router;
