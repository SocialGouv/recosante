import fetchRetry from 'fetch-retry';
import dayjs from 'dayjs';
import type {
  PollensAPIResponse,
  PollensAPIProperties,
  DATE_CALENDAR_YYYY_MM_DD,
} from '~/types/api/pollens';
import { PollensAPIDataIdsEnum } from '~/types/api/pollens';
import { capture } from '~/third-parties/sentry';
import { ATMODATA_PASSWORD, ATMODATA_USERNAME } from '~/config';
import { logStep } from './utils';

const fetch = fetchRetry(global.fetch);

export async function fetchAtmoJWTToken(): Promise<string> {
  const loginRes = await fetch('https://admindata.atmo-france.org/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: ATMODATA_USERNAME,
      password: ATMODATA_PASSWORD,
    }),
    retries: 3,
    retryDelay: 1000,
  }).then(async (response) => await response.json())
    .catch((error) => {
      capture(error, {
        extra: { functionCall: 'fetchAtmoJWTToken', architectureLevel:"api" },
      });
      return null;
    });

  return loginRes.token;
}

/**
 * Récupère les données de pollens depuis l'API Atmo pour une date spécifique
 */
export async function fetchPollensDataFromAtmoAPI(
  atmoJWTToken: string,
  indiceForDate: dayjs.Dayjs,
): Promise<
  | Array<{
      type: string;
      geometry: null;
      properties: PollensAPIProperties;
    }>
  | undefined
> {
  type Operator = '=' | '!=' | '<' | '<=' | '>' | '>=' | 'IN' | 'NOT IN';

  const indiceDataId = PollensAPIDataIdsEnum.pollens_current_year;
  const dateQuery: { operator: Operator; value: DATE_CALENDAR_YYYY_MM_DD } = {
    operator: '=',
    value: indiceForDate.format('YYYY-MM-DD'),
  };
  const rawQuery: Record<'date_ech', { operator: Operator; value: string }> = {
    date_ech: dateQuery,
  };
  const query = JSON.stringify(rawQuery);
  const url = `https://admindata.atmo-france.org/api/data/${indiceDataId}/${query}?withGeom=false`;

  const pollensRes: PollensAPIResponse = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${atmoJWTToken}`,
    },
  })
    .then(async (response) => await response.json())
    .catch((error) => {
      capture(error, {
        extra: { functionCall: 'fetchPollensDataFromAtmoAPI', url, query, architectureLevel:"api" },
      });
      return null;
    });

  logStep(
    `Fetched Pollens data for ${indiceForDate.format('YYYY-MM-DD dddd')}`,
  );

  return pollensRes?.features;
}
