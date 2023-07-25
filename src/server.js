import express from "express";
import ProductManager from "./components/ProductManager.js";

const app = express() 
app.use(express.urlencoded({extended: true}));

const productos = new ProductManager;
const readProducts = productos.readProducts();

app.get("/products", async (req,res) => {
    let limit = parseInt(req.query.limit);
    if(!limit) return res.send(await readProducts)
    let allProduct = await readProducts
    let productLimit = allProduct.slice(0, limit)
    res.send(productLimit)
});

app.get("/products/:id", async (req,res) => {
    let id = parseInt(req.params.id);
    let allProduct = await readProducts;
    let productById = allProduct.find(product => product.id === id);
    res.send(productById) 
})
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Express por local host ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error del servidor ${error}`))


