import express from 'express';
//const express = require('express'); 
const app = express(); 
const PORT = 8080;
//const productRouter = require('./routes/product.router.js');
import cartRouter from './routes/cart.router.js';
import productRouter from './routes/product.router.js';

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
///rutas
app.use("/api/products",productRouter);
app.use("/api/carts",cartRouter);


app.listen(PORT, (req, res)=> {
    console.log("listening on port " +PORT);
})

    