"use client"

import { IsPendingClient } from "@/components/react-query/is-pending-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllUser, getJobVacancyProviders } from "@/services/common";
import { ProfilCompanyProps, UserProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";

export default function AdminPage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["user", "jobVacancies"],
    queryFn: async () => {
      const [users, jobVacancies] = await Promise.all([
        getAllUser(),
        getJobVacancyProviders(1, 8, ""),
      ]);
      return { users, jobVacancies }; // Kembalikan sebagai object
    },
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const users = data?.users?.data;
  const jobVacancies = data?.jobVacancies?.data.data;


  if (isPending) return (
      <div className="w-full px-4 md:px-8">
        <IsPendingClient className="w-full my-10 min-h-svh h-full" />
      </div>
  )

  return (
    <div className="p-8 space-y-8">
      {/* kotak user */}
      <div className="bg-secondary_color_2 rounded-lg p-6 space-y-3">
        {/* judul dan search user */}
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">User List</h1>
          <div className="relative w-1/3">
            <Input placeholder="Search User" className=" border-primary_color pl-10" />
            <SearchIcon className="w-5 h-5 absolute top-1/2 left-2 -translate-y-1/2 text-black" />
          </div>
        </div>

        {/* tabel nama,no,email */}
        <div className="overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b border-gray-300 text-left">
              <th className="w-1/12 px-4 py-2">No</th>
              <th className="w-3/12 px-4 py-2">Nama</th>
              <th className="w-3/12 px-4 py-2">Email</th>
              <th className="w-2/12 px-4 py-2">Status</th>
              <th className="w-[6%] px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user : UserProps, index : any) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.full_name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span className="text-blue-500">
                    Active
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Button className="text-gray-500 hover:text-gray-700 bg-transparent text-2xl border-none shadow-none hover:bg-transparent">
                    ⋮
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </div>

      {/* kotak company */}
      <div className="bg-secondary_color_2 rounded-lg p-6 space-y-3">
        {/* judul dan search company */}
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-lg">Company List</h1>
          <div className="relative w-1/3">
            <Input placeholder="Search Company" className=" border-primary_color pl-10" />
            <SearchIcon className="w-5 h-5 absolute top-1/2 left-2 -translate-y-1/2 text-black" />
          </div>
        </div>

        {/* tabel nama,no,email */}
        <div className="overflow-x-auto">
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr className="border-b border-gray-300 text-left">
              <th className="w-1/12 px-4 py-2">No</th>
              <th className="w-3/12 px-4 py-2">Nama Perusahaan</th>
              <th className="w-3/12 px-4 py-2">Email</th>
              <th className="w-2/12 px-4 py-2">Status</th>
              <th className="w-[6%] px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobVacancies.map((user : ProfilCompanyProps, index : any) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{user.user?.full_name}</td>
                <td className="px-4 py-2">{user.user?.email}</td>
                <td className="px-4 py-2">
                  <span className= "text-blue-500">
                    Active
                  </span>
                </td>
                <td className="px-4 py-2">
                  <Button className="text-gray-500 hover:text-gray-700 bg-transparent text-2xl border-none shadow-none hover:bg-transparent">
                    ⋮
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

      </div>
    </div>
  );
}
