import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FacebookIcon, InstagramIcon, MailIcon } from "lucide-react";

const statusWork = [
  {
    id: 1,
    value: "Magang",
  },
  {
    id: 2,
    value: "Part Time",
  },
  {
    id: 3,
    value: "Full Time",
  },
  {
    id: 4,
    value: "Freelance",
  }
];


const rangeSalary = [
  {
    id: 1,
    value: "<1.000.000",
  },
  {
    id: 2,
    value: "2.000.000 - 6.000.000",
  },
  {
    id: 3,
    value: "6.000.000 - 10.000.000",
  },
  {
    id: 4,
    value: ">10.000.000",
  }
]

export default function FormAddJobs() {
  return (
    <div className="space-y-8 py-8 px-8">
      <div className="space-y-2">
        <span className="font-bold text-xl">Posisi Pekerjaan</span>
        <Input placeholder="Beritahu Posisi Pekerjaan" />
      </div>

      <div className="space-y-2">
        <h1 className="font-bold text-2xl mb-2">Informasi Pekerjaan</h1>
        <span className="font-bold text-xl">Status Pekerjaan</span>
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusWork.map((item) => (
              <SelectItem key={item.id} value={item.value}>
                {item.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <span className="font-bold text-xl">Range Gaji</span>
        <Select>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Gaji" />
          </SelectTrigger>
          <SelectContent>
            {rangeSalary.map((item) => (
              <SelectItem key={item.id} value={item.value}>
                {item.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <span className="font-bold text-xl">Tanggung Jawab</span>
        <Textarea placeholder="Beritahu Tanggung Jawab Dari Posisi Pekerjaan"rows={4} />
      </div>
      <div className="space-y-4">
        <span className="font-bold text-xl">Kualifikasi / Persyaratan</span>
        <Textarea placeholder="Beritahu Kualifikasi / Persyaratan Dari Posisi Pekerjaan" rows={4} />
      </div>

      <div className="flex justify-end items-center">
        <Button className="bg-secondary_color_1">Simpan</Button>
      </div>
    </div>
  );
}
