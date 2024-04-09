-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "helpful" TEXT,
ALTER COLUMN "score" DROP NOT NULL;
