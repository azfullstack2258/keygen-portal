import React, { PropsWithChildren } from 'react';
import Header from './Header';

const PageLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-dark text-white">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>
    </div>
  );
};

export default PageLayout;
