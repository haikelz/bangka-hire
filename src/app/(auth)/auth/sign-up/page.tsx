import { SignUpFormJobApplicant } from "@/components/job-applicant/sign-up-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = (await cookies()).get("auth-token");

  if (session) {
    redirect("/");
  }

  return (
      <main className="bg-[#F3F9FF] w-full py-10 flex min-h-svh justify-center items-center">
        <section className="mx-auto max-w-lg w-full px-4 md:px-0">
          <SignUpFormJobApplicant />
        </section>
      </main>
  );
}
