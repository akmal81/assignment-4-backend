/*
  Warnings:

  - You are about to drop the column `rating` on the `tutorProfiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tutorProfiles" DROP COLUMN "rating",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'N/A';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'STUDENT';
