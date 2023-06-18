import React from 'react';
import { useContext } from 'react';
import { Favourites } from '../utils/Favourites';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import database from '@/utils/database';
import { useSession } from 'next-auth/react';
import mongoose from 'mongoose';

export default function FavouritesScreen() {
  //takie homepagebody z artykułów zalogowanego użytkownika

  const articles = async ({}) => {
    try {
      await axios.get('/api/showFavourites', {});
    } catch (error) {
      console.log('error2 xecrtvbyunbytvcrxectvbyunbytvcrxecrtvbyun');
      //znowu błąd
    }
  };

  return (
    <Layout title={'your favourites'}>
      {articles}
      <div>ulubione</div>
    </Layout>
  );
  // const router = useRouter();
  // const { state, dispatch } = useContext(Favourites);
  // const {
  //   favourites: { newsArticles },
  // } = state;
  // const addRemoveArticleHandler = (article) => {
  //   const existArticle = state.favourites.newsArticles.find(
  //     (x) => x.url === article.url
  //   );
  //   if (existArticle) {
  //     dispatch({ type: 'FAVOURITES_REMOVE_ARTICLE', payload: article });
  //   } else {
  //     dispatch({
  //       type: 'FAVOURITES_ADD_ARTICLE',
  //       payload: { ...article, quantity },
  //     });
  //   }
  // };
  // return (
  //   <Layout title="Your favourites">
  //     <h1 className="mb-4 text-xl">Your articles</h1>
  //     {newsArticles.length === 0 ? (
  //       <div>
  //         <div>You have no favourite articles</div>
  //         <button
  //           className="primary-button p-2  mt-6 "
  //           onClick={() => router.push('/')}
  //         >
  //           Back to news
  //         </button>
  //       </div>
  //     ) : (
  //       // <div className="grid md:grid-cols-4 md:gap-5">
  //       <div className="overflow-x-auto ">
  //         <table className="min-w-full">
  //           <thead className="border-b">
  //             <tr>
  //               <th className="px-5 text-left"></th>
  //               <th className="px-5 text-left">serduszko</th>
  //               <th className="px-5"></th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {newsArticles.map((article) => (
  //               <tr key={article.url} className="border-b">
  //                 <div>{article.title}</div>
  //               </tr>
  //             ))}
  //           </tbody>
  //         </table>
  //       </div>
  //     )}
  //   </Layout>
  // );
}
