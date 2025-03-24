"use client";

import { getJobById } from "@/services/common";
import type { JobProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { File } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IsErrorClient } from "../react-query/is-error-client";
import { IsPendingClient } from "../react-query/is-pending-client";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function JobDetailPage({ id }: { id: string }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      return await getJobById(id, true);
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending)
    return (
      <div className="w-full px-4 md:px-8">
        <IsPendingClient className="w-full my-10 min-h-svh h-full" />
      </div>
    );
  if (isError) return <IsErrorClient />;

  const jobDetail = data.data as JobProps;

  return (
    <section className="p-8 w-full">
      {jobDetail.users.length ? (
        <div className="gap-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-cols-1">
            {jobDetail.users.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <Image
                    src={item.user.image ?? "/assets/fallback-user.svg"}
                    alt="job applicant"
                    width={50}
                    height={50}
                    className="rounded-full mb-2"
                  />
                  <CardTitle>{item.user.full_name}</CardTitle>
                  <CardDescription>
                    {item.user.description ?? "Tidak ada deskripsi!"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {item.cv ? (
                    <Link
                      href={item.cv}
                      className="flex justify-start items-center space-x-1"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Button variant="outline">
                        <File size={21} />
                        <span className="text-sm font-bold">CV</span>
                      </Button>
                    </Link>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-xl font-bold">
          Belum ada pelamar kerja yang mendaftar!
        </p>
      )}
    </section>
  );
}
