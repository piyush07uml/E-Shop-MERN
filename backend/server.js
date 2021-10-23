import express from 'express';
import path from 'path'
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import DBconfig from './DB/DBconfig.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

//middlewares
app.use(express.json());



//DB CONNECTION
DBconfig();


// importing routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';





//ROUTES
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/uploads", uploadRoutes)

const __dirname = path.resolve();


app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.get("/paypal/clientId", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

//error middleware
app.use(notFound);
app.use(errorHandler);


// starting a server
const PORT = 4000 || process.env.PORT

app.listen(PORT, console.log(`App is Runnning At port ${PORT}`))