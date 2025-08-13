import { upsertByMatomoId, updateUser, bodyHasProperty, extractUpdateData } from '../../user.service';
import prisma from '../../../prisma';

// Mock Prisma
jest.mock('../../../prisma', () => ({
  user: {
    upsert: jest.fn(),
    findMany: jest.fn(),
    updateMany: jest.fn(),
  },
}));

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('upsertByMatomoId', () => {
    it('should create or update user with matomo_id', async () => {
      const mockUser = { id: '1', matomo_id: '1234567890123456' };
      (prisma.user.upsert as jest.Mock).mockResolvedValue(mockUser);

      const result = await upsertByMatomoId('1234567890123456');

      expect(result).toEqual(mockUser);
      expect(prisma.user.upsert).toHaveBeenCalledWith({
        where: { matomo_id: '1234567890123456' },
        update: { matomo_id: '1234567890123456' },
        create: { matomo_id: '1234567890123456' },
      });
    });
  });

  describe('updateUser', () => {
    const mockMatomoId = '1234567890123456';
    const mockHeaders = {
      appversion: '1.0.0',
      appbuild: '1',
      appdevice: 'ios',
    };

    it('should update user with provided data and headers', async () => {
      const updateData = {
        municipality_insee_code: '75056',
        municipality_name: 'Paris',
      };

      const mockUpdatedUser = {
        id: '1',
        matomo_id: mockMatomoId,
        ...updateData,
        ...mockHeaders,
      };

      (prisma.user.upsert as jest.Mock).mockResolvedValue(mockUpdatedUser);
      (prisma.user.findMany as jest.Mock).mockResolvedValue([]);

      const result = await updateUser(mockMatomoId, updateData, mockHeaders);

      expect(result).toEqual(mockUpdatedUser);
      expect(prisma.user.upsert).toHaveBeenCalledWith({
        where: { matomo_id: mockMatomoId },
        update: { ...mockHeaders, ...updateData },
        create: { matomo_id: mockMatomoId, ...mockHeaders, ...updateData },
      });
    });

    it('should handle push token cleanup when updating', async () => {
      const updateData = {
        push_notif_token: 'new_token_123',
      };

      const mockUpdatedUser = {
        id: '1',
        matomo_id: mockMatomoId,
        push_notif_token: 'new_token_123',
        ...mockHeaders,
      };

      const oldUsers = [
        { id: '2', push_notif_token: 'new_token_123' },
        { id: '3', push_notif_token: 'new_token_123' },
      ];

      (prisma.user.upsert as jest.Mock).mockResolvedValue(mockUpdatedUser);
      (prisma.user.findMany as jest.Mock).mockResolvedValue(oldUsers);

      await updateUser(mockMatomoId, updateData, mockHeaders);

      expect(prisma.user.updateMany).toHaveBeenCalledWith({
        where: { id: { in: ['2', '3'] } },
        data: {
          push_notif_token: 'DELETED_new_token_123',
          deleted_at: expect.any(Date),
          deleted_because: expect.stringContaining('push_notif_token taken by a more recent user'),
        },
      });
    });
  });

  describe('bodyHasProperty', () => {
    it('should return true when property exists', () => {
      const body = { test: 'value', nested: { key: 'value' } };
      
      expect(bodyHasProperty(body, 'test')).toBe(true);
      expect(bodyHasProperty(body, 'nested')).toBe(true);
    });

    it('should return false when property does not exist', () => {
      const body = { test: 'value' };
      
      expect(bodyHasProperty(body, 'missing')).toBe(false);
      expect(bodyHasProperty(body, '')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(bodyHasProperty({}, 'test')).toBe(false);
      expect(bodyHasProperty(null as any, 'test')).toBe(false);
      expect(bodyHasProperty(undefined as any, 'test')).toBe(false);
    });
  });

  describe('extractUpdateData', () => {
    it('should extract valid fields from request body', () => {
      const body = {
        municipality_insee_code: '75056',
        municipality_name: 'Paris',
        notifications_preference: ['morning', 'evening'],
        invalid_field: 'should_be_ignored',
      };

      const result = extractUpdateData(body);

      expect(result).toEqual({
        municipality_insee_code: '75056',
        municipality_name: 'Paris',
        notifications_preference: ['morning', 'evening'],
      });
    });

    it('should handle coordinates object', () => {
      const body = {
        coordinates: {
          lat: 48.8566,
          lon: 2.3522,
        },
      };

      const result = extractUpdateData(body);

      expect(result.coordinates).toEqual({
        lat: 48.8566,
        lon: 2.3522,
      });
    });

    it('should return empty object for empty body', () => {
      const result = extractUpdateData({});
      expect(result).toEqual({});
    });

    it('should ignore undefined values', () => {
      const body = {
        municipality_insee_code: '75056',
        municipality_name: undefined,
        notifications_preference: null,
      };

      const result = extractUpdateData(body);

      expect(result).toEqual({
        municipality_insee_code: '75056',
      });
    });
  });
});
