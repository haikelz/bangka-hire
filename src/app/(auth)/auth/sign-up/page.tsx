import { SignUpFormJobApplicant } from "@/components/job-applicant/sign-up-form";
import db from "@/lib/db";

export default async function SignUp() {
  const data = await db.users.findMany();
  console.log(data);
  return (
    <>
      <SignUpFormJobApplicant />
    </>
  );
}
