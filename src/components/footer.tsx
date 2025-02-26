import Image from "next/image";
import Link from "next/link";
import facebook from "../../public/assets/facebook.png";
import instagram from "../../public/assets/instagram.png";
import logo2 from "../../public/assets/logo 2.png";
import thread from "../../public/assets/thread.png";
import Layout from "./container";

export default function Footer() {
  return (
    <footer className="bg-secondary_color_1 text-white w-full py-10 mt-12">
      <Layout>
        <div className="flex flex-col justify-center gap-6 md:gap-10 md:flex-row md:justify-between md:items-start">
          {/* logo dan sosmed */}
          <div className="space-y-4 flex md:block flex-col justify-center items-center">
            <Image src={logo2} alt="logo" />
            <p className="text-center sm:text-justify md:text-sm lg:text-base">
              Platform lowongan kerja terpercaya seluruh wilayah bangka belitung
            </p>
            {/* sosmed */}
            <div className="flex gap-4 items-center">
              <Image src={instagram} className="w-6 h-6" alt="instagram" />
              <Image src={facebook} className="w-6 h-6" alt="facebook" />
              <Image src={thread} className="w-6 h-6" alt="thread" />
            </div>
          </div>

          {/* menu navbar */}
          <div className="sm:space-y-4 flex flex-col w-fit justify-center md:inline-block md:gap-0 items-start text-sm lg:text-base">
            <h1 className="font-bold">Quick Link</h1>
            <div className="flex flex-col gap-1 mt-2">
              <Link href="/">Beranda</Link>
              <Link href="/job-vacancy-providers">Cari Perusahaan</Link>
            </div>
          </div>

          {/* Hubungi Kami */}
          <div className="sm:space-y-4 flex flex-col w-fit justify-center md:inline-block md:gap-0 items-start text-sm lg:text-base">
            <h1 className="font-bold">Hubungi Kami</h1>
            <div className="space-y-1 mt-2">
              <p>Pangkal Pinang, Bangka Belitung</p>
              <p>babelhire@gmail.com</p>
              <p>0812-3456-7890</p>
            </div>
          </div>
        </div>

        {/* copyright */}
        {/* Line */}
        <div className="space-y-4">
          <div className="w-full h-[2px] bg-white mt-10"></div>
          <p className="text-center text-sm lg:text-lg">
            Copyright BabelHire Team © 2025. All Rights Reserved.
          </p>
        </div>
      </Layout>
    </footer>
  );
}
