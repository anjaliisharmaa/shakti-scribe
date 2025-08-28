import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Shakti Scribe',
  description: 'Empowering content creation with SHAKTI-AI',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-shakti-white dark:bg-shakti-charcoal text-shakti-charcoal dark:text-shakti-white">
      <body className={inter.className + ' font-sans min-h-screen'}>{children}</body>
    </html>
  );
}
