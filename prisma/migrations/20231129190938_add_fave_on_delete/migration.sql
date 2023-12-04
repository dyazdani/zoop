-- DropForeignKey
ALTER TABLE "Fave" DROP CONSTRAINT "Fave_zoopId_fkey";

-- AddForeignKey
ALTER TABLE "Fave" ADD CONSTRAINT "Fave_zoopId_fkey" FOREIGN KEY ("zoopId") REFERENCES "Zoop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
