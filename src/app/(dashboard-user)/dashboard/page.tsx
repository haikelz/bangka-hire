import { DashboardPage } from "@/components/dashboard/dashboard-page";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

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
