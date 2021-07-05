import React from 'react';


function MoviesCard(props) {
const [like, setLike] = React.useState(false)

  function onLike(){
    setLike(!like)
  }

  const handleClick = () => {
    if (!props.saved) {
      props.onAddMovie({
        country: props.movie.country,
        director: props.movie.director,
        duration: props.movie.duration,
        year: props.movie.year,
        description: props.movie.description,
        image: props.movie.image,
        trailer: props.movie.trailer,
        thumbnail: props.movie.thumbnail,
        movieId: props.movie.movieId,
        nameRU: props.movie.nameRU,
        nameEN: props.movie.nameEN,
        isSaved: props.movie.isSaved,
      });
      onLike()
    } else {
      props.onDeleteMovieCard(props.movie.movieId);
      onLike()
    }
  };

  function handleDelMovie(){
    props.onDeleteMovieCard(props.movie.movieId);
  }


  return (
    <section className="moviesCard">
        <div className="moviesCard__container">
            <h2 className="moviesCard__name">{props.movie.nameRU}</h2>
            <p className="moviesCard__time">{`${Math.floor(
            (props.movie.duration) / 60
          )}ч ${(props.movie.duration) % 60}м`}</p>
            {props.isSavedMovies ? (
          <div className="moviesCard__delete" onClick={handleDelMovie} />
        ) : (
          <div
            className={`moviesCard__like ${like ? "moviesCard__like_active" : ""}`}
            onClick={handleClick}
          />
        )}
        </div>
        <a href={props.movie.trailer } rel="noreferrer" target="_blank">
        <img className="moviesCard__img" src={ props.movie.image} alt="Обложка"/>
                </a>
    </section>
  );
}

export default MoviesCard;