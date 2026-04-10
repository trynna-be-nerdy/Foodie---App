"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enqueueChallengeTracking = enqueueChallengeTracking;
const challengeTracking_service_1 = require("./challengeTracking.service");
function enqueueChallengeTracking(userId, restaurantId, metadata) {
    setImmediate(() => {
        (0, challengeTracking_service_1.trackChallengeProgress)(userId, restaurantId, metadata).catch((error) => {
            console.error('Challenge tracking job failed:', error);
        });
    });
}
//# sourceMappingURL=challengeJob.service.js.map