import {
  AlertStatusEnum,
  IndicatorsSlugEnum,
  type Municipality,
} from '@prisma/client';
import prisma from '~/prisma';
import { sendAlertNotification } from '~/utils/notifications/alert';
import { PollenRow } from './processing';


export async function checkIfPollensDataAlreadyExists(
  diffusionDate: Date,
): Promise<boolean> {
  const existingPollens = await prisma.pollenAllergyRisk.count({
    where: {
      diffusion_date: diffusionDate,
    },
  });

  return existingPollens > 0;
}


export async function loadMunicipalities(): Promise<Municipality[]> {
  return await prisma.municipality.findMany();
}

export async function insertPollensData(
  pollensRows: Array<PollenRow>,
): Promise<number> {
  let results = 0;

  for (const pollensRowByMunicipality of pollensRows) {
    await prisma.pollenAllergyRisk
      .create({
        data: pollensRowByMunicipality,
      })
      .then(async (pollensRow) => {
        results++;
        if (
          pollensRow.alert_status ===
          AlertStatusEnum.ALERT_NOTIFICATION_NOT_SENT_YET
        ) {
          await handleAlertNotification(pollensRow);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return results;
}


export async function handleAlertNotification(pollensRow: any): Promise<void> {
  const alertSent = await sendAlertNotification(
    IndicatorsSlugEnum.pollen_allergy,
    pollensRow,
  );

  await prisma.pollenAllergyRisk.update({
    where: {
      id: pollensRow.id,
    },
    data: {
      alert_status: alertSent
        ? AlertStatusEnum.ALERT_NOTIFICATION_SENT
        : AlertStatusEnum.ALERT_NOTIFICATION_ERROR,
    },
  });
}
