import { ChildrenProps } from "@/types";

const layout = ({ children }: ChildrenProps) => {
  return <div className="container mx-auto max-w-7xl">{children}</div>;
};

export default layout;
