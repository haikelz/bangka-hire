"use client";

import { ChildrenProps } from "@/types";
import { setDefaultOptions } from "date-fns";
import { id } from "date-fns/locale";
import { m } from "framer-motion";

// Set locale to Indonesia(ID)
setDefaultOptions({ locale: id });

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
