import { ADD_PAYMENT_METHOD_SUCCESS } from '../constants/paymentConstans';



export const paymentReducer = (state = { paymentMethod: "" }, action) => {
    switch (action.type) {

        case ADD_PAYMENT_METHOD_SUCCESS:
            return { paymentMethod: action.payload }

        default:
            return state
    }
}