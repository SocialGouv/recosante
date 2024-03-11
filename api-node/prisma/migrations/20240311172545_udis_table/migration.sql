-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateTable
CREATE TABLE "udis" (
    "ogc_fid" INTEGER NOT NULL,
    "wkb_geometry" geometry(MultiPolygon,4326) NOT NULL,
    "gid" INTEGER NOT NULL,
    "code_udi" TEXT NOT NULL,

    CONSTRAINT "udis_pkey" PRIMARY KEY ("ogc_fid")
);
