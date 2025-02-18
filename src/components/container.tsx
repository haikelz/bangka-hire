import { ChildrenProps } from "@/types";

const Layout = ({ children }: ChildrenProps) => {
  return <div className="px-20">{children}</div>;
};

export default Layout;
