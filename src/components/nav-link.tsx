"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const NavLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => {
  const pathname = usePathname();
  return (
    <Link className={`border px-3 py-[1px] border-primary_color rounded-full text-center text-sm lg:text-base
                      ${pathname === href ? "bg-primary_color text-white" : "text-primary_color"}`} href={href}>
      {children}
    </Link>
  );
}

export default NavLink;
