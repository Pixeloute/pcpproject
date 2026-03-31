import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Check Your PCP Finance Claim | Expert Assistance Available',
  description:
    'Find out if you may be eligible to reclaim compensation on your PCP or HP car finance agreement. The FCA redress scheme is free — we offer expert assistance if you prefer support.',
  keywords: 'PCP claim, car finance claim, motor finance redress, discretionary commission, FCA scheme',
  robots: 'index, follow',
  openGraph: {
    title: 'Check Your PCP Finance Claim',
    description:
      'You may be eligible for compensation on your PCP or HP car finance agreement. Check in minutes.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-[#F8F9FA]">{children}</body>
    </html>
  );
}
