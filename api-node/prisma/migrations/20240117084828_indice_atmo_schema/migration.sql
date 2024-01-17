/*
  Warnings:

  - You are about to drop the column `max_value` on the `IndiceAtmosperic` table. All the data in the column will be lost.
  - You are about to drop the column `no2` on the `IndiceAtmosperic` table. All the data in the column will be lost.
  - You are about to drop the column `o3` on the `IndiceAtmosperic` table. All the data in the column will be lost.
  - You are about to drop the column `pm10` on the `IndiceAtmosperic` table. All the data in the column will be lost.
  - You are about to drop the column `pm25` on the `IndiceAtmosperic` table. All the data in the column will be lost.
  - You are about to drop the column `so2` on the `IndiceAtmosperic` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[unique_composed_key]` on the table `IndiceAtmosperic` will be added. If there are existing duplicate values, this will fail.
  - Made the column `data_availability` on table `AlertPollutionAtmospheric` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `unique_composed_key` to the `IndiceAtmosperic` table without a default value. This is not possible if the table is not empty.
  - Made the column `data_availability` on table `IndiceAtmosperic` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_availability` on table `IndiceUv` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_availability` on table `PollenAllergyRisk` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_availability` on table `WeatherAlert` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AlertPollutionAtmospheric" ALTER COLUMN "data_availability" SET NOT NULL;

-- AlterTable
ALTER TABLE "IndiceAtmosperic" DROP COLUMN "max_value",
DROP COLUMN "no2",
DROP COLUMN "o3",
DROP COLUMN "pm10",
DROP COLUMN "pm25",
DROP COLUMN "so2",
ADD COLUMN     "aasqa" TEXT,
ADD COLUMN     "code_no2" INTEGER,
ADD COLUMN     "code_o3" INTEGER,
ADD COLUMN     "code_pm10" INTEGER,
ADD COLUMN     "code_pm25" INTEGER,
ADD COLUMN     "code_qual" INTEGER,
ADD COLUMN     "code_so2" INTEGER,
ADD COLUMN     "code_zone" INTEGER,
ADD COLUMN     "coul_qual" TEXT,
ADD COLUMN     "date_dif" TEXT,
ADD COLUMN     "date_ech" TEXT,
ADD COLUMN     "date_maj" TEXT,
ADD COLUMN     "epsg_reg" TEXT,
ADD COLUMN     "gml_id" INTEGER,
ADD COLUMN     "lib_qual" TEXT,
ADD COLUMN     "lib_zone" TEXT,
ADD COLUMN     "partition_field" TEXT,
ADD COLUMN     "source" TEXT,
ADD COLUMN     "type_zone" TEXT,
ADD COLUMN     "unique_composed_key" TEXT NOT NULL,
ADD COLUMN     "x_reg" DOUBLE PRECISION,
ADD COLUMN     "x_wgs84" DOUBLE PRECISION,
ADD COLUMN     "y_reg" DOUBLE PRECISION,
ADD COLUMN     "y_wgs84" DOUBLE PRECISION,
ALTER COLUMN "data_availability" SET NOT NULL;

-- AlterTable
ALTER TABLE "IndiceUv" ALTER COLUMN "data_availability" SET NOT NULL;

-- AlterTable
ALTER TABLE "PollenAllergyRisk" ALTER COLUMN "data_availability" SET NOT NULL,
ALTER COLUMN "cypres" DROP DEFAULT,
ALTER COLUMN "noisetier" DROP DEFAULT,
ALTER COLUMN "aulne" DROP DEFAULT,
ALTER COLUMN "peuplier" DROP DEFAULT,
ALTER COLUMN "saule" DROP DEFAULT,
ALTER COLUMN "frene" DROP DEFAULT,
ALTER COLUMN "charme" DROP DEFAULT,
ALTER COLUMN "bouleau" DROP DEFAULT,
ALTER COLUMN "platane" DROP DEFAULT,
ALTER COLUMN "chene" DROP DEFAULT,
ALTER COLUMN "olivier" DROP DEFAULT,
ALTER COLUMN "tilleul" DROP DEFAULT,
ALTER COLUMN "chataignier" DROP DEFAULT,
ALTER COLUMN "rumex" DROP DEFAULT,
ALTER COLUMN "graminees" DROP DEFAULT,
ALTER COLUMN "plantain" DROP DEFAULT,
ALTER COLUMN "urticacees" DROP DEFAULT,
ALTER COLUMN "armoises" DROP DEFAULT,
ALTER COLUMN "ambroisies" DROP DEFAULT,
ALTER COLUMN "total" DROP DEFAULT;

-- AlterTable
ALTER TABLE "WeatherAlert" ALTER COLUMN "data_availability" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "municipality_insee_code+date_maj+date_ech" ON "IndiceAtmosperic"("unique_composed_key");
