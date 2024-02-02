-- CreateEnum
CREATE TYPE "BathingWaterCurrentYearGradingEnum" AS ENUM ('EXCELLENT', 'GOOD', 'SUFFICIENT', 'POOR', 'INSUFFICIENTLY_SAMPLED', 'UNRANKED_SITE', 'PROHIBITION');

-- AlterTable
ALTER TABLE "BathingWater" ADD COLUMN     "current_year_grading" "BathingWaterCurrentYearGradingEnum";
