-- AlterTable
ALTER TABLE "User" ADD COLUMN     "asked_for_review" INTEGER DEFAULT 0,
ADD COLUMN     "asked_for_review_latest_at" TIMESTAMP(3),
ADD COLUMN     "notifications_sent" INTEGER DEFAULT 0;
