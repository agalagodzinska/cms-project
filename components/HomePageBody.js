//artykul niepotrzebnie w bazie danych?

import React from 'react';
import data from '../utils/data';
import NewsArticle from './NewsArticle';
import { useContext } from 'react';
import { Favourites } from '../utils/Favourites';
async function searchNews(q) {
  q = encodeURIComponent(q);
  const response = await fetch(
    `https://bing-news-search1.p.rapidapi.com/news/search?freshness=Day&textFormat=Raw&safeSearch=Strict&q=${q}`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': '9817c1b8a7msh1385943baf16408p1192f6jsn6fd50e09b914',
        'x-bingapis-sdk': 'true',
      },
    }
  );
  const body = await response.json();
  return body.value;
}
export default function HomePageBody() {
  // const { state, dispatch } = useContext(Favourites);

  // const addRemoveFavourites = (article) => {
  //   const existArticle = state.favourites.newsArticles.find(
  //     (x) => x.url === article.url
  //   );

  //   if (existArticle) {
  //     dispatch({ type: 'FAVOURITES_REMOVE_ARTICLE', payload: article });
  //   } else {
  //     dispatch({
  //       type: 'FAVOURITES_ADD_ARTICLE',
  //       payload: { ...article },
  //     });
  //   }
  //   //TODO
  // };

  const addRemoveFavourite = async ({
    imageUrl,
    url,
    title,
    description,
    datePublished,
    provider,
    category,
  }) => {
    try {
      await axios.post('/api/addRemoveFavourite', {
        imageUrl,
        url,
        title,
        description,
        datePublished,
        provider,
        category,
      });

      //   const registerResult = await signIn('credentials', {
      //     redirect: false,
      //     email,
      //     password,
      //   });
      //   console.log('onsubmit!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      //   if (registerResult.error) {
      //     //cos jak błąd
      //     console.log('error1 ugvcfdfghnjmnhbgvgbhjngvbhjnbghnj');
      //   }
    } catch (error) {
      console.log('error2 xecrtvbyunbytvcrxectvbyunbytvcrxecrtvbyun');
      //znowu błąd
    }
  };

  const [query, setQuery] = React.useState('');
  const [list, setList] = React.useState(null);

  const search = (e) => {
    e.preventDefault();
    searchNews(query).then(setList);
  };

  

  return (
    <div className=" bg-indigo-50 w-screen h-full">
      <div className="w-10/12 mx-auto">
        <form onSubmit={search} className=" flex mt-12 mb-6 w-full px-auto">
          <input
            className="w-2/3 border border-indigo-400 rounded-md"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-indigo-900 hover:bg-indigo-700 text-white ml-6 px-6 py-3 rounded-md text-lg">
            Search
          </button>
        </form>

        {!list ? null : list.length === 0 ? (
          <p>
            <i>No results</i>
          </p>
        ) : (
          <ul>
            {list.map((article, i) => (
              <NewsArticle
                key={i}
                article={article}
                addRemoveFavourite={() =>
                  addRemoveFavourite(
                    article.imageUrl ? article.imageUrl : 'null',
                    article.url,
                    article.title ? article.title : 'null',
                    article.description ? article.description : 'null',
                    article.datePublished ? article.datePublished : 'null',
                    article.provider ? article.provider : 'null',
                    article.category ? article.category : 'null'
                  )
                }
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
