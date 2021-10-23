import express from 'express';
const router = express.Router();
import { login, registerUser, updateUser, getUsersByAdmin, deleteUserByAdmin, userDetailsByAdmin, userUpdateByAdmin } from '../controllers/userControllers.js';
import protect from '../routeProtection/protect.js'
import admin from '../routeProtection/admin.js';


// login user
router.post("/login", login)

// signup user

router.post("/register", registerUser)

//update user

router.put("/update", protect, updateUser);

// gets users by admin

router.get("/admin", protect, admin, getUsersByAdmin)

// delete user by admin

router.delete("/user/:id", protect, admin, deleteUserByAdmin)

// get user details by admin
router.get("/admin/:id", protect, admin, userDetailsByAdmin);

// user update by admin

router.put("/admin/:id", protect, admin, userUpdateByAdmin)

export default router