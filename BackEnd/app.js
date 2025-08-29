const express = require('express')
// const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./Middlewares/error')
const path = require('path')
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')
const payment = require('./routes/payment')

app.use('/api/v1/',products);
app.use('/api/v1/',auth);
app.use('/api/v1/',order);
app.use('/api/v1/',payment);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get(/^\/(?!api).*/,(req,res) => {
        res.sendFile(path.resolve(__dirname,'dist/index.html'))
    });
}

app.use(errorMiddleware)

module.exports = app;