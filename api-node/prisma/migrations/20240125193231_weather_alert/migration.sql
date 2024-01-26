/*
  Warnings:

  - You are about to drop the column `phenomenon` on the `WeatherAlert` table. All the data in the column will be lost.
  - The `code_alert` column on the `WeatherAlert` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `phenomenon_id` to the `WeatherAlert` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "weather_municipality_insee_code_diffusion_date_validity_start";

-- AlterTable
ALTER TABLE "WeatherAlert" DROP COLUMN "phenomenon",
ADD COLUMN     "phenomenon_id" INTEGER NOT NULL,
DROP COLUMN "code_alert",
ADD COLUMN     "code_alert" INTEGER;

-- DropEnum
DROP TYPE "CodeAlertEnums";

-- DropEnum
DROP TYPE "PhenomenonsEnum";

-- CreateIndex
CREATE INDEX "weather_insee_code_diffusion_validity_phenomenon" ON "WeatherAlert"("municipality_insee_code", "diffusion_date", "validity_start", "phenomenon_id");
