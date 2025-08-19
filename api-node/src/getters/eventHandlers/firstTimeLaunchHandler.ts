import type { RequestWithMatomoEvent } from '~/types/request';
import { WebhookService } from '~/utils/webhook';

export interface FirstTimeLaunchResult {
  success: boolean;
  message?: string;
}

export async function handleFirstTimeLaunchEvent(
  userId: string,
  req: RequestWithMatomoEvent
): Promise<FirstTimeLaunchResult> {
  try {
    const result = WebhookService.sendToMattermost(req);
    if (result && typeof result.then === 'function') {
      await result;
    }
    return { success: true };
  } catch (error) {
    console.error(`[EVENT] Error sending first time launch webhook for user ${userId}:`, error);
    return { 
      success: false, 
      message: `Error sending first time launch webhook for user ${userId}` 
    };
  }
}
