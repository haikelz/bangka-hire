"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCurrentUser, useCurrentUserGoogle } from "@/hooks/use-current-user";
import { toast } from "@/hooks/use-toast";
import { reviewJobVacancyProviderSchema } from "@/lib/schemas/common";
import { cn } from "@/lib/utils";
import { createReviewJobVacancyProvider } from "@/services/common";
import { ratingAtom } from "@/store";
import { UserProps } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { StarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { OnMutateClient } from "../react-query/on-mutate-client";

export function ReviewJobVacancyProviderForm({ id }: { id: string }) {
  const [rating, setRating] = useAtom(ratingAtom);

  const { user } = useCurrentUser() as { user: UserProps };

  const userGoogle = useCurrentUserGoogle();

  const {
    getValues,
    formState: { errors },
    setValue,
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(reviewJobVacancyProviderSchema),
    defaultValues: {
      comment: "",
    },
  });

  const queryClient = useQueryClient();

  const reviewJobVacancyProviderMutation = useMutation({
    mutationKey: [userGoogle ? userGoogle.id : user.id],
    mutationFn: async () =>
      await createReviewJobVacancyProvider({
        user_id: userGoogle ? userGoogle.id : user.id,
        company_id: id,
        body: getValues("comment"),
        rating: rating,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries().then(() => {
        toast({
          title: "Sukses menambahkan review perusahaan!",
        });
        setValue("comment", "");
      });
    },
    onError: (data) => {
      return toast({
        title: "Gagal memberikan review!",
        description: data.message,
      });
    },
  });

  if (reviewJobVacancyProviderMutation.isPending) return <OnMutateClient />;

  async function onSubmit() {
    await reviewJobVacancyProviderMutation.mutateAsync();
  }

  return (
    <>
      {userGoogle || user ? (
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="space-x-2 flex justify-center items-center w-fit">
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
            <div className="w-full">
              <Input
                {...register("comment")}
                name="comment"
                placeholder="Tulis Ulasan"
                required
                className="border border-primary_color focus:border-primary_color text-black bg-white"
              />
              {errors.comment ? (
                <span className="mt-1 text-red-500">
                  {errors.comment.message}
                </span>
              ) : null}
            </div>
            <Button
              disabled={rating === 0 ? true : false}
              type="submit"
              className="border border-primary_color bg-[#F3F9FF] rounded-sm md:w-fit w-full"
              size="lg"
              variant="outline"
            >
              Submit
            </Button>
          </div>
        </form>
      ) : null}
    </>
  );
}
