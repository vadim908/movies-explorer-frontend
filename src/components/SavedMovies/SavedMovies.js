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
                isOpen={props.isOpen}
            />
            <SearchForm
              onGetMovies={props.onGetMovies}
              onFilter={props.onFilter}
              isShortMovie={props.isShortMovie}
            />
            {props.userMovies.length > 0 ? (
        <MoviesCardList
          isSavedMovies={props.isSavedMovies}
		      userMovies = {props.userMovies}
          movies={props.userMovies}
          onDeleteMovieCard={props.onDeleteMovieCard}
          message={props.message}
        />
      ) : (
        <p className="savedMovies-message">У вас пока нет сохраненных фильмов</p>
      )}
            <div className="savedMovies__container">
            </div>
            <Footer/>
        </section>
    )
};

export default SavedMovies;
