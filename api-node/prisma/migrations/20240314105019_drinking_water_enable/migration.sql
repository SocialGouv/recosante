-- AlterEnum
ALTER TYPE "IndicatorsSlugEnum"
ADD
    VALUE 'drinking_water';

-- AlterTable
ALTER TABLE
    "User"
ADD
    COLUMN "udi" TEXT;