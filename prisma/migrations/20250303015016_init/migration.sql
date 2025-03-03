/*
  Warnings:

  - Added the required column `salary_range` to the `jobs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "salary_range" TEXT NOT NULL;
