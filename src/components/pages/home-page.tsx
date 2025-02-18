import CardResultJob from "../card-result-job";
import Layout from "../container";
import FormSearchJob from "../form-search-job";

export default function HomePage() {
  return (
    <div className="xl:space-y-14">
      {/* Gambar dan tagline */}
      <div className="relative w-full">
        {/* Tagline */}
        <div className="w-full h-full sm:h-72 flex items-start bg-heroSection bg-cover bg-no-repeat">
          <Layout>
            {/* tagline singkat */}
            <div className="sm:space-y-6 space-y-2 w-full sm:pt-16 py-4">
              <h1 className="text-2xl sm:text-4xl font-bold">
                Temukan karier impianmu dengan mudah!
              </h1>
              <p className="text-base sm:text-2xl">
                Jelajahi peluang kerja khusus di daerah Bangka Belitung. Mulai
                langkah pertamamu menuju masa depan !
              </p>
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
