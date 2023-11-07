/*
  Warnings:

  - A unique constraint covering the columns `[faverId,zoopId]` on the table `Fave` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Fave_faverId_zoopId_key" ON "Fave"("faverId", "zoopId");
