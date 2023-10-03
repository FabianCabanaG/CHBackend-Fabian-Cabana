import ProductManager from '../managers/ProductManager.js';
import Router from 'express'
import { __dirname } from '../utils.js';

const manager = new ProductManager(`${__dirname}/data/products.json`);

const router = Router();

router.get('/', async (req, res) => {

    const products = await manager.getProducts();


    const consultas = req.query
    const { limit } = consultas

    if (!limit) {
        res.send(products)
    } else {
        let limitProducts = products.filter(element => element.id <= limit)
        res.send(limitProducts)
    }

});

router.get('/:pid', async (req, res) => {
    const id = Number(req.params.pid);
    const products = await manager.getProductById(id)
    res.send(products);
});

router.post('/', async (req, res) => {

    const products = await manager.getProducts();

    const newProduct = req.body;

    if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.code || !newProduct.stock || !newProduct.category || !newProduct.status) {
        return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
    }

    const productCode = products.findIndex(element => element.code === newProduct.code);
    // console.log(productCode)
    if (!(productCode === -1)) {
        return res.status(400).send({ status: 'error', error: 'Product already registered' })
    }

    await manager.addProduct(newProduct)
    res.send({ status: 'success', payload: newProduct })

})

router.put('/:pid', async (req, res) => {

    const products = await manager.getProducts();

    const id = Number(req.params.pid);

    const newProduct = req.body;

    // validations
    // product exists
    const productFound = products.find(element => element.id === id);
    if (!productFound) {
        return res.status(400).send({ status: 'error', error: 'Product does not exist' })
    }
    // all fields filled
    if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.code || !newProduct.stock || !newProduct.category || !newProduct.status) {
        return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
    }

    await manager.updateProduct(id, newProduct)
    res.send({ status: 'success', payload: newProduct })

})


router.delete('/:pid', async (req, res) => {

    const id = Number(req.params.pid);

    const products = await manager.getProducts();

    // Validar si el producto existe 

    const productFound = products.find(element => element.id === id);
    if (!productFound) {
        return res.status(400).send({ status: 'error', error: 'Product does not exist' })
    }

    await manager.deleteProduct(id)
    res.send({ status: 'sucess', message: `product ${id} deleted` });
});

export default router