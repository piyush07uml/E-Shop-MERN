import express from 'express';
const router = express.Router();
import { getAllProducts, getProduct, createProduct, deleteProduct, updateProduct, addProductReview, getTopProducts } from '../controllers/productController.js';
import protect from '../routeProtection/protect.js';
import admin from '../routeProtection/admin.js';


// get All Products
router.get("/all", getAllProducts)

// get single Product
router.get("/get/:id", getProduct)

// create product by admin

router.post("/create", protect, admin, createProduct)

// delete product by admin

router.delete("/:id", protect, admin, deleteProduct)

//update product by admin

router.put("/:id", protect, admin, updateProduct)

// add product review by user

router.post("/review/:id", protect, addProductReview)

router.get("/top", getTopProducts)





export default router;