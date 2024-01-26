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
    "data_availability" "DataAvailabilityEnum" NOT NULL DEFAULT 'AVAILABLE',
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
    "data_availability" "DataAvailabilityEnum" NOT NULL DEFAULT 'AVAILABLE',
    "cypres" INTEGER,
    "noisetier" INTEGER,
    "aulne" INTEGER,
    "peuplier" INTEGER,
    "saule" INTEGER,
    "frene" INTEGER,
    "charme" INTEGER,
    "bouleau" INTEGER,
    "platane" INTEGER,
    "chene" INTEGER,
    "olivier" INTEGER,
    "tilleul" INTEGER,
    "chataignier" INTEGER,
    "rumex" INTEGER,
    "graminees" INTEGER,
    "plantain" INTEGER,
    "urticacees" INTEGER,
    "armoises" INTEGER,
    "ambroisies" INTEGER,
    "total" INTEGER,

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
    "data_availability" "DataAvailabilityEnum" NOT NULL DEFAULT 'AVAILABLE',
    "code_alert" "CodeAlertEnums",
    "phenomenon" "PhenomenonsEnum",

    CONSTRAINT "WeatherAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndiceAtmospheric" (
    "id" TEXT NOT NULL,
    "unique_composed_key" TEXT NOT NULL,
    "validity_start" TIMESTAMP(3) NOT NULL,
    "validity_end" TIMESTAMP(3) NOT NULL,
    "diffusion_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "municipality_insee_code" TEXT NOT NULL,
    "data_availability" "DataAvailabilityEnum" NOT NULL DEFAULT 'AVAILABLE',
    "code_no2" INTEGER,
    "code_o3" INTEGER,
    "code_pm10" INTEGER,
    "code_pm25" INTEGER,
    "code_so2" INTEGER,
    "code_qual" INTEGER,
    "lib_qual" TEXT,
    "date_maj" TEXT,
    "date_dif" TEXT,
    "date_ech" TEXT,
    "code_zone" TEXT,
    "source" TEXT,
    "type_zone" TEXT,
    "partition_field" TEXT,
    "coul_qual" TEXT,
    "lib_zone" TEXT,
    "aasqa" TEXT,
    "gml_id" INTEGER,
    "epsg_reg" TEXT,
    "x_reg" DOUBLE PRECISION,
    "x_wgs84" DOUBLE PRECISION,
    "y_reg" DOUBLE PRECISION,
    "y_wgs84" DOUBLE PRECISION,

    CONSTRAINT "IndiceAtmospheric_pkey" PRIMARY KEY ("id")
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
    "data_availability" "DataAvailabilityEnum" NOT NULL DEFAULT 'AVAILABLE',
    "state" "PollutionStateEnum" NOT NULL,
    "code" "PollutionCodeEnum" NOT NULL,
    "comment_short" TEXT NOT NULL,
    "comment_long" TEXT NOT NULL,

    CONSTRAINT "AlertPollutionAtmospheric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CronJob" (
    "id" TEXT NOT NULL,
    "unique_key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CronJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Municipality" (
    "COM" TEXT NOT NULL,
    "TYPECOM" TEXT NOT NULL,
    "REG" TEXT NOT NULL,
    "DEP" TEXT NOT NULL,
    "CTCD" TEXT,
    "ARR" TEXT,
    "CAN" TEXT,
    "EPCI" TEXT,
    "LIBEPCI" TEXT,
    "TNCC" TEXT,
    "NCC" TEXT,
    "NCCENR" TEXT,
    "LIBELLE" TEXT,
    "COMPARENT" TEXT,

    CONSTRAINT "Municipality_pkey" PRIMARY KEY ("COM")
);

-- CreateTable
CREATE TABLE "Recommandation" (
    "unique_key" TEXT NOT NULL,
    "recommandation_id" TEXT NOT NULL,
    "recommandation_content" TEXT NOT NULL,
    "indicator" "IndicatorsSlugEnum" NOT NULL,
    "indicator_value" INTEGER NOT NULL,
    "type_weather_alert" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recommandation_pkey" PRIMARY KEY ("unique_key")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_matomo_id_key" ON "User"("matomo_id");

-- CreateIndex
CREATE INDEX "User_push_notif_token_idx" ON "User" USING HASH ("push_notif_token");

-- CreateIndex
CREATE INDEX "indice_uv_municipality_insee_code_diffusion_date_validity_start" ON "IndiceUv"("municipality_insee_code", "diffusion_date", "validity_start");

-- CreateIndex
CREATE INDEX "pollen_municipality_insee_code_diffusion_date_validity_start" ON "PollenAllergyRisk"("municipality_insee_code", "diffusion_date", "validity_start");

-- CreateIndex
CREATE INDEX "weather_municipality_insee_code_diffusion_date_validity_start" ON "WeatherAlert"("municipality_insee_code", "diffusion_date", "validity_start");

-- CreateIndex
CREATE UNIQUE INDEX "municipality_insee_code+date_maj+date_ech" ON "IndiceAtmospheric"("unique_composed_key");

-- CreateIndex
CREATE INDEX "indice_atmo_insee_code_diffusion_date_validity_start" ON "IndiceAtmospheric"("municipality_insee_code", "diffusion_date", "validity_start");

-- CreateIndex
CREATE UNIQUE INDEX "CronJob_unique_key_key" ON "CronJob"("unique_key");

-- CreateIndex
CREATE UNIQUE INDEX "Recommandation_unique_key_key" ON "Recommandation"("unique_key");

-- CreateIndex
CREATE INDEX "recommandation_indeicator_indicator_value" ON "Recommandation"("indicator", "indicator_value");

-- AddForeignKey
ALTER TABLE "IndiceUv" ADD CONSTRAINT "IndiceUv_municipality_insee_code_fkey" FOREIGN KEY ("municipality_insee_code") REFERENCES "Municipality"("COM") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PollenAllergyRisk" ADD CONSTRAINT "PollenAllergyRisk_municipality_insee_code_fkey" FOREIGN KEY ("municipality_insee_code") REFERENCES "Municipality"("COM") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeatherAlert" ADD CONSTRAINT "WeatherAlert_municipality_insee_code_fkey" FOREIGN KEY ("municipality_insee_code") REFERENCES "Municipality"("COM") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndiceAtmospheric" ADD CONSTRAINT "IndiceAtmospheric_municipality_insee_code_fkey" FOREIGN KEY ("municipality_insee_code") REFERENCES "Municipality"("COM") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertPollutionAtmospheric" ADD CONSTRAINT "AlertPollutionAtmospheric_municipality_insee_code_fkey" FOREIGN KEY ("municipality_insee_code") REFERENCES "Municipality"("COM") ON DELETE RESTRICT ON UPDATE CASCADE;
