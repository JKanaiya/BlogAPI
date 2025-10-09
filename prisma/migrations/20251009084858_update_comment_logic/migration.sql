/*
  Warnings:

  - You are about to drop the column `subCommentId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_subCommentId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "subCommentId",
ADD COLUMN     "parentCommentId" INTEGER;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
