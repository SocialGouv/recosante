import {
  AlertStatusEnum,
  DataAvailabilityEnum,
} from '@prisma/client';
// Importation séparée du type Municipality
import type { Municipality } from '@prisma/client';
import {
  organizePollensDataByInseeCode,
  createPollensRowsForMunicipalities,
  createUnavailablePollenRow,
  createAvailablePollenRow,
} from '../../processing';
import { validatePollensDataRow } from '../../validation';
import { capture } from '~/third-parties/sentry';
import type { PollensAPIProperties, PollensByCodeZone } from '~/types/api/pollens';

// Helper pour les tests ajoutant les champs manquants requis
function createTestData(mockData: any[]) {
  return mockData.map(item => ({
    ...item,
    properties: {
      ...item.properties,
      pollen_resp: item.properties.pollen_resp || 'AUCUN',
    }
  })) as { type: string; geometry: null; properties: PollensAPIProperties }[];
}

// Mock des dépendances externes
jest.mock('../../validation', () => ({
  validatePollensDataRow: jest.fn(),
}));

jest.mock('~/third-parties/sentry', () => ({
  capture: jest.fn(),
}));

jest.mock('~/utils/alert_status', () => ({
  AlertStatusThresholdEnum: {
    POLLENS: 4,
  },
}));

