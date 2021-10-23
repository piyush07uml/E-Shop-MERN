import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Products = ({ product }) => {
    return (
        <Card className="p-2">
            <Link to={`/productDetails/${product._id}`}>
                <Card.Img src={product.image} alt={product.name} variant="top" />
            </Link>

            <Card.Body>
                <Link to={`/productDetails/${product._id}`}>
                    <Card.Title as="div" className="my-2">{product.name}</Card.Title>
                </Link>

                <Card.Text as="div" className="py-2">
                    <Rating rating={product.rating} /> ({product.numReviews})
                </Card.Text>
                <Card.Text as="h3"><strong>${product.price}</strong></Card.Text>

            </Card.Body>
        </Card >
    )
}

export default Products
