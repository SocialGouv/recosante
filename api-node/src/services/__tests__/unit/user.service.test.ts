import { updateUser } from '../../user.service';
import prisma from '~/prisma';

// Mock Prisma
jest.mock('~/prisma', () => ({
  user: {
    upsert: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
  },
}));
const mockPrisma = prisma as any;

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUser', () => {
    it('should update user successfully', async () => {
      const mockUser = {
        id: 1,
        matomo_id: 'test-matomo-id',
        granularity: 'city',
        municipality_insee_code: '12345',
        municipality_name: 'Test City',
        municipality_zip_code: '12345',
        udi: 'test-udi',
        push_notif_token: 'test-token',
        favorite_indicator: 'indice_atmospheric',
        notifications_preference: ['morning', 'evening'],
      };

      // Mock findMany pour retourner un tableau vide (pas de conflit de token)
      mockPrisma.user.findMany.mockResolvedValue([]);
      mockPrisma.user.upsert.mockResolvedValue(mockUser);

      const result = await updateUser(
        'test-matomo-id',
        {
          granularity: 'street',
          municipality_insee_code: '54321',
          municipality_name: 'New City',
          municipality_zip_code: '54321',
          udi: 'new-udi',
          push_notif_token: 'new-token',
          favorite_indicator: 'indice_uv',
          notifications_preference: ['morning'],
        },
        {},
      );

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.upsert).toHaveBeenCalledWith({
        where: { matomo_id: 'test-matomo-id' },
        update: {
          granularity: 'street',
          municipality_insee_code: '54321',
          municipality_name: 'New City',
          municipality_zip_code: '54321',
          udi: 'new-udi',
          push_notif_token: 'new-token',
          favorite_indicator: 'indice_uv',
          notifications_preference: ['morning'],
        },
        create: {
          matomo_id: 'test-matomo-id',
          granularity: 'street',
          municipality_insee_code: '54321',
          municipality_name: 'New City',
          municipality_zip_code: '54321',
          udi: 'new-udi',
          push_notif_token: 'new-token',
          favorite_indicator: 'indice_uv',
          notifications_preference: ['morning'],
        },
      });
    });

    it('should convert favorite_indicators array to favorite_indicator', async () => {
      const mockUser = {
        id: 1,
        matomo_id: 'test-matomo-id',
        favorite_indicator: 'indice_atmospheric',
      };

      mockPrisma.user.upsert.mockResolvedValue(mockUser);

      const result = await updateUser(
        'test-matomo-id',
        {
          favorite_indicators: [
            'indice_atmospheric',
            'pollen_allergy',
            'bathing_water',
          ],
        },
        {},
      );

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.upsert).toHaveBeenCalledWith({
        where: { matomo_id: 'test-matomo-id' },
        update: {
          favorite_indicator: 'indice_atmospheric', // Premier élément du tableau
        },
        create: {
          matomo_id: 'test-matomo-id',
          favorite_indicator: 'indice_atmospheric', // Premier élément du tableau
        },
      });
    });

    it('should handle favorite_indicators as single value', async () => {
      const mockUser = {
        id: 1,
        matomo_id: 'test-matomo-id',
        favorite_indicator: 'indice_uv',
      };

      mockPrisma.user.upsert.mockResolvedValue(mockUser);

      const result = await updateUser(
        'test-matomo-id',
        {
          favorite_indicators: 'indice_uv',
        },
        {},
      );

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.upsert).toHaveBeenCalledWith({
        where: { matomo_id: 'test-matomo-id' },
        update: {
          favorite_indicator: 'indice_uv',
        },
        create: {
          matomo_id: 'test-matomo-id',
          favorite_indicator: 'indice_uv',
        },
      });
    });

    it('should remove coordinates field before upsert', async () => {
      const mockUser = {
        id: 1,
        matomo_id: 'test-matomo-id',
      };

      mockPrisma.user.upsert.mockResolvedValue(mockUser);

      const result = await updateUser(
        'test-matomo-id',
        {
          coordinates: { lat: 48.8566, lon: 2.3522 },
          municipality_name: 'Paris',
        },
        {},
      );

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.upsert).toHaveBeenCalledWith({
        where: { matomo_id: 'test-matomo-id' },
        update: {
          municipality_name: 'Paris',
        },
        create: {
          matomo_id: 'test-matomo-id',
          municipality_name: 'Paris',
        },
      });
    });
  });
});
