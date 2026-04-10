"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controller_1 = require("../controllers/webhook.controller");
const router = (0, express_1.Router)();
// Stripe webhook requires raw body for signature verification
// This middleware must be before any body parsing
router.post('/stripe', (0, express_1.raw)({ type: 'application/json' }), webhook_controller_1.handleStripeWebhook);
exports.default = router;
//# sourceMappingURL=webhook.route.js.map