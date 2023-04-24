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
            <p>Welcome. Hope your project is on track?</p>
            </div>
            <div >
                <Button
                    color={"dodgerblue"}
                    text={'Go to the Admin page'}
                    onClick={() => navigate('/admin')}
                />
                <Button
                    color={"dodgerblue"}
                    text={'Go to the Editor page'}
                    onClick={() => navigate('/editor')}
                />
                <Button
                    color={"dodgerblue"}
                    text={'Create Project'}
                    onClick={() => navigate('/employees')}
                />
                <Button
                    color={"dodgerblue"}
                    text={'Go to the Lounge'}
                    onClick={() => navigate('/lounge')}
                />
                <Button
                    color={"dodgerblue"}
                    text={'Go to the Linkpage'}
                    onClick={() => navigate('/linkpage')}
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