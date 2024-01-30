-- CreateEnum
CREATE TYPE "AlertStatusEnum" AS ENUM ('NOT_ALERT_THRESHOLD', 'ALERT_NOTIFICATION_NOT_SENT_YET', 'ALERT_NOTIFICATION_SENT', 'ALERT_NOTIFICATION_ERROR');

-- AlterTable
ALTER TABLE "AlertPollutionAtmospheric" ADD COLUMN     "alert_status" "AlertStatusEnum" NOT NULL DEFAULT 'NOT_ALERT_THRESHOLD';

-- AlterTable
ALTER TABLE "IndiceAtmospheric" ADD COLUMN     "alert_status" "AlertStatusEnum" NOT NULL DEFAULT 'NOT_ALERT_THRESHOLD';

-- AlterTable
ALTER TABLE "IndiceUv" ADD COLUMN     "alert_status" "AlertStatusEnum" NOT NULL DEFAULT 'NOT_ALERT_THRESHOLD';

-- AlterTable
ALTER TABLE "PollenAllergyRisk" ADD COLUMN     "alert_status" "AlertStatusEnum" NOT NULL DEFAULT 'NOT_ALERT_THRESHOLD';

-- AlterTable
ALTER TABLE "WeatherAlert" ADD COLUMN     "alert_status" "AlertStatusEnum" NOT NULL DEFAULT 'NOT_ALERT_THRESHOLD';
