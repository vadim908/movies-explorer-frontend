import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../../image/logo.svg';

function Register() {

  return (
    <section className="register">
        <div className="register__container">
          <Link to='/'>
            <img src={logo} alt="Лого" className="register__img"/>
          </Link>
            
            <h1 className="register__title">Добро пожаловать!</h1>
        </div>
        <form className='register__form'>
                <label className='register__label' htmlFor="name">Имя</label>
                <input id="name" name='name' type="text" className='register__input'/>
                <span id="name-error" className="error" />

                <label className='register__label' htmlFor="email">Email</label>
                <input id="email" name='email'  type="email" className='register__input'/>
                <span id="email-error" className="error" />

                <label className='register__label' htmlFor="password">Пароль</label>
                <input id="password" name='password' type="password" className='register__input'/>
                <span id="password-error" className="error" >Что-то пошло не так...</span>
                
                <button type="submit" className='register__button'>Зарегистрироваться</button>
                <p className="register__subtitle">Уже зарегистрированы?
                 <Link to="/sign-in" className="register__link">Войти</Link>
                 </p>
            </form>
    </section>
  );
}

export default Register;