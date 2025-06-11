import { DataAvailabilityEnum, AlertStatusEnum, IndicatorsSlugEnum, type BathingWater, type Municipality, BathgWaterIdCarteEnum } from '@prisma/client';
import prisma from '~/prisma';
import { getBathingWaterFromMunicipalityAndDate, getBathingWaters } from '../../bathing_water';
import { BathingWaterNumberValueEnum, BathingWaterStatusEnum } from '~/types/api/bathing_water';
import { getBathingWaterSiteValueDerivedFromBathingWaterRow, getBathingWaterSummaryValue } from '~/utils/bathing_water/bathing_water';

// Mock des dépendances
jest.mock('~/prisma', () => ({
  __esModule: true,
  default: {
    $queryRaw: jest.fn(),
    municipality: {
      findUnique: jest.fn(),
    },
    recommandation: {
      findMany: jest.fn(),
    },
  },
}));

jest.mock('~/utils/bathing_water/bathing_water', () => ({
  buildBathingWaterUrl: jest.fn().mockReturnValue('https://example.com'),
  getBathingWaterLatestResultDate: jest.fn().mockReturnValue('2023-07-15T00:00:00.000Z'),
  getBathingWaterSiteValueDerivedFromBathingWaterRow: jest.fn(),
  getBathingWaterSummaryValue: jest.fn(),
}));

