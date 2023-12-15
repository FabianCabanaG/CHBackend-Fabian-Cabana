import Router from './router.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';
import {
    registerService
   ,loginService
   ,getAllService
} from '../services/users.service.js'

export default class UsersRouter extends Router{
    constructor () {
        super();
    }

    init() {
        this.post('/login',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, registerService )
        this.post('/register',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, loginService )
    }

}