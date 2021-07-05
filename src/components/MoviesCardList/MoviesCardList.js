import React, { Suspense } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardList(props) {
  return (
    <section className="moviesCardList">
      <Suspense fallback={<Preloader />}>
      {props.message ? (
  <p className="movies-message">{props.message}</p>
) : (
    props.movies.slice(0, props.counter).map((movie, id) =>(
    <MoviesCard 
    onMovieLike={props.onMovieLike}
    movie={movie}
    userMovie = {props.userMovies}
    name={movie.nameRU}
    duration={movie.duration}
    key={id}
    id={movie._id}
    {...movie}
    isSavedMovies={props.isSavedMovies}
    likedMovies={props.likedMovies}
    onAddMovie={props.onAddMovie}
    onDeleteMovieCard={props.onDeleteMovieCard}
    saved={props.userMovies.some(usersItem => usersItem.movieId === movie.movieId)}
    savedMovies={props.savedMovies}
    isLiked={props.isLike}
    like={props.like}
     />)
    )
)}
      </Suspense>
    </section>
  );
}

export default MoviesCardList;

