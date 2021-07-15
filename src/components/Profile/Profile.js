import React, {useState, Suspense} from 'react';
import Header from '../Header/Header';
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Preloader from '../Preloader/Preloader';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [data, setData] = React.useState({
    name: '',
    email: '',
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const  handleChange = (e) => {
    const validName = /^[a-zA-Z- ]+$/.test(e.target.value);
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(
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
        setFormValid(false);
      } else if (e.target.value.length > 30) {
        setNameError("Длина имени должна должна быть не более 30 символов");
        setFormValid(false);
      } else if (!validName) {
        setNameError("Имя должно быть указано латиницей");
        setFormValid(false);
      } else {
        setNameError("");
        setFormValid(true);
      }
    }
    

    if(e.target.id === "email"){
      if (!validEmail) {
        setEmailError("Неверный формат почты");
        setFormValid(false);
      } else {
        setEmailError("");
        setFormValid(true);
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(data.name !== '' && data.email !== '' && formValid !== false && data.name !== undefined && data.email !== undefined ){
      props.onProfile(data)
    }
}

  return (
    <section className="profile">
      <Header 
      onBurger={props.onBurger}
      isOpen={props.isOpen}
      />      

        <h1 className="profile__title">Привет, {currentUser.name}</h1>
        <Suspense fallback={<Preloader />}>
        <form onSubmit={handleSubmit} className="profile__form">
        <div className="profile__container">
          <label htmlFor="name" className="profile__label">Имя</label>
          <input id="name" type="text" onChange={handleChange} defaultValue={currentUser.name} name="name" className="profile__input" />
        </div>
        <span id="name-error" className="profile__error" >{nameError}</span>

        <div className="profile__container">
        <label htmlFor="email" className="profile__label">Email</label>
        <input id="email" type="text" onChange={handleChange} defaultValue={currentUser.email} name="email" className="profile__input" />
    

        </div>
        <span id="email-error" className="profile__error" >{emailError}</span>

        <div className="profile__error">{props.message}</div>

        <button type="submit" disabled={!formValid} className='profile__button'>Редактировать</button>
        <button type="button" onClick={props.onExit} className='profile__exit'>Выйти из аккаунта</button>
        </form>
      </Suspense>

    </section>
  );
}

export default Profile;