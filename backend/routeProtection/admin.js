import asyncHandler from 'express-async-handler';

const admin = asyncHandler((req, res, next) => {

    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401);
        throw new Error("You Are Not An Admin,Authorization Failed")
    }
})


export default admin;