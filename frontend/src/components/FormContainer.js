import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';

const FormContainer = ({ children }) => {
    return (
        <Row>

            <Col md={{ span: 6, offset: 3 }}>
                {children}
            </Col>
        </Row>
    )
}

export default FormContainer
