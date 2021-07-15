import React, { Suspense } from 'react';
import Preloader from '../Preloader/Preloader';
const MoviesCard = React.lazy(() => import("../MoviesCard/MoviesCard"));

function MoviesCardList(props) {



  return (
    <section className="moviesCardList">
      <Suspense fallback={<Preloader />}>
      {props.message ? (
  <p className="movies-message">{props.message}</p>
) : (
    props.movies.slice(0, props.counter).map((movie) =>(
    <MoviesCard 
    onMovieLike={props.onMovieLike}
    movie={movie}
    userMovie = {props.userMovies}
    name={movie.nameRU}
    duration={movie.duration}
    key={movie.movieId}
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
    likemovie={props.likemovie}
     />)
    )
)}
      </Suspense>
    </section>
  );
}

export default MoviesCardList;

