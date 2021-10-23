import React, { useState, useEffect } from 'react'
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { productDetailsAction, updateProductAction } from '../actions/productsActions';
import { PRODUCT_DETAILS_RESET, PRODUCT_UPDATE_ADMIN_RESET } from '../constants/productsConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HelmetComp from '../components/HelmetComp';

const ProductEditScreen = ({ match, history, location }) => {

    const productId = match.params.id

    const page = location.search ? location.search.split("=")[1] : 1

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [countInStock, setCountInStock] = useState("");
    const [uploading, setUploading] = useState(false)



    const dispatch = useDispatch();

    const login = useSelector(state => state.login)
    const { userInfo } = login


    const productInfo = useSelector(state => state.productInfo);
    const { loading, productDetails, error } = productInfo;

    const updateProduct = useSelector(state => state.updateProduct)

    const { loading: loadingUpdate, success, error: errorUpdate } = updateProduct


    useEffect(() => {
        return () => {
            dispatch({
                type: PRODUCT_DETAILS_RESET
            })
        }
    }, [])



    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push("/login")
        } else {
            if (!productDetails || !productDetails.name || productDetails._id !== productId) {
                dispatch(productDetailsAction(productId))
            } else {
                setName(productDetails.name)
                setDescription(productDetails.description)
                setCategory(productDetails.category)
                setBrand(productDetails.brand);
                setImage(productDetails.image);
                setPrice(productDetails.price);
                setCountInStock(productDetails.countInStock)
            }


            if (success) {
                dispatch({
                    type: PRODUCT_UPDATE_ADMIN_RESET
                })

                history.push(`/admin/products/${page}`)
            }
        }
    }, [dispatch, history, userInfo, productDetails, success])



    const updateProductHandler = (e) => {
        e.preventDefault();

        dispatch(updateProductAction({
            _id: productId,
            name,
            description,
            category,
            brand,
            image,
            price,
            countInStock

        }))
    }


    const uploadImageHandler = async (e) => {

        e.preventDefault();

        const file = e.target.files[0];

        const formData = new FormData();

        formData.append('image', file)

        try {
            setUploading(true);

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const { data } = await axios.post("/api/uploads", formData, config);

            setImage(data)
            setUploading(false)

        } catch (error) {
            console.error(error);
            setUploading(false)

        }

    }


    return (
        <>
            <HelmetComp title={`${productDetails.name}`} description="Mask Shop" />
            <Link to="/admin/products/1">
                <Button type="button" variant="light">Back</Button>
            </Link>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <FormContainer>
                    <h2 className="my-3">Update Product</h2>
                    {loadingUpdate && <Loader />}
                    {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                    <Form onSubmit={updateProductHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />

                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />

                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Caetgory</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Category"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                            />

                        </Form.Group>

                        <Form.Group controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Brand"
                                value={brand}
                                onChange={e => setBrand(e.target.value)}
                            />

                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Image"
                                value={image}
                                onChange={e => setImage(e.target.value)}
                            />

                        </Form.Group>

                        <Form.Group>
                            <Form.File id="exampleFormControlFile1" label="Upload Image"
                                onChange={(e) => uploadImageHandler(e)} custom
                            />
                        </Form.Group>
                        {uploading && <Loader />}

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Price"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />

                        </Form.Group>

                        <Form.Group controlId="countInStock">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Count In Stock"
                                value={countInStock}
                                onChange={e => setCountInStock(e.target.value)}
                            />

                        </Form.Group>

                        <Button type="submit" variant="primary">Update</Button>
                    </Form>
                </FormContainer>
            )}
        </>
    )
}

export default ProductEditScreen
