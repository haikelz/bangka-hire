"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { deleteUser } from "@/services/common";
import { jobVacancyId } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { Loader } from "lucide-react";

type DeleteJobsProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  userId?: string;
  userName?: string;
};

export function ModalDeleteJobVacancy({
  openModal,
  setOpenModal,
  userId,
  userName,
}: DeleteJobsProps) {
  const [jobVacancy, setJobVacancyId] = useAtom(jobVacancyId);


  const queryClient = useQueryClient();

  const deleteJobVacancyMutation = useMutation({
    mutationFn: async () => await deleteUser(userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["jobVacancies"],
        refetchType: "all",
      });

      // Close the modal after successful deletion
      setOpenModal(false);

      toast({
        title: "Sukses menghapus User!",
        description: "Kamu Berhasil menghapus User!",
      });
    },
    onError: (error) => {
      toast({
        title: "Gagal menghapus User!",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = () => {
    deleteJobVacancyMutation.mutateAsync();
    setJobVacancyId("")
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      {/* content dari modal */}
      <DialogContent className="max-w-sm sm:max-w-lg rounded-lg">
        <DialogTitle className="text-sm md:text-base">
          Apakah anda yakin ingin menghapus {userName}?
        </DialogTitle>
        <p className="text-[10px] md:text-xs text-red-600 font-medium">
          Peringatan!!!: User yang telah dihapus tidak dapat dikembalikan
        </p>
        {/* tombol hapus dan tidak */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button className="bg-secondary_color_1 hover:bg-primary_color text-xs md:text-sm cursor-pointer text-white font-medium">
              Batal
            </Button>
          </DialogClose>
          <Button
            onClick={onSubmit}
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-xs md:text-sm"
            disabled={deleteJobVacancyMutation.isPending}
          >
            {deleteJobVacancyMutation.isPending ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              "Hapus"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
