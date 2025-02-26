/*
  Warnings:

  - You are about to drop the column `salary` on the `jobs` table. All the data in the column will be lost.
  - Added the required column `salary_max` to the `jobs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salary_min` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "salary",
ADD COLUMN     "salary_max" INTEGER NOT NULL,
ADD COLUMN     "salary_min" INTEGER NOT NULL;
