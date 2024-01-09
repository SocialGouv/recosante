import type { IndicatorsSlugEnum } from '@prisma/client';

export type Indicator = {
  name: string;
  slug: IndicatorsSlugEnum;
};
