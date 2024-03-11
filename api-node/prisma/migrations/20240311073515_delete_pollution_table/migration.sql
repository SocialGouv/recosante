/*
  Warnings:

  - You are about to drop the `AlertPollutionAtmospheric` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AlertPollutionAtmospheric" DROP CONSTRAINT "AlertPollutionAtmospheric_municipality_insee_code_fkey";

-- DropTable
DROP TABLE "AlertPollutionAtmospheric";
