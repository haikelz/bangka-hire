import { SignUpFormJobApplicant } from "@/components/job-applicant/sign-up-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = (await cookies()).get("auth-token");

  if (session) {
    redirect("/");
  }

  return <SignUpFormJobApplicant />;
}
