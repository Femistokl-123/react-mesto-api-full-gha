import React from 'react';
import success from "../images/success.svg";
import error from "../images/error.svg";

const InfoTooltip = ({ isOpen , onClose, isSuccess }) => {
    return (
        <div className={`popup   ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button aria-label="Close" className="popup__close" type="button" onClick={onClose}/>
                <img
                    src={isSuccess ? success : error}
                    alt={
                        isSuccess ? 'Вы успешно зарегистрировались' : 'Что-то пошло не так'
                    }
                    className="popup__icon"
                />
                <h3 className="popup__title-login">
                    {isSuccess
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h3>

            </div>
        </div>
    );
};

export default InfoTooltip;
