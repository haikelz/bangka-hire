"use client"

import Layout from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser, useCurrentUserGoogle } from "@/hooks/use-current-user";
import { UserProps } from "@/types";
import { ModalFormEditProfile } from "@/components/modal-form-edit-profile";
import { useState } from "react";
import { ModalFormTentangSaya } from "@/components/modal-form-tentang-saya";

export default function EditProfile () {
  const { user } = useCurrentUser() as { user: UserProps };
  const userGoogle = useCurrentUserGoogle();
  const [openModal, setOpenModal] = useState(false)
  const [openModalTentangSaya, setOpenModalTentangSaya] = useState(false)



  return (
    <Layout>
      <div className="bg-secondary_color_2 p-2 md:p-10 rounded-md space-y-6 mt-6">
          {/* Gambar dan profile lengkap tentang user */}
          <div className="flex gap-10 items-center">
            {/* Gambar */}
            <Avatar className="w-32 h-32">
              {/* Gambar */}
              {user?.image ? (
                <AvatarImage src={user.image} alt="avatar" />
              ) : (
                <AvatarFallback className="bg-primary_color text-white text-2xl">
                  {user?.full_name
                        ?.split(" ")
                        .map((name: string) => name[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                </AvatarFallback>
              )}
            </Avatar>

            {/* Nama email dan no hp */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-xl">{user?.full_name}</h1>
                <ModalFormEditProfile openModal={openModal} setOpenModal={setOpenModal} />
              </div>


              {/* No WhatsApp */}
              <div className="text-xs">
                <p>WhatsApp</p>
                <p>{user?.phone_number}</p>
              </div>

              {/* Email */}
              <div className="text-xs">
                <p>Email</p>
                <p>{user?.email}</p>
              </div>

            </div>

          </div>

          {/* Informasi profil and line */}
          <div className="space-y-2">
            <h1 className="uppercase text-primary_color">Informasi Profil</h1>
            <div className="h-[1px] bg-primary_color w-full"></div>
          </div>

          {/* Tentang Saya */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h1 className="uppercase font-bold text-xl">Tentang Saya</h1>
              <ModalFormTentangSaya openModal={openModalTentangSaya} setOpenModal={setOpenModalTentangSaya} />
            </div>

            <Textarea
              placeholder="Beritahu hal menarik tentang dirimu"
              defaultValue={user?.description}
              className="border-primary_color"
              disabled
              rows={9}
            />
          </div>

      </div>
    </Layout>
  )
}
