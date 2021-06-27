import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(props) {

  return (
    <section className="moviesCardList">
        <MoviesCard onLike={props.onLike} isLike={props.isLike}/>
        <MoviesCard />
        <MoviesCard/>
        <MoviesCard/>
    </section>
  );
}

export default MoviesCardList;