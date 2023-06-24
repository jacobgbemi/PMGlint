import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Chat from './components/Chat';
import Home from './components/Home';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { Routes, Route } from 'react-router-dom';
import GetProjects from './components/GetProjects';
import EditProject from './components/EditProject';
import Users from './components/Users';
// import useAxiosPrivate from "./hooks/useAxiosPrivate";
// import { useNavigate } from "react-router-dom";
// import { useState } from 'react';
import EditUser from './components/EditUser';


const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  // const axiosPrivate = useAxiosPrivate();
  // const navigate = useNavigate();
  // const [users, setUsers] = useState([]);

  

  return (
    <>
      <Routes>
        
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          
          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="projects" element={<GetProjects />} />
              <Route path="chat" element={<Chat />} />
            </Route>
           
            <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
              <Route path="editor" element={<Editor />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
              <Route path="users">
                <Route index element={<Users />} />
                <Route path=":id" element={<EditUser />} />
              </Route>
             
            </Route>
          </Route> {/* End Persistent Login */}

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;