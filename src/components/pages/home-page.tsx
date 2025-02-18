import CardResultJob from "../card-result-job";
import Layout from "../container";
import hero from "../../../public/assets/hero.png";
import FormSearchJob from "../form-search-job";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="xl:space-y-14">
      {/* Gambar dan tagline */}
      <div className="w-full h-52 sm:h-full">
        {/* Tagline */}
        <div className="w-full h-full flex justify-center items-center bg-gradient-to-r from-secondary_color_1 via-secondary_color_1 to-primary_color">
          <Layout>
            <div className="sm:flex w-full sm:justify-between sm:items-center lg:items-start">
               {/* tagline singkat */}
              <div className="md:space-y-6 space-y-2 w-full sm:w-2/3 lg:w-1/2 lg:pt-16 py-4 sm:py-10">
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                  Temukan karier impianmu <span className="bg-gradient-to-r to-[#FFED3C] from-[#FF3C86] bg-clip-text text-transparent">dengan Mudah!</span>
                </h1>
                <p className="text-sm lg:text-base xl:text-lg">
                  Jelajahi peluang kerja khusus di daerah Bangka Belitung. Mulai
                  langkah pertamamu menuju masa depan !
                </p>

              </div>

              {/* Gambar */}
              <Image src={hero} alt="hero" className="hidden sm:block sm:w-[40%] lg:w-1/2" />
            </div>
          </Layout>
        </div>
      </div>

      <Layout>
        {/* Search Bar dan filter */}
        <div className="bg-secondary_color_1 rounded-lg p-10 my-12">
          <FormSearchJob />
        </div>

        {/* Card Job */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 grid-cols-1">
          {[...Array(8)].map((_, i) => (
            <CardResultJob key={i} />
          ))}
        </div>
      </Layout>
    </div>
  );
}
