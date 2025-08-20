import type { RequestWithMatomoEvent } from '~/types/request';
import { WebhookService } from '~/utils/webhook';

export interface FirstTimeLaunchResult {
  success: boolean;
  message?: string;
}

export async function handleFirstTimeLaunchEvent(
  userId: string,
  req: RequestWithMatomoEvent,
): Promise<FirstTimeLaunchResult> {
  try {
    await WebhookService.sendToMattermost(req);
    return { success: true };
  } catch (error) {
    const safeUserId =
      typeof userId === 'string'
        ? userId.replace(/[\r\n]/g, '')
        : String(userId);
    console.error(
      '[EVENT] Error sending first time launch webhook for user %s:',
      safeUserId,
      error,
    );
    return {
      success: false,
      message: `Error sending first time launch webhook for user ${safeUserId}`,
    };
  }
}
