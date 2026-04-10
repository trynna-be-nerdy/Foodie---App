"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const challenge_controller_1 = require("../controllers/challenge.controller");
const router = (0, express_1.Router)();
// Public routes (with optional auth for user-specific data)
router.get('/', auth_middleware_1.optionalAuth, challenge_controller_1.getChallenges);
router.get('/leaderboard', auth_middleware_1.optionalAuth, challenge_controller_1.getLeaderboard);
// Admin/restaurant owner routes
router.post('/', auth_middleware_1.authenticateToken, (0, auth_middleware_1.authorize)('ADMIN', 'RESTAURANT_OWNER'), challenge_controller_1.createChallenge);
// Authenticated routes
router.get('/user/achievements', auth_middleware_1.authenticateToken, challenge_controller_1.getUserAchievements);
router.get('/user/foodie-points', auth_middleware_1.authenticateToken, challenge_controller_1.getFoodiePoints);
// Challenge-specific routes
router.get('/:id', auth_middleware_1.optionalAuth, challenge_controller_1.getChallenge);
router.post('/:id/accept', auth_middleware_1.authenticateToken, challenge_controller_1.acceptChallenge);
router.get('/:id/progress', auth_middleware_1.authenticateToken, challenge_controller_1.getChallengeProgress);
exports.default = router;
//# sourceMappingURL=challenge.route.js.map