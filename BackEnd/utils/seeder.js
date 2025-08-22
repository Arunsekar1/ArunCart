const Products = require('../data/products.json')
const Product = require('../Models/productModel')
const dotenv = require('dotenv')
const connectDatabase = require('../config/database')

dotenv.config ({path:'backend/config/config.env'})
connectDatabase();

const seedProducts = async ( req,res,next)=>{
    try{
        await Product.deleteMany();
        console.log('products deleted')
        await Product.insertMany(Products)
        console.log('All products added!')
    }catch(error){
        console.log(error.message)
    }
    process.exit()
}

seedProducts();