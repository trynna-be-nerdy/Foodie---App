import { prisma } from './database.service';
import { createTangoGiftCardOrder } from './tango.service';

const DEFAULT_REWARD_ID = process.env.TANGO_DEFAULT_REWARD_ID || '';

export async function fulfillRedemption(redemptionId: string): Promise<void> {
  const redemption = await prisma.redemption.findUnique({
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

  const tangoOrder = await createTangoGiftCardOrder({
    rewardId,
    amount: redemption.dollarValue,
    recipient: { name: recipientName, email: recipientEmail },
    referenceId: redemption.id,
  });

  await prisma.redemption.update({
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

export async function failRedemption(redemptionId: string): Promise<void> {
  await prisma.redemption.update({
    where: { id: redemptionId },
    data: { status: 'FAILED' },
  });
}
