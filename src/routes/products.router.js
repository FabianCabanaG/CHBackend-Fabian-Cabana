import { __dirname, createHash, generateToken, isValidPassword } from '../utils.js';
import Router from './router.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';
import {
    getProductsController
    , getProductByIdController
    , addProductController
    , updateProductController
    , deleteProductController
    , addManyProductsController
    , addProductIOController
} from '../controller/products.controller.js'

export default class StudentsRouter extends Router {
    constructor() {
        super();
    }

    init() {
        this.get('/', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getProductsController)
        this.get('/:pid', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, getProductByIdController)
        this.post('/', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM], passportStrategiesEnum.NOTHING, addProductController)
        this.put('/:pid', [accessRolesEnum.ADMIN], passportStrategiesEnum.NOTHING, updateProductController)
        this.delete('/:pid', [accessRolesEnum.ADMIN], passportStrategiesEnum.NOTHING, deleteProductController)
        this.post('/devinsertmany', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, addManyProductsController)
        this.post('/realTimeProducts', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, addProductIOController)
    }

}

