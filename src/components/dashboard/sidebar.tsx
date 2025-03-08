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

  const isAdminRoute = pathname.startsWith("/dashboard/admin");

  return isAdminRoute ? (
    // Sidebar Admin
    <aside className="min-h-svh sticky top-0 hidden md:flex justify-start items-center w-72 flex-col p-6 h-full bg-secondary_color_2">
      <div className="flex items-center justify-start w-full flex-col">
        <Avatar className="w-24 h-24 md:w-[60px] md:h-[60px]">
          {/* Gambar */}
          {user?.image || userGoogle?.image ? (
            <AvatarImage
              src={user ? user.image : userGoogle?.image}
              alt="avatar"
              referrerPolicy="no-referrer"
            />
          ) : (
            <AvatarImage
              src="/assets/fallback-user.svg"
              alt="avatar"
              referrerPolicy="no-referrer"
            />
          )}
        </Avatar>
        <p className="mt-2">
          {user ? user.full_name : userGoogle ? userGoogle.name : "Admin"}
        </p>
      </div>
      <div className="flex space-y-2 mt-10 justify-center items-center flex-col w-full">
        <Link href="/dashboard/admin" className="w-full">
          <Button
            className={cn(
              "w-full",
              pathname === "/dashboard/admin"
                ? "bg-secondary_color_1 hover:bg-primary_color"
                : "bg-none"
            )}
            variant={pathname === "/dashboard/admin" ? "default" : "outline"}
          >
            Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/admin/view-company" className="w-full">
          <Button
            className={cn(
              "w-full",
              pathname === "/dashboard/admin/view-company"
                ? "bg-secondary_color_1 hover:bg-primary_color"
                : "bg-none"
            )}
            variant={
              pathname === "/dashboard/admin/view-company"
                ? "default"
                : "outline"
            }
          >
            View Company
          </Button>
        </Link>
      </div>
    </aside>
  ) : (
    // sidebar khusus untuk perusahaan
    <aside className="min-h-svh sticky top-0 hidden md:flex justify-start items-center w-72 flex-col p-6 h-full bg-secondary_color_2">
      <div className="flex items-center justify-start w-full flex-col">
        <Avatar className="w-24 h-24 md:w-[60px] md:h-[60px]">
          {/* Gambar */}
          {user?.image || userGoogle?.image ? (
            <AvatarImage
              src={user ? user.image : userGoogle?.image}
              alt="avatar"
              referrerPolicy="no-referrer"
            />
          ) : (
            <AvatarFallback className="bg-primary_color text-white text-2xl"></AvatarFallback>
          )}
        </Avatar>
        <p className="mt-2">
          {user
            ? user.full_name
            : userGoogle
            ? userGoogle.name
            : "Job Vacancy Provider"}
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