describe('Fonctions de traitement des eaux de baignade', () => {
  const createMockBathingWater = (id: string, name: string): BathingWater => ({
    id: id,
    id_site: id,
    name: name,
    municipality_insee_code: '75056',
    validity_start: new Date('2023-07-15'),
    validity_end: new Date('2023-07-22'),
    diffusion_date: new Date('2023-07-15'),
    data_availability: DataAvailabilityEnum.AVAILABLE,
    alert_status: AlertStatusEnum.NOT_ALERT_THRESHOLD,
    created_at: new Date(),
    updated_at: new Date(),
    consult_site_url: null,
    id_carte: BathgWaterIdCarteEnum.fra,
    isite: 'ISITE_1',
    dptddass: '75',
    result_date: new Date('2023-07-15'),
    result_value: null,
    current_year_grading: null,
    swimming_season_start: '2023-06-15',
    swimming_season_end: '2023-09-15',
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBathingWaters', () => {
    it('devrait retourner les données de baignade pour une municipalité', async () => {
      const expectedBathingWater = createMockBathingWater('site1', 'Plage 1');
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([expectedBathingWater]);

      const result = await getBathingWaters({
        municipality_insee_code: '75056',
        date_UTC_ISO: '2023-07-15T00:00:00.000Z',
      });

      expect(result).toEqual([expectedBathingWater]);
    });

    it('devrait retourner les données de la municipalité parente si disponibles', async () => {
      const expectedParentBathingWater = createMockBathingWater('parent_site', 'Plage Parent');
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([]);
      (prisma.municipality.findUnique as jest.Mock).mockResolvedValueOnce({
        COM: '75000',
        COMPARENT: '75056',
      });
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([expectedParentBathingWater]);

      const result = await getBathingWaters({
        municipality_insee_code: '75000',
        date_UTC_ISO: '2023-07-15T00:00:00.000Z',
      });

      expect(result).toEqual([expectedParentBathingWater]);
    });
  });

  describe('getBathingWaterFromMunicipalityAndDate', () => {
    beforeEach(() => {
      (prisma.recommandation.findMany as jest.Mock).mockResolvedValue([{
        recommandation_content: 'Recommandation test',
      }]);
    });

    it('devrait retourner null si pas de sites de baignade', async () => {
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce([]);
      (prisma.municipality.findUnique as jest.Mock).mockResolvedValueOnce({
        bathing_water_sites: 0,
      });

      const result = await getBathingWaterFromMunicipalityAndDate({
        municipality_insee_code: '75056',
        date_UTC_ISO: '2023-07-15T00:00:00.000Z',
      });

      expect(result).toBeNull();
    });

    it('devrait indiquer NO_DATA pour les sites hors saison', async () => {
      const mockBathingWaters = [createMockBathingWater('site1', 'Plage 1')];
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce(mockBathingWaters);
      (getBathingWaterSiteValueDerivedFromBathingWaterRow as jest.Mock)
        .mockReturnValue(BathingWaterNumberValueEnum.OFF_SEASON);
      (getBathingWaterSummaryValue as jest.Mock).mockReturnValue({
        value: BathingWaterNumberValueEnum.OFF_SEASON,
        status: BathingWaterStatusEnum.NO_DATA,
      });

      const result = await getBathingWaterFromMunicipalityAndDate({
        municipality_insee_code: '75056',
        date_UTC_ISO: '2023-07-15T00:00:00.000Z',
      });

      expect(result?.j0.summary.status).toBe(BathingWaterStatusEnum.NO_DATA);
      expect(result?.slug).toBe(IndicatorsSlugEnum.bathing_water);
    });

    it('devrait indiquer NO_DATA pour les sites interdits', async () => {
      const mockBathingWaters = [createMockBathingWater('site1', 'Plage 1')];
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce(mockBathingWaters);
      (getBathingWaterSiteValueDerivedFromBathingWaterRow as jest.Mock)
        .mockReturnValue(BathingWaterNumberValueEnum.PROHIBITION);
      (getBathingWaterSummaryValue as jest.Mock).mockReturnValue({
        value: BathingWaterNumberValueEnum.PROHIBITION,
        status: BathingWaterStatusEnum.NO_DATA,
      });

      const result = await getBathingWaterFromMunicipalityAndDate({
        municipality_insee_code: '75056',
        date_UTC_ISO: '2023-07-15T00:00:00.000Z',
      });

      expect(result?.j0.summary.status).toBe(BathingWaterStatusEnum.NO_DATA);
    });

    it('devrait indiquer NO_DATA pour les sites non classés', async () => {
      const mockBathingWaters = [createMockBathingWater('site1', 'Plage 1')];
      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce(mockBathingWaters);
      (getBathingWaterSiteValueDerivedFromBathingWaterRow as jest.Mock)
        .mockReturnValue(BathingWaterNumberValueEnum.UNRANKED_SITE);
      (getBathingWaterSummaryValue as jest.Mock).mockReturnValue({
        value: BathingWaterNumberValueEnum.UNRANKED_SITE,
        status: BathingWaterStatusEnum.NO_DATA,
      });

      const result = await getBathingWaterFromMunicipalityAndDate({
        municipality_insee_code: '75056',
        date_UTC_ISO: '2023-07-15T00:00:00.000Z',
      });

      expect(result?.j0.summary.status).toBe(BathingWaterStatusEnum.NO_DATA);
    });

    it('devrait combiner les recommandations pour les sites mixtes', async () => {
      const mockBathingWaters = [
        createMockBathingWater('site1', 'Plage 1'),
        createMockBathingWater('site2', 'Plage 2'),
      ];

      (prisma.$queryRaw as jest.Mock).mockResolvedValueOnce(mockBathingWaters);
      (getBathingWaterSiteValueDerivedFromBathingWaterRow as jest.Mock)
        .mockReturnValueOnce(BathingWaterNumberValueEnum.PROHIBITION)
        .mockReturnValueOnce(BathingWaterNumberValueEnum.GOOD);
      (getBathingWaterSummaryValue as jest.Mock)
        .mockReturnValueOnce({ value: BathingWaterNumberValueEnum.GOOD, status: BathingWaterStatusEnum.NO_DATA })
        .mockReturnValueOnce({ value: BathingWaterNumberValueEnum.PROHIBITION, status: BathingWaterStatusEnum.NO_DATA });
      
      (prisma.recommandation.findMany as jest.Mock)
        .mockResolvedValueOnce([{ recommandation_content: 'Recommandation pour site interdit' }])
        .mockResolvedValueOnce([{ recommandation_content: 'Recommandation pour site normal' }]);

      const result = await getBathingWaterFromMunicipalityAndDate({
        municipality_insee_code: '75056',
        date_UTC_ISO: '2023-07-15T00:00:00.000Z',
      });

      if (!result?.j0.summary.recommendations) {
        throw new Error('Les recommandations devraient être définies');
      }

      expect(result.j0.summary.recommendations).toEqual([
        'Recommandation pour site interdit',
        'Recommandation pour site normal'
      ]);
    });

    it('devrait rejeter les codes INSEE invalides', async () => {
      await expect(
        getBathingWaterFromMunicipalityAndDate({
          municipality_insee_code: '123', // Code INSEE invalide
          date_UTC_ISO: '2023-07-15T00:00:00.000Z',
        }),
      ).rejects.toThrow();
    });
  });
}); 