import React from 'react';

const ImagePopup = ({card, onClose}) => {
    return (
        <div className={`popup popup_photo ${card.link ? "popup_opened" : ""}`}>
            <div className="popup__container-photo">
                <button aria-label="Close" className="popup__close popup__close_photo" type="button" onClick={onClose}/>
                <img src={card.link}
                     className="popup__picture" alt={card.name}/>
                <h2 className="popup__subtitle-photo">{card.name}</h2>
            </div>
        </div>
    );
};

export default ImagePopup;
