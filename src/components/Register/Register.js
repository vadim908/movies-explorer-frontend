import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../../image/logo.svg';

function Register(props) {

  const [data, setData] = React.useState({
    email: '',
    password: '',
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

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

    if(e.target.id === "password"){
      if (e.target.value.length < 6) {
        setPasswordError("Пароль должен быть не менее 6 символов");
      } else {
        setPasswordError("");
      }
    }
  }

  React.useEffect(() => {
    if (
      !nameError &&
      !emailError &&
      !passwordError
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [nameError, emailError, passwordError]);

  const handleSubmit = (e) => {
    let {name, email, password } = data;
    e.preventDefault()

    props.onRegister(name, email, password)
}
 
  return (
    <section className="register">
        <div className="register__container">
          <Link to='/'>
            <img src={logo} alt="Лого" className="register__img"/>
          </Link>
            
            <h1 className="register__title">Добро пожаловать!</h1>
        </div>
        <form onSubmit={handleSubmit} className='register__form'>
                <label className='register__label' htmlFor="name">Имя</label>
                <input id="name" onChange={handleChange} name='name' type="text" className='register__input'/>
                <span id="name-error" className="error" >{nameError}</span>

                <label className='register__label' htmlFor="email">Email</label>
                <input id="email" onChange={handleChange} name='email'  type="email" className='register__input'/>
                <span id="email-error" className="error" >{emailError}</span>

                <label className='register__label' htmlFor="password">Пароль</label>
                <input id="password" onChange={handleChange} name='password' type="password" className='register__input'/>
                <span id="password-error" className="error" >{passwordError}</span>
                <div className="error__form">
                    {props.message}
                </div>
                <button disabled={!formValid} type="submit" className='register__button'>Зарегистрироваться</button>
                <p className="register__subtitle">Уже зарегистрированы?
                 <Link to="/sign-in" className="register__link">Войти</Link>
                 </p>
                 
            </form>
    </section>
  );
}

export default Register;