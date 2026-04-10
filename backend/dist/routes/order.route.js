"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const order_controller_1 = require("../controllers/order.controller");
const router = (0, express_1.Router)();
// All routes require authentication
router.use(auth_middleware_1.authenticateToken);
// Order CRUD
router.post('/', order_controller_1.createOrder);
router.get('/history', order_controller_1.getOrderHistory);
router.get('/:id', order_controller_1.getOrder);
router.post('/:id/confirm', order_controller_1.confirmOrder);
router.put('/:id/status', order_controller_1.updateOrderStatus);
router.post('/:id/cancel', order_controller_1.cancelOrder);
router.get('/:id/track', order_controller_1.trackOrder);
// Menu endpoint (under orders for ordering flow)
router.get('/menu/:restaurantId', order_controller_1.getRestaurantMenu);
exports.default = router;
//# sourceMappingURL=order.route.js.map