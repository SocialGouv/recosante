import prisma from '~/prisma';
import { canAskReviewForUser } from '~/utils/user';
import type { RequestWithMatomoEvent } from '~/types/request';

export interface AppOpenResult {
  success: boolean;
  askForReview: boolean;
  message?: string;
}

export async function handleAppOpenEvent(
  userId: string,
  req: RequestWithMatomoEvent,
): Promise<AppOpenResult> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        matomo_id: userId,
      },
    });

    if (!(await canAskReviewForUser(user))) {
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
    const sanitizedUserId =
      typeof userId === 'string'
        ? userId.replace(/[\r\n]/g, '')
        : String(userId);
    console.log(
      `[EVENT] User ${sanitizedUserId} not found for APP_OPEN event - skipping update`,
    );
    return {
      success: false,
      askForReview: false,
      message: `User ${sanitizedUserId} not found for APP_OPEN event - skipping update`,
    };
  }
}
