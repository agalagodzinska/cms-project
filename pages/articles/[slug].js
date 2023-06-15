// import React, { useContext } from 'react';
// import Layout from '../../components/Layout';
// import { useRouter } from 'next/router';
// import data from '../../utils/data';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Cart } from '../../utils/Favourites';

// export default function ArticleScreen() {
//   const { state, dispatch } = useContext(Favourites);

//   const { query } = useRouter();
//   const { slug } = query;
//   const article = data.articles.find((x) => x.slug === slug);
//   if (!article) {
//     return <div>article not found</div>;
//   }

//   const addToFavouritesHandler = () => {
//     const existArticle = state.favourites.newsArticles.find((x) => x.slug === article.slug);
//     const quantity = existArticle ? existArticle.quantity + 1 : 1;

//     if (article.countInStock < quantity) {
//       alert('');
//       return;
//     }

//     dispatch({ type: 'FAVOURITES_ADD_ARTICLE', payload: { ...article, quantity } });
//   };

//   return (
//     <Layout title={article.name}>
//       <div className="py-2">
//         <Link href="/">back to articles</Link>
//       </div>
//       <div className="grid md:grid-cols-3 md:gap-3 mt-24">
//         <div className="">
//           <Image
//             src={article.image}
//             alt={article.name}
//             width={480}
//             height={480}
//           ></Image>
//         </div>
//         <div className="">
//           <ul>
//             <li>
//               <h1 className="text-lg">{article.name}</h1>
//             </li>
//             <li>Category: {article.category}</li>
//             <li>Brand: {article.brand}</li>
//             <li>
//               Rating: {article.rating} ({article.numReviews} reviews)
//             </li>
//             <li>Description: {article.description}</li>
//           </ul>
//         </div>
//         <div>
//           <div className="card p-5">
//             <div className="mb-2 flex justify-between">
//               <div>Price</div>
//               <div>${article.price}</div>
//             </div>
//             <div className="mb-2 flex justify-between">
//               <div>Status</div>
//               <div>{article.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
//             </div>
//             <button
//               className="primary-button w-full"
//               onClick={addToFavouritesHandler}
//             >
//               Add to favourites
//             </button>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }
