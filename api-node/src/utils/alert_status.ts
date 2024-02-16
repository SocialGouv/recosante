// for each  indicator, if the value is equal or greater than the threshold, we send an alert
// copy pasted from Prisma way to do typescript from its schema
// api-node/node_modules/.prisma/client/index.d.ts

import { BathingWaterCurrentYearGradingEnum } from '@prisma/client';

export namespace $AlertStatus {
  export const AlertStatusThresholdEnum = {
    POLLENS: 4,
    INDICE_ATMO: 6,
    WEATHER_ALERT: 3,
    INDICE_UV: 8,
    BATHING_WATER: BathingWaterCurrentYearGradingEnum.PROHIBITION,
  };

  export type AlertStatusThresholdEnum = keyof typeof AlertStatusThresholdEnum;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type AlertStatusThresholdEnum = $AlertStatus.AlertStatusThresholdEnum;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export const AlertStatusThresholdEnum: typeof $AlertStatus.AlertStatusThresholdEnum =
  $AlertStatus.AlertStatusThresholdEnum;
