import React from 'react';

function AboutProject() {

  return (
    <section id="aboutProject" className="aboutProject">
        <h2 className="aboutProject__title">О проекте</h2>
        <div className="aboutProject__about">
            <h3 className="aboutProject__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="aboutProject__paragraph">Составление плана, работу над бэкендом, вёрстку,
                 добавление функциональности и финальные доработки.</p>
            <h3  className="aboutProject__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="aboutProject__paragraph">У каждого этапа был мягкий и жёсткий дедлайн,
                 которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>

        <div className="aboutProject__progress">
            <p className="aboutProject__ruler">1 неделя</p>
            <p className="aboutProject__ruler">4 недели</p>
            <p className="aboutProject__signature">Back-end</p>
            <p className="aboutProject__signature">Front-end</p>
        </div>
    </section>
  );
}

export default AboutProject;