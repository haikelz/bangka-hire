import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FacebookIcon, InstagramIcon, MailIcon } from "lucide-react";

const citiesList = [
  {
    id: 1,
    value: "Pangkalpinang",
  },
  {
    id: 2,
    value: "Bangka Tengah",
  },
  {
    id: 3,
    value: "Bangka Selatan",
  },
  {
    id: 4,
    value: "Bangka Barat",
  },
  {
    id: 5,
    value: "Bangka Induk",
  },
  {
    id: 6,
    value: "Belitung",
  },
  {
    id: 7,
    value: "Belitung Timur",
  },
];

export default function JobVacancyProviderProfile() {
  return (
    <div className="space-y-8 py-8 px-8">
      <div className="space-y-2">
        <span className="font-bold text-xl">Nama Perusahaan</span>
        <Input placeholder="Beritahu nama Perusahaanmu" />
      </div>
      <div className="space-y-2">
        <span className="font-bold text-xl">Industri</span>
        <Input placeholder="Beritahu Bidang Industri Perusahaanmu" />
      </div>
      <div className="space-y-2">
        <span className="font-bold text-xl">Tentang Perusahaan</span>
        <Input placeholder="Beritahu tentang perusahaan" />
      </div>
      <div className="space-y-2">
        <span className="font-bold text-xl">Lokasi</span>
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Lokasi" />
          </SelectTrigger>
          <SelectContent>
            {citiesList.map((item) => (
              <SelectItem key={item.id} value={item.value}>
                {item.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <span className="font-bold text-xl">Alamat</span>
        <Input placeholder="Beritahu Alamat Lengkap Perusahaanmu" />
      </div>
      <div className="space-y-4">
        <span className="font-bold text-xl">Sosial Media</span>
        <div className="space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <InstagramIcon />
            <Input placeholder="Instagram.com" />
          </div>
          <div className="flex justify-center items-center space-x-2">
            <FacebookIcon />
            <Input placeholder="Facebook.com" />
          </div>
          <div className="flex justify-center items-center space-x-2">
            <MailIcon />
            <Input placeholder="Gmail.com" />
          </div>
          <div className="flex justify-end items-center">
            <Button className="bg-secondary_color_1">Simpan</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
