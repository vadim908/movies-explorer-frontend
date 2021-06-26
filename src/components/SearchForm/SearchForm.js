import React from 'react';

function SearchForm() {

  return (
    <section className="searchForm">
        <div className="searchForm__container">
            <form className="search-form__form">
            <input
                className="searchForm__input"
                type="text"
                name="search"
                placeholder="Фильм"
                minLength="2"
                maxLength="40"
                required
              />
            </form>
            <input className="searchForm__button" type="button" value="Найти"/>
        </div>

        <div className="searchForm__side">
            <input type="checkbox" className="searchForm__checkbox" id="checkbox2" />
            <label htmlFor="checkbox2" className="searchForm__switch">Короткометражки</label>
        </div> 

    </section>
  );
}

export default SearchForm;