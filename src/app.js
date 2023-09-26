import express from 'express';

import ProductManager from '../managers/ProductManager.js';
const app = express()

const manager = new ProductManager('../files/products.json');


app.get('/products', async (req, res) => {

    const products = await manager.getProducts();
    

    const consultas = req.query
    const {limit} = consultas

    if(!limit) {
        res.send(products)
    } else {
        let limitProducts = products.filter(element => element.id <= limit)
        res.send(limitProducts)
    }

});

app.get('/products/:pid', async (req, res) => {
    const id = Number(req.params.pid);
    const products = await manager.getProductById(id)
    res.send(products);
});

app.listen(8080, () => console.log('listening 8080'));