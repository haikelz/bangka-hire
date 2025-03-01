import { calculateAverageRating } from "@/lib/number";
import { CommentProps, ProfilCompanyProps } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/assets/logo.png";

export default function CardSearchJobVacancyProvider({
  data,
}: {
  data: ProfilCompanyProps;
}) {
  // mencari jumlah rata rata rating
  const averageRating = calculateAverageRating(
    data?.comments as CommentProps[],
    (comment) => comment.rating
  );

  return (
    <Link
      href={`/job-vacancy-providers/${data.id}`}
      className="shadow-2xl bg-white rounded-lg p-3 border border-primary_color"
    >
      {/* Logo company */}
      <div className="flex items-start justify-between">
        <Image
          className="w-16 md:w-24"
          src={data.user?.image ?? logo}
          alt="Logo"
          width={50}
          height={50}
        />
        {/* rating dan ulasan */}
        <div className="flex items-center gap-3 text-[10px] md:text-xs">
          {/* rating */}
          <div className="flex items-center gap-1">
            <p>{averageRating ?? 0}</p>
            <Star fill="yellow" stroke="none" className="w-4" />
          </div>

          {/* ulasan */}
          <div>
            <p className="underline">{data.comments?.length ?? 0} ulasan</p>
          </div>
        </div>
      </div>

      {/* nama pt dan lokasi*/}
      <div className="text-sm md:text-base font-medium mb-8">
        <h1>{data.user?.full_name ?? "-"}</h1>
        <p>{data.user?.profile.city ?? "-"}</p>
      </div>

      {/* terakhir dilihat dan juga jumlah pekerjaan */}
      <div className="flex items-center justify-between text-[10px] md:text-xs">
        <p>Aktif 5 jam yang lalu</p>
        <p className="bg-secondary_color_3 rounded px-2 py-1">
          {data.jobs?.length ?? 0} lowongan
        </p>
      </div>
    </Link>
  );
}
