import Image from "next/image";
import Layout from "../container";
import logo from "../../../public/assets/logo.png";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import triggerDetail from "../../../public/assets/detail-trigger.png";
import status from "../../../public/assets/status.svg";
import salary from "../../../public/assets/salary-detail.svg";
import location from "../../../public/assets/location.svg";
import kirim from "../../../public/assets/kirim-lamaran-icon.svg";



type DetailJobPageProps = {
  id : string
};

export default function DetailJobPage({ id }: DetailJobPageProps) {
  return (
    <Layout>
        {/* informasi pekerjaan singkat */}
        <div className="bg-secondary_color_2 p-6 rounded-md space-y-7">
          {/* logo, nama perusahaan, rating, ulasan,button detail */}
          <div className="flex justify-between items-center">
            {/* logo dan nama perusahaan, rating dan ulasan */}
            <div className="flex items-center gap-5">
              <Image className="w-32" src={logo} alt="Logo" />
              {/* posisi pekerjaan */}
              <div>
                <h1 className="font-bold lg:text-2xl">Customer Service</h1>
                <div className="flex items-center gap-3 font-medium">
                  <p>PT. BabelHire</p>
                  {/* rating */}
                  <div className="flex items-center">
                    <p>4</p>
                    <Star fill="#2A72B3" stroke="none" />
                  </div>

                  <p className="underline">8 ulasan</p>
                </div>

              </div>
            </div>

            {/* button detail perusahaan */}
            <Button variant={"link"}>
              <Image src={triggerDetail} alt="Detail" />
            </Button>
          </div>
          {/* informasi singkat pekerjaan */}
          <div className="flex justify-between items-center gap-10">
            {/* status pekerjaaan */}
            <div className="bg-secondary_color_3 p-4 w-1/3 rounded-md flex items-center gap-3">
                <Image className="w-12" src={status} alt="Status" />
                <div className="text-lg">
                  <p>Status Pekerjaan</p>
                  <p className="font-medium">Full Time</p>
                </div>
            </div>
            {/* salary */}
            <div className="bg-secondary_color_3 p-4 w-1/3  rounded-md flex items-center gap-3">
                <Image className="w-12" src={salary} alt="Status" />
                <div className="text-lg">
                  <p>Gaji</p>
                  <p className="font-medium">2.000.000 - 3.000.000</p>
                </div>
            </div>
            {/* location */}
            <div className="bg-secondary_color_3 p-4 w-1/3 rounded-md flex items-center gap-3">
                <Image className="w-12" src={location} alt="Status" />
                <div className="text-lg">
                  <p>Lokasi</p>
                  <p className="font-medium">Pangkal Pinang</p>
                </div>
            </div>
          </div>
        </div>

        {/* detail pekerjaan lengkap */}
        <div className="mt-10 lg:space-y-10">
            {/* Deskripsi Perusahaan */}
            <div className="space-y-5">
                <h1 className="font-bold">Deskripsi Perusahaan</h1>
                <p>Bangka Hire adalah Perusahaan yang bergerak di bidang web dan teknologi. saat ini sedang membutuhkan  UI/UX Desainer sebagai pendukung tim dibidang web dan teknologi Lorem ipsum dolor sit amet consectetur. Donec porta sem netus diam fermentum porta amet elit. Adipiscing elementum suspendisse pulvinar enim proin ornare fringilla ullamcorper adipiscing.</p>
            </div>

            {/* Line */}
            <div className="w-full h-[1px] bg-primary_color"></div>

            {/* Tanggung Jawab */}
            <div className="space-y-5">
              <h1 className="font-bold">Tanggung Jawab</h1>
              <ul className="list-disc pl-5">
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
              </ul>
            </div>

            {/* Kualifikasi */}
            <div className="space-y-5">
                <h1 className="font-bold">Kualifikasi</h1>
                <ul className="list-disc pl-5">
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
              </ul>
            </div>

            {/* Tombol Kirim Lamaran */}
            <Button className="bg-secondary_color_3 text-black px-14">
              <div className="flex items-center gap-2">
                <Image src={kirim} alt="Kirim Lamaran" />
                <p className="font-medium">Kirim Lamaran</p>
              </div>

            </Button>
        </div>
    </Layout>
  );
}
