import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import NewsArticle from '@/components/NewsArticle';

export default function FavouritesScreen() {
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
      console.log('error2 ' + error);
    }
  };

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(
          `/api/showFavourites?userEmail=${userEmail}`
        );
        console.log('Fetched articles:', response.data); // Add this line

        if (Array.isArray(response.data)) {
          setArticles(response.data);
        } else {
          setArticles([]); // Set empty array if favourites data is not an array
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    //console.log('Articles:', articles);
  }, [articles]);

  return (
    <Layout title={'your favourites'}>
      <div>
        {articles.map((article, i) => (
          <NewsArticle
            key={i}
            article={article}
            addRemoveFavourite={() => {
              addRemoveFavourite({
                image: article.image?.thumbnail?.contentUrl
                  ? article.image?.thumbnail?.contentUrl
                  : 'brrrbbr',
                url: article.url,
                name: article.name ? article.name : 'rtyui',
                description: article.description ? article.description : 'null',
                datePublished: article.datePublished
                  ? article.datePublished
                  : 'null',
                provider: 'prov',
                category: article.category ? article.category : 'null',
              });
            }}
          />
        ))}
      </div>
    </Layout>
  );
}
