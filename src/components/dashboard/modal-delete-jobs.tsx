import { toast } from "@/hooks/use-toast";
import { deleteJob } from "@/services/common";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteIcon, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "../ui/dialog";

type DeleteJobsProps = {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  jobId: string;
};

export function ModalDeleteJobs({
  openModal,
  setOpenModal,
  jobId,
}: DeleteJobsProps) {
  const queryClient = useQueryClient();

  const deleteJobsMutation = useMutation({
    mutationFn: async () => await deleteJob(jobId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["get-jobs"],
        refetchType: "all",
      });

      // Close the modal after successful deletion
      setOpenModal(false);

      toast({
        title: "Sukses menghapus lowongan!",
        description: "Kamu Berhasil menghapus lowongan!",
      });
    },
    onError: (error) => {
      toast({
        title: "Gagal menghapus lowongan!",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = () => {
    deleteJobsMutation.mutateAsync();
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      {/* Tombol untuk membuka modal */}
      <DialogTrigger>
        <DeleteIcon className="w-6 fill-red-600 stroke-white cursor-pointer" />
      </DialogTrigger>

      {/* content dari modal */}
      <DialogContent className="max-w-sm sm:max-w-lg rounded-lg">
        <DialogTitle className="text-sm md:text-base">
          Apakah anda yakin ingin menghapus lowongan ini?
        </DialogTitle>
        <p className="text-[10px] md:text-xs text-red-600 font-medium">
          Peringatan!!!: Lowongan yang telah dihapus tidak dapat dikembalikan
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
            disabled={deleteJobsMutation.isPending}
          >
            {deleteJobsMutation.isPending ? (
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
