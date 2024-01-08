/*
  Warnings:

  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notifications_preference" "NotifationEnum"[];

-- DropTable
DROP TABLE "Notification";
