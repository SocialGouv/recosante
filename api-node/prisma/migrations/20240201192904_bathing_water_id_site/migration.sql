/*
  Warnings:

  - You are about to drop the column `idSite` on the `BathingWater` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "bathing_water_insee_code_idSite_diffusion_date";

-- AlterTable
ALTER TABLE "BathingWater" DROP COLUMN "idSite",
ADD COLUMN     "id_site" TEXT;

-- CreateIndex
CREATE INDEX "bathing_water_insee_code_id_site_diffusion_date" ON "BathingWater"("municipality_insee_code", "id_site", "diffusion_date");
