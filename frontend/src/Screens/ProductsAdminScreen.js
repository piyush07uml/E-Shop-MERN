import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { productListAction, createProductAction, deleteProductAction } from '../actions/productsActions';
import { PRODUCT_LIST_RESET, PRODUCT_CREATE_ADMIN_RESET, PRODUCT_DELETE_ADMIN_RESET } from '../constants/productsConstants';
import Paginate from '../components/Paginate.js'
import HelmetComp from '../components/HelmetComp';


const ProductsAdminScreen = ({ history, match }) => {

    const page = match.params.page || 1

    const dispatch = useDispatch();

    const login = useSelector(state => state.login)
    const { userInfo } = login

    const productList = useSelector(state => state.productList)
    const { loading, products, pageNumber, pages, error } = productList

    const createProduct = useSelector(state => state.createProduct)

    const { loading: loadingCreate, success: successCreate, error: errorCreate } = createProduct

    const deleteProduct = useSelector(state => state.deleteProduct);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = deleteProduct

    useEffect(() => {
        return () => {
            dispatch({
                type: PRODUCT_LIST_RESET
            })
        }
    }, [])

    useEffect(() => {
        dispatch(productListAction('', page))
    }, [page])


    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push("/login")
        } else {

            if (!products || products.length === 0) {
                dispatch(productListAction('', page))
            }

            if (successCreate) {
                dispatch({
                    type: PRODUCT_CREATE_ADMIN_RESET
                })
                dispatch(productListAction('', page))
            }

            if (successDelete) {
                dispatch({
                    type: PRODUCT_DELETE_ADMIN_RESET
                })

                dispatch(productListAction('', page))
            }

        }
    }, [dispatch, history, userInfo, products, successCreate, successDelete, page])



    const createProductHandler = () => {
        dispatch(createProductAction());
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProductAction(id));
    }

    return (
        <>
            <HelmetComp title={`Products || Admin`} description="Mask Shop" />
            <h2 className="my-3">Products</h2>
            <Button type="button" variant="primary" className="ml-0 my-3" onClick={createProductHandler}><i className="fas fa-add"></i> Create</Button>

            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>
                    <Table hover bordered responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => {
                                return <tr key={product._id}>
                                    <td><Link to={`/productDetails/${product._id}`}>{product._id}</Link></td>
                                    <td>{product.name}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.category}</td>
                                    <td>$ {product.price}</td>
                                    <td>
                                        <Link to={`/admin/product/edit/${product._id}?page=${page}`}>
                                            <Button
                                                type="button"
                                                className="btn btn-light"
                                            ><i className="fas fa-edit"></i></Button>
                                        </Link>

                                        <Button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => deleteProductHandler(product._id)}
                                        ><i className="fas fa-trash"></i></Button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                    <Paginate pageNumber={pageNumber} pages={pages} productAdmin={true} />
                </>

            )}
        </>
    )
}

export default ProductsAdminScreen
