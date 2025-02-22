"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { UserProps } from "@/types";
import Image from "next/image";
import kirim from "../../public/assets/kirim-lamaran-icon.svg";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type ModalFormJobApplyProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
};

export default function ModalFormJobApply({
  openModal,
  setOpenModal,
}: ModalFormJobApplyProps) {
  const { user } = useCurrentUser() as { user: UserProps };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      {/* Tombol untuk membuka modal */}
      <DialogTrigger asChild>
        {/* Tombol Kirim Lamaran */}
        <Button className="bg-secondary_color_3 text-black px-12 hover:bg-secondary_color_1 hover:text-white">
          <div className="flex items-center gap-2">
            <Image className="invert" src={kirim} alt="Kirim Lamaran" />
            <p className="font-medium">Kirim Lamaran</p>
          </div>
        </Button>
      </DialogTrigger>

      {/* Konten Modal */}
      <DialogContent className="max-w-sm sm:max-w-md rounded-lg">
        <DialogHeader>
          <DialogTitle>Form Lamaran</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="full_name">Nama Lengkap</Label>
            <Input
              id="full_name"
              name="full_name"
              placeholder="Masukkan nama lengkap Anda"
              defaultValue={user?.full_name}
            />
          </div>

          <div>
            <Label htmlFor="phone_number">No Handphone</Label>
            <Input
              id="phone_number"
              name="phone_number"
              placeholder="Masukkan no handphone Anda"
              defaultValue={user?.phone_number}
            />
          </div>

          <div>
            <Label
              htmlFor="cv"
              className="bg-secondary_color_3 px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary_color_1 duration-300 ease-in-out hover:text-white"
            >
              Upload CV
            </Label>
            <Input type="file" id="cv" className="hidden" />
          </div>

          <Button
            type="submit"
            className="w-full bg-secondary_color_3 text-black hover:text-white hover:bg-secondary_color_1"
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
