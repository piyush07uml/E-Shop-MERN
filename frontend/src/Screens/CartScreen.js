import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Card, ListGroup, Button, Image, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addTocartAction, deleteCartAction } from '../actions/cartActions';
import Message from '../components/Message';
import HelmetComp from '../components/HelmetComp';


const CartScreen = () => {

    // const [qty, setQty] = useState(1)

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);

    const { cartItems } = cart



    const deleteCartHandler = (id) => {
        dispatch(deleteCartAction(id))
    }

    return (
        <>
            <HelmetComp title={`Cart`} description="Mask Shop" />
            {cartItems.length === 0 ? (
                <Message>You Cart Is Empty <Link to="/">Go Back</Link></Message>
            ) : (
                    <Row>
                        <Col md={9}>
                            <h2 className="py-3">Cart</h2>
                            <ListGroup variant="flush">
                                {cartItems.map((item) => {
                                    return <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Link to={`/productDetails/${item.product}`}>
                                                    <Image src={item.image} alt={item.name} fluid />
                                                </Link>

                                            </Col>

                                            <Col md={3}>
                                                <Link to={`/productDetails/${item.product}`}>
                                                    <h6>{item.name}</h6>
                                                </Link>
                                            </Col>

                                            <Col md={3}>
                                                <h6>{item.qty} X $ {item.price} = ${(item.qty * item.price).toFixed(2)}</h6>
                                            </Col>

                                            <Col md={2}>
                                                <Form>
                                                    <Form.Group controlId="updateCart">
                                                        <Form.Control
                                                            as="select"
                                                            label="qty"
                                                            onChange={e => dispatch(addTocartAction({ ...item, qty: Number(e.target.value) }))}
                                                        >
                                                            <option>Qty</option>
                                                            {[...Array(item.countInStock).keys()].map((x) => {
                                                                return <option value={x + 1} key={x + 1}>{x + 1}</option>
                                                            })}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Form>
                                            </Col>

                                            <Col md={2} className="text-center">
                                                <i className="far fa-trash-alt fa-2x" onClick={() => deleteCartHandler(item.product)}></i>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                })}

                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <h2 className="py-3">Cart Total</h2>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <h4>Total Items ({cartItems.length})</h4>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <h4>Total Quantity ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h4>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                <h4>Total:</h4>
                                            </Col>

                                            <Col>
                                                <h4> ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</h4>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Link to="/shippingAddress?redirect=shipping">
                                            <Button variant="primary" className="btn btn-block">Checkout</Button>
                                        </Link>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                )}
        </>
    )
}

export default CartScreen
