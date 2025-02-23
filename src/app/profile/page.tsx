"use client"

import Layout from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser, useCurrentUserGoogle } from "@/hooks/use-current-user";
import { UserProps } from "@/types";
import { ModalFormEditProfile } from "@/components/modal-form-edit-profile";
import { useState } from "react";
import { ModalFormTentangSaya } from "@/components/modal-form-tentang-saya";
import { useQuery } from "@tanstack/react-query";
import { getUserPrisma } from "@/services/common";
import { IsPendingClient } from "@/components/react-query/is-pending-client";
import { IsErrorClient } from "@/components/react-query/is-error-client";
import Image from "next/image";

export default function EditProfile () {
  const { user } = useCurrentUser() as { user: UserProps };
  const userGoogle = useCurrentUserGoogle();

  const userId = user?.id || userGoogle?.id;


  // mengambil data user
  const { data, isPending, isError } = useQuery({
      queryKey: ["user_id", userId],
      queryFn: async () => {
        // di cek dulu apakah userID sudah ada atau belum
        if (!userId) return null
        return await getUserPrisma(userId)
      },
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 5,
  });

  console.log



  const [openModal, setOpenModal] = useState(false)
  const [openModalTentangSaya, setOpenModalTentangSaya] = useState(false)

  if (isPending) return <IsPendingClient className="my-10 h-[50vh]" />;
  if (isError) return <IsErrorClient />;


  return (
    <Layout>
      <div className="bg-secondary_color_2 p-2 md:p-10 rounded-md space-y-3 md:space-y-6 mt-6">

          {/* dicek dulu apakah data user sudah ada */}

          {/* Gambar dan profile lengkap tentang user */}
          <div className="flex gap-10 items-center">
            {/* Gambar */}
            <Avatar className="w-24 h-24 md:w-32 md:h-32">
              {/* Gambar */}
              {data?.user.image ? (
                <AvatarImage src={data?.user.image} alt="avatar" referrerPolicy="no-referrer"/>
              ) : (
                <AvatarFallback className="bg-primary_color text-white text-2xl">
                  {data?.user.full_name
                        ?.split(" ")
                        .map((name: string) => name[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                </AvatarFallback>
              )}
            </Avatar>

            {/* Nama email dan no hp */}
            <div className="space-y-3 md:space-y-6">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg md:text-xl">{data?.user?.full_name}</h1>
                <ModalFormEditProfile openModal={openModal} setOpenModal={setOpenModal} userInfo={data?.user} />
              </div>


              {/* No WhatsApp */}
              <div className="text-[10px] md:text-xs">
                <p>WhatsApp</p>
                <p>{!data?.user.phone_number ? "-" : data?.user?.phone_number }</p>
              </div>

              {/* Email */}
              <div className="text-[10px] md:text-xs">
                <p>Email</p>
                <p>{data?.user.email}</p>
              </div>

            </div>

          </div>

          {/* Informasi profil and line */}
          <div className="space-y-2">
            <h1 className="uppercase text-primary_color text-sm md:text-base">Informasi Profil</h1>
            <div className="h-[1px] bg-primary_color w-full"></div>
          </div>

          {/* Tentang Saya */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="uppercase font-bold text-lg md:text-xl">Tentang Saya</h1>
              <ModalFormTentangSaya openModal={openModalTentangSaya} setOpenModal={setOpenModalTentangSaya} userInfo={data?.user} />
            </div>

            <Textarea
              placeholder="Beritahu hal menarik tentang dirimu"
              defaultValue={data?.user?.description}
              className="border-primary_color text-black text-sm md:text-base focus:outline-none focus:border-none"
              readOnly
              rows={9}
            />
          </div>
      </div>
    </Layout>
  )
}
