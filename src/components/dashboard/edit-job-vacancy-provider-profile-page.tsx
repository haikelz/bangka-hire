"use client";

import { useCurrentUser, useCurrentUserGoogle } from "@/hooks/use-current-user";
import { getUserPrisma } from "@/services/common";
import { UserProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IsErrorClient } from "../react-query/is-error-client";
import { IsPendingClient } from "../react-query/is-pending-client";
import { FormEditJobVacancyProviderProfile } from "./form-edit-job-vacancy-provider-profile";

export function EditJobVacancyProviderProfilePage() {
  const { user } = useCurrentUser() as { user: UserProps };
  const userGoogle = useCurrentUserGoogle();

  const userId = user?.id || userGoogle?.id;

  // mengambil data user
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

  if (isPending) return <IsPendingClient className="my-10 h-[50vh]" />;
  if (isError) return <IsErrorClient />;

  return (
    <div className="py-8 px-8 w-full">
      <FormEditJobVacancyProviderProfile />
    </div>
  );
}
