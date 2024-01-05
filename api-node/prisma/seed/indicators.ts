import { IndicatorsSlugEnum, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

type Indicator = {
  name: string;
  slug: IndicatorsSlugEnum;
};

const indicatorsList: Indicator[] = [
  {
    name: 'Indice Atmosphérique',
    slug: 'indice_atmospheric',
  },
  {
    name: 'Indice UV',
    slug: 'ultra_violet',
  },
  {
    name: 'Allergie aux Pollens',
    slug: 'pollen',
  },
  {
    name: 'Alerte Météo',
    slug: 'weather',
  },
  {
    name: 'Pollution Atmosphérique',
    slug: 'pollution_atmospheric',
  },
  {
    name: "Qualité de l'air",
    slug: 'air_quality',
  },
  {
    name: 'Eau',
    slug: 'water',
  },
];

async function main() {
  const indicators = await prisma.indicators.createMany({
    data: indicatorsList,
    skipDuplicates: true,
  });

  console.log({ indicators });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
