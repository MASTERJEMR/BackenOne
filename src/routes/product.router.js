import { Router } from "express";
const router = Router();

// importamos el product manager

//const ProductManager = require('../managers/product-manager');
import ProductManager from "../managers/product-manager.js";
const manager = new ProductManager('./src/data/productos.json');

//rutas


// ruta para listar todos los productos
router.get('/', async (req, res)=> {
    console.log('Parámetros de consulta:', req.query); // Verifica qué parámetros se están recibiendo
    const limit = req.query.limit; 
    const products = await manager.getProducts();
    if(limit){
        res.send(products.slice(0, limit));
    }else{
        
    res.send({status:"success", products});

    }
})
// ruta para pedir un producto por id
router.get('/:pid', async (req, res)=> {
    const id = parseInt(req.params.pid);
    const product = await manager.getProductById(id);
    res.send({status:"success", product});
});
//listen



export default router;