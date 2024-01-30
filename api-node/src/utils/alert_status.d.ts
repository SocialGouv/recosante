// for each  indicator, if the value is equal or greater than the threshold, we send an alert
// copy pasted from Prisma way to do typescript from its schema
// api-node/node_modules/.prisma/client/index.d.ts

export namespace $AlertStatus {
  export const AlertStatusThresholdEnum: {
    POLLENS: 4;
    INDICE_ATMO: 6;
    WEATHER_ALERT: 3;
    INDICE_UV: 8;
  };
  export type AlertStatusThresholdEnum =
    (typeof AlertStatusThresholdEnum)[keyof typeof AlertStatusThresholdEnum];
}
