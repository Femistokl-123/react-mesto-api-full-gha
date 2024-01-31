export default class Api {
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

    // Отображение карточек с сервера
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            method: "GET",
            headers: this.headers,
        }).then(this._checkResponse);
    }

    // Добавление новой карточки
    addNewCard(data) {
        const { name, link } = data;
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name,
                link,
            })
        })
            .then(this._checkResponse)
    }

    // Получение информации о пользователе
    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "GET",
            headers: this.headers,
        }).then(this._checkResponse);
    }

    // Редактирование информации пользователя
    changeUserInfo(data) {
        const { name, about } = data;
        return fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(this._checkResponse);
    }

    // Замена аватара
    changeUserAvatar(data) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._checkResponse);
    }

    // Поставить лайк карточке
    putLike(id) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            method: "PUT",
            headers: this.headers,
        }).then(this._checkResponse);
    }

    // Убрать лайк карточке
    removeLike(id) {
        return fetch(`${this.baseUrl}/cards/${id}/likes`, {
            method: "DELETE",
            headers: this.headers,
        }).then(this._checkResponse);
    }

    // Удаление карточки
    deleteCard(id) {
        return fetch(`${this.baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this.headers,
        }).then(this._checkResponse);
    }
}

export const api = new Api({
    baseUrl: 'https://api.domainname.students.nomoredomainsmonster.ru',
    headers: {
        Authorization: localStorage.getItem("jwt") || "",
        "Content-Type": "application/json",
    },
});
