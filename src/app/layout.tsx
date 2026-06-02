import type { Metadata } from 'next';
import { DM_Sans, Noto_Serif_SC } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-noto-sc',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ANDARA Architects',
  description: 'Strategic consulting in finance and legal. Building with intention.',
  keywords: ['ANDARA Architects', 'consulting', 'finance', 'legal', 'strategy', 'Lima', 'New York', 'Hong Kong'],
  authors: [{ name: 'ANDARA Architects' }],
  robots: 'index, follow',
  openGraph: {
    title: 'ANDARA Architects',
    description: 'Strategic consulting in finance and legal. Building with intention.',
    type: 'website',
    url: 'https://andaraarchitects.com',
    images: ['https://andaraarchitects.com/logo-andara.png'],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ANDARA Architects',
    description: 'Strategic consulting in finance and legal. Building with intention.',
    images: ['https://andaraarchitects.com/logo-andara.png'],
  },
  icons: {
    icon: '/logo-andara.png',
    apple: '/logo-andara.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${notoSerifSC.variable}`}>
      <body>{children}</body>
    </html>
  );
}
