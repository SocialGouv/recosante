-- CreateEnum
CREATE TYPE "NotificationEnum" AS ENUM ('CLICKED');

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "status" "NotificationEnum";
