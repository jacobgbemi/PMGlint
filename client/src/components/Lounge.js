import { useNavigate} from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Button from './Button'

const Lounge = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage'); // linkpage
    }
    return (
        <section>
            <h1>The Lounge</h1>
            <br />
            <p>Admins and Editors can hang out here.</p>
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

export default Lounge
