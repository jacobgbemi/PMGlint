import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Button from './Button'
import Users from './Users';
// import AddProject from './AddProject';
// import GetProjects from './GetProjects';

const Admin = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage'); // linkpage
    }
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <Users />
            <br />
            {/* <AddProject /> */}
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
