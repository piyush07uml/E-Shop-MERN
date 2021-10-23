import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_CREATE_ADMIN_REQUEST,
    PRODUCT_CREATE_ADMIN_SUCCESS,
    PRODUCT_CREATE_ADMIN_FAIL,
    PRODUCT_DELETE_ADMIN_REQUEST,
    PRODUCT_DELETE_ADMIN_SUCCESS,
    PRODUCT_DELETE_ADMIN_FAIL,
    PRODUCT_UPDATE_ADMIN_REQUEST, PRODUCT_UPDATE_ADMIN_SUCCESS, PRODUCT_UPDATE_ADMIN_FAIL,
    PRODUCT_REVIEW_REQUEST, PRODUCT_REVIEW_SUCCESS, PRODUCT_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL,
} from '../constants/productsConstants';

import axios from 'axios';




export const productListAction = (keywords = '', page = 1) => async (dispatch) => {
    try {

        dispatch({
            type: PRODUCT_LIST_REQUEST
        })

        const { data } = await axios.get(`/api/products/all?keywords=${keywords}&page=${page}`);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



export const productDetailsAction = (id) => async (dispatch) => {

    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        });

        const { data } = await axios.get(`/api/products/get/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const createProductAction = () => async (dispatch, getState) => {
    try {

        dispatch({
            type: PRODUCT_CREATE_ADMIN_REQUEST
        });

        const { userInfo: { token } } = getState().login;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.post("/api/products/create", {}, config)

        dispatch({
            type: PRODUCT_CREATE_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



export const deleteProductAction = (id) => async (dispatch, getState) => {
    try {

        dispatch({
            type: PRODUCT_DELETE_ADMIN_REQUEST
        })

        const { userInfo: { token } } = getState().login;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const updateProductAction = (product) => async (dispatch, getState) => {
    try {

        dispatch({
            type: PRODUCT_UPDATE_ADMIN_REQUEST
        })

        const { userInfo: { token } } = getState().login;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.put(`/api/products/${product._id}`, product, config)

        dispatch({
            type: PRODUCT_UPDATE_ADMIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_ADMIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const reviewProductAction = (productId, review) => async (dispatch, getState) => {
    try {

        dispatch({
            type: PRODUCT_REVIEW_REQUEST
        })

        const { userInfo: { token } } = getState().login;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }


        const { data } = await axios.post(`/api/products/review/${productId}`, review, config)

        dispatch({
            type: PRODUCT_REVIEW_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}



export const topProductsAction = () => async (dispatch) => {
    try {

        dispatch({
            type: PRODUCT_TOP_REQUEST
        })

        const { data } = await axios.get("/api/products/top")

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })

    }
}