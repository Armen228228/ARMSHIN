import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BARON | ARMSHIN Management',
  description: 'Protected management workspace for ARMSHIN directors.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="hy"><body>{children}</body></html>;
}
