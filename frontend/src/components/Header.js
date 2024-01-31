import React from 'react';
import headerLogo from '../images/logo.svg';
import {Link, useLocation} from "react-router-dom";

const Header = ({email, isLoggedIn, onSignOut}) => {
    const {pathname} = useLocation()

    return (
        <header className="header page__section">
            <img className="header__logo" src={headerLogo} alt="Место-лого"/>


            {!isLoggedIn ? (
                pathname === "/sign-up" ? (
                    <Link className="header__link" to="/sign-in">
                        Войти
                    </Link>
                ) : (
                    <Link className="header__link" to="/sign-up">
                        Регистрация
                    </Link>
                ))
                :
                (
                    <div className="header__email">
                        <span>{email}</span>
                        <button onClick={onSignOut} className="header__signout">
                            Выйти
                        </button>
                    </div>
                )
            }
        </header>
    );
};

export default Header;
