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
            <Navbar bg="black" expand="lg" fixed="top" id="navbar">
                <Navbar.Brand href="home">
                <img
                    alt=""
                    src="/logo3.jpg"
                    width="40"
                    height="40"
                    className="d-inline-block align-top"
                />{' '}
                <span className="navlink">PMGlint</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" id="nav-collapse"/>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav >
                    <Nav.Link href="/home" className="navlink">Home</Nav.Link>
                    <Nav.Link href="/" className="navlink">Dashboard</Nav.Link>
                    {/* <Nav.Link href="/projects/post" className="navlink">Create Project</Nav.Link> */}
                    <Nav.Link href="/projects/get" className="navlink">View Project</Nav.Link>
                    <Nav.Link href="/admin" className="navlink">Admin</Nav.Link>
                    <Nav.Link href="/editor" className="navlink">Project Editor</Nav.Link>
                    <Nav.Link href="/chat" className="navlink">Chat</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* Header End */}

            <main className="App">
            
                <Outlet />
            </main>

            {/* Footer Begins */}
            <footer>
                <p>PMGlint &copy; 2023</p>
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
