import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ChildrenProps } from "@/types";

export default function Layout({ children }: ChildrenProps) {
  return (
    <div className="flex justify-start items-start w-full">
      <Sidebar />
      <div className="w-full">
        <Header />
        {children}
      </div>
    </div>
  );
}
