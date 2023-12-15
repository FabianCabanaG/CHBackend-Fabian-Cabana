// import ProductManager from '../managers/ProductManager.js';
import Products from '../dao/dbManagers/products.manager.js';
import { __dirname, createHash, generateToken, isValidPassword  } from '../utils.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';

const usersManager = new Products();

    const getProductsService = async  (req, res)  => {
        const consultas = req.query
        let { limit = 10,page = 1,sort,filterName,filterValue} = consultas
        page = parseInt(page);
        limit = parseInt(limit)
        sort = parseInt(sort)
        console.log(filterName,filterValue)
        const products = await usersManager.getProducts(limit,page,sort,filterName,filterValue);
    
        let productsC = products.docs.map(product => product.toObject())
        res.send({status:'success',payload:productsC,totalPages:products.totalPages,
        prevPage:products.prevPage,
        nextPage:products.nextPage,
        page:products.page,
        hasPrevPage:products.hasPrevPage,
        hasNextPage:products.hasNextPage,
        prevLink:`localhost:8080/api/products?page=${products.prevPage}`,
        nextLink:`localhost:8080/api/products?page=${products.nextPage}`,
        user: req.session.user
        })
    
    };
    
    const getProductByIdService = async  (req, res) => {
        const id = Number(req.params.pid);
        const products = await usersManager.getProductById(id)
        res.send(products);
    };
    
    const addProductService = async  (req, res) =>  {
    
        const products = await usersManager.getProducts();
    
        const newProduct = req.body;
    
        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.code || !newProduct.stock || !newProduct.category || !newProduct.status) {
            return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
        }
    
        const productCode = products.findIndex(element => element.code === newProduct.code);
        // console.log(productCode)
        if (!(productCode === -1)) {
            return res.status(400).send({ status: 'error', error: 'Product already registered' })
        }
    
        await usersManager.addProduct(newProduct)
        res.send({ status: 'success', payload: newProduct })
    
    };
    
    const updateProductService = async  (req, res) => {
    
        const products = await usersManager.getProducts();
    
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
    
        await usersManager.updateProduct(id, newProduct)
        res.send({ status: 'success', payload: newProduct })
    
    };

    const deleteProductService = async  (req, res) => {
    
        const id = Number(req.params.pid);
    
        const products = await usersManager.getProducts();
    
        // Validar si el producto existe 
    
        const productFound = products.find(element => element.id === id);
        if (!productFound) {
            return res.status(400).send({ status: 'error', error: 'Product does not exist' })
        }
    
        await usersManager.deleteProduct(id)
        res.send({ status: 'sucess', message: `product ${id} deleted` });
    };
    
    const addManyProductsService = async  (req, res) =>  {
    
        const newProducts = req.body;
    
        await usersManager.addManyProducts(newProducts)
    
        res.send({ status: 'success', payload: newProducts })
    
    };
    

    // socket io
    
    const addProductIOService = async  (req, res) => {
    
        const products = await usersManager.getProducts();
        const io = req.app.get('socketio');
        const newProduct = req.body;
        console.log(newProduct)
    
        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.code || !newProduct.stock || !newProduct.category || !newProduct.status) {
            return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
        }
    
        // const productCode = products.findIndex(element => element.code === newProduct.code);
        // console.log(productCode)
        // if (!(productCode === -1)) {
        //     return res.status(400).send({ status: 'error', error: 'Product already registered' })
        // }
    
        await usersManager.addProduct(newProduct)
    
        io.emit('allProducts', products);
    
    }
    

    export {
        getProductsService
        ,getProductByIdService
        ,addProductService
        ,updateProductService
        ,deleteProductService
        ,addManyProductsService
        ,addProductIOService
    }



// const manager = new ProductManager(`${__dirname}/data/products.json`);

// const productsRouter = Router();



// export {
//     productsRouter
//     , manager
// }

