import fetchRetry from 'fetch-retry';
import {
  BathingWaterCurrentYearGradingEnum,
  BathingWaterResultEnum,
} from '@prisma/client';
import { type ScrapingResult } from '~/types/api/bathing_water';
import * as cheerio from 'cheerio';
import { capture } from '~/third-parties/sentry';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

const fetch = fetchRetry(global.fetch);
// Regular expression to match the date in dd/mm/yyyy format
const dateRegex = /(\d{2}\/\d{2}\/\d{4})/;

export async function scrapeHtmlBaignadesSitePage(
  consultSiteUrl: URL,
): Promise<ScrapingResult | null> {
  const htmlSitePage = await fetch(consultSiteUrl, {
    retryDelay: 1000,
    retries: 3,
  }).then(async (res) => await res.text());
  if (!htmlSitePage) {
    return null;
  }

  // Load up cheerio with our html string
  const $ = cheerio.load(htmlSitePage, {
    decodeEntities: false,
    withStartIndices: true,
  });

  const swimmingIsProhibided = $('td:contains("Interdiction de baignade du")')
    .last()
    .text();

  // Get the swimming season start and end dates
  const swimmingSeasonStartValue = $('td:contains("Début de la saison")')
    .last()
    .text();
  const swimmingSeasonStartDateMatch =
    swimmingSeasonStartValue.match(dateRegex);
  const swimmingSeasonStartDate = swimmingSeasonStartDateMatch?.[1]
    ? dayjs(swimmingSeasonStartDateMatch?.[1], 'DD/MM/YYYY').format(
        'YYYY-MM-DD',
      )
    : null;

  const swimmingSeasonEndValue = $('td:contains("Fin de la saison")')
    .last()
    .text();
  const swimmingSeasonEndDateMatch = swimmingSeasonEndValue.match(dateRegex);
  const swimmingSeasonEndDate = swimmingSeasonEndDateMatch?.[1]
    ? dayjs(swimmingSeasonEndDateMatch?.[1], 'DD/MM/YYYY').format('YYYY-MM-DD')
    : null;

  //   Get the last row of the table with the test
  const parentOfLastImg = $('img[src="images/fr/boutons/fleche_ronde.gif"]')
    .last()
    .parent()
    .parent();
  const lastTest = parentOfLastImg.text().trim();

  if (swimmingIsProhibided) {
    return {
      result_date: null,
      result_value: BathingWaterResultEnum.NO_RESULT_FOUND,
      swimming_season_start: swimmingSeasonStartDate,
      swimming_season_end: swimmingSeasonEndDate,
      current_year_grading: BathingWaterCurrentYearGradingEnum.PROHIBITION,
    };
  }
  if (!lastTest) {
    if (swimmingSeasonStartDate && swimmingSeasonEndDate) {
      if (
        dayjs().isBefore(swimmingSeasonStartDate) ||
        dayjs().isAfter(swimmingSeasonEndDate)
      ) {
        return {
          result_date: null,
          result_value: BathingWaterResultEnum.NO_RESULT_FOUND,
          swimming_season_start: swimmingSeasonStartDate,
          swimming_season_end: swimmingSeasonEndDate,
          current_year_grading: BathingWaterCurrentYearGradingEnum.OFF_SEASON,
        };
      }
    }
    return {
      result_date: null,
      result_value: BathingWaterResultEnum.NO_RESULT_FOUND,
      swimming_season_start: swimmingSeasonStartDate,
      swimming_season_end: swimmingSeasonEndDate,
      current_year_grading: BathingWaterCurrentYearGradingEnum.UNRANKED_SITE,
    };
  }

  // Regular expression to match the last word (label) in the string
  const labelRegex = /(\S+)\s*$/;
  // Extracting the date
  const dateMatch = lastTest.match(dateRegex);
  const date = dateMatch ? dateMatch[1] : 'No date found';

  // Extracting the result_value
  const labelMatch = lastTest.match(labelRegex);
  const label = labelMatch ? labelMatch[1] : 'No last word found';

  function transformLabelToEnum(value: string): BathingWaterResultEnum {
    switch (value) {
      case 'Mauvais':
        return BathingWaterResultEnum.POOR;
      case 'Moyen':
        return BathingWaterResultEnum.AVERAGE;
      case 'Bon':
        return BathingWaterResultEnum.GOOD;
      default:
        // if there is no test result, the parsing fails and the value is 'communiqué'
        if (lastTest.includes('Non renseign')) {
          return BathingWaterResultEnum.NO_RESULT_FOUND;
        }
        if (value !== 'communiqué' && !!value) {
          capture(`Unknown bathing water label ${value}`, {
            extra: {
              value,
              consultSiteUrl,
            },
            tags: {
              consultSiteUrl,
              label: value,
            },
          });
        }
        // TODO FIXME: we should return BathingWaterResultEnum.NO_RESULT_FOUND
        return BathingWaterResultEnum.NO_RESULT_FOUND;
    }
  }

  return {
    result_date: dayjs(date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    result_value: transformLabelToEnum(label),
    swimming_season_start: swimmingSeasonStartDate,
    swimming_season_end: swimmingSeasonEndDate,
    current_year_grading: BathingWaterCurrentYearGradingEnum.EXCELLENT,
  };
}
