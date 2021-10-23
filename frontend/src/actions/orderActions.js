import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    ORDER_USER_REQUEST, ORDER_USER_SUCCESS, ORDER_USER_FAIL,
    ORDER_ADMIN_REQUEST, ORDER_ADMIN_SUCCESS, ORDER_ADMIN_FAIL,
    ORDER_ADMIN_UPDATE_REQUEST, ORDER_ADMIN_UPDATE_SUCCESS, ORDER_ADMIN_UPDATE_FAIL,
} from '../constants/orderConstants';
import axios from 'axios';


export const createOrderAction = (order) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_CREATE_REQUEST
        })


        const { userInfo: { token } } = getState().login;

        console.log("TOKEN", token)

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.post("/api/orders/create", order, config);

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const orderDetailsAction = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userInfo: { token } } = getState().login

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.get(`/api/orders/order/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}




export const userOrdersAction = (page = 1) => async (dispatch, getState) => {
    try {

        dispatch({
            type: ORDER_USER_REQUEST
        })

        const { userInfo: { token } } = getState().login;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.get(`/api/orders/user?page=${page}`, config);

        dispatch({
            type: ORDER_USER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_USER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const adminOrdersAction = (page = 1) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_ADMIN_REQUEST
        });

        const { userInfo: { token } } = getState().login;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.get(`/api/orders/admin?page=${page}`, config);

        dispatch({
            type: ORDER_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }

}


export const updateOrderAction = (id) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_ADMIN_UPDATE_REQUEST
        })

        const { userInfo: { token } } = getState().login;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        const { data } = await axios.put(`/api/orders/${id}`, {}, config)

        dispatch({
            type: ORDER_ADMIN_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_ADMIN_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}