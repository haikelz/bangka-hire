"use client";

import { useCurrentUser, useCurrentUserGoogle } from "@/hooks/use-current-user";
import { getCompanyByUserId, getUserPrisma } from "@/services/common";
import type { UserProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useState } from "react";
import { IsErrorClient } from "../react-query/is-error-client";
import { IsPendingClient } from "../react-query/is-pending-client";

const FormEditJobVacancyProviderProfile = dynamic(() =>
  import("@/components/dashboard/form-job-vacancy-provider-profile").then(
    (comp) => comp.FormEditJobVacancyProviderProfile
  )
);
const FormCreateJobVacancyProviderProfile = dynamic(() =>
  import("@/components/dashboard/form-job-vacancy-provider-profile").then(
    (comp) => comp.FormCreateJobVacancyProviderProfile
  )
);

export function JobVacancyProviderProfilePage() {
  const { user } = useCurrentUser() as { user: UserProps };
  const userGoogle = useCurrentUserGoogle();

  const [isProfileExist, setIsProfileExist] = useState<boolean>(false);

  const userId = (user?.id || userGoogle?.id) as string;

  const { data, isPending, isError } = useQuery({
    queryKey: ["user_id", userId],
    queryFn: async () => {
      if (!userId) return null;

      const isExist = await getCompanyByUserId(userId);

      if (isExist.exists) {
        setIsProfileExist(true);
      }

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
      {isProfileExist ? (
        <FormEditJobVacancyProviderProfile
          userId={userId}
          userGoogle={userGoogle}
          jobVacancyProvider={jobVacancyProvider}
        />
      ) : (
        <FormCreateJobVacancyProviderProfile
          userId={userId}
          userGoogle={userGoogle}
          jobVacancyProvider={jobVacancyProvider}
        />
      )}
    </div>
  );
}
