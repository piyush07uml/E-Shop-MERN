import React, { useState, useEffect } from 'react';
import { productDetailsAction, reviewProductAction } from '../actions/productsActions';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Button, Card, Image, Form } from 'react-bootstrap';
import { addTocartAction } from '../actions/cartActions';
import { PRODUCT_DETAILS_RESET, PRODUCT_REVIEW_RESET } from '../constants/productsConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { Link } from 'react-router-dom';
import HelmetComp from '../components/HelmetComp';


const ProductDetailsScreen = ({ match, history }) => {

    const [qty, setQty] = useState(1)

    const productId = match.params.id

    const dispatch = useDispatch();

    const productInfo = useSelector(state => state.productInfo)
    const { loading, productDetails, error } = productInfo;

    const login = useSelector(state => state.login)
    const { userInfo } = login

    const reviewProduct = useSelector(state => state.reviewProduct)

    const { loading: loadingReview, success, error: errorReview } = reviewProduct


    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");


    useEffect(() => {
        return () => {
            dispatch({
                type: PRODUCT_DETAILS_RESET
            })
        }
    }, [])


    useEffect(() => {
        if (!productDetails || !productDetails.name || productDetails._id !== productId) {
            dispatch(productDetailsAction(productId))
        }

        if (success) {
            dispatch({
                type: PRODUCT_REVIEW_RESET
            })

            dispatch(productDetailsAction(productId))
        }


    }, [dispatch, productId, productDetails, success])



    const addToCartHandler = () => {
        const cartItem = {
            product: productId,
            name: productDetails.name,
            image: productDetails.image,
            qty: Number(qty),
            price: productDetails.price,
            countInStock: productDetails.countInStock
        }

        dispatch(addTocartAction(cartItem))

        history.push("/cart")

    }



    const reviewSubmitHandler = (e) => {
        e.preventDefault();

        if (!rating || !comment) {
            setMessage("Rating and Comment Both Are Mandatory")
        } else {

            dispatch(reviewProductAction(productId, {
                user: userInfo._id,
                name: userInfo.name,
                rating,
                comment
            }))
            setMessage("")
            setRating("")
            setComment("")
        }

    }

    return (
        <>
            <HelmetComp title={productDetails.name} description="Mask Shop" />
            <h2 className="text-center py-3">Product Details</h2>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>
                    <Row className="my-3 py-3">
                        <Col md={5}>
                            <Image src={productDetails.image} alt={productDetails.name} fluid />
                        </Col>

                        <Col md={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item as="h3">
                                    {productDetails.name}
                                </ListGroup.Item>
                                <ListGroup.Item as="p">
                                    Brand: {productDetails.brand}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating rating={productDetails.rating} /> Rating from ({productDetails.numReviews}) Reviews
                            </ListGroup.Item>
                                <ListGroup.Item as="p">
                                    Product Code:  {productDetails._id}
                                </ListGroup.Item>
                                <ListGroup.Item as="h5">
                                    Description: {productDetails.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                     </Col>

                                            <Col>
                                                ${productDetails.price}
                                            </Col>

                                        </Row>

                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                     </Col>

                                            <Col>
                                                {productDetails.countInStock === 0 ? `Out Of Stock` : `In Stock`}
                                            </Col>

                                        </Row>

                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Qty:
                                       </Col>

                                            <Col>
                                                <Form>
                                                    <Form.Group controlId="qty">
                                                        <Form.Control
                                                            as="select"
                                                            onChange={e => setQty(e.target.value)}
                                                        >
                                                            <option>select</option>
                                                            {[...Array(productDetails.countInStock).keys()].map((x) => {
                                                                return <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                            })}
                                                        </Form.Control>
                                                    </Form.Group>
                                                </Form>
                                            </Col>

                                        </Row>

                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button type="button" variant="primary" className="btn btn-block"
                                            disabled={productDetails.countInStock === 0}
                                            onClick={addToCartHandler}
                                        >Add To Cart</Button>
                                    </ListGroup.Item>

                                </ListGroup>
                            </Card>
                        </Col>

                    </Row>

                    <Row>
                        <Col md={4}>
                            {userInfo ? (
                                <>
                                    <h2 className="my-3"> Write A Review</h2>
                                    {message && <Message variant="danger">{message}</Message>}
                                    {errorReview && <Message variant="danger">{errorReview}</Message>}
                                    {loadingReview && <Loader />}
                                    <Form onSubmit={reviewSubmitHandler}>
                                        <Form.Group controlId="rating">
                                            <Form.Label>Rating:</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={rating}
                                                onChange={e => setRating(e.target.value)}
                                            >
                                                <option>Select...</option>
                                                <option value="1">1 Poor</option>
                                                <option value="2">2 Fair</option>
                                                <option value="3">3 Good</option>
                                                <option value="4">4 Very Good</option>
                                                <option value="5">5 Excellent</option>

                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId="comment">
                                            <Form.Label>Comment</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                            />
                                        </Form.Group>

                                        <Button type="submit" variant="primary">Submit</Button>

                                    </Form>
                                </>
                            ) : (
                                    <h4 className="my-3"> <Link to="/login">Log In</Link> to write a review </h4>
                                )}
                        </Col>
                        <Col md={2}></Col>
                        <Col md={6}>
                            <h2 className="my-3">Customer Reviews</h2>

                            {productDetails.reviews.map((review) => {
                                return <div key={review._id} className="py-3">
                                    <Rating rating={review.rating} /> <br></br>
                                    {review.name} <br />
                                    {review.createdAt.substring(0, 10)}

                                    <h4 className="mt-3">{review.comment}</h4>
                                    <div style={{ border: "1px solid gray" }}></div>
                                </div>
                            })}


                        </Col>
                    </Row>
                </>
            )}


        </>
    )
}

export default ProductDetailsScreen
