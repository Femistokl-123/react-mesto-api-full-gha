import React, {useRef} from 'react';
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
    const inputRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            onClose={onClose}
            isOpen={isOpen}
            buttonText={"Сохранить"}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input ref={inputRef} className="popup__input popup__input_type_avatar" id="avatarInput" type="url"
                       name="avatar" placeholder="Ссылка на картинку" required/>
                <span className="popup__input-error avatar-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;
