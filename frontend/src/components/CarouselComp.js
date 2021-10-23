import React, { useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { topProductsAction } from '../actions/productsActions';
import Loader from './Loader';
import Message from './Message';
import { Link } from "react-router-dom"
const CarouselComp = () => {

    const dispatch = useDispatch()

    const topProducts = useSelector(state => state.topProducts)

    useEffect(() => {
        dispatch(topProductsAction())
    }, [])

    const { loading: loadingTop, products: productsTop, error: errorTop } = topProducts
    return (
        <>
            {loadingTop ? <Loader /> : errorTop ? <Message variant="danger">{errorTop}</Message> : (
                <Carousel className="bg-dark" variant="dark">
                    {productsTop.map((product) => {
                        return <Carousel.Item key={product._id}>
                            <Link to={`/productDetails/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid />
                            </Link>

                            <Link to={`/productDetails/${product._id}`}>
                                <Carousel.Caption>
                                    <h3>{product.name} (${product.price})</h3>
                                </Carousel.Caption>
                            </Link>


                        </Carousel.Item>
                    })}
                </Carousel>
            )}

        </>
    )
}

export default CarouselComp
