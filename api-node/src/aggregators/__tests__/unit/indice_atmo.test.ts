import { getAtmoIndicatorForDate } from '../../indice_atmo';
import dayjs from 'dayjs';

global.fetch = jest.fn();

jest.mock('~/prisma', () => ({
  __esModule: true,
  default: {
    indiceAtmospheric: {
      upsert: jest.fn(),
    },
  },
}));

jest.mock('~/third-parties/sentry', () => ({
  capture: jest.fn(),
}));

describe('IndiceAtmo Aggregator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAtmoIndicatorForDate', () => {
    it('should handle empty API response gracefully', async () => {
      // Mock une réponse vide de l'API Atmo
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(''),
      });


      await expect(
        getAtmoIndicatorForDate('fake-token', dayjs(), false),
      ).resolves.not.toThrow();
    });

    it('should handle malformed JSON response gracefully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve('{ invalid json'),
      });
      await expect(
        getAtmoIndicatorForDate('fake-token', dayjs(), false),
      ).resolves.not.toThrow();
    });

    it('should handle HTTP error responses gracefully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(
        getAtmoIndicatorForDate('fake-token', dayjs(), false),
      ).resolves.not.toThrow();
    });

    it('should handle null features in response gracefully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () =>
          Promise.resolve('{"type":"FeatureCollection","features":null}'),
      });
      await expect(
        getAtmoIndicatorForDate('fake-token', dayjs(), false),
      ).resolves.not.toThrow();
    });

    it('should handle valid API response successfully', async () => {
      const mockResponse = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: null,
            properties: {
              code_no2: 3,
              code_o3: 2,
              code_pm10: 4,
              code_pm25: 3,
              code_qual: 4,
              code_so2: 1,
              code_zone: '12345',
              coul_qual: '#FF0000',
              date_dif: '2024-01-16',
              date_ech: '2024-01-15',
              date_maj: '2024/01/16 12:11:49.728+01',
              epsg_reg: 'EPSG:3857',
              gml_id: 835197777,
              lib_qual: 'Médiocre',
              lib_zone: 'Test City',
              partition_field: '112024w3',
              source: 'test',
              type_zone: 'EPCI',
              x_reg: 650403.898030424,
              x_wgs84: 3.01999928628953,
              y_reg: 2403379.42595027,
              y_wgs84: 48.6270847202683,
            },
          },
        ],
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      });
      await expect(
        getAtmoIndicatorForDate('fake-token', dayjs(), false),
      ).resolves.not.toThrow();
    });
  });
});
