import { useState, useEffect } from "react";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import axios from "../api/axios";
import { format } from 'date-fns';
// import dateFormat from 'dateformat';
import { useNavigate, useLocation } from "react-router-dom";
import Button from './Button'
import Table from 'react-bootstrap/Table';

const EditProject = ({ id }) => {
    const [project1, setProject] = useState();
    // const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getProject = async (id) => {
            try {
                const response = await axios.get(`/projects/${id}`, {
                    signal: controller.signal
                });
                console.log(response.data);
                isMounted && setProject(response.data);
            } catch (err) {
                console.error(err);
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getProject();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Projects List</h2>
            {project1?.length
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
                            {project1.map((project, i) => (
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
                                            text={'Update'}
                                            
                                        />
                                    </td>
                                    <td>
                                        <Button
                                            color={"red"}
                                            text={'Delete'}
                                            
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) 
                : <p>No project to display</p>
            }
            <Button
                color={"dodgerblue"}
                text={'Go back'}
                onClick={() => navigate(-1)}
            />
        </article>
    );
};

export default EditProject;