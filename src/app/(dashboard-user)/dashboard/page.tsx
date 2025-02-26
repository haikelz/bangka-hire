import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/sidebar";

export default function Dashboard() {
  return (
    <div className="flex justify-start items-start w-full">
      <Sidebar />
      <Header />
    </div>
  );
}
