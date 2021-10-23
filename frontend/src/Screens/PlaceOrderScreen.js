import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createOrderAction } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2'
import Loader from '../components/Loader';
import Message from '../components/Message';
import HelmetComp from '../components/HelmetComp';
import CheckoutComp from '../components/CheckoutComp';



const PlaceOrderScreen = ({ history, location }) => {


    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const login = useSelector(state => state.login)
    const { userInfo } = login;

    const userAddress = useSelector(state => state.userAddress)
    const { shippingAddress } = userAddress;

    const payment = useSelector(state => state.payment);
    const { paymentMethod } = payment;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart

    const createOrder = useSelector(state => state.createOrder)

    const { loading, order, success, error } = createOrder

    const redirect = location.search ? location.search.split("=")[1] : null

    cartItems.itemsPrice = Number(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)).toFixed(2);
    cartItems.taxPrice = Number(0.18 * cartItems.itemsPrice).toFixed(2)
    cartItems.deliveryPrice = Number(cartItems.itemsPrice < 50 ? 20 : 0)
    cartItems.totalPrice = (Number(cartItems.itemsPrice) + Number(cartItems.taxPrice) + Number(cartItems.deliveryPrice)).toFixed(2)



    useEffect(() => {
        if (!userInfo || !redirect) {
            history.push("/login")
        } else {

            if (success) {
                dispatch({
                    type: ORDER_CREATE_RESET
                })
                history.push(`/orderDetails/${order._id}`)

            } else {
                const buildScript = async () => {
                    const { data: clientId } = await axios.get("/paypal/clientId");

                    const script = document.createElement('script');
                    script.type = "text/javascript"
                    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
                    script.async = true;
                    script.onload = () => {
                        setSdkReady(true)
                    }

                    document.body.appendChild(script)
                }

                if (!window.paypal) {

                    buildScript()
                    console.log(sdkReady)
                } else {
                    setSdkReady(true)
                }
            }





        }
    }, [history, userInfo, redirect, success])


    const createOrderHandler = (paymentResult) => {
        dispatch(createOrderAction({
            orderItems: cartItems,
            paymentMethod,
            shippingAddress,
            paymentResult,
            taxPrice: cartItems.taxPrice,
            deliveryPrice: cartItems.deliveryPrice,
            totalPrice: cartItems.totalPrice
        }))


    }

    return (
        <>
            <CheckoutComp step1 step2 step3 step4 />
            <HelmetComp title={`Place Order`} description="Mask Shop" />
            <Row>
                <Col md={8}>
                    <h1 className="my-3">Order</h1>

                    <Row>
                        <Col md={6}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>User Details</h4>
                                </ListGroup.Item>
                                <ListGroup.Item style={{ fontSize: "1.1rem" }}>
                                    Name: {userInfo.name},<br></br>
                                    Email: {userInfo.email} <br></br>
                                    Address: {shippingAddress.address} {" "}, {shippingAddress.city} <br></br>
                                    {shippingAddress.postalCode},{" "} {shippingAddress.country}.
                        </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <ListGroup variant="flush" className="my-3">
                                <ListGroup.Item><h4>Payment Method:</h4></ListGroup.Item>

                                <ListGroup.Item style={{ fontSize: "1.1rem" }}>
                                    Method: {paymentMethod}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={10}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h4>Order Items:</h4>
                                </ListGroup.Item>
                                {cartItems.map((item) => {
                                    return <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Link to={`/productDetails/${item.product}`}><Image src={item.image} alt={item.name} fluid /></Link>
                                            </Col>
                                            <Col md={6}>
                                                <Link to={`/productDetails/${item.product}`}><p>{item.name}</p></Link>
                                            </Col>
                                            <Col md={4}>
                                                <p>{item.qty} X $ {item.price} = $ {item.qty * item.price}</p>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                })}
                            </ListGroup>

                        </Col>
                    </Row>

                </Col>

                <Col md={4}>

                    <h2 className="my-3">Order Total</h2>

                    <Card>
                        <ListGroup variant="flush" style={{ fontSize: "1.1rem" }}>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Items Price:
                                      </Col>
                                    <Col>
                                        $ {cartItems.itemsPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax Price:
                                      </Col>
                                    <Col>
                                        $ {cartItems.taxPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Delivery Price:
                                      </Col>
                                    <Col>
                                        $ {cartItems.deliveryPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total Price:
                                    </Col>
                                    <Col>
                                        $ {cartItems.totalPrice}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton
                                        amount={cartItems.totalPrice}
                                        onSuccess={createOrderHandler}
                                    />
                                )}
                            </ListGroup.Item>
                            {error && <Message variant="danger">{error}</Message>}
                        </ListGroup>
                    </Card>

                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
