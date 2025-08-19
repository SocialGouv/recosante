import { handleFirstTimeLaunchEvent } from '../firstTimeLaunchHandler';
import type { RequestWithMatomoEvent } from '~/types/request';

// Mock WebhookService
jest.mock('~/utils/webhook', () => ({
  WebhookService: {
    sendToMattermost: jest.fn(),
  },
}));

const mockWebhookService = require('~/utils/webhook');

describe('firstTimeLaunchHandler', () => {
  const mockReq = {
    body: {
      userId: 'test-user-id',
      event: {
        category: 'APP',
        action: 'FIRST_TIME_LAUNCH',
      },
    },
  } as RequestWithMatomoEvent;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('handleFirstTimeLaunchEvent', () => {
    it('should successfully send webhook to Mattermost', async () => {
      mockWebhookService.WebhookService.sendToMattermost.mockResolvedValue(undefined);

      const result = await handleFirstTimeLaunchEvent('test-user-id', mockReq);

      expect(result.success).toBe(true);
      expect(mockWebhookService.WebhookService.sendToMattermost).toHaveBeenCalledWith(mockReq);
    });

    it('should handle webhook errors gracefully', async () => {
      const error = new Error('Webhook failed');
      mockWebhookService.WebhookService.sendToMattermost.mockRejectedValue(error);

      const result = await handleFirstTimeLaunchEvent('test-user-id', mockReq);

      expect(result.success).toBe(false);
      expect(result.message).toContain('Error sending first time launch webhook for user test-user-id');
      expect(mockWebhookService.WebhookService.sendToMattermost).toHaveBeenCalledWith(mockReq);
    });
  });
});
