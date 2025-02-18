"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";


export default function FormSearchJob() {
  const [openSelect, setOpenSelect] = useState<string | null>(null);
  return (
    <form action="" className='flex items-center w-full gap-6 text-black'>
        <div className='w-[60%]'>
          <input type="text" className='w-full rounded-lg p-2 focus:outline-none' placeholder='Cari berdasarkan posisi atau nama perusahaan' />
        </div>

        {/* Select untuk filter lokasi */}
        <div className="relative w-[20%]">
          <select
            className="appearance-none w-full rounded-lg p-2 border border-gray-300 focus:outline-none cursor-pointer"
            onClick={() => setOpenSelect(openSelect === "location" ? null : "location")}
          >
            <option value="" selected disabled>Pilih Lokasi...</option>
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
        <div className="relative w-[20%]">
          <select
            className="appearance-none w-full rounded-lg p-2 border border-gray-300 focus:outline-none cursor-pointer"
            onClick={() => setOpenSelect(openSelect === "salary" ? null : "salary")}
          >
            <option value="" selected disabled>Urutkan Gaji...</option>
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

    </form>
  )
}
