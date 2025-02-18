import { ChildrenProps } from "@/types";

const Layout = ({ children }: ChildrenProps) => {
  return <div className="container mx-auto max-w-7xl">{children}</div>;
};

export default Layout;
