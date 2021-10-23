import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const CheckoutComp = ({ step1, step2, step3, step4 }) => {
    return (
        <Row className="my-4">

            <Col md={2}></Col>


            <span>
                {step1 ? (
                    <h5 style={{ color: "green" }} className="mr-3">User Logged In &#10230;</h5>
                ) : (
                        <h5 className="mr-3">User Logged In &#10230;</h5>
                    )}
            </span>

            <span >
                {step2 ? (
                    <h5 style={{ color: "green" }} className="mr-3">Shipping Address &#10230;</h5>
                ) : (
                        <h5 className="mr-3">Shipping Address &#10230;</h5>
                    )}
            </span>

            <span>
                {step3 ? (
                    <h5 style={{ color: "green" }} className="mr-3">Payment Method &#10230;</h5>
                ) : (
                        <h5 className="mr-3">Payment Method &#10230;</h5>
                    )}
            </span>

            <span>
                {step4 ? (
                    <h5 style={{ color: "green" }} className="mr-3">Place Order   </h5>
                ) : (
                        <h5 className="mr-3">Place Order</h5>
                    )}
            </span>


            <Col md={2}></Col>
        </Row>

    )
}

export default CheckoutComp
