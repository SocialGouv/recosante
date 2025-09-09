import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';

const mockPrisma = {
  recommandation: {
    upsert: jest.fn(),
    findFirst: jest.fn(),
    findMany: jest.fn(),
    count: jest.fn(),
    deleteMany: jest.fn(),
  },
};

jest.mock('~/prisma', () => ({
  __esModule: true,
  default: mockPrisma,
}));

import { LocalRecommandationService } from '../../local-recommandations';

describe('LocalRecommandationService', () => {
  let service: LocalRecommandationService;

  beforeEach(() => {
    service = new LocalRecommandationService();
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await mockPrisma.recommandation.deleteMany();
  });

  describe('loadRecommandations', () => {
    it('should load recommandations from local JSON file', async () => {
      const result = await service.loadRecommandations();
      
      expect(result).toBeDefined();
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toHaveProperty('indicator');
      expect(result[0]).toHaveProperty('indicator_value');
      expect(result[0]).toHaveProperty('recommandation_content');
    });
  });

  describe('parseRecommandationRow', () => {
    it('should parse a valid recommandation row correctly', () => {
      const row = [
        'Indice UV',
        'indice_uv',
        'N/A',
        'N/A',
        'Risque nul et Faible (1 - 2)',
        '0,1,2',
        'Toute',
        'Toute',
        'Toute',
        'Oui, Non',
        'Oui, Non',
        'Oui, Non',
        'Pas de protection requise',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-'
      ];

      const result = service.parseRecommandationRow(row, 0);
      
      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        indicator: 'indice_uv',
        indicator_value: 0,
        type_weather_alert: 'N/A',
        seasons: ['Toute'],
        recommandation_content: 'Pas de protection requise',
        recommandation_id: '0000-0'
      });
    });

    it('should reject invalid indicators', () => {
      const row = [
        'Invalid Indicator',
        'invalid_indicator',
        'N/A',
        'N/A',
        'Test',
        '1',
        'Toute',
        'Toute',
        'Toute',
        'Oui, Non',
        'Oui, Non',
        'Oui, Non',
        'Test recommandation',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-'
      ];

      const result = service.parseRecommandationRow(row, 0);
      
      expect(result).toHaveLength(0);
    });

    it('should filter invalid seasons and default to Toute', () => {
      const row = [
        'Indice UV',
        'indice_uv',
        'N/A',
        'N/A',
        'Test',
        '1',
        'InvalidSeason,AnotherInvalid',
        'Toute',
        'Toute',
        'Oui, Non',
        'Oui, Non',
        'Oui, Non',
        'Test recommandation',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-'
      ];

      const result = service.parseRecommandationRow(row, 0);
      
      expect(result).toHaveLength(1);
      expect(result[0].seasons).toEqual(['Toute']);
    });

    it('should handle empty indicator values', () => {
      const row = [
        'Indice UV',
        'indice_uv',
        'N/A',
        'N/A',
        'Nul (no data)',
        '',
        'Toute',
        'Toute',
        'Toute',
        'Oui, Non',
        'Oui, Non',
        'Oui, Non',
        'Aucune donnée disponible',
        '-',
        '-',
        '-',
        '-',
        '-',
        '-'
      ];

      const result = service.parseRecommandationRow(row, 0);
      
      expect(result).toHaveLength(0);
    });

    it('should filter out empty recommandation contents', () => {
      const row = [
        'Indice UV',
        'indice_uv',
        'N/A',
        'N/A',
        'Test',
        '1',
        'Toute',
        'Toute',
        'Toute',
        'Oui, Non',
        'Oui, Non',
        'Oui, Non',
        'Valid recommandation',
        '-',
        '',
        'Another valid one',
        '-',
        '-',
        '-'
      ];

      const result = service.parseRecommandationRow(row, 0);
      
      expect(result).toHaveLength(2);
      expect(result[0].recommandation_content).toBe('Valid recommandation');
      expect(result[1].recommandation_content).toBe('Another valid one');
    });
  });

  describe('saveRecommandations', () => {
    it('should save recommandations to database', async () => {
      const recommandations = [
        {
          indicator: 'indice_uv' as const,
          indicator_value: 1,
          type_weather_alert: 'N/A',
          seasons: ['Toute'],
          recommandation_content: 'Test recommandation',
          recommandation_id: 'test-1'
        }
      ];

      await service.saveRecommandations(recommandations);

      expect(mockPrisma.recommandation.upsert).toHaveBeenCalledWith({
        where: { unique_key: expect.any(String) },
        create: expect.objectContaining({
          recommandation_id: 'test-1',
          recommandation_content: 'Test recommandation',
        }),
        update: {
          recommandation_content: 'Test recommandation',
        },
      });
    });

    it('should upsert existing recommandations', async () => {
      const recommandations = [
        {
          indicator: 'indice_uv' as const,
          indicator_value: 1,
          type_weather_alert: 'N/A',
          seasons: ['Toute'],
          recommandation_content: 'Original content',
          recommandation_id: 'test-1'
        }
      ];

      await service.saveRecommandations(recommandations);

      const updatedRecommandations = [
        {
          ...recommandations[0],
          recommandation_content: 'Updated content'
        }
      ];

      await service.saveRecommandations(updatedRecommandations);

      expect(mockPrisma.recommandation.upsert).toHaveBeenCalledTimes(2);
      expect(mockPrisma.recommandation.upsert).toHaveBeenLastCalledWith({
        where: { unique_key: expect.any(String) },
        create: expect.objectContaining({
          recommandation_id: 'test-1',
          recommandation_content: 'Updated content',
        }),
        update: {
          recommandation_content: 'Updated content',
        },
      });
    });

    it('should handle multiple recommandations concurrently', async () => {
      const recommandations = [
        {
          indicator: 'indice_uv' as const,
          indicator_value: 1,
          type_weather_alert: 'N/A',
          seasons: ['Toute'],
          recommandation_content: 'Test 1',
          recommandation_id: 'test-concurrent-1'
        },
        {
          indicator: 'indice_atmospheric' as const,
          indicator_value: 2,
          type_weather_alert: 'N/A',
          seasons: ['Printemps'],
          recommandation_content: 'Test 2',
          recommandation_id: 'test-concurrent-2'
        }
      ];

      await service.saveRecommandations(recommandations);

      expect(mockPrisma.recommandation.upsert).toHaveBeenCalledTimes(2);
      expect(mockPrisma.recommandation.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: expect.objectContaining({
            recommandation_id: 'test-concurrent-1',
          }),
        })
      );
      expect(mockPrisma.recommandation.upsert).toHaveBeenCalledWith(
        expect.objectContaining({
          create: expect.objectContaining({
            recommandation_id: 'test-concurrent-2',
          }),
        })
      );
    });
  });

  describe('syncRecommandations', () => {
    it('should load and save all recommandations', async () => {
      await service.syncRecommandations();

      expect(mockPrisma.recommandation.upsert).toHaveBeenCalled();
    });
  });
});
