import { EventService } from '../../eventService';
import type { RequestWithMatomoEvent } from '~/types/request';

// Mock handlers
jest.mock('~/getters/eventHandlers', () => ({
  handleStoreReviewEvent: jest.fn(),
  handleAppOpenEvent: jest.fn(),
  handleFirstTimeLaunchEvent: jest.fn(),
}));

const mockHandlers = jest.mocked(require('~/getters/eventHandlers'));

describe('EventService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('processEvent', () => {
    it('should return success when no userId is provided', async () => {
      const mockReq = {
        body: {
          event: { category: 'APP', action: 'APP_OPEN' },
        },
      } as unknown as RequestWithMatomoEvent;

      const result = await EventService.processEvent(mockReq);

      expect(result.success).toBe(true);
      expect(mockHandlers.handleStoreReviewEvent).not.toHaveBeenCalled();
      expect(mockHandlers.handleAppOpenEvent).not.toHaveBeenCalled();
      expect(mockHandlers.handleFirstTimeLaunchEvent).not.toHaveBeenCalled();
    });

    it('should handle STORE_REVIEW event correctly', async () => {
      const mockReq = {
        body: {
          userId: 'test-user-id',
          event: {
            category: 'STORE_REVIEW',
            action: 'TRIGGERED_FROM_SETTINGS',
          },
        },
      } as unknown as RequestWithMatomoEvent;

      mockHandlers.handleStoreReviewEvent.mockResolvedValue({ success: true });

      const result = await EventService.processEvent(mockReq);

      expect(result.success).toBe(true);
      expect(mockHandlers.handleStoreReviewEvent).toHaveBeenCalledWith(
        'test-user-id',
      );
    });

    it('should handle APP_OPEN event correctly', async () => {
      const mockReq = {
        body: {
          userId: 'test-user-id',
          event: { category: 'APP', action: 'APP_OPEN' },
        },
      } as unknown as RequestWithMatomoEvent;

      mockHandlers.handleAppOpenEvent.mockResolvedValue({
        success: true,
        askForReview: true,
      });

      const result = await EventService.processEvent(mockReq);

      expect(result.success).toBe(true);
      expect(mockHandlers.handleAppOpenEvent).toHaveBeenCalledWith(
        'test-user-id',
      );
    });

    it('should handle FIRST_TIME_LAUNCH event correctly', async () => {
      const mockReq = {
        body: {
          userId: 'test-user-id',
          event: { category: 'APP', action: 'FIRST_TIME_LAUNCH' },
        },
      } as unknown as RequestWithMatomoEvent;

      mockHandlers.handleFirstTimeLaunchEvent.mockResolvedValue({
        success: true,
      });

      const result = await EventService.processEvent(mockReq);

      expect(result.success).toBe(true);
      expect(mockHandlers.handleFirstTimeLaunchEvent).toHaveBeenCalledWith(
        'test-user-id',
        mockReq,
      );
    });

    it('should return success for unknown events', async () => {
      const mockReq = {
        body: {
          userId: 'test-user-id',
          event: { category: 'UNKNOWN', action: 'UNKNOWN_ACTION' },
        },
      } as unknown as RequestWithMatomoEvent;

      const result = await EventService.processEvent(mockReq);

      expect(result.success).toBe(true);
      expect(mockHandlers.handleStoreReviewEvent).not.toHaveBeenCalled();
      expect(mockHandlers.handleAppOpenEvent).not.toHaveBeenCalled();
      expect(mockHandlers.handleFirstTimeLaunchEvent).not.toHaveBeenCalled();
    });

    it('should handle handler errors gracefully', async () => {
      const mockReq = {
        body: {
          userId: 'test-user-id',
          event: {
            category: 'STORE_REVIEW',
            action: 'TRIGGERED_FROM_SETTINGS',
          },
        },
      } as unknown as RequestWithMatomoEvent;

      mockHandlers.handleStoreReviewEvent.mockResolvedValue({
        success: false,
        message: 'Handler failed',
      });

      const result = await EventService.processEvent(mockReq);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Handler failed');
    });
  });
});
