"use client";

import { ChevronDown } from "lucide-react";
import { FormEvent, use, useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAtom } from "jotai";
import { searchJob, valueFilterCity, valueFilterSalary } from "@/store";

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
        locationRef.current && !locationRef.current.contains(event.target as Node) &&
        salaryRef.current && !salaryRef.current.contains(event.target as Node)
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
    setSearch(formData.get("search") as string)
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
        <select
          className="appearance-none w-full rounded-lg p-2 border border-gray-300 focus:outline-none cursor-pointer md:text-xs lg:text-base"
          onClick={(e) => {
            e.stopPropagation(); // mencegah event bubbling
            setOpenSelect(openSelect === "location" ? null : "location")
          }}
          name="location"
          id="location"
          onChange={(e) => setFilterCity(e.target.value)}
        >
          <option value="" selected disabled>
            Pilih Lokasi...
          </option>
          <option value="Pangkal Pinang">Pangkal Pinang</option>
          <option value="Sungailiat">Sungailiat</option>
          <option value="Koba">Koba</option>
          <option value="Toboali">Toboali</option>
          <option value="Muntok">Muntok</option>
          <option value="Tanjung Pandan">Tanjung Pandan</option>
          <option value="Manggar">Manggar</option>
        </select>

        {/* Custom Icon */}
        <div
          className={`absolute top-1/2 right-3 transform -translate-y-1/2 transition-transform duration-300 ${
            openSelect === "location" ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="w-6 h-6 text-black" />
        </div>
      </div>

      {/* Select untuk filter urutan gaji */}
      <div ref={salaryRef} className="relative w-full md:w-[20%]">
        <select
          className="appearance-none w-full rounded-lg p-2 border border-gray-300 focus:outline-none cursor-pointer md:text-xs lg:text-base"
          onClick={(e) => {
            e.stopPropagation(); // mencegah event bubbling
            setOpenSelect(openSelect === "salary" ? null : "salary")
          }}
          name="salary"
          id="salary"
          onChange={(e) => setFilterSalary(e.target.value)}
        >
          <option value="" selected disabled>
            Urutkan Gaji...
          </option>
          <option value="Tertinggi">Tertinggi</option>
          <option value="Terendah">Terendah</option>
        </select>

        {/* Custom Icon */}
        <div
          className={`absolute top-1/2 right-3 transform -translate-y-1/2 transition-transform duration-300 ${
            openSelect === "salary" ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="w-6 h-6 text-black" />
        </div>
      </div>

      <Button className="w-full md:w-[10%] bg-secondary_color_2 text-black hover:bg-secondary_color_3">Cari</Button>
    </form>
  );
}
