"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { createReviewJobVacancyProvider } from "@/services/common";
import { ratingAtom } from "@/store";
import { UserProps } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { StarIcon } from "lucide-react";
import { useForm } from "react-hook-form";

export function ReviewJobVacancyProviderForm({ id }: { id: string }) {
  const [rating, setRating] = useAtom(ratingAtom);
  const { user } = useCurrentUser() as { user: UserProps };

  const {
    getValues,
    formState: { errors },
    setValue,
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const queryClient = useQueryClient();

  const reviewJobVacancyProviderMutation = useMutation({
    mutationFn: async () =>
      await createReviewJobVacancyProvider({
        user_id: "cm7g45z270001vba4fy6omuhz",
        company_id: "cm7gdjlfp0000uin0najtsxd2",
        body: getValues("comment"),
        rating: rating,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries().then(() => {
        toast({
          title: "Sukses menambahkan review!",
        });
      });
    },
    onError: (data) => {
      return toast({
        title: "Gagal memberikan review!",
        description: data.message,
      });
    },
  });

  async function onSubmit() {
    await reviewJobVacancyProviderMutation.mutateAsync();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-x-2 mt-6 flex justify-center items-center w-fit">
        {Array(5)
          .fill(null)
          .map((_, index) => index + 1)
          .map((item) => (
            <button
              type="button"
              aria-label={`Star ${item}`}
              key={item}
              onClick={() => setRating(item)}
            >
              <StarIcon
                className={cn(
                  "stroke-secondary_color_1",
                  item <= rating ? "fill-secondary_color_1" : ""
                )}
              />
            </button>
          ))}
      </div>
      <div className="flex justify-center items-start w-full flex-col md:space-y-0 md:flex-row md:space-x-8 mt-4 mb-7 space-y-3">
        <Input
          {...register("comment")}
          name="comment"
          placeholder="Tulis Ulasan"
          required
          className="border border-primary_color focus:border-primary_color text-black bg-white"
        />
        <Button
          type="submit"
          className="border border-primary_color bg-[#F3F9FF] rounded-sm md:w-fit w-full"
          size="lg"
          variant="outline"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
