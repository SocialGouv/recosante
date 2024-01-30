-- AlterTable
ALTER TABLE "BathingWater" ALTER COLUMN "id_carte" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Municipality" ADD COLUMN     "has_bathing_water_sites" BOOLEAN NOT NULL DEFAULT false;
