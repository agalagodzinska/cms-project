import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

//Link nie dziala

export default function NewsArticle({ article, addRemoveFavourites }) {
  const separateWords = (s) => s.replace(/[A-Z][a-z]+/g, '$& ').trim();
  const formatDate = (s) =>
    new Date(s).toLocaleDateString(undefined, { dateStyle: 'long' });

  return (
    <div className="relative flex flex-row p-4 rounded-md mb-4 bg-white shadow-[0_2px_6px_2px_rgba(0,0,0,0,0.14)">
      <li className="list-none">
        {article.image && (
          <img className="" alt="" src={article.image?.thumbnail?.contentUrl} />
        )}

        <h2 className="title font-semibold text-xl">
          <a href={article.url}>{article.name}</a>
        </h2>

        <p className="description">{article.description}</p>

        <div className="meta">
          <span>{formatDate(article.datePublished)}</span>

          <span className="provider">{article.provider[0].name}</span>

          {article.category && <span>{separateWords(article.category)}</span>}
        </div>
      </li>
      <button className="absolute top-0 right-0 mt-4 mr-4" onClick={addRemoveFavourites}>serducszko</button>
    </div>
  );
}
