import React from 'react';

function Techs() {

  return (
    <section id="techs" className="techs">
        <h3 className="techs__title">Технологии</h3>
        <h2 className="techs__subtitle">7 технологий</h2>
        <p className="techs__about">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="techs__technologies">
            <h3 className="techs__technologie">HTML</h3>
            <h3 className="techs__technologie">CSS</h3>
            <h3 className="techs__technologie">JS</h3>
            <h3 className="techs__technologie">React</h3>
            <h3 className="techs__technologie">Git</h3>
            <h3 className="techs__technologie">Express.js</h3>
            <h3 className="techs__technologie">MongoDB</h3>
        </div>
    </section>
  );
}

export default Techs;