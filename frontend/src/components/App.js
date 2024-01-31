import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useEffect, useState} from "react";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import {auth} from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

    const navigate = useNavigate();

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard({});
    };



    useEffect(() => {
        if(loggedIn) {
            api
                .getUserInfo()
                .then((userData) => {
                    setCurrentUser(userData);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });

            api
                .getInitialCards()
                .then((res) => {
                    setCards(res);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    }, [loggedIn]);

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.includes(currentUser._id);
    console.log(card, currentUser)
        // Отправляем запрос в API и получаем обновлённые данные карточ
        //
        // ки

        if (!isLiked) {
            api.putLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
        } else {
            api.removeLike(card._id).then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            }).catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
        }

    }

    function handleCardDelete(card) {
        const id = card._id;
        api
            .deleteCard(id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== id));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleUpdateUser(data) {
        api
            .changeUserInfo(data)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });

    }

    function handleUpdateAvatar(data) {
         api
            .changeUserAvatar(data)
            .then((userData) => {
                setCurrentUser(userData);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });

    }

    function handleAddPlaceSubmit(data) {
        api
            .addNewCard(data)
            .then((newCard) => {
                setCards([newCard.card, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }


    function handleSignUp(data) {
        return auth.signup(data)
            .then((data) => {
                if(data) {
                    setIsRegisterSuccess(true);
                    navigate("/sign-in", {replace: true});
                }
            })
            .catch((err) => {
                console.log(err);
                setIsRegisterSuccess(false);
            }).finally(() => {
                setIsInfoTooltipOpen(true);
            });
    }

    function handleSignIn(data) {
        return auth.signin(data)
            .then((res) => {
                if (res) {
                    localStorage.setItem("jwt", res.token);
                    setLoggedIn(true);
                    setEmail(data.email);
                    navigate("/", { replace: true });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleSignOut() {
        setLoggedIn(false);
        localStorage.removeItem("jwt");
        navigate("/sign-in", {replace: true});
    }

    function checkJwtToken(jwt) {
        auth.checkToken(jwt)
            .then((data) => {
                if(data) {
                    setEmail(data.email);
                    setLoggedIn(true);
                    navigate("/", {replace: true});
                }
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        console.log("jwt")
        if (jwt) {
            checkJwtToken(jwt);
        }
    }, []);

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header email={email} isLoggedIn={loggedIn} onSignOut={handleSignOut}/>

              <Routes>
                <Route
                  path="/sign-in"
                  element={<Login onLogin={handleSignIn}/>}
                />

                <Route
                  path="/sign-up"
                  element={<Register onRegister={handleSignUp}/>}
                />

                <Route path={"/"} element={
                  <ProtectedRoute isLogin={loggedIn} >
                    <Main
                      onEditProfile={handleEditProfileClick}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      cards={cards}
                      onCardDelete={handleCardDelete}
                    />
                  </ProtectedRoute>

                }/>

                <Route path={"*"} element={<Navigate to="/" replace/>}/>
              </Routes>

                {loggedIn && <Footer/>}
                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
                                  onUpdateUser={handleUpdateUser}/>

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
                               onAddPlace={handleAddPlaceSubmit}/>

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                <ImagePopup card={selectedCard} onClose={closeAllPopups}/>

                <PopupWithForm
                    name="delete"
                    title="Вы уверены?"
                    buttonText={"Да"}
                    onClose={closeAllPopups}
                >
                </PopupWithForm>

                <InfoTooltip
                    isOpen={isInfoTooltipOpen}
                    onClose={closeAllPopups}
                    isSuccess={isRegisterSuccess}
                />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
