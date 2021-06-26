import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SubLoading from '../SubLoading/SubLoading';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Movies() {

  return (
    <div className="movies">
        <Header/>
        <SearchForm/>
        <MoviesCardList/>
        <SubLoading/>
        <Footer/>
    </div>
  );
}

export default Movies;