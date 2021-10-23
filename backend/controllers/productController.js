import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler';





// get All Products
const getAllProducts = asyncHandler(async (req, res) => {

    const pageNumber = Number(req.query.page || 1)
    const pageSize = 6

    const keywords = req.query.keywords ? {
        name: {
            $regex: req.query.keywords,
            $options: 'i'
        }
    } : {}


    const count = await Product.countDocuments({ ...keywords })

    const products = await Product.find({ ...keywords }).limit(pageSize).skip(
        pageSize * (pageNumber - 1)
    )

    if (products) {
        res.json({ products, pageNumber, pages: Math.ceil(Number(count / pageSize)) });
    } else {
        res.status(404);
        throw new Error("Products Not Found!")
    }
})

// get single Product

const getProduct = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
        return res.json(product)
    } else {
        res.status(404);
        throw new Error("Product Not Found")
    }
})


// create product by admin
const createProduct = asyncHandler(async (req, res) => {

    const product = new Product({
        name: "Sample Name",
        description: "Sample Description",
        category: "Sample Category",
        brand: "Sample Brand",
        image: "/images/sample.jpg",
        price: 0,
        countInStock: 10
    })

    const createdProduct = await product.save();

    if (createdProduct) {
        return res.json(createdProduct);
    } else {
        res.status(401)
        throw new Error("Product Could Not Created")
    }
})


// delete product by admin

const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findByIdAndDelete(req.params.id)

    if (product) {
        return res.json({ name: product.name })
    } else {
        res.status(401);
        throw new Error("Product Could Not Delete")
    }
})

// update product by admin

const updateProduct = asyncHandler(async (req, res) => {

    const { name,
        description,
        category,
        brand,
        image,
        price,
        countInStock } = req.body

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.category = category || product.category;
        product.brand = brand || product.brand;
        product.image = image || product.image;
        product.price = price || product.price;
        product.countInStock = countInStock || product.countInStock

        const updatedProduct = await product.save();

        if (updatedProduct) {
            return res.json(updatedProduct)
        } else {
            res.status(401);
            throw new Error("Product Could Not Update")
        }
    } else {
        res.status(404);
        throw new Error("Product Not Found")
    }
})


// add review

const addProductReview = asyncHandler(async (req, res) => {

    const { user, name, comment, rating } = req.body

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews ? product.reviews.find((review) => review.user.toString() === req.user._id.toString()) : null

        if (alreadyReviewed) {
            res.status(400);
            throw new Error("Product Already Reviewed By You")
        } else {

            product.reviews = [...product.reviews, { user, name, comment, rating }]

            product.numReviews = Number(product.reviews.length);

            product.rating = Number(product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.numReviews)

            const updatedProduct = await product.save();

            if (updatedProduct) {
                return res.json(updatedProduct)
            } else {
                res.status(400);
                throw new Error("Product Could Not Save in DB")
            }

        }

    } else {
        res.status(404);
        throw new Error("Product Not Found")
    }
})



const getTopProducts = asyncHandler(async (req, res) => {

    const products = await Product.find({}).limit(3).sort({ rating: "-1" });

    if (products) {
        return res.json(products)
    } else {
        res.status(404);
        throw new Error("Products Not Found")
    }
})



export { getAllProducts, getProduct, createProduct, deleteProduct, updateProduct, addProductReview, getTopProducts }

