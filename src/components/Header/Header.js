import React from 'react';
import logo from '../../image/logo.svg';
import Navigation from '../Navigation/Navigation';
import ProfileIcon from '../ProfileIcon/ProfileIcon'
import { NavLink, useHistory } from "react-router-dom";

function Header(props) {

  const history = useHistory();

  function Icon () {
    if(window.matchMedia('(max-width: 320px)').matches){
      return null;
    }
    else if(window.matchMedia('(max-width: 768px)').matches){
      return null;
    }

    else if(window.matchMedia('(max-width: 1024px)').matches){
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
        <Navigation
          onBurger={props.onBurger}
        />
        <Icon/>
    </header>
  );
}

export default Header;