import { CART_ADD, CART_ADD_RESET, CART_DELETE } from '../constants/cartConstants';



export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {

        case CART_ADD:
            const itemExist = state.cartItems.find((p) => p.product === action.payload.product)

            if (itemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((item) => {
                        return item.product === action.payload.product ? action.payload : item
                    })
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload]
                }
            }

        case CART_DELETE:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.product !== action.payload)
            }

        case CART_ADD_RESET:
            return { cartItems: [] }

        default:
            return state
    }
}