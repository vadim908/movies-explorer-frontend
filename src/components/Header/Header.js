import React from 'react';
import logo from '../../image/logo.svg';
import Navigation from '../Navigation/Navigation';
import ProfileIcon from '../ProfileIcon/ProfileIcon'
import { NavLink } from "react-router-dom";

function Header(props) {

  return (
    <header className="header">
      <NavLink to="/" >
        <img src={logo} alt="Лого" className="header__logo" />
      </NavLink>
        <Navigation
          onBurger={props.onBurger}
        />
        <ProfileIcon
        isOpen={props.isOpen}
        />
        
    </header>
  );
}

export default Header;