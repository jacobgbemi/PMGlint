import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
// import { Link } from "react-router-dom";


const REGISTER_URL = '/employees';

const AddProject = () => {
    const projRef = useRef();
    const errRef = useRef();

    const [title, setTitle] = useState('');
    const [titleFocus, setTitleFocus] = useState(false);

    const [manager, setManager] = useState('');
    const [managerFocus, setManagerFocus] = useState(false);

    const [planStart, setPlanStart] = useState('');

    const [planEnd, setPlanEnd] = useState('');

    // const [actualStart, setActualStart] = useState('');

    // const [actualEnd, setActualEnd] = useState('');

    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        projRef.current.focus();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
     
        try {
            const response = await axios.post(REGISTER_URL,
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
            // setActualStart('');
            // setActualEnd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Project name taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section >
                    <h1>Success!</h1>
                    <p>
                        <a href="/admin">Create Project</a>
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
                            ref={projRef}
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
                            // onFocus={() => setPlanStartFocus(true)}
                            // onBlur={() => setPlanStartFocus(false)}
                        />

                        <label htmlFor="planend"> Planned End Date: </label>
                        <input
                            type="date"
                            id="planend"
                            onChange={(e) => setPlanEnd(e.target.value)}
                            value={planEnd}
                            required
                            // onFocus={() => setPlanEndFocus(true)}
                            // onBlur={() => setPlanEndFocus(false)}
                        />

                        {/* <label htmlFor="actualstart"> Actual Start Date: </label>
                        <input
                            type="date"
                            id="actualstart"
                            onChange={(e) => setActualStart(e.target.value)}
                            value={actualStart}
                            required
                            // onFocus={() => setActualStartFocus(true)}
                            // onBlur={() => setActualStartFocus(false)}
                        />

                        <label htmlFor="actualend"> Planned End Date: </label>
                        <input
                            type="date"
                            id="actualend"
                            onChange={(e) => setActualEnd(e.target.value)}
                            value={actualEnd}
                            required
                            // onFocus={() => setActualEndFocus(true)}
                            // onBlur={() => setActualEndFocus(false)}
                        /> */}

                        <button >Create Project</button>
                    </form>
                </section>
            )}
        </>
    )
}

export default AddProject
