import React, {useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {

    const [name, setName] = useState("");
    const [link, setLink] = useState("");

    useEffect(() => {
        setName("");
        setLink("");
    }, [isOpen]);
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link,
        });
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            buttonText={"Создать"}
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}
        >

            <label className="popup__field">
                <input type="text" className="popup__input popup__input_type_title" id="titleInput"
                       name="titleInput" placeholder="Название" minLength="2" maxLength="30" required
                       value={name} onChange={e => setName(e.target.value)}/>
                <span className="popup__input-error titleInput-error">Вы
                            пропустили
                            это
                            поле.</span>
            </label>
            <label className="popup__field">
                <input type="url" className="popup__input popup__input_type_link" id="linkInput"
                       name="linkInput"
                       placeholder="Ссылка на картинку" required
                       value={link} onChange={e => setLink(e.target.value)}
                />
                <span className="popup__input-error linkInput-error">Введите
                            адрес
                            сайта.</span>
            </label>
        </PopupWithForm>
    );
};

export default AddPlacePopup;
