/*
  Warnings:

  - You are about to drop the column `code_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `conclusion_conformite_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `conformite_limites_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `conformite_limites_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `conformite_references_bact_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `conformite_references_pc_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `date_prelevement` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `hubeau_test_url` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `nom_distributeur` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `nom_moa` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `nom_reseau` on the `DrinkingWater` table. All the data in the column will be lost.
  - You are about to drop the column `nom_uge` on the `DrinkingWater` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "DrinkingWater_code_prelevement_key";

-- AlterTable
ALTER TABLE "DrinkingWater" DROP COLUMN "code_prelevement",
DROP COLUMN "conclusion_conformite_prelevement",
DROP COLUMN "conformite_limites_bact_prelevement",
DROP COLUMN "conformite_limites_pc_prelevement",
DROP COLUMN "conformite_references_bact_prelevement",
DROP COLUMN "conformite_references_pc_prelevement",
DROP COLUMN "date_prelevement",
DROP COLUMN "hubeau_test_url",
DROP COLUMN "nom_distributeur",
DROP COLUMN "nom_moa",
DROP COLUMN "nom_reseau",
DROP COLUMN "nom_uge",
ADD COLUMN     "ASP_code_prelevement" TEXT,
ADD COLUMN     "ASP_conclusion_conformite_prelevement" TEXT,
ADD COLUMN     "ASP_conformite_limites_bact_prelevement" TEXT,
ADD COLUMN     "ASP_conformite_limites_pc_prelevement" TEXT,
ADD COLUMN     "ASP_conformite_references_bact_prelevement" TEXT,
ADD COLUMN     "ASP_conformite_references_pc_prelevement" TEXT,
ADD COLUMN     "ASP_date_prelevement" TIMESTAMP(3),
ADD COLUMN     "ASP_is_conform" BOOLEAN,
ADD COLUMN     "ASP_value" TEXT,
ADD COLUMN     "COULF_code_prelevement" TEXT,
ADD COLUMN     "COULF_conclusion_conformite_prelevement" TEXT,
ADD COLUMN     "COULF_conformite_limites_bact_prelevement" TEXT,
ADD COLUMN     "COULF_conformite_limites_pc_prelevement" TEXT,
ADD COLUMN     "COULF_conformite_references_bact_prelevement" TEXT,
ADD COLUMN     "COULF_conformite_references_pc_prelevement" TEXT,
ADD COLUMN     "COULF_date_prelevement" TIMESTAMP(3),
ADD COLUMN     "COULF_is_conform" BOOLEAN,
ADD COLUMN     "COULF_value" TEXT,
ADD COLUMN     "COULQ_code_prelevement" TEXT,
ADD COLUMN     "COULQ_conclusion_conformite_prelevement" TEXT,
ADD COLUMN     "COULQ_conformite_limites_bact_prelevement" TEXT,
ADD COLUMN     "COULQ_conformite_limites_pc_prelevement" TEXT,
ADD COLUMN     "COULQ_conformite_references_bact_prelevement" TEXT,
ADD COLUMN     "COULQ_conformite_references_pc_prelevement" TEXT,
ADD COLUMN     "COULQ_date_prelevement" TIMESTAMP(3),
ADD COLUMN     "COULQ_is_conform" BOOLEAN,
ADD COLUMN     "COULQ_value" TEXT,
ADD COLUMN     "ODQ_code_prelevement" TEXT,
ADD COLUMN     "ODQ_conclusion_conformite_prelevement" TEXT,
ADD COLUMN     "ODQ_conformite_limites_bact_prelevement" TEXT,
ADD COLUMN     "ODQ_conformite_limites_pc_prelevement" TEXT,
ADD COLUMN     "ODQ_conformite_references_bact_prelevement" TEXT,
ADD COLUMN     "ODQ_conformite_references_pc_prelevement" TEXT,
ADD COLUMN     "ODQ_date_prelevement" TIMESTAMP(3),
ADD COLUMN     "ODQ_is_conform" BOOLEAN,
ADD COLUMN     "ODQ_value" TEXT,
ADD COLUMN     "PESTOT_code_prelevement" TEXT,
ADD COLUMN     "PESTOT_conclusion_conformite_prelevement" TEXT,
ADD COLUMN     "PESTOT_conformite_limites_bact_prelevement" TEXT,
ADD COLUMN     "PESTOT_conformite_limites_pc_prelevement" TEXT,
ADD COLUMN     "PESTOT_conformite_references_bact_prelevement" TEXT,
ADD COLUMN     "PESTOT_conformite_references_pc_prelevement" TEXT,
ADD COLUMN     "PESTOT_date_prelevement" TIMESTAMP(3),
ADD COLUMN     "PESTOT_is_conform" BOOLEAN,
ADD COLUMN     "PESTOT_value" TEXT,
ADD COLUMN     "PH_code_prelevement" TEXT,
ADD COLUMN     "PH_conclusion_conformite_prelevement" TEXT,
ADD COLUMN     "PH_conformite_limites_bact_prelevement" TEXT,
ADD COLUMN     "PH_conformite_limites_pc_prelevement" TEXT,
ADD COLUMN     "PH_conformite_references_bact_prelevement" TEXT,
ADD COLUMN     "PH_conformite_references_pc_prelevement" TEXT,
ADD COLUMN     "PH_date_prelevement" TIMESTAMP(3),
ADD COLUMN     "PH_is_conform" BOOLEAN,
ADD COLUMN     "PH_value" TEXT,
ADD COLUMN     "SAVQ_code_prelevement" TEXT,
ADD COLUMN     "SAVQ_conclusion_conformite_prelevement" TEXT,
ADD COLUMN     "SAVQ_conformite_limites_bact_prelevement" TEXT,
ADD COLUMN     "SAVQ_conformite_limites_pc_prelevement" TEXT,
ADD COLUMN     "SAVQ_conformite_references_bact_prelevement" TEXT,
ADD COLUMN     "SAVQ_conformite_references_pc_prelevement" TEXT,
ADD COLUMN     "SAVQ_date_prelevement" TIMESTAMP(3),
ADD COLUMN     "SAVQ_is_conform" BOOLEAN,
ADD COLUMN     "SAVQ_value" TEXT,
ADD COLUMN     "TEAU_code_prelevement" TEXT,
ADD COLUMN     "TEAU_conclusion_conformite_prelevement" TEXT,
ADD COLUMN     "TEAU_conformite_limites_bact_prelevement" TEXT,
ADD COLUMN     "TEAU_conformite_limites_pc_prelevement" TEXT,
ADD COLUMN     "TEAU_conformite_references_bact_prelevement" TEXT,
ADD COLUMN     "TEAU_conformite_references_pc_prelevement" TEXT,
ADD COLUMN     "TEAU_date_prelevement" TIMESTAMP(3),
ADD COLUMN     "TEAU_is_conform" BOOLEAN,
ADD COLUMN     "TEAU_value" TEXT,
ADD COLUMN     "hubeau_parameters_url" TEXT;
