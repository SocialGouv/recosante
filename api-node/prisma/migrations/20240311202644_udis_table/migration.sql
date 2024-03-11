-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE IF NOT EXISTS "udis" (
    "ogc_fid" SERIAL NOT NULL,
    "wkb_geometry" geometry(MultiPolygon,4326),
    "gid" INTEGER,
    "code_udi" TEXT,

    CONSTRAINT "udis_pkey" PRIMARY KEY ("ogc_fid")
);
