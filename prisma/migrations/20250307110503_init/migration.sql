-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_company_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_user_id_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_company_id_fkey";

-- DropForeignKey
ALTER TABLE "profil_company" DROP CONSTRAINT "profil_company_user_id_fkey";

-- DropForeignKey
ALTER TABLE "users_on_jobs" DROP CONSTRAINT "users_on_jobs_jobs_id_fkey";

-- DropForeignKey
ALTER TABLE "users_on_jobs" DROP CONSTRAINT "users_on_jobs_user_id_fkey";

-- AddForeignKey
ALTER TABLE "users_on_jobs" ADD CONSTRAINT "users_on_jobs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_on_jobs" ADD CONSTRAINT "users_on_jobs_jobs_id_fkey" FOREIGN KEY ("jobs_id") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "profil_company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "profil_company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profil_company" ADD CONSTRAINT "profil_company_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
