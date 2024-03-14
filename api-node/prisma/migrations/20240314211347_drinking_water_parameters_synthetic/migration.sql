/*
  Warnings:

  - You are about to drop the column `ASP_conformite_limites_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `ASP_conformite_limites_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `ASP_conformite_references_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `ASP_conformite_references_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `ASP_is_conform` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `COULF_conformite_limites_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `COULF_conformite_limites_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `COULF_conformite_references_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `COULF_conformite_references_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `COULF_is_conform` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `COULQ_conformite_limites_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `COULQ_conformite_limites_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `COULQ_conformite_references_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `COULQ_conformite_references_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `COULQ_is_conform` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `ODQ_conformite_limites_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `ODQ_conformite_limites_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `ODQ_conformite_references_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `ODQ_conformite_references_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `ODQ_is_conform` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `PESTOT_conformite_limites_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `PESTOT_conformite_limites_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `PESTOT_conformite_references_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `PESTOT_conformite_references_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `PESTOT_is_conform` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `PH_conformite_limites_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `PH_conformite_limites_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `PH_conformite_references_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `PH_conformite_references_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `PH_is_conform` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `SAVQ_conformite_limites_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `SAVQ_conformite_limites_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `SAVQ_conformite_references_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `SAVQ_conformite_references_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `SAVQ_is_conform` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `TEAU_conformite_limites_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `TEAU_conformite_limites_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `TEAU_conformite_references_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `TEAU_conformite_references_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `TEAU_is_conform` on the `DrinkingWater` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DrinkingWater" DROP COLUMN "ASP_conformite_limites_bact_prelevement",
DROP COLUMN "ASP_conformite_limites_pc_prelevement",
DROP COLUMN "ASP_conformite_references_bact_prelevement",
DROP COLUMN "ASP_conformite_references_pc_prelevement",
DROP COLUMN "ASP_is_conform",
DROP COLUMN "COULF_conformite_limites_bact_prelevement",
DROP COLUMN "COULF_conformite_limites_pc_prelevement",
DROP COLUMN "COULF_conformite_references_bact_prelevement",
DROP COLUMN "COULF_conformite_references_pc_prelevement",
DROP COLUMN "COULF_is_conform",
DROP COLUMN "COULQ_conformite_limites_bact_prelevement",
DROP COLUMN "COULQ_conformite_limites_pc_prelevement",
DROP COLUMN "COULQ_conformite_references_bact_prelevement",
DROP COLUMN "COULQ_conformite_references_pc_prelevement",
DROP COLUMN "COULQ_is_conform",
DROP COLUMN "ODQ_conformite_limites_bact_prelevement",
DROP COLUMN "ODQ_conformite_limites_pc_prelevement",
DROP COLUMN "ODQ_conformite_references_bact_prelevement",
DROP COLUMN "ODQ_conformite_references_pc_prelevement",
DROP COLUMN "ODQ_is_conform",
DROP COLUMN "PESTOT_conformite_limites_bact_prelevement",
DROP COLUMN "PESTOT_conformite_limites_pc_prelevement",
DROP COLUMN "PESTOT_conformite_references_bact_prelevement",
DROP COLUMN "PESTOT_conformite_references_pc_prelevement",
DROP COLUMN "PESTOT_is_conform",
DROP COLUMN "PH_conformite_limites_bact_prelevement",
DROP COLUMN "PH_conformite_limites_pc_prelevement",
DROP COLUMN "PH_conformite_references_bact_prelevement",
DROP COLUMN "PH_conformite_references_pc_prelevement",
DROP COLUMN "PH_is_conform",
DROP COLUMN "SAVQ_conformite_limites_bact_prelevement",
DROP COLUMN "SAVQ_conformite_limites_pc_prelevement",
DROP COLUMN "SAVQ_conformite_references_bact_prelevement",
DROP COLUMN "SAVQ_conformite_references_pc_prelevement",
DROP COLUMN "SAVQ_is_conform",
DROP COLUMN "TEAU_conformite_limites_bact_prelevement",
DROP COLUMN "TEAU_conformite_limites_pc_prelevement",
DROP COLUMN "TEAU_conformite_references_bact_prelevement",
DROP COLUMN "TEAU_conformite_references_pc_prelevement",
DROP COLUMN "TEAU_is_conform",
ADD COLUMN     "ASP_conformity" BOOLEAN,
ADD COLUMN     "COULF_conformity" BOOLEAN,
ADD COLUMN     "COULQ_conformity" BOOLEAN,
ADD COLUMN     "ODQ_conformity" BOOLEAN,
ADD COLUMN     "PESTOT_conformity" BOOLEAN,
ADD COLUMN     "PH_conformity" BOOLEAN,
ADD COLUMN     "SAVQ_conformity" BOOLEAN,
ADD COLUMN     "TEAU_conformity" BOOLEAN;
