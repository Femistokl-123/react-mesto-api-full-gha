import React, {useContext, useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [about, setAbout] = useState("");

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        onUpdateUser({
            name,
            about,
        });
    };

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input type="text" className="popup__input popup__input_type_name" id="nameInput"
                       name="nameInput"
                       placeholder="Имя" minLength="2" maxLength="40" required value={name || ''} onChange={e => setName(e.target.value)}/>
                <span className="popup__input-error nameInput-error">Вы
                            пропустили это
                            поле.</span>
            </label>
            <label className="popup__field">
                <input type="text" className="popup__input popup__input_type_inf" id="infInput" name="infInput"
                       placeholder="Вид деятельности" minLength="2" maxLength="200" required value={about || ''} onChange={e => setAbout(e.target.value)}/>
                <span className="popup__input-error infInput-error">Вы пропустили
                            это
                            поле.</span>
            </label>
        </PopupWithForm>
    );
};

export default EditProfilePopup;
