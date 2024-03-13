-- AlterTable
ALTER TABLE "User" ADD COLUMN     "udi" TEXT;

-- DropEnum
DROP TYPE "PollutionCodeEnum";

-- DropEnum
DROP TYPE "PollutionStateEnum";

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
    "code_lieu_analyse" TEXT,
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
    "hubeau_url" TEXT,
    "ACPT" TEXT,
    "ANPHT" TEXT,
    "NH4" TEXT,
    "ANTHRA" TEXT,
    "SB" TEXT,
    "ASP" TEXT,
    "GT22_68" TEXT,
    "GT36_44" TEXT,
    "BSIR" TEXT,
    "CTF" TEXT,
    "BENZAN" TEXT,
    "BAPYR" TEXT,
    "BBFLUO" TEXT,
    "BGPERY" TEXT,
    "BKFLUO" TEXT,
    "CD" TEXT,
    "CL2LIB" TEXT,
    "CL2TOT" TEXT,
    "CLVYL" TEXT,
    "CRT" TEXT,
    "CHRYS" TEXT,
    "CDT25" TEXT,
    "COULQ" TEXT,
    "DBENZAN" TEXT,
    "STRF" TEXT,
    "ECOLI" TEXT,
    "FET" TEXT,
    "FLUORA" TEXT,
    "FLUORE" TEXT,
    "HPAT4" TEXT,
    "HPAT" TEXT,
    "INDPYR" TEXT,
    "ME2FL" TEXT,
    "ME2NA" TEXT,
    "NAPHTA" TEXT,
    "NO3" TEXT,
    "NO3_NO2" TEXT,
    "NO2" TEXT,
    "ODQ" TEXT,
    "PH" TEXT,
    "PHENAN" TEXT,
    "PYR" TEXT,
    "SAVQ" TEXT,
    "TEAU" TEXT,
    "TURBNFU" TEXT,

    CONSTRAINT "DrinkingWater_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "drinking_water_udi_diffusion_date_validity_start" ON "DrinkingWater"("udi", "diffusion_date", "validity_start");
