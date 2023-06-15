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
  const { state, dispatch } = useContext(Favourites);

  const addRemoveFavourites = (article) => {
    const existArticle = state.favourites.newsArticles.find(
      (x) => x.url === article.url
    );

    if (existArticle) {
      dispatch({ type: 'FAVOURITES_REMOVE_ARTICLE', payload: article });
    } else {
      dispatch({
        type: 'FAVOURITES_ADD_ARTICLE',
        payload: { ...article },
      });
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
      <div className="w-11/12 mx-auto">
        <form onSubmit={search} className="mt-8 w-full">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button">Search</button>
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
                addRemoveFavourites={() => addRemoveFavourites(article)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
