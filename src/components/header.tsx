import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import NavLink from "./nav-link";


export default function Header() {
  return (
    <header>
      <nav className="flex justify-between items-center max-w-7xl mx-auto py-2 bg-white w-full text-primary_color">
        {/* Logo dan menu navbar */}
        <div className="flex items-center gap-10">
          <Image className="w-32" src={logo} alt="logo" />
          {/* Menu Navbar */}
          <div className="flex gap-10">
              <NavLink href="/">BERANDA</NavLink>
              <NavLink href="/">REVIEW PERUSAHAAN</NavLink>
          </div>
        </div>

        {/* Login dan Sign Up */}
        <div className="flex gap-10">
          <NavLink href="/login">MASUK</NavLink>
          <NavLink href="/sign-up">UNTUK PEMBERI KERJA</NavLink>
        </div>
      </nav>
    </header>
  );
}
