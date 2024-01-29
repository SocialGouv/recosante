/*
  Warnings:

  - Added the required column `indicatorId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indicatorSlug` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `indicatorValue` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Made the column `push_notif_token` on table `Notification` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "indicatorId" TEXT NOT NULL,
ADD COLUMN     "indicatorSlug" "IndicatorsSlugEnum" NOT NULL,
ADD COLUMN     "indicatorValue" INTEGER NOT NULL,
ADD COLUMN     "recommandationId" TEXT,
ADD COLUMN     "typeWeatherAlert" TEXT,
ALTER COLUMN "push_notif_token" SET NOT NULL;
