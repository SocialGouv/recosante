import {
  AlertStatusEnum,
  DataAvailabilityEnum,
  type Municipality,
  PrismaClient,
} from '@prisma/client';
import {
  getMunicipalities,
  checkExistingUVData,
  insertUVData,
} from '../../database';
import {
  clearDatabase,
  setupTestMunicipality,
} from '../../../__tests__/helpers/test-helpers';

// Créer un client Prisma spécifique pour les tests
const prismaTest = new PrismaClient({
  datasourceUrl: process.env.DATABASE_URL_TEST || process.env.DATABASE_URL,
});

// Log de la base de données utilisée pour les tests
console.log(
  `Utilisation de la base de données: ${
    process.env.DATABASE_URL_TEST || 'default database'
  }`,
);

describe("Tests d'intégration pour le module database UV", () => {
  // Une municipalité de test à utiliser dans les tests
  let testMunicipality: Municipality;

  // Configurer l'environnement de test avant tous les tests
  beforeAll(async () => {
    // Se connecter à la base de données
    await prismaTest.$connect();

    // Créer une municipalité de test si nécessaire
    testMunicipality = await setupTestMunicipality(prismaTest);
  });

  // Nettoyer la base de données après tous les tests
  afterAll(async () => {
    // Supprimer les données de test
    await clearDatabase(prismaTest);

    // Fermer la connexion à la base de données
    await prismaTest.$disconnect();
  });

  // Nettoyer avant chaque test
  beforeEach(async () => {
    // Supprimer toutes les entrées d'indice UV
    await prismaTest.indiceUv.deleteMany({});
  });

  describe('getMunicipalities', () => {
    it('Doit récupérer toutes les communes de la base de données', async () => {
      // Appel de la fonction avec notre client Prisma de test
      const municipalities = await getMunicipalities(prismaTest);

      // Vérifier que les municipalités sont récupérées
      expect(Array.isArray(municipalities)).toBe(true);
      expect(municipalities.length).toBeGreaterThan(0);

      // Vérifier que notre municipalité de test est incluse
      const foundTestMunicipality = municipalities.find(
        (m) => m.COM === testMunicipality.COM,
      );
      expect(foundTestMunicipality).toBeDefined();
    });
  });

  describe('checkExistingUVData', () => {
    it("Doit retourner 0 quand aucune donnée n'existe pour une date", async () => {
      const today = new Date();

      // Appel de la fonction
      const count = await checkExistingUVData(today, prismaTest);

      // Vérification
      expect(count).toBe(0);
    });

    it('Doit retourner le nombre correct lorsque des données existent', async () => {
      const today = new Date();

      // Créer quelques données de test
      await prismaTest.indiceUv.create({
        data: {
          municipality_insee_code: testMunicipality.COM,
          diffusion_date: today,
          validity_start: today,
          validity_end: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000),
          data_availability: DataAvailabilityEnum.AVAILABLE,
          alert_status: AlertStatusEnum.NOT_ALERT_THRESHOLD,
          uv_j0: 5,
          uv_j1: 6,
          uv_j2: 7,
          uv_j3: 8,
        },
      });

      // Appel de la fonction
      const count = await checkExistingUVData(today, prismaTest);

      // Vérification
      expect(count).toBe(1);
    });
  });

  describe('insertUVData', () => {
    it('Doit insérer correctement les données UV', async () => {
      const today = new Date();
      const validityEnd = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);

      const uvRows = [
        {
          municipality_insee_code: testMunicipality.COM,
          diffusion_date: today,
          validity_start: today,
          validity_end: validityEnd,
          data_availability: DataAvailabilityEnum.AVAILABLE,
          alert_status: AlertStatusEnum.NOT_ALERT_THRESHOLD,
          uv_j0: 5,
          uv_j1: 6,
          uv_j2: 7,
          uv_j3: 8,
        },
      ];

      // Appel de la fonction
      const insertedCount = await insertUVData(uvRows, prismaTest);

      // Vérification
      expect(insertedCount).toBe(1);

      // Vérifier que les données sont bien en base
      const savedData = await prismaTest.indiceUv.findMany({
        where: {
          municipality_insee_code: testMunicipality.COM,
          diffusion_date: today,
        },
      });

      expect(savedData.length).toBe(1);
      expect(savedData[0].uv_j0).toBe(5);
      expect(savedData[0].uv_j1).toBe(6);
      expect(savedData[0].uv_j2).toBe(7);
      expect(savedData[0].uv_j3).toBe(8);
    });

    // Tester le cas d'alerte nécessiterait de mocker sendAlertNotification
    // Ce test serait plus complexe et nécessiterait une configuration supplémentaire
  });
});
