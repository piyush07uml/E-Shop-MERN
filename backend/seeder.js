import mongoose from 'mongoose';

import users from './data/users.js';
import products from './data/products.js';

import User from './models/userModel.js';
import Product from './models/productModel.js';

import DBconfig from './DB/DBconfig.js'

import dotenv from 'dotenv';

dotenv.config();

DBconfig();



const importData = async () => {

    try {

        await User.deleteMany();
        await Product.deleteMany();

        await User.insertMany(users);
        await Product.insertMany(products);

        console.log("DATA IMPORETD");

        process.exit();

    } catch (error) {
        console.error(`${error}`);
        process.exit(1)
    }
}

importData();