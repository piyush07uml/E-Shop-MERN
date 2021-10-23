import express from 'express';
const router = express.Router();
import protect from '../routeProtection/protect.js';
import admin from '../routeProtection/admin.js'
import { createOrder, getOrderById, getOrdersByUser, getOrdersByAdmin, updateOrder } from '../controllers/orderControllers.js'


// create order
router.post("/create", protect, createOrder)

//get single order
router.get("/order/:id", protect, getOrderById);

// get Orders By User
router.get("/user", protect, getOrdersByUser)

// get Orders By Admin
router.get("/admin", protect, admin, getOrdersByAdmin)

// update Delivery Status
router.put("/:id", protect, admin, updateOrder)


export default router