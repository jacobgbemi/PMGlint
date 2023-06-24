import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import useLogout from "../hooks/useLogout";
import Button from './Button'
import AddProject from "./AddProject";

const Editor = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const [isCreatingProject, setIsCreatingProject] = useState(false);

    const handleCreateProject = () => {
        setIsCreatingProject(true);
        // window.open('/add-project', '_blank');
    };

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
                onClick={() => navigate('/projects')}
            />
            <Button
                color={"dodgerblue"}
                text={'Create Project'}
                onClick={handleCreateProject}
            />
            {isCreatingProject && <AddProject />}
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
