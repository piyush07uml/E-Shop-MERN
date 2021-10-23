import { ADD_PAYMENT_METHOD_SUCCESS } from '../constants/paymentConstans'





export const paymentMethodAction = (paymentMethod) => (dispatch) => {

    dispatch({
        type: ADD_PAYMENT_METHOD_SUCCESS,
        payload: paymentMethod
    })

    localStorage.setItem("paymentMethod", JSON.stringify(paymentMethod))
}