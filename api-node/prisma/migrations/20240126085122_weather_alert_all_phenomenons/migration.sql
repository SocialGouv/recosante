/*
  Warnings:

  - You are about to drop the column `color_id` on the `WeatherAlert` table. All the data in the column will be lost.
  - You are about to drop the column `phenomenon_id` on the `WeatherAlert` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "weather_insee_code_diffusion_validity_phenomenon";

-- AlterTable
ALTER TABLE "WeatherAlert" DROP COLUMN "color_id",
DROP COLUMN "phenomenon_id",
ADD COLUMN     "avalanche" INTEGER,
ADD COLUMN     "cold_wave" INTEGER,
ADD COLUMN     "flood" INTEGER,
ADD COLUMN     "heat_wave" INTEGER,
ADD COLUMN     "rain_flood" INTEGER,
ADD COLUMN     "snow_ice" INTEGER,
ADD COLUMN     "storm" INTEGER,
ADD COLUMN     "violent_wind" INTEGER,
ADD COLUMN     "waves_submersion" INTEGER;

-- CreateIndex
CREATE INDEX "weather_alert_insee_code_diffusion_date_validity_start" ON "WeatherAlert"("municipality_insee_code", "diffusion_date", "validity_start");

-- CreateIndex
CREATE INDEX "WeatherAlert_violent_wind_rain_flood_storm_flood_snow_ice_h_idx" ON "WeatherAlert"("violent_wind", "rain_flood", "storm", "flood", "snow_ice", "heat_wave", "cold_wave", "avalanche", "waves_submersion");
