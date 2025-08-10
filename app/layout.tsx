import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Multi-Step Form - Next.js 15',
  description: 'Advanced schema-driven multi-step form with TypeScript',
};

/**
 * Root layout component for the Next.js application
 * Provides global styling and font configuration
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100'>
          {children}
        </main>
      </body>
    </html>
  );
}
