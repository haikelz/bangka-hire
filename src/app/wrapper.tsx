"use client";

import { ChildrenProps } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

export default function Wrapper({ children }: ChildrenProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
<<<<<<< HEAD
          {children}
=======
          <div className="w-full">
            <m.div
              className="w-full"
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {children}
            </m.div>
          </div>
>>>>>>> 9ae678d9275aeaf658e39708d4bf4ca2505f2572
        </AnimatePresence>
      </LazyMotion>
    </QueryClientProvider>
  );
}
