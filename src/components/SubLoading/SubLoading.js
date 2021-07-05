import React from 'react';

function SubLoading(props) {



  function showMoreMovies() {
    props.setCounter(props.counter + 4);
  }

  return (
    <section className="subLoading">
        <button onClick={showMoreMovies} type="button" className="subLoading__button">Ещё</button>
    </section>
  );
}

export default SubLoading;