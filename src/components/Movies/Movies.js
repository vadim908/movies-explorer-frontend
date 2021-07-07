import React, { Suspense } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SubLoading from '../SubLoading/SubLoading';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

function Movies(props) {

  const [counter, setCounter] = React.useState(4);

  return (
    <div className="movies">
        <Header
          onBurger={props.onBurger}
          isOpen={props.isOpen}
          icon={props.icon}
        />
        <SearchForm
        onGetMovies={props.onGetMovies}
        onFilter={props.onFilter}
        isShortMovie={props.isShortMovie}
        />
        <Suspense fallback={<Preloader />}>
        <MoviesCardList
          onLike={props.onLike}
          isLike={props.isLike}
          movies={props.movies}
          userMovies = {props.userMovies}
          onGetMovies={props.handleGetMovies}
          onAddMovie={props.onAddMovie}
          onDeleteMovieCard={props.onDeleteMovieCard}
          isSavedMovies={false}
          likedMovies={props.likedMovies}
          message={props.message}
          savedMovies={props.savedMovies}
          counter={counter}
          like={props.like}
          likemovie={props.likemovie}
        />
          {props.movies.length >= 4 &&
          props.movies.length > counter &&
          props.movies.length <= 100 &&
          !props.message ? (
            <SubLoading
                counter={counter}
                setCounter={setCounter}
                />
          ) : (
            ""
          )}
        </Suspense>
        
        <Footer/>
    </div>
  );
}

export default Movies;

