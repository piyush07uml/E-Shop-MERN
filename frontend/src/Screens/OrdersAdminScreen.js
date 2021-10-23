import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { adminOrdersAction, updateOrderAction } from '../actions/orderActions';
import { ORDER_ADMIN_UPDATE_RESET, ORDER_ADMIN_RESET } from '../constants/orderConstants';
import { Link } from 'react-router-dom'
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import HelmetComp from '../components/HelmetComp';



const OrdersAdminScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const page = match.params.page || 1

    const login = useSelector(state => state.login)
    const { userInfo } = login

    const adminOrders = useSelector(state => state.adminOrders);
    const { loading, orders, pageNumber, pages, error } = adminOrders

    const updateOrder = useSelector(state => state.updateOrder);

    const { loading: loadingUpdate, success, error: errorUpdate } = updateOrder


    useEffect(() => {
        return () => {
            dispatch({
                type: ORDER_ADMIN_RESET
            })
        }
    }, [])


    useEffect(() => {
        dispatch(adminOrdersAction(page));
    }, [page])


    useEffect(() => {

        if (!userInfo || !userInfo.isAdmin) {
            history.push("/login")

        } else {

            if (success) {
                dispatch({
                    type: ORDER_ADMIN_UPDATE_RESET
                })
                dispatch(adminOrdersAction(page));
            }


            if (orders.length === 0) {
                dispatch(adminOrdersAction(page));
            }

        }
    }, [dispatch, history, orders, userInfo, success, page])


    const updateOrderHandler = (id) => [
        dispatch(updateOrderAction(id))
    ]

    return (
        <>
            <HelmetComp title={`Orders || Admin`} description="Mask Shop" />
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>
                    <h2 className="my-3">Orders</h2>
                    {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                    {loadingUpdate && <Loader />}
                    <Table hover bordered responsive className="table-sm text-center">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>Name</th>
                                <th>PAID BY</th>
                                <th>Delivered</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => {
                                return <tr key={order._id}>
                                    <td><Link to={`/orderDetails/${order._id}`}>{order._id}</Link></td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>{order.user.name}</td>
                                    <td><i className="fab fa-cc-paypal fa-2x" style={{ color: '#348ceb' }}></i></td>
                                    <td>{order.isDelivered ? <i className="fas fa-check" style={{ color: 'green' }}></i> :
                                        <i className="fas fa-times" style={{ color: 'red' }}></i>}</td>
                                    <td><Button variant="primary"
                                        onClick={() => updateOrderHandler(order._id)}
                                    >{order.isDelivered ? `Mark As Not Delivered` : `Mark As Delivered`}</Button></td>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                    <Paginate pageNumber={pageNumber} pages={pages} orderAdmin={true} />

                </>
            )}
        </>
    )
}

export default OrdersAdminScreen
