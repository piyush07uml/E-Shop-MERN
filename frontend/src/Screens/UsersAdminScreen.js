import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { adminUsersAction, userDeleteAdminAction } from '../actions/userActions';
import { USERS_ADMIN_RESET, USER_ADMIN_DELETE_RESET } from '../constants/userConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import Paginate from '../components/Paginate';
import HelmetComp from '../components/HelmetComp';

const UsersAdminScreen = ({ history, match }) => {

    const page = match.params.page || 1

    const dispatch = useDispatch();

    const login = useSelector(state => state.login)
    const { userInfo } = login

    const adminUsers = useSelector(state => state.adminUsers)
    const { loading, users, pageNumber, pages, error } = adminUsers

    const userDeleteAdmin = useSelector(state => state.userDeleteAdmin)

    const { loading: loadingDelete, success, error: errorDelete } = userDeleteAdmin

    useEffect(() => {
        return () => {
            dispatch({
                type: USERS_ADMIN_RESET
            })
        }
    }, [])

    useEffect(() => {
        dispatch(adminUsersAction(page))
    }, [page])


    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push("/login")
        } else {

            if (users.length === 0) {
                dispatch(adminUsersAction(page))
            }

            if (success) {
                dispatch({
                    type: USER_ADMIN_DELETE_RESET
                })
                dispatch(adminUsersAction(page))
            }

        }
    }, [dispatch, history, userInfo, success, page])



    const userDeleteHandler = (id) => {
        dispatch(userDeleteAdminAction(id));
    }


    return (
        <>
            <HelmetComp title={`Users || Admin`} description="Mask Shop" />

            <h2 className="my-3">Users</h2>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (

                <Table hover bordered responsive className="table-sm text-center">

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>ADMIN</th>
                            <th></th>

                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => {
                            return <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? <i className="fas fa-check" style={{ color: 'green' }}></i> :
                                    <i className="fas fa-times" style={{ color: 'green' }}></i>
                                }</td>
                                <td>
                                    <Link to={`/admin/userUpdate/${user._id}?page=${page}`}>
                                        <Button type="button" className="btn btn-light" >
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </Link>

                                    <Button type="button" className="btn btn-danger" onClick={() => userDeleteHandler(user._id)} >
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        })}
                    </tbody>

                </Table>
            )}

            <Paginate pageNumber={pageNumber} pages={pages} userAdmin={true} />
        </>
    )
}

export default UsersAdminScreen
