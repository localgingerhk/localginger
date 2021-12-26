/*
  Warnings:

  - Changed the type of `type` on the `Token` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('RESET_PASSWORD');

-- AlterTable
ALTER TABLE "Token" DROP COLUMN "type",
ADD COLUMN     "type" "TokenType" NOT NULL;

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "img" TEXT,
    "imgHeight" DOUBLE PRECISION,
    "logo" TEXT,
    "name" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT,
    "website" TEXT,
    "social" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Listing_name_category_key" ON "Listing"("name", "category");
