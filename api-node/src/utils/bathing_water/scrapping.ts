import {
  BathingWaterCurrentYearGradingEnum,
  BathingWaterResultEnum,
} from '@prisma/client';
import { type ScrapingResult } from '~/types/api/bathing_water';
import * as cheerio from 'cheerio';
import dayjs from 'dayjs';

// Regular expression to match the date in dd/mm/yyyy format
const dateRegex = /(\d{2}\/\d{2}\/\d{4})/;

export async function scrapeHtmlBaignadesSitePage(
  consultSiteUrl: URL,
): Promise<ScrapingResult | null> {
  const htmlSitePage = await fetch(consultSiteUrl).then(
    async (res) => await res.text(),
  );
  if (!htmlSitePage) {
    return null;
  }

  // Load up cheerio with our html string
  const $ = cheerio.load(htmlSitePage, {
    decodeEntities: false,
    withStartIndices: true,
  });

  const swimmingSeasonStartValue = $('td:contains("Début de la saison")')
    .last()
    .text();
  const swimmingSeasonStartDateMatch =
    swimmingSeasonStartValue.match(dateRegex);
  const swimmingSeasonStartDate = swimmingSeasonStartDateMatch
    ? swimmingSeasonStartDateMatch[1]
    : 'No date found';
  const swimmingSeasonEndValue = $('td:contains("Fin de la saison")')
    .last()
    .text();
  const swimmingSeasonEndDateMatch = swimmingSeasonEndValue.match(dateRegex);
  const swimmingSeasonEndDate = swimmingSeasonEndDateMatch
    ? swimmingSeasonEndDateMatch[1]
    : 'No date found';

  //   Get the last row of the table with the test
  const parentOfLastImg = $('img[src="images/fr/boutons/fleche_ronde.gif"]')
    .last()
    .parent()
    .parent();
  const result = parentOfLastImg.text().trim();
  if (!result) {
    return {
      result_value: 'UNRANKED_SITE',
      swimming_season_start: swimmingSeasonStartDate,
      swimming_season_end: swimmingSeasonEndDate,
    };
  }

  // Regular expression to match the last word in the string
  const lastWordRegex = /(\S+)\s*$/;
  // Extracting the date
  const dateMatch = result.match(dateRegex);
  const date = dateMatch ? dateMatch[1] : 'No date found';

  // Extracting the result_value
  const labelMatch = result.match(lastWordRegex);
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
        console.error('Unknown value:', value);
        return BathingWaterResultEnum.GOOD;
    }
  }
  return {
    result_date: dayjs(date, 'DD/MM/YYYY').toISOString(),
    result_value: transformLabelToEnum(label),
    swimming_season_start: swimmingSeasonStartDate,
    swimming_season_end: swimmingSeasonEndDate,
    current_year_grading: BathingWaterCurrentYearGradingEnum.EXCELLENT,
  };
}
