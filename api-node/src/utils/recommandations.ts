import type { SeasonEnum, IndicatorsSlugEnum } from '@prisma/client';
import { getCellContentFromGoogleSheet } from '~/service/google-sheet';
import prisma from '~/prisma';
import { capture } from '~/third-parties/sentry';

type RangeFromGoogleSheet = {
  range: string;
  majorDimension: 'ROWS';
  values: string[][];
};

export async function getRecommandationsFromGoogleSheet() {
  const sheetName = 'reco_curated';
  // get column indexes first
  const range = (await getCellContentFromGoogleSheet({
    sheetName,
    cellRange: 'A1:P1',
  })) as unknown as RangeFromGoogleSheet;
  try {
    const columns = range.values[0];
    try {
      const indicatorSlugIndex = columns.findIndex(
        (column) => column === 'Indicateur_key',
      );
      const indicatorValuesIndex = columns.findIndex(
        (column) => column === 'Values',
      );
      const typeWeatherAlertIndex = columns.findIndex(
        (column) => column === 'Type_weather_alert_key',
      );
      const seasonsIndex = columns.findIndex((column) => column === 'Saison');
      const recommandationContentsIndex = columns
        .map((column, index) => {
          if (column.includes('Recommendation')) {
            return index;
          }
          return null;
        })
        .filter((index) => index !== null);
      // fetch content
      const recosSheet = (await getCellContentFromGoogleSheet({
        sheetName,
        cellRange: 'A2:P1200',
      })) as unknown as RangeFromGoogleSheet;
      // for each row, create or update recommandation
      for (const [rowIndex, value] of Object.entries(recosSheet.values)) {
        try {
          const indicator = value[indicatorSlugIndex] as IndicatorsSlugEnum;
          if (!indicator) continue;
          const indicator_values = value[indicatorValuesIndex]
            ? value[indicatorValuesIndex]
                .split(',')
                .map((indicator_value) => indicator_value.trim())
            : [];
          const type_weather_alert = value[typeWeatherAlertIndex];
          const seasons = value[seasonsIndex]
            .split(',')
            .map((season) => season.trim()) as Array<SeasonEnum>;
          const recommandation_contents = [];
          for (const recommandationContentIndex of recommandationContentsIndex) {
            try {
              if (!recommandationContentIndex) continue;
              recommandation_contents.push(
                value[recommandationContentIndex]?.trim(),
              );
            } catch (error: any) {
              capture(error, {
                extra: {
                  rowIndex,
                  value,
                  recommandationContentIndex,
                  recommandationContentsIndex,
                },
              });
            }
          }

          for (const indicator_value of indicator_values) {
            if (indicator_value === '') continue;
            for (const [
              recommandationIndex,
              recommandation_content,
            ] of Object.entries(recommandation_contents)) {
              if (!recommandation_content || recommandation_content === '-') {
                continue;
              }

              const recommandation_id = [
                rowIndex.padStart(4, '0'),
                recommandationIndex,
              ].join('-');
              const unique_key = [
                recommandation_id,
                indicator,
                indicator_values.join('-'),
                indicator_value,
                type_weather_alert,
                seasons.join('-'),
              ].join('_');
              await prisma.recommandation.upsert({
                where: {
                  unique_key,
                },
                create: {
                  unique_key,
                  recommandation_id,
                  recommandation_content,
                  indicator,
                  indicator_value: parseInt(indicator_value, 10),
                  type_weather_alert,
                  seasons,
                },
                update: {
                  recommandation_content,
                },
              });
            }
          }
        } catch (error: any) {
          capture(error, { extra: { rowIndex, value } });
        }
      }
    } catch (error: any) {
      capture(error, { extra: { range, columns } });
    }
  } catch (error: any) {
    capture(error, { extra: { range } });
  }
  console.log('Recommandations upserted');
}
