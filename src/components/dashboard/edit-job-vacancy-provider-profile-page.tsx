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

  const userId = (user?.id || userGoogle?.id) as string;

  const { data, isPending, isError } = useQuery({
    queryKey: ["user_id", userId],
    queryFn: async () => {
      if (!userId) return null;
      return await getUserPrisma(userId);
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending)
    return (
      <div className="w-full px-4 md:px-8">
        <IsPendingClient className="w-full my-10 min-h-svh h-full" />
      </div>
    );
  if (isError) return <IsErrorClient />;

  const jobVacancyProvider = data?.user as UserProps;

  return (
    <div className="py-8 px-8 w-full">
      <FormEditJobVacancyProviderProfile
        userId={userId}
        userGoogle={userGoogle}
        jobVacancyProvider={jobVacancyProvider}
      />
    </div>
  );
}
