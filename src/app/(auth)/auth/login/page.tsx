import { options } from "@/app/api/auth/[...nextauth]/options";
import { LoginFormJobApplicant } from "@/components/job-applicant/login-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(options());

  if (
    session?.user.role === "job_applicant" ||
    session?.user.role === "job_vacancy_provider"
  ) {
    return redirect("/");
  }

  return (
    <main className="bg-[#F3F9FF] w-full py-10 flex min-h-svh justify-center items-center">
      <section className="mx-auto max-w-lg w-full px-4 md:px-0">
        <LoginFormJobApplicant />
      </section>
    </main>
  );
}
