"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export function Sidebar() {
  const pathname = usePathname();

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
          <Button
            className={cn(
              "w-full",
              pathname === "/dashboard" ? "bg-secondary_color_1" : "bg-none"
            )}
            variant={pathname === "/dashboard" ? "default" : "outline"}
          >
            Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/jobs" className="w-full">
          <Button
            className={cn(
              "w-full",
              pathname === "/dashboard/jobs"
                ? "bg-secondary_color_1"
                : "bg-none"
            )}
            variant={pathname === "/dashboard/jobs" ? "default" : "outline"}
          >
            Jobs
          </Button>
        </Link>
        {/** Show the company section only in job_vacancy_provider role */}
        <Link href="/dashboard/profile" className="w-full">
          <Button
            className={cn(
              "w-full",
              pathname === "/dashboard/profile"
                ? "bg-secondary_color_1"
                : "bg-none"
            )}
            variant={pathname === "/dashboard/profile" ? "default" : "outline"}
          >
            Profile Perusahaan
          </Button>
        </Link>

        <Link href={"/"}>
            Home
        </Link>
      </div>
    </aside>
  );
}
