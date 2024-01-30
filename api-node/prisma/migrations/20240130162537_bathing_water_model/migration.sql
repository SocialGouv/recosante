-- CreateEnum
CREATE TYPE "BathgWaterIdCarteEnum" AS ENUM ('gua', 'mar', 'guy', 'reu', 'may', 'fra');

-- CreateTable
CREATE TABLE "BathingWater" (
    "id" TEXT NOT NULL,
    "municipality_insee_code" TEXT NOT NULL,
    "validity_start" TIMESTAMP(3) NOT NULL,
    "validity_end" TIMESTAMP(3) NOT NULL,
    "diffusion_date" TIMESTAMP(3) NOT NULL,
    "data_availability" "DataAvailabilityEnum" NOT NULL DEFAULT 'AVAILABLE',
    "alert_status" "AlertStatusEnum" NOT NULL DEFAULT 'NOT_ALERT_THRESHOLD',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_carte" "BathgWaterIdCarteEnum" NOT NULL,

    CONSTRAINT "BathingWater_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "bathing_water_insee_code_diffusion_date_validity_start" ON "BathingWater"("municipality_insee_code", "diffusion_date", "validity_start");

-- AddForeignKey
ALTER TABLE "BathingWater" ADD CONSTRAINT "BathingWater_municipality_insee_code_fkey" FOREIGN KEY ("municipality_insee_code") REFERENCES "Municipality"("COM") ON DELETE RESTRICT ON UPDATE CASCADE;
