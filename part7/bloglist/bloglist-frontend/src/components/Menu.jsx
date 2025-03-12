import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../reducers/loginReducer";
import blogService from "../services/blogs";
import { Button } from 'react-bootstrap'

const Menu = () => {
    const padding = {
        paddingRight: 5
    }

    const menu = {
        backgroundColor: 'lightgray',
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
    }

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleLogout = () => {
        window.localStorage.removeItem("user");
        blogService.setToken(null);
        dispatch(setUser(null));
        location.reload();
    };

    return (
        <div style={menu}>
            <Link to="/" style={padding}>blogs</Link>
            <Link to="/users" style={padding}>users</Link>
            <p style={padding}>{user.username} logged in</p>
            <Button style={padding} onClick={handleLogout}>logout</Button>
        </div>
    )
}

export default Menu