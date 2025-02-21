"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../../public/assets/logo.png";
import NavLink from "./nav-link";
import { MobileNavbar } from "./mobile-navbar";
import { getCurrentUser, loginAccount, logoutAccount } from "@/services/auth";
import { UserProps } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, SettingsIcon, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

export default function Header() {
  const [isScroll, setIsScroll] = useState(false);
  const { user } = useCurrentUser() as { user: UserProps };
  const [open, setOpen] = useState(false);

  // membuat dropdown menu tertutup saat di mode mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <header
      className={`bg-white text-primary_color sticky top-0 z-50 ${
        isScroll ? "border-b border-primary_color" : ""
      } duration-200 ease-in-out`}
    >
      <nav className="flex justify-between items-center w-full md:max-w-[1366px] xl:mx-auto py-2 px-4 lg:px-[30px] 2xl:px-0">
        {/* Logo dan menu navbar */}
        <div className="flex items-center md:gap-5 xl:gap-10">
          <Link href="/">
            <Image className="w-20 md:w-24 xl:w-32" src={logo} alt="logo" />
          </Link>

          {/* menu navbar */}
          <div className="hidden md:flex md:gap-5 xl:gap-10">
            <NavLink href="/">BERANDA</NavLink>
            <NavLink href="/job-vacancy-providers">CARI PERUSAHAAN</NavLink>
          </div>
        </div>

        {/* pada saat user sudah login */}
        {user ? (
          <>
            <div className="hidden items-center md:flex md:gap-5 ">
              {/* image user dan nama lengkap user berserta dengan gmail */}
              <div className="flex items-center gap-2 cursor-default">
                <Avatar>
                {user?.image ? (
                  <AvatarImage src={user.image} alt="avatar" />
                ) : (
                  <AvatarFallback className="bg-primary_color text-white">
                    {user?.full_name
                      ?.split(" ")
                      .map((name) => name[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                )}
                </Avatar>

                {/* nama user dan juga gmail */}
                <div className="text-[10px] md:text-xs lg:text-sm font-medium">
                  <p>{user.full_name}</p>
                  <p>{user.email}</p>
                </div>
              </div>

              {/* button dropdown menu */}
              <div className="text-[10px] md:text-xs lg:text-sm">
                <DropdownMenu open={open} onOpenChange={setOpen}>
                  <DropdownMenuTrigger asChild>
                      <SettingsIcon className="lg:w-10 cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-secondary_color_2 p-1 text-xs md:text-sm">
                    <DropdownMenuLabel>
                      {user.role === "job_applicant" ? "Hai!! Pelamar Kerja" : "Hai!! Pemberi Kerja"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-primary_color" />
                    <DropdownMenuItem className="hover:bg-primary_color hover:text-white">
                      <Link href="/profile" className="flex items-center gap-2 w-full hover:bg-primary_color hover:text-white p-2 rounded-sm duration-200 ease-in-out">
                        <User className="w-4 h-4" />
                        <p>Edit Profile</p>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <div onClick={() => logoutAccount()} className="flex items-center gap-2 w-full text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-sm duration-200 ease-in-out cursor-pointer">
                        <LogOut className="w-4 h-4" />
                        <p>Logout</p>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </>
        ) : (
          // Login dan sign up
          <div className="hidden md:flex md:gap-5 xl:gap-10">
            <NavLink href="/auth/login">MASUK</NavLink>
            <NavLink href="/auth/sign-up">UNTUK PEMBERI KERJA</NavLink>
          </div>
        )}

        {/* Mobile Menu */}
        <MobileNavbar />

      </nav>
    </header>
  );
}
