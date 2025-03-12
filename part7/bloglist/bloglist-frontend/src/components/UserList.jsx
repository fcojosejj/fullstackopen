import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { Table } from "react-bootstrap";

const Users = () => {
    const users = useSelector(state => state.users)

    return (
        <Table>
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

        </Table>
    )
}

export default Users