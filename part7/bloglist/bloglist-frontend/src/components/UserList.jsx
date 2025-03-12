import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
const Users = () => {
    const users = useSelector(state => state.users)

    return (
        <table>
            <thead>
                <tr>
                    <td>
                        <h1>Users</h1>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> Username </td>
                    <td> Blogs created </td>
                </tr>
                {users.map(user => (
                    <tr key={user.id}>
                        <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
                        <td>{user.blogs.length}</td>
                    </tr>
                ))}
            </tbody>

        </table>
    )
}

export default Users