"use client";

import { cn } from "@/lib/utils";
import { getJobVacancyProvider } from "@/services/common";
import { companyTabAtom } from "@/store";
import { UserProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns/format";
import { useAtom } from "jotai";
import {
  Calendar,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CardResultJob from "../card-result-job";
import { ReviewJobVacancyProviderForm } from "../job-vacancy-provider/review-job-vacancy-provider-form";
import { IsErrorClient } from "../react-query/is-error-client";
import { IsPendingClient } from "../react-query/is-pending-client";

export function DetailJobVacancyProviderPage({ id }: { id: string }) {
  const [companyTab, setCompanyTab] = useAtom(companyTabAtom);

  const { data, isPending, isError } = useQuery({
    queryKey: [id],
    queryFn: async () => await getJobVacancyProvider(id),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isPending) return <IsPendingClient className="h-svh" />;
  if (isError) return <IsErrorClient />;

  const jobVacancyProvider = data?.data.data as UserProps;

  return (
    <>
      <div className="rounded-sm bg-secondary_color_2 px-7 py-6">
        <div className="space-y-5">
          <div className="flex sm:flex-row flex-col sm:space-x-10 space-y-2 sm:space-y-0 justify-between items-start w-fit">
            <Image
              src="/assets/logo.png"
              alt="company logo"
              width={77}
              height={77}
            />
            <div className="space-y-1">
              <h3 className="font-bold text-xl">
                {jobVacancyProvider.full_name}
              </h3>
              <div className="flex space-x-4 justify-center items-center w-fit">
                <div className="flex justify-center items-center w-fit space-x-2">
                  <span>4.8</span>
                  <StarIcon
                    width={16}
                    height={16}
                    className="fill-secondary_color_1 stroke-secondary_color_1"
                  />
                  <p>Total Penilaian</p>
                </div>
                <p className="underline">
                  {jobVacancyProvider.comments?.length} Ulasan
                </p>
              </div>
              <div className="space-x-1 flex justify-center items-center w-fit">
                <Image
                  src="/assets/location-company.svg"
                  alt="location"
                  width={16}
                  height={16}
                />
                <p>Web dan Teknologi</p>
              </div>
              <div className="space-x-1 flex justify-center items-center w-fit">
                <Image
                  src="/assets/fluent-location.svg"
                  alt="location"
                  width={16}
                  height={16}
                />
                <p>{jobVacancyProvider.profile?.city ?? "-"}</p>
              </div>
              <div className="flex justify-center items-center space-x-2 w-fit">
                <Calendar className="" width={16} height={16} />
                <p>
                  Bergabung sejak{" "}
                  {format(jobVacancyProvider?.createdAt, "MMMM yyyy")}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="border-b w-full border-b-primary_color py-3">
              <div className="flex justify-center items-center w-fit space-x-10">
                <h3
                  onClick={() => setCompanyTab("deskripsi")}
                  className={cn(
                    "hover:text-secondary_color_1 text-xl font-bold cursor-pointer",
                    companyTab === "deskripsi" ? "text-secondary_color_1" : ""
                  )}
                >
                  Deskripsi
                </h3>
                <h3
                  onClick={() => setCompanyTab("pekerjaan")}
                  className={cn(
                    "hover:text-secondary_color_1 text-xl font-bold cursor-pointer",
                    companyTab === "pekerjaan" ? "text-secondary_color_1" : ""
                  )}
                >
                  Pekerjaan
                </h3>
              </div>
            </div>
            {companyTab === "deskripsi" ? (
              <div className="w-full py-7">
                <div className="space-y-2">
                  <p className="font-bold">Tentang Perusahaan</p>
                  <p className="text-justify">
                    {jobVacancyProvider.profile?.description_company ?? "-"}
                  </p>
                </div>
                <div className="mt-6">
                  <h3 className="text-black text-xl font-bold">Hubungi Kami</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <p className="font-bold text-black mt-3">Alamat</p>
                      <p>{jobVacancyProvider.profile?.street ?? "-"}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-bold text-black">Media Sosial</p>
                      <div className="flex justify-center items-center space-x-2 w-fit">
                        <Link
                          href={jobVacancyProvider.profile?.instagram ?? ""}
                        >
                          <InstagramIcon width={16} height={16} />
                        </Link>
                        <Link href={jobVacancyProvider.profile?.facebook ?? ""}>
                          <FacebookIcon width={16} height={16} />
                        </Link>
                        <Link href={jobVacancyProvider.profile?.gmail ?? ""}>
                          <MailIcon width={16} height={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <ReviewJobVacancyProviderForm id={id} />
                {jobVacancyProvider.comments &&
                jobVacancyProvider.comments.length ? (
                  <div className="space-y-6">
                    {jobVacancyProvider.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex w-full flex-col justify-start items-start"
                      >
                        <div className="border-primary_color border px-4 bg-white py-4 w-full rounded-sm">
                          <div className="space-y-1">
                            <div className="flex w-full justify-between items-start">
                              <div className="flex justify-center items-center w-fit space-x-2">
                                {/*<Image
                                className="rounded-full"
                                src={comment.user.image ?? ""}
                                alt="comment"
                                width={50}
                                height={50}
                                />*/}
                                {/*<p>{comment.user.full_name}</p>*/}
                              </div>
                              <p>
                                {/*formatDate(comment.user.createdAt, "MMMM yyyy")*/}
                              </p>
                            </div>
                            <div className="flex justify-center items-center w-fit space-x-1">
                              <span>4</span>
                              <StarIcon
                                width={16}
                                height={16}
                                className="fill-secondary_color_1 stroke-secondary_color_1"
                              />
                            </div>
                            <p className="text-justify">
                              ipsum dolor sit amet consectetur. Donec porta sem
                              netus diam fermentum porta amet elit.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xl font-bold text-center">
                    Belum ada ulasan!
                  </p>
                )}
              </div>
            ) : companyTab === "pekerjaan" ? (
              <div className="w-full py-7">
                {jobVacancyProvider.jobs && jobVacancyProvider.jobs.length ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 grid-cols-1">
                    {jobVacancyProvider.jobs.map((item, i) => (
                      <CardResultJob data={item.job} key={i} />
                    ))}
                  </div>
                ) : (
                  <p className="text-xl font-bold text-center">
                    Belum ada lowongan kerja!
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
