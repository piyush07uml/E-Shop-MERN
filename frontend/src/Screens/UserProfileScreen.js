import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { updateUserAction } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { ORDER_USER_RESET } from '../constants/orderConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { userOrdersAction } from '../actions/orderActions';
import Paginate from '../components/Paginate';
import HelmetComp from '../components/HelmetComp';

const UserProfileScreen = ({ history, match }) => {

    const login = useSelector(state => state.login)
    const { userInfo } = login

    const page = match.params.page


    const [name, setName] = useState(userInfo ? userInfo.name : "");
    const [email, setEmail] = useState(userInfo ? userInfo.email : "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const updateUser = useSelector(state => state.updateUser);
    const { loading, success, error } = updateUser

    const userOrders = useSelector(state => state.userOrders)
    const { loading: loadingOrders, orders, pages, pageNumber, error: errorOrders } = userOrders


    useEffect(() => {
        return () => {
            dispatch({
                type: ORDER_USER_RESET
            })
        }
    }, [])

    useEffect(() => {
        dispatch(userOrdersAction(page))
    }, [page])

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {

            if (orders.length === 0) {
                dispatch(userOrdersAction(page))
            }
        }
    }, [dispatch, history, userInfo, success, orders, page])




    const updateUserHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords Do Not Match")
        } else {
            dispatch(updateUserAction({
                name, email, password
            }))
            setMessage("")
        }

    }

    return (
        <>
            <HelmetComp title={`Profile || User`} description="Mask Shop" />
            <Row>
                <Col md={3}>
                    <h2 className="my-3">Update Profile</h2>
                    {message && <Message variant="danger">{message}</Message>}
                    {error && <Message variant="danger">{error}</Message>}
                    {loading && <Loader />}
                    <Form onSubmit={updateUserHandler} className="mr-3">
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

                        <Form.Group controlId="confirmpassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary">Update</Button>
                    </Form>
                </Col>

                <Col md={9}>
                    <h2 className="my-3 text-center">Orders</h2>
                    {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
                        <>
                            <Table hover bordered responsive className="table-sm text-center">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>Name</th>
                                        <th>PAID BY</th>
                                        <th>DELIVERY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => {
                                        return <tr key={order._id}>
                                            <td><Link to={`/orderDetails/${order._id}`}>{order._id}</Link></td>
                                            <td>{order.createdAt.substring(0, 10)}</td>
                                            <td>{order.user.name}</td>
                                            <td><i class="fab fa-cc-paypal fa-2x" style={{ color: '#348ceb' }}></i></td>
                                            <td>{order.isDelivered ? `Delivered` : 'Not Delivered'}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                            <Paginate pageNumber={pageNumber} pages={pages} userOrders={true} />
                        </>
                    )}
                </Col>

            </Row>
        </>
    )
}

export default UserProfileScreen
