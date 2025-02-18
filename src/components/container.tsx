import { ChildrenProps } from "@/types";

const Layout = ({ children }: ChildrenProps) => {
  return <div className="px-4 w-full mx-auto max-w-7xl">{children}</div>;
};

export default Layout;
