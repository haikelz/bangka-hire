import { SignUpFormJobVacancyProvider } from "@/components/job-vacancy-provider/sign-up-form-job-vacancy-provider";

export default async function SignUpJobVacancyProvider() {
  return (
    <main className="bg-[#F3F9FF] w-full py-10 flex min-h-svh justify-center items-center">
      <section className="mx-auto max-w-lg w-full px-4 md:px-0">
        <SignUpFormJobVacancyProvider />
      </section>
    </main>
  );
}
