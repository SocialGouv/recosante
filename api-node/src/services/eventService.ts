import type { RequestWithMatomoEvent } from '~/types/request';
import { 
  handleStoreReviewEvent, 
  handleAppOpenEvent, 
  handleFirstTimeLaunchEvent 
} from '~/getters/eventHandlers';

export interface EventResult {
  success: boolean;
  askForReview?: boolean;
  message?: string;
}

export class EventService {
  static async processEvent(req: RequestWithMatomoEvent): Promise<EventResult> {
    const { event, userId } = req.body;

    // Si pas d'userId, on retourne directement
    if (!userId) {
      return { success: true };
    }

    // Gestion des différents types d'événements
    if (event.category === 'STORE_REVIEW' && event.action === 'TRIGGERED_FROM_SETTINGS') {
      return await handleStoreReviewEvent(userId);
    }

    if (event.category === 'APP' && event.action === 'APP_OPEN') {
      return await handleAppOpenEvent(userId);
    }

    if (event.category === 'APP' && event.action === 'FIRST_TIME_LAUNCH') {
      return await handleFirstTimeLaunchEvent(userId, req);
    }

    // Événement non géré
    return { success: true };
  }
}
