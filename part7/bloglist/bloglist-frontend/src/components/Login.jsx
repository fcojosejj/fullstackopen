import { useState } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { setUserData } from "../reducers/loginReducer";
import { changeNotification } from "../reducers/notificationReducer";
import Message from "./Message";

const Login = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
          const user = await blogService.login(username, password);
          window.localStorage.setItem("user", JSON.stringify(user));
          dispatch(setUserData(user));
    
          blogService.setToken(user.token);
          setUsername("");
          setPassword("");
        } catch (error) {
          dispatch(changeNotification("Wrong username or password", 3));
          setUsername("");
          setPassword("");
        }
      };

    return (
        <div>
            <h2>Login</h2>
            <Message />
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default Login;