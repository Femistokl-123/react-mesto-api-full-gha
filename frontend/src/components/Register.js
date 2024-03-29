import {useState} from "react";
import {Link} from "react-router-dom";

const Register = ({onRegister}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email.trim() || !password.trim()) {
            return;
        }
        onRegister({email, password});
    };

    return (
        <div className="login">
            <h2 className="login__heading">Регистрация</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input
                    className="login__input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <input
                    className="login__input"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <button className="login__button" type="submit">Зарегистрироваться</button>
            </form>
            <Link to="/sign-in" className="login__link-login">
                Уже зарегистрированы? Войти
            </Link>
        </div>
    );
};

export default Register;
