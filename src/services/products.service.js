// import ProductManager from '../managers/ProductManager.js';
import Products from '../dao/dbManagers/products.manager.js';
import { __dirname, createHash, generateToken, isValidPassword } from '../utils.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';

const usersManager = new Products();

const getProductsService = async (consultas) => {
    
    let { limit = 10, page = 1, sort, filterName, filterValue } = consultas
    page = parseInt(page);
    limit = parseInt(limit)
    sort = parseInt(sort)
    console.log(filterName, filterValue)
    const products = await usersManager.getProducts(limit, page, sort, filterName, filterValue);

    let productsC = products.docs.map(product => product.toObject())
    let finalObj = ({
        status: 'success', payload: productsC, totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: `localhost:8080/api/products?page=${products.prevPage}`,
        nextLink: `localhost:8080/api/products?page=${products.nextPage}`,
    });

    return finalObj;

};

const getProductByIdService = async (id) => {
    const products = await usersManager.getProductById(id)
    return (products);
};

const addProductService = async (newProduct) => {

    const productsRaw = await usersManager.getProducts();
    const products = productsRaw.docs;

    if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.code || !newProduct.stock || !newProduct.category || !newProduct.status) {
        console.log('Incomplete Values. Se requiere: title(string),description(string),price(number),code(string),stock(number),category(string),status(boolean)')
        return res.status(400).send({ status: 'error', error: 'Incomplete Values. Se requiere: title(string),description(string),price(number),code(string),stock(number),category(string),status(boolean)' })
    }

    const productCode = products.findIndex(element => element.code === newProduct.code);
    // console.log(productCode)
    if (!(productCode === -1)) {
        return console.log('Product already registered')
    }
    await usersManager.addProduct(newProduct)
    return newProduct

};

const updateProductService = async (id, newProduct) => {

    const products = await usersManager.getProducts();

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

    await usersManager.updateProduct(id, newProduct)
    return newProduct

};

const deleteProductService = async (id) => {

    const products = await usersManager.getProducts();

    // Validar si el producto existe 


    
    const productFound = products.find(element => element.id === id);
    if (!productFound) {
        return res.status(400).send({ status: 'error', error: 'Product does not exist' })
    }

    await usersManager.deleteProduct(id)
    return id;
};

const addManyProductsService = async (newProducts) => {

    await usersManager.addManyProducts(newProducts)

    return newProducts

};


// socket io

const addProductIOService = async (io, newProduct) => {

    const products = await usersManager.getProducts();

    if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.code || !newProduct.stock || !newProduct.category || !newProduct.status) {
        return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
    }

    // const productCode = products.findIndex(element => element.code === newProduct.code);
    // console.log(productCode)
    // if (!(productCode === -1)) {
    //     return res.status(400).send({ status: 'error', error: 'Product already registered' })
    // }

    await usersManager.addProduct(newProduct)

    return products

}


export {
    getProductsService
    , getProductByIdService
    , addProductService
    , updateProductService
    , deleteProductService
    , addManyProductsService
    , addProductIOService
}



// const manager = new ProductManager(`${__dirname}/data/products.json`);

// const productsRouter = Router();



// export {
//     productsRouter
//     , manager
// }

