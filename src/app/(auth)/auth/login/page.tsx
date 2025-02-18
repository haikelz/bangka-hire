import { options } from "@/app/api/auth/[...nextauth]/options";
import { LoginFormJobApplicant } from "@/components/job-applicant/login-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(options());

  console.log(session);

  if (
    session?.user.role === "job_applicant" ||
    session?.user.role === "job_vacancy_provider"
  ) {
    return redirect("/");
  }

  return (
    <div>
      <LoginFormJobApplicant />
    </div>
  );
}
