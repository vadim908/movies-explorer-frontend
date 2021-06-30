import React from 'react';
import { NavLink, useHistory } from "react-router-dom";
import iconca from '../../image/icon__COLOR_icon-main.svg'

function ProfileIcon(props) {

  const [icon, setIcon] = React.useState(false);
  const history = useHistory();


React.useEffect(()=> {
    if(props.isOpen){
      setIcon(true)
    }
    else {
      setIcon(false)
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
},[props.isOpen])



    const patchBollean = `${history.location.pathname === '/saved-movies'|| history.location.pathname === '/movies'|| history.location.pathname === '/profile'}`;
    const profileIcon = `${ ("false" === patchBollean) ? 'profile-icon_disabled' : ''}`
    const vizibleIcon = `${icon ? 'profile-icon_on' : ''}`


  return (
    <NavLink className={`profile-icon ${profileIcon} ${vizibleIcon}`} to="/profile">
            <button className="profile-icon__button">
            <p className="profile-icon__button-title">Аккаунт</p>
            <img className="profile-icon__button-img" src={iconca} alt="Иконка"/>
            </button>
    </NavLink>
  )
}



export default ProfileIcon;
