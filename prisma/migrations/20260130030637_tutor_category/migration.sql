/*
  Warnings:

  - The primary key for the `category` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `category` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `categoryId` column on the `tutorProfiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "tutorProfiles" DROP CONSTRAINT "tutorProfiles_categoryId_fkey";

-- AlterTable
ALTER TABLE "category" DROP CONSTRAINT "category_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "tutorProfiles" ADD COLUMN     "availablity" BOOLEAN DEFAULT true,
ALTER COLUMN "average_rating" SET DEFAULT 0,
DROP COLUMN "categoryId",
ADD COLUMN     "categoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "tutorProfiles" ADD CONSTRAINT "tutorProfiles_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
