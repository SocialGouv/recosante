import { EventService } from '../eventService';
import type { RequestWithMatomoEvent } from '~/types/request';

// Mock handlers
jest.mock('~/getters/eventHandlers/storeReviewHandler', () => ({
  handleStoreReviewEvent: jest.fn(),
}));

jest.mock('~/getters/eventHandlers/appOpenHandler', () => ({
  handleAppOpenEvent: jest.fn(),
}));

jest.mock('~/getters/eventHandlers/firstTimeLaunchHandler', () => ({
  handleFirstTimeLaunchEvent: jest.fn(),
}));

const mockStoreReviewHandler = require('~/getters/eventHandlers/storeReviewHandler');
const mockAppOpenHandler = require('~/getters/eventHandlers/appOpenHandler');
const mockFirstTimeLaunchHandler = require('~/getters/eventHandlers/firstTimeLaunchHandler');

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
      } as RequestWithMatomoEvent;

      const result = await EventService.processEvent(mockReq);

      expect(result.success).toBe(true);
      expect(
        mockStoreReviewHandler.handleStoreReviewEvent,
      ).not.toHaveBeenCalled();
      expect(mockAppOpenHandler.handleAppOpenEvent).not.toHaveBeenCalled();
      expect(
        mockFirstTimeLaunchHandler.handleFirstTimeLaunchEvent,
      ).not.toHaveBeenCalled();
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
      } as RequestWithMatomoEvent;

      mockStoreReviewHandler.handleStoreReviewEvent.mockResolvedValue({
        success: true,
      });

      const result = await EventService.processEvent(mockReq);

      expect(result.success).toBe(true);
      expect(
        mockStoreReviewHandler.handleStoreReviewEvent,
      ).toHaveBeenCalledWith('test-user-id', mockReq);
    });

    it('should handle APP_OPEN event correctly', async () => {
      const mockReq = {
        body: {
          userId: 'test-user-id',
          event: { category: 'APP', action: 'APP_OPEN' },
        },
      } as RequestWithMatomoEvent;

      mockAppOpenHandler.handleAppOpenEvent.mockResolvedValue({
        success: true,
        askForReview: true,
      });

      const result = await EventService.processEvent(mockReq);

      expect(result.success).toBe(true);
      expect(mockAppOpenHandler.handleAppOpenEvent).toHaveBeenCalledWith(
        'test-user-id',
        mockReq,
      );
    });

    it('should handle FIRST_TIME_LAUNCH event correctly', async () => {
      const mockReq = {
        body: {
          userId: 'test-user-id',
          event: { category: 'APP', action: 'FIRST_TIME_LAUNCH' },
        },
      } as RequestWithMatomoEvent;

      mockFirstTimeLaunchHandler.handleFirstTimeLaunchEvent.mockResolvedValue({
        success: true,
      });

      const result = await EventService.processEvent(mockReq);

      expect(result.success).toBe(true);
      expect(
        mockFirstTimeLaunchHandler.handleFirstTimeLaunchEvent,
      ).toHaveBeenCalledWith('test-user-id', mockReq);
    });

    it('should return success for unknown events', async () => {
      const mockReq = {
        body: {
          userId: 'test-user-id',
          event: { category: 'UNKNOWN', action: 'UNKNOWN_ACTION' },
        },
      } as RequestWithMatomoEvent;

      const result = await EventService.processEvent(mockReq);

      expect(result.success).toBe(true);
      expect(
        mockStoreReviewHandler.handleStoreReviewEvent,
      ).not.toHaveBeenCalled();
      expect(mockAppOpenHandler.handleAppOpenEvent).not.toHaveBeenCalled();
      expect(
        mockFirstTimeLaunchHandler.handleFirstTimeLaunchEvent,
      ).not.toHaveBeenCalled();
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
      } as RequestWithMatomoEvent;

      mockStoreReviewHandler.handleStoreReviewEvent.mockResolvedValue({
        success: false,
        message: 'Handler failed',
      });

      const result = await EventService.processEvent(mockReq);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Handler failed');
    });
  });
});
