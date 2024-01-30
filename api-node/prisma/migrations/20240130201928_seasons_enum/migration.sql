/*
  Warnings:

  - The `seasons` column on the `Recommandation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "SeasonEnum" AS ENUM ('Printemps', 'Ete', 'Automne', 'Hiver', 'Toute');

-- AlterTable
ALTER TABLE "Recommandation" DROP COLUMN "seasons",
ADD COLUMN     "seasons" "SeasonEnum"[];
