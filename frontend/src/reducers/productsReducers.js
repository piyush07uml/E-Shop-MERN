import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_RESET,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_RESET,
    PRODUCT_CREATE_ADMIN_REQUEST, PRODUCT_CREATE_ADMIN_SUCCESS, PRODUCT_CREATE_ADMIN_FAIL, PRODUCT_CREATE_ADMIN_RESET,
    PRODUCT_DELETE_ADMIN_REQUEST, PRODUCT_DELETE_ADMIN_SUCCESS, PRODUCT_DELETE_ADMIN_FAIL, PRODUCT_DELETE_ADMIN_RESET,
    PRODUCT_UPDATE_ADMIN_REQUEST, PRODUCT_UPDATE_ADMIN_SUCCESS, PRODUCT_UPDATE_ADMIN_FAIL, PRODUCT_UPDATE_ADMIN_RESET,
    PRODUCT_REVIEW_REQUEST, PRODUCT_REVIEW_SUCCESS, PRODUCT_REVIEW_FAIL, PRODUCT_REVIEW_RESET,
    PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL, PRODUCT_TOP_RESET
} from '../constants/productsConstants';





export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { ...state, loading: true }

        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload.products, pageNumber: action.payload.pageNumber, pages: action.payload.pages }

        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_LIST_RESET:
            return { products: [] }

        default:
            return state;
    }
}



export const productDetailsReducer = (state = { productDetails: { reviews: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { ...state, loading: true }

        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, productDetails: action.payload }

        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_DETAILS_RESET:
            return { productDetails: { reviews: [] } }

        default:
            return state
    }
}


export const createProductReducer = (state = { product: {} }, action) => {

    switch (action.type) {
        case PRODUCT_CREATE_ADMIN_REQUEST:
            return { ...state, loading: false }

        case PRODUCT_CREATE_ADMIN_SUCCESS:
            return { loading: false, success: true, product: action.payload }

        case PRODUCT_CREATE_ADMIN_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_CREATE_ADMIN_RESET:
            return { product: {} }

        default:
            return state
    }
}


export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {

        case PRODUCT_DELETE_ADMIN_REQUEST:
            return { loading: true }

        case PRODUCT_DELETE_ADMIN_SUCCESS:
            return { loading: false, success: true }

        case PRODUCT_DELETE_ADMIN_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_DELETE_ADMIN_RESET:
            return {}

        default:
            return state
    }
}



export const updateProductReducer = (state = {}, action) => {
    switch (action.type) {

        case PRODUCT_UPDATE_ADMIN_REQUEST:
            return { loading: true }

        case PRODUCT_UPDATE_ADMIN_SUCCESS:
            return { loading: false, success: true }

        case PRODUCT_UPDATE_ADMIN_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_UPDATE_ADMIN_RESET:
            return {}

        default:
            return state
    }
}


export const reviewProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_REQUEST:
            return { loading: true }

        case PRODUCT_REVIEW_SUCCESS:
            return { loading: false, success: true }

        case PRODUCT_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_REVIEW_RESET:
            return {}

        default:
            return state
    }
}


export const topProductsReducer = (state = { products: [] }, action) => {
    switch (action.type) {

        case PRODUCT_TOP_REQUEST:
            return { ...state, loading: true }

        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload }

        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload }

        case PRODUCT_TOP_RESET:
            return { products: [] }

        default:
            return state
    }
}