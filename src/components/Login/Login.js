import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../../image/logo.svg';

function Login() {

  return (
    <section className="login">
        <div className="login__container">
          <Link to='/'>
              <img src={logo}  alt="Лого" className="login__img"/>
          </Link>
            <h1 className="login__title">Рады видеть!</h1>
        </div>

        <form className='login__form'>
                <label className='login__label' htmlFor="email">Email</label>
                <input id="email" name='email'  type="email" className='login__input'/>
                <span id="email-error" className="error" />

                <label className='login__label' htmlFor="password">Пароль</label>
                <input id="password" name='password' type="password" className='login__input'/>
                <span id="password-error" className="error" >Что-то пошло не так...</span>
                
                <button type="submit" className='login__button'>Войти</button>
                <p className="login__subtitle">Ещё не зарегистрированы?
                 <Link to="/sign-up" className="login__link">Регистрация</Link>
                 </p>
            </form>
    </section>
  );
}

export default Login;