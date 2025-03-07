"use client";

import { useCurrentUser, useCurrentUserGoogle } from "@/hooks/use-current-user";
import { logoutAccount } from "@/services/auth";
import { getUserPrisma } from "@/services/common";
import type { UserProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IsPendingClient } from "../react-query/is-pending-client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import NavLink from "./nav-link";

export function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useCurrentUser() as { user: UserProps };
  const userGoogle = useCurrentUserGoogle();

  const userId = user?.id || userGoogle?.id;

  // ambil data user dari server
  const { data, isPending, isError } = useQuery({
    queryKey: ["user_id", userId],
    queryFn: async () => {
      // di cek dulu apakah userID sudah ada atau belum
      if (!userId) return null;
      return await getUserPrisma(userId);
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // membuat navbar tertutup setiap kali pindah halaman
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // buat navbar menghilang pada saat user menscroll halaman window
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setTimeout(() => {
          setIsOpen(false);
        }, 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const menuVariants = {
    closed: {
      rotate: 0,
    },
    open: {
      rotate: 180,
    },
  };

  const Path = (props: any) => (
    <motion.span className="w-6 h-1 bg-primary_color rounded-lg" {...props} />
  );
  return (
    <>
      {/* Menu Hamburger */}
      <div className="md:hidden">
        <motion.div
          className="flex flex-col items-center justify-between h-6 cursor-pointer"
          onClick={() => setIsOpen((prev) => !prev)}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          transition={{ duration: 0.3 }}
        >
          <Path
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 10 },
            }}
            transition={{ duration: 0.3 }}
          />
          <Path
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.3 }}
          />
          <Path
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -10 },
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </div>
      {/* Akhir Menu Hamburger */}

      {/* Menu navbar di mobile */}
      <motion.div
        className="md:hidden fixed top-[61px] left-0 w-full bg-white shadow-lg"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: "hidden" }}
      >
        <div className="flex flex-col p-4 gap-4">
          <NavLink href="/">BERANDA</NavLink>
          <NavLink href="/job-vacancy-providers">CARI PERUSAHAAN</NavLink>
          <div className="border-t border-primary_color my-2" />
          {/* jika user sudah login */}
          {isPending ? (
            <div>
              <IsPendingClient className="h-8" />
            </div>
          ) : data?.user ? (
            <div className="space-y-3">
              {/* pengecekan role */}
              <h1 className="font-bold">
                {data.user.role === "job_applicant"
                  ? "Hai!! Pelamar Kerja"
                  : "Hai!! Pemberi Kerja"}
              </h1>

              <div className="flex items-center gap-2 cursor-default">
                <Avatar>
                  {data.user.image ? (
                    <AvatarImage
                      src={data.user.image}
                      alt="avatar"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <AvatarFallback className="bg-primary_color text-white">
                      {data.user.full_name
                        ?.split(" ")
                        .map((name: any) => name[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>

                {/* nama user dan juga gmail */}
                <div className="text-sm font-medium">
                  <p>{data.user.full_name}</p>
                  <p>{data.user.email}</p>
                </div>
              </div>

              {/* menu profil dan logout */}
              <Link
                href="/profile"
                className="border border-primary_color flex items-center gap-2 hover:bg-primary_color hover:text-white p-2 rounded-lg duration-300 ease-in-out"
              >
                <User className="w-6 h-6" />
                <p>Edit Profile</p>
              </Link>
              {/* logout */}
              <div
                onClick={() => logoutAccount()}
                className="border border-red-500 text-red-500 flex items-center cursor-pointer gap-2 hover:bg-red-500 hover:text-white p-2 rounded-lg duration-300 ease-in-out"
              >
                <LogOut className="w-6 h-6" />
                <p>Logout</p>
              </div>
            </div>
          ) : (
            <>
              <NavLink href="/auth/login">MASUK</NavLink>
              <NavLink href="/auth/sign-up-job-vacancy-provider">
                UNTUK PEMBERI KERJA
              </NavLink>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
}
