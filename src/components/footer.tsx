import Image from "next/image";
import logo2 from "../assets/logo 2.png";
import Layout from "./container";
import instagram from "../assets/instagram.png";
import facebook from "../assets/facebook.png";
import thread from "../assets/thread.png";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary_color_1 text-white w-full mt-32 py-10">
      <Layout>
        <div className="flex justify-between items-start">
          {/* logo dan sosmed */}
          <div className="space-y-4">
            <Image src={logo2} alt="logo" />
            <p>Platform lowongan kerja terpercaya seluruh
            wilayah bangka belitung</p>
            {/* sosmed */}
            <div className="flex gap-4 items-center">
                <Image src={instagram} alt="instagram" />
                <Image src={facebook} alt="facebook" />
                <Image src={thread} alt="thread" />
            </div>
          </div>

          {/* menu navbar */}
          <div className="space-y-6">
            <h1 className="font-bold">Quick Link</h1>
            <div className="flex flex-col gap-1">
              <Link href="/">Beranda</Link>
              <Link href="/review-vacancy-provider">Review Perusahaan</Link>
            </div>
          </div>

          {/* Hubungi Kami */}
          <div className="space-y-6">
            <h1 className="font-bold">Hubungi Kami</h1>
            <div className="space-y-1">
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
          <p className="text-center text-lg">Copyright BabelHire Team © 2025. All Rights Reserved.</p>
        </div>

      </Layout>
    </footer>
  );
}
