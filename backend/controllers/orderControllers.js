import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js'



const createOrder = asyncHandler(async (req, res) => {
    const {
        orderItems,
        paymentMethod,
        paymentResult,
        shippingAddress,
        taxPrice,
        deliveryPrice,
        totalPrice
    } = req.body;

    const order = new Order({
        user: req.user._id,
        orderItems,
        paymentMethod,
        paymentResult,
        shippingAddress,
        taxPrice,
        deliveryPrice,
        totalPrice,
        isPaid: true,
        paidAt: Date.now()

    })

    const createdOrder = await order.save();

    if (createdOrder) {
        res.status(201);
        res.json(createdOrder)
    } else {
        res.status(401);
        throw new Error("Order Could Not Created")
    }
})


const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if (order) {
        return res.json(order)
    } else {
        res.status(404);
        throw new Error("Order Not Found")
    }
})


const getOrdersByUser = asyncHandler(async (req, res) => {

    const pageNumber = req.query.page
    const pageSize = 7


    const count = await Order.countDocuments({ user: req.user._id })

    const orders = await Order.find({ user: req.user._id }).populate('user', 'name email').limit(pageSize).skip(
        pageSize * (pageNumber - 1)
    )

    if (orders) {
        if (orders.length === 0) {
            res.status(404);
            throw new Error("NO ORDERS")
        } else {
            return res.json({ orders, pageNumber, pages: Math.ceil(Number(count / pageSize)) })
        }

    } else {
        res.status(404);
        throw new Error("Order Not Found")
    }
})


const getOrdersByAdmin = asyncHandler(async (req, res) => {

    const pageNumber = req.query.page
    const pageSize = 7


    const count = await Order.countDocuments({})

    const orders = await Order.find({}).populate('user', 'name email').limit(pageSize).skip(
        pageSize * (pageNumber - 1)
    )

    if (orders) {
        if (orders.length === 0) {
            res.status(404);
            throw new Error("No Orders")
        } else {
            return res.json({ orders, pageNumber, pages: Math.ceil(Number(count / pageSize)) })
        }
    } else {
        res.status(404);
        throw new Error("Orders Not Found")
    }
})


const updateOrder = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDelivered = !order.isDelivered;

        if (order.isDelivered) {
            order.deliveredAt = Date.now();
        } else {
            order.deliveredAt = ''
        }

        const updatedOrder = await order.save();

        return res.json(updatedOrder)

    } else {
        res.status(401);
        throw new Error("Order Could Not Update")
    }
})


export { createOrder, getOrderById, getOrdersByUser, getOrdersByAdmin, updateOrder }