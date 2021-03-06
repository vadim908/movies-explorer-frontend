import React from 'react';
import { NavLink } from "react-router-dom";
import back from '../../image/Group.svg'
import ProfileIcon from '../ProfileIcon/ProfileIcon'

function PopupMovie(props) {

  return (
    <div className={`popup-movie ${props.isOpen ? 'popup-movie_opened' : ''}`}>
      <div className="popup-movie__container">
        <img className="popup-movie__img" onClick={props.onClose} src={back} alt="Закрыть"/>
        <nav className="popup-movie__links">
          <NavLink className="popup-movie__link" activeClassName="popup-movie__link_active" exact to="/">
                <p className="popup-movie__text" >Главная</p>
          </NavLink>

            <NavLink className="popup-movie__link"  activeClassName="popup-movie__link_active" to="/movies">
                <p className="popup-movie__text">Фильмы</p>
            </NavLink>

            <NavLink className="popup-movie__link"  activeClassName="popup-movie__link_active" to="/saved-movies">
                <p className="popup-movie__text">Сохранённые фильмы</p>
            </NavLink>

        </nav>
        <div className="popup-movie__profile-icon">
        <ProfileIcon
        isOpen={props.isOpen}
        />
        </div>
      </div>

    </div>
  )
}

export default PopupMovie;
