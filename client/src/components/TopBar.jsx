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
    const [showOC, setShowOC] = useState(false);

    function handleLogout() {
        setShowOC(false);
        logoutUser();
        navigate('/login');
    }
    function handleClick(url){
        setShowOC(false);
        navigate(url);
    }

    return  currentUser.id !== 0? (
        <Navbar collapseOnSelect={true} sticky={"top"} bg={"success"} data-bs-theme={'dark'} className={'text-light'} expand={false}>
            <Nav className={"mx-auto align-middle"} >
                <Link to={"/"} className="h1 mb-0 link-underline link-underline-opacity-0">PixelPulse Arcade</Link>
            </Nav>
            <p className={'mb-0 d-none d-md-block'}>{currentUser.username}</p>
            <div className={'mx-3'}>
                <Navbar.Toggle aria-controls={"offcanvasNavbar-expand-false"} onClick={() => setShowOC(true)}/>
                <Navbar.Offcanvas placement={'end'} show={showOC} onHide={() => setShowOC(false)}>
                    <Offcanvas.Header className={''} closeButton>
                        <Offcanvas.Title>Menu --- {currentUser.username}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className={"link-underline link-underline-opacity-0"}>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link onClick={() => handleClick('/')}>Home</Nav.Link>
                         <Nav.Link onClick={() => handleClick('/messages')} >Messages</Nav.Link>
                         <Nav.Link onClick={() => handleClick('/settings')}>Settings</Nav.Link>
                         <Nav.Link onClick={() => handleClick('/highscores')}>High Scores</Nav.Link>
                         <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </div>
        </Navbar>
    ) : <NavbarLoggedOut />
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