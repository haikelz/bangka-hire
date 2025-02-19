import { options } from "@/app/api/auth/[...nextauth]/options";
import { LoginFormJobApplicant } from "@/components/job-applicant/login-form";

export default function Login() {
  // const data = await db.user.findMany();

  // console.log(data);

  return (
    <main className="bg-[#F3F9FF] w-full py-10 flex min-h-svh justify-center items-center">
      <section className="mx-auto max-w-lg w-full px-4 md:px-0">
        <LoginFormJobApplicant />
      </section>
    </main>
  );
}
