"use client"

import { IsPendingClient } from "@/components/react-query/is-pending-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllUser, getJobVacancyProviders } from "@/services/common";
import { ProfilCompanyProps, UserProps } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import FormSearchAndTableUser from "./form-search-table-user";
import FormSearchAndTableCompany from "./form-search-table-company";

export default function AdminPage() {


  return (
    <div className="p-8 space-y-8">
      {/* kotak user */}
      <FormSearchAndTableUser />

      {/* kotak company */}
      <FormSearchAndTableCompany />

    </div>
  );
}
