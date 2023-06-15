import { createContext, useReducer } from 'react';
// import Cookies from 'js-cookie';

const initialFavouritesState = {
  // cart: Cookies.get('cart')
  //   ? JSON.parse(Cookies.get('cart'))
  //   : { cartItems: [] },
  favourites: { newsArticles: [] },
};

export const Favourites = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'FAVOURITES_ADD_ARTICLE': {
      const newArticle = action.payload;
      // const articleExists = state.favourites.newsArticles.find(
      //   (article) => article.url === newArticle.url
      // );
       const newsArticles = 
      //articleExists
      //   ? state.favourites.newsArticles.map((article) =>
      //       article.name === articleExists.name ? newArticle : article
      //     )
      //   : 
      [...state.favourites.newsArticles, newArticle];
      return { ...state, favourites: { ...state.favourites, newsArticles } };
    }
    case 'FAVOURITES_REMOVE_ARTICLE': {
      const newsArticles = state.favourites.newsArticles.filter(
        (article) => article.slug !== action.payload.slug
      );

      return { ...state, favourites: { ...state.favourites, newsArticles } };
    }

    default:
      return state;
  }
}

// component to pass store provider to all children
export function FavouritesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialFavouritesState);
  const value = { state, dispatch };
  return <Favourites.Provider value={value}>{children}</Favourites.Provider>;
}
