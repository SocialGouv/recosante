import {
  checkIfPollensDataAlreadyExists,
  loadMunicipalities,
  insertPollensData,
  handleAlertNotification,
} from '../../database';
import prisma from '~/prisma';
import {
  AlertStatusEnum,
  DataAvailabilityEnum,
  IndicatorsSlugEnum,
} from '@prisma/client';
import { sendAlertNotification } from '~/utils/notifications/alert';
import type { PollenRow } from '../../processing';

/**
 * Database URL defined in .env.test
 */

jest.mock('~/utils/notifications/alert', () => ({
  sendAlertNotification: jest.fn(),
}));

describe('Test pollen aggregation database functions', () => {
  const TEST_PREFIX = 'TEST_INTEGRATION_';
  let testDiffusionDate: Date;
  let testPollenRow: PollenRow;
  let testMunicipality: any;
  let createdRecordIds: string[] = [];

  beforeAll(async () => {
    await prisma.$connect();
    console.log(
      `Connected to database: ${
        process.env.DATABASE_URL?.includes('test') ? 'TEST' : 'PRODUCTION'
      }`,
    );

    const uniqueInseeCode = TEST_PREFIX + Date.now().toString();
    testMunicipality = await prisma.municipality.upsert({
      where: { COM: uniqueInseeCode },
      update: {},
      create: {
        COM: uniqueInseeCode,
        DEP: '99',
        REG: '99',
        NCC: 'TEST_MUNICIPALITY',
        TYPECOM: 'COM',
      },
    });
    console.log(`Created test municipality with code ${testMunicipality.COM}`);

    testDiffusionDate = new Date();
    testDiffusionDate.setHours(0, 0, 0, 0);

    testPollenRow = {
      diffusion_date: testDiffusionDate,
      validity_start: testDiffusionDate,
      validity_end: new Date(
        testDiffusionDate.getTime() + 7 * 24 * 60 * 60 * 1000,
      ),
      municipality_insee_code: testMunicipality.COM,
      data_availability: DataAvailabilityEnum.AVAILABLE,
      alert_status: AlertStatusEnum.NOT_ALERT_THRESHOLD,
      total: 3,
      graminees: 3,
    };
  });

  afterAll(async () => {
    try {
      for (const id of createdRecordIds) {
        await prisma.pollenAllergyRisk
          .delete({
            where: { id },
          })
          .catch(() => {
            console.log(`Note: Could not delete test record with ID ${id}`);
          });
      }

      if (testMunicipality?.COM) {
        await prisma.municipality
          .delete({
            where: { COM: testMunicipality.COM },
          })
          .catch((err) => {
            console.log(
              `Note: Could not delete test municipality: ${err.message}`,
            );
          });
      }
    } catch (error) {
      console.log('Note: Cleanup operations skipped due to constraints');
    } finally {
      await prisma.$disconnect();
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkIfPollensDataAlreadyExists', () => {
    it('Should return false when no data exists for the date', async () => {
      const newDate = new Date();
      newDate.setFullYear(1900);

      const result = await checkIfPollensDataAlreadyExists(newDate);

      expect(result).toBe(false);
    });

    it('Should return true when data exists for the date', async () => {
      const customDate = new Date(testDiffusionDate);
      customDate.setDate(customDate.getDate() + 1);

      const pollenData = await prisma.pollenAllergyRisk.create({
        data: {
          ...testPollenRow,
          diffusion_date: customDate,
        },
      });

      createdRecordIds.push(pollenData.id);

      const result = await checkIfPollensDataAlreadyExists(customDate);

      expect(result).toBe(true);
    });
  });

  describe('loadMunicipalities', () => {
    it('Should load municipalities from the database', async () => {
      const municipalities = await loadMunicipalities();

      expect(Array.isArray(municipalities)).toBe(true);

      if (municipalities.length > 0) {
        expect(municipalities[0]).toHaveProperty('COM');
        expect(municipalities[0]).toHaveProperty('DEP');
        expect(municipalities[0]).toHaveProperty('REG');
      }

      const found = municipalities.some((m) => m.COM === testMunicipality.COM);
      expect(found).toBe(true);
    });
  });

  describe('insertPollensData', () => {
    it('Should successfully insert pollen data and return the count', async () => {
      const uniqueDate = new Date(testDiffusionDate);
      uniqueDate.setMinutes(uniqueDate.getMinutes() + 1);

      const pollenRow: PollenRow = {
        ...testPollenRow,
        diffusion_date: uniqueDate,
      };

      const result = await insertPollensData([pollenRow]);

      expect(result).toBe(1);

      const savedData = await prisma.pollenAllergyRisk.findFirst({
        where: {
          municipality_insee_code: pollenRow.municipality_insee_code,
          diffusion_date: pollenRow.diffusion_date,
        },
      });

      expect(savedData).not.toBeNull();
      expect(savedData?.total).toBe(pollenRow.total);

      if (savedData) {
        createdRecordIds.push(savedData.id);
      }
    });

    it('Should handle alert notifications when alert threshold is reached', async () => {
      (sendAlertNotification as jest.Mock).mockResolvedValue(true);

      const uniqueDate = new Date(testDiffusionDate);
      uniqueDate.setMinutes(uniqueDate.getMinutes() + 2);

      const alertPollenRow: PollenRow = {
        ...testPollenRow,
        diffusion_date: uniqueDate,
        alert_status: AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET,
        total: 5,
        graminees: 5,
      };

      const result = await insertPollensData([alertPollenRow]);

      expect(result).toBe(1);

      expect(sendAlertNotification).toHaveBeenCalledWith(
        IndicatorsSlugEnum.pollen_allergy,
        expect.objectContaining({
          alert_status: AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET,
        }),
      );

      const savedData = await prisma.pollenAllergyRisk.findFirst({
        where: {
          municipality_insee_code: alertPollenRow.municipality_insee_code,
          diffusion_date: alertPollenRow.diffusion_date,
        },
      });

      expect(savedData).not.toBeNull();
      expect(savedData?.alert_status).toBe(
        AlertStatusEnum.ALERT_NOTIFICATION_SENT,
      );

      if (savedData) {
        createdRecordIds.push(savedData.id);
      }
    });
  });

  describe('handleAlertNotification', () => {
    it('Should update notification status to SENT on success', async () => {
      const uniqueDate = new Date(testDiffusionDate);
      uniqueDate.setMinutes(uniqueDate.getMinutes() + 3);

      const pollenRow = await prisma.pollenAllergyRisk.create({
        data: {
          ...testPollenRow,
          diffusion_date: uniqueDate,
          alert_status: AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET,
        },
      });

      createdRecordIds.push(pollenRow.id);

      (sendAlertNotification as jest.Mock).mockResolvedValue(true);

      await handleAlertNotification(pollenRow);

      const updatedRow = await prisma.pollenAllergyRisk.findUnique({
        where: {
          id: pollenRow.id,
        },
      });

      expect(updatedRow?.alert_status).toBe(
        AlertStatusEnum.ALERT_NOTIFICATION_SENT,
      );
    });

    it('Should update notification status to ERROR on failure', async () => {
      const uniqueDate = new Date(testDiffusionDate);
      uniqueDate.setMinutes(uniqueDate.getMinutes() + 4);

      const pollenRow = await prisma.pollenAllergyRisk.create({
        data: {
          ...testPollenRow,
          diffusion_date: uniqueDate,
          alert_status: AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET,
        },
      });

      createdRecordIds.push(pollenRow.id);

      (sendAlertNotification as jest.Mock).mockResolvedValue(false);

      await handleAlertNotification(pollenRow);

      const updatedRow = await prisma.pollenAllergyRisk.findUnique({
        where: {
          id: pollenRow.id,
        },
      });

      expect(updatedRow?.alert_status).toBe(
        AlertStatusEnum.ALERT_NOTIFICATION_ERROR,
      );
    });
  });
});
