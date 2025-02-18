/*
  Warnings:

  - You are about to drop the `job_applicant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_vacancy_provider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "job_applicant";

-- DropTable
DROP TABLE "job_vacancy_provider";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT,
    "google_oauth" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL,
    "cv" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
