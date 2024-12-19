import { Router } from "express";
const router = Router();
import CartManager from "../managers/cart-manager.js";
const manager = new CartManager("./src/data/carts.json");
// Agregar rutas para el carrito aquí

// 1. crear el carrito
router.post('/',async (req,res) => {
    try {
        const nuevoCarrito = await manager.crearCarritos(); //  
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).json({error: "error crear carrito"});
    }
});
//2. listar los productos del carrito con id 
router.get('/:cid',async (req,res) => {
    const cartId = parseInt(req.params.cid);    
    try {
        const carritoBuscado = await manager.getCarritoById(cartId);
        res.json(carritoBuscado.products);
    } catch (error) {
        res.status(404).json({error: "carrito no encontrado"});        
    }
})

//3. agregar un productos al carrito
router.post("/:cid/product/:id",async(req,res)=>{
    const cartId = parseInt(req.params.cid);
    console.log("CardId"+cartId);
    
    const productId = parseInt(req.params.id);
    console.log("productId"+productId);
    const quantity = req.body.quantity || 1;

    try {
        const carritoActualizado = await manager.agregarProductoAlCarrito(cartId, productId, quantity);
        res.json(carritoActualizado);
    } catch (error) {
        res.status(500).json({error: "carrito no encontrado 🛒"});
    }
})
export default router;