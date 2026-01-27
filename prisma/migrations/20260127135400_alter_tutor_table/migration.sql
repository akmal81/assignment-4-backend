/*
  Warnings:

  - Made the column `userId` on table `tutorProfiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "tutorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tutorProfiles" ALTER COLUMN "userId" SET NOT NULL;
