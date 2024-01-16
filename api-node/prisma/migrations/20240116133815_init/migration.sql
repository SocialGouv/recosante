-- CreateEnum
CREATE TYPE "NotifationEnum" AS ENUM ('morning', 'evening', 'alert');

-- CreateEnum
CREATE TYPE "IndicatorsSlugEnum" AS ENUM ('indice_atmospheric', 'indice_uv', 'pollen_allergy', 'weather_alert', 'bathing_water');

-- CreateEnum
CREATE TYPE "DataAvailabilityEnum" AS ENUM ('AVAILABLE', 'NOT_AVAILABLE');

-- CreateEnum
CREATE TYPE "CodeAlertEnums" AS ENUM ('GREEN', 'YELLOW', 'ORANGE', 'RED');

-- CreateEnum
CREATE TYPE "PhenomenonsEnum" AS ENUM ('VIOLENT_WIND', 'RAIN_FLOOD', 'STORM', 'FLOOD', 'SNOW_ICE', 'HEAT_WAVE', 'COLD_WAVE', 'AVALANCHE', 'WAVES_SUBMERSION');

-- CreateEnum
CREATE TYPE "PollutionStateEnum" AS ENUM ('ALERT', 'INFORMATION_AND_RECOMMANDATION', 'NO_ALERT', 'ALERT_PERSISTANCE');

-- CreateEnum
CREATE TYPE "PollutionCodeEnum" AS ENUM ('SULFUR_DIOXIDE', 'NITROGEN_DIOXIDE', 'FINES_PARTICLES', 'OZONE', 'PM10', 'PM25', 'BENZENE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "matomo_id" TEXT NOT NULL,
    "municipality_insee_code" TEXT,
    "municipality_name" TEXT,
    "municipality_zip_code" TEXT,
    "push_notif_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "favorite_indicator" "IndicatorsSlugEnum",
    "notifications_preference" "NotifationEnum"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndiceUv" (
    "id" TEXT NOT NULL,
    "municipality_insee_code" TEXT NOT NULL,
    "validity_start" TIMESTAMP(3) NOT NULL,
    "validity_end" TIMESTAMP(3) NOT NULL,
    "diffusion_date" TIMESTAMP(3) NOT NULL,
    "data_availability" "DataAvailabilityEnum" DEFAULT 'AVAILABLE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "uv_j0" INTEGER,
    "uv_j1" INTEGER,
    "uv_j2" INTEGER,
    "uv_j3" INTEGER,

    CONSTRAINT "IndiceUv_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollenAllergyRisk" (
    "id" TEXT NOT NULL,
    "validity_start" TIMESTAMP(3) NOT NULL,
    "validity_end" TIMESTAMP(3) NOT NULL,
    "diffusion_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "municipality_insee_code" TEXT NOT NULL,
    "data_availability" "DataAvailabilityEnum" DEFAULT 'AVAILABLE',
    "cypres" INTEGER DEFAULT 0,
    "noisetier" INTEGER DEFAULT 0,
    "aulne" INTEGER DEFAULT 0,
    "peuplier" INTEGER DEFAULT 0,
    "saule" INTEGER DEFAULT 0,
    "frene" INTEGER DEFAULT 0,
    "charme" INTEGER DEFAULT 0,
    "bouleau" INTEGER DEFAULT 0,
    "platane" INTEGER DEFAULT 0,
    "chene" INTEGER DEFAULT 0,
    "olivier" INTEGER DEFAULT 0,
    "tilleul" INTEGER DEFAULT 0,
    "chataignier" INTEGER DEFAULT 0,
    "rumex" INTEGER DEFAULT 0,
    "graminees" INTEGER DEFAULT 0,
    "plantain" INTEGER DEFAULT 0,
    "urticacees" INTEGER DEFAULT 0,
    "armoises" INTEGER DEFAULT 0,
    "ambroisies" INTEGER DEFAULT 0,
    "total" INTEGER DEFAULT 0,

    CONSTRAINT "PollenAllergyRisk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherAlert" (
    "id" TEXT NOT NULL,
    "validity_start" TIMESTAMP(3) NOT NULL,
    "validity_end" TIMESTAMP(3) NOT NULL,
    "diffusion_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "municipality_insee_code" TEXT NOT NULL,
    "data_availability" "DataAvailabilityEnum" DEFAULT 'AVAILABLE',
    "code_alert" "CodeAlertEnums",
    "phenomenon" "PhenomenonsEnum",

    CONSTRAINT "WeatherAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndiceAtmosperic" (
    "id" TEXT NOT NULL,
    "validity_start" TIMESTAMP(3) NOT NULL,
    "validity_end" TIMESTAMP(3) NOT NULL,
    "diffusion_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "municipality_insee_code" TEXT NOT NULL,
    "data_availability" "DataAvailabilityEnum" DEFAULT 'AVAILABLE',
    "no2" INTEGER NOT NULL,
    "so2" INTEGER NOT NULL,
    "o3" INTEGER NOT NULL,
    "pm10" INTEGER NOT NULL,
    "pm25" INTEGER NOT NULL,
    "max_value" INTEGER NOT NULL,

    CONSTRAINT "IndiceAtmosperic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertPollutionAtmospheric" (
    "id" TEXT NOT NULL,
    "validity_start" TIMESTAMP(3) NOT NULL,
    "validity_end" TIMESTAMP(3) NOT NULL,
    "diffusion_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "municipality_insee_code" TEXT NOT NULL,
    "data_availability" "DataAvailabilityEnum" DEFAULT 'AVAILABLE',
    "state" "PollutionStateEnum" NOT NULL,
    "code" "PollutionCodeEnum" NOT NULL,
    "comment_short" TEXT NOT NULL,
    "comment_long" TEXT NOT NULL,

    CONSTRAINT "AlertPollutionAtmospheric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_matomo_id_key" ON "User"("matomo_id");

-- CreateIndex
CREATE INDEX "User_push_notif_token_idx" ON "User" USING HASH ("push_notif_token");

-- CreateIndex
CREATE INDEX "indice_uv_municipality_insee_code_diffusion_date_validity_start" ON "IndiceUv"("municipality_insee_code", "diffusion_date", "validity_start");
