import { Header } from "@/components/dashboard/header";
import { DashboardPage } from "@/components/pages/dashboard-page";
import { Sidebar } from "@/components/sidebar";

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
