import { PropsWithChildren } from "react";

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      {children}
    </div>
  );
};

export default PageLayout;
