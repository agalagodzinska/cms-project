import '@/styles/globals.css';
import { FavouritesProvider } from '@/utils/Favourites';
import { SessionProvider } from 'next-auth/react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <FavouritesProvider>
        <Component {...pageProps} />
      </FavouritesProvider>
    </SessionProvider>
  );
}
