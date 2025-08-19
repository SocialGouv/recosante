import prisma from '~/prisma';
import { canAskReviewForUser } from '~/utils/user';

export interface AppOpenResult {
  success: boolean;
  askForReview: boolean;
  message?: string;
}

export async function handleAppOpenEvent(
  userId: string
): Promise<AppOpenResult> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        matomo_id: userId,
      },
    });

    if (!canAskReviewForUser(user)) {
      return { success: true, askForReview: false };
    }

    await prisma.user.update({
      where: {
        matomo_id: userId,
      },
      data: {
        asked_for_review_latest_at: new Date(),
      },
    });

    return { success: true, askForReview: true };
  } catch (error) {
    console.log(`[EVENT] User ${userId} not found for APP_OPEN event - skipping update`);
    return { 
      success: false, 
      askForReview: false,
      message: `User ${userId} not found for APP_OPEN event - skipping update` 
    };
  }
}
