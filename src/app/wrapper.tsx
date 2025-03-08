"use client";

import type { ChildrenProps } from "@/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { Provider } from "jotai";

export default function Wrapper({ children }: ChildrenProps) {
  const queryClient = new QueryClient();

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait">
            <div className="w-full min-h-svh">{children}</div>
          </AnimatePresence>
        </LazyMotion>
      </QueryClientProvider>
    </Provider>
  );
}
