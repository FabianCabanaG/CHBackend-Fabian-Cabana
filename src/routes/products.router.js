import { __dirname, createHash, generateToken, isValidPassword  } from '../utils.js';
import Router from './router.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';
import {
    getProductsService
    ,getProductByIdService
    ,addProductService
    ,updateProductService
    ,deleteProductService
    ,addManyProductsService
    ,addProductIOService
} from '../services/products.service.js'

export default class StudentsRouter extends Router{
    constructor () {
        super();
    }

    init() {
        this.get('/',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, getProductsService )
        this.get('/:pid',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, getProductByIdService )
        this.post('/',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, addProductService )
        this.put('/:pid',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, updateProductService )
        this.delete('/:pid',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, deleteProductService )
        this.post('/devinsertmany',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, addManyProductsService )
        this.post('/realTimeProducts',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, addProductIOService )
    }
    
}

