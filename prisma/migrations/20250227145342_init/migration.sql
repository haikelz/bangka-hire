/*
  Warnings:

  - Added the required column `company_type` to the `profil_company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profil_company" ADD COLUMN     "company_type" TEXT NOT NULL;
