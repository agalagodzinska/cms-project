import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Favourites } from '../utils/Favourites';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Layout({ title, children }) {
  // eslint-disable-next-line no-unused-vars

  //TODO
  // const { state, dispatch } = useContext(Favourites);
  // const { favourites } = state;

  const { data: session, status } = useSession();
  const loading = status === 'loading';

  const handleSignin = (e) => {
    e.preventDefault();
    signIn();
  };
  const handleSignout = (e) => {
    e.preventDefault();
    signOut();
  };

  return (
    <>
      <Head>
        <title>{title ? title + 'News' : 'News'}</title>
        <meta name="description" content="News Website" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <div className="flex flex-col min-h-screen bg-indigo-50">
        <header className="z-10 shadow-lg bg-white">
          <nav className="flex h-12 justify-between items-center px-4 ">
            <Link href="/" legacyBehavior>
              <a className="text-lg font-bold">News</a>
            </Link>
            <div className="flex flex-row">
              {session && (
                <Link href="/favourites" legacyBehavior>
                  <a className="p-2 font-semibold">Favourites</a>
                </Link>
              )}

              <div className="p-2">
                <Link href="/" legacyBehavior>
                  <a className="logo">{session?.user.name}</a>
                </Link>
                {session && (
                  <>
                    <a href="#" onClick={handleSignout} className="ml-2">
                      {' '}
                      Sign out
                    </a>

                    <br />
                  </>
                )}
                {!session && (
                  <>
                    <a href="#" onClick={handleSignin} className="btn-signin">
                      Sign in
                    </a>
                  </>
                )}
                {loading && <div>Loading...</div>}
              </div>
            </div>
          </nav>
        </header>
        <div className="h-full flex z-0 ">{children}</div>
      </div>
    </>
  );
}
