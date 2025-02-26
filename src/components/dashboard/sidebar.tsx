import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export function Sidebar() {
  return (
    <aside className="min-h-svh sticky top-0 hidden md:flex justify-start items-center flex-col w-fit p-6 h-full bg-secondary_color_2">
      <div className="flex items-center justify-start w-full flex-col">
        <Image
          src="/assets/fallback-user.svg"
          alt="user"
          width={60}
          height={60}
        />
        <p className="mt-2">Employer</p>
      </div>
      <div className="flex space-y-2 mt-10 justify-center items-center flex-col w-full">
        <Link href="/dashboard" className="w-full">
          <Button className="w-full bg-secondary_color_1" variant="default">
            Dashboard
          </Button>
        </Link>
        <Link href="dashboard/jobs" className="w-full">
          <Button className="w-full bg-secondary_color_1" variant="default">
            Jobs
          </Button>
        </Link>
        {/** Show the company section only in job_vacancy_provider role */}
        <Link href="/dashboard/profile" className="w-full">
          <Button className="w-full bg-secondary_color_1" variant="default">
            Profile Perusahaan
          </Button>
        </Link>
      </div>
    </aside>
  );
}
