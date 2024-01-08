/*
  Warnings:

  - Added the required column `favorite_indicators` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favorite_indicators" "IndicatorsSlugEnum" NOT NULL;
