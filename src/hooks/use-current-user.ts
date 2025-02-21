"use client"

import { getCurrentUser } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export function useCurrentUser() {
  const { data, ...rest } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // Cache selama 5 menit
  });

  return {
    user: data?.user,
    ...rest,
  }
}

// mengambil data user khusus yang login lewat google
export function useCurrentUserGoogle() {
  const { data: session} = useSession();
  return session?.user
}
