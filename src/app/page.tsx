import Layout from "@/components/common/container";
import HomePage from "@/components/common/home-page";
import Image from "next/image";
import hero from "../../public/assets/hero.png";

export default async function Home() {
  return (
    <main>
      <div className="xl:space-y-14">
        {/* Gambar dan tagline */}
        <div className="w-full h-52 sm:h-full">
          {/* Tagline */}
          <div className="w-full h-full flex justify-center items-center bg-gradient-to-r from-secondary_color_1 to-primary_color">
            <Layout>
              <div className="sm:flex w-full sm:justify-between sm:items-center lg:items-start">
                {/* tagline singkat */}
                <div className="md:space-y-6 space-y-2 w-full sm:w-2/3 lg:w-1/2 lg:pt-16 py-4 sm:py-10 text-white">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
                    Temukan karier impianmu{" "}
                    <span className="bg-gradient-to-r to-[#FFED3C] from-[#FF3C86] bg-clip-text text-transparent">
                      dengan Mudah!
                    </span>
                  </h1>
                  <p className="text-sm lg:text-base xl:text-lg">
                    Jelajahi peluang kerja khusus di daerah Bangka Belitung.
                    Mulai langkah pertamamu menuju masa depan !
                  </p>
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
      </div>
      <HomePage />
    </main>
  );
}
