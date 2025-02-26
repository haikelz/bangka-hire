import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DashboardPage } from "@/components/pages/dashboard-page";

export default function Dashboard() {
  return (
    <div className="flex justify-start items-start w-full">
      <Sidebar />
      <div className="w-full">
        <Header />
        <DashboardPage />
      </div>
    </div>
  );
}
