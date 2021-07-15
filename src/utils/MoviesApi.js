class MoviesApi {
    constructor (options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }
  
    getMoviesData() {
      return fetch(`${this._url}`, {
        method: "GET",
        headers: this._headers,
      })
      .then(res => this._checkResult(res))
      .catch(err =>this._showError(err));
    };

    _checkResult(res){
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      };
      
      _showError(err) {
        console.log(err);
      };
  };
  
  const moviesApi = new MoviesApi({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export default moviesApi;