import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { Link } from 'react-router-dom';
import { userAddressAction } from '../actions/userActions';
import Message from '../components/Message';
import HelmetComp from '../components/HelmetComp';
import CheckoutComp from '../components/CheckoutComp';

const ShippingAddressScreen = ({ history, location }) => {

    const userAddress = useSelector(state => state.userAddress);

    const { shippingAddress } = userAddress;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country)
    const [message, setMessage] = useState("");

    const login = useSelector(state => state.login)
    const { userInfo } = login

    const redirect = location.search && location.search.split("=")[1]

    const dispatch = useDispatch();


    useEffect(() => {
        if (!redirect || !userInfo) {
            history.push("/login")
        }
    }, [history, redirect, userInfo])





    const addressHandler = (e) => {

        e.preventDefault();

        if (!address || !city || !postalCode || !country) {
            setMessage("All Fields Are Mandatory")
        } else {

            setMessage("");

            dispatch(userAddressAction({
                address,
                city,
                postalCode,
                country
            }))
        }


    }
    return (
        <>
            <CheckoutComp step1 step2 />
            <FormContainer>
                <HelmetComp title={`Shipping Address`} description="Mask Shop" />

                <h2 className="my-3">Shipping Address</h2>
                {message && <Message variant="danger">{message}</Message>}
                <Form onSubmit={addressHandler}>
                    <Form.Group controlId="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />

                    </Form.Group>

                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter City"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                    </Form.Group>

                    <Form.Group controlId="postalCode">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Postal Code"
                            value={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                        />

                    </Form.Group>

                    <Form.Group controlId="country">
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Country"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        />

                    </Form.Group>
                    <Link to="/paymentMethod?redirect=paymentMethod">
                        <Button type="submit" variant="primary">Continue</Button>
                    </Link>

                </Form>
            </FormContainer>
        </>
    )
}

export default ShippingAddressScreen
