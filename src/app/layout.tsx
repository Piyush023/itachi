import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
import Sidebar from '@/app/components/Sidebar/Sidebar';
import SupabaseProvider from '../../providers/SupabaseProvider';
import UserProvider from '../../providers/UserProvider';
import ModalProvider from '../../providers/ModalProvider';
import ToasterProvider from '../../providers/ToastProvider';
import { getSongsByUserId } from '../../actions/getSongsByUserId';
import Player from '@/app/components/Player/Player';
import { getActiveProductsWithPrices } from '../../actions/getActiveProductsWithPrices';

const font = Figtree({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Itachi',
  description: 'Listen and Relax!',
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSong = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang='en'>
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <Sidebar songs={userSong}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
