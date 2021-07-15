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
   const vizibleContainer = `${("false" === movieBoolean)  ? 'navigation__menu__container_on' : ''}`;


  return (
        <nav className={`navigation${movie}`}>
           <button className={`navigation__menu ${navMenu}` } onClick={props.onBurger}></button>
           <div className={`navigation__menu__container ${vizibleContainer}`}>
               <NavLink className={`navigation__link${movie}${activeMovies}`} to={moviePatch}>
                  <p>{textMovie}</p>
               </NavLink>
               <NavLink className={`navigation__link${movie}${activebutton}`} to={saveMoviePatch}>
                  <p>{textSaveMovie}</p>
               </NavLink>
           </div>
         
         </nav>
         );
}

export default Navigation;
