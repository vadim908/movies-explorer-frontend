import React from 'react';

function Footer() {

  return (
    <footer className="footer">
        <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className="footer__container">

                <nav className="footer__nav">
                    <ul className="footer__links">
                        <li><a className="footer__link" href="https://yandex.ru/maps" rel="noreferrer" target="_blank">Яндекс.Практикум</a></li>
                        <li><a className="footer__link" href="https://yandex.ru/pogoda" rel="noreferrer" target="_blank">Github</a></li>
                        <li><a className="footer__link" href="https://rasp.yandex.ru" rel="noreferrer" target="_blank">Facebook</a></li>
                    </ul>
                </nav>
                <p className="footer__copyright">&copy; 2021</p>
            </div>
    </footer>
  );
}

export default Footer;