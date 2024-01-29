/*
  Warnings:

  - You are about to drop the column `appversion_build` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "appversion_build",
ADD COLUMN     "appbuild" TEXT,
ADD COLUMN     "appdevice" TEXT;
