/*
  Warnings:

  - You are about to drop the column `indicatorId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `indicatorSlug` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `indicatorValue` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `recommandationId` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `typeWeatherAlert` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "indicatorId",
DROP COLUMN "indicatorSlug",
DROP COLUMN "indicatorValue",
DROP COLUMN "recommandationId",
DROP COLUMN "typeWeatherAlert";
