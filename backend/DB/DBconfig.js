import mongoose from 'mongoose';



const DBconfig = () => {
    mongoose.connect(process.env.DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(() => console.log(`APP IS CONNECTED TO MONGO DB!`))
        .catch((error) => console.log(`ERROR IN DB CONNECTION: ${error}`))
}


export default DBconfig;