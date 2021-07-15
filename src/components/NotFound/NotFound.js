import React from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

function NotFound() {

  const history = useHistory();

  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__subtitle">Страница не найдена</p>
        <button className="not-found__link" onClick={() => history.push('/movies')}>Назад</button>
    </div>
  )
}

export default NotFound;
