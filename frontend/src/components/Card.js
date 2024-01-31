import React, {useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {
    const currentUser = useContext(CurrentUserContext);

    const handleClick = () => {
        onCardClick(card);
    };

    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.includes(currentUser._id);
    const cardLikeButtonClassName = `elements-grid__icon ${isLiked ? 'elements-grid__icon_like' : ''}`;

    const handleLikeClick = () => {
        onCardLike(card);
    };

    const handleDeleteClick = () => {
        onCardDelete(card);
    };

    return (
        <div className="elements-grid__item">
            {isOwn && <button aria-label="Delete" className="elements-grid__delete" type="button" onClick={handleDeleteClick}/>}
            <div className="elements-grid__zoom">
                <img className="elements-grid__image"
                     src={card.link}
                     alt={card.name}
                     onClick={handleClick}
                />
            </div>
            <div className="elements-grid__bottom">
                <h3 className="elements-grid__name">{card.name}</h3>
                <div className="elements-grid__container">
                    <button onClick={handleLikeClick} aria-label="Like" className={cardLikeButtonClassName} type="button"/>
                    <p className="elements-grid__counter">{card.likes.length}</p>
                </div>
            </div>
        </div>
    );
};

export default Card;
