// import React, { useState } from 'react';
// import axios from 'axios';
// import useAuth from "./useAuth";
import axiosPrivate from "./useAxiosPrivate";

const useDelete = ( id ) => {
    // const { setAuth } = useAuth();
    const axiosPrivate = axiosPrivate();

    const deleteUser = async () => {
        try {
            const response = await axiosPrivate.delete(`users/${id}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
        } catch (err) {
            console.error(err);
        }
    }
    return deleteUser
    
//   const [isDeleting, setIsDeleting] = useState(false);
  
//   const handleDeleteUser = async () => {
//     setIsDeleting(true);
    
//     try {
//       const response = await axios.delete(`/users/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${authToken}`
//           }
//         }
//       );
//       console.log(response.data);
//       // handle success case, e.g. display a success message to the user
//     } catch (error) {
//       console.error(error);
//       // handle error case, e.g. display an error message to the user
//     } finally {
//       setIsDeleting(false);
//     }
//   };
  
//   return (
//     <button
//       disabled={isDeleting}
//       onClick={handleDeleteUser}
//     >
//       {isDeleting ? 'Deleting...' : 'Delete User'}
//     </button>
//   );
};

export default useDelete;