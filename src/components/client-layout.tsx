"use client";

import Wrapper from "@/app/wrapper";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Footer from "./footer";
import Header from "./header";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const excludedPages = ["/dashboard", "/admin", "/404", "/auth"].some((str) =>
    pathname.includes(str)
  );

  return (
    <SessionProvider>
      <Wrapper>
        {!excludedPages && <Header />}
        {children}
        {!excludedPages && <Footer />}
      </Wrapper>
    </SessionProvider>
  );
}
