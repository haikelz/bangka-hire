"use client";

import FormSearchAndTableCompany from "./form-search-table-company";
import FormSearchAndTableUser from "./form-search-table-user";

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
