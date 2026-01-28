-- AlterTable
ALTER TABLE "tutorProfiles" ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "subject" TEXT NOT NULL DEFAULT 'any',
ALTER COLUMN "categoryId" DROP NOT NULL;
