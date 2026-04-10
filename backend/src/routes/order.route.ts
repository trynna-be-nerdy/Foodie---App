import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import {
  createOrder,
  confirmOrder,
  getOrder,
  getOrderHistory,
  updateOrderStatus,
  cancelOrder,
  trackOrder,
  getRestaurantMenu,
} from '../controllers/order.controller';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Order CRUD
router.post('/', createOrder);
router.get('/history', getOrderHistory);
router.get('/:id', getOrder);
router.post('/:id/confirm', confirmOrder);
router.put('/:id/status', updateOrderStatus);
router.post('/:id/cancel', cancelOrder);
router.get('/:id/track', trackOrder);

// Menu endpoint (under orders for ordering flow)
router.get('/menu/:restaurantId', getRestaurantMenu);

export default router;
