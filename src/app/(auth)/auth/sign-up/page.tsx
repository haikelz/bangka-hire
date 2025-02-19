import { SignUpFormJobApplicant } from "@/components/job-applicant/sign-up-form";

export default async function SignUp() {
  return (
    <main className="bg-[#F3F9FF] w-full py-10 flex min-h-svh justify-center items-center">
      <section className="mx-auto max-w-lg w-full px-4 md:px-0">
        <SignUpFormJobApplicant />
      </section>
    </main>
  );
}
