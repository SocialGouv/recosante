-- CreateEnum
CREATE TYPE "DrinkingWaterPrelevementConformity" AS ENUM ('C', 'D', 'N', 'S');

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
    "hubeau_first_url" TEXT,
    "last_prelevement_code" TEXT,
    "last_prelevement_date" TIMESTAMP(3),
    "conclusion_conformite_prelevement" TEXT,
    "conformite_limites_bact_prelevement" "DrinkingWaterPrelevementConformity",
    "conformite_limites_pc_prelevement" "DrinkingWaterPrelevementConformity",
    "conformite_references_bact_prelevement" "DrinkingWaterPrelevementConformity",
    "conformite_references_pc_prelevement" "DrinkingWaterPrelevementConformity",
    "all_tests_results" JSONB,

    CONSTRAINT "DrinkingWater_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "drinking_water_udi_diffusion_date_validity_start" ON "DrinkingWater"("udi", "diffusion_date", "validity_start");
