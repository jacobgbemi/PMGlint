import { Outlet, Link, useNavigate } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from './Button'
// import NavDropdown from 'react-bootstrap/NavDropdown';

const Layout = () => {
    const navigate = useNavigate();
    return (
        <Container>
            {/* Header Begins */}
            <Navbar bg="primary" expand="lg">
                <Navbar.Brand href="/linkpage">
                <img
                    alt=""
                    src="/logo3.jpg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
                PMGlint
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav >
                    <Nav.Link href="/linkpage">Home</Nav.Link>
                    <Nav.Link href="/">Dashboard</Nav.Link>
                    <Nav.Link href="/employees">Create Project</Nav.Link>
                    <Nav.Link href="/admin">Admin</Nav.Link>
                    <Nav.Link href="/editor">Project Editor</Nav.Link>
                    <Nav.Link href="/lounge">Chat</Nav.Link>
                 
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* Header End */}

            <main className="App">
            
                <Outlet />
            </main>

            {/* Footer Begins */}
            <footer>
                <p>Copyright &copy; 2021</p>
                <Button
                    color={"dodgerblue"}
                    text={'About Us'}
                    onClick={() => navigate('/about')}
                />
            </footer>
        </Container>
    )
}

export default Layout
