import Router from './router.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';
import {
    registerService
   ,loginService
   ,getAllService
   ,retrievePassword
   ,resetPassword
} from '../services/users.service.js'

export default class UsersRouter extends Router{
    constructor () {
        super();
    }

    init() {
        this.post('/login',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, registerService )
        this.post('/register',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, loginService )
        // this.post('/retrievepassword',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING,retrievePassword)

        this.post('/retrievepassword',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, async (req,res)  => {
            try {
            console.log(req.body)
            const email = req.body.email
            retrievePassword(email)
            }
            catch (error) {
                console.log(error)
            }
        } )

        this.post('/resetpassword',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, async (req,res) => {
            // console.log(req.body)
            const newPassword = req.body.password
            const token = req.body.token
            // console.log(token,newPassword)
            resetPassword(token,newPassword)
        })
        
    }

}