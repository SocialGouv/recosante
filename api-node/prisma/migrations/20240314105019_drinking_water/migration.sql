-- AlterEnum
ALTER TYPE "IndicatorsSlugEnum" ADD VALUE 'drinking_water';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "udi" TEXT;

-- CreateTable
CREATE TABLE "DrinkingWater" (
    "id" TEXT NOT NULL,
    "udi" TEXT NOT NULL,
    "validity_start" TIMESTAMP(3) NOT NULL,
    "validity_end" TIMESTAMP(3) NOT NULL,
    "diffusion_date" TIMESTAMP(3) NOT NULL,
    "data_availability" "DataAvailabilityEnum" NOT NULL DEFAULT 'AVAILABLE',
    "alert_status" "AlertStatusEnum" NOT NULL DEFAULT 'NOT_ALERT_THRESHOLD',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "code_prelevement" TEXT,
    "nom_uge" TEXT,
    "nom_distributeur" TEXT,
    "nom_moa" TEXT,
    "nom_reseau" TEXT,
    "date_prelevement" TIMESTAMP(3),
    "conclusion_conformite_prelevement" TEXT,
    "conformite_limites_bact_prelevement" TEXT,
    "conformite_limites_pc_prelevement" TEXT,
    "conformite_references_bact_prelevement" TEXT,
    "conformite_references_pc_prelevement" TEXT,
    "hubeau_udi_url" TEXT,
    "hubeau_test_url" TEXT,

    CONSTRAINT "DrinkingWater_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DrinkingWater_code_prelevement_key" ON "DrinkingWater"("code_prelevement");

-- CreateIndex
CREATE INDEX "drinking_water_udi_diffusion_date_validity_start" ON "DrinkingWater"("udi", "diffusion_date", "validity_start");
