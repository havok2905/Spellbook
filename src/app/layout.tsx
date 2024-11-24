import type { Metadata } from 'next';
import { Goudy_Bookletter_1911 } from 'next/font/google';
import { ReactQueryProvider } from '../components/ReactQueryProvider';
import './reset.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Spellbook',
  description: 'App for managing D&D spells',
};

//👇 Configure our font object
const goudyBookletter1911 = Goudy_Bookletter_1911({
  subsets: ['latin'],
  variable: '--font-goudy',
  weight: '400',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={goudyBookletter1911.variable}>
      <body>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
