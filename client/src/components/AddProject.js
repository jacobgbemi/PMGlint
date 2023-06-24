import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Button from "./Button";
import useLogout from "../hooks/useLogout";


const PROJECT_URL = '/projects';

const AddProject = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const projRef = useRef();
    const managerRef = useRef();
    const errRef = useRef();

    const [title, setTitle] = useState('');
    const [titleFocus, setTitleFocus] = useState(false);

    const [manager, setManager] = useState('');
    const [managerFocus, setManagerFocus] = useState(false);

    const [planStart, setPlanStart] = useState('');
    const [planEnd, setPlanEnd] = useState('');

    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        projRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
     
        try {
            const response = await axiosPrivate.post(PROJECT_URL,
                JSON.stringify({ title, manager, planStart, planEnd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
           
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
            setSuccess(true);

            //clear state and controlled inputs
            setTitle('');
            setManager('');
            setPlanStart('');
            setPlanEnd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.response?.status === 403) {
                setErrMsg('Forbidden');
            } else if (err.response?.status === 409) {
                setErrMsg('Project name taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/home'); 
    }

    return (
        <>
            {success ? (
                <section >
                    <h1>Success!</h1>
                    <p>
                        <a href="/projects/post">Create Another Project</a>
                    </p>
                    <p>
                        <a href="/projects/get">View Projects</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h3>Create Project</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title"> Title: </label>
                        <input
                            type="text"
                            id="title"
                            ref={projRef}
                            autoComplete="off"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            required
                            onFocus={() => setTitleFocus(true)}
                            onBlur={() => setTitleFocus(false)}
                        />
                        <p id="uidnote" className={titleFocus && title ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must not be empty
                        </p>

                        <label htmlFor="manager"> Manager: </label>
                        <input
                            type="text"
                            id="manager"
                            ref={managerRef}
                            autoComplete="off"
                            onChange={(e) => setManager(e.target.value)}
                            value={manager}
                            required
                            onFocus={() => setManagerFocus(true)}
                            onBlur={() => setManagerFocus(false)}
                        />
                        <p id="uidnote" className={managerFocus && manager ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must not be empty
                        </p>
                        
                        <label htmlFor="planstart"> Planned Start Date: </label>
                        <input
                            type="date"
                            id="planstart"
                            onChange={(e) => setPlanStart(e.target.value)}
                            value={planStart}
                            required
                        />

                        <label htmlFor="planend"> Planned End Date: </label>
                        <input
                            type="date"
                            id="planend"
                            onChange={(e) => setPlanEnd(e.target.value)}
                            value={planEnd}
                            required
                        />


                        <button className="btn btn-primary">Create Project</button>
                    </form>
                 
                </section>
            )}
        </>
    )
}

export default AddProject
