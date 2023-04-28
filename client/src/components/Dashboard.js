import { useNavigate} from "react-router-dom";
import useLogout from "../hooks/useLogout";
import Button from './Button'

const Dashboard = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/linkpage'); // linkpage
    }

    return (
        <section className="container" >
            <div className="Row">
            <h1>Your Project Management Glint</h1>
            <br />
            <p>Your project Charts and Status will be here</p>
            </div>
            <div >
                <Button
                    color={"dodgerblue"}
                    text={'Go to Admin page'}
                    onClick={() => navigate('/admin')}
                />
                <Button
                    color={"dodgerblue"}
                    text={'Go to Project Editor page'}
                    onClick={() => navigate('/editor')}
                />
                <Button
                    color={"dodgerblue"}
                    text={'Create Project'}
                    onClick={() => navigate('/projects/post')}
                />
                <Button
                    color={"dodgerblue"}
                    text={'View Projects'}
                    onClick={() => navigate('/projects/get')}
                />
                <Button
                    color={"dodgerblue"}
                    text={'Chat'}
                    onClick={() => navigate('/chat')}
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

export default Dashboard