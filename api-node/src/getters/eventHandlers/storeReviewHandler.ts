import prisma from '~/prisma';

export interface StoreReviewResult {
  success: boolean;
  message?: string;
}

export async function handleStoreReviewEvent(
  userId: string,
): Promise<StoreReviewResult> {
  try {
    await prisma.user.update({
      where: {
        matomo_id: userId,
      },
      data: {
        asked_for_review: { increment: 1 }, // TODO FIXME: `asked_for_review` should be rename to `triggered_manually_from_app`
        asked_for_review_latest_at: new Date(),
      },
    });

    return { success: true };
  } catch (error) {
    // L'utilisateur n'existe plus, c'est un cas normal
    console.log(
      `[EVENT] User ${userId} not found for STORE_REVIEW event - skipping update`,
    );
    return {
      success: false,
      message: `User ${userId} not found for STORE_REVIEW event - skipping update`,
    };
  }
}
