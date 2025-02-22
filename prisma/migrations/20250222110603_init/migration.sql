-- AlterTable
ALTER TABLE "profil_company" ALTER COLUMN "gmail" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "description" TEXT;
