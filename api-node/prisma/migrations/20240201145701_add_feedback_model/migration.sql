-- CreateEnum
CREATE TYPE "NotifationEnum" AS ENUM ('morning', 'evening', 'alert');

-- CreateEnum
CREATE TYPE "IndicatorsSlugEnum" AS ENUM ('indice_atmospheric', 'indice_uv', 'pollen_allergy', 'weather_alert', 'bathing_water');

-- CreateEnum
CREATE TYPE "DataAvailabilityEnum" AS ENUM ('AVAILABLE', 'NOT_AVAILABLE');

-- CreateEnum
CREATE TYPE "AlertStatusEnum" AS ENUM ('NOT_ALERT_THRESHOLD', 'ALERT_NOTIFICATION_NOT_SENT_YET', 'ALERT_NOTIFICATION_SENT', 'ALERT_NOTIFICATION_ERROR');

-- CreateEnum
CREATE TYPE "BathgWaterIdCarteEnum" AS ENUM ('gua', 'mar', 'guy', 'reu', 'may', 'fra');

-- CreateEnum
CREATE TYPE "PollutionStateEnum" AS ENUM ('ALERT', 'INFORMATION_AND_RECOMMANDATION', 'NO_ALERT', 'ALERT_PERSISTANCE');

-- CreateEnum
CREATE TYPE "PollutionCodeEnum" AS ENUM ('SULFUR_DIOXIDE', 'NITROGEN_DIOXIDE', 'FINES_PARTICLES', 'OZONE', 'PM10', 'PM25', 'BENZENE');

-- CreateEnum
CREATE TYPE "SeasonEnum" AS ENUM ('Printemps', 'Ete', 'Automne', 'Hiver', 'Toute');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "matomo_id" TEXT NOT NULL,
    "appversion" TEXT,
    "appbuild" TEXT,
    "appdevice" TEXT,
    "municipality_insee_code" TEXT,
    "municipality_name" TEXT,
    "municipality_zip_code" TEXT,
    "push_notif_token" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),
    "deleted_because" TEXT,
    "favorite_indicator" "IndicatorsSlugEnum",
    "notifications_preference" "NotifationEnum"[] DEFAULT ARRAY['evening', 'alert']::"NotifationEnum"[],

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
    "alert_status" "AlertStatusEnum" NOT NULL DEFAULT 'NOT_ALERT_THRESHOLD',
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
    "municipality_insee_code" TEXT NOT NULL,
    "validity_start" TIMESTAMP(3) NOT NULL,
    "validity_end" TIMESTAMP(3) NOT NULL,
    "diffusion_date" TIMESTAMP(3) NOT NULL,
    "data_availability" "DataAvailabilityEnum" NOT NULL DEFAULT 'AVAILABLE',
    "alert_status" "AlertStatusEnum" NOT NULL DEFAULT 'NOT_ALERT_THRESHOLD',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "municipality_insee_code" TEXT NOT NULL,
    "validity_start" TIMESTAMP(3) NOT NULL,
    "validity_end" TIMESTAMP(3) NOT NULL,
    "diffusion_date" TIMESTAMP(3) NOT NULL,
    "data_availability" "DataAvailabilityEnum" NOT NULL DEFAULT 'AVAILABLE',
    "alert_status" "AlertStatusEnum" NOT NULL DEFAULT 'NOT_ALERT_THRESHOLD',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "violent_wind" INTEGER,
    "rain_flood" INTEGER,
    "storm" INTEGER,
    "flood" INTEGER,
    "snow_ice" INTEGER,
    "heat_wave" INTEGER,
    "cold_wave" INTEGER,
    "avalanche" INTEGER,
    "waves_submersion" INTEGER,

    CONSTRAINT "WeatherAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndiceAtmospheric" (
    "id" TEXT NOT NULL,
    "unique_composed_key" TEXT NOT NULL,
    "municipality_insee_code" TEXT NOT NULL,
    "validity_start" TIMESTAMP(3) NOT NULL,
    "validity_end" TIMESTAMP(3) NOT NULL,
    "diffusion_date" TIMESTAMP(3) NOT NULL,
    "data_availability" "DataAvailabilityEnum" NOT NULL DEFAULT 'AVAILABLE',
    "alert_status" "AlertStatusEnum" NOT NULL DEFAULT 'NOT_ALERT_THRESHOLD',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "id_carte" "BathgWaterIdCarteEnum",

    CONSTRAINT "BathingWater_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlertPollutionAtmospheric" (
    "id" TEXT NOT NULL,
    "municipality_insee_code" TEXT NOT NULL,
    "validity_start" TIMESTAMP(3) NOT NULL,
    "validity_end" TIMESTAMP(3) NOT NULL,
    "diffusion_date" TIMESTAMP(3) NOT NULL,
    "data_availability" "DataAvailabilityEnum" NOT NULL DEFAULT 'AVAILABLE',
    "alert_status" "AlertStatusEnum" NOT NULL DEFAULT 'NOT_ALERT_THRESHOLD',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "has_bathing_water_sites" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
    "seasons" "SeasonEnum"[],

    CONSTRAINT "Recommandation_pkey" PRIMARY KEY ("unique_key")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "ticket" TEXT,
    "error" TEXT,
    "push_notif_token" TEXT NOT NULL,
    "appversion" TEXT,
    "appbuild" TEXT,
    "appdevice" TEXT,
    "indicatorSlug" "IndicatorsSlugEnum" NOT NULL,
    "indicatorId" TEXT NOT NULL,
    "indicatorValue" INTEGER NOT NULL,
    "recommandationId" TEXT,
    "typeWeatherAlert" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "score" INTEGER,
    "message" TEXT,
    "contact" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
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
CREATE INDEX "weather_alert_insee_code_diffusion_date_validity_start" ON "WeatherAlert"("municipality_insee_code", "diffusion_date", "validity_start");

-- CreateIndex
CREATE INDEX "WeatherAlert_violent_wind_rain_flood_storm_flood_snow_ice_h_idx" ON "WeatherAlert"("violent_wind", "rain_flood", "storm", "flood", "snow_ice", "heat_wave", "cold_wave", "avalanche", "waves_submersion");

-- CreateIndex
CREATE UNIQUE INDEX "municipality_insee_code+date_maj+date_ech" ON "IndiceAtmospheric"("unique_composed_key");

-- CreateIndex
CREATE INDEX "indice_atmo_insee_code_diffusion_date_validity_start" ON "IndiceAtmospheric"("municipality_insee_code", "diffusion_date", "validity_start");

-- CreateIndex
CREATE INDEX "bathing_water_insee_code_diffusion_date_validity_start" ON "BathingWater"("municipality_insee_code", "diffusion_date", "validity_start");

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
ALTER TABLE "BathingWater" ADD CONSTRAINT "BathingWater_municipality_insee_code_fkey" FOREIGN KEY ("municipality_insee_code") REFERENCES "Municipality"("COM") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlertPollutionAtmospheric" ADD CONSTRAINT "AlertPollutionAtmospheric_municipality_insee_code_fkey" FOREIGN KEY ("municipality_insee_code") REFERENCES "Municipality"("COM") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
