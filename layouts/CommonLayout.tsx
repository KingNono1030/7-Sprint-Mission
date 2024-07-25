import { ReactNode } from 'react';

interface CommonLayoutProps {
  children: ReactNode;
}
export default function CommonLayout({ children }: CommonLayoutProps) {
  return <main className="mx-auto max-w-[1200px] p-4 md:p-6">{children}</main>;
}
