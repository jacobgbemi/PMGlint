import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Button from './Button'

const Editor = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/home'); 
    }
    return (
        <section>
            <h2>Editors Page</h2>
            <br />
            <Button
                color={"dodgerblue"}
                text={'Projects List'}
                onClick={() => navigate('/projects/get')}
            />
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
