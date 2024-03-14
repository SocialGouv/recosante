/*
  Warnings:

  - Added the required column `ASP_conformity` to the `DrinkingWater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `COULF_conformity` to the `DrinkingWater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `COULQ_conformity` to the `DrinkingWater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ODQ_conformity` to the `DrinkingWater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PESTOT_conformity` to the `DrinkingWater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PH_conformity` to the `DrinkingWater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SAVQ_conformity` to the `DrinkingWater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TEAU_conformity` to the `DrinkingWater` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DrinkingWaterPrelevementConformity" AS ENUM ('C', 'D', 'N', 'S');

-- AlterTable
ALTER TABLE "DrinkingWater" DROP COLUMN "ASP_conformity",
ADD COLUMN     "ASP_conformity" "DrinkingWaterPrelevementConformity" NOT NULL,
DROP COLUMN "COULF_conformity",
ADD COLUMN     "COULF_conformity" "DrinkingWaterPrelevementConformity" NOT NULL,
DROP COLUMN "COULQ_conformity",
ADD COLUMN     "COULQ_conformity" "DrinkingWaterPrelevementConformity" NOT NULL,
DROP COLUMN "ODQ_conformity",
ADD COLUMN     "ODQ_conformity" "DrinkingWaterPrelevementConformity" NOT NULL,
DROP COLUMN "PESTOT_conformity",
ADD COLUMN     "PESTOT_conformity" "DrinkingWaterPrelevementConformity" NOT NULL,
DROP COLUMN "PH_conformity",
ADD COLUMN     "PH_conformity" "DrinkingWaterPrelevementConformity" NOT NULL,
DROP COLUMN "SAVQ_conformity",
ADD COLUMN     "SAVQ_conformity" "DrinkingWaterPrelevementConformity" NOT NULL,
DROP COLUMN "TEAU_conformity",
ADD COLUMN     "TEAU_conformity" "DrinkingWaterPrelevementConformity" NOT NULL;
