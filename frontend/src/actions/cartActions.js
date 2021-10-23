import { CART_ADD, CART_ADD_RESET, CART_DELETE } from '../constants/cartConstants';



export const addTocartAction = (cartItem) => (dispatch, getState) => {

    console.log("cartItem", cartItem)

    dispatch({
        type: CART_ADD,
        payload: cartItem
    });

    const cart = getState().cart;
    const { cartItems } = cart


    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}



export const deleteCartAction = (id) => (dispatch, getState) => {

    dispatch({
        type: CART_DELETE,
        payload: id
    })

    const cart = getState().cart;

    const { cartItems } = cart;

    localStorage.setItem("cartItems", JSON.stringify(cartItems))
}