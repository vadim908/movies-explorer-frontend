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
import {Redirect, Route, Switch, useHistory, useLocation} from 'react-router-dom'; 
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
  const [sortedUserMovies, setSortedUserMovies] = useState([]);
  const [message, setMessage] = useState("");
  const [checkMovies, setCheckMovies] = useState([]);
  const [checkUserMovies, setCheckUserMovies] = useState([]);
  
  const [moviesMessage, setMoviesMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkSave, setCheckSave] = useState(false);
  const [loading, setLoading] = useState(false)
  const [feachFilm, setFeachFilm] = useState([])

  const baseUrl = `https://api.nomoreparties.co`;

  const history = useHistory();
  let location = useLocation();
  const pathname = location.pathname;
  const PAGE_WITH_AUTH = ['/movies', '/saved-movies', '/profile']
  const PAGE_WITHOUT_AUTH = ['/sign-in', '/sign-up']

  const handleLogin = (email, password) => {
    setLoading(true)
    return auth.authorize(email, password) 
     .then((data) => { 
       if (data.token){
        setLoggedIn(true)
        setLoading(false)
        localStorage.setItem('jwt', data.token);
        localStorage.setItem("sortedMovies", JSON.stringify(feachFilm))
        localStorage.setItem("sortedMoviesUser", JSON.stringify(feachFilm));
        history.push('/movies'); 
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

function checkToken() {
  if (localStorage.getItem('jwt')) {
    setLoggedIn(true);
    const pathToRedirect = PAGE_WITH_AUTH.includes(pathname) ? pathname : (pathname === '/' ? pathname : (PAGE_WITHOUT_AUTH.includes(pathname) ? '/' : 'notFound'));
    history.push(pathToRedirect);
  }
}

  const handleRegist = (name, email, password) => {
    setLoading(true)
    return auth.register(name, email, password)
    .then((res) => {
            setMessage('Вы успешно зарегистрировались!');
            setCurrentUser(res)
            auth.authorize(email, password) 
     .then((data) => { 
       if (data.token){
        setLoggedIn(true)
        setLoading(false)
        localStorage.setItem('jwt', data.token);
        localStorage.setItem("sortedMovies", JSON.stringify(feachFilm))
        localStorage.setItem("sortedMoviesUser", JSON.stringify(feachFilm));
        history.push('/movies'); 
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
    )
    .catch((err) => {
      if (err === 409) {
        setMessage("Пользователь с таким email уже существует");
      } else {
        setMessage("При регистрации пользователя произошла ошибка");
      }
    });
  }

    // Получение фильмов
    useEffect(()=> {
      setLoading(true)
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
        setLoading(false)
        setMovies(allMovies);
        localStorage.setItem("movies", JSON.stringify(allMovies));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        localStorage.removeItem("movies");
      });
      }
      else{

        const jwtMovie = JSON.parse(localStorage.getItem("movies"))
        setMovies(jwtMovie)
        setLoading(false)
      }
    }, [loggedIn, baseUrl])

    function saveMovie(movie) {
      if(!movie){
        setMessage('При добавлении фильма произошла ошибка')
      }
      else{
        setLoading(true)
        delete movie.isSaved
        return mainApi.saveMovie(movie, localStorage.getItem('jwt'))
        .then((userMovie) => {
          if (!userMovie) {
            throw new Error("При добавлении фильма произошла ошибка");
          } else {
            setLoading(false)
            const setUserMovie = (prev => ([...prev, userMovie]));
            
            setUserMovies(setUserMovie);
            setCheckSave(true)
            localStorage.setItem(
              "userMovies",
              JSON.stringify(userMovies));
          }
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          localStorage.removeItem("userMovies");
        });
      }
    }

    function delMovie(movie){
      const id = userMovies.find((item) => item.movieId === movie)._id;
      setLoading(true)
      mainApi
      .deleteMovie(id, localStorage.getItem('jwt'))
      .then(() => {
        setLoading(false)
          setUserMovies(prev => prev.filter(item => item._id !== id));
          setCheckSave(false)
        })
      
      .catch((err) => console.log(`При удалении фильма: ${err}`));
    }

    React.useEffect(()=> {
      filterShortMovies(userMovies)
    },[userMovies])

    React.useEffect(() => {
      
      checkToken()
      const jwt = localStorage.getItem('jwt')
      if(jwt){
        setLoading(true)
      const userMovie = localStorage.getItem("userMovies");
      const userData = localStorage.getItem("currentUser");
      if(!userMovie && !userData || userMovie === null){
        if(loggedIn === true){
          Promise.all([mainApi.getUserData(localStorage.getItem('jwt')), mainApi.getUserMovies(localStorage.getItem('jwt'))])
            .then(([userData, savedMovies]) => {
              setLoggedIn(true)
              setLoading(false)
              const itemMovie = savedMovies.filter((i) => i.owner === userData._id)
              setUserMovies(itemMovie);
              localStorage.setItem("currentUser", JSON.stringify(userData));
              localStorage.setItem(
                "userMovies",
                JSON.stringify(userMovies));
            })
            .catch((err) => {
              console.log(err);
              setLoggedIn(false)
              localStorage.removeItem("currentUser");
              localStorage.removeItem("userMovies")

            });
        }
      }
      else{
        const pasteUserMovies = JSON.parse(localStorage.getItem("userMovies"))
        const pasteUserData = JSON.parse(localStorage.getItem("currentUser"))
        setUserMovies(pasteUserMovies);
        setCurrentUser(pasteUserData);
        setLoggedIn(true)
        setLoading(false)
      }
      }
      else {
        setLoggedIn(false)
        localStorage.removeItem('jwt')
      }
      
      
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

      const checkUserFilterMovies =  JSON.parse(localStorage.getItem("sortedMoviesUser"))
      const filter = checkUserFilterMovies.filter((i) => i.nameRU === keyword)
      if(filter.length === 0){
        setMoviesMessage("");
      const key = new RegExp(keyword, "gi");
      const findedMovies = userMovies.filter(
        (item) => key.test(item.nameRU) || key.test(item.nameEN)
      );
      if (findedMovies.length === 0) {
        setMoviesMessage("Ничего не найдено");
      } else {
        setMoviesMessage("");
        setSortedUserMovies(findedMovies);
        
        findedMovies.map((i)=> {
          setFeachFilm(prev => ([...prev, i]))
          localStorage.setItem("sortedMoviesUser", JSON.stringify(feachFilm))
        })
      }}
      else {
        const filterMoviesUser = JSON.parse(localStorage.getItem("sortedMoviesUser"))
        const findMovie = filterMoviesUser.filter((i) => i.nameRU === keyword)
        setSortedUserMovies(findMovie)
      }
    }

    function handleGetMovies(keyword) {
      const checkFilterMovies = JSON.parse(localStorage.getItem("sortedMovies"));
      const filter = checkFilterMovies.filter((i) => i.nameRU === keyword)
        if(filter.length === 0){
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
          checkedLikes.map((i)=> {
            setFeachFilm(prev => ([...prev, i]))
            localStorage.setItem("sortedMovies", JSON.stringify(feachFilm))
          })
        }
        }
        else {
          const filterMovies = JSON.parse(localStorage.getItem("sortedMovies"))
          const findMovie = filterMovies.filter((i) => i.nameRU === keyword)
          setSortedMovies(findMovie)
        }
        
      
    }

    React.useEffect(() => {
      if(sortedUserMovies.length === 0){
        setCheckUserMovies(userMovies)
      }
      else{
        setCheckUserMovies(sortedUserMovies)
      }
    }, [userMovies, sortedUserMovies])

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
    }, [checkSave]);

    function handleUpdateUser(data) {
      setLoading(true)
      mainApi
        .editUserInfo(data)
        .then((editedData) => {
          setLoading(false)
          setCurrentUser(editedData);
          setMessage("Данные профиля успешно обновлены");
          localStorage.setItem("currentUser", JSON.stringify(editedData));
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
          if (err.status === 409) {
            setMessage("Пользователь с таким email уже существует");
          } else {
            setMessage("При изменении данных профиля произошла ошибка");
          }
          localStorage.removeItem("currentUser")
        });
    }

    const handleSignOut = () => {
      localStorage.removeItem("jwt");
      localStorage.removeItem("movies")
      localStorage.removeItem("userMovies")
      localStorage.removeItem("currentUser")
      localStorage.removeItem("sortedMovies")
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
          loading={loading}
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
          userMovies={filterShortMovies(checkUserMovies)}
          onFilter={handleCheckBox}
          onDeleteMovieCard={delMovie}
          onGetMovies={handleGetSavedMovies}
          message={moviesMessage}
          delMovie={delMovie}
          likemovie = {checkSavedMovie}
          loading={loading}
        />
        <Route path="/sign-up">
          <Register
          onRegister={handleRegist}
          message={message}
          loading={loading}
          />
        </Route>
        <Route path="/sign-in">
          <Login
          onLogin={handleLogin}
          message={message}
          loading={loading}
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
          loading={loading}
        />
        <Route path="/*">
          <NotFound />
        </Route>
      </Switch>
      <PopupMovie isOpen={isBurgerPopupOpen} onClose= {closePopup}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;