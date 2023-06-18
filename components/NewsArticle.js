import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Heart from 'react-animated-heart';
import { useState } from 'react';

export default function NewsArticle({ article, addRemoveFavourite }) {
  const separateWords = (s) => s.replace(/[A-Z][a-z]+/g, '$& ').trim();
  const formatDate = (s) =>
    new Date(s).toLocaleDateString(undefined, { dateStyle: 'long' });

  //nie jest zapamietywane w bazie czy serduszko czerwone
  const [isClick, setClick] = useState(false);
  return (
    <div className="relative flex flex-row justify-between p-4 rounded-md mb-4 bg-white shadow-md">
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
      <div className="mr-0">
        <Heart
          isClick={isClick}
          onClick={() => {
            addRemoveFavourite;
            setClick(!isClick);
          }}
        ></Heart>
      </div>
    </div>
  );
}
