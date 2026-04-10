"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @route   POST /api/v1/auth/signup
 * @desc    Register a new user
 * @access  Public
 */
router.post('/signup', auth_controller_1.signup);
/**
 * @route   POST /api/v1/auth/login
 * @desc    Login user and return tokens
 * @access  Public
 */
router.post('/login', auth_controller_1.login);
/**
 * @route   POST /api/v1/auth/refresh
 * @desc    Refresh access token using refresh token cookie
 * @access  Public (requires valid refresh token cookie)
 */
router.post('/refresh', auth_controller_1.refresh);
/**
 * @route   POST /api/v1/auth/logout
 * @desc    Logout user and invalidate refresh token
 * @access  Private
 */
router.post('/logout', auth_middleware_1.authenticate, auth_controller_1.logout);
/**
 * @route   POST /api/v1/auth/forgot-password
 * @desc    Send password reset email
 * @access  Public
 */
router.post('/forgot-password', auth_controller_1.forgotPassword);
/**
 * @route   POST /api/v1/auth/reset-password
 * @desc    Reset password using token
 * @access  Public (requires valid reset token)
 */
router.post('/reset-password', auth_controller_1.resetPassword);
exports.default = router;
//# sourceMappingURL=auth.route.js.map