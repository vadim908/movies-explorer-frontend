import React, { Suspense } from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../../image/logo.svg';
import Preloader from '../Preloader/Preloader';

function Login(props) {

  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);
  const [data, setData] = React.useState({
    email: '',
    password: '',
  });

  const  handleChange = (e) => {
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
      e.target.value
    );
    const {name, value} = e.target;
    setData({
        ...data,
      [name]: value 
    });

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
      !emailError &&
      !passwordError
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [emailError, passwordError]);

  const handleSubmit = (e) => {
    let {email, password } = data;

    
    e.preventDefault()


      props.onLogin(email, password)
    
}

React.useEffect(()=> {
  if(data.email !== '' && data.password !== ''){
    setFormValid(true);
  } else {
    setFormValid(false);
  }
})

  return (
    <section className="login">
        <div className="login__container">
          <Link to='/'>
              <img src={logo} alt="Лого" className="login__img"/>
          </Link>
            <h1 className="login__title">Рады видеть!</h1>
        </div>
        <Suspense fallback={<Preloader />}>
        <form onSubmit={handleSubmit} className='login__form'>
                <label className='login__label' htmlFor="email">Email</label>
                <input id="email" name='email' onChange={handleChange} type="email" className='login__input'/>
                <span id="email-error" className="error" >{emailError}</span>

                <label className='login__label' htmlFor="password">Пароль</label>
                <input id="password" name='password' onChange={handleChange} type="password" className='login__input'/>
                <span id="password-error" className="error" >{passwordError}</span>
                <div className="error__form">
                    {props.message}
                </div>
                <button disabled={!formValid} type="submit" className='login__button'>Войти</button>
                <p className="login__subtitle">Ещё не зарегистрированы?
                 <Link to="/sign-up" className="login__link">Регистрация</Link>
                 </p>
            </form>
          </Suspense>
    </section>
  );
}

export default Login;