import React, { useEffect } from 'react'
import { Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { productListAction } from '../actions/productsActions';
import { PRODUCT_LIST_RESET } from '../constants/productsConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Products from '../components/Products';
import Paginate from '../components/Paginate';
import CarouselComp from '../components/CarouselComp';
import HelmetComp from '../components/HelmetComp';

const HomeScreen = ({ match }) => {

    const keywords = match.params.keywords || ''

    const page = Number(match.params.page || 1)

    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, products, pageNumber, pages, error } = productList;

    useEffect(() => {
        return () => {
            dispatch({
                type: PRODUCT_LIST_RESET
            })
        }
    }, [])



    useEffect(() => {
        dispatch(productListAction(keywords, page))
    }, [dispatch, keywords, page])


    return (
        <>
            <HelmetComp title={`Mask Shop || Home Page`} description="Mask Shop" />
            <CarouselComp />
            <h2 className="my-3  ">Latest Products</h2>


            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>
                    <Row>
                        {products.map((product) => {
                            return <Col md={4} lg={3} sm={6} xm={12} className="py-3" key={product._id}>
                                <Products product={product} />
                            </Col>
                        })}
                    </Row>
                    <Paginate pageNumber={pageNumber} pages={pages} keywords={keywords} />
                </>
            )}

        </>
    )
}

export default HomeScreen
