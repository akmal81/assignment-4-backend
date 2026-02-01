-- DropIndex
DROP INDEX "booking_slotId_key";

-- AlterTable
ALTER TABLE "availabilitySlot" ALTER COLUMN "isBooked" SET DEFAULT true;
