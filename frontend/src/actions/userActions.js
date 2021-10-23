import axios from 'axios';
import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_RESET,
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
    USER_ADDRESS_SUCCESS,
    USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    USERS_ADMIN_REQUEST, USERS_ADMIN_SUCCESS, USERS_ADMIN_FAIL,
    USER_ADMIN_DELETE_REQUEST, USER_ADMIN_DELETE_SUCCESS, USER_ADMIN_DELETE_FAIL,
    USER_ADMIN_DETAILS_REQUEST, USER_ADMIN_DETAILS_SUCCESS, USER_ADMIN_DETAILS_FAIL,
    USER_ADMIN_UPDATE_REQUEST, USER_ADMIN_UPDATE_SUCCESS, USER_ADMIN_UPDATE_FAIL,
} from '../constants/userConstants';





export const userRegisterAction = (user) => async (dispatch) => {
    try {

        dispatch({
            type: USER_REGISTER_REQUEST
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post('/api/users/register', user, config);

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });


        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



export const loginAction = (user) => async (dispatch) => {
    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const { data } = await axios.post('/api/users/login', user, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const logoutAction = () => (dispatch) => {
    localStorage.removeItem("userInfo");

    dispatch({
        type: USER_LOGIN_RESET
    })
}




export const userAddressAction = (shippingAddress) => (dispatch) => {

    console.log("INSIDE ACTION")

    dispatch({
        type: USER_ADDRESS_SUCCESS,
        payload: shippingAddress
    });

    localStorage.setItem("shippingAddress", JSON.stringify(shippingAddress));

}



export const updateUserAction = (user) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const { userInfo: { token } } = getState().login;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.put(`/api/users/update`, user, config);

        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {

        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }
}



export const adminUsersAction = (page = 1) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USERS_ADMIN_REQUEST
        })

        const { userInfo: { token } } = getState().login;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.get(`/api/users/admin?page=${page}`, config)

        dispatch({
            type: USERS_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USERS_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const userDeleteAdminAction = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_ADMIN_DELETE_REQUEST
        })

        const { userInfo: { token } } = getState().login;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.delete(`/api/users/user/${id}`, config)

        dispatch({
            type: USER_ADMIN_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_ADMIN_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const userDetailsAdminAction = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_ADMIN_DETAILS_REQUEST
        })

        const { userInfo: { token } } = getState().login;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.get(`/api/users/admin/${id}`, config);

        dispatch({
            type: USER_ADMIN_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_ADMIN_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const userUpdateAdminAction = (user) => async (dispatch, getState) => {
    try {

        dispatch({
            type: USER_ADMIN_UPDATE_REQUEST
        })

        const { userInfo: { token } } = getState().login

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.put(`/api/users/admin/${user._id}`, user, config)

        dispatch({
            type: USER_ADMIN_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_ADMIN_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}