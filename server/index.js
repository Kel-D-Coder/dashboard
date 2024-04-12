const express = require("express");
const cors = require("cors");
const upload = require("express-fileupload");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoute = require("./Routes/ProductRoute");
const authRoute = require("./Routes/AuthRoute");
const userRoute = require("./Routes/UserRoute")
dotenv.config();

const app = express();

//middlewares
app.use(express.json());
app.use(upload());
app.use(express.static("public"));
app.use(cors());

//routes
app.use('/api/v1/product', productRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);

//db connection
function connect() {
    return mongoose.connect(process.env.MONGO_CONNECTION_STRING);
}

const start = async () => {
    try {
        await connect()
        app.listen(5000, () => {
            console.log("Listening on port 5000....");
        })
    } catch (error) {
        console.log(error);
    }
}

start();