import React, {useState} from "react";

const Login = ({onLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email.trim() || !password.trim()) {
            return;
        }
        onLogin({email, password});
    };

    return (
        <div className="login">
            <h2 className="login__heading">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input
                    id="email"
                    name="email"
                    className="login__input"
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <input
                    id="password"
                    name="password"
                    className="login__input"
                    type="password"
                    required
                    placeholder="Пароль"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <button className="login__button">Войти</button>
            </form>
        </div>
    );
};

export default Login;
