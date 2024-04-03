/*
  Warnings:

  - A unique constraint covering the columns `[expo_id]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "expo_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Notification_expo_id_key" ON "Notification"("expo_id");
