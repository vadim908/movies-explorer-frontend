class MainApi {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData(jwt) {
    return fetch(`${this._url}${"users"}/${"me"}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    }).then(this._getResponse);
  }

  editUserInfo(newData) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: newData.name,
        email: newData.email,
      }),
    }).then(this._getResponse);
  }

  getUserMovies(jwt) {
    return fetch(`${this._url}${"movies"}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(this._getResponse);
  }

  saveMovie(data, jwt) {
    return fetch(`${this._url}movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    })
    .then(this._getResponse);
  };

  deleteMovie(id, jwt) {
    return fetch(`${this._url}${"movies"}/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(this._getResponse);
  }
}

const mainApi = new MainApi({
  url: 'https://api.vadim.d.nomoredomains.club/',
  headers: {
    authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default mainApi;
