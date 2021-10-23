import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_RESET,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_RESET,
    USER_ADDRESS_SUCCESS,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET,
    USERS_ADMIN_REQUEST, USERS_ADMIN_SUCCESS, USERS_ADMIN_FAIL, USERS_ADMIN_RESET,
    USER_ADMIN_DELETE_REQUEST, USER_ADMIN_DELETE_SUCCESS, USER_ADMIN_DELETE_FAIL, USER_ADMIN_DELETE_RESET,
    USER_ADMIN_DETAILS_REQUEST, USER_ADMIN_DETAILS_SUCCESS, USER_ADMIN_DETAILS_FAIL, USER_ADMIN_DETAILS_RESET,
    USER_ADMIN_UPDATE_REQUEST, USER_ADMIN_UPDATE_SUCCESS, USER_ADMIN_UPDATE_FAIL, USER_ADMIN_UPDATE_RESET
} from '../constants/userConstants';




export const loginReducer = (state = {}, action) => {
    switch (action.type) {

        case USER_LOGIN_REQUEST:
            return { loading: true }

        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        case USER_LOGIN_RESET:
            return {}

        default:
            return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {

        case USER_REGISTER_REQUEST:
            return { loading: true }

        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true };

        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        case USER_REGISTER_RESET:
            return {}

        default:
            return state
    }
}


export const userAddressReducer = (state = { shippingAddress: {} }, action) => {
    switch (action.type) {

        case USER_ADDRESS_SUCCESS:
            return { shippingAddress: action.payload }

        default:
            return state
    }
}


export const updateUserReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }

        case USER_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case USER_UPDATE_RESET:
            return {}

        default:
            return state
    }
}


export const adminUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case USERS_ADMIN_REQUEST:
            return { ...state, loading: true }

        case USERS_ADMIN_SUCCESS:
            return { loading: false, users: action.payload.users, pageNumber: action.payload.pageNumber, pages: action.payload.pages }

        case USERS_ADMIN_FAIL:
            return { loading: false, error: action.payload }

        case USERS_ADMIN_RESET:
            return { users: [] }

        default:
            return state
    }
}

export const userDeleteAdminReducer = (state = {}, action) => {
    switch (action.type) {

        case USER_ADMIN_DELETE_REQUEST:
            return { loading: true }

        case USER_ADMIN_DELETE_SUCCESS:
            return { loading: false, success: true }

        case USER_ADMIN_DELETE_FAIL:
            return { loading: false, error: action.payload }

        case USER_ADMIN_DELETE_RESET:
            return {}

        default:
            return state
    }
}



export const userDetailsAdminReducer = (state = { user: {} }, action) => {
    switch (action.type) {

        case USER_ADMIN_DETAILS_REQUEST:
            return { ...state, loading: true }

        case USER_ADMIN_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }

        case USER_ADMIN_DETAILS_FAIL:
            return { loading: false, error: action.payload }

        case USER_ADMIN_DETAILS_RESET:
            return { user: {} }
        default:
            return state
    }
}


export const userUpdateAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_ADMIN_UPDATE_REQUEST:
            return { loading: true }

        case USER_ADMIN_UPDATE_SUCCESS:
            return { loading: false, success: true }

        case USER_ADMIN_UPDATE_FAIL:
            return { loading: false, error: action.payload }

        case USER_ADMIN_UPDATE_RESET:
            return {}

        default:
            return state
    }
}