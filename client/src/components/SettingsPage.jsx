import {Button, Container, Row, Card, Form, Col, Modal, Alert} from "react-bootstrap";
import React, {useRef, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";

//TODO: add actual game settings
//TODO: use context for db calls
export default function SettingsPage(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const passwordDeleteRef = useRef()
    const { deleteUser, logout, currentUser, updateEmail, updatePassword } = useAuth();
    const [errorDelete, setErrorDelete] = useState("")
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPass, setErrorPass] = useState("")
    const [errorLogout, setErrorLogout] = useState("")
    const navigate = useNavigate()
    async function handleLogout() {
        setErrorLogout("")

        try {
            await logout()
            navigate('/login')
        } catch {
            setErrorLogout("Failed to log out")
        }
    }
    async function handleDeleteUser(e) {
        if (passwordRef.current !== currentUser.password) {
            return setErrorDelete("Wrong password!")
        }
        e.preventDefault()
        setErrorDelete("")

        try {
            await logout()
        } catch {
            setErrorDelete("Failed to log out")
        }
        try {
            await deleteUser()
            navigate('/login')
        } catch {
            setErrorDelete("Failed to delete user")
        }
    }
    async function handleUpdatePassword(e){
        e.preventDefault()

        if (passwordRef.current !== passwordConfirmRef.current) {
            return setErrorPass("Passwords do not match")
        }

        try {
            setErrorPass("")
            await updatePassword(
                passwordRef.current
            )
        } catch {
            setErrorPass("Failed to update password")
        }
    }
    async function handleUpdateEmail(e){
        e.preventDefault()

        try {
            setErrorEmail("")
            await updatePassword(
                emailRef.current
            )
        } catch {
            setErrorEmail("Failed to update email")
        }
    }
    const [showAreYouSure, setShowAreYouSure] = useState(false)
    function openAreYouSure() {
        setShowAreYouSure(true)
    }
    const [isDark, setIsDark] = useState(dark)
    function onSwitchMode(){
        let html = document.documentElement
        if (isDark){
            html.setAttribute('data-bs-theme', 'light')
            setIsDark(false)
        }
        else {
            html.setAttribute('data-bs-theme', 'dark')
            setIsDark(true)
        }
    }

    function dark(){
        let html = document.documentElement
        return html.getAttribute('data-bs-theme') === 'dark';
    }
    function AreYouSure({showAreYouSure, onClose}) {
        return(
            <Modal show={showAreYouSure} onHide={onClose} >
                <Modal.Header closeButton>
                    <Modal.Title>Are You Sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorDelete && <Alert variant="danger">{errorDelete}</Alert>}
                    <p>This will PERMANENTLY delete your account!</p>
                    <p>If you are sure, enter your password.</p>
                    <Form onSubmit={handleDeleteUser}>
                        <Form.Control type="password" ref={passwordDeleteRef} className="mb-3"/>
                        <Button type="submit" variant="danger">DELETE ACCOUNT</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return(
        <Container >
            <Card className={"my-5"}>
                <Card.Header as={'h3'} >
                    Settings
                    <Link to={'/'}>
                        <Button variant="outline-success" className="float-end">Back</Button>
                    </Link>
                </Card.Header>
                <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
                    <Card.Header as="h5">Global Game Settings</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="fullscreen">
                                <Form.Check type="switch" label="Launch games in fullscreen" />
                            </Form.Group>
                        </Form>
                        <Form.Check type={"switch"} label={"Do not appear on high score board"} />
                    </Card.Body>
                    <Card.Header as="h5">Account Settings</Card.Header>
                    <Card.Body>
                        <Form.Check
                            id="modeSwitch"
                            type="switch"
                            label="Dark mode"
                            className="mb-3"
                            checked={isDark}
                            onChange={() => onSwitchMode()}
                        />
                        <Form onSubmit={handleUpdateEmail}>
                            <Row className="align-items-end mb-4">
                                {errorEmail && <Alert variant="danger">{errorEmail}</Alert>}
                                <Form.Group as={Col} controlId="updateEmail" className="col-7 col-sm-6">
                                    <Form.Label>Update email</Form.Label>
                                    <Form.Control type="email" defaultValue="gamer@gamer.com" ref={emailRef} />
                                </Form.Group>
                                <Col>
                                    <Button variant="secondary" type="submit">Update</Button>
                                </Col>
                            </Row>
                        </Form>
                        <Form onSubmit={handleUpdatePassword}>
                            <Row className="mb-3">
                                {errorPass && <Alert variant="danger">{errorPass}</Alert>}
                                <Form.Group as={Col} controlId="updatePassword">
                                    <Form.Label>Update password</Form.Label>
                                    <Form.Control type="password" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="updatePasswordConfirm">
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control type="password" />
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Col>
                                    <Button variant="secondary" type="submit" className="">Update Password</Button>
                                </Col>
                            </Row>
                        </Form>
                        <Row className="my-5">
                            <Col>
                                <Button variant="danger" onClick={() => openAreYouSure()}>Delete Account</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </div>
                <Card.Footer>
                    {errorLogout && <Alert variant="danger">{errorLogout}</Alert>}
                    <Button variant="success" onClick={handleLogout}>Logout</Button>
                </Card.Footer>
            </Card>
            <AreYouSure showAreYouSure={showAreYouSure} onClose={() => setShowAreYouSure(false)} />
        </Container>
    )
}