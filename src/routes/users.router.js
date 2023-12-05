import Router from './router.js';
import { accessRolesEnum, passportStrategiesEnum } from '../config/enums.js';
import Users from '../dao/dbManagers/users.manager.js';
import { createHash, generateToken, isValidPassword } from '../utils.js';

export default class StudentsRouter extends Router{
    constructor () {
        super();
        this.usersManager = new Users();
    }

    init() {
        this.post('/login',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, this.login )
        this.post('/register',[accessRolesEnum.PUBLIC],passportStrategiesEnum.NOTHING, this.register )
    }

    async register (req,res) {
        try {
            const {first_name, last_name, email, role, password } = req.body;

            if(!first_name || !last_name || !email || !role || !password ) {
                return res.sendClientError('incomplete values')
            }

            const existsUser = await this.usersManager.getByEmail(email);

            if(existsUser) {
                return res.sendClientError('User Already Exists')
            }

            const hashedPassword = createHash(password);

            const newUser = {
                ...req.body
            }

            newUser.password = hashedPassword;

            const result = await this.usersManager.save(newUser);

            res.sendSuccessNewResource(result);

        } catch (error) {
            res.sendServerError(error.message);
        }
    }


    async login (req,res) {
        try {
            const {email, password } = req.body;

            if(!email || !password ) {
                return res.sendClientError('incomplete values')
            }

            const user = await this.usersManager.getByEmail(email);

            if(!user) {
                return res.sendClientError('Incorrect Credentials')
            }

            const comparePassword = isValidPassword(password,user.password);

            if(!comparePassword) {
                return res.sendClientError('Incorrect Credentials')
            }

            const accessToken = generateToken(user);

            res.sendSuccess(accessToken);

        } catch (error) {
            res.sendServerError(error.message);
        }
    }


    async getAll (req,res) {
        try {
            const students = await this.studentsManager.getAll();
            res.sendSuccess(students);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    // async save (req,res) {
    //     try {
    //         const {first_name,last_name,email,dni,birth_date,gender} = req.body
    //         if(!first_name || !last_name || !email){
    //             console.log(req.body);
    //             return res.sendClientError('incomplete values')
    //         }
     
    //         const result = await studentsManager.save({
    //             first_name,
    //             last_name,
    //             email,
    //             dni,
    //             birth_date,
    //             gender
    //         });
    //         res.sendSuccessNewResource(result)
    //     } catch (error) {
    //         res.sendServerError(error.message);
    //     }
    // }

}