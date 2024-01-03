-- CreateEnum
CREATE TYPE "IndicatorsNameEnum" AS ENUM ('ULTRA_VIOLET', 'POLLEN', 'WEATHER', 'INDICE_ATMOSPHERIC', 'POLLUTION_ATMOSPHERIC');

-- CreateEnum
CREATE TYPE "IndicatorsSlugEnum" AS ENUM ('ultra_violet', 'pollen', 'weather', 'indice_atmospheric', 'pollution_atmospheric');

-- AlterTable
ALTER TABLE "IndiceUv" ALTER COLUMN "uv_j0" DROP NOT NULL,
ALTER COLUMN "uv_j1" DROP NOT NULL,
ALTER COLUMN "uv_j2" DROP NOT NULL,
ALTER COLUMN "uv_j3" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Indicators" (
    "id" TEXT NOT NULL,
    "name" "IndicatorsNameEnum" NOT NULL,
    "slug" "IndicatorsSlugEnum" NOT NULL,

    CONSTRAINT "Indicators_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Indicators_name_key" ON "Indicators"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Indicators_slug_key" ON "Indicators"("slug");
