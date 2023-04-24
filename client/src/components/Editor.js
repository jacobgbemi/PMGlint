import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Button from './Button'

const Editor = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage'); // linkpage
    }
    return (
        <section>
            <h1>Editors Page</h1>
            <br />
            <p>You must have been assigned an Editor role.</p>
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

export default Editor
