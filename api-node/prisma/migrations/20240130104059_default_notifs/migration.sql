-- AlterTable
ALTER TABLE "User" ALTER COLUMN "notifications_preference" SET DEFAULT ARRAY['morning', 'evening', 'alert']::"NotifationEnum"[];
