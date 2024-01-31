import React from 'react';

const PopupWithForm = ({name, title, isOpen, onClose, children, buttonText, onSubmit}) => {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button aria-label="Close" className="popup__close" type="button" onClick={onClose}/>
                <h3 className="popup__title">{title}</h3>
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    {children}
                    <button className="button popup__button popup__button_save" type="submit">{buttonText}</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;
