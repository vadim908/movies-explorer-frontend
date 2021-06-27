import React from 'react';
import { NavLink } from "react-router-dom";
import { useHistory} from 'react-router-dom'; 

function Navigation(props) {

  const history = useHistory();

  const movieBoolean = `${history.location.pathname === '/saved-movies'|| history.location.pathname === '/movies'|| history.location.pathname === '/profile'}`
  const movie = `${("false" === movieBoolean)  ? '' : '-movies'}`;

  const moviePatch = `${("false" === movieBoolean)  ? '/sign-up' : '/movies'}`;
  const saveMoviePatch = `${("false" === movieBoolean)  ? '/sign-in' : '/saved-movies'}`;
  const activebutton = `${("false" === movieBoolean)  ? '_active' : ''}`;
  const activeMovies = `${("false" === movieBoolean)  ? '' : '_active'}`
  const textMovie = `${("false" === movieBoolean) ? 'Регистрация' : 'Фильмы'}`;
  const textSaveMovie = `${("false" === movieBoolean) ? 'Войти' : 'Сохранённые фильмы'}`;
  const navMenu = `${("false" === movieBoolean)  ? 'navigation__menu_disabled' : ''}`;
   const menus = `${window.matchMedia('(min-width: 1024px)').matches ? 'navigation__menu_disabled' : '' }`

  return (
        <nav className={`navigation${movie}`}>
           <button className={`navigation__menu ${navMenu} ${menus}` } onClick={props.onBurger}></button>
         <NavLink className={`navigation__link${movie}${activeMovies}`} to={moviePatch}>
              <p>{textMovie}</p>
         </NavLink>
         <NavLink className={`navigation__link${movie}${activebutton}`} to={saveMoviePatch}>
            <p>{textSaveMovie}</p>
         </NavLink>
         </nav>
         );
}

export default Navigation;
