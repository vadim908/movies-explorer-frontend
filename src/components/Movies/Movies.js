import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SubLoading from '../SubLoading/SubLoading';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies(props) {

  return (
    <div className="movies">
        <Header
          onBurger={props.onBurger} 
        />
        <SearchForm/>
        <MoviesCardList
          onLike={props.onLike}
          isLike={props.isLike}
        />
        <SubLoading/>
        <Footer/>
    </div>
  );
}

export default Movies;