/*
  Warnings:

  - Changed the type of `open` on the `Query` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `high` on the `Query` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `low` on the `Query` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `close` on the `Query` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Query" DROP COLUMN "open",
ADD COLUMN     "open" DOUBLE PRECISION NOT NULL,
DROP COLUMN "high",
ADD COLUMN     "high" DOUBLE PRECISION NOT NULL,
DROP COLUMN "low",
ADD COLUMN     "low" DOUBLE PRECISION NOT NULL,
DROP COLUMN "close",
ADD COLUMN     "close" DOUBLE PRECISION NOT NULL;
