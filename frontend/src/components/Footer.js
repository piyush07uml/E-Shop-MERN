import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row >
                    <Col className="text-center my-3">
                        copyrights &copy; maskshop
                 </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
