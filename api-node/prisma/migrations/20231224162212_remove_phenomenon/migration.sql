/*
  Warnings:

  - You are about to drop the `Phenomenon` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code_alert` to the `WeatherAlert` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phenomenon` to the `WeatherAlert` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Phenomenon" DROP CONSTRAINT "Phenomenon_weatherAlertId_fkey";

-- AlterTable
ALTER TABLE "WeatherAlert" ADD COLUMN     "code_alert" "CodeAlertEnums" NOT NULL,
ADD COLUMN     "phenomenon" "PhenomenonsEnum" NOT NULL;

-- DropTable
DROP TABLE "Phenomenon";
