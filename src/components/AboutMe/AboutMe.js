import React from 'react';
import avatar from '../../image/r3cY_aOoK3E.jpg'

function AboutMe() {

  return (
    <section id="aboutMe" className="aboutMe">
        <h2 className="aboutMe__title">Студент</h2>
        <div className="aboutMe__container">
            <img className="aboutMe__avatar" src={avatar} alt="Аватарка"></img>
            <h3 className="aboutMe__subtitle">Вадим</h3>
            <p className="aboutMe__profile">Фронтенд-разработчик, 22 лет</p>
            <p className="aboutMe__about">Я родился в городе Апатиты, а на данный момент проживаю в Москве.
                Закончил Костромской Государственный Университет и имею Инженерную специальность.
                Люблю слушать музыку, играть в видеоигры и играть на гитаре. Недавно начал кодить. 
                С 2021 работаю в фирме "I am studio".</p>

            <div className="aboutMe__resources">
                <a href="https://vk.com/puerpeccati" rel="noreferrer" target="_blank" className="aboutMe__link">Vk</a>
                <a href="https://github.com/vadim908" rel="noreferrer" target="_blank" className="aboutMe__link">Github</a>
            </div>
        </div>
    </section>
  );
}

export default AboutMe;