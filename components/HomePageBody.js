//artykul niepotrzebnie w bazie danych?

import React from 'react';
import data from '../utils/data';
import NewsArticle from './NewsArticle';
import { useContext } from 'react';
import { Favourites } from '../utils/Favourites';
import axios from 'axios';
import { useSession } from 'next-auth/react';

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

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const addRemoveFavourite = async ({
    image,
    url,
    name,
    description,
    datePublished,
    provider,
    category,
  }) => {
    console.log(userEmail + ' email ' + url + ' url');
    try {
      const response = await axios.post('/api/auth/addRemoveFavourite', {
        userEmail,
        image,
        url,
        name,
        description,
        datePublished,
        provider,
        category,
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.log('error2 ' + error.response);
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
                addRemoveFavourite={() => {
                  addRemoveFavourite({
                    image: article.image?.thumbnail?.contentUrl
                      ? article.image?.thumbnail?.contentUrl
                      : 'null',
                    url: article.url,
                    name: article.name ? article.name : 'null',
                    description: article.description
                      ? article.description
                      : 'null',
                    datePublished: article.datePublished
                      ? article.datePublished
                      : 'null',
                    provider: article.provider[0].name
                      ? article.provider[0].name
                      : 'null',
                    category: article.category ? article.category : 'null',
                  });
                }}
                heart={false}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
