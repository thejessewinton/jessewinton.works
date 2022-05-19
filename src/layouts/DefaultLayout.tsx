import { ReactNode } from 'react';

interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {children}
    </main>
  );
};