describe('Fonctions de traitement des données de pollens', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('organizePollensDataByInseeCode', () => {
    it('Tri des données correct par code INSEE pour les communes', () => {
      const mockData = [
        {
          type: 'Feature',
          geometry: null,
          properties: {
            aasqa: 'ATMO',
            date_maj: '2023-06-01',
            alerte: false,
            code_zone: '75056',
            type_zone: 'commune',
            date_dif: '2023-06-01',
            date_ech: '2023-06-01',
            lib_qual: 'Moyen',
            lib_zone: 'Paris',
            source: 'RNSA',
            code_qual: 3,
            code_gram: 3,
          },
        },
        {
          type: 'Feature',
          geometry: null,
          properties: {
            aasqa: 'ATMO',
            date_maj: '2023-06-01',
            alerte: false,
            code_zone: '69123',
            type_zone: 'commune',
            date_dif: '2023-06-01',
            date_ech: '2023-06-01',
            lib_qual: 'Faible',
            lib_zone: 'Lyon',
            source: 'RNSA',
            code_qual: 2,
            code_gram: 2,
          },
        },
        {
          type: 'Feature',
          geometry: null,
          properties: {
            aasqa: 'ATMO',
            date_maj: '2023-06-01',
            alerte: false,
            code_zone: '13',
            type_zone: 'departement', // Non commune, doit être ignoré
            date_dif: '2023-06-01',
            date_ech: '2023-06-01',
            lib_qual: 'Élevé',
            lib_zone: 'Bouches-du-Rhône',
            source: 'RNSA',
            code_qual: 4,
            code_gram: 4,
          },
        },
      ];

      const result = organizePollensDataByInseeCode(createTestData(mockData));

      expect(result).toHaveProperty('75056');
      expect(result).toHaveProperty('69123');
      expect(result).not.toHaveProperty('13'); // Département, ne devrait pas être inclus
      expect(Object.keys(result).length).toBe(2);
      expect(result['75056'].code_qual).toBe(3);
      expect(result['69123'].code_qual).toBe(2);
    });

    it('Gestion correcte erreurs de validation', () => {
      (validatePollensDataRow as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Validation error');
      });

      const mockData = [
        {
          type: 'Feature',
          geometry: null,
          properties: {
            aasqa: 'ATMO',
            date_maj: '2023-06-01',
            alerte: false,
            code_zone: '75056',
            type_zone: 'commune',
            date_dif: '2023-06-01',
            date_ech: '2023-06-01',
            lib_qual: 'Moyen',
            lib_zone: 'Paris',
            source: 'RNSA',
            code_qual: 3,
            code_gram: 3,
          },
        },
      ];

      const result = organizePollensDataByInseeCode(createTestData(mockData));

      expect(capture).toHaveBeenCalled();
      expect(Object.keys(result).length).toBe(0);
    });

    it('devrait ignorer les entrées sans code INSEE', () => {
      const mockData = [
        {
          type: 'Feature',
          geometry: null,
          properties: {
            aasqa: 'ATMO',
            date_maj: '2023-06-01',
            alerte: false,
            code_zone: '', // Code vide
            type_zone: 'commune',
            date_dif: '2023-06-01',
            date_ech: '2023-06-01',
            lib_qual: 'Moyen',
            lib_zone: 'Paris',
            source: 'RNSA',
            code_qual: 3,
            code_gram: 3,
          },
        },
      ];

      const result = organizePollensDataByInseeCode(createTestData(mockData));

      expect(capture).toHaveBeenCalled();
      expect(Object.keys(result).length).toBe(0);
    });
  });

  describe('createPollensRowsForMunicipalities', () => {
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
        COM: '69123',
        COMPARENT: null,
        DEP: '69',
        REG: '84',
        EPCI: 'EPCI69',
        NCC: 'LYON',
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

    const mockPollensByInseeCode: Record<string, PollensByCodeZone> = {
      75056: {
        aasqa: 'ATMO',
        date_maj: '2023-06-01',
        alerte: false,
        code_zone: '75056',
        type_zone: 'commune',
        date_dif: '2023-06-01',
        date_ech: '2023-06-01',
        lib_qual: 'Moyen',
        lib_zone: 'Paris',
        source: 'RNSA',
        code_qual: 3,
        code_gram: 3,
        pollen_resp: 'GRAMINEES',
      },
      69123: {
        aasqa: 'ATMO',
        date_maj: '2023-06-01',
        alerte: false,
        code_zone: '69123',
        type_zone: 'commune',
        date_dif: '2023-06-01',
        date_ech: '2023-06-01',
        lib_qual: 'Faible',
        lib_zone: 'Lyon',
        source: 'RNSA',
        code_qual: 2,
        code_gram: 2,
        pollen_resp: 'GRAMINEES',
      },
    };

    it('Création correcte des objets pour toutes les communes', () => {
      const diffusionDate = new Date('2023-06-01');
      const validityEnd = new Date('2023-06-08');

      const result = createPollensRowsForMunicipalities(
        mockMunicipalities,
        mockPollensByInseeCode,
        diffusionDate,
        validityEnd,
      );

      expect(result.pollensRows.length).toBe(3);
      expect(result.missingData).toBe(1); // Pour Marseille (13055)

      const paris = result.pollensRows.find(
        (row) => row.municipality_insee_code === '75056',
      );
      const lyon = result.pollensRows.find(
        (row) => row.municipality_insee_code === '69123',
      );
      const marseille = result.pollensRows.find(
        (row) => row.municipality_insee_code === '13055',
      );

      expect(paris?.data_availability).toBe(DataAvailabilityEnum.AVAILABLE);
      expect(lyon?.data_availability).toBe(DataAvailabilityEnum.AVAILABLE);
      expect(marseille?.data_availability).toBe(DataAvailabilityEnum.NOT_AVAILABLE);
    });

    it('Utilisation des données de la commune parente si disponibles', () => {
      const mockMunicipalitiesWithParent = [
        {
          COM: '75100',
          COMPARENT: '75056', // Paris comme parent
          DEP: '75',
          REG: '11',
          EPCI: 'EPCI75',
          NCC: 'COMMUNE_AVEC_PARENT',
        },
      ] as Municipality[];

      const diffusionDate = new Date('2023-06-01');
      const validityEnd = new Date('2023-06-08');

      const result = createPollensRowsForMunicipalities(
        mockMunicipalitiesWithParent,
        mockPollensByInseeCode,
        diffusionDate,
        validityEnd,
      );

      expect(result.pollensRows.length).toBe(1);
      expect(result.missingData).toBe(0);

      const communeAvecParent = result.pollensRows[0];
      expect(communeAvecParent.data_availability).toBe(DataAvailabilityEnum.AVAILABLE);
      expect(communeAvecParent.municipality_insee_code).toBe('75100');
      expect(communeAvecParent.total).toBe(3); // Code de Paris
    });
  });

  describe('createUnavailablePollenRow', () => {
    it('Création correcte d\'un objet pour données non disponibles', () => {
      const mockMunicipality: Municipality = {
          COM: '13055',
          COMPARENT: null,
          DEP: '13',
          REG: '93',
          EPCI: 'EPCI13',
          NCC: 'MARSEILLE',
          TYPECOM: '',
          CTCD: null,
          ARR: null,
          CAN: null,
          LIBEPCI: null,
          TNCC: null,
          NCCENR: null,
          LIBELLE: null,
          bathing_water_sites: 0,
          created_at: new Date(),
          updated_at: new Date(),
      };

      const diffusionDate = new Date('2023-06-01');
      const validityEnd = new Date('2023-06-08');

      const result = createUnavailablePollenRow(
        mockMunicipality,
        diffusionDate,
        validityEnd,
      );

      expect(result.municipality_insee_code).toBe('13055');
      expect(result.diffusion_date).toEqual(diffusionDate);
      expect(result.validity_start).toEqual(diffusionDate);
      expect(result.validity_end).toEqual(validityEnd);
      expect(result.data_availability).toBe(DataAvailabilityEnum.NOT_AVAILABLE);
      expect(result.alert_status).toBe(AlertStatusEnum.NOT_ALERT_THRESHOLD);
    });
  });

  describe('createAvailablePollenRow', () => {
    it('Création correcte d\'un objet pour données disponibles SANS alerte', () => {
      const mockMunicipality: Municipality = {
          COM: '75056',
          COMPARENT: null,
          DEP: '75',
          REG: '11',
          EPCI: 'EPCI75',
          NCC: 'PARIS',
          TYPECOM: '',
          CTCD: null,
          ARR: null,
          CAN: null,
          LIBEPCI: null,
          TNCC: null,
          NCCENR: null,
          LIBELLE: null,
          bathing_water_sites: 0,
          created_at:  new Date(),
          updated_at: new Date()
      }

      const mockPollenData: PollensByCodeZone = {
        aasqa: 'ATMO',
        date_maj: '2023-06-01',
        alerte: false,
        code_zone: '75056',
        type_zone: 'commune',
        date_dif: '2023-06-01',
        date_ech: '2023-06-01',
        lib_qual: 'Moyen',
        lib_zone: 'Paris',
        source: 'RNSA',
        code_qual: 3, // En-dessous du seuil d'alerte
        code_gram: 3,
        pollen_resp: 'GRAMINEES',
      };

      const diffusionDate = new Date('2023-06-01');
      const validityEnd = new Date('2023-06-08');

      const result = createAvailablePollenRow(
        mockMunicipality,
        mockPollenData,
        diffusionDate,
        validityEnd,
      );

      expect(result.municipality_insee_code).toBe('75056');
      expect(result.diffusion_date).toEqual(new Date(mockPollenData.date_maj));
      expect(result.validity_start).toEqual(diffusionDate);
      expect(result.validity_end).toEqual(validityEnd);
      expect(result.data_availability).toBe(DataAvailabilityEnum.AVAILABLE);
      expect(result.alert_status).toBe(AlertStatusEnum.NOT_ALERT_THRESHOLD);
      expect(result.total).toBe(3);
    });

    it('Création correcte d\'un objet pour données disponibles AVEC alerte', () => {
      const mockMunicipality: Municipality = {
        COM: '75056',
        COMPARENT: null,
        DEP: '75',
        REG: '11',
        EPCI: 'EPCI75',
        NCC: 'PARIS',
        TYPECOM: '',
        CTCD: null,
        ARR: null,
        CAN: null,
        LIBEPCI: null,
        TNCC: null,
        NCCENR: null,
        LIBELLE: null,
        bathing_water_sites: 0,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const mockPollenData: PollensByCodeZone = {
        aasqa: 'ATMO',
        date_maj: '2023-06-01',
        alerte: true,
        code_zone: '75056',
        type_zone: 'commune',
        date_dif: '2023-06-01',
        date_ech: '2023-06-01',
        lib_qual: 'Élevé',
        lib_zone: 'Paris',
        source: 'RNSA',
        code_qual: 5, // Au-dessus du seuil d'alerte
        code_gram: 4,
        code_cyp: 5,
        pollen_resp: 'GRAMINEES',
      };

      const diffusionDate = new Date('2023-06-01');
      const validityEnd = new Date('2023-06-08');

      const result = createAvailablePollenRow(
        mockMunicipality,
        mockPollenData,
        diffusionDate,
        validityEnd,
      );

      expect(result.municipality_insee_code).toBe('75056');
      expect(result.data_availability).toBe(DataAvailabilityEnum.AVAILABLE);
      expect(result.alert_status).toBe(AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET);
      expect(result.total).toBe(5);
      expect(result.graminees).toBe(4);
      expect(result.cypres).toBe(5);
    });
  });
});
