import { Button, Container, Row, Card, Form, Col, Modal } from "react-bootstrap";
import { useState } from "react";
import {Link} from "react-router-dom";

//TODO: add actual game settings
//TODO: use context for db calls
export default function SettingsPage(){
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
                    <p>This will PERMANENTLY delete your account!</p>
                    <p>If you are sure, enter your password.</p>
                    <Form>
                        <Form.Control type="password" className="mb-3"/>
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
                        <Form>
                            <Row className="align-items-end mb-4">
                                <Form.Group as={Col} controlId="updateEmail" className="col-7 col-sm-6">
                                    <Form.Label>Update email</Form.Label>
                                    <Form.Control type="email" defaultValue="gamer@gamer.com" />
                                </Form.Group>
                                <Col>
                                    <Button variant="secondary" type="submit">Update</Button>
                                </Col>
                            </Row>
                        </Form>
                        <Form>
                            <Row className="mb-3">
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
                    <Link to={'/login'}>
                        <Button variant="success">Logout</Button>
                    </Link>
                </Card.Footer>
            </Card>
            <AreYouSure showAreYouSure={showAreYouSure} onClose={() => setShowAreYouSure(false)} />
        </Container>
    )
}