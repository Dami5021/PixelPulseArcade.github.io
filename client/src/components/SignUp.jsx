import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import {Link, useNavigate} from "react-router-dom"
// import CreateUser from "./CreateUser";

export default function SignUp() {
    const emailRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current !== passwordConfirmRef.current) {
            return setError("Passwords do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(
                usernameRef.current,
                usernameRef.current,
                emailRef.current,
                passwordRef.current
            )
            navigate('/')
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    return (
        <>
            <Card className={'w-75 mx-auto mt-5'}>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="name">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="name" ref={usernameRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required/>
                        </Form.Group>
                        <Button variant={'success'} disabled={loading} className="w-100 my-3" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Log In</Link>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}