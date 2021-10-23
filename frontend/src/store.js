import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer, createProductReducer, deleteProductReducer, updateProductReducer, reviewProductReducer, topProductsReducer } from './reducers/productsReducers';
import { cartReducer } from './reducers/cartReducers';
import { loginReducer, userRegisterReducer, userAddressReducer, updateUserReducer, adminUsersReducer, userDeleteAdminReducer, userDetailsAdminReducer, userUpdateAdminReducer } from './reducers/userReducers';
import { paymentReducer } from './reducers/paymentReducer';
import { createOrderReducer, orderDetailsReducer, userOrdersReducer, adminOrdersReducer, updateOrderReducer } from "./reducers/orderReducers";



const reducers = combineReducers({
    productList: productListReducer,
    productInfo: productDetailsReducer,
    topProducts: topProductsReducer,
    cart: cartReducer,
    login: loginReducer,
    userRegister: userRegisterReducer,
    userAddress: userAddressReducer,
    adminUsers: adminUsersReducer,
    payment: paymentReducer,
    reviewProduct: reviewProductReducer,
    createProduct: createProductReducer,
    deleteProduct: deleteProductReducer,
    updateProduct: updateProductReducer,
    createOrder: createOrderReducer,
    orderDetails: orderDetailsReducer,
    updateUser: updateUserReducer,
    userOrders: userOrdersReducer,
    userDeleteAdmin: userDeleteAdminReducer,
    userDetailsAdmin: userDetailsAdminReducer,
    userUpdateAdmin: userUpdateAdminReducer,
    adminOrders: adminOrdersReducer,
    updateOrder: updateOrderReducer

})


const cartFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}

const paymentMethodFromStorage = localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")) : "PayPal"

const initialState = {
    cart: { cartItems: cartFromStorage },
    login: { userInfo: userInfoFromStorage },
    userAddress: { shippingAddress: shippingAddressFromStorage },
    payment: { paymentMethod: paymentMethodFromStorage }
}

const middleware = [thunk]




const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store