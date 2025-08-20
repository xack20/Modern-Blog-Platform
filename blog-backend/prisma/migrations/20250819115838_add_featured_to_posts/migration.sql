/*
  Warnings:

  - You are about to drop the column `featuredImage` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `seoDescription` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `seoTitle` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `views` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[featuredImageId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Post_authorId_idx";

-- DropIndex
DROP INDEX "public"."Post_categoryId_idx";

-- DropIndex
DROP INDEX "public"."Post_slug_idx";

-- DropIndex
DROP INDEX "public"."Post_status_idx";

-- AlterTable
ALTER TABLE "public"."Post" DROP COLUMN "featuredImage",
DROP COLUMN "seoDescription",
DROP COLUMN "seoTitle",
DROP COLUMN "views",
ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "featuredImageId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Post_featuredImageId_key" ON "public"."Post"("featuredImageId");

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_featuredImageId_fkey" FOREIGN KEY ("featuredImageId") REFERENCES "public"."Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
