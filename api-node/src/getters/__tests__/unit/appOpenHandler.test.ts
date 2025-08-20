import { handleAppOpenEvent } from '../../eventHandlers/appOpenHandler';
import type { RequestWithMatomoEvent } from '~/types/request';

// Mock Prisma
jest.mock('~/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    update: jest.fn(),
  },
}));

// Mock user utility
jest.mock('~/utils/user', () => ({
  canAskReviewForUser: jest.fn(),
}));

// Import des mocks typés
import prisma from '~/prisma';
import * as userUtils from '~/utils/user';
const mockPrisma = prisma as any;
const mockUserUtils = userUtils as any;

describe('appOpenHandler', () => {
  const mockReq = {
    body: {
      userId: 'test-user-id',
      event: {
        category: 'APP',
        action: 'APP_OPEN',
      },
    },
  } as unknown as RequestWithMatomoEvent;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('handleAppOpenEvent', () => {
    it('should return askForReview: false when user cannot ask for review', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        matomo_id: 'test-user-id',
      });
      mockUserUtils.canAskReviewForUser.mockReturnValue(false);

      const result = await handleAppOpenEvent('test-user-id', mockReq);

      expect(result.success).toBe(true);
      expect(result.askForReview).toBe(false);
      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });

    it('should successfully update user and return askForReview: true', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        matomo_id: 'test-user-id',
      });
      mockUserUtils.canAskReviewForUser.mockReturnValue(true);
      mockPrisma.user.update.mockResolvedValue({ id: 1 });

      const result = await handleAppOpenEvent('test-user-id', mockReq);

      expect(result.success).toBe(true);
      expect(result.askForReview).toBe(true);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { matomo_id: 'test-user-id' },
        data: {
          asked_for_review_latest_at: expect.any(Date),
        },
      });
    });

    it('should handle user not found gracefully', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockUserUtils.canAskReviewForUser.mockReturnValue(false);

      const result = await handleAppOpenEvent('test-user-id', mockReq);

      expect(result.success).toBe(true);
      expect(result.askForReview).toBe(false);
      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });

    it('should handle database update errors gracefully', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        matomo_id: 'test-user-id',
      });
      mockUserUtils.canAskReviewForUser.mockReturnValue(true);
      mockPrisma.user.update.mockRejectedValue(new Error('Update failed'));

      const result = await handleAppOpenEvent('test-user-id', mockReq);

      expect(result.success).toBe(false);
      expect(result.askForReview).toBe(false);
      expect(result.message).toContain(
        'User test-user-id not found for APP_OPEN event',
      );
    });
  });
});
