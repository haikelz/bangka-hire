"use client";

import { ChildrenProps } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";

export default function Wrapper({ children }: ChildrenProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </LazyMotion>
    </QueryClientProvider>
  );
}
