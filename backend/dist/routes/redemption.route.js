"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const redemption_controller_1 = require("../controllers/redemption.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken);
router.get('/', redemption_controller_1.getUserRedemptions);
router.post('/:id/fulfill', (0, auth_middleware_1.authorize)('ADMIN'), redemption_controller_1.fulfillRedemptionRequest);
exports.default = router;
//# sourceMappingURL=redemption.route.js.map