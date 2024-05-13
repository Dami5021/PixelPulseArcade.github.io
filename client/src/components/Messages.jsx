import {Alert, Button, Card, Container, Form, Modal, Row, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {serverRoot} from "../endpoints.js";
import {useAuth} from "../contexts/AuthContext.jsx";

export default function Messages(props) {
    const sampleMessages = [
        {
            senderUsername:"newusername",
            recipientUsername:"Gamer9000",
            message:"Hey! What's up? Why don't you get good? Love, NUN",
            timestamp:new Date().toISOString()
        }
    ]

    const { currentUser } = useAuth();
    const [messages, setMessages] = React.useState(sampleMessages);
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [showSendMessage, setShowSendMessage] = React.useState(false);
    const [expandMessage, setExpandMessage] = React.useState(false);
    const [recipient, setRecipient] = React.useState("");
    let rows = [];

    useEffect(() => {
        axios.get(serverRoot + 'user/' + currentUser.username)
            .then((response) => {
                setMessages(response.data);
            }).catch(error => {
            if (error.response){
                console.log("Error with response: " + error.response)
            } else if (error.request){
                console.log("Error with request: ")
                console.log(error.request)
            } else {
                console.log("Non-axios error")
            }
        })
    }, []);


    messages.sort((a, b) => b.timestamp - a.timestamp).forEach((message, idx) => {
        rows.push(
            <tr onClick={() => onExpandMessage(message)}>
                <td>{message.senderUsername}</td>
                <td>{message.message.slice(0, 30)}...</td>
                <td>{message.timestamp.slice(0, 10)}</td>
            </tr>
        )
    })

    function onExpandMessage(message){
        setCurrentMessage(message);
        setExpandMessage(true);
    }

    function onOpenSend(){
        setRecipient("");
        setShowSendMessage(true);
    }

    function onReply(){
        setExpandMessage(false);
        setRecipient(currentMessage.senderUsername);
        setShowSendMessage(true);
    }

    function ExpandMessage(){
        let message = currentMessage;
        if (message === null || message === undefined){
            message = {
                recipientUsername: "",
                senderUsername: "",
                message:"",
                timestamp:Date.now().toString(),
            }
        }
        //TODO: The date slice crashes initially
        return (
            <Modal show={expandMessage} onHide={() => setExpandMessage(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <p><b>From:</b> {message.senderUsername}</p>
                            {/*<p><b>Time:</b> {`${message.timestamp.slice(0, 10)},  ${message.timestamp.slice(11, -5)}`}</p>*/}
                        </Row>
                        <Row>
                            <p>{message.message}</p>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setExpandMessage(false)}>
                        Close
                    </Button>
                    <Button variant="success" onClick={onReply}>
                        Reply
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
    //TODO: Looks bad on mobile, reference ScoresTable?
    return (
        <Container className={'overflow-scroll h-100'}>
            <Card className={"my-5"}>
                <Card.Header as="h3">
                    Messages
                    <Button variant="success" className="float-end" onClick={onOpenSend}>
                        Send Message
                    </Button>
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Sender</th>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            <ExpandMessage
                show={expandMessage}
                onHide={() => setExpandMessage(false)}
                current_message={currentMessage}
            />
            <SendMessage
                show={showSendMessage}
                onHide={() => setShowSendMessage(false)}
                recipient={recipient}
                user={currentUser.username}
            />
        </Container>

    )
}

//TODO: SendMessage seems to be in an infinite loop when opened from 'reply'
function SendMessage({show, onHide, recipient, user}){
    const [error, setError] = React.useState("");
    const [inputs, setInputs] = useState({
        recipientUsername: recipient,
        senderUsername: user,
        message:""
    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const onSend = (e) => {
        setError("");
        e.preventDefault();
        console.log(inputs);
        axios.post(serverRoot + 'send', {inputs})
            .then((response) => {
                console.log(response.data)
                alert("Success!");
                onHide(false);
            })
            .catch(error =>
                {
                    setError('Failed to send message!');
                    if (error.response) {
                        console.log("Error with response: " + error.response)
                    } else if (error.request) {
                        console.log("Error with request: ")
                        console.log(error.request)
                    } else {
                        console.log("Non-axios error")
                    }
                }
            )
    }
    return (

            <Modal show={show} onHide={onHide}>
                <Form onSubmit={onSend}>
                <Modal.Header closeButton>
                    <Modal.Title>Send Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Row className={'mb-3'}>
                        <Form.Group controlID={'RecipientUsername'}>
                            <Form.Label>Recipient Username</Form.Label>
                            <Form.Control name='recipientUsername' placeholder={'username...'} defaultValue={recipient} onChange={handleChange}/>
                        </Form.Group>
                    </Row>
                    <Row className={'mb-3'}>
                        <Form.Group controlID={'Message'}>
                            <Form.Label>Message</Form.Label>
                            <Form.Control as={'textarea'} name='message' rows={'3'} placeholder={'message...'} onChange={handleChange}/>
                        </Form.Group>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                    <Button variant='success' type='submit'>Send</Button>
                </Modal.Footer>
                </Form>
            </Modal>

        )
}


