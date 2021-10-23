import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_CREATE_RESET,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_RESET,
    ORDER_USER_REQUEST, ORDER_USER_SUCCESS, ORDER_USER_FAIL, ORDER_USER_RESET,
    ORDER_ADMIN_REQUEST, ORDER_ADMIN_SUCCESS, ORDER_ADMIN_FAIL, ORDER_ADMIN_RESET,
    ORDER_ADMIN_UPDATE_REQUEST, ORDER_ADMIN_UPDATE_SUCCESS, ORDER_ADMIN_UPDATE_FAIL, ORDER_ADMIN_UPDATE_RESET
} from '../constants/orderConstants';



export const createOrderReducer = (state = { order: { orderItems: [] } }, action) => {
    switch (action.type) {

        case ORDER_CREATE_REQUEST:
            return { ...state, loading: true }

        case ORDER_CREATE_SUCCESS:
            return { loading: false, order: action.payload, success: true }

        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }

        case ORDER_CREATE_RESET:
            return { order: { orderItems: [] } }

        default:
            return state
    }
}


export const orderDetailsReducer = (state = { orderInfo: { orderItems: [] } }, action) => {
    switch (action.type) {

        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true };

        case ORDER_DETAILS_SUCCESS:
            return { loading: false, orderInfo: action.payload }

        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case ORDER_DETAILS_RESET:
            return { orderInfo: { orderItems: [] } }

        default:
            return state
    }
}


export const userOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_USER_REQUEST:
            return { ...state, loading: true }

        case ORDER_USER_SUCCESS:
            return { loading: false, orders: action.payload.orders, pageNumber: action.payload.pageNumber, pages: action.payload.pages }

        case ORDER_USER_FAIL:
            return { loading: false, error: action.payload }

        case ORDER_USER_RESET:
            return { orders: [] }
        default:
            return state
    }
}

export const adminOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {

        case ORDER_ADMIN_REQUEST:
            return { ...state, loading: true }

        case ORDER_ADMIN_SUCCESS:
            return { loading: false, orders: action.payload.orders, pageNumber: action.payload.pageNumber, pages: action.payload.pages }

        case ORDER_ADMIN_FAIL:
            return { loading: false, error: action.payload }

        case ORDER_ADMIN_RESET:
            return { orders: [] }

        default:
            return state
    }
}


export const updateOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_ADMIN_UPDATE_REQUEST:
            return { loading: true }

        case ORDER_ADMIN_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case ORDER_ADMIN_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case ORDER_ADMIN_UPDATE_RESET:
            return {}

        default:
            return state
    }
}