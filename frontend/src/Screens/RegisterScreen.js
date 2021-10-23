import React, { useState, useEffect } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { userRegisterAction } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import HelmetComp from '../components/HelmetComp';




const RegisterScreen = ({ history }) => {

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);

    const login = useSelector(state => state.login)
    const { userInfo } = login

    const { loading, success, error } = userRegister;

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")



    useEffect(() => {
        if (userInfo) {
            history.push("/")
        }
    }, [userInfo])


    const registerHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords Do Not Match")
        } else {
            setMessage('');

            dispatch(userRegisterAction({
                name,
                email,
                password
            }))
        }

    }

    return (
        <FormContainer>
            <HelmetComp title={`Sign Up`} description="Mask Shop" />

            <h2 className="my-3">Sign Up</h2>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {message && <Message variant="danger">{message}</Message>}
            <Form onSubmit={registerHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="confirmpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" variant="primary">Register</Button>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
