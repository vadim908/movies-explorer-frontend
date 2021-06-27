import React from 'react'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const SavedMovies = (props) => {
    return (
        <section className="savedMovies">
            <Header
                onBurger={props.onBurger}
            />
            <SearchForm/>
            <MoviesCardList/>
            <div className="savedMovies__container">
            </div>
            <Footer/>
        </section>
    )
};

export default SavedMovies;
