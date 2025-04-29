import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import type { Municipality } from '@prisma/client';
import { capture } from '~/third-parties/sentry';
import { logStep, calculateValidityEndDate } from './utils';
import { fetchAtmoJWTToken, fetchPollensDataFromAtmoAPI } from './api';
import {
  checkIfPollensDataAlreadyExists,
  loadMunicipalities,
  insertPollensData,
} from './database';
import {
  organizePollensDataByInseeCode,
  createPollensRowsForMunicipalities,
} from './processing';
import type { PollensAPIProperties } from '~/types/api/pollens';

// Configuration de dayjs
dayjs.extend(customParseFormat);
dayjs.extend(utc);

// Interfaces pour les dépendances
export interface LoggerUtils {
  logStep: (step: string) => void;
  calculateValidityEndDate: (diffusionDate: Date) => Date;
}

export interface ApiService {
  fetchAtmoJWTToken: () => Promise<string>;
  fetchPollensDataFromAtmoAPI: (
    atmoJWTToken: string,
    indiceForDate: dayjs.Dayjs,
  ) => Promise<
    | Array<{
        type: string;
        geometry: null;
        properties: PollensAPIProperties;
      }>
    | undefined
  >;
}

export interface DatabaseService {
  checkIfPollensDataAlreadyExists: (diffusionDate: Date) => Promise<boolean>;
  loadMunicipalities: () => Promise<Municipality[]>;
  insertPollensData: (pollensRows: Array<any>) => Promise<number>;
}

export interface ProcessingService {
  organizePollensDataByInseeCode: (
    data: Array<{
      type: string;
      geometry: null;
      properties: PollensAPIProperties;
    }>,
  ) => Record<Municipality['COM'], any>;
  createPollensRowsForMunicipalities: (
    municipalities: Municipality[],
    pollensByInseeCode: Record<Municipality['COM'], any>,
    diffusionDate: Date,
    validityEnd: Date,
  ) => {
    pollensRows: Array<any>;
    missingData: number;
  };
}

// Implémentations par défaut des dépendances
const defaultLoggerUtils: LoggerUtils = {
  logStep,
  calculateValidityEndDate,
};

const defaultApiService: ApiService = {
  fetchAtmoJWTToken,
  fetchPollensDataFromAtmoAPI,
};

const defaultDatabaseService: DatabaseService = {
  checkIfPollensDataAlreadyExists,
  loadMunicipalities,
  insertPollensData,
};

const defaultProcessingService: ProcessingService = {
  organizePollensDataByInseeCode,
  createPollensRowsForMunicipalities,
};

/**
 * Implémentation
 */
export async function getPollensIndicator(
  dependencies: {
    loggerUtils?: LoggerUtils;
    apiService?: ApiService;
  } = {},
) {
  const { loggerUtils = defaultLoggerUtils, apiService = defaultApiService } =
    dependencies;

  try {
    loggerUtils.logStep('Getting Pollens');

    const atmoJWTToken = await apiService.fetchAtmoJWTToken();
    loggerUtils.logStep('Step 1: Fetched Atmo JWT Token');

    await getPollensIndicatorForDate(
      atmoJWTToken,
      dayjs().utc().startOf('day'),
      { loggerUtils, apiService },
    );

    loggerUtils.logStep('Step 2: Fetched Pollens data');
  } catch (error: any) {
    capture(error, { extra: { functionCall: 'getPollensIndicator', architectureLevel:"main" } });
  }
}

export async function getPollensIndicatorForDate(
  atmoJWTToken: string,
  indiceForDate: dayjs.Dayjs,
  dependencies: {
    loggerUtils?: LoggerUtils;
    apiService?: ApiService;
    databaseService?: DatabaseService;
    processingService?: ProcessingService;
  } = {},
) {
  const {
    loggerUtils = defaultLoggerUtils,
    apiService = defaultApiService,
    databaseService = defaultDatabaseService,
    processingService = defaultProcessingService,
  } = dependencies;

  try {
    loggerUtils.logStep(
      `Getting Pollens indicator for date ${indiceForDate.toISOString()}`,
    );

    // Initialisation de l'API Atmo
    const data = await apiService.fetchPollensDataFromAtmoAPI(
      atmoJWTToken,
      indiceForDate,
    );
    if (!data?.length) {
      capture('No pollens data found', {
        extra: { functionCall: 'getPollensIndicatorForDate', data },
      });
      return;
    }

    const diffusionDate = indiceForDate.startOf('day').toDate();
    const validityEnd = loggerUtils.calculateValidityEndDate(diffusionDate);

    if (await databaseService.checkIfPollensDataAlreadyExists(diffusionDate)) {
      loggerUtils.logStep(
        `Pollens already fetched for diffusionDate ${indiceForDate.format(
          'YYYY-MM-DD',
        )}`,
      );
      return;
    }

   
    const municipalities = await databaseService.loadMunicipalities();
    loggerUtils.logStep('Step C: Loaded municipalities');

    // Organisation des données par code INSEE
    const pollensByInseeCode =
      processingService.organizePollensDataByInseeCode(data);
    loggerUtils.logStep(
      `Step D: Organized data by municipality code: ${
        Object.keys(pollensByInseeCode).length
      } municipalités`,
    );

    // Création des lignes à insérer
    const { pollensRows, missingData } =
      processingService.createPollensRowsForMunicipalities(
        municipalities,
        pollensByInseeCode,
        diffusionDate,
        validityEnd,
      );
    loggerUtils.logStep(
      `Step E: Created rows to insert: ${pollensRows.length} rows for ${municipalities.length} municipalities`,
    );

    // Insertion des données et gestion des alertes
    const results = await databaseService.insertPollensData(pollensRows);
    loggerUtils.logStep(
      `DONE INSERTING POLLENS: ${results} rows inserted upon ${municipalities.length} municipalities`,
    );
    loggerUtils.logStep(
      `MISSING DATA : ${missingData} missing upon ${municipalities.length} municipalities`,
    );
  } catch (error: any) {
    capture(error, {
      extra: {
        functionCall: 'getPollensIndicatorForDate',
        indiceForDate,
      },
    });
  }
}
