import Layout from "@/components/container";
import { SearchJobVacancyProviderPage } from "@/components/pages/search-job-vacancy-provider-page";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import hero from "../../../../public/assets/cari-perusahaan.png";

export default function SearchJob() {
  return (
    <main>
      <section className="space-y-8 xl:space-y-14">
        {/* Gambar dan tagline */}
        <div className="w-full h-52 sm:h-full">
          {/* Tagline */}
          <div className="w-full h-full flex justify-center items-center bg-gradient-to-r from-secondary_color_1 to-primary_color">
            <Layout>
              <div className="sm:flex w-full sm:justify-between sm:items-center lg:items-start">
                {/* tagline singkat */}
                <div className="md:space-y-6 space-y-2 w-full sm:w-2/3 lg:w-1/2 lg:pt-16 py-4 sm:py-10 text-white">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                    Explore lebih banyak perusahaan
                  </h1>
                  <form>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Cari perusahaan"
                        className="w-full text-xs md:text-sm xl:text-base md:w-[80%] xl:w-1/2 px-8 md:px-9 py-1 md:py-4 lg:py-6 bg-white text-gray-500 font-medium focus:border-none focus:outline-none"
                      />
                      <Search
                        width={20}
                        color="#6b7280"
                        className="absolute top-1 left-2 md:top-[5px] lg:top-3 lg:left-3"
                      />
                    </div>
                  </form>
                </div>
                {/* Gambar */}
                <Image
                  src={hero}
                  alt="hero"
                  className="hidden sm:block sm:w-[40%] lg:w-1/2"
                />
              </div>
            </Layout>
          </div>
        </div>
        <SearchJobVacancyProviderPage />
      </section>
    </main>
  );
}
