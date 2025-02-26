import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import Layout from "../common/container";
import { Skeleton } from "../ui/skeleton";

type Props = HTMLAttributes<HTMLDivElement>;

export function IsPendingClient({ className, ...props }: Props) {
  return (
    <Layout>
      <Skeleton className={cn("w-full rounded-md", className)} {...props} />
    </Layout>
  );
}
