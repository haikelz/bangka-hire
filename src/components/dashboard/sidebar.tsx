"use client";

import { useCurrentUser, useCurrentUserGoogle } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export function Sidebar() {
  const { user } = useCurrentUser();
  const userGoogle = useCurrentUserGoogle();

  const pathname = usePathname();

  return (
    <aside className="min-h-svh sticky top-0 hidden md:flex justify-start items-center flex-col w-fit p-6 h-full bg-secondary_color_2">
      <div className="flex items-center justify-start w-full flex-col">
        <Avatar className="w-24 h-24 md:w-[60px] md:h-[60px]">
          {/* Gambar */}
          {user || userGoogle ? (
            <AvatarImage
              src={user ? user.image : userGoogle?.image}
              alt="avatar"
              referrerPolicy="no-referrer"
            />
          ) : (
            <AvatarFallback className="bg-primary_color text-white text-2xl">
              Image
            </AvatarFallback>
          )}
        </Avatar>
        <p className="mt-2">
          {user ? user.full_name : userGoogle ? userGoogle.name : "Employer"}
        </p>
      </div>
      <div className="flex space-y-2 mt-10 justify-center items-center flex-col w-full">
        <Link href="/dashboard" className="w-full">
          <Button
            className={cn(
              "w-full",
              pathname === "/dashboard"
                ? "bg-secondary_color_1 hover:bg-primary_color"
                : "bg-none"
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
                ? "bg-secondary_color_1 hover:bg-primary_color"
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
                ? "bg-secondary_color_1 hover:bg-primary_color"
                : "bg-none"
            )}
            variant={pathname === "/dashboard/profile" ? "default" : "outline"}
          >
            Profile Perusahaan
          </Button>
        </Link>
      </div>
    </aside>
  );
}
