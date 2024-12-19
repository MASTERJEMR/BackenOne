import {promises as fs} from 'fs'; 
import { stringify } from 'querystring';
class CartManager{
    constructor(path){
        this.path = path;
        this.carts=[];
        this.ultId=0;
        /// cargo los carritos
        this.cargarCarritos(); ///

          
    }
    async cargarCarritos(){
        try{
            const data= await fs.readFile(this.path, 'utf8');
            this.carts = JSON.parse(data);
            if(this.carts.length>0){
                //Se verfica si hay un carrito creado
                this.ultId = Math.max(...this.carts.map(cart=>cart.id));//utilizo el metd math para que solo obtenga los id del carrito, con maht max obtengo el mayor

            }
        }catch(error){
            // si no existe el archivo se va a crear
            await this.crearCarritos();
        }
    }
    async guardarCarritos(){
        console.log("ingreso a guardar carritos");
        await fs.writeFile(this.path, JSON.stringify(this.carts,null,2));
    }
    async crearCarritos(){
        const nuevoCarrito = {
            id: ++this.ultId,
            products: []
        }
        this.carts.push(nuevoCarrito);
        await this.guardarCarritos();
        return nuevoCarrito;
    }
    async getCarritoById(cartId){
        const carrito = this.carts.find(cart=>cart.id===cartId);
        if(!carrito){
            throw new Error(`Carrito con id ${cartId} no encontrado`);
        }else{
            return carrito;
        }
    }
    async agregarProductoAlCarrito(cartId, productId, cantidad){
        
        const carrito = await this.getCarritoById(cartId); 
        console.log("Ingreso a agregar producto al carrito");
        console.log("carrito 🚗  con cardId"+stringify(carrito));
         //// verficamos si ya existe el producto en el carrito
         const productoEnCarrito = carrito.products.find(p=>p.id===productId);
         console.log("* producto en carrito "+productoEnCarrito);
         
        if(productoEnCarrito){
            console.log("el si esta en el carrito");
            productoEnCarrito.quantity += cantidad;
        }else{
            console.log("el N😎 esta en el carrito");
            //console.log(carrito.products.push({product: productId, quantity}));
            
            carrito.products.push({product: productId, quantity});
            console.log(carrito);
        }
        
        console.log("el carrito es ".stringify(carrito));
        await this.guardarCarritos(); 
        
        return carrito;

        // const producto = carrito.products.find(product=>product.id===productId);
    }
}
export default CartManager;