
import Image from 'next/image';
import hero from '../../assets/hero.png';
import Layout from '../container';
import logo from '../../assets/logo.png';
import FormSearchJob from '../form-search-job';
import CardResultJob from '../card-result-job';



export default function HomePage() {

    return (
        <div className='xl:space-y-14'>
          {/* Gambar dan tagline */}
          <div className='w-full  bg-gradient-to-r from-secondary_color_1 via-secondary_color_1 to-primary_color'>
            {/* Tagline */}
                <Layout>
                  <div className='flex justify-between items-center'>
                    {/* tagline singkat */}
                    <div className='mt-16 space-y-6 w-[65%]'>
                      <h1 className='text-4xl font-bold'>Temukan karier impianmu dengan mudah!</h1>
                      <p className='text-2xl'>Jelajahi peluang kerja khusus di daerah Bangka Belitung. Mulai langkah pertamamu
                      menuju masa depan !</p>
                    </div>

                    {/* Gambar */}
                    <Image src={hero} alt="hero" />
                  </div>

                </Layout>
          </div>

          <Layout>
              {/* Search Bar dan filter */}
              <div className='bg-secondary_color_1 rounded-lg p-10 mb-12'>
                  <FormSearchJob />
              </div>

              {/* Card Job */}
              <div className='grid grid-cols-4 gap-6'>
                {[...Array(8)].map((_, i) => (
                  <CardResultJob key={i} />
                ))}
              </div>
          </Layout>


        </div>
    )
}
