import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { orderDetailsAction } from '../actions/orderActions';
import { ORDER_DETAILS_RESET } from '../constants/orderConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import HelmetComp from '../components/HelmetComp';



const OrderDetailsScreen = ({ history, match }) => {

    const orderId = match.params.id

    const dispatch = useDispatch()

    const login = useSelector(state => state.login)
    const { userInfo } = login;

    const orderDetails = useSelector(state => state.orderDetails);

    const { loading, orderInfo, error } = orderDetails;

    useEffect(() => {
        return () => {
            dispatch({
                type: ORDER_DETAILS_RESET
            })
        }
    }, [])


    useEffect(() => {

        if (!userInfo) {
            history.push("/login")
        } else {
            if (!orderInfo || !orderInfo._id) {
                dispatch(orderDetailsAction(orderId))


            }
        }

    }, [dispatch, history, userInfo, orderInfo, orderId])




    return (
        <>
            <HelmetComp title={`Order Details`} description="Mask Shop" />
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Row>
                    <Col md={8}>
                        <h1 className="my-3">Order</h1>
                        {(orderInfo.user) && (
                            <Row>
                                <Col md={6}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h4>User Details</h4>
                                        </ListGroup.Item>
                                        <ListGroup.Item style={{ fontSize: "1.1rem" }}>
                                            Name: {orderInfo.user.name},<br></br>
                                            Email: {orderInfo.user.email} <br></br>
                                            Address: {orderInfo.shippingAddress.address} {" "}, {orderInfo.shippingAddress.city} <br></br>
                                            {orderInfo.shippingAddress.postalCode},{" "} {orderInfo.shippingAddress.country}.
                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                            </Row>

                        )}
                        <Row>
                            <Col md={6}>
                                <ListGroup variant="flush" className="my-3">
                                    <ListGroup.Item><h4>Payment Method:</h4></ListGroup.Item>

                                    <ListGroup.Item style={{ fontSize: "1.1rem" }}>
                                        Method: {orderInfo.paymentMethod}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <ListGroup variant="flush" className="my-3">
                                    <ListGroup.Item><h4>Order Status:</h4></ListGroup.Item>

                                    <ListGroup.Item style={{ fontSize: "1.1rem" }}>
                                        ORDER ID : {orderInfo._id}
                                    </ListGroup.Item>

                                    <ListGroup.Item style={{ fontSize: "1.1rem" }}>
                                        Paid By : {orderInfo.paymentMethod} {orderInfo.createdAt}
                                    </ListGroup.Item>

                                    <ListGroup.Item style={{ fontSize: "1.1rem" }}>
                                        Delivery : {orderInfo.isDelivered ? `Delivered At ${orderInfo.deliveredAt}` : `Not Delivered`}
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
                                    {orderInfo.orderItems.map((item) => {
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
                                            $ {orderInfo.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Tax Price:
                                      </Col>
                                        <Col>
                                            $ {orderInfo.taxPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Delivery Price:
                                      </Col>
                                        <Col>
                                            $ {orderInfo.deliveryPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            Total Price:
                                    </Col>
                                        <Col>
                                            $ {orderInfo.totalPrice}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                            </ListGroup>
                        </Card>

                    </Col>
                </Row>
            )}
        </>
    )
}

export default OrderDetailsScreen
