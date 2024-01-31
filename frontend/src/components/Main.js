import React, {useContext} from 'react';
import plus from "../images/Vector2.svg"
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
const Main = ({onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete}) => {
    const currentUser = useContext(CurrentUserContext);
    const userName = currentUser.name;
    const userDescription = currentUser.about;
    const userAvatar = currentUser.avatar;


    return (
        <main className="content">
            <section className="profile">
                <div className="profile-main">
                    <div className="profile-main__avatar-container" onClick={onEditAvatar}>
                        <img src={userAvatar} className="profile-main__avatar-size" alt="аватар"/>
                    </div>
                    <div className="profile-main__info">
                        <h1 className="profile-main__author">{userName}</h1>
                        <button aria-label="Edit" className="profile-main__edit-button" type="button" onClick={onEditProfile}/>
                        <p className="profile-main__job">{userDescription}</p>
                    </div>
                    <button aria-label="Add" className="button profile-main__button" type="button" onClick={onAddPlace}>
                        <img src={plus} className="profile-main__button-plus" alt="плюс"/>
                    </button>
                </div>
            </section>

            <section className="elements-grid">
                {
                    cards.map(card => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>)
                }
            </section>
        </main>
    );
};

export default Main;
