-- AlterTable
ALTER TABLE "User" ALTER COLUMN "notifications_preference" SET DEFAULT ARRAY['evening', 'alert']::"NotifationEnum"[];
