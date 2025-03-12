import { useState } from "react";
import { useDispatch } from "react-redux";
import blogService from "../services/blogs";
import { setUserData } from "../reducers/loginReducer";
import { changeNotification } from "../reducers/notificationReducer";
import { useNavigate } from 'react-router-dom'
import Message from "./Message";
import { Form, Button } from 'react-bootstrap'

const Login = () => {
    const dispatch = useDispatch()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault();
    
        try {
          const user = await blogService.login(username, password);
          window.localStorage.setItem("user", JSON.stringify(user));
          dispatch(setUserData(user));
          blogService.setToken(user.token);
          navigate('/')
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
            <Form onSubmit={handleLogin}>
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
                <Button type="submit">login</Button>
            </Form>
        </div>
    );
};

export default Login;