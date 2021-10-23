import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { userDetailsAdminAction, userUpdateAdminAction } from '../actions/userActions';
import { USER_ADMIN_DETAILS_RESET, USER_ADMIN_UPDATE_RESET } from '../constants/userConstants';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import HelmetComp from '../components/HelmetComp';

const UserUpdateAdminScreen = ({ match, history, location }) => {

    const userId = match.params.id

    const page = location.search ? location.search.split("=")[1] : 1

    const dispatch = useDispatch();

    const login = useSelector(state => state.login);
    const { userInfo } = login

    const userDetailsAdmin = useSelector(state => state.userDetailsAdmin);

    const { loading, user, error } = userDetailsAdmin;

    const userUpdateAdmin = useSelector(state => state.userUpdateAdmin)

    const { loading: loadingUpdate, success, error: errorUpdate } = userUpdateAdmin


    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isAdmin, setIsAdmin] = useState("")
    const [message, setMessage] = useState("");



    useEffect(() => {

        return () => {
            dispatch({
                type: USER_ADMIN_DETAILS_RESET
            })
        }

    }, [])


    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push("/login")
        } else {


            if (!user || !user.name) {
                dispatch(userDetailsAdminAction(userId))
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin)
            }

            if (success) {
                dispatch({
                    type: USER_ADMIN_UPDATE_RESET
                })

                history.push(`/admin/users/${page}`)
            }


        }
    }, [dispatch, history, userInfo, user, success])


    const updateUserAdminHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {

            setMessage("Passwords Do Not Match")

        } else {

            dispatch(userUpdateAdminAction({
                _id: userId,
                name,
                email,
                password,
                isAdmin
            }))

            setMessage("")
        }
    }



    return (
        <>
            <HelmetComp title={`${user.name}`} description="Mask Shop" />
            <Link to={`/admin/users/1`}>
                <Button type="button" variant="light">Back</Button>
            </Link>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <FormContainer>

                    <h2 className="my-3">Update User</h2>

                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                    {message && <Message variant="danger">{message}</Message>}

                    <Form onSubmit={updateUserAdminHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>

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

                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicCheckbox" className="ml-3">
                            <Form.Check type="checkbox" label="Is Admin"
                                checked={isAdmin}
                                onChange={e => setIsAdmin(e.target.checked)}
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary">Update</Button>



                    </Form>
                </FormContainer>
            )}

        </>
    )
}

export default UserUpdateAdminScreen
