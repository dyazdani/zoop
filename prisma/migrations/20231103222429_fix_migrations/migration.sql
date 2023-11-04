-- DropIndex
DROP INDEX "Zoop_dateCreated_key";

-- AlterTable
ALTER TABLE "Zoop" ALTER COLUMN "dateCreated" SET DEFAULT CURRENT_TIMESTAMP;
