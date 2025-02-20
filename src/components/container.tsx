import { ChildrenProps } from "@/types";

const Layout = ({ children }: ChildrenProps) => {
  return (
    <div className="px-4 w-full mx-auto max-w-[1366px] lg:px-8 2xl:px-0">
      {children}
    </div>
  );
};

export default Layout;
