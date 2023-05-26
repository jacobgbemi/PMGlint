import React, { useState } from 'react';
// import axios from '../api/axios';

import useAxiosPrivate from "./useAxiosPrivate";

const useDelete = async (_id) => {
    const [projects, setProjects] = useState();
    const  axiosPrivate  = useAxiosPrivate();
    const deleteUser = async () => {
        try {
            const response = await axiosPrivate.delete(`projects/${_id}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            response.status === 200
            ? setProjects(projects.filter((project) => project._id !== _id))
            : alert('Error Deleting This Project')
        }
        catch (err) {
            console.error(err);
        }
    }
    return deleteUser;
};

export default useDelete;