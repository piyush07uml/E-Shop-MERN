import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '../actions/userActions';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import HelmetComp from '../components/HelmetComp';

const LoginScreen = ({ history }) => {

    const dispatch = useDispatch();
    const login = useSelector(state => state.login);

    const { loading, userInfo, error } = login

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    useEffect(() => {
        if (userInfo) {
            history.push("/");
        }
    }, [userInfo])

    const loginHandler = (e) => {
        e.preventDefault();

        dispatch(loginAction({ email, password }))
    }


    return (

        <FormContainer>
            <HelmetComp title={`Log In`} description="Mask Shop" />
            <h2 className="my-3">Sign In</h2>
            {loading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={loginHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" variant="primary" >
                    Log In
                </Button>
            </Form>
            <p className="py-3">New User ? <Link to="/register">Register Here</Link></p>
        </FormContainer>

    )
}

export default LoginScreen
