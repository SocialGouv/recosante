import { handleStoreReviewEvent } from '../../eventHandlers/storeReviewHandler';

// Mock Prisma
jest.mock('~/prisma', () => ({
  user: {
    update: jest.fn(),
  },
}));

const mockPrisma = jest.mocked(require('~/prisma'));

describe('storeReviewHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('handleStoreReviewEvent', () => {
    it('should successfully update user review data', async () => {
      mockPrisma.user.update.mockResolvedValue({ id: 1 });

      const result = await handleStoreReviewEvent('test-user-id');

      expect(result.success).toBe(true);
      expect(mockPrisma.user.update).toHaveBeenCalledWith({
        where: { matomo_id: 'test-user-id' },
        data: {
          asked_for_review: { increment: 1 },
          asked_for_review_latest_at: expect.any(Date),
        },
      });
    });

    it('should handle user not found gracefully', async () => {
      const error = new Error('User not found');
      mockPrisma.user.update.mockRejectedValue(error);

      const result = await handleStoreReviewEvent('test-user-id');

      expect(result.success).toBe(false);
      expect(result.message).toContain(
        'User test-user-id not found for STORE_REVIEW event',
      );
      expect(mockPrisma.user.update).toHaveBeenCalled();
    });

    it('should handle database errors gracefully', async () => {
      const error = new Error('Database connection failed');
      mockPrisma.user.update.mockRejectedValue(error);

      const result = await handleStoreReviewEvent('test-user-id');

      expect(result.success).toBe(false);
      expect(result.message).toContain(
        'User test-user-id not found for STORE_REVIEW event',
      );
    });
  });
});
