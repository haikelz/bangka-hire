import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type LayoutProps = HTMLAttributes<HTMLDivElement>;

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div
      className={cn(
        "px-4 w-full mx-auto max-w-[1366px] lg:px-8 2xl:px-0",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Layout;
