import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { paymentMethodAction } from '../actions/paymentActions';
import { useDispatch, useSelector } from 'react-redux';
import HelmetComp from '../components/HelmetComp';
import CheckoutComp from '../components/CheckoutComp';

const PaymentMethodScreen = ({ history, location }) => {

    const payment = useSelector(state => state.payment)

    const { paymentMethod: paymentMethodFromStore } = payment

    const [paymentMethod, setPaymentMethod] = useState(paymentMethodFromStore)

    const dispatch = useDispatch();

    const login = useSelector(state => state.login)

    const { userInfo } = login

    const redirect = location.search && location.search.split("=")[1]


    useEffect(() => {
        if (!redirect || !userInfo) {
            history.push("/login")
        }

    }, [history, redirect, userInfo])



    const paymentHandler = (e) => {
        e.preventDefault();
        dispatch(paymentMethodAction(paymentMethod))
        history.push("/createOrder?redirect=order")
    }


    return (
        <>
            <CheckoutComp step1 step2 step3 />
            <FormContainer>
                <HelmetComp title={`Choose Payment`} description="Mask Shop" />
                <h2 className="my-3">Payment Method:</h2>
                <Form onSubmit={paymentHandler}>
                    <Form.Group controlId="paymentCheckbox">
                        <Form.Label>Method:</Form.Label>
                        <Form.Check
                            type="checkbox"
                            label="PayPal"
                            checked={paymentMethod === 'PayPal'}
                            value="PayPal"
                            id="PayPal"
                            custom
                            onChange={e => setPaymentMethod(e.target.value)}
                        />

                        <Form.Check
                            type="checkbox"
                            label="Stripe"
                            checked={paymentMethod === 'Stripe'}
                            value="Stripe"
                            id="Stripe"
                            custom
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" variant="primary">Continue</Button>
                </Form>
            </FormContainer>
        </>
    )
}

export default PaymentMethodScreen
