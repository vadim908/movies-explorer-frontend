import React from 'react';
import logo from '../../image/logo.svg';
import Navigation from '../Navigation/Navigation';
import ProfileIcon from '../ProfileIcon/ProfileIcon'
import { NavLink, useHistory } from "react-router-dom";

function Header() {

  const history = useHistory();

  const listItem = document.createElement('ProfileIcon');

  function Icon () {
    if(window.matchMedia('(max-width: 320px)')){
      return null;
    }
    else if(window.matchMedia('(max-width: 768px)')){
      return null;
    }

    else if(window.matchMedia('(max-width: 1024px)')){
      return null;
    }
    else if(history.location.pathname === '/saved-movies'|| history.location.pathname === '/movies'|| history.location.pathname === '/profile'){
      return <ProfileIcon/>
    }
  }

  return (

    <header className="header">
      <NavLink to="/" >
        <img src={logo} alt="Лого" className="header__logo" />
      </NavLink>
        <Navigation/>
        <Icon/>
    </header>
  );
}

export default Header;