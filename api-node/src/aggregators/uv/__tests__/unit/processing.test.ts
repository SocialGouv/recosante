import { AlertStatusEnum, DataAvailabilityEnum } from '@prisma/client';
import type { Municipality } from '@prisma/client';
import {
  UVDataPoint,
  UVDataByInseeCode,
  parseGribData,
  mapUVDataToMunicipalities,
  createUnavailableUVRow,
  createAvailableUVRow,
  createUVRowsForMunicipalities,
} from '../../processing';
import { capture } from '~/third-parties/sentry';
import { AlertStatusThresholdEnum } from '~/utils/alert_status';

// Mock des dépendances externes
jest.mock('~/third-parties/sentry', () => ({
  capture: jest.fn(),
}));

jest.mock('~/utils/alert_status', () => ({
  AlertStatusThresholdEnum: {
    INDICE_UV: 8,
  },
}));

describe('Fonctions de traitement des données UV', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('parseGribData', () => {
    it('Doit extraire correctement les données UV du fichier GRIB', async () => {
      // Données factices pour le test
      const mockBuffer = Buffer.from('mock data');

      // Appel de la fonction
      const result = await parseGribData(mockBuffer);

      // Vérifications
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      // Vérifier la structure des objets
      const firstPoint = result[0];
      expect(firstPoint).toHaveProperty('latitude');
      expect(firstPoint).toHaveProperty('longitude');
      expect(firstPoint).toHaveProperty('uv_j0');
      expect(firstPoint).toHaveProperty('uv_j1');
      expect(firstPoint).toHaveProperty('uv_j2');
      expect(firstPoint).toHaveProperty('uv_j3');
    });

    it('Doit capturer et propager les erreurs', async () => {
      // Ce test ne peut être implémenté qu'une fois le parsing GRIB réel en place
      // Il faudrait simuler une erreur dans le parsing
    });
  });

  describe('mapUVDataToMunicipalities', () => {
    it('Doit associer correctement les données UV aux communes', () => {
      // Données de test
      const mockUVDataPoints: UVDataPoint[] = [
        {
          latitude: 48.8566,
          longitude: 2.3522,
          uv_j0: 5,
          uv_j1: 6,
          uv_j2: 7,
          uv_j3: 6,
        },
        {
          latitude: 43.2965,
          longitude: 5.3698,
          uv_j0: 7,
          uv_j1: 8,
          uv_j2: 9,
          uv_j3: 8,
        },
      ];

      const mockMunicipalities = [
        {
          COM: '75056',
          COMPARENT: null,
          DEP: '75',
          REG: '11',
          EPCI: 'EPCI75',
          NCC: 'PARIS',
        },
        {
          COM: '13055',
          COMPARENT: null,
          DEP: '13',
          REG: '93',
          EPCI: 'EPCI13',
          NCC: 'MARSEILLE',
        },
      ] as Municipality[];

      // Appel de la fonction
      const result = mapUVDataToMunicipalities(
        mockUVDataPoints,
        mockMunicipalities,
      );

      // Vérifications
      expect(Object.keys(result).length).toBe(2);
      expect(result).toHaveProperty('75056');
      expect(result).toHaveProperty('13055');

      // Dans notre implémentation actuelle (association aléatoire), nous ne pouvons pas
      // vérifier le mapping exact, mais nous pouvons vérifier la structure
      expect(result['75056']).toHaveProperty('uv_j0');
      expect(result['75056']).toHaveProperty('uv_j1');
      expect(result['75056']).toHaveProperty('uv_j2');
      expect(result['75056']).toHaveProperty('uv_j3');
    });
  });

  describe('createUnavailableUVRow', () => {
    it('Doit créer un objet correct pour une commune sans données', () => {
      const mockMunicipality = {
        COM: '75056',
        COMPARENT: null,
        DEP: '75',
        REG: '11',
        EPCI: 'EPCI75',
        NCC: 'PARIS',
      } as Municipality;

      const diffusionDate = new Date('2023-06-01');
      const validityEnd = new Date('2023-06-04');

      const result = createUnavailableUVRow(
        mockMunicipality,
        diffusionDate,
        validityEnd,
      );

      expect(result.municipality_insee_code).toBe('75056');
      expect(result.diffusion_date).toEqual(diffusionDate);
      expect(result.validity_start).toEqual(diffusionDate);
      expect(result.validity_end).toEqual(validityEnd);
      expect(result.data_availability).toBe(DataAvailabilityEnum.NOT_AVAILABLE);
      expect(result.alert_status).toBe(AlertStatusEnum.NOT_ALERT_THRESHOLD);
    });
  });

  describe('createAvailableUVRow', () => {
    it('Doit créer un objet correct pour une commune avec données sans alerte', () => {
      const mockMunicipality = {
        COM: '75056',
        COMPARENT: null,
        DEP: '75',
        REG: '11',
        EPCI: 'EPCI75',
        NCC: 'PARIS',
      } as Municipality;

      const mockUVData = {
        uv_j0: 5, // En-dessous du seuil d'alerte
        uv_j1: 6,
        uv_j2: 7,
        uv_j3: 6,
      };

      const diffusionDate = new Date('2023-06-01');
      const validityEnd = new Date('2023-06-04');

      const result = createAvailableUVRow(
        mockMunicipality,
        mockUVData,
        diffusionDate,
        validityEnd,
      );

      expect(result.municipality_insee_code).toBe('75056');
      expect(result.diffusion_date).toEqual(diffusionDate);
      expect(result.validity_start).toEqual(diffusionDate);
      expect(result.validity_end).toEqual(validityEnd);
      expect(result.data_availability).toBe(DataAvailabilityEnum.AVAILABLE);
      expect(result.alert_status).toBe(AlertStatusEnum.NOT_ALERT_THRESHOLD);
      expect(result.uv_j0).toBe(5);
      expect(result.uv_j1).toBe(6);
      expect(result.uv_j2).toBe(7);
      expect(result.uv_j3).toBe(6);
    });

    it('Doit créer un objet correct pour une commune avec données avec alerte', () => {
      const mockMunicipality = {
        COM: '75056',
        COMPARENT: null,
        DEP: '75',
        REG: '11',
        EPCI: 'EPCI75',
        NCC: 'PARIS',
      } as Municipality;

      const mockUVData = {
        uv_j0: 10, // Au-dessus du seuil d'alerte
        uv_j1: 11,
        uv_j2: 9,
        uv_j3: 8,
      };

      const diffusionDate = new Date('2023-06-01');
      const validityEnd = new Date('2023-06-04');

      const result = createAvailableUVRow(
        mockMunicipality,
        mockUVData,
        diffusionDate,
        validityEnd,
      );

      expect(result.municipality_insee_code).toBe('75056');
      expect(result.diffusion_date).toEqual(diffusionDate);
      expect(result.data_availability).toBe(DataAvailabilityEnum.AVAILABLE);
      expect(result.alert_status).toBe(
        AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET,
      );
      expect(result.uv_j0).toBe(10);
    });
  });

  describe('createUVRowsForMunicipalities', () => {
    it('Doit créer des objets pour toutes les communes', () => {
      const mockMunicipalities = [
        {
          COM: '75056',
          COMPARENT: null,
          DEP: '75',
          REG: '11',
          EPCI: 'EPCI75',
          NCC: 'PARIS',
        },
        {
          COM: '13055',
          COMPARENT: null,
          DEP: '13',
          REG: '93',
          EPCI: 'EPCI13',
          NCC: 'MARSEILLE',
        },
        {
          COM: '69123',
          COMPARENT: null,
          DEP: '69',
          REG: '84',
          EPCI: 'EPCI69',
          NCC: 'LYON',
        },
      ] as Municipality[];

      const mockUVDataByInseeCode: UVDataByInseeCode = {
        '75056': {
          uv_j0: 5,
          uv_j1: 6,
          uv_j2: 7,
          uv_j3: 6,
        },
        '13055': {
          uv_j0: 8,
          uv_j1: 9,
          uv_j2: 10,
          uv_j3: 9,
        },
        // Pas de données pour Lyon
      };

      const diffusionDate = new Date('2023-06-01');
      const validityEnd = new Date('2023-06-04');

      const result = createUVRowsForMunicipalities(
        mockMunicipalities,
        mockUVDataByInseeCode,
        diffusionDate,
        validityEnd,
      );

      expect(result.uvRows.length).toBe(3);
      expect(result.missingData).toBe(1); // Pour Lyon

      // Vérifier que Paris et Marseille ont des données disponibles
      const paris = result.uvRows.find(
        (row) => row.municipality_insee_code === '75056',
      );
      const marseille = result.uvRows.find(
        (row) => row.municipality_insee_code === '13055',
      );
      const lyon = result.uvRows.find(
        (row) => row.municipality_insee_code === '69123',
      );

      expect(paris?.data_availability).toBe(DataAvailabilityEnum.AVAILABLE);
      expect(marseille?.data_availability).toBe(DataAvailabilityEnum.AVAILABLE);
      expect(lyon?.data_availability).toBe(DataAvailabilityEnum.NOT_AVAILABLE);
    });

    it('Doit utiliser les données de la commune parente si disponibles', () => {
      const mockMunicipalities = [
        {
          COM: '75101',
          COMPARENT: '75056', // Paris comme parent
          DEP: '75',
          REG: '11',
          EPCI: 'EPCI75',
          NCC: 'PARIS 1ER ARRDT',
        },
      ] as Municipality[];

      const mockUVDataByInseeCode: UVDataByInseeCode = {
        '75056': {
          uv_j0: 5,
          uv_j1: 6,
          uv_j2: 7,
          uv_j3: 6,
        },
      };

      const diffusionDate = new Date('2023-06-01');
      const validityEnd = new Date('2023-06-04');

      const result = createUVRowsForMunicipalities(
        mockMunicipalities,
        mockUVDataByInseeCode,
        diffusionDate,
        validityEnd,
      );

      expect(result.uvRows.length).toBe(1);
      expect(result.missingData).toBe(0);

      const paris1 = result.uvRows[0];
      expect(paris1.data_availability).toBe(DataAvailabilityEnum.AVAILABLE);
      expect(paris1.municipality_insee_code).toBe('75101');

      // Vérifier que les données sont bien présentes quand data_availability est AVAILABLE
      if (paris1.data_availability === DataAvailabilityEnum.AVAILABLE) {
        expect(paris1.uv_j0).toBe(5);
      }
    });
  });
});
