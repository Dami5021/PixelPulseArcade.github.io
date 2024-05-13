import {Nav, Navbar, Offcanvas} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {useAuth} from "../contexts/AuthContext.jsx";

//TODO: Get the title to be centered regardless of toggle button
//TODO: Fix bug where offcanvas resets dark mode
//TODO: Private, public navbar
export default function TopBar(){
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const { currentUser, logoutUser } = useAuth();


    function handleLogout() {
        logoutUser();
        navigate('/login');
    }

    return  (
        <Navbar sticky={"top"} bg={"success"} data-bs-theme={'dark'} className={'text-light'} expand={false}>
            <Nav className={"mx-auto align-middle"} >
                <Link to={"/"} className="h1 mb-0 link-underline link-underline-opacity-0">PixelPulse Arcade</Link>
            </Nav>
            <p className={'mb-0 d-none d-md-block'}>{currentUser.username}</p>
            <div className={'mx-3'}>
                <Navbar.Toggle aria-controls={"offcanvasNavbar-expand-false"}/>
                <Navbar.Offcanvas placement={'end'} >
                    <Offcanvas.Header className={''} closeButton>
                        <Offcanvas.Title>Menu --- {currentUser.username}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className={"link-underline link-underline-opacity-0"}>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
                         <Nav.Link onClick={() => navigate('/messages')}>Messages</Nav.Link>
                         <Nav.Link onClick={() => navigate('/settings')}>Settings</Nav.Link>
                         <Nav.Link onClick={() => navigate('/highscores')}>High Scores</Nav.Link>
                         <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </div>
        </Navbar>
    )
}

function NavbarLoggedOut(){
    return (
        <Navbar sticky={"top"} bg={"success"} data-bs-theme={'dark'} className={'text-light'} expand={false}>
            <Nav className={"mx-auto align-middle"} >
                <Link to={"/login"} className="h1 mb-0 link-underline link-underline-opacity-0">PixelPulse Arcade</Link>
            </Nav>
        </Navbar>
    )
}