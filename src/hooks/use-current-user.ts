"use client";

import { getCurrentUser } from "@/services/auth";
import { getUserPrisma } from "@/services/common";
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
  };
}

// mengambil data user khusus yang login lewat google
export function useCurrentUserGoogle() {
  const { data: session } = useSession();
  return session?.user;
}

// mengambil data user dari server atau database
export function useGetUserServer() {
  const { user } = useCurrentUser();
  const userGoogle = useCurrentUserGoogle();

  // mengambil id user saat ini
  const userId = user?.id || userGoogle?.id;

  const { data, isPending, isError } = useQuery({
    queryKey: ["user_id", userId],
    queryFn: async () => {
      // di cek dulu apakah userID sudah ada atau belum
      if (!userId) return null;
      return await getUserPrisma(userId);
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user: data?.user,
    isPending,
    isError,
  };
}
