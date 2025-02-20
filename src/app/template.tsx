"use client";

import { ChildrenProps } from "@/types";
import { m } from "framer-motion";

export default function Template({ children }: ChildrenProps) {
  return (
    <m.div
      className="w-full"
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </m.div>
  );
}
