import Image from 'next/image';
import logo from '../assets/logo.png';
import location from '../assets/location.png';
import salary from '../assets/salary.png';
import status from '../assets/status-work.png';
import time from '../assets/time.png';
import Link from 'next/link';


export default function CardResultJob() {
  return (
    <div className="w-[365px] shadow-2xl bg-white rounded-lg p-4 border border-primary_color">
      {/* Logo company */}
      <Image className='w-24' src={logo} alt="Logo"  />
      {/* informasi singkat dari nama perusahaan, posisi, gaji, dll */}
      <div className='text-black mt-4 space-y-2'>
        <div className='text-primary_color'>
          <h3 className='text-2xl font-bold line-clamp-1'>PT. BabelHire</h3>
          <p className='text-lg font-medium line-clamp-1'>Frontend Developer</p>
        </div>

        {/* Informasi lokasi perusahaan dan gaji dan status pekerjaan */}
        <div className='font-medium text-sm'>
          {/* location */}
          <div className='flex items-center gap-2'>
            <Image className='w-4' src={location} alt="Location" />
            <p>Pangkal Pinang, Bangka Belitung</p>
          </div>

          {/* salary */}
          <div className='flex items-center gap-2'>
            <Image className='w-4' src={salary} alt="Salary" />
            <p>Rp. 5.000.000 - Rp. 10.000.000</p>
          </div>

          {/* status work */}
          <div className='flex items-center gap-2'>
            <Image className='w-4' src={status} alt="Status" />
            <p>Fulltime</p>
          </div>
        </div>

        {/* lihat detail button */}
        <div className='w-full'>
          <Link href="/detail-job" className='bg-primary_color text-white font-semibold text-center rounded-lg block py-1'>Lihat Detail</Link>
        </div>

        {/* Garis pemisah */}
        <div className='w-full h-[2px] bg-primary_color'></div>

        {/* waktu posting */}
        <div className='flex items-center gap-2'>
          <Image className='w-4' src={time} alt="Time" />
          <p>1 hari yang lalu</p>
        </div>
      </div>
    </div>
  );
}
