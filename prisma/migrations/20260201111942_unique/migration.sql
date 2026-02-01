/*
  Warnings:

  - A unique constraint covering the columns `[slotId]` on the table `booking` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "booking_slotId_key" ON "booking"("slotId");
