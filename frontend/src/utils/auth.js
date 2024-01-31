
class Auth {
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.headers = config.headers;
    }

    // Проверка ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    signup (data){
        return fetch(`${this.baseUrl}/signup`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data),
        }).then(this._checkResponse);
    }

    signin(data) {
        return fetch(`${this.baseUrl}/signin`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data),
        }).then(this._checkResponse);
    };

    checkToken(jwt) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: {
                ...this.headers,
                Authorization: jwt,
            },
        }).then(this._checkResponse);
    };

}

export const auth = new Auth({
    baseUrl: "https://api.domainname.students.nomoredomainsmonster.ru",
    headers: {
        "Content-Type": "application/json",
    },
});
