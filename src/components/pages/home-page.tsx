
import Image from 'next/image';
import hero from '../../assets/Hero Section.png';
import Layout from '../container';
import logo from '../../assets/logo.png';
import FormSearchJob from '../form-search-job';
import CardResultJob from '../card-result-job';



export default function HomePage() {

    return (
        <div className='xl:space-y-14'>
          {/* Gambar dan tagline */}
          <div className='relative w-full'>
            <Image className='w-full' src={hero} alt="Hero Section" />
            {/* Tagline */}
            <div className='absolute w-full h-full top-0 flex items-start'>
                <Layout>
                  {/* tagline singkat */}
                  <div className='mt-16 space-y-6 w-[65%]'>
                    <h1 className='text-4xl font-bold'>Temukan karier impianmu dengan mudah!</h1>
                    <p className='text-2xl'>Jelajahi peluang kerja khusus di daerah Bangka Belitung. Mulai langkah pertamamu
                    menuju masa depan !</p>
                  </div>
                </Layout>
            </div>
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
