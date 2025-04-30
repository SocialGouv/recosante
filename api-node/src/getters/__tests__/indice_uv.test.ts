import { getIndiceUvFromMunicipalityAndDate } from '../indice_uv';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';
import { IndicatorsSlugEnum } from '@prisma/client';
import dayjs from 'dayjs';

jest.mock('~/prisma', () => ({
  recommandation: {
    findMany: jest
      .fn()
      .mockResolvedValue([
        { recommandation_content: 'Use sunscreen' },
        { recommandation_content: 'Wear a hat' },
      ]),
  },
  indiceUv: {
    findFirst: jest.fn(),
  },
  municipality: {
    findUnique: jest.fn(),
  },
}));

jest.mock('~/third-parties/sentry', () => ({
  capture: jest.fn(),
}));

describe('getIndiceUvFromMunicipalityAndDate', () => {
  it('should return an empty indicator if no data is available', async () => {
    (prisma.indiceUv.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.municipality.findUnique as jest.Mock).mockResolvedValue(null);

    const result = await getIndiceUvFromMunicipalityAndDate({
      municipality_insee_code: '12345',
      date_UTC_ISO: dayjs().utc().toISOString(),
    });

    expect(result.slug).toBe(IndicatorsSlugEnum.indice_uv);
    expect(result.j0.summary.value).toBeNull();
    expect(capture).toHaveBeenCalledWith(
      '[INDICE UV] New insee code with unavailable data',
      expect.any(Object),
    );
  });

  it('should return a valid indicator with recommendations', async () => {
    (prisma.indiceUv.findFirst as jest.Mock).mockResolvedValue({
      id: '1',
      uv_j0: 5,
      uv_j1: 6,
      validity_start: new Date(),
      validity_end: new Date(),
      diffusion_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      municipality_insee_code: '12345',
    });

    const result = await getIndiceUvFromMunicipalityAndDate({
      municipality_insee_code: '12345',
      date_UTC_ISO: dayjs().utc().toISOString(),
    });

    expect(result.slug).toBe(IndicatorsSlugEnum.indice_uv);
    expect(result.j0.summary.value).toBe(5);
    expect(result.j0.summary.recommendations).toEqual([
      'Use sunscreen',
      'Wear a hat',
    ]);
  });
});
