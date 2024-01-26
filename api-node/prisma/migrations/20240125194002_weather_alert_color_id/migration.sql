/*
  Warnings:

  - You are about to drop the column `code_alert` on the `WeatherAlert` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WeatherAlert" DROP COLUMN "code_alert",
ADD COLUMN     "color_id" INTEGER;
