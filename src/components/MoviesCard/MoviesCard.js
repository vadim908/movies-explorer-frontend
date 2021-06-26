import React from 'react';
import like from '../../image/save5.svg'
import img from '../../image/pic__COLOR_pic.png'
import { useHistory} from 'react-router-dom'; 
import del from '../../image/d5.svg'

function MoviesCard() {

  const history = useHistory();

  const delSaveMovie = `${history.location.pathname === '/saved-movies' ? del : like}`

  return (
    <section className="moviesCard">
        <div className="moviesCard__container">
            <h2 className="moviesCard__name">33 слова о дизайне</h2>
            <p className="moviesCard__time">1ч 42м</p>
            <img className="moviesCard__like" src={delSaveMovie} alt="like"/>
        </div>
        <img className="moviesCard__img" src={img} alt="Обложка"/>
    </section>
  );
}

export default MoviesCard;