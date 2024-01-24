import { type IndicatorsSlugEnum } from '@prisma/client';
import { getCellContentFromGoogleSheet } from '~/service/google-sheet';
import prisma from '~/prisma';

type RecommandationsFromGoogleSheet = {
  range: string;
  majorDimension: 'ROWS';
  values: string[][];
};

export async function getRecommandationsFromGoogleSheet() {
  const sheetName = 'reco_list';
  const recosSheet = (await getCellContentFromGoogleSheet({
    sheetName,
    cellRange: 'A2:E1200',
  })) as unknown as RecommandationsFromGoogleSheet;
  for (const value of recosSheet.values) {
    const recommandation_id = value[0];
    const recommandation_content = value[1];
    const indicator = value[2] as IndicatorsSlugEnum;
    const indicator_values = value[3]
      .split(',')
      .map((indicator_value) => indicator_value.trim());
    const type_weather_alert = value[4];

    for (const indicator_value of indicator_values) {
      await prisma.recommandation.upsert({
        where: {
          unique_key: `${recommandation_id}_${indicator}_${indicator_values.join(
            '-',
          )}_${indicator_value}`,
        },
        create: {
          unique_key: `${recommandation_id}_${indicator}_${indicator_values.join(
            '-',
          )}_${indicator_value}`,
          recommandation_id,
          recommandation_content,
          indicator,
          indicator_value: parseInt(indicator_value, 10),
          type_weather_alert,
        },
        update: {
          recommandation_content,
        },
      });
    }
  }
  console.log('Recommandations upserted');
}
