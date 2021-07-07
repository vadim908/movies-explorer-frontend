
import React, { useEffect, useState } from 'react';
import FirstPage from '../FirstPage/Firstpage';
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile'
import {Redirect, Route, Switch, useHistory} from 'react-router-dom'; 
import PopupMovie from '../PopupMovie/PopupMovie';
import NotFound from '../NotFound/NotFound';
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerPopupOpen, openBurgerPopupClick] = React.useState(false);

  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = React.useState([]);
  const [shortMovies, setShortMovies] = useState(false);
  const [sortedMovies, setSortedMovies] = useState([]);
  const [message, setMessage] = useState("");
  const [checkMovies, setCheckMovies] = useState([]);
  const [moviesMessage, setMoviesMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const baseUrl = `https://api.nomoreparties.co`;

  const history = useHistory();

  const handleLogin = (email, password) => { 
    return auth.authorize(email, password) 
     .then((data) => { 
       if (data.token){
        setLoggedIn(true)
        localStorage.setItem('jwt', data.token); 
        history.push('/movies'); 
         return data; 
       }})
      .catch((err) => {
        setMessage("При авторизации произошла ошибка");
        if (err === 401) {
          setMessage("Пользователь с таким email не найден");
        }
        if (err === 400) {
          setMessage("Неверный email или пароль");
        }
        localStorage.removeItem("jwt");
      });
}

  const handleRegist = (name, email, password) => {
    return auth.register(name, email, password)
    .then((res) => {
            setMessage('Вы успешно зарегистрировались!');
            setCurrentUser(res)
            setLoggedIn(true)
            history.push('/movies');
      }
    )
    .catch((err) => {
      if (err === 409) {
        setMessage("Пользователь с таким email уже существует");
      } else {
        setMessage("При регистрации пользователя произошла ошибка");
      }
    });
  }


  // Авторизация при входе
  useEffect(()=> { 
    const jwt = localStorage.getItem('jwt'); 
    if(jwt){ 
      return  auth.getContent(jwt).then((res) => { 
      if (res){ 
        setCurrentUser(res) 
        }
        history.push('/movies')
        setLoggedIn(true) 
      }) 
      .catch((err)=>{ 
        console.log(err); 
        localStorage.removeItem('jwt'); 
      }) 
    } 
    }, [loggedIn, history])

    // Получение фильмов
    useEffect(()=> {
      const saveMovieJWT = localStorage.getItem("movies");
      if(!saveMovieJWT){
        return moviesApi.getMoviesData()
      .then((data) => {
        const allMovies = data.map(({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          id,
          nameRU,
          nameEN,
        }) => ({
          country,
          director,
          duration,
          year,
          description,
          image: image ? `${baseUrl}${image.url}` : "",
          trailer: trailerLink,
          movieId: id,
          nameRU,
          nameEN,
          thumbnail: image ? `${baseUrl}${image.url}` : "#",
        }))
        setMovies(allMovies);
        localStorage.setItem("movies", JSON.stringify(allMovies));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        localStorage.removeItem("movies");
      });
      }
      else{

        const jwtMovie = JSON.parse(localStorage.getItem("allMovies"))
        setMovies(jwtMovie)
      }
    }, [loggedIn, baseUrl])

    function saveMovie(movie) {
      if(!movie){
        setMessage('При добавлении фильма произошла ошибка')
      }
      else{

        delete movie.isSaved
        return mainApi.saveMovie(movie, localStorage.getItem('jwt'))
        .then((userMovie) => {
          if (!userMovie) {
            throw new Error("При добавлении фильма произошла ошибка");
          } else {
            localStorage.setItem(
              "userMovies",
              JSON.stringify((userMovie = [userMovie.movie, ...userMovies]))
            );
            userMovie.isSaved = true
            setUserMovies(prev => ([...prev, userMovie]));

          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      }
    }

    function delMovie(movie){
      const id = userMovies.find((item) => item.movieId === movie)._id;
      
      mainApi
      .deleteMovie(id, localStorage.getItem('jwt'))
      .then(() => {
          setUserMovies(prev => prev.filter(item => item._id !== id));
        })
      
      .catch((err) => console.log(`При удалении фильма: ${err}`));
    }

    React.useEffect(()=> {
      filterShortMovies(userMovies)
    },[userMovies])

    React.useEffect(() => {
        Promise.all([mainApi.getUserData(localStorage.getItem('jwt')), mainApi.getUserMovies(localStorage.getItem('jwt'))])
          .then(([userData, savedMovies]) => {
            setLoggedIn(true)
            
            const itemMovie = savedMovies.filter((i) => i.owner === userData._id)
            setUserMovies(itemMovie);
          })
          .catch((err) => {
            console.log(err);
          });
      
    }, [loggedIn]);

    function filterShortMovies(arr) {

      if (arr.length !== 0 || arr !== "undefind") {
        return arr.filter((movie) =>
          shortMovies ? movie.duration <= 40 : true
        );
      }
    }

    function handleCheckBox() {
      setShortMovies(!shortMovies);
    }

    function handleGetSavedMovies(keyword) {
      setMoviesMessage("");
      const key = new RegExp(keyword, "gi");
      const findedMovies = userMovies.filter(
        (item) => key.test(item.nameRU) || key.test(item.nameEN)
      );
      if (findedMovies.length === 0) {
        setMoviesMessage("Ничего не найдено");
      } else {
        setMoviesMessage("");
        setUserMovies(findedMovies);
      }
    }

    function handleGetMovies(keyword) {
      setMoviesMessage("");
      const key = new RegExp(keyword, "gi");
      const findedMovies = movies.filter(
        (item) => key.test(item.nameRU) || key.test(item.nameEN)
      );
      if (findedMovies.length === 0) {
        setMoviesMessage("Ничего не найдено");
      } else {
        setMoviesMessage("");
        const checkedLikes = findedMovies.map((movie) => {
          movie.isSaved = userMovies.some(
            (userMovie) => userMovie.movieId === movie.id
          );
          return movie;
        });
        setSortedMovies(checkedLikes);
      }
    }

    React.useEffect(() => {
      if(sortedMovies.length === 0){
        setCheckMovies(movies)
      }
      else{
        setCheckMovies(sortedMovies)
      }
    }, [movies, sortedMovies])

    function checkSavedMovie(movie) {
      return (movie.isSaved = userMovies.some(
        (userMovie) => userMovie.movieId === movie.movieId
      ));
    }

    React.useEffect(() => {
      checkSavedMovie(sortedMovies);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userMovies]);

    function handleUpdateUser(data) {
      mainApi
        .editUserInfo(data)
        .then((editedData) => {
          setCurrentUser(editedData);
          setMessage("Данные профиля успешно обновлены");
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          if (err.status === 409) {
            setMessage("Пользователь с таким email уже существует");
          } else {
            setMessage("При изменении данных профиля произошла ошибка");
          }
        });
    }

    const handleSignOut = () => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("movies")
      localStorage.removeItem("userMovies")
      setUserMovies([]);
      setSortedMovies([]);
      setCurrentUser({});
      setLoggedIn(false);
      setMessage("");
      history.push("/");
    };

  function handleBurgerClick(){ 
    openBurgerPopupClick(true); 
   }

   function closePopup(){
    openBurgerPopupClick(false); 
  } 

  return (
    <div className="root">
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route exact path="/">
          <FirstPage />
        </Route>
        <ProtectedRoute 
          path="/movies"
          component={Movies}
          onBurger={handleBurgerClick}
          movies={filterShortMovies(checkMovies)}
          loggedIn={loggedIn}
          userMovies = {userMovies}
          isShortMovie={shortMovies}
          onAddMovie={saveMovie}
          onFilter={handleCheckBox}
          onDeleteMovieCard={delMovie}
          onGetMovies={handleGetMovies}
          likedMovies={checkSavedMovie}
          message={moviesMessage}
          likemovie = {checkSavedMovie}
        />

        <ProtectedRoute 
          path="/saved-movies"
          component={SavedMovies}
          onBurger={handleBurgerClick}
          movies={movies}
          userMovies={userMovies}
          loggedIn={loggedIn}
          isSavedMovies ={true}
          isShortMovie={shortMovies}
          userMovies={filterShortMovies(userMovies)}
          onFilter={handleCheckBox}
          onDeleteMovieCard={delMovie}
          onGetMovies={handleGetSavedMovies}
          message={moviesMessage}
          delMovie={delMovie}
        />
        <Route path="/sign-up">
          <Register
          onRegister={handleRegist}
          message={message}
          />
        </Route>
        <Route path="/sign-in">
          <Login
          onLogin={handleLogin}
          message={message}
          />
        </Route>

        <ProtectedRoute 
          path="/profile"
          component={Profile}
          onProfile={handleUpdateUser}
          onBurger={handleBurgerClick}
          message={message}
          loggedIn={loggedIn}
          onExit= {handleSignOut}
        />
        <Route path="*">
          <NotFound />
        </Route>
        <Redirect to="*" />
      </Switch>
      <PopupMovie isOpen={isBurgerPopupOpen} onClose= {closePopup}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

