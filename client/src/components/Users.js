import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, useParams } from "react-router-dom";
// import { format } from 'date-fns';
import Button from './Button'
// import useDelete from "../hooks/useDelete";
import Table from 'react-bootstrap/Table';

const Users = () => {
    const [users, setUsers] = useState([]);
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

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
    }, [axiosPrivate, navigate, location, setUsers]);

    return (
        <article>
            <h2>Users List</h2>
            {users.length ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr key={i} >
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td >
                                <Button
                                    color={"red"}
                                    text={'Delete'}
                                    // onClick={() => handleDeleteUser(user._id)}
                                />
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