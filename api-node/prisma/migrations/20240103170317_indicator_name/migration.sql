/*
  Warnings:

  - Changed the type of `name` on the `Indicators` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Indicators" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "IndicatorsNameEnum";

-- CreateIndex
CREATE UNIQUE INDEX "Indicators_name_key" ON "Indicators"("name");
