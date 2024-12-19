import{ promises as fs } from 'fs';

//const fs = require('fs').promises;


class ProductManager {
    static ultId= 0;
    constructor(path) {
        this.products = [];
        this.path = path;
    }
    async addProduct({title, description, price, img, code, stock}) {
        ///  se lee el archivo y se guarda el array product
        const arrayProductos = await this.leerArchivo();
        
        //validación de todos los campos
        if(!title || !description || !price || !img || !code || !stock){
            console.log("Todos los campos son obligatorios");
            return;
        }
        //validación que el producto sea único
        if(arrayProductos.some(item => item.code === code)){
            console.log("El producto con el código '" + code + "' ya existe");
            return;
        }
        //si pasa las validaciones, ahora se puede crear el objeto
        const nuevoProducto = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock
        };
        arrayProductos.push(nuevoProducto);

        /// Una vez agregamos el nuevo produto al array, se guarda el array en el archivo
        await this.guardarArchivo(arrayProductos);
        console.log("Producto agregado correctamente");
        ///this.products = arrayProductos; 



    }

    async getProducts() {
        // En caso de que exista un limite para el producto
        const arrayProductos = await this.leerArchivo();
        return  arrayProductos;
    }
    async getProductById(id) {
        // primero primero se leer el array y luego genero el archivo
        console.log("ingreso a buscar por id: " + id);
        
       const arrayProductos = await this.leerArchivo();
       const producto= arrayProductos.find(item => item.id === id);

       if(!producto){
           console.error("Producto no encontrado");
           return "Not Found";
       }else{
        console.log(producto);
        return producto;
       }
    }

    //// Se puede crear unos metodos para guardar en el archivo y recuperar datos
    async guardarArchivo(arrayProductos){

        try {
            await fs.writeFile(this.paths.archivo, JSON.stringify(arrayProductos, null, 2));
            console.log("Archivo guardado correctamente");
        } catch (error) {
            console.error("Error al guardar el archivo", error);
        }
    }

    async leerArchivo(){
        try {
            const respuesta = await fs.readFile(this.path, 'utf-8');
            const arrayProductos = JSON.parse(respuesta);
            console.log("Archivo leido correctamente");
            return arrayProductos;
            
        } catch (error) {
            console.error("Error al leer el archivo", error);
        }

    }

}
//module.exports =ProductManager;
export default ProductManager; 
///testing
/* 
const manager = new ProductManager();

manager.addProduct("Producto 1", "Descripcion 1", 10, "img1.jpg", "P001", 100);
manager.addProduct("Producto 2", "Descripcion 2", 20, "img2.jpg", "P002", 50);

console.log(manager.getProduct());
console.log(manager.getProductById(1));

manager.addProduct("Producto prueba","este es un producto prueba",200,"P003","Sin imagen",25);
console.log(manager.getProduct()); */