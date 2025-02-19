"use client";

import { usePathname } from "next/navigation";
import Header from "./header";
import Footer from "./footer";
import Wrapper from "@/app/wrapper";



export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const excludedPages = ["/dashboard", "/admin", "/404", "/auth"].some((str) =>
    pathname.includes(str)
  );

  return (
    <Wrapper>
      {!excludedPages && <Header />}
      {children}
      {!excludedPages && <Footer />}
    </Wrapper>
  );
}
