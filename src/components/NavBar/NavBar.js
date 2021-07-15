import React from 'react';

function NavBar() {

  return (
    <section className="navBar">
        <nav className="navBar__links">
        <a href="#aboutProject" className="navBar__link">
            <p>О проекте</p>
        </a>
        <a href="#techs" className="navBar__link">
            <p>Технологии</p>
        </a>
        <a href="#aboutMe" className="navBar__link">
            <p>Студент</p>
        </a>
        </nav>
    </section>
  );
}

export default NavBar;