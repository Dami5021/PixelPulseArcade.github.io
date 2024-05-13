import React, { useRef, useState } from "react"
import {Form, Button, Card, Alert, Container} from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import {Link, useNavigate} from "react-router-dom"
import axios from 'axios'
import {serverRoot} from "../endpoints.js";

export default function Login({setUser}) {
    const { loginUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const [email, setEmail] = useState()
    const [password, setPassword] = useState()


    // const history = useHistory()

    // async function handleSubmit(e) {
    //     e.preventDefault()
    //     console.log(emailRef.current)
    //     console.log(passwordRef.current)
    //     try {

    //         setError("")
    //         setLoading(true)
    //         let loggedIn = await login(emailRef.current, passwordRef.current)
    //         navigate('/')
    //     } catch {
    //         setError("Failed to log in")
    //     }
    //     setLoading(false)
    // }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post(serverRoot + "login",{email, password})
        .then(result => { console.log(result)
            if(result.data === "wrong password"){
                setError('Wrong password!');
            }else if(result.data === "no user"){
                setError('No user found!');
            } else {
                loginUser(result.data);
                navigate('/');
            }
        })
        .catch(err=> console.log(err))
    }

    return (
        <Container>
            <Card className={'w-75 mx-auto mt-5'}>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" onChange={handleEmail} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={handlePassword} required/>
                        </Form.Group>
                        <Button variant={'success'} disabled={loading} className="w-100 my-3" type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}