import React, {useState} from 'react';
import Header from '../Header/Header';
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [data, setData] = React.useState({
    name: '',
    email: '',
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const  handleChange = (e) => {
    const validName = /^[a-zA-Z- ]+$/.test(e.target.value);
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
      e.target.value
    );

    const {name, value} = e.target;
    setData({
        ...data,
      [name]: value 
    });

    if(e.target.id === "name"){
      if (e.target.value.length < 2) {
        setNameError("Длина имени должна быть не менее 2 символов");
      } else if (e.target.value.length > 30) {
        setNameError("Длина имени должна должна быть не более 30 символов");
      } else if (!validName) {
        setNameError("Имя должно быть указано латиницей");
      } else {
        setNameError("");
      }
    }

    if(e.target.id === "email"){
      if (!validEmail) {
        setEmailError("Неверный формат почты");
      } else {
        setEmailError("");
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    props.onProfile(data)
}

  return (
    <section className="profile">
      <Header 
      onBurger={props.onBurger}
      isOpen={props.isOpen}
      />
        <h1 className="profile__title">Привет, {currentUser.name}</h1>

        <form onSubmit={handleSubmit} className="profile__form">
            <div className="profile__container">
                <label htmlFor="name" className="profile__label">Имя</label>
                <input id="name" onChange={handleChange} name="name" className="profile__input" />
            </div>
            <span id="name-error" className="profile__error" >{nameError}</span>

            <div className="profile__container">
            <label htmlFor="email" className="profile__label">Email</label>
            <input id="email" onChange={handleChange} name="email" className="profile__input" />
          

            </div>
            <span id="email-error" className="profile__error" >{emailError}</span>

            <div className="profile__error">{props.message}</div>

            <button type="submit" className='profile__button'>Редактировать</button>
            <button type="button" onClick={props.onExit} className='profile__exit'>Выйти из аккаунта</button>
        </form>
    </section>
  );
}

export default Profile;