import { options } from "@/app/api/auth/[...nextauth]/options";
import { LoginFormJobApplicant } from "@/components/job-applicant/login-form";
import db from "@/lib/db";
import { getServerSession } from "next-auth";

export default async function Login() {
  const session = await getServerSession(options);
  const data = await db.user.findMany();

  console.log(data);

  return (
    <main className="bg-[#F3F9FF] w-full py-10 flex min-h-svh justify-center items-center">
      <section className="mx-auto max-w-lg w-full px-4 md:px-0">
        <LoginFormJobApplicant />
      </section>
    </main>
  );
}
