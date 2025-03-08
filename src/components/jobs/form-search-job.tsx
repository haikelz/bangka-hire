"use client";

import { citiesList } from "@/lib/static";
import { searchJob, valueFilterCity, valueFilterSalary } from "@/store";
import { useAtom } from "jotai";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function FormSearchJob() {
  const [openSelect, setOpenSelect] = useState<string | null>(null);
  const [search, setSearch] = useAtom(searchJob);
  const [filterCity, setFilterCity] = useAtom(valueFilterCity);
  const [filterSalary, setFilterSalary] = useAtom(valueFilterSalary);
  const locationRef = useRef<any>(null);
  const salaryRef = useRef<any>(null);

  // fungsi untuk handleClickOutside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        locationRef.current &&
        !locationRef.current.contains(event.target as Node) &&
        salaryRef.current &&
        !salaryRef.current.contains(event.target as Node)
      ) {
        setOpenSelect(null); // Tutup semua dropdown jika klik di luar
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // mengambil value setiap form pada saat tombol cari di klik atau user menekan enter
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setSearch(formData.get("search") as string);
  }

  return (
    <form
      className="flex items-center flex-col md:flex-row w-full gap-6 text-black"
      onSubmit={handleSubmit}
    >
      <div className="w-full md:w-[60%]">
        <Input
          type="text"
          className="w-full rounded-lg p-2 focus:outline-none bg-white"
          placeholder="Cari berdasarkan posisi atau nama perusahaan"
          name="search"
          id="search"
        />
      </div>

      {/* Select untuk filter lokasi */}
      <div ref={locationRef} className="relative w-full md:w-[20%]">
        <Select
          onValueChange={(value) => setFilterCity(value)}
          defaultValue="Pilih Lokasi"
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Pilih Lokasi" className="text-black" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem disabled value="Pilih Lokasi">
              Pilih Lokasi
            </SelectItem>
            {citiesList.map((item) => (
              <SelectItem key={item.id} value={item.value}>
                {item.value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Select untuk filter urutan gaji */}
      <div ref={salaryRef} className="relative w-full md:w-[20%]">
        <Select
          onValueChange={(value) => setFilterSalary(value)}
          defaultValue="Urutkan Gaji"
        >
          <SelectTrigger className="bg-white">
            <SelectValue placeholder="Urutkan Gaji" className="text-black" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem disabled value="Urutkan Gaji">
              Urutkan Gaji
            </SelectItem>
            <SelectItem value="Tertinggi">Tertinggi</SelectItem>
            <SelectItem value="Terendah">Terendah</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full md:w-[10%] bg-secondary_color_2 text-black hover:bg-secondary_color_3">
        Cari
      </Button>
    </form>
  );
}
