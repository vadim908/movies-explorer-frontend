import React from 'react';
import link from '../../image/text__COLOR_font-main.svg'

function Portfolio() {

  return (
    <section className="portfolio">
        <h2 className="portfolio__title">Портфолио</h2>
            <div className="portfolio__container">
                <h3 className="portfolio__resours">Статичный сайт</h3>
                <a className="portfolio__img" href="https://github.com/vadim908/second-project">
                    <img src={link} alt="Указатель"/>
                </a>
            </div>

            <div className="portfolio__container">
                <h3 className="portfolio__resours">Адаптивный сайт</h3>
                <a className="portfolio__img" href="https://github.com/vadim908/russian-travel">
                    <img src={link} alt="Указатель"/>
                </a>
            </div>

            <div className="portfolio__container">
                <h3 className="portfolio__resours">Одностраничное приложение</h3>
                <a className="portfolio__img" href="https://github.com/vadim908/mesto">
                    <img  src={link} alt="Указатель"/>
                </a>
            </div>
    </section>
  );
}

export default Portfolio;