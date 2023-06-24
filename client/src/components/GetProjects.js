import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { format } from 'date-fns';
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Button from './Button'
import Table from 'react-bootstrap/Table';
// import useDelete from "../hooks/useDelete"

const Projects = () => {
    const [projects, setProjects] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    // const { id } = useParams();

    // const handleDeleteProject = async (id) => {
    //   try {
    //       const projects = await axiosPrivate.delete('/projects');
    //       const project = projects.filter((project) => project.id !== id);
    //       setProjects(project);
    //       navigate('/');
    //   } catch (err) {
    //       console.log(`Error: ${err.message}`);
    //   }
    // }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProjects = async () => {
            try {
                const response = await axiosPrivate.get('/projects', {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setProjects(response.data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getProjects();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate, location, navigate, setProjects])

    return (
        <article>
            <h2>Projects List</h2>
            {projects?.length
                ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                {/* <th>ID</th> */}
                                <th>Title</th>
                                <th>Manager</th>
                                <th>Plan Start</th>
                                <th>Actual Start</th>
                                <th>Actual End</th>
                                <th>Actual End</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project, i) => (
                                <tr key={i}>
                                    {/* <td>{project._id}</td> */}
                                    <td>{project.title}</td>
                                    <td>{project.manager}</td>
                                    {/* <td>{project.planStart}</td>
                                    <td>{project.actualStart}</td>
                                    <td>{project.planEnd}</td>
                                    <td>{project.actualEnd}</td> */}
                                    <td>{format(new Date(project.planStart), 'dd/MMM/yy')}</td>
                                    <td>{format(new Date(project.actualStart), 'dd/MMM/yy')}</td>
                                    <td>{format(new Date(project.planEnd), 'dd/MMM/yy')}</td>
                                    <td>{format(new Date(project.actualEnd), 'dd/MMM/yy')}</td>
                                    <td>
                                        <Button
                                            color={"grey"}
                                            text={'Open'}
                                            // onClick={() => navigate(`/projects/${project._id}`)}
                                            
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            color={"red"}
                                            text={'Delete'}
                                            // onClick={handleDeleteProject(project._id)}
                                            
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) 
                : <p>No projects to display</p>
            }
            <Button
                color={"dodgerblue"}
                text={'Go back'}
                onClick={() => navigate(-1)}
            />
        </article>
    );
};

export default Projects;