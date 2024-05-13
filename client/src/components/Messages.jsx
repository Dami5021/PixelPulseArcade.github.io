import ScoresTable from "./ScoresTable.jsx";
import {Alert, Button, Card, Container, Form, Modal, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {serverRoot} from "../endpoints.js";

export default function Messages(props) {
    const sampleMessages = [
        {
            senderUsername:"newusername",
            recipientUsername:"Gamer9000",
            message:"laksdflkasdflkasdflk",
            timestamp:new Date().toISOString()
        }
    ]

    const [messages, setMessages] = React.useState(sampleMessages);
    const [currentMessage, setCurrentMessage] = React.useState("");
    const [showSendMessage, setShowSendMessage] = React.useState(false);
    const [expandMessage, setExpandMessage] = React.useState(false);
    const [recipient, setRecipient] = React.useState("");
    let rows = [];

    useEffect(() => {
        axios.get(serverRoot + 'user/' + props.user)
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
            <tr onClick={() => onExpandMessage(message, onOpenSend)}>
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

    function onOpenSend(recipient, notReply){
        let preRecipient = recipient;
        if (notReply){
            preRecipient = "";
        }
        setRecipient(preRecipient);
        setShowSendMessage(true);
    }

    return (
        <Container className={'overflow-scroll h-100'}>
            <Card className={"my-5"}>
                <Card.Header as="h3">
                    Messages
                    <Button variant="success" className="float-end" onClick={() => onOpenSend(recipient, true)}>
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
                onOpenSend={() => onOpenSend}
            />
            <SendMessage show={showSendMessage} onHide={() => setShowSendMessage(false)} recipient={recipient}/>
        </Container>

    )
}

function ExpandMessage({show, onHide, current_message, onOpenSend}){
    let message = current_message
    if (message === null || message === undefined){
        message = {
            recipientUsername: "",
            senderUsername: "",
            message:"",
            timestamp:Date.now().toString(),
        }
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <p>From: {message.senderUsername}</p>
                        {/*<p>Time: {`${message.timestamp.slice(0, 10)},  ${message.timestamp.slice(11, -5)}`}</p>*/}
                    </Row>
                    <Row>
                        <p>{message.message}</p>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="success" onClick={onOpenSend(message.senderUsername, false)}>
                    Reply
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

function SendMessage({show, onHide, recipient, user}){
    const [error, setError] = React.useState("");
    const [inputs, setInputs] = useState({
        recipientUsername: recipient,
        senderUsername: user,
        message:"",
        timestamp:Date.now().toString(),
    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const onSend = (e) => {
        e.preventDefault();
        axios.post(serverRoot + 'send/', {inputs})
            .then((response) => {
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
        <Form onSubmit={onSend}>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>Send Message</Modal.Header>
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
            </Modal>
        </Form>

        )

}


