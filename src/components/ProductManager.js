import {promises as fs} from 'fs'

export default class ProductManager {
    constructor(){
        this.patch = "./productos.txt";
        this.products =[];
    }
    static id = 0 

    addProduct = async (title, description, price, imagen, code, stock) => {
        ProductManager.id++
        let newProduct = {
            title,
            description,
            price,
            imagen,
            code,
            stock,
            id: ProductManager.id
        }
        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    };

    readProducts = async () =>{
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducs = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }
    getProducsById = async (id) => {
        let respuesta3 = await this.readProducts()
        
        if (!respuesta3.find(product => product.id === id)){
            console.log("Producto no encontrado")
        }else{
            console.log(respuesta3.find(product => product.id === id))
        } 
    };
    deletePrductsById = async (id) => {
        let respuesta4 = await this.readProducts();
        let productFilter = respuesta4.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("Producto eliminado")
    };
    updateProducts = async ({id, ...producto}) =>{
        await this.deletePrductsById(id);
        let productOld = await this.readProducts()
        let productsMod = [{...producto, id},...productOld]
        await fs.writeFile(this.patch, JSON.stringify(productsMod)) 
    };
}

//const productos = new ProductManager;
//agregar productos 
// productos.addProduct("producto 1", "descripcion1", 1000, "imagen1", "code1", 6)
// productos.addProduct("producto 2", "descripcion2", 1000, "imagen2", "code2", 2)
// productos.addProduct("producto 3", "descripcion3", 6000, "imagen3", "code3", 7)
// productos.addProduct("producto 4", "descripcion4", 4000, "imagen4", "code4", 8)
// productos.addProduct("producto 5", "descripcion5", 3500, "imagen5", "code5", 4)
// productos.addProduct("producto 6", "descripcion6", 7050, "imagen6", "code6", 5)
// productos.addProduct("producto 7", "descripcion7", 2900, "imagen7", "code7", 10)
// productos.addProduct("producto 8", "descripcion8", 3700, "imagen8", "code8", 9)
// productos.addProduct("producto 9", "descripcion9", 8000, "imagen9", "code9", 3)
// productos.addProduct("producto 10", "descripcion10", 6000, "imagen10", "code10", 7)


//consultar productos
//productos.getProducs()

//filtrar productos por id si existe
//productos.getProducsById(1)
//id no existe
//productos.getProducsById(4)

//eliminar producto por id 
//productos.deletePrductsById(2)

//actualizar productos
// productos.updateProducts({
//     title: 'producto 3',
//     description: 'descripcion3',
//     price: 6500,
//     imagen: 'imagen',
//     code: 'code3',
//     stock: 7,
//     id: 3
//   }
//   )