import {Nav, Navbar, Offcanvas} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";
import {useState} from "react";

//TODO: Get the title to be centered regardless of toggle button
//TODO: Fix bug where offcanvas resets dark mode
export default function TopBar({user, setUser}){
    const { logout, currentUser } = useAuth()
    const [currentUName, setCurrentUName] = useState("");
    const navigate = useNavigate()
    const [error, setError] = useState("")

    if (currentUser != null)
        setCurrentUName(currentUser.username)

    function handleLogout() {
        setUser(null);

        navigate('/login');
    }

    return  (
        <Navbar sticky={"top"} bg={"success"} data-bs-theme={'dark'} className={'text-light'} expand={false}>
            <Nav className={"mx-auto align-middle"} >
                <Link to={"/"} className="h1 mb-0 link-underline link-underline-opacity-0">PixelPulse Arcade</Link>
            </Nav>
            <p></p>
            <div className={'mx-3'}>
                <Navbar.Toggle aria-controls={"offcanvasNavbar-expand-false"}/>
                <Navbar.Offcanvas placement={'end'} >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className={"link-underline link-underline-opacity-0"}>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href={'/'}>Home</Nav.Link>
                            <Nav.Link href={'/messages'}>Messages</Nav.Link>
                            <Nav.Link href={'/settings'}>Settings</Nav.Link>
                            <Nav.Link href={'/highscores'}>High Scores</Nav.Link>
                            <Nav.Link href={'/login'}>Log Out</Nav.Link>
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