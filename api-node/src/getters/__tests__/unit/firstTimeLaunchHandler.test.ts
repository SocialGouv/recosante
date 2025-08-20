import { handleFirstTimeLaunchEvent } from '../../eventHandlers/firstTimeLaunchHandler';
import type { RequestWithMatomoEvent } from '~/types/request';

// Mock WebhookService
jest.mock('~/utils/webhook', () => ({
  WebhookService: {
    sendToMattermost: jest.fn(),
  },
}));

// Import du mock typé
import * as webhookService from '~/utils/webhook';
const mockWebhookService = webhookService as any;

describe('firstTimeLaunchHandler', () => {
  const mockReq = {
    body: {
      userId: 'test-user-id',
      event: {
        category: 'APP',
        action: 'FIRST_TIME_LAUNCH',
      },
    },
  } as unknown as RequestWithMatomoEvent;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('handleFirstTimeLaunchEvent', () => {
    it('should successfully send webhook to Mattermost', async () => {
      mockWebhookService.WebhookService.sendToMattermost.mockResolvedValue(
        undefined,
      );

      const result = await handleFirstTimeLaunchEvent('test-user-id', mockReq);

      expect(result.success).toBe(true);
      expect(
        mockWebhookService.WebhookService.sendToMattermost,
      ).toHaveBeenCalledWith(mockReq);
    });

    it('should handle webhook errors gracefully', async () => {
      const mockError = new Error('Webhook failed');
      mockWebhookService.WebhookService.sendToMattermost.mockRejectedValue(
        mockError,
      );

      const result = await handleFirstTimeLaunchEvent('test-user-id', mockReq);

      expect(result.success).toBe(false);
      expect(result.message).toContain(
        'Error sending first time launch webhook for user test-user-id',
      );
      expect(
        mockWebhookService.WebhookService.sendToMattermost,
      ).toHaveBeenCalledWith(mockReq);
    });
  });
});
