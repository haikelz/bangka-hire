"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const formatPathname = pathname.split("/")[pathname.split("/").length - 1];

  return (
    <>
      <header className="border-b border-b-secondary_color_1 p-4 w-full fixed md:sticky top-0 z-50 bg-white/70 backdrop-blur-md">
        <nav className="w-full">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-black capitalize font-bold text-xl md:text-3xl">
              {formatPathname}
            </h2>
            <Image
              src="/assets/logo.png"
              alt="logo"
              width={200}
              height={200}
              className="md:w-28 h-10 hidden md:block w-20 md:h-16"
            />
            <Button
              size="icon"
              variant="outline"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
          {isOpen ? (
            <div className="flex space-y-2 mt-4 justify-center items-center md:hidden flex-col w-full">
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
                  variant={
                    pathname === "/dashboard/jobs" ? "default" : "outline"
                  }
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
                  variant={
                    pathname === "/dashboard/profile" ? "default" : "outline"
                  }
                >
                  Profile Perusahaan
                </Button>
              </Link>
            </div>
          ) : null}
        </nav>
      </header>
    </>
  );
}
