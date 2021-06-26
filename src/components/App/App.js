import React from 'react';
import FirstPage from '../FirstPage/Firstpage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile'
import { Route, Switch } from 'react-router-dom'; 

function App() {
  return (
    <div className="root">
      <Switch>
        <Route exact path="/">
          <FirstPage />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies/>
        </Route>
        <Route path="/sign-up">
          <Register/>
        </Route>
        <Route path="/sign-in">
          <Login/>
        </Route>
        <Route path="/profile">
        <Profile/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
