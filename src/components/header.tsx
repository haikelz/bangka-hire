"use client"


import React, { useState } from 'react';
import Image from "next/image";
import logo from "../assets/logo.png";
import NavLink from "./nav-link";
import { motion } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const Path = (props : any) => (
    <motion.span
      className="w-6 h-1 bg-primary_color rounded-lg"
      {...props}
    />
  );

  return (
    <header className="bg-white text-primary_color">
      <nav className="flex justify-between items-center w-full md:max-w-7xl xl:mx-auto py-2 px-6 md:px-[30px]">
        {/* Logo dan menu navbar */}
        <div className="flex items-center md:gap-5 xl:gap-10">
          <Image className="w-20 md:w-24 xl:w-32" src={logo} alt="logo" />

          {/* menu navbar */}
          <div className="hidden md:flex md:gap-5 xl:gap-10">
            <NavLink href="/">BERANDA</NavLink>
            <NavLink href="/review-perusahaan">REVIEW PERUSAHAAN</NavLink>
          </div>
        </div>

        {/* Login dan sign up */}
        <div className="hidden md:flex md:gap-5 xl:gap-10">
          <NavLink href="/login">MASUK</NavLink>
          <NavLink href="/sign-up">UNTUK PEMBERI KERJA</NavLink>
        </div>

        {/* Menu Hamburger */}
        <div className="md:hidden">
          <motion.div
            className="flex flex-col items-center justify-between h-6 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
          >
            <Path
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 10 }
              }}
              transition={{ duration: 0.3 }}
            />
            <Path
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 }
              }}
              transition={{ duration: 0.3 }}
            />
            <Path
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -10 }
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
        {/* Akhir Menu Hamburger */}

        {/* Menu navbar di mobile */}
        <motion.div
          className="md:hidden fixed top-16 left-0 w-full bg-white shadow-lg"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          style={{ overflow: "hidden" }}
        >
          <div className="flex flex-col p-4 gap-4">
            <NavLink href="/">BERANDA</NavLink>
            <NavLink href="/review-perusahaan">REVIEW PERUSAHAAN</NavLink>
            <div className="border-t border-primary_color my-2" />
            <NavLink href="/login">MASUK</NavLink>
            <NavLink href="/sign-up">UNTUK PEMBERI KERJA</NavLink>
          </div>
        </motion.div>
      </nav>
    </header>
  );
}
