-- DropIndex
DROP INDEX "bathing_water_insee_code_diffusion_date_validity_start";

-- CreateIndex
CREATE INDEX "bathing_water_insee_code_idSite_diffusion_date" ON "BathingWater"("municipality_insee_code", "idSite", "diffusion_date");
