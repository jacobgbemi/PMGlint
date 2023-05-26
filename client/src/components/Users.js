import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
// import { format } from 'date-fns';
import Button from './Button'
import useDelete from "../hooks/useDelete"
import Table from 'react-bootstrap/Table';
// import useAuth from "../hooks/useAuth";

const Users = () => {
    const [users, setUsers] = useState([]);
    // const [userId, setUserId] = useState('');
    // const [authToken, setAuthToken] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const deleteUser = useDelete();
    const delUser = async (id) => {
        await deleteUser(id);
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    return (
        <article>
            <h2>Users List</h2>
            {users.length ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {/* <th>Date Created</th> */}
                            <th>Username</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={i} >
                                {/* <td>{format(new Date(user.createdAt), 'dd/mm/yyyy')}</td> */}
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td >
                                <Button
                                    color={"red"}
                                    text={'Delete'}
                                    onClick={() => delUser(user._id)}
                                />
                                
                                    {/* <useDelete userId={user._id} authToken={auth?.accessToken} /> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No users to display</p>
            )}
            <Button
                color={"dodgerblue"}
                text={'Go back'}
                onClick={() => navigate(-1)}
            />
        </article>
    );
};

export default Users;