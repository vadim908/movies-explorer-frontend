import React from 'react';
import Header from '../Header/Header';

function Profile() {

  return (
    <section className="profile">
      <Header/>
        <h1 className="profile__title">Привет, Вадим!</h1>
        <form className="profile__form">
            <div className="profile__container">
                <label htmlFor="name" className="profile__label">Имя</label>
                <input id="name" name="name" className="profile__input" />
            </div>
            <label htmlFor="email" className="profile__label">Email</label>
            <input id="email" name="email" className="profile__input" />
            <button type="submit" className='profile__button'>Редактировать</button>
            <button type="button" className='profile__exit'>Выйти из аккаунта</button>
        </form>
    </section>
  );
}

export default Profile;