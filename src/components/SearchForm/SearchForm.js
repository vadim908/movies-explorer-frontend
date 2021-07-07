import React from 'react';

function SearchForm(props) {

  const [findedMovie, setFindedMovie] = React.useState("");
  const [error, setError] = React.useState("");
  const [formValid, setFormValid] = React.useState(false);


  function handleSearchMovie(e) {
    setFindedMovie(e.target.value);
    if (e.target.value.length === 0) {
      setError("Нужно ввести ключевое слово");
    } else {
      setError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    props.onGetMovies(findedMovie);
    setFindedMovie("");
  }

  React.useEffect(() => {
    if (findedMovie && !error) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [findedMovie, error]);

  return (
    <section className="searchForm">
        <div className="searchForm__container">
            <form  onSubmit={handleSubmit} className="search-form__form">
            <input
                className="searchForm__input"
                type="text"
                name="search"
                placeholder="Фильм"
                minLength="2"
                maxLength="40"
                value={findedMovie}
                onChange={handleSearchMovie}
                required

              />
            <button disabled={!formValid} className="searchForm__button" type="submit" >Найти</button>
            </form>
        </div>
        <div className="searchForm-error">{error}</div>

        <div className="searchForm__side">
            <input type="checkbox"  onClick={props.onFilter} defaultChecked={props.isShortMovie} className="searchForm__checkbox" id="checkbox2" />
            <label htmlFor="checkbox2" className="searchForm__switch">Короткометражки</label>
        </div>

    </section>
  );
}

export default SearchForm;