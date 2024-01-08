/*
  Warnings:

  - The values [MORNING,EVENING,ALERT] on the enum `NotifationEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NotifationEnum_new" AS ENUM ('morning', 'evening', 'alert');
ALTER TABLE "Notification" ALTER COLUMN "name" TYPE "NotifationEnum_new" USING ("name"::text::"NotifationEnum_new");
ALTER TYPE "NotifationEnum" RENAME TO "NotifationEnum_old";
ALTER TYPE "NotifationEnum_new" RENAME TO "NotifationEnum";
DROP TYPE "NotifationEnum_old";
COMMIT;
