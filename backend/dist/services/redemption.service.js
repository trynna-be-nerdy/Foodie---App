"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fulfillRedemption = fulfillRedemption;
exports.failRedemption = failRedemption;
const database_service_1 = require("./database.service");
const tango_service_1 = require("./tango.service");
const DEFAULT_REWARD_ID = process.env.TANGO_DEFAULT_REWARD_ID || '';
async function fulfillRedemption(redemptionId) {
    const redemption = await database_service_1.prisma.redemption.findUnique({
        where: { id: redemptionId },
        include: {
            user: { select: { id: true, email: true, name: true } },
        },
    });
    if (!redemption) {
        throw new Error('Redemption not found');
    }
    if (redemption.status !== 'PENDING') {
        return;
    }
    if (redemption.rewardType !== 'GIFT_CARD') {
        throw new Error('Only gift card redemptions are supported');
    }
    const rewardId = redemption.catalogItemId || DEFAULT_REWARD_ID;
    if (!rewardId) {
        throw new Error('Missing Tango reward ID');
    }
    const recipientEmail = redemption.deliveryEmail || redemption.user.email;
    const recipientName = redemption.user.name || 'Foodie Member';
    const tangoOrder = await (0, tango_service_1.createTangoGiftCardOrder)({
        rewardId,
        amount: redemption.dollarValue,
        recipient: { name: recipientName, email: recipientEmail },
        referenceId: redemption.id,
    });
    await database_service_1.prisma.redemption.update({
        where: { id: redemption.id },
        data: {
            status: 'COMPLETED',
            tangoOrderId: tangoOrder.orderId,
            giftCardCode: tangoOrder.cardNumber,
            giftCardPin: tangoOrder.cardPin,
            expirationDate: tangoOrder.expirationDate ? new Date(tangoOrder.expirationDate) : null,
            deliveryEmail: recipientEmail,
        },
    });
}
async function failRedemption(redemptionId) {
    await database_service_1.prisma.redemption.update({
        where: { id: redemptionId },
        data: { status: 'FAILED' },
    });
}
//# sourceMappingURL=redemption.service.js.map