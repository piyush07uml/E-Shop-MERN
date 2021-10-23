import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const generateToken = (id) => {
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: '30d' })
    return token;
}



export default generateToken;