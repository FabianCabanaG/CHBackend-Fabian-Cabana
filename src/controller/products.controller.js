import {
    getProductsService
    ,getProductByIdService
    ,addProductService
    ,updateProductService
    ,deleteProductService
    ,addManyProductsService
    ,addProductIOService
} from '../services/products.service.js'


const getProductsController = async  (req, res)  => {
    try {
        const consultas = req.query
        const products = await getProductsService(consultas);
        products.user = req.session.user
        res.send({status:'success',payload:products})
    } catch (error) {
        res.status(500).send({error:error.message})
    }
};

const getProductByIdController = async  (req, res) => {
    const id = Number(req.params.pid);
    const products = await getProductByIdService(id)
    res.send(products);
};

const addProductController = async  (req, res) =>  {
    
    const result = await addProductService(newProduct)
    res.send({ status: 'success', payload: result })

};

const updateProductController = async  (req, res) => {

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

    const result = await updateProductService (id, newProduct)
    res.send({ status: 'success', payload: result })

};

const deleteProductController = async  (req, res) => {
    
    const id = Number(req.params.pid);
    const result = await deleteProductService(id)
    res.send({ status: 'sucess', message: `product ${result} deleted` });
};

const addManyProductsController = async  (req, res) =>  {
    
    const newProducts = req.body;

    const result = await addManyProductsService(newProducts)

    res.send({ status: 'success', payload: result })

};

const addProductIOController = async  (req, res) => {

    const io = req.app.get('socketio');
    const newProduct = req.body;

    if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.code || !newProduct.stock || !newProduct.category || !newProduct.status) {
        return res.status(400).send({ status: 'error', error: 'Incomplete Value' })
    }

    // const productCode = products.findIndex(element => element.code === newProduct.code);
    // console.log(productCode)
    // if (!(productCode === -1)) {
    //     return res.status(400).send({ status: 'error', error: 'Product already registered' })
    // }

    const result  = await addProductIOService(io,newProduct)

    io.emit('allProducts', result);

}



export {
     getProductsController
    ,getProductByIdController
    ,addProductController
    ,updateProductController
    ,deleteProductController
    ,addManyProductsController
    ,addProductIOController
} 