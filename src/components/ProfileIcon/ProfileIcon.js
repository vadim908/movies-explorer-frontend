import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import icon from '../../image/icon__COLOR_icon-main.svg'

function ProfileIcon() {

    const history = useHistory();

    const patchBollean = `${history.location.pathname === '/saved-movies'|| history.location.pathname === '/movies'|| history.location.pathname === '/profile'}`;
    const profileIcon = `${ ("false" === patchBollean) ? 'profile-icon_disabled' : ''}`

  return (
    <NavLink className={`profile-icon ${profileIcon}`} to="/profile">
            <button className="profile-icon__button">
            <p className="profile-icon__button-title">Аккаунт</p>
            <img className="profile-icon__button-img" src={icon} alt="Иконка"/>
            </button>
    </NavLink>
  )
}

export default ProfileIcon;
