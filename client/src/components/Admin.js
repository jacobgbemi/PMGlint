import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Button from './Button'

const Admin = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/home');
    }
    return (
        <section>
            <h2>Admins Page</h2>
            <Button
                color={"dodgerblue"}
                text={'Users List'}
                onClick={() => navigate('/users')}
            />
            <Button
                color={"dodgerblue"}
                text={'Projects List'}
                onClick={() => navigate('/projects/get')}
            />
            <br />
            <div className="flexGrow">
                <Button
                    color={"dodgerblue"}
                    text={'Go back to Dashboard'}
                    onClick={() => navigate('/')}
                />
                <Button
                    color={"red"}
                    text={'Sign Out'}
                    onClick={signOut}
                />
            </div>
        </section>
    )
}

export default Admin
