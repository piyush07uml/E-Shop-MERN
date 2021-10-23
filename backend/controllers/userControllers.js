import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';

import dotenv from 'dotenv';
dotenv.config();



// login user

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email })

    if (user) {
        const isMatched = await user.matchPassword(password)
        if (isMatched) {

            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(401);
            throw new Error("Email and Password Do Not Match")
        }


    } else {
        res.status(404);
        throw new Error("Invalid Email Address")
    }
})

// signup user

const registerUser = asyncHandler(async (req, res) => {



    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(401);
        throw new Error("Email Already Exist,Try Another One")
    }

    const createUser = new User({
        name,
        email,
        password
    })

    const user = await createUser.save();

    if (user) {
        res.status(201);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

    } else {
        res.status(400);
        throw new Error("User Could Not Created")
    }
})


const updateUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;

        const updatedUser = await user.save();

        return res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(401);
        throw new Error("User Could not Update")
    }
})


// get users by admin

const getUsersByAdmin = asyncHandler(async (req, res) => {

    const pageNumber = req.query.page || 1;
    const pageSize = 7

    const count = await User.countDocuments({});

    const users = await User.find({}).select("-password").limit(pageSize).skip(
        pageSize * (pageNumber - 1)
    )

    if (users) {
        if (users.length === 0) {
            res.status(404);
            throw new Error("No Users")
        }
        return res.json({ users, pageNumber, pages: Math.ceil(Number(count / pageSize)) })
    } else {
        res.status(404)
        throw new Error("Users Not Found")
    }
})


// delete user by admin

const deleteUserByAdmin = asyncHandler(async (req, res) => {

    const user = await User.findByIdAndDelete(req.params.id);

    if (user) {
        return res.json({ email: user.email })
    } else {
        res.status(401);
        throw new Error("User Could Not Delete")
    }
})

// get user details by admin

const userDetailsByAdmin = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id).select("-password");

    if (user) {
        return res.json(user);
    } else {
        res.status(404)
        throw new Error("User Not Found")
    }
})


const userUpdateByAdmin = asyncHandler(async (req, res) => {

    const { name, email, password, isAdmin } = req.body

    const user = await User.findById(req.params.id);

    if (user) {
        user.name = name || user.name
        user.email = email || user.email
        user.password = password || user.password
        user.isAdmin = isAdmin ? isAdmin : user.isAdmin

        const updatedUser = await user.save()

        if (updatedUser) {
            return res.json({ email: updatedUser.email })
        } else {
            res.status(401);
            throw new Error("User Could Not Save in DB")
        }
    } else {
        res.status(401);
        throw new Error("User Could Not Update")
    }
})




export { login, registerUser, updateUser, getUsersByAdmin, deleteUserByAdmin, userDetailsByAdmin, userUpdateByAdmin }