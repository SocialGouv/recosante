/*
  Warnings:

  - You are about to drop the column `value` on the `BathingWater` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "BathingWaterResultEnum" AS ENUM ('GOOD', 'AVERAGE', 'POOR');

-- AlterTable
ALTER TABLE "BathingWater" DROP COLUMN "value",
ADD COLUMN     "result_value" "BathingWaterResultEnum";
