"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => {
  const pathname = usePathname();
  return (
    <Link
      className={cn(
        "border px-3 py-[1px] border-primary_color rounded-sm text-center text-sm lg:text-base",
        pathname === href ? "bg-primary_color text-white" : "text-primary_color"
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
