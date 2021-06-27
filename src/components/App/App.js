import React from 'react';
import FirstPage from '../FirstPage/Firstpage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile'
import { Route, Switch } from 'react-router-dom'; 
import PopupMovie from '../PopupMovie/PopupMovie'

function App() {

  const [isBurgerPopupOpen, openBurgerPopupClick] = React.useState(false);
  const [islike, likeClick] = React.useState(true); 

  function handleBurgerClick(){ 
    openBurgerPopupClick(true); 
   }
  
   function handleLikeClick(){
     if(islike === false){
      likeClick(true);
     }
     else {
      likeClick(false);
     }
   }

   function closePopup(){
    openBurgerPopupClick(false); 
  } 

  return (
    <div className="root">
      <Switch>
        <Route exact path="/">
          <FirstPage />
        </Route>
        <Route path="/movies">
          <Movies
            onBurger={handleBurgerClick}
            onLike={handleLikeClick}
            isLike={islike}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            onBurger={handleBurgerClick}
          />
        </Route>
        <Route path="/sign-up">
          <Register/>
        </Route>
        <Route path="/sign-in">
          <Login/>
        </Route>
        <Route path="/profile">
        <Profile onBurger={handleBurgerClick}/>
        </Route>
      </Switch>
      <PopupMovie isOpen={isBurgerPopupOpen} onClose= {closePopup}/>
    </div>
  );
}

export default App;
